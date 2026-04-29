'use server';

type LeadData = {
  name: string;
  email: string;
  phone: string;
  course?: string;
  courseInterest?: string;
  city?: string;
  consulation_date?: string;
  consulation_time?: string;
  lead_source?: string;
};

type HubSpotPropertyValue = string | undefined;

async function findHubSpotContactIdByEmail(email: string, accessToken: string) {
  const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [
            {
              propertyName: 'email',
              operator: 'EQ',
              value: email,
            },
          ],
        },
      ],
      properties: ['email'],
      limit: 1,
    }),
  });

  if (!response.ok) return null;

  const data = await response.json();
  return data.results?.[0]?.id as string | undefined;
}

function buildContactProperties(data: LeadData) {
  const [firstname, ...lastnameParts] = data.name.trim().split(/\s+/);
  const properties: Record<string, HubSpotPropertyValue> = {
    email: data.email,
    firstname,
    lastname: lastnameParts.join(' '),
    phone: data.phone,
    city: data.city,
    consulation_date: data.consulation_date,
    consulation_time: data.consulation_time,
    lead_source: data.lead_source || 'Generic Landing Page',
  };

  if (data.course || data.courseInterest) {
    properties.jobtitle = `Course: ${data.course || 'Not selected'} | Program: ${data.courseInterest || 'Not selected'}`;
  }

  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined && value !== '')
  );
}

/**
 * Server Action to create or update lead data in HubSpot CRM.
 * Requires HUBSPOT_ACCESS_TOKEN environment variable.
 */
export async function submitToHubSpot(data: LeadData) {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!accessToken) {
    console.error('HUBSPOT_ACCESS_TOKEN is not configured in environment variables.');
    return { success: false, error: 'Server configuration error.' };
  }

  try {
    const contactId = await findHubSpotContactIdByEmail(data.email, accessToken);
    const properties = buildContactProperties(data);

    const response = await fetch(
      contactId
        ? `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`
        : 'https://api.hubapi.com/crm/v3/objects/contacts',
      {
        method: contactId ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          properties,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('HubSpot API Error:', errorData);
      return { success: false, error: errorData.message || 'Failed to sync with CRM.' };
    }

    return { success: true };
  } catch (error) {
    console.error('HubSpot Submission Exception:', error);
    return { success: false, error: 'Internal server error during CRM sync.' };
  }
}
