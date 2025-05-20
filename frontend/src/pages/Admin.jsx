// import React, { useState } from 'react';
// import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A4DE6C'];

// export default function AdminAgences() {
//   // Données simulées
//   const initialAgencies = [
//     {
//       id: 1,
//       name: "Agence Voyages France",
//       email: "contact@voyagesfrance.com",
//       phone: "01 23 45 67 89",
//       status: "active",
//       description: "Spécialiste des voyages en France",
//       address: "123 Rue de Paris, 75001 Paris",
//       image: "https://source.unsplash.com/random/300x200/?paris",
//       reservations: 42,
//       totalRevenue: 12500,
//       offers: [
//         { id: 1, title: "Week-end à Paris", price: 299 },
//         { id: 2, title: "Tour de France", price: 899 }
//       ]
//     },
//     {
//       id: 2,
//       name: "Sunny Beach Tours",
//       email: "info@sunnybeach.com",
//       phone: "04 56 78 90 12",
//       status: "pending",
//       description: "Voyages balnéaires à prix discount",
//       address: "456 Avenue des Plages, 13000 Marseille",
//       image: "https://source.unsplash.com/random/300x200/?beach",
//       reservations: 18,
//       totalRevenue: 6200,
//       offers: [
//         { id: 3, title: "Séjour Corse", price: 499 },
//         { id: 4, title: "Croisière Méditerranée", price: 1299 }
//       ]
//     }
//   ];

//   const [agencies, setAgencies] = useState(initialAgencies);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [selectedAgency, setSelectedAgency] = useState(null);

//   // Filtrage des agences
//   const filteredAgencies = agencies.filter(agency => {
//     const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          agency.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === "all" || agency.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   // Préparation des données pour les graphiques
//   const reservationData = agencies.map(agency => ({ 
//     name: agency.name,
//     Réservations: agency.reservations,
//     Revenu: agency.totalRevenue
//   }));

//   const statusData = [
//     { name: 'Actives', value: agencies.filter(a => a.status === 'active').length },
//     { name: 'En attente', value: agencies.filter(a => a.status === 'pending').length },
//     { name: 'Inactives', value: agencies.filter(a => a.status === 'inactive').length },
//   ];

//   // Changement de statut des agences
//   const toggleAgencyStatus = (id) => {
//     setAgencies(agencies.map(agency => {
//       if (agency.id === id) {
//         const newStatus = agency.status === 'active' ? 'inactive' : 'active';
//         return { ...agency, status: newStatus };
//       }
//       return agency;
//     }));
//   };

//   // Calcul des statistiques
//   const totalReservations = agencies.reduce((sum, agency) => sum + agency.reservations, 0);
//   const totalRevenue = agencies.reduce((sum, agency) => sum + (agency.totalRevenue || 0), 0);
//   const activeAgencies = agencies.filter(a => a.status === 'active').length;

//   // Affichage des détails d'une agence
//   if (selectedAgency) {
//     return (
//       <div className="pt-20 min-h-screen px-6 bg-gray-50">
//         <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//           <button 
//             onClick={() => setSelectedAgency(null)}
//             className="mb-6 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             ← Retour à la liste
//           </button>
          
//           <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//             <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900">
//                   Détails de l'agence: {selectedAgency.name}
//                 </h3>
//                 <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                   selectedAgency.status === "active" ? "bg-green-100 text-green-800" :
//                   selectedAgency.status === "pending" ? "bg-yellow-100 text-yellow-800" :
//                   "bg-red-100 text-red-800"
//                 }`}>
//                   {selectedAgency.status === "active" ? "Active" : 
//                    selectedAgency.status === "pending" ? "En attente" : "Inactive"}
//                 </span>
//               </div>
//             </div>
            
//             <div className="px-4 py-5 sm:p-6">
//               <div className="flex flex-col md:flex-row gap-8">
//                 <div className="md:w-1/3">
//                   <img 
//                     className="w-full h-auto rounded-lg shadow-md" 
//                     src={selectedAgency.image} 
//                     alt={selectedAgency.name} 
//                   />
//                 </div>
                
//                 <div className="md:w-2/3">
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-500">Email</h4>
//                       <p className="mt-1 text-sm text-gray-900">{selectedAgency.email}</p>
//                     </div>
                    
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-500">Téléphone</h4>
//                       <p className="mt-1 text-sm text-gray-900">{selectedAgency.phone}</p>
//                     </div>
                    
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-500">Adresse</h4>
//                       <p className="mt-1 text-sm text-gray-900">{selectedAgency.address}</p>
//                     </div>
                    
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-500">Description</h4>
//                       <p className="mt-1 text-sm text-gray-900">{selectedAgency.description}</p>
//                     </div>
                    
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-500">Statistiques</h4>
//                       <div className="mt-2 grid grid-cols-2 gap-4">
//                         <div className="bg-gray-50 p-3 rounded">
//                           <p className="text-sm text-gray-500">Réservations</p>
//                           <p className="text-lg font-semibold">{selectedAgency.reservations}</p>
//                         </div>
//                         <div className="bg-gray-50 p-3 rounded">
//                           <p className="text-sm text-gray-500">Revenu total</p>
//                           <p className="text-lg font-semibold">{selectedAgency.totalRevenue}€</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="mt-8">
//                 <h4 className="text-lg font-medium text-gray-900 mb-4">Offres proposées</h4>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   {selectedAgency.offers.length > 0 ? (
//                     <ul className="divide-y divide-gray-200">
//                       {selectedAgency.offers.map(offer => (
//                         <li key={offer.id} className="py-4">
//                           <div className="flex justify-between">
//                             <div>
//                               <p className="text-sm font-medium text-gray-900">{offer.title}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">{offer.price}€</p>
//                             </div>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p className="text-sm text-gray-500">Aucune offre disponible</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Affichage de la liste des agences
//   return (
//     <div className="pt-20 min-h-screen px-6 bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold text-gray-900">Tableau de bord - Agences</h1>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         {/* Statistiques rapides */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <StatCard 
//             title="Agences totales" 
//             value={agencies.length} 
//             icon={
//               <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//             }
//             color="bg-blue-500"
//           />
          
//           <StatCard 
//             title="Agences actives" 
//             value={activeAgencies} 
//             icon={
//               <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//               </svg>
//             }
//             color="bg-green-500"
//           />
          
//           <StatCard 
//             title="Réservations" 
//             value={totalReservations} 
//             icon={
//               <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//             }
//             color="bg-purple-500"
//           />
          
//           <StatCard 
//             title="Revenu total" 
//             value={`${totalRevenue}€`} 
//             icon={
//               <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             }
//             color="bg-yellow-500"
//           />
//         </div>

//         {/* Graphiques */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           <ChartCard title="Statut des agences">
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={statusData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {statusData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </ChartCard>
          
//           <ChartCard title="Réservations & revenus par agence">
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={reservationData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis yAxisId="left" orientation="left" stroke="#0088FE" />
//                 <YAxis yAxisId="right" orientation="right" stroke="#FF8042" />
//                 <Tooltip />
//                 <Legend />
//                 <Bar yAxisId="left" dataKey="Réservations" fill="#0088FE" name="Réservations" />
//                 <Bar yAxisId="right" dataKey="Revenu" fill="#FF8042" name="Revenu (€)" />
//               </BarChart>
//             </ResponsiveContainer>
//           </ChartCard>
//         </div>

//         {/* Liste des agences */}
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//           <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
//             <h3 className="text-lg leading-6 font-medium text-gray-900">Gestion des agences</h3>
//             <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Rechercher..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//               </div>
              
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               >
//                 <option value="all">Tous statuts</option>
//                 <option value="active">Actives</option>
//                 <option value="pending">En attente</option>
//                 <option value="inactive">Inactives</option>
//               </select>
//             </div>
//           </div>
          
//           <div className="bg-white overflow-hidden">
//             <ul className="divide-y divide-gray-200">
//               {filteredAgencies.length > 0 ? (
//                 filteredAgencies.map((agency) => (
//                   <AgencyItem 
//                     key={agency.id} 
//                     agency={agency} 
//                     onToggleStatus={toggleAgencyStatus}
//                     onViewDetails={() => setSelectedAgency(agency)}
//                   />
//                 ))
//               ) : (
//                 <li className="px-4 py-12 text-center">
//                   <svg
//                     className="mx-auto h-12 w-12 text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       vectorEffect="non-scaling-stroke"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune agence trouvée</h3>
//                   <p className="mt-1 text-sm text-gray-500">
//                     Essayez de modifier vos critères de recherche.
//                   </p>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// // Composant StatCard
// function StatCard({ title, value, icon, color }) {
//   return (
//     <div className="bg-white overflow-hidden shadow rounded-lg">
//       <div className="px-4 py-5 sm:p-6">
//         <div className="flex items-center">
//           <div className={`flex-shrink-0 ${color} rounded-md p-3`}>
//             {icon}
//           </div>
//           <div className="ml-5 w-0 flex-1">
//             <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
//             <dd className="flex items-baseline">
//               <div className="text-2xl font-semibold text-gray-900">{value}</div>
//             </dd>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Composant ChartCard
// function ChartCard({ title, children }) {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
//       {children}
//     </div>
//   );
// }

// // Composant AgencyItem
// function AgencyItem({ agency, onToggleStatus, onViewDetails }) {
//   return (
//     <li>
//       <div className="px-4 py-4 sm:px-6">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="flex-shrink-0 h-16 w-16 mr-4">
//               <img className="h-16 w-16 rounded-md object-cover" src={agency.image} alt={agency.name} />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-blue-600 truncate">{agency.name}</p>
//               <p className="text-sm text-gray-500">{agency.email}</p>
//               <p className="text-sm text-gray-500">{agency.phone}</p>
//             </div>
//           </div>
//           <div className="ml-4 flex flex-col items-end">
//             <div className="flex items-center">
//               <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                 agency.status === "active" ? "bg-green-100 text-green-800" :
//                 agency.status === "pending" ? "bg-yellow-100 text-yellow-800" :
//                 "bg-red-100 text-red-800"
//               }`}>
//                 {agency.status === "active" ? "Active" : 
//                  agency.status === "pending" ? "En attente" : "Inactive"}
//               </span>
//             </div>
//             <p className="text-sm text-gray-900 mt-1">
//               {agency.reservations} réservations
//             </p>
//             <p className="text-sm text-gray-900">
//               {agency.totalRevenue || 0}€ de revenu
//             </p>
//           </div>
//         </div>
        
//         <div className="mt-4">
//           <p className="text-sm text-gray-500">{agency.description}</p>
//           <p className="text-sm text-gray-500 mt-1">{agency.address}</p>
//         </div>
        
//         <div className="mt-4 flex justify-end space-x-3">
//           <button
//             onClick={() => onToggleStatus(agency.id)}
//             className={`inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//               agency.status === "active" ? "hover:text-red-700" : "hover:text-green-700"
//             }`}
//           >
//             {agency.status === "active" ? "Désactiver" : "Activer"}
//           </button>
//           <button
//             onClick={onViewDetails}
//             className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Voir détails
//           </button>
//         </div>
//       </div>
//     </li>
//   );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#73946B', '#D2D0A0', '#A3B899', '#8A9D7A', '#6B7D63'];

export default function AdminAgences() {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAgency, setSelectedAgency] = useState(null);

  // Chargement des données
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [agenciesRes, reservationsRes] = await Promise.all([
          axios.get('/api/agencies'),
          axios.get('/api/reservations/stats')
        ]);

        const agenciesWithStats = agenciesRes.data.map(agency => {
          const stats = reservationsRes.data.find(r => r.agencyId === agency.id);
          return {
            ...agency,
            reservations: stats?.count || 0,
            totalRevenue: stats?.total || 0
          };
        });

        setAgencies(agenciesWithStats);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Chargement des détails d'une agence
  const fetchAgencyDetails = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/agencies/${id}`);
      setSelectedAgency(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Erreur lors du chargement des détails");
    } finally {
      setLoading(false);
    }
  };

  // Filtrage des agences
  const filteredAgencies = agencies.filter(agency => {
    const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         agency.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || agency.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Préparation des données pour les graphiques
  const reservationData = agencies.map(agency => ({ 
    name: agency.name,
    Réservations: agency.reservations,
    Revenu: agency.totalRevenue
  }));

  const statusData = [
    { name: 'Actives', value: agencies.filter(a => a.status === 'active').length },
    { name: 'En attente', value: agencies.filter(a => a.status === 'pending').length },
    { name: 'Inactives', value: agencies.filter(a => a.status === 'inactive').length },
  ];

  // Changement de statut des agences
  const toggleAgencyStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      await axios.patch(`/api/agencies/${id}/status`, { status: newStatus });
      setAgencies(agencies.map(agency => 
        agency.id === id ? { ...agency, status: newStatus } : agency
      ));
      
      if (selectedAgency && selectedAgency.id === id) {
        setSelectedAgency({ ...selectedAgency, status: newStatus });
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Échec de la mise à jour du statut");
    }
  };

  // Calcul des statistiques
  const totalReservations = agencies.reduce((sum, agency) => sum + agency.reservations, 0);
  const totalRevenue = agencies.reduce((sum, agency) => sum + (agency.totalRevenue || 0), 0);
  const activeAgencies = agencies.filter(a => a.status === 'active').length;

  // Affichage des détails d'une agence
  if (selectedAgency) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button 
            onClick={() => setSelectedAgency(null)}
            className="mb-6 flex items-center text-[#73946B] hover:text-[#5a7a52] transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à la liste
          </button>
          
          {loading ? (
            <div className="text-center py-12 text-[#73946B]">Chargement des détails...</div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#D2D0A0]">
              <div className="bg-[#73946B] px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">
                    {selectedAgency.name}
                  </h3>
                  <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                    selectedAgency.status === "active" ? "bg-[#D2D0A0] text-[#73946B]" :
                    selectedAgency.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {selectedAgency.status === "active" ? "Active" : 
                     selectedAgency.status === "pending" ? "En attente" : "Inactive"}
                  </span>
                </div>
              </div>
              
              <div className="px-6 py-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <div className="bg-[#F8F8F8] p-4 rounded-lg">
                      <img 
                        className="w-full h-auto rounded-lg shadow-md border border-[#D2D0A0]" 
                        src={selectedAgency.image || 'https://source.unsplash.com/random/300x200/?travel'} 
                        alt={selectedAgency.name} 
                      />
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-[#73946B]">Contact</h4>
                        <p className="mt-1 text-gray-700">{selectedAgency.email}</p>
                        <p className="mt-1 text-gray-700">{selectedAgency.phone}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-[#73946B]">Adresse</h4>
                        <p className="mt-1 text-gray-700">{selectedAgency.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-2/3">
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-[#73946B] mb-4">Description</h4>
                      <p className="text-gray-700">{selectedAgency.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <StatCard 
                        title="Réservations" 
                        value={selectedAgency.reservations} 
                        color="bg-[#73946B]"
                        icon={
                          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        }
                      />
                      
                      <StatCard 
                        title="Revenu total" 
                        value={`${selectedAgency.totalRevenue}€`} 
                        color="bg-[#D2D0A0]"
                        icon={
                          <svg className="h-6 w-6 text-[#73946B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        }
                      />
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-[#73946B] mb-4">Offres proposées</h4>
                      <div className="bg-[#F8F8F8] rounded-lg p-4 border border-[#D2D0A0]">
                        {selectedAgency.offers?.length > 0 ? (
                          <ul className="divide-y divide-[#D2D0A0]">
                            {selectedAgency.offers.map(offer => (
                              <li key={offer.id} className="py-4">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-medium text-[#73946B]">{offer.title}</p>
                                    <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold">{offer.price}€</p>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                      offer.available ? 'bg-[#D2D0A0] text-[#73946B]' : 'bg-gray-200 text-gray-800'
                                    }`}>
                                      {offer.available ? 'Disponible' : 'Non disponible'}
                                    </span>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-center text-gray-500">Aucune offre disponible</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-[#F8F8F8] border-t border-[#D2D0A0] flex justify-end">
                <button
                  onClick={() => toggleAgencyStatus(selectedAgency.id, selectedAgency.status)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedAgency.status === "active" 
                      ? "bg-white text-[#73946B] border border-[#73946B] hover:bg-[#73946B] hover:text-white" 
                      : "bg-[#73946B] text-white hover:bg-[#5a7a52]"
                  } transition-colors`}
                >
                  {selectedAgency.status === "active" ? "Désactiver l'agence" : "Activer l'agence"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Affichage principal (liste des agences)
  return (
    <div className="min-h-screen bg-[#F8F8F8] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#73946B]">Dashboard administrateur</h1>
          <p className="text-[#D2D0A0] mt-2">Gestion et statistiques des agences partenaires</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-[#73946B]">Chargement des données...</div>
        ) : (
          <>
            {/* Statistiques rapides */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Agences totales" 
                value={agencies.length} 
                color="bg-[#73946B]"
                icon={
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                }
              />
              
              <StatCard 
                title="Agences actives" 
                value={activeAgencies} 
                color="bg-[#D2D0A0]"
                icon={
                  <svg className="h-6 w-6 text-[#73946B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
              />
              
              <StatCard 
                title="Réservations" 
                value={totalReservations} 
                color="bg-[#73946B]"
                icon={
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
              />
              
              <StatCard 
                title="Revenu total" 
                value={`${totalRevenue}€`} 
                color="bg-[#D2D0A0]"
                icon={
                  <svg className="h-6 w-6 text-[#73946B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
            </div>

            {/* Graphiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <ChartCard title="Statut des agences">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
              
              <ChartCard title="Réservations & revenus par agence">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={reservationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D2D0A0" />
                    <XAxis dataKey="name" stroke="#73946B" />
                    <YAxis yAxisId="left" orientation="left" stroke="#73946B" />
                    <YAxis yAxisId="right" orientation="right" stroke="#D2D0A0" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="Réservations" fill="#73946B" name="Réservations" />
                    <Bar yAxisId="right" dataKey="Revenu" fill="#D2D0A0" name="Revenu (€)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* Liste des agences */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#D2D0A0]">
              <div className="bg-[#73946B] px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <h3 className="text-xl font-bold text-white">Liste des agences</h3>
                <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D2D0A0] focus:border-[#D2D0A0] sm:text-sm"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-[#D2D0A0] focus:border-[#D2D0A0] sm:text-sm"
                  >
                    <option value="all">Tous statuts</option>
                    <option value="active">Actives</option>
                    <option value="pending">En attente</option>
                    <option value="inactive">Inactives</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden">
                <ul className="divide-y divide-[#D2D0A0]">
                  {filteredAgencies.length > 0 ? (
                    filteredAgencies.map((agency) => (
                      <AgencyItem 
                        key={agency.id} 
                        agency={agency} 
                        onToggleStatus={() => toggleAgencyStatus(agency.id, agency.status)}
                        onViewDetails={() => fetchAgencyDetails(agency.id)}
                      />
                    ))
                  ) : (
                    <li className="px-4 py-12 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-[#D2D0A0]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          vectorEffect="non-scaling-stroke"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h3 className="mt-2 text-lg font-medium text-[#73946B]">Aucune agence trouvée</h3>
                      <p className="mt-1 text-sm text-[#D2D0A0]">
                        Essayez de modifier vos critères de recherche.
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Composant StatCard
function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#D2D0A0]">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${color} rounded-lg p-3`}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dt className="text-sm font-medium text-[#73946B] truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-bold text-gray-800">{value}</div>
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant ChartCard
function ChartCard({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-[#D2D0A0]">
      <h3 className="text-lg font-semibold text-[#73946B] mb-4">{title}</h3>
      {children}
    </div>
  );
}

// Composant AgencyItem
function AgencyItem({ agency, onToggleStatus, onViewDetails }) {
  return (
    <li>
      <div className="px-6 py-5 hover:bg-[#F8F8F8] transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-16 w-16 mr-4">
              <img 
                className="h-16 w-16 rounded-lg object-cover border border-[#D2D0A0]" 
                src={agency.image || 'https://source.unsplash.com/random/300x200/?travel'} 
                alt={agency.name} 
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-[#73946B]">{agency.name}</p>
              <p className="text-sm text-gray-600">{agency.email}</p>
              <p className="text-sm text-gray-600">{agency.phone}</p>
            </div>
          </div>
          <div className="ml-4 flex flex-col items-end">
            <div className="flex items-center">
              <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                agency.status === "active" ? "bg-[#D2D0A0] text-[#73946B]" :
                agency.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                "bg-red-100 text-red-800"
              }`}>
                {agency.status === "active" ? "Active" : 
                 agency.status === "pending" ? "En attente" : "Inactive"}
              </span>
            </div>
            <div className="mt-2 text-right">
              <p className="text-sm font-medium text-[#73946B]">
                {agency.reservations} réservations
              </p>
              <p className="text-sm font-medium text-[#D2D0A0]">
                {agency.totalRevenue || 0}€
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-700 line-clamp-2">{agency.description}</p>
        </div>
        
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={onToggleStatus}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              agency.status === "active" 
                ? "bg-white text-[#73946B] border border-[#73946B] hover:bg-[#73946B] hover:text-white" 
                : "bg-[#73946B] text-white hover:bg-[#5a7a52]"
            } transition-colors`}
          >
            {agency.status === "active" ? "Désactiver" : "Activer"}
          </button>
          <button
            onClick={onViewDetails}
            className="px-4 py-2 bg-[#D2D0A0] text-[#73946B] rounded-lg font-medium hover:bg-[#c0be90] transition-colors"
          >
            Voir détails
          </button>
        </div>
      </div>
    </li>
  );
}