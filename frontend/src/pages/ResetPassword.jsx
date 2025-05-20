import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../api';

export default function ResetPassword() {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirmation) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      await axios.post('/reset-password', {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });

      setSuccess(true);
      setTimeout(() => navigate('/auth'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue.');
    }
  };

  if (success) {
    return <p className="text-green-600 text-center mt-8">Mot de passe mis à jour ! Redirection...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-4 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold text-center">Réinitialisation du mot de passe</h2>
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="password"
        placeholder="Nouveau mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Confirmer le mot de passe"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Réinitialiser le mot de passe
      </button>
    </form>
  );
}
