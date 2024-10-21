import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free CV Builder | Create CV Online for Free",
  description: "Build your professional CV online for free. No sign-up required. Fast, easy, and secure CV builder with customizable templates.",
  keywords: "Free CV Builder, online CV builder, no sign-up CV builder, free resume builder, create CV for free",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://free-cv-builder.vercel.app/",
    title: "Free CV Builder | Create CV Online for Free",
    description: "Build your professional CV online for free. No sign-up required. Fast, easy, and secure CV builder with customizable templates.",
    images: [
      {
        url: "https://free-cv-builder.vercel.app/images/og-image.png",
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
        url: "https://free-cv-builder.vercel.app/images/og-image.png",
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
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-300">
      
      <header className="py-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-lg md:text-2xl font-bold text-emerald-600">Free CV Builder</h1>
          <nav className="hidden md:flex">
            <a href="#features" className="text-sm md:text-lg font-semibold text-emerald-500 hover:text-emerald-700 mx-2 md:mx-4">Features</a>
            <a href="#how-it-works" className="text-sm md:text-lg font-semibold text-emerald-500 hover:text-emerald-700 mx-2 md:mx-4">How it Works</a>
            <a href="#benefits" className="text-sm md:text-lg font-semibold text-emerald-500 hover:text-emerald-700 mx-2 md:mx-4">Benefits</a>
          </nav>
        </div>
      </header>

      <main className="mt-8 md:mt-12">
        {/* Hero Section */}
        <section className="text-center px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Build your Professional CV in Minutes</h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
            Our Free CV builder helps you create a stunning, job-ready resume in just a few clicks.
          </p>
          <a
            href="#"
            className="bg-emerald-600 text-white py-2 px-4 md:py-3 md:px-6 rounded-full text-sm md:text-lg hover:bg-emerald-700 transition-all duration-200"
          >
            Get Started For Free
          </a>
        </section>

        {/* Privacy Emphasis Section */}
        <section className="my-12 md:my-16 py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <img
                  src="/icons/lock-icon.svg" // Example icon, replace with your asset
                  alt="Privacy"
                  className="w-8 h-8 md:w-12 md:h-12"
                />
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
        <section id="how-it-works" className="my-12 md:my-16 text-center bg-gray-100 py-8 md:py-12">
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
        <section className="my-12 md:my-16 text-center bg-emerald-600 py-8 md:py-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Build Your CV?</h3>
          <p className="text-base md:text-lg text-white mb-6 md:mb-8">Create a professional resume in minutes. No sign-up required, no data saved.</p>
          <a
            href="#"
            className="bg-white text-emerald-600 py-2 px-4 md:py-3 md:px-6 rounded-full text-sm md:text-lg hover:bg-gray-200 transition-all duration-200"
          >
            Get Started Now
          </a>
        </section>
      </main>

      <footer className="py-6 bg-green-600 text-white text-center">
        <p>© 2024 mytabworks. All rights reserved.</p>
      </footer>
    </div>
  );
};