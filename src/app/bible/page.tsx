import { Link } from "@/components/link";
import { PencilRulerIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { FileManagement } from "./(components)/file-management";

export const metadata: Metadata = {
  title: "Bible Download | Free CV Builder | Create CV Online for Free",
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
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 to-teal-400">
      <header className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center py-5 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to="/">
            <Image src="/free-cv-builder-logo.png" height={40} width={196} alt="Free CV Builder Logo" className="h-8 md:h-10 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center">
            <Link
              to="/editor"
              className="bg-neutral-900 text-white py-3 px-6 md:py-3 md:px-6 rounded-full text-sm md:text-lg hover:bg-neutral-800 transition-all duration-200 inline-flex items-center gap-2"
            >
              <b>Create Your CV Now</b><PencilRulerIcon className="inline size-4 sm:size-6"/>
            </Link>
          </nav>
        </div>
      </header>
      <div className="h-[72px]" />
      <main className="mt-8 md:mt-12">
        {/* Hero Section */}
        <section className="text-center py-5 px-4 md:px-8">
          <FileManagement />
        </section>
      </main>
    </div>
  );
};