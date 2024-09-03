import Link from "next/link"

export default function Component() {
  return (
    <footer className="bg-black text-white w-full py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company and Social links */}
          <div className="md:col-span-2 space-y-8">
            <div className="grid grid-cols-2 gap-8">
              {/* Company links */}
              <div>
                <h3 className="font-bold mb-2">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                  <li><Link href="/careers">Careers</Link></li>
                  <li><Link href="/press-kit">Press kit</Link></li>
                </ul>
              </div>
              {/* Social links */}
              <div>
                <h3 className="font-bold mb-2">Social</h3>
                <ul className="space-y-2">
                  <li><Link href="https://twitter.com">Twitter</Link></li>
                  <li><Link href="https://linkedin.com">LinkedIn</Link></li>
                  <li><Link href="https://youtube.com">YouTube</Link></li>
                </ul>
              </div>
            </div>
            {/* New line */}
            <p className="text-lg font-semibold border-t border-white/20 pt-4">Use 100% of your team.</p>
          </div>
          
          {/* Copyright and legal */}
          <div className="text-right space-y-2">
            <p>Brainbase © MMXXIII-MMXXIV</p>
            <ul className="space-y-2">
              <li><Link href="/terms">Terms of service</Link></li>
              <li><Link href="/privacy">Privacy policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}