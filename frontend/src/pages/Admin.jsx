import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Configuration Axios globale
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const COLORS = ['#73946B', '#D2D0A0', '#A3B899', '#8A9D7A', '#6B7D63'];

export default function AdminAgences() {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    status: 'active'
  });

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/v1/agences');
        const agenciesWithActiveStatus = response.data.map(agency => ({
          ...agency,
          status: 'active'
        }));
        setAgencies(agenciesWithActiveStatus || []);
      } catch (err) {
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgencies();
  }, []);

  const handleApiError = (error) => {
    console.error('API Error:', error);
    setError(error.response?.data?.message || 
             error.message || 
             "Une erreur est survenue lors du chargement des données");
  };

  const filteredAgencies = agencies.filter(agency => {
    const name = agency.name || '';
    const email = agency.email || '';
    const agencyStatus = agency.status || 'active';
    
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || agencyStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/v1/agences', {
        ...formData,
        status: 'active'
      });
      setAgencies([...agencies, response.data]);
      setShowForm(false);
      resetForm();
    } catch (err) {
      handleApiError(err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      description: '',
      status: 'active'
    });
  };

  const statusData = [
    { name: 'Actives', value: agencies.length }
  ];

  if (loading) return (
    <div className="text-center py-20 text-[#73946B]">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#73946B]"></div>
      <p className="mt-2">Chargement en cours...</p>
    </div>
  );

  if (error) return (
    <div className="text-center py-20">
      <div className="bg-red-50 border-l-4 border-red-400 p-4 max-w-md mx-auto">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-[#73946B] text-white rounded-lg hover:bg-[#5a7a52]"
        >
          Réessayer
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F8F8] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#73946B]">Gestion des agences</h1>
          <p className="text-[#D2D0A0] mt-2">Administration des agences partenaires</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#73946B] p-6 rounded-lg shadow-lg text-white flex items-center">
            <svg className="w-12 h-12 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z" />
            </svg>
            <div>
              <p className="text-3xl font-semibold">{agencies.length}</p>
              <p>Agences totales</p>
            </div>
          </div>
          <div className="bg-[#D2D0A0] p-6 rounded-lg shadow-lg text-white flex items-center">
            <svg className="w-12 h-12 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <div>
              <p className="text-3xl font-semibold">{agencies.length}</p>
              <p>Agences actives</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center text-[#73946B]">Répartition des agences</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setShowForm(!showForm)}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition-colors ${
              showForm ? 'bg-red-600 hover:bg-red-700' : 'bg-[#73946B] hover:bg-[#5a7a52]'
            }`}
          >
            {showForm ? "Annuler" : "Ajouter une agence"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mb-8">
            <h3 className="text-xl font-semibold mb-4 text-[#73946B]">Nouvelle agence</h3>

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom<span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#73946B]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email<span className="text-red-500"> *</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#73946B]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#73946B]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#73946B]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#73946B]"
              />
            </div>

            <input type="hidden" name="status" value="active" />

            <div className="flex justify-end space-x-4 mt-6">
    
              <button
                type="submit"
                className="px-6 py-2 bg-[#73946B] text-white rounded hover:bg-[#5a7a52]"
              >
                Enregistrer
              </button>
            </div>
          </form>
        )}

        <div>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4 max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="Rechercher une agence par nom ou email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="flex-grow mb-3 md:mb-0 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#73946B]"
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#73946B]"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actives</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead className="bg-[#73946B] text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Nom</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Téléphone</th>
                  <th className="py-3 px-6 text-left">Adresse</th>
                  <th className="py-3 px-6 text-left">Statut</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgencies.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      Aucune agence trouvée.
                    </td>
                  </tr>
                ) : (
                  filteredAgencies.map(agency => (
                    <tr key={agency.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-6">{agency.name}</td>
                      <td className="py-3 px-6">{agency.email || '-'}</td>
                      <td className="py-3 px-6">{agency.phone || '-'}</td>
                      <td className="py-3 px-6">{agency.address || '-'}</td>
                      <td className="py-3 px-6">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}