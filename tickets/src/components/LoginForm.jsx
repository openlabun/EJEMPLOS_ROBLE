import { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth'
import { isAxiosError } from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate()

  const handleLogin = async () => {
    setErrorMsg('')
    const credentials = {
      email,
      password
    }
    try {
      const response = await login(credentials);
      const { accessToken, refreshToken, user } = response.data
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('rol', user.role);
      localStorage.setItem('userId', user.id);

      if (user.role === 'admin') {
        navigate('/admin')
      } else if (user.role === 'user') {
        navigate('dashboard')
      } else {
        navigate('/')
      }
    } catch (err) {
      if (isAxiosError(err)) {
        const msg = err.response?.data?.message || 'Error inesperado al iniciar sesión.';
        setErrorMsg(msg)
      } else {
        setErrorMsg('Error al iniciar sesión')
      }
    }
  }

  return (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>

      {errorMsg && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md border border-red-300">
          {errorMsg}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700">Correo</label>
        <input
          type="email"
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password"
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Iniciar Sesión
      </button>
    </form>
  );
}

export default LoginForm;

