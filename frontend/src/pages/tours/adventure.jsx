// src/pages/tours/Adventure.jsx
import { useState, useEffect } from 'react';
import api from '../../api';
import Header from '../../components/Header';

export default function AdventureTours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await api.get('/tours/adventure');
        setTours(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTours();
  }, []);

  return (
    <div className="pt-20">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-dark mb-8">Tours d'Aventure</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map(tour => (
            <div key={tour.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={tour.url_image} alt={tour.destination} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-dark mb-2">{tour.destination}</h2>
                <p className="text-gray-600 mb-4">{tour.duration} jours • {tour.travelers} personnes</p>
                <p className="text-gray-700 mb-4">{tour.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">{tour.budget} €</span>
                  <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition">
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}