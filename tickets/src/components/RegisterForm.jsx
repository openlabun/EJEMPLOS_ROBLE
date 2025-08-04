import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';
import { isAxiosError } from 'axios';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    setErrorMsg('');
    const userData = {
      name,
      email,
      password: pass,
    };
    try {
      await register(userData);
      alert('Cuenta creada con éxito. Ya puedes iniciar sesión.');
      navigate('/login');
    } catch (err) {
      if (isAxiosError(err)) {
        const msg = err.response?.data?.message || 'Error inesperado al registrarse.';
        setErrorMsg(msg);
      } else {
        setErrorMsg('Error al registrarse.');
      }
    }
  };

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister();
      }}
    >
      {errorMsg && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md border border-red-300">
          {errorMsg}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password"
          placeholder="********"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Registrarse
      </button>
    </form>
  );
}

export default RegisterForm;
