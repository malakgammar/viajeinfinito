import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Edit, Trash2, CheckCircle, XCircle, Save, X } from "lucide-react";
import api from "../api";

export default function PartnerDashboard({ currentUser }) {
  const colors = {
    primary: '#73946B',
    secondary: '#D2D0A0',
    dark: '#000000',
    base: '#FFFFFF'
  };

  const [packages, setPackages] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [newPackage, setNewPackage] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    date: "",
    duration: "",
    travelers: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offresResponse, reservationsResponse] = await Promise.all([
          api.get('/offres'),
          api.get('/reservations')
        ]);
        setPackages(offresResponse.data);
        setReservations(reservationsResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

const handleAddPackage = async () => {
  try {
    if (!currentUser?.agence?.id) {
      console.error("No agency found for current user");
      return;
    }

    const formData = new FormData();
    formData.append('agence_id', currentUser.agence.id);
    formData.append('destination', newPackage.title);
    formData.append('description', newPackage.description);
    formData.append('budget', newPackage.price);
    formData.append('date', newPackage.date);
    formData.append('duration', newPackage.duration);
    formData.append('travelers', newPackage.travelers);
    
    // Ensure image is properly appended
    if (newPackage.image) {
      formData.append('image', newPackage.image);
    }

    // Get auth token (adjust based on your auth storage)
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    const response = await api.post('/offres', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    setPackages(prev => [...prev, response.data]);
    resetForm();
    setIsAddingPackage(false);
    
  } catch (err) {
    console.error("Error adding package:", {
      error: err,
      response: err.response?.data
    });
    // Add user-friendly error handling here
  }
};

// Helper function to reset form
const resetForm = () => {
  setNewPackage({ 
    title: "", 
    description: "", 
    price: "", 
    image: null,
    date: "",
    duration: "",
    travelers: ""
  });
};


  const handleEditPackage = (id) => {
    const pkg = packages.find(p => p.id === id);
    setNewPackage({
      title: pkg.destination,
      description: pkg.description,
      price: pkg.budget.toString(),
      image: pkg.url_image
    });
    setEditingPackageId(id);
  };

  const handleUpdatePackage = () => {
    api.put(`/offres/${editingPackageId}`, {
      destination: newPackage.title,
      description: newPackage.description,
      budget: newPackage.price,
      url_image: newPackage.image,
    })
    .then(res => {
      setPackages(prev =>
        prev.map(p => p.id === editingPackageId ? res.data : p)
      );
      setEditingPackageId(null);
      setNewPackage({ title:"", description:"", price:"", image:"" });
    })
    .catch(err => console.error(err));
  };

  const handleDeletePackage = (id) => {
    api.delete(`/offres/${id}`)
       .then(() => setPackages(prev => prev.filter(p => p.id !== id)))
       .catch(err => console.error(err));
  };

  // Actions Réservations
  const handleConfirmReservation = (id) => {
    api.put(`/reservations/${id}`, { etat: 'Confirmée' })
       .then(res => {
         setReservations(prev =>
           prev.map(r => r.id === id ? res.data : r)
         );
       })
       .catch(err => console.error(err));
  };

  const handleCancelReservation = (id) => {
    api.put(`/reservations/${id}`, { etat: 'Annulée' })
       .then(res => {
         setReservations(prev =>
           prev.map(r => r.id === id ? res.data : r)
         );
       })
       .catch(err => console.error(err));
  };

  const handleDeleteReservation = (id) => {
    api.delete(`/reservations/${id}`)
       .then(() => setReservations(prev => prev.filter(r => r.id !== id)))
       .catch(err => console.error(err));
  };

  return (
    <div className="pt-20 px-4 sm:px-6 min-h-screen" style={{ backgroundColor: colors.base }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: colors.dark }}>
            Tableau de bord <span style={{ color: colors.primary }}>partenaire</span>
          </h1>

          {/* MES OFFRES */}
          <section className="mb-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <h2 className="text-2xl font-bold" style={{ color: colors.dark }}>Mes offres</h2>
              {!isAddingPackage && !editingPackageId && (
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAddingPackage(true)}
                  className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md"
                  style={{ backgroundColor: colors.primary, color: colors.base }}
                >
                  <PlusCircle size={20} /> Créer une nouvelle offre
                </motion.button>
              )}
            </div>

            {/* Formulaire */}
            {(isAddingPackage || editingPackageId) && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} className="mb-6 p-6 rounded-xl shadow-md"
                style={{ backgroundColor: colors.base, border: `1px solid ${colors.primary}50` }}
              >
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.dark }}>
                  {editingPackageId ? "Modifier l'offre" : "Nouvelle offre"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Titre */}
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.dark }}>
                      Titre <span className="text-red-500">*</span>
                    </label>
                    <input type="text" value={newPackage.title}
                      onChange={e => setNewPackage({...newPackage, title: e.target.value})}
                      className="w-full p-2 rounded-md"
                      style={{ border: `1px solid ${colors.secondary}`, backgroundColor: colors.base }}
                      required
                    />
                  </div>
                  {/* Prix */}
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.dark }}>
                      Prix (€) <span className="text-red-500">*</span>
                    </label>
                    <input type="number" value={newPackage.price}
                      onChange={e => setNewPackage({...newPackage, price: e.target.value})}
                      className="w-full p-2 rounded-md"
                      style={{ border: `1px solid ${colors.secondary}`, backgroundColor: colors.base }}
                      required min="0"
                    />
                  </div>
                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.dark }}>
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea value={newPackage.description}
                      onChange={e => setNewPackage({...newPackage, description: e.target.value})}
                      className="w-full p-2 rounded-md" rows="3"
                      style={{ border: `1px solid ${colors.secondary}`, backgroundColor: colors.base }}
                      required
                    />
                  </div>
                  {/* Image Upload */}
<div className="md:col-span-2">
  <label className="block text-sm font-medium mb-1" style={{ color: colors.dark }}>
    Image <span className="text-red-500">*</span>
  </label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        setNewPackage({ ...newPackage, image: file });
      }
    }}
    className="w-full p-2 rounded-md"
    style={{
      border: `1px solid ${colors.secondary}`,
      backgroundColor: colors.base,
    }}
    required
  />
</div>

                   {/* Date */}
  <div>
    <label className="block text-sm font-medium mb-1" style={{ color: colors.dark }}>
      Date <span className="text-red-500">*</span>
    </label>
    <input type="date" 
      value={newPackage.date}
      onChange={e => setNewPackage({...newPackage, date: e.target.value})}
      className="w-full p-2 rounded-md"
      style={{ border: `1px solid ${colors.secondary}`, backgroundColor: colors.base }}
      required
    />
  </div>
  {/* Duration */}
  <div>
    <label className="block text-sm font-medium mb-1" style={{ color: colors.dark }}>
      Durée (jours) <span className="text-red-500">*</span>
    </label>
    <input type="number" 
      value={newPackage.duration}
      onChange={e => setNewPackage({...newPackage, duration: e.target.value})}
      className="w-full p-2 rounded-md"
      style={{ border: `1px solid ${colors.secondary}`, backgroundColor: colors.base }}
      required min="1"
    />
  </div>
  {/* Travelers */}
  <div>
    <label className="block text-sm font-medium mb-1" style={{ color: colors.dark }}>
      Voyageurs <span className="text-red-500">*</span>
    </label>
    <input type="number" 
      value={newPackage.travelers}
      onChange={e => setNewPackage({...newPackage, travelers: e.target.value})}
      className="w-full p-2 rounded-md"
      style={{ border: `1px solid ${colors.secondary}`, backgroundColor: colors.base }}
      required min="1"
    />
  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button onClick={editingPackageId ? handleUpdatePackage : handleAddPackage}
                    className="px-4 py-2 rounded-md flex items-center gap-2"
                    style={{ backgroundColor: colors.primary, color: colors.base }}
                    disabled={!newPackage.title || !newPackage.description || !newPackage.price || !newPackage.image}
                  >
                    <Save size={18} /> Enregistrer
                  </button>
                  <button onClick={() => {
                      if (editingPackageId) {
                        setEditingPackageId(null);
                        setNewPackage({ title:"", description:"", price:"", image:"" });
                      } else {
                        setIsAddingPackage(false);
                      }
                    }}
                    className="px-4 py-2 rounded-md flex items-center gap-2"
                    style={{ backgroundColor: colors.secondary, color: colors.dark }}
                  >
                    <X size={18} /> Annuler
                  </button>
                </div>
              </motion.div>
            )}

            {/* Liste des offres */}
            {packages.length === 0 && !isAddingPackage ? (
              <div className="text-center py-12 rounded-xl"
                style={{ backgroundColor: colors.base, border: `1px solid ${colors.secondary}` }}
              >
                <p style={{ color: colors.dark }}>Vous n'avez pas encore créé d'offres</p>
                <button onClick={() => setIsAddingPackage(true)}
                  className="mt-4 font-medium" style={{ color: colors.primary }}
                >Créer ma première offre</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {packages.map(pkg => (
                  <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }} whileHover={{ y: -5 }}
                    className="group relative overflow-hidden rounded-xl shadow-sm transition-all"
                    style={{ backgroundColor: colors.base, border: `1px solid ${colors.secondary}` }}
                  >
                    <div className="h-40 overflow-hidden">
                      <img src={pkg.url_image} alt={pkg.destination}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold" style={{ color: colors.dark }}>{pkg.destination}</h3>
                          <p className="text-sm mt-1" style={{ color: colors.dark }}>{pkg.description}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm font-semibold"
                          style={{ backgroundColor: colors.primary + '20', color: colors.primary }}
                        >
                          {pkg.budget} €
                        </span>
                      </div>
                      <div className="flex justify-end gap-3 mt-4 pt-4" style={{ borderTop: `1px solid ${colors.secondary}` }}>
                        <motion.button onClick={() => handleEditPackage(pkg.id)} whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }} title="Modifier" className="transition-colors"
                          style={{ color: colors.primary }}
                        ><Edit size={18} /></motion.button>
                        <motion.button onClick={() => handleDeletePackage(pkg.id)} whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }} title="Supprimer" className="transition-colors"
                          style={{ color: colors.primary }}
                        ><Trash2 size={18} /></motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* RÉSERVATIONS CLIENTS */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold" style={{ color: colors.dark }}>Réservations clients</h2>
              <div className="text-sm" style={{ color: colors.primary }}>
                {reservations.length} réservation{reservations.length !== 1 ? 's' : ''}
              </div>
            </div>

            {reservations.length === 0 ? (
              <div className="text-center py-12 rounded-xl"
                style={{ backgroundColor: colors.base, border: `1px solid ${colors.secondary}` }}
              >
                <p style={{ color: colors.dark }}>Aucune réservation pour le moment</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {reservations.map(res => (
                    <motion.div key={res.id} initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }} whileHover={{ x: 5 }}
                      className="p-5 rounded-xl transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                      style={{ backgroundColor: colors.base, border: `1px solid ${colors.secondary}` }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded-full ${
                            res.etat === "Confirmée" ? "bg-green-500" :
                            res.etat === "Annulée" ? "bg-red-500" : "bg-yellow-500"
                          }`} />
                          <h3 className="font-semibold" style={{ color: colors.dark }}>
                            {res.user.name} – <span style={{ color: colors.primary }}>{res.offre.destination}</span>
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm" style={{ color: colors.dark }}>
                          <span>{res.date}</span>
                          <span>{res.nbPersonne} personne{res.nbPersonne > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          res.etat === "Confirmée" ? "bg-green-100 text-green-800" :
                          res.etat === "Annulée" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {res.etat}
                        </span>
                        <div className="flex gap-2 ml-2">
                          {res.etat === "En attente" && (
                            <>
                              <motion.button onClick={() => handleConfirmReservation(res.id)}
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-full transition-colors" title="Confirmer"
                                style={{ color: colors.primary }}
                              ><CheckCircle size={20} /></motion.button>
                              <motion.button onClick={() => handleCancelReservation(res.id)}
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-full transition-colors" title="Annuler"
                                style={{ color: colors.primary }}
                              ><XCircle size={20} /></motion.button>
                            </>
                          )}
                          <motion.button onClick={() => handleDeleteReservation(res.id)}
                            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full transition-colors" title="Supprimer"
                            style={{ color: colors.primary }}
                          ><Trash2 size={20} /></motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>

        </motion.div>
      </div>
    </div>
  );
}
