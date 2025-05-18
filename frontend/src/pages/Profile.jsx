import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editTelephone, setEditTelephone] = useState("");
  const [expandedTrip, setExpandedTrip] = useState(null);

  const colors = {
    primary: '#73946B',
    secondary: '#D2D0A0',
    light: '#FAFAF7',
    base: '#FFFFFF'
  };

  useEffect(() => {
    api.get('/user/profile')
      .then(res => {
        setUser(res.data);
        setEditName(res.data.name);
        setEditEmail(res.data.email);
        setEditTelephone(res.data.telephone || '');
        return api.get('/user/reservations');
      })
      .then(res => setReservations(res.data))
      .catch(err => {
        console.error("Erreur API:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/auth');
        }
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/auth");
  };

  const openEditModal = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setEditTelephone(user.telephone);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    api.put('/user/profile', {
      name: editName,
      email: editEmail,
      telephone: editTelephone,
    })
    .then(res => {
      setUser(res.data);
      setIsEditing(false);
    })
    .catch(err => {
      console.error(err);
    });
  };

  const toggleTripDetails = (tripId) => {
    setExpandedTrip(expandedTrip === tripId ? null : tripId);
  };

  if (!user) return null;

  return (
    <div 
      className="pt-20 min-h-screen px-6 flex justify-center"
      style={{ backgroundColor: colors.light }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="max-w-4xl w-full bg-base rounded-3xl shadow-lg p-8 md:p-12 flex flex-col gap-12 relative"
        style={{ 
          border: `2px solid ${colors.primary}30`,
          boxShadow: `0 10px 30px ${colors.primary}15`
        }}
      >
        {/* Header user */}
        <div className="text-center md:text-left">
          <h1 
            className="text-4xl font-extrabold mb-2"
            style={{ color: colors.primary }}
          >
            Bonjour, {user.name} !
          </h1>
          <div className="space-y-2 mb-6">
            <p 
              className="text-lg font-medium flex items-center gap-2"
              style={{ color: colors.primary }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {user.email}
            </p>
            <p 
              className="text-lg font-medium flex items-center gap-2"
              style={{ color: colors.primary }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {user.telephone}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <motion.button
              onClick={openEditModal}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full font-semibold shadow-md flex items-center gap-2"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.base
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Modifier mes infos
            </motion.button>
          </div>
        </div>

        {/* Historique réservations */}
        <section>
          <div className="flex items-center mb-8 gap-4 justify-center md:justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke={colors.primary}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            <h2 
              className="text-2xl font-bold inline-block pb-2"
              style={{ 
                color: colors.primary,
                borderBottom: `3px solid ${colors.secondary}`
              }}
            >
              Mes réservations
            </h2>
          </div>
          
          {reservations.length === 0 ? (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke={colors.primary}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl font-medium mb-6" style={{ color: colors.primary }}>
                Aucune réservation enregistrée.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {reservations.map((trip) => (
                <motion.div
                  key={trip.id}
                  whileHover={{ y: -3 }}
                  className="rounded-xl overflow-hidden"
                  style={{ 
                    backgroundColor: colors.base,
                    boxShadow: `0 5px 15px ${colors.primary}10`
                  }}
                >
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => toggleTripDetails(trip.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold mb-1" style={{ color: colors.primary }}>
                          {trip.destination}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span style={{ color: colors.primary }}>{trip.date}</span>
                        </div>
                      </div>
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-bold ${trip.status === "Terminée" ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                      >
                        {trip.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span style={{ color: colors.primary }}>{trip.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span style={{ color: colors.primary }}>{trip.travelers} personne{trip.travelers > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={colors.primary}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span style={{ color: colors.primary }}>Budget: {trip.budget}</span>
                      </div>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedTrip === trip.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                        style={{ backgroundColor: colors.secondary + '40' }}
                      >
                        <div className="p-6 pt-0">
                          <h4 className="font-semibold mb-2" style={{ color: colors.primary }}>
                            Description du voyage
                          </h4>
                          <p className="text-sm" style={{ color: colors.primary }}>
                            {trip.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Bouton déconnexion */}
        <div className="flex justify-center">
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full font-semibold shadow-md flex items-center gap-2"
            style={{ 
              backgroundColor: colors.secondary,
              color: colors.primary
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Déconnexion
          </motion.button>
        </div>

        {/* Modal Edition */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm"
            >
              <motion.form
                onSubmit={handleSaveEdit}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="rounded-2xl p-8 max-w-md w-full relative overflow-hidden"
                style={{ 
                  backgroundColor: colors.base,
                  border: `3px solid ${colors.primary}`,
                  boxShadow: `0 10px 25px ${colors.primary}20`
                }}
              >
                <div 
                  className="absolute -top-32 -right-32 w-64 h-64 rounded-full"
                  style={{ 
                    backgroundColor: colors.primary + '20',
                    filter: 'blur(60px)'
                  }}
                />
                
                <h3 
                  className="text-2xl font-bold mb-6 text-center"
                  style={{ color: colors.primary }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Modifier mes informations
                </h3>
                
                <div className="mb-6">
                  <label 
                    className="block font-medium mb-2 flex items-center gap-2"
                    style={{ color: colors.primary }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none"
                    style={{ 
                      borderColor: colors.primary + '50',
                      focusRingColor: colors.primary,
                      color: colors.primary
                    }}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label 
                    className="block font-medium mb-2 flex items-center gap-2"
                    style={{ color: colors.primary }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={editTelephone}
                    onChange={(e) => setEditTelephone(e.target.value)}
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none"
                    style={{ 
                      borderColor: colors.primary + '50',
                      focusRingColor: colors.primary,
                      color: colors.primary
                    }}
                    required
                  />
                </div>
                
                <div className="mb-8">
                  <label 
                    className="block font-medium mb-2 flex items-center gap-2"
                    style={{ color: colors.primary }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none"
                    style={{ 
                      borderColor: colors.primary + '50',
                      focusRingColor: colors.primary,
                      color: colors.primary
                    }}
                    required
                  />
                </div>

                <div className="flex justify-between gap-4">
                  <motion.button
                    type="button"
                    onClick={closeEditModal}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 rounded-full font-semibold flex-1 flex items-center justify-center gap-2"
                    style={{ 
                      backgroundColor: colors.secondary + '80',
                      color: colors.primary
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Annuler
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 rounded-full font-semibold flex-1 flex items-center justify-center gap-2"
                    style={{ 
                      backgroundColor: colors.primary,
                      color: colors.base
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Enregistrer
                  </motion.button>
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}