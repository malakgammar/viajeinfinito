import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

// Configuration Axios globale
axios.defaults.baseURL = 'http://localhost:8000/api'; // Adaptez selon votre URL de base
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
    status: 'pending'
  });

  // Chargement des données
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/v1/agences');
        setAgencies(response.data);
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
    if (error.response) {
      // Erreurs 4xx/5xx
      setError(error.response.data.message || `Erreur ${error.response.status}`);
    } else if (error.request) {
      // Pas de réponse du serveur
      setError("Pas de réponse du serveur - vérifiez votre connexion");
    } else {
      // Erreur de configuration
      setError("Erreur de configuration de la requête");
    }
  };

  // Filtrage des agences
  const filteredAgencies = agencies.filter(agency => {
    const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         agency.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || agency.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Gestion du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/v1/agences', formData);
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
      status: 'pending'
    });
  };

  // Changement de statut
  const toggleAgencyStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await axios.patch(`/v1/agences/${id}`, { status: newStatus });
      setAgencies(agencies.map(agency => 
        agency.id === id ? { ...agency, status: newStatus } : agency
      ));
    } catch (err) {
      handleApiError(err);
    }
  };

  // Préparation des données pour les graphiques
  const statusData = [
    { name: 'Actives', value: agencies.filter(a => a.status === 'active').length },
    { name: 'En attente', value: agencies.filter(a => a.status === 'pending').length },
    { name: 'Inactives', value: agencies.filter(a => a.status === 'inactive').length },
  ];

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="min-h-screen bg-[#F8F8F8] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Header 
          title="Gestion des agences" 
          subtitle="Administration des agences partenaires" 
        />

        <StatsSection agencies={agencies} />
        
        <ChartSection data={statusData} />
        
        <ActionButtons 
          showForm={showForm} 
          onToggleForm={() => setShowForm(!showForm)} 
        />

        {showForm && (
          <AgencyForm 
            formData={formData} 
            onChange={handleInputChange} 
            onSubmit={handleSubmit} 
            onCancel={() => setShowForm(false)} 
          />
        )}

        <AgencyList 
          agencies={filteredAgencies} 
          searchTerm={searchTerm} 
          statusFilter={statusFilter} 
          onSearchChange={setSearchTerm} 
          onStatusFilterChange={setStatusFilter} 
          onToggleStatus={toggleAgencyStatus} 
        />
      </div>
    </div>
  );
}

// Composants séparés pour une meilleure maintenabilité
function LoadingSpinner() {
  return (
    <div className="text-center py-20 text-[#73946B]">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#73946B]"></div>
      <p className="mt-2">Chargement en cours...</p>
    </div>
  );
}

function ErrorDisplay({ message, onRetry }) {
  return (
    <div className="text-center py-20">
      <div className="bg-red-50 border-l-4 border-red-400 p-4 max-w-md mx-auto">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{message}</p>
          </div>
        </div>
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-[#73946B] text-white rounded-lg hover:bg-[#5a7a52]"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}

function Header({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-[#73946B]">{title}</h1>
      <p className="text-[#D2D0A0] mt-2">{subtitle}</p>
    </div>
  );
}

function StatsSection({ agencies }) {
  const activeAgencies = agencies.filter(a => a.status === 'active').length;
  const pendingAgencies = agencies.filter(a => a.status === 'pending').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Agences totales" 
        value={agencies.length} 
        icon="users"
        color="bg-[#73946B]"
      />
      <StatCard 
        title="Agences actives" 
        value={activeAgencies} 
        icon="check-circle"
        color="bg-[#D2D0A0]"
      />
      <StatCard 
        title="En attente" 
        value={pendingAgencies} 
        icon="clock"
        color="bg-[#8A9D7A]"
      />
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const icons = {
    users: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    ),
    'check-circle': (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    clock: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    )
  };

  return (
    <div className={`${color} text-white rounded-lg shadow-md overflow-hidden`}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-white bg-opacity-20 rounded-lg p-3">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {icons[icon]}
            </svg>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dt className="text-sm font-medium truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-bold">{value}</div>
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartSection({ data }) {
  return (
    <div className="mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md border border-[#D2D0A0]">
        <h3 className="text-lg font-semibold text-[#73946B] mb-4">Répartition des statuts</h3>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ActionButtons({ showForm, onToggleForm }) {
  return (
    <div className="mb-6 flex justify-end">
      <button
        onClick={onToggleForm}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          showForm 
            ? 'bg-white text-[#73946B] border border-[#73946B] hover:bg-gray-100' 
            : 'bg-[#73946B] text-white hover:bg-[#5a7a52]'
        }`}
      >
        {showForm ? 'Annuler' : '+ Ajouter une agence'}
      </button>
    </div>
  );
}

function AgencyForm({ formData, onChange, onSubmit, onCancel }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#D2D0A0] mb-8">
      <div className="bg-[#73946B] px-6 py-4 text-white">
        <h3 className="text-xl font-bold">Nouvelle agence</h3>
      </div>
      
      <form onSubmit={onSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput 
            label="Nom de l'agence"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
          <FormInput 
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
          <FormInput 
            label="Téléphone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            required
          />
          <FormSelect 
            label="Statut"
            name="status"
            value={formData.status}
            onChange={onChange}
            options={[
              { value: 'pending', label: 'En attente' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]}
          />
          <div className="md:col-span-2">
            <FormInput 
              label="Adresse"
              name="address"
              value={formData.address}
              onChange={onChange}
            />
          </div>
          <div className="md:col-span-2">
            <FormTextarea 
              label="Description"
              name="description"
              value={formData.description}
              onChange={onChange}
              rows={3}
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#73946B] text-white rounded-lg hover:bg-[#5a7a52]"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}

function FormInput({ label, type = 'text', name, value, onChange, required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#73946B] mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-[#D2D0A0] rounded-lg focus:ring-2 focus:ring-[#73946B] focus:border-[#73946B]"
        required={required}
      />
    </div>
  );
}

function FormSelect({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#73946B] mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-[#D2D0A0] rounded-lg focus:ring-2 focus:ring-[#73946B] focus:border-[#73946B]"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

function FormTextarea({ label, name, value, onChange, rows = 3 }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#73946B] mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full p-3 border border-[#D2D0A0] rounded-lg focus:ring-2 focus:ring-[#73946B] focus:border-[#73946B]"
      />
    </div>
  );
}

function AgencyList({ agencies, searchTerm, statusFilter, onSearchChange, onStatusFilterChange, onToggleStatus }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#D2D0A0]">
      <div className="bg-[#73946B] px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <h3 className="text-xl font-bold text-white">Liste des agences</h3>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
          <SearchInput 
            value={searchTerm} 
            onChange={onSearchChange} 
          />
          <StatusFilter 
            value={statusFilter} 
            onChange={onStatusFilterChange} 
          />
        </div>
      </div>
      
      <div className="bg-white overflow-hidden">
        {agencies.length > 0 ? (
          <ul className="divide-y divide-[#D2D0A0]">
            {agencies.map(agency => (
              <AgencyItem 
                key={agency.id} 
                agency={agency} 
                onToggleStatus={onToggleStatus} 
              />
            ))}
          </ul>
        ) : (
          <EmptyState 
            searchTerm={searchTerm} 
          />
        )}
      </div>
    </div>
  );
}

function SearchInput({ value, onChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Rechercher..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-4 pr-10 py-2 border border-[#D2D0A0] rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D2D0A0] focus:border-[#D2D0A0]"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

function StatusFilter({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full pl-3 pr-10 py-2 border border-[#D2D0A0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#D2D0A0] focus:border-[#D2D0A0]"
    >
      <option value="all">Tous statuts</option>
      <option value="active">Actives</option>
      <option value="pending">En attente</option>
      <option value="inactive">Inactives</option>
    </select>
  );
}

function AgencyItem({ agency, onToggleStatus }) {
  return (
    <li className="px-6 py-4 hover:bg-[#F8F8F8] transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12 mr-4 bg-[#D2D0A0] rounded-lg flex items-center justify-center text-[#73946B] font-bold">
            {agency.name.charAt(0)}
          </div>
          <div>
            <p className="text-lg font-semibold text-[#73946B]">{agency.name}</p>
            <p className="text-sm text-gray-600">{agency.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <StatusBadge status={agency.status} />
          <ToggleStatusButton 
            status={agency.status} 
            onClick={() => onToggleStatus(agency.id, agency.status)} 
          />
        </div>
      </div>
    </li>
  );
}

function StatusBadge({ status }) {
  const statusConfig = {
    active: { bg: 'bg-[#D2D0A0]', text: 'text-[#73946B]', label: 'Active' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En attente' },
    inactive: { bg: 'bg-red-100', text: 'text-red-800', label: 'Inactive' }
  };

  return (
    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${statusConfig[status].bg} ${statusConfig[status].text}`}>
      {statusConfig[status].label}
    </span>
  );
}

function ToggleStatusButton({ status, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-lg text-sm font-medium ${
        status === "active" 
          ? "bg-white text-[#73946B] border border-[#73946B] hover:bg-[#73946B] hover:text-white" 
          : "bg-[#73946B] text-white hover:bg-[#5a7a52]"
      } transition-colors`}
    >
      {status === "active" ? "Désactiver" : "Activer"}
    </button>
  );
}

function EmptyState({ searchTerm }) {
  return (
    <div className="px-4 py-12 text-center">
      <svg
        className="mx-auto h-12 w-12 text-[#D2D0A0]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-[#73946B]">
        {searchTerm ? "Aucun résultat trouvé" : "Aucune agence enregistrée"}
      </h3>
      <p className="mt-1 text-sm text-[#D2D0A0]">
        {searchTerm ? "Essayez une autre recherche" : "Commencez par ajouter une nouvelle agence"}
      </p>
    </div>
  );
}