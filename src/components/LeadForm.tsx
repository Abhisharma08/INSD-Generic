"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { submitToHubSpot } from "@/app/actions/hubspot"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Enter a valid 10-digit phone number." }).max(12),
  email: z.string().email({ message: "Please enter a valid email address." }),
  course: z.string().min(1, { message: "Please select a course." }),
  courseInterest: z.string().min(1, { message: "Please select a program." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  consulation_date: z.string().optional(),
  consulation_time: z.string().optional(),
  lead_source: z.string().optional(),
})

type LeadFormValues = z.infer<typeof formSchema>

const contactStepSchema = formSchema.pick({
  name: true,
  email: true,
  phone: true,
})

const contactStepFields = ["name", "email", "phone"] as const

export default function LeadForm({ className }: { className?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSavingStep, setIsSavingStep] = useState(false)
  const [step, setStep] = useState(1)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      course: "",
      courseInterest: "",
      city: "",
      consulation_date: "",
      consulation_time: "",
      lead_source: "Generic Landing Page",
    },
  })

  async function saveContactStep() {
    const validation = contactStepSchema.safeParse(form.getValues())
    form.clearErrors(contactStepFields)

    if (!validation.success) {
      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof LeadFormValues
        form.setError(fieldName, { message: issue.message })
      })
      return
    }

    setIsSavingStep(true)

    try {
      const values = form.getValues()
      const result = await submitToHubSpot({
        name: values.name,
        email: values.email,
        phone: values.phone,
        lead_source: values.lead_source,
      })

      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Could not save your details",
          description: "Please try again before continuing.",
        })
        return
      }

      setStep(2)
    } catch (error) {
      console.error("Step Save Exception:", error)
      toast({
        variant: "destructive",
        title: "Could not save your details",
        description: "Please check your connection and try again.",
      })
    } finally {
      setIsSavingStep(false)
    }
  }

  async function onSubmit(values: LeadFormValues) {
    setIsSubmitting(true)
    
    try {
      const result = await submitToHubSpot(values);
      
      if (result.success) {
        router.push("/thank-you")
      } else {
        console.warn("CRM Sync Issue:", result.error);
        toast({
          variant: "destructive",
          title: "Could not submit your application",
          description: "Please try again before leaving this page.",
        })
      }
    } catch (error) {
      console.error("Submission Exception:", error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "We encountered a problem. Please try again or contact us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`bg-white p-5 md:p-6 rounded-xl shadow-2xl border border-muted ${className}`}>
      <div className="mb-5 space-y-3">
        <div>
          <h3 className="text-2xl font-headline text-primary mb-1">BOOK A FREE CONSULTATION</h3>
          <p className="text-sm text-muted-foreground">Our counsellor will contact you shortly.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
          <div className={`rounded-full px-3 py-2 text-center ${step === 1 ? "bg-secondary text-white" : "bg-secondary/10 text-secondary"}`}>
            1. Your Details
          </div>
          <div className={`rounded-full px-3 py-2 text-center ${step === 2 ? "bg-secondary text-white" : "bg-muted text-muted-foreground"}`}>
            2. Course
          </div>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <input type="hidden" {...form.register("lead_source")} />

          {step === 1 ? (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-12 text-base"
                disabled={isSavingStep}
                onClick={saveContactStep}
              >
                {isSavingStep ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your City Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Courses</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Interested Course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fashion-design">Fashion Design</SelectItem>
                        <SelectItem value="textile-design">Textile Design</SelectItem>
                        <SelectItem value="graphic-design">Graphic Design</SelectItem>
                        <SelectItem value="interior-design">Interior Design</SelectItem>
                        <SelectItem value="jewellery-design">Jewellery Design</SelectItem>
                        <SelectItem value="animation">Animation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="courseInterest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Interested Program" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="undergraduate">Under Graduate Program</SelectItem>
                        <SelectItem value="postgraduate">Post Graduate Program</SelectItem>
                        <SelectItem value="advanced-diploma">Advanced Diploma</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="short-term">Short Term Course</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="consulation_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consultation Date</FormLabel>
                    <FormControl>
                      <Input placeholder="Select Date" type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="consulation_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consultation Time</FormLabel>
                    <FormControl>
                      <Input placeholder="Select Time" type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12"
                  disabled={isSubmitting}
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-secondary hover:bg-secondary/90 text-white font-bold h-12 text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Apply Now"
                  )}
                </Button>
              </div>
            </>
          )}

          <p className="text-center text-[10px] text-muted-foreground uppercase tracking-wider">
            BOOK A FREE CONSULTATION. LIMITED SPOTS AVAILABLE
          </p>
        </form>
      </Form>
    </div>
  )
}
