import { Link } from "@/components/link";
import { buymeacoffee } from "@/constants/variables";
import { LockKeyholeIcon, PencilRulerIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Free CV Builder | Create CV Online for Free",
  description: "Build your professional CV online for free. No sign-up required. Fast, easy, and secure CV builder with customizable templates.",
  keywords: "Free CV Builder, online CV builder, no sign-up CV builder, free resume builder, create CV for free, free CV maker, free resume maker",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://free-cv-builder.vercel.app/",
    title: "Free CV Builder | Create CV Online for Free",
    description: "Build your professional CV online for free. No sign-up required. Fast, easy, and secure CV builder with customizable templates.",
    images: [
      {
        url: "https://free-cv-builder.vercel.app/free-cv-builder-logo.png",
        width: 1200,
        height: 630,
        alt: "Free CV Builder | Create CV Online for Free",
      },
    ],
    siteName: "Free CV Builder | Create CV Online for Free",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free CV Builder | Create CV Online for Free",
    description: "Build your professional CV online for free. No sign-up required. Fast, easy, and secure CV builder with customizable templates.",
    images: [
      {
        url: "https://free-cv-builder.vercel.app/free-cv-builder-logo.png",
        width: 1200,
        height: 630,
        alt: "Free CV Builder | Create CV Online for Free",
      },
    ],
    site: "https://free-cv-builder.vercel.app/",
    creator: "@mytabworks",
  },
};

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 to-emerald-300">
      <header className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center py-5 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to="/">
            <Image src="/free-cv-builder-logo.png" height={40} width={196} alt="Free CV Builder Logo" className="h-8 md:h-10 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center">
            <a href="#features" className="text-sm md:text-lg font-semibold text-emerald-500 hover:text-emerald-700 mx-2 md:mx-4">Features</a>
            <a href="#how-it-works" className="text-sm md:text-lg font-semibold text-emerald-500 hover:text-emerald-700 mx-2 md:mx-4">How it Works</a>
            <a
              href={buymeacoffee}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img height={43} width={200} alt="Buy me a coffee" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=mytabworks&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
            </a>
          </nav>
        </div>
      </header>
      <div className="h-[72px]" />
      <main className="mt-8 md:mt-12">
        {/* Hero Section */}
        <section className="text-center px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Build your Professional CV in Minutes</h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
            Our Free CV builder helps you create a stunning, customizable, job-ready resume in just a few clicks.
          </p>
          <Link
            to="/editor"
            className="bg-neutral-900 text-white py-3 px-6 md:py-3 md:px-6 rounded-full text-sm md:text-lg hover:bg-neutral-800 transition-all duration-200 inline-flex items-center gap-2"
          >
            <b>Create Your CV Now</b><PencilRulerIcon className="inline size-4 sm:size-6"/>
          </Link>
        </section>

        {/* Privacy Emphasis Section */}
        <section id="features" className="mt-12 md:mt-16 py-8 md:py-10 bg-white bg-opacity-70">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
              <LockKeyholeIcon className="w-8 h-8 md:w-12 md:h-12" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Your Privacy Matters</h3>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
                We do not store your personal information or CV data. No sign-up is required. Your data stays on your device and is never saved on our servers.
              </p>
              <p className="text-sm md:text-lg font-semibold text-emerald-600">
                Build your CV privately, securely, and with full control.
              </p>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="text-center backdrop-blur-sm py-8 md:py-10">
          <div className="container mx-auto px-4 md:px-8">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">How It Works</h3>
            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
              <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
                <span className="text-3xl md:text-4xl text-emerald-600 font-bold">1</span>
                <h4 className="text-lg md:text-xl font-semibold text-emerald-600 mt-4">Select a Template</h4>
                <p className="text-sm md:text-base text-gray-600 mt-2">
                  Choose from a variety of professional and customizable CV templates.
                </p>
              </div>
              <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
                <span className="text-3xl md:text-4xl text-emerald-600 font-bold">2</span>
                <h4 className="text-lg md:text-xl font-semibold text-emerald-600 mt-4">Add Your Information</h4>
                <p className="text-sm md:text-base text-gray-600 mt-2">
                  Fill in your details, including work experience, skills, and education, quickly and easily.
                </p>
              </div>
              <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
                <span className="text-3xl md:text-4xl text-emerald-600 font-bold">3</span>
                <h4 className="text-lg md:text-xl font-semibold text-emerald-600 mt-4">Download Your CV</h4>
                <p className="text-sm md:text-base text-gray-600 mt-2">
                  Instantly download your CV as a PDF and use it for your next job application. Your data is never saved on our servers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="text-center bg-emerald-600 py-8 md:py-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fadeIn">
            Enjoyed using the Free CV Builder?
          </h3>
          <p className="text-base md:text-lg text-white mb-6 md:mb-8">If you got hired using this tool, consider buying me a coffee to support my work and keep this project running. Cheers!</p>
          <div className="flex justify-center">
            <a href={buymeacoffee} target="_blank">
              <img alt="Buy me a coffee" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=mytabworks&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
            </a>
          </div>
        </section>
      </main>
      <footer className="py-4 bg-emerald-800 text-white text-center">
        <p>© {new Date().getFullYear()} mytabworks. All rights reserved.</p>
      </footer>
    </div>
  );
};