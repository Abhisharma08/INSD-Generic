import Image from "next/image"
import {
  Star,
  ShieldCheck,
} from "lucide-react"
import ScrollToLeadButton from "@/components/ScrollToLeadButton"
import SectionHeader from "@/components/SectionHeader"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const LOGO_URL = "https://res.cloudinary.com/ddqqlfsjp/image/upload/v1778345781/INSD-Logo_Horizontal_fhm4u5.jpg";
const DEFAULT_PLACEHOLDER = "https://picsum.photos/seed/placeholder/800/600";

export default function LandingPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === "hero-workspace");
  const studentImg = PlaceHolderImages.find(img => img.id === "student-work");
  const skillsCareersImg = PlaceHolderImages.find(img => img.id === "skills-careers-placements");
  const brandingImg = PlaceHolderImages.find(img => img.id === "branding-mockup");
  const uiImg = PlaceHolderImages.find(img => img.id === "ui-ux-design");

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b shadow-sm overflow-x-hidden">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2" aria-label="INSD">
            <Image
              src={LOGO_URL}
              alt="INSD Logo"
              width={200}
              height={50}
              className="h-10 w-auto object-contain"
              priority
              quality={70}
            />
          </div>
          <div className="flex items-center gap-4">
            <ScrollToLeadButton
              variant="ghost"
              className="hidden md:block text-primary font-semibold"
            >
              Book Counselling
            </ScrollToLeadButton>
            <ScrollToLeadButton
              className="bg-secondary hover:bg-secondary/90 text-white font-bold px-6"
            >
              Apply Now
            </ScrollToLeadButton>
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-24 lg:pb-0 w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary py-20 lg:py-24 w-full">
          <Image
            src={heroImg?.imageUrl || DEFAULT_PLACEHOLDER}
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={65}
            sizes="100vw"
            className="absolute inset-0 object-cover"
          />
          <div className="absolute inset-0 bg-primary/75" />
          <div className="container relative z-10 mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
              <div className="space-y-6 w-full">
                <div className="inline-block bg-white/10 text-white/80 rounded-full px-4 py-1.5 text-sm font-medium mb-2">
                  Admissions Open 2026-27
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline leading-[1.1] text-white">
                  We Don't Just Teach Design. We Build Careers
                </h1>

                <p className="text-xl text-white mb-8 max-w-2xl leading-relaxed font-sans">
                  Join INSD – India’s Skill School and build job-ready design skills for a billion-dollar industry.
                </p>

                {/* Outlined Badges */}
                <div className="flex flex-wrap gap-x-3 gap-y-3 mb-4 mt-8">
                  <div className="flex items-center gap-2 border border-white/30 rounded-full px-5 py-2">
                    <Star className="w-4 h-4 text-secondary" />
                    <span className="text-white font-medium text-sm">15 Years of Creative Excellence</span>
                  </div>
                  <div className="flex items-center gap-2 border border-white/30 rounded-full px-5 py-2">
                    <Star className="w-4 h-4 text-secondary" />
                    <span className="text-white font-medium text-sm">75+ Campuses</span>
                  </div>
                  <div className="flex items-center gap-2 border border-white/30 rounded-full px-5 py-2">
                    <Star className="w-4 h-4 text-secondary" />
                    <span className="text-white font-medium text-sm">23 States</span>
                  </div>
                  <div className="flex items-center gap-2 border border-white/30 rounded-full px-5 py-2">
                    <Star className="w-4 h-4 text-secondary" />
                    <span className="text-white font-medium text-sm">30,000 Students</span>
                  </div>
                  <div className="flex items-center gap-2 border border-white/30 rounded-full px-5 py-2">
                    <Star className="w-4 h-4 text-secondary" />
                    <span className="text-white font-medium text-sm">300+ Industry Partners</span>
                  </div>
                </div>

                {/* Filled Badges */}
                <div className="flex flex-wrap gap-x-3 gap-y-3 mb-8 pt-4">
                  <div className="flex items-center gap-2 rounded-full px-5 py-2 bg-secondary text-white shadow-lg shadow-secondary/40">
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span className="font-semibold text-sm">100% Lifetime Placement Support</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full px-5 py-2 bg-secondary text-white shadow-lg shadow-secondary/40">
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span className="font-semibold text-sm">2000+ Placements Last Year</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full px-5 py-2 bg-secondary text-white shadow-lg shadow-secondary/40">
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span className="font-semibold text-sm">Packages upto ₹18 LPA</span>
                  </div>
                </div>

                <p className="text-sm italic text-white/80 pt-4">
                  BOOK A FREE CONSULTATION. LIMITED SPOTS AVAILABLE
                </p>
              </div>

              <div className="relative z-10 scroll-mt-24" id="top-form">
                <div className="w-full min-h-[560px]">
                  <div className="npf_wgts w-full min-h-[560px]" data-height="560px" data-w="df1baf18e63688d3ed4a8847f1cfbdc4"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Section */}
        <section className="btf-section py-20 bg-white w-full">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={skillsCareersImg?.imageUrl || DEFAULT_PLACEHOLDER}
                  alt="Student at Work"
                  fill
                  className="object-cover"
                  data-ai-hint="designer working"
                />
              </div>
              <div className="space-y-6">
                <SectionHeader
                  title="Skills. Careers. Placements. Come First."
                  // subtitle=""
                  centered={false}
                />
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At INSD, we focus on what truly matters — skills, careers, and placements.
                </p>
                <ul className="space-y-4">
                  {[
                    "Skills over degrees",
                    "Careers over courses",
                    "Industry readiness over theory"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-primary font-medium">
                      <ShieldCheck className="text-secondary h-6 w-6" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-lg font-bold text-secondary leading-relaxed">
                  We build professionals, not just designers.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From day one, your learning is focused on making you job-ready and helping you earn.
                </p>

              </div>
            </div>
          </div>
        </section>

        {/* Career Opportunities */}
        <section className="btf-section py-20 bg-muted overflow-hidden w-full">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <SectionHeader
                  title="Graphic, Interior & Fashion Designing"
                  subtitle="Design is Powering High-Growth Industries"
                  centered={false}
                />
                <div className="grid grid-cols-1">
                  {[
                    "Graphic design is driving digital, branding, and content platforms",
                    "Interior design is shaping residential and commercial spaces",
                    "Fashion design is growing across apparel, styling, and creative industries",
                  ].map((job, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="font-medium text-primary">{job}</span>
                    </div>
                  ))}
                  <p className="block mt-2 text-lg text-muted-foreground">
                    Across all three fields, demand is increasing as businesses and individuals invest more in design
                    <br /><span className="block mt-3 text-black font-bold size-lg">Design = Career-Ready Skill</span>
                    <span className=" text-slate-600 font-medium">With the right skills, you can work, grow, and earn.</span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                    <Image src={brandingImg?.imageUrl || DEFAULT_PLACEHOLDER} alt="Branding" fill className="object-cover" />
                  </div>
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                    <Image src={uiImg?.imageUrl || DEFAULT_PLACEHOLDER} alt="UI Design" fill className="object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                    <Image src={heroImg?.imageUrl || DEFAULT_PLACEHOLDER} alt="Portfolio" fill className="object-cover" />
                  </div>
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                    <Image src={studentImg?.imageUrl || DEFAULT_PLACEHOLDER} alt="Placement" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="btf-section py-24 bg-white relative overflow-hidden w-full">
          <div className="container mx-auto px-4 max-w-7xl text-center space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-headline text-primary">Your Future Won’t Wait</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The right skills can help you start earning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ScrollToLeadButton
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white font-bold h-14 px-10 text-lg w-full sm:w-auto"
              >
                Apply Now
              </ScrollToLeadButton>
              <ScrollToLeadButton
                size="lg"
                className="bg-primary border border-primary text-white hover:bg-primary/90 h-14 px-10 text-lg w-full sm:w-auto"
              >
                Get Course Details
              </ScrollToLeadButton>
              <ScrollToLeadButton
                variant="outline"
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white font-bold h-14 px-10 text-lg w-full sm:w-auto"
              >
                Talk to a Counsellor
              </ScrollToLeadButton>
            </div>
            <p className="text-1xl font-bold text-slate-900">Start Your Career in Design Today</p>
          </div>
        </section>

        {/* Lead Form Section (Final Lead Capture) */}
        <section id="lead-form" className="btf-section py-10 bg-muted w-full">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-headline text-primary">Are you ready to start learning job-ready skills?</h2>
                  <p className="text-lg text-muted-foreground">
                    Fill in your details and take the first step towards your career.
                  </p>
                </div>
                <div className="w-full min-h-[600px]">
                  <div className="npf_wgts w-full min-h-[600px]" data-height="600px" data-w="df1baf18e63688d3ed4a8847f1cfbdc4"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white pt-8 pb-28 lg:py-8 w-full">
        <div className="container mx-auto px-4 max-w-7xl text-center text-xs text-white/60">
          <p>© {new Date().getFullYear()} International School of Design (INSD) Delhi. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden p-4 bg-white border-t shadow-[0_-4px_10px_rgba(0,0,0,0.1)] flex gap-2 w-full">
        <div className="w-full flex gap-2 max-w-7xl mx-auto px-4">
          <ScrollToLeadButton
            className="flex-1 bg-secondary text-white font-bold h-12"
          >
            Apply Now
          </ScrollToLeadButton>
        </div>
      </div>
    </div>
  )
}
