import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Agences from './pages/Agences';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Blog from './pages/Blog';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import PartnerDashboard from "./pages/PartnerDashboard";
import Footer from './components/Footer';
import ReservationForm from './pages/reservationForm';
import AgenceOffres from "./pages/AgenceOffres";
import ConfirmationPage from './pages/ConfirmationPage';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';
import Adherer from './pages/adherer';

export default function App() { 
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agences" element={<Agences />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog" element={<Blog />}/>
        <Route path="/reservation" element={<ReservationForm />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/offres" element={<AgenceOffres />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />   
        <Route path="/partner/dashboard" element={<PartnerDashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/adherer" element={<Adherer />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </Router>
  );
}