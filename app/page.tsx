"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Instagram } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gold/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-xl text-gold tracking-wider">
              INK<span className="text-white">BY</span>DRAKEN
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-gold transition-colors">
              Home
            </Link>
            <Link href="/contact" className="text-sm font-medium text-white hover:text-gold transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild className="bg-gold text-black hover:bg-gold/80 border border-gold">
              <Link href="/contact">Book Now</Link>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full md:hidden border-gold text-gold">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Just Text Box */}
        <section className="relative bg-black py-32 md:py-40 lg:py-48">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[radial-gradient(#AB8D3F_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>

          <div className="container relative z-20">
            <div className="max-w-3xl mx-auto space-y-8 bg-black/70 p-12 backdrop-blur-sm border-2 border-gold">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl text-center">
                <span className="text-gold gold-glow">ELEGANT</span> <span className="text-white">BLACK & WHITE</span>
                <br />
                <span className="text-white">LINE</span> <span className="text-gold gold-glow">ARTISTRY</span>
              </h1>
              <p className="text-xl text-gray-300 text-center">
                Modern tattoo designs with precision and elegance. Bringing your vision to life with clean, bold lines
                and timeless style.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gold text-black hover:bg-gold/80 border border-gold" asChild>
                  <Link href="/contact">Book a Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Some Of My Work Section */}
        <section className="py-16 bg-black border-y border-gold/30">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                <span className="text-gold">SOME OF</span> <span className="text-white">MY WORK</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                A glimpse into my portfolio of modern black and white line tattoos. Each piece is designed with
                precision and elegance.
              </p>
            </div>

            {/* Content Warning */}
            <div className="mb-8 p-4 border border-gold/50 bg-black/50 max-w-3xl mx-auto text-center">
              <p className="text-yellow-300 font-medium mb-2">
                Disclaimer: This gallery contains artistic nudity and tattoo designs that may be inappropriate for
                viewers under 18. Viewer discretion is advised.
              </p>
              <div className="mt-4">
                <label className="flex items-center justify-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded-sm border-gold text-gold focus:ring-gold"
                    onChange={(e) => {
                      const gallery = document.getElementById("gallery-content")
                      if (gallery) {
                        gallery.style.display = e.target.checked ? "grid" : "none"
                      }
                    }}
                  />
                  <span>I'm 18 or older — show me the gallery</span>
                </label>
              </div>
            </div>

            <div
              id="gallery-content"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              style={{ display: "none" }}
            >
              <div className="group relative overflow-hidden border-2 border-gold/50 hover:border-gold transition-all duration-300">
                <Image
                  src="/images/tattoo-torso.jpeg"
                  alt="Minimalist figure tattoo on torso"
                  width={600}
                  height={800}
                  className="w-full h-[400px] object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4">
                    <h3 className="text-gold font-bold text-lg">Minimalist Figure</h3>
                    <p className="text-gray-300 text-sm">Black & white line tattoo</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden border-2 border-gold/50 hover:border-gold transition-all duration-300">
                <Image
                  src="/images/flash-sheet-designs.png"
                  alt="Flash sheet with various designs"
                  width={600}
                  height={800}
                  className="w-full h-[400px] object-contain bg-white transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4">
                    <h3 className="text-gold font-bold text-lg">Flash Sheet Designs</h3>
                    <p className="text-gray-300 text-sm">Available for booking</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden border-2 border-gold/50 hover:border-gold transition-all duration-300">
                <Image
                  src="/images/nun-design.jpeg"
                  alt="Nun with roses tattoo design"
                  width={600}
                  height={800}
                  className="w-full h-[400px] object-contain bg-white transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4">
                    <h3 className="text-gold font-bold text-lg">Weeping Nun</h3>
                    <p className="text-gray-300 text-sm">Black & white illustration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] border-2 border-gold">
                <Image
                  src="/images/artist-portrait.png"
                  alt="Tattoo Artist - Draken"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  <span className="text-white">ABOUT</span> <span className="text-gold">DRAKEN</span>
                </h2>
                <p className="text-gray-300">
                  As an emerging talent in the tattoo industry, I've dedicated myself to perfecting the art of black and
                  white line work. My journey began with a passion for minimalist design and clean aesthetics.
                </p>
                <p className="text-gray-300">
                  I specialize in creating elegant, modern tattoos that stand the test of time. My work focuses on
                  precision, bold lines, and thoughtful negative space to create designs that are both striking and
                  sophisticated.
                </p>
                <p className="text-gray-300">
                  Every tattoo I create is a collaborative process, working closely with clients to transform their
                  ideas into wearable art that they'll be proud to showcase for years to come.
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gold text-gold hover:bg-gold/10"
                    asChild
                  >
                    <Link href="https://www.instagram.com/inkbydraken/" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Style Section */}
        <section className="py-16 bg-black border-y border-gold/30">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                <span className="text-white">MY</span> <span className="text-gold">STYLE</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Clean lines, bold contrasts, and elegant simplicity define my approach to tattoo art.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-secondary p-6 border border-gold/30 hover:border-gold transition-all duration-300">
                <h3 className="text-gold font-bold text-xl mb-4">Minimalist</h3>
                <p className="text-gray-300">
                  Less is more. I create impact through carefully placed lines and thoughtful negative space.
                </p>
              </div>

              <div className="bg-secondary p-6 border border-gold/30 hover:border-gold transition-all duration-300">
                <h3 className="text-gold font-bold text-xl mb-4">Bold</h3>
                <p className="text-gray-300">
                  Strong, confident lines that create striking designs with lasting visual impact.
                </p>
              </div>

              <div className="bg-secondary p-6 border border-gold/30 hover:border-gold transition-all duration-300">
                <h3 className="text-gold font-bold text-xl mb-4">Elegant</h3>
                <p className="text-gray-300">
                  Sophisticated designs that balance artistic expression with timeless aesthetics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Available Flash Designs Section */}
        <section className="py-16">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                <span className="text-white">AVAILABLE</span> <span className="text-gold">FLASH DESIGNS</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Ready-to-ink designs available for immediate booking. Each piece showcases my signature black and white
                line style.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative border-2 border-gold p-1 aspect-[3/4]">
                <Image src="/images/tattoo-flash.png" alt="Tattoo Flash Sheet" fill className="object-contain" />
              </div>
              {/* Removed the empty flash sheet box */}
              <div className="relative border-2 border-gold p-1 aspect-[3/4]">
                <Image src="/images/flash-sheet-2.jpeg" alt="Tattoo Flash Sheet" fill className="object-contain" />
              </div>
              <div className="relative border-2 border-gold p-1 aspect-[3/4]">
                <Image src="/images/flash-sheet-3.jpeg" alt="Tattoo Flash Sheet" fill className="object-contain" />
              </div>
            </div>

            <div className="mt-10 text-center">
              <Button className="bg-gold text-black hover:bg-gold/80 border border-gold" asChild>
                <Link href="/contact">Book a Flash Design</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-black to-secondary">
          <div className="container">
            <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="text-white">READY FOR</span> <span className="text-gold gold-glow">YOUR DESIGN?</span>
              </h2>
              <p className="text-gray-300 text-lg">
                Let's collaborate on creating a unique tattoo that reflects your personal style with clean, elegant line
                work.
              </p>
              <Button size="lg" className="bg-gold text-black hover:bg-gold/80 border border-gold" asChild>
                <Link href="/contact">Book Your Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gold/30 py-8 bg-black">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="font-bold text-xl text-gold tracking-wider mb-2">
                INK<span className="text-white">BY</span>DRAKEN
              </Link>
              <p className="text-gray-400 text-sm text-center md:text-left">
                Modern black & white line tattoos with elegance and precision.
              </p>
            </div>

            <div className="flex gap-8">
              <div className="space-y-2">
                <h3 className="font-bold text-gold">Links</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-gold transition-colors text-sm">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-400 hover:text-gold transition-colors text-sm">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-gold">Contact</h3>
                <ul className="space-y-1">
                  <li className="text-gray-400 text-sm">
                    <Link href="mailto:inkbydraken@outlook.com" className="hover:text-gold transition-colors">
                      inkbydraken@outlook.com
                    </Link>
                  </li>
                  <li className="text-gray-400 text-sm">Boston, MA 02108</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gold text-gold hover:bg-gold/10"
                asChild
              >
                <Link href="https://www.instagram.com/inkbydraken/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="border-t border-gold/20 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} InkByDraken. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
