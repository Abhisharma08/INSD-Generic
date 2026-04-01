'use server';

/**
 * Server Action to submit lead data to HubSpot CRM.
 * Requires HUBSPOT_ACCESS_TOKEN environment variable.
 */
export async function submitToHubSpot(data: {
  name: string;
  email: string;
  phone: string;
  course: string;
  courseInterest: string;
  city: string;
}) {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!accessToken) {
    console.error('HUBSPOT_ACCESS_TOKEN is not configured in environment variables.');
    return { success: false, error: 'Server configuration error.' };
  }

  try {
    const [firstname, ...lastnameParts] = data.name.trim().split(/\s+/);
    const lastname = lastnameParts.join(' ');

    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        properties: {
          email: data.email,
          firstname: firstname,
          lastname: lastname || '',
          phone: data.phone,
          jobtitle: `Course: ${data.course} | Program: ${data.courseInterest}`,
          city: data.city,
        },
      }),
    });

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
