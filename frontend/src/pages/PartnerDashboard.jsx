import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Edit, Trash2, CheckCircle, XCircle, Save, X } from "lucide-react";
import api from "../api"; // axios instance préconfigurée avec baseURL et interceptor

export default function PartnerDashboard({ currentUser, onAuthError }) {
  const colors = {
    primary: '#73946B',
    secondary: '#D2D0A0',
    dark: '#000000',
    base: '#FFFFFF'
  };

  const [offres, setOffres] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    agence_id: currentUser?.agence?.id || "",
    destination: "",
    description: "",
    budget: "",
    date: "",
    duration: "",
    travelers: "",
    image: null
  };
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    // Update agence_id when user changes
    setForm(f => ({ ...f, agence_id: currentUser?.agence?.id || "" }));
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offresRes, reservationsRes] = await Promise.all([
          api.get('/offres'),
          api.get('/my-reservations')
        ]);
        setOffres(offresRes.data);
        setReservations(reservationsRes.data);
      } catch (e) {
        console.error("Fetch error", e);
        if (e.response?.status === 401) onAuthError?.();
      }
    };
    fetchData();
  }, [onAuthError]);

  const resetForm = () => {
    setForm({ ...initialForm, agence_id: currentUser?.agence?.id || "", image: null });
  };

  const handleSubmit = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === 'image') {
        if (v) fd.append(k, v);
      } else fd.append(k, v);
    });

    try {
      let res;
      if (editingId) {
        res = await api.post(`/offres/${editingId}?_method=PUT`, fd);
        setOffres(o => o.map(x => x.id === editingId ? res.data : x));
      } else {
        res = await api.post('/offres', fd);
        setOffres(o => [...o, res.data]);
      }
      resetForm();
      setEditingId(null);
      setIsAdding(false);
    } catch (e) {
      console.error("Submit error", e.response || e);
      if (e.response?.status === 401) onAuthError?.();
    }
  };

  const startEdit = (offre) => {
    setEditingId(offre.id);
    setForm({
      agence_id: currentUser?.agence?.id || "",
      destination: offre.destination,
      description: offre.description,
      budget: offre.budget,
      date: offre.date,
      duration: offre.duration,
      travelers: offre.travelers,
      image: null
    });
    setIsAdding(true);
  };

  const handleDeleteOffre = async (id) => {
    try {
      await api.delete(`/offres/${id}`);
      setOffres(o => o.filter(x => x.id !== id));
    } catch (e) {
      console.error("Delete offre error", e);
      if (e.response?.status === 401) onAuthError?.();
    }
  };

  const updateReservation = async (id, etat) => {
    try {
      const res = await api.put(`/reservations/${id}`, { etat });
      setReservations(r => r.map(x => x.id === id ? res.data : x));
    } catch (e) {
      console.error("Update reservation error", e);
      if (e.response?.status === 401) onAuthError?.();
    }
  };

  const deleteReservation = async (id) => {
    try {
      await api.delete(`/reservations/${id}`);
      setReservations(r => r.filter(x => x.id !== id));
    } catch (e) {
      console.error("Delete reservation error", e);
      if (e.response?.status === 401) onAuthError?.();
    }
  };

  return (
    <div className="pt-20 px-4 sm:px-6 min-h-screen" style={{ backgroundColor: colors.base }}>
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold mb-8"
          style={{ color: colors.dark }}
        >
          Tableau de bord <span style={{ color: colors.primary }}>Partenaire</span>
        </motion.h1>

        {/* Offres */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold" style={{ color: colors.dark }}>Mes offres</h2>
            {!isAdding && (
              <motion.button 
                onClick={() => { resetForm(); setIsAdding(true); }} 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-md"
                style={{ backgroundColor: colors.primary, color: colors.base }}
              >
                <PlusCircle size={20}/> Nouvelle offre
              </motion.button>
            )}
          </div>

          {(isAdding) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-6 rounded-xl shadow-md"
              style={{ backgroundColor: colors.base, border: `1px solid ${colors.primary}50` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ['destination', 'Destination', 'text'],
                  ['description','Description','textarea'],
                  ['budget','Budget (€)','number'],
                  ['date','Date','date'],
                  ['duration','Durée (j)','number'],
                  ['travelers','Voyageurs','number']
                ].map(([key,label,type]) => (
                  <div key={key} className={key==='description'?'md:col-span-2':''}>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.dark }}>
                      {label} <span className="text-red-500">*</span>
                    </label>
                    {type==='textarea'
                      ? <textarea
                          value={form[key]}
                          onChange={e => setForm(f => ({...f, [key]: e.target.value}))}
                          rows={3}
                          className="w-full p-2 rounded-md"
                          style={{ border: `1px solid ${colors.secondary}`, backgroundColor: colors.base }}
                        />
                      : <input
                          type={type}
                          value={form[key]}
                          onChange={e => setForm(f => ({...f, [key]: e.target.value}))}
                          className="w-full p-2 rounded-md"
                          style={{ border: `1px solid ${colors.secondary}`, backgroundColor: colors.base }}
                        />
                    }
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.dark }}>
                    Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setForm(f => ({...f, image: e.target.files[0]}))}
                    className="w-full p-2 rounded-md"
                    style={{ border: `1px solid ${colors.secondary}`, backgroundColor: colors.base }}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handleSubmit}
                  disabled={
                    !form.destination ||
                    !form.description ||
                    !form.budget ||
                    !form.date ||
                    !form.duration ||
                    !form.travelers ||
                    (editingId ? false : !form.image)
                  }
                  className="px-4 py-2 rounded-md flex items-center gap-2"
                  style={{ backgroundColor: colors.primary, color: colors.base }}
                >
                  <Save size={18}/> {editingId ? "Mettre à jour" : "Enregistrer"}
                </button>
                <button
                  onClick={() => { setIsAdding(false); setEditingId(null); }}
                  className="px-4 py-2 rounded-md flex items-center gap-2"
                  style={{ backgroundColor: colors.secondary, color: colors.dark }}
                >
                  <X size={18}/> Annuler
                </button>
              </div>
            </motion.div>
          )}

          {offres.length === 0 && !isAdding
            ? <div className="text-center py-12 rounded-xl" style={{ border: `1px solid ${colors.secondary}` }}>
                <p style={{ color: colors.dark }}>Aucune offre créée</p>
                <button onClick={() => setIsAdding(true)} className="mt-4 font-medium" style={{ color: colors.primary }}>
                  Créer une offre
                </button>
              </div>
            : <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {offres.map(o => (
                  <motion.div key={o.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }} className="group relative rounded-xl shadow-sm overflow-hidden"
                    style={{ border: `1px solid ${colors.secondary}`, backgroundColor: colors.base }}
                  >
                    <div className="h-40 overflow-hidden">
                      <img src={o.url_image} alt={o.destination}
                           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold" style={{ color: colors.dark }}>{o.destination}</h3>
                          <p className="text-sm mt-1" style={{ color: colors.dark }}>{o.description}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm font-semibold"
                              style={{ backgroundColor: colors.primary + '20', color: colors.primary }}>
                          {o.budget} €
                        </span>
                      </div>
                      <div className="flex justify-end gap-3 mt-4 pt-4" style={{ borderTop: `1px solid ${colors.secondary}` }}>
                        <motion.button onClick={() => startEdit(o)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                       title="Modifier" style={{ color: colors.primary }}><Edit size={18}/></motion.button>
                        <motion.button onClick={() => handleDeleteOffre(o.id)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                       title="Supprimer" style={{ color: colors.primary }}><Trash2 size={18}/></motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
          }
        </section>

        {/* Réservations */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold" style={{ color: colors.dark }}>Réservations clients</h2>
            <span className="text-sm" style={{ color: colors.primary }}>
              {reservations.length} réservation{reservations.length>1?'s':''}
            </span>
          </div>

          {reservations.length === 0
            ? <div className="text-center py-12 rounded-xl" style={{ border: `1px solid ${colors.secondary}` }}>
                <p style={{ color: colors.dark }}>Aucune réservation</p>
              </div>
            : <AnimatePresence>
                {reservations.map(r => (
                  <motion.div key={r.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                    className="p-5 rounded-xl mb-4 flex flex-col sm:flex-row justify-between items-start"
                    style={{ border: `1px solid ${colors.secondary}`, backgroundColor: colors.base }}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${
                          r.etat==='Confirmée'?'bg-green-500':
                          r.etat==='Annulée'?'bg-red-500':'bg-yellow-500'}`} />
                        <h3 className="font-semibold" style={{ color: colors.dark }}>
                          {r.user.name} – <span style={{ color: colors.primary }}>{r.offre.destination}</span>
                        </h3>
                      </div>
                      <div className="mt-2 text-sm" style={{ color: colors.dark }}>
                        {r.date} · {r.nbPersonne} personne{r.nbPersonne>1?'s':''}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 sm:mt-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        r.etat==='Confirmée'?'bg-green-100 text-green-800':
                        r.etat==='Annulée'?'bg-red-100 text-red-800':'bg-yellow-100 text-yellow-800'}`}>
                        {r.etat}
                      </span>
                      {r.etat==='En attente' && (
                        <>
                          <motion.button onClick={() => updateReservation(r.id, 'Confirmée')}
                                         title="Confirmer" whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
                                         className="p-2 rounded-full" style={{ color: colors.primary }}>
                            <CheckCircle size={20}/>
                          </motion.button>
                          <motion.button onClick={() => updateReservation(r.id, 'Annulée')}
                                         title="Annuler" whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
                                         className="p-2 rounded-full" style={{ color: colors.primary }}>
                            <XCircle size={20}/>
                          </motion.button>
                        </>
                      )}
                      <motion.button onClick={() => deleteReservation(r.id)}
                                     title="Supprimer" whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
                                     className="p-2 rounded-full" style={{ color: colors.primary }}>
                        <Trash2 size={20}/>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
          }
        </section>
      </div>
    </div>
  );
}
