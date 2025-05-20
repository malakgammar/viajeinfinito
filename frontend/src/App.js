import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Agences from './pages/Agences';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Blog from './pages/Blog';
import Profile from './pages/Profile';
import PartnerDashboard from "./pages/PartnerDashboard";
import Footer from './components/Footer';
import ReservationForm from './pages/reservationForm';
import AgenceOffres from "./pages/AgenceOffres";
import ConfirmationPage from './pages/ConfirmationPage';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agences" element={<Agences />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog" element={<Blog />}/>
        <Route path="/reservation" element={<ReservationForm />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/agence/:id" element={<AgenceOffres />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />   
        <Route path="/partner/dashboard" element={<PartnerDashboard />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
    </Router>
  );
}