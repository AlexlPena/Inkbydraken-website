import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft, Home } from "lucide-react"

export default function BookingConfirmationPage() {
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
            <Link href="/" className="text-sm font-medium text-white hover:text-gold transition-colors">
              Home
            </Link>
            <Link href="/contact" className="text-sm font-medium text-white hover:text-gold transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-3xl py-16">
          <div className="bg-secondary/50 border-2 border-gold p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-green-900/20 border border-green-500/50 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Booking</span> <span className="text-gold">Confirmed</span>
            </h1>

            <p className="text-xl text-gray-300 mb-6">Thank you for your booking request!</p>

            <div className="bg-black/50 border border-gold/30 p-6 mb-8 max-w-xl mx-auto">
              <p className="text-gray-300 mb-4">
                Your request has been successfully submitted. We will review your details and contact you within{" "}
                <span className="text-gold font-medium">24 hours</span> to confirm your appointment.
              </p>
              <p className="text-gray-300">
                If you have any questions in the meantime, please don't hesitate to reach out via email at{" "}
                <Link href="mailto:inkbydraken@outlook.com" className="text-gold hover:underline">
                  inkbydraken@outlook.com
                </Link>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10">
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" /> Return to Home
                </Link>
              </Button>
              <Button asChild className="bg-gold text-black hover:bg-gold/80 border border-gold">
                <Link href="/contact" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Book Another Appointment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gold/30 py-6 bg-black">
        <div className="container text-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} InkByDraken. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
