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
            Découvrez des recommandations locales pour une expérience authentique.
          </p>
          <div className="flex items-center mt-4 space-x-2 text-sm">
            <span>📞</span>
            <span>Besoin d’aide ? Appelez-nous</span>
          </div>
          <div className="text-secondary font-bold text-lg">+212 548548921</div>
        </div>

        {/* Entreprise */}
        <div>
          <h4 className="font-semibold mb-2">Entreprise</h4>
          <ul className="space-y-1 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-secondary">À propos</Link></li>
            <li><Link to="/blog" className="hover:text-secondary">Blog Communautaire</Link></li>
            <li><Link to="/Contact" className="hover:text-secondary">Contactez-nous</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-2">Services</h4>
          <ul className="space-y-1 text-sm text-white/70">
            <li><Link to="/services/tour-booking" className="hover:text-secondary">Réservation de Tours</Link></li>
            <li><Link to="/services/hotel-booking" className="hover:text-secondary">Réservation d’Hôtels</Link></li>
            <li><Link to="/services/ticket-booking" className="hover:text-secondary">Réservation de Billets</Link></li>
            <li><Link to="/services/rental" className="hover:text-secondary">Services de Location</Link></li>
          </ul>
        </div>

        {/* Mentions légales */}
        <div>
          <h4 className="font-semibold mb-2">Mentions légales</h4>
          <ul className="space-y-1 text-sm text-white/70">
            <li><Link to="/legal/terms" className="hover:text-secondary">Conditions d’utilisation</Link></li>
            <li><Link to="/legal/privacy" className="hover:text-secondary">Politique de confidentialité</Link></li>
            <li><Link to="/legal/cookies" className="hover:text-secondary">Politique des cookies</Link></li>
            <li><Link to="/legal/data-processing" className="hover:text-secondary">Traitement des données</Link></li>
            <li><Link to="/legal/data-policy" className="hover:text-secondary">Politique des données</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-sm text-white/70">
            <li><Link to="/support/forum" className="hover:text-secondary">Forum de support</Link></li>
            <li><Link to="/support/help-center" className="hover:text-secondary">Centre d’aide</Link></li>
            <li><Link to="/support/how-it-works" className="hover:text-secondary">Comment ça marche</Link></li>
          </ul>
        </div>

        {/* Contact / Newsletter */}
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <div className="bg-transparent border rounded-full flex items-center px-3 py-2 text-sm text-white/70">
            <span className="mr-2">✉️</span>
            <input
              type="email"
              placeholder="Votre email"
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

      {/* Barre du bas */}
      <div className="mt-12 border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between text-xs text-white/70">
        <p>© 2025 ViajeInfinito Inc. Tous droits réservés.</p>
        <p className="mt-2 md:mt-0">Suivez-nous</p>
      </div>
    </footer>
  );
}
