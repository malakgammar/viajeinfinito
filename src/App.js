import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Agencies from './pages/Agencies';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Blog from './pages/Blog'
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agencies" element={<Agencies />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Auth />} />
        <Route path="/blog" element={<Blog />}/>
      </Routes>
      <Footer />
    </Router>
  );
}