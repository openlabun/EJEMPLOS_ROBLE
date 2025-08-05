import ResetPasswordForm from '../components/ResetPasswordForm';
import { Link } from 'react-router-dom';

function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-black">Recuperar Contraseña</h1>
          <p className="text-gray-500">Introduce tu correo</p>
        </div>
        <ResetPasswordForm />
        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Recordaste tu contraseña?{' '}
          <Link to="/" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
