import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-white px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* Logo & Contact */}
        <div>
          <div className="text-3xl font-extrabold bg-gradient-to-r from-primary to-dark bg-clip-text text-transparent">
            ViajeInfinito
          </div>
          <p className="mt-4 text-sm text-white">
            Dive into local recommendations for a truly authentic experience.
          </p>
          <div className="flex items-center mt-4 space-x-2 text-sm">
            <span>📞</span>
            <span>Need help? Call us</span>
          </div>
          <div className="text-secondary font-bold text-lg">1-800-222-8888</div>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-secondary">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-secondary">Community Blog</Link></li>
            <li><Link to="/careers" className="hover:text-secondary">Jobs & Careers</Link></li>
            <li><Link to="/Contact" className="hover:text-secondary">Contact Us</Link></li>
            <li><Link to="/awards" className="hover:text-secondary">Our Awards</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-2">Services</h4>
          <ul className="space-y-1 text-sm text-white/70">
            <li><Link to="/services/tour-guide" className="hover:text-secondary">Tour Guide</Link></li>
            <li><Link to="/services/tour-booking" className="hover:text-secondary">Tour Booking</Link></li>
            <li><Link to="/services/hotel-booking" className="hover:text-secondary">Hotel Booking</Link></li>
            <li><Link to="/services/ticket-booking" className="hover:text-secondary">Ticket Booking</Link></li>
            <li><Link to="/services/rental" className="hover:text-secondary">Rental Services</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-1 text-sm text-white/70">
            <li><Link to="/legal/terms" className="hover:text-secondary">Terms of Service</Link></li>
            <li><Link to="/legal/privacy" className="hover:text-secondary">Privacy Policy</Link></li>
            <li><Link to="/legal/cookies" className="hover:text-secondary">Cookies Policy</Link></li>
            <li><Link to="/legal/data-processing" className="hover:text-secondary">Data Processing</Link></li>
            <li><Link to="/legal/data-policy" className="hover:text-secondary">Data Policy</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-sm text-white/70">
            <li><Link to="/support/forum" className="hover:text-secondary">Forum Support</Link></li>
            <li><Link to="/support/help-center" className="hover:text-secondary">Help Center</Link></li>
            <li><Link to="/support/how-it-works" className="hover:text-secondary">How it works</Link></li>
            <li><Link to="/support/security" className="hover:text-secondary">Security</Link></li>
          </ul>
        </div>

        {/* Contact / Newsletter */}
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <div className="bg-transparent border rounded-full flex items-center px-3 py-2 text-sm text-white/70">
            <span className="mr-2">✉️</span>
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent outline-none flex-1 placeholder-white/60"
            />
          </div>
          <Link
            to="/Contact"
            className="block mt-4 bg-secondary text-primary text-center px-6 py-2 rounded-full hover:brightness-110"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between text-xs text-white/70">
        <p>© 2025 ViajeInfinito Inc. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Follow us</p>
      </div>
    </footer>
  );
}
