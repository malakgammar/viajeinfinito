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
import Adherer from './pages/adherer';
import Payment from './pages/payment';
import AgenceOffres from "./pages/AgenceOffres";
import Personnaliser from './pages/Personnaliser';
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
         <Route path="/payment" element={<Payment />} />

        <Route path="/agence/:id" element={<AgenceOffres />} />
        <Route path="/personnaliser" element={<Personnaliser />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />   
        <Route path="/partner/dashboard" element={<PartnerDashboard />} />
        <Route path="/adherer" element={<Adherer />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
    </Router>
  );
}