import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Crear Cuenta</h2>
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
