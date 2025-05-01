import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram } from "lucide-react"

export default function TestHomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with TEST indicator */}
      <header className="sticky top-0 z-50 w-full border-b border-gold/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/test" className="font-bold text-xl text-gold tracking-wider">
              INK<span className="text-white">BY</span>DRAKEN
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">TEST MODE</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/test" className="text-sm font-medium text-gold transition-colors">
              Home
            </Link>
            <Link href="/test/contact" className="text-sm font-medium text-white hover:text-gold transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild className="bg-gold text-black hover:bg-gold/80 border border-gold">
              <Link href="/test/contact">Book Now</Link>
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
                <span className="text-gold gold-glow">TEST</span> <span className="text-white">ENVIRONMENT</span>
                <br />
                <span className="text-white">LINE</span> <span className="text-gold gold-glow">ARTISTRY</span>
              </h1>
              <p className="text-xl text-gray-300 text-center">
                This is a test version of the InkByDraken website. Feel free to experiment without affecting the live
                site.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gold text-black hover:bg-gold/80 border border-gold" asChild>
                  <Link href="/test/contact">Test Booking Form</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10" asChild>
                  <Link href="/test/admin">Test Admin Panel</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Test Navigation Section */}
        <section className="py-16 bg-black border-y border-gold/30">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                <span className="text-gold">TEST</span> <span className="text-white">NAVIGATION</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Navigate to different test pages to try out functionality without affecting the production site.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-secondary p-6 border border-gold/30 hover:border-gold transition-all duration-300">
                <h3 className="text-gold font-bold text-xl mb-4">Test Booking</h3>
                <p className="text-gray-300 mb-4">Try out the booking form and payment process in test mode.</p>
                <Button variant="outline" className="border-gold text-gold hover:bg-gold/10 w-full" asChild>
                  <Link href="/test/contact">Go to Booking</Link>
                </Button>
              </div>

              <div className="bg-secondary p-6 border border-gold/30 hover:border-gold transition-all duration-300">
                <h3 className="text-gold font-bold text-xl mb-4">Test Admin</h3>
                <p className="text-gray-300 mb-4">Access the admin panel to test appointment management.</p>
                <Button variant="outline" className="border-gold text-gold hover:bg-gold/10 w-full" asChild>
                  <Link href="/test/admin">Go to Admin</Link>
                </Button>
              </div>

              <div className="bg-secondary p-6 border border-gold/30 hover:border-gold transition-all duration-300">
                <h3 className="text-gold font-bold text-xl mb-4">Production Site</h3>
                <p className="text-gray-300 mb-4">Return to the main production website.</p>
                <Button variant="outline" className="border-gold text-gold hover:bg-gold/10 w-full" asChild>
                  <Link href="/">Go to Production</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gold/30 py-8 bg-black">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <Link href="/test" className="font-bold text-xl text-gold tracking-wider">
                INK<span className="text-white">BY</span>DRAKEN
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">TEST</span>
              </Link>
              <p className="text-gray-400 text-sm text-center md:text-left">
                Test environment - Changes here won't affect the production site.
              </p>
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
