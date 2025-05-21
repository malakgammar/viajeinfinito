import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Edit, Trash2, CheckCircle, XCircle, ChevronRight, Save, X } from "lucide-react";

export default function PartnerDashboard() {
  // Palette de couleurs
  const colors = {
    primary: '#73946B',   // Vert principal
    secondary: '#D2D0A0', // Beige
    dark: '#000000',      // Noir
    base: '#FFFFFF'       // Blanc
  };

  // États pour les packages
  const [packages, setPackages] = useState([
    { 
      id: 1, 
      title: "Séjour à Bali", 
      description: "7 jours tout compris avec vol, hôtel 4* et excursions", 
      price: 1200,
      image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    { 
      id: 2, 
      title: "Circuit au Maroc", 
      description: "10 jours avec guide francophone, hébergement en riad et demi-pension", 
      price: 999,
      image: "https://images.unsplash.com/photo-1518544866330-95a2bec01e0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
  ]);

  // États pour les réservations
  const [reservations, setReservations] = useState([
    { 
      id: 1, 
      client: "Sophie Martin", 
      destination: "Bali", 
      status: "En attente",
      date: "15-20 Juin 2023",
      travelers: 2
    },
    { 
      id: 2, 
      client: "Alex Dupuis", 
      destination: "Maroc", 
      status: "Confirmée",
      date: "5-15 Septembre 2023",
      travelers: 4
    },
  ]);

  // États pour le formulaire
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [newPackage, setNewPackage] = useState({
    title: "",
    description: "",
    price: "",
    image: ""
  });

  // Fonctions pour les packages
  const handleAddPackage = () => {
    const newId = Math.max(...packages.map(p => p.id), 0) + 1;
    setPackages([...packages, { ...newPackage, id: newId, price: Number(newPackage.price) }]);
    setNewPackage({ title: "", description: "", price: "", image: "" });
    setIsAddingPackage(false);
  };

  const handleEditPackage = (id) => {
    const packageToEdit = packages.find(p => p.id === id);
    setNewPackage({
      title: packageToEdit.title,
      description: packageToEdit.description,
      price: packageToEdit.price.toString(),
      image: packageToEdit.image
    });
    setEditingPackageId(id);
  };

  const handleUpdatePackage = () => {
    setPackages(packages.map(p => 
      p.id === editingPackageId 
        ? { ...newPackage, id: editingPackageId, price: Number(newPackage.price) } 
        : p
    ));
    setEditingPackageId(null);
    setNewPackage({ title: "", description: "", price: "", image: "" });
  };

  const handleDeletePackage = (id) => {
    setPackages(packages.filter(p => p.id !== id));
  };

  const handleCancelEdit = () => {
    setEditingPackageId(null);
    setNewPackage({ title: "", description: "", price: "", image: "" });
  };

  // Fonctions pour les réservations
  const handleConfirmReservation = (id) => {
    setReservations(reservations.map(r => 
      r.id === id ? { ...r, status: "Confirmée" } : r
    ));
  };

  const handleCancelReservation = (id) => {
    setReservations(reservations.map(r => 
      r.id === id ? { ...r, status: "Annulée" } : r
    ));
  };

  const handleDeleteReservation = (id) => {
    setReservations(reservations.filter(r => r.id !== id));
  };

  return (
    <div className="pt-20 px-4 sm:px-6 min-h-screen" style={{ backgroundColor: colors.base }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: colors.dark }}>
            Tableau de bord <span style={{ color: colors.primary }}>partenaire</span>
          </h1>

          {/* Packages */}
          <section className="mb-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <h2 className="text-2xl font-bold" style={{ color: colors.dark }}>Mes offres</h2>
              {!isAddingPackage && !editingPackageId && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAddingPackage(true)}
                  className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: colors.base
                  }}
                >
                  <PlusCircle size={20} /> Créer une nouvelle offre
                </motion.button>
              )}
            </div>

            {/* Formulaire d'ajout/modification */}
            {(isAddingPackage || editingPackageId) && (
                <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-6 rounded-xl shadow-md"
                style={{ 
                    backgroundColor: colors.base,
                    border: `1px solid ${colors.primary}50`
                }}
                >
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.dark }}>
                    {editingPackageId ? "Modifier l'offre" : "Nouvelle offre"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.dark }}>
                        Titre <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={newPackage.title}
                        onChange={(e) => setNewPackage({...newPackage, title: e.target.value})}
                        className="w-full p-2 rounded-md"
                        style={{ 
                        border: `1px solid ${colors.secondary}`,
                        backgroundColor: colors.base
                        }}
                        required
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.dark }}>
                        Prix (€) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        value={newPackage.price}
                        onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
                        className="w-full p-2 rounded-md"
                        style={{ 
                        border: `1px solid ${colors.secondary}`,
                        backgroundColor: colors.base
                        }}
                        required
                        min="0"
                    />
                    </div>
                    <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.dark }}>
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={newPackage.description}
                        onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
                        className="w-full p-2 rounded-md"
                        rows="3"
                        style={{ 
                        border: `1px solid ${colors.secondary}`,
                        backgroundColor: colors.base
                        }}
                        required
                    />
                    </div>
                    <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.dark }}>
                        URL de l'image <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="url"
                        value={newPackage.image}
                        onChange={(e) => setNewPackage({...newPackage, image: e.target.value})}
                        className="w-full p-2 rounded-md"
                        style={{ 
                        border: `1px solid ${colors.secondary}`,
                        backgroundColor: colors.base
                        }}
                        required
                    />
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <button
                    type="submit"
                    onClick={editingPackageId ? handleUpdatePackage : handleAddPackage}
                    className="px-4 py-2 rounded-md flex items-center gap-2"
                    style={{ 
                        backgroundColor: colors.primary,
                        color: colors.base
                    }}
                    disabled={!newPackage.title || !newPackage.description || !newPackage.price || !newPackage.image}
                    >
                    <Save size={18} /> Enregistrer
                    </button>
                    <button
                    type="button"
                    onClick={() => {
                        if (editingPackageId) handleCancelEdit();
                        else setIsAddingPackage(false);
                    }}
                    className="px-4 py-2 rounded-md flex items-center gap-2"
                    style={{ 
                        backgroundColor: colors.secondary,
                        color: colors.dark
                    }}
                    >
                    <X size={18} /> Annuler
                    </button>
                </div>
                </motion.div>
            )}


            {/* Liste des packages */}
            {packages.length === 0 && !isAddingPackage ? (
              <div className="text-center py-12 rounded-xl" style={{ 
                backgroundColor: colors.base,
                border: `1px solid ${colors.secondary}`
              }}>
                <p style={{ color: colors.dark }}>Vous n'avez pas encore créé d'offres</p>
                <button 
                  onClick={() => setIsAddingPackage(true)}
                  className="mt-4 font-medium"
                  style={{ color: colors.primary }}
                >
                  Créer ma première offre
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {packages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group relative overflow-hidden rounded-xl shadow-sm transition-all"
                    whileHover={{ y: -5 }}
                    style={{ 
                      backgroundColor: colors.base,
                      border: `1px solid ${colors.secondary}`
                    }}
                  >
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold" style={{ color: colors.dark }}>{pkg.title}</h3>
                          <p className="text-sm mt-1" style={{ color: colors.dark }}>{pkg.description}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ 
                          backgroundColor: colors.primary + '20',
                          color: colors.primary
                        }}>
                          {pkg.price} €
                        </span>
                      </div>
                      <div className="flex justify-end gap-3 mt-4 pt-4" style={{ borderTop: `1px solid ${colors.secondary}` }}>
                        <motion.button
                          onClick={() => handleEditPackage(pkg.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="transition-colors"
                          title="Modifier"
                          style={{ color: colors.primary }}
                        >
                          <Edit size={18} />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeletePackage(pkg.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="transition-colors"
                          title="Supprimer"
                          style={{ color: colors.primary }}
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Réservations */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold" style={{ color: colors.dark }}>Réservations clients</h2>
              <div className="text-sm" style={{ color: colors.primary }}>
                {reservations.length} réservation{reservations.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            {reservations.length === 0 ? (
              <div className="text-center py-12 rounded-xl" style={{ 
                backgroundColor: colors.base,
                border: `1px solid ${colors.secondary}`
              }}>
                <p style={{ color: colors.dark }}>Aucune réservation pour le moment</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {reservations.map((res) => (
                    <motion.div
                      key={res.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-5 rounded-xl transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                      whileHover={{ x: 5 }}
                      style={{ 
                        backgroundColor: colors.base,
                        border: `1px solid ${colors.secondary}`
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded-full ${
                            res.status === "Confirmée" ? "bg-green-500" :
                            res.status === "Annulée" ? "bg-red-500" : "bg-yellow-500"
                          }`} />
                          <h3 className="font-semibold" style={{ color: colors.dark }}>
                            {res.client} - <span style={{ color: colors.primary }}>{res.destination}</span>
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm" style={{ color: colors.dark }}>
                          <span>{res.date}</span>
                          <span>{res.travelers} personne{res.travelers > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          res.status === "Confirmée" ? "bg-green-100 text-green-800" :
                          res.status === "Annulée" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {res.status}
                        </span>
                        <div className="flex gap-2 ml-2">
                          {res.status === "En attente" && (
                            <>
                              <motion.button
                                onClick={() => handleConfirmReservation(res.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-full transition-colors"
                                title="Confirmer"
                                style={{ color: colors.primary }}
                              >
                                <CheckCircle size={20} />
                              </motion.button>
                              <motion.button
                                onClick={() => handleCancelReservation(res.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-full transition-colors"
                                title="Annuler"
                                style={{ color: colors.primary }}
                              >
                                <XCircle size={20} />
                              </motion.button>
                            </>
                          )}
                          <motion.button
                            onClick={() => handleDeleteReservation(res.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full transition-colors"
                            title="Supprimer"
                            style={{ color: colors.primary }}
                          >
                            <Trash2 size={20} />
                          </motion.button>
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