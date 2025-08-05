import { useState } from 'react';
import { resetPassword } from '../services/auth';

function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setStatusMsg('');
    try {
      await resetPassword({ email });
      setStatusMsg('Revisa tu correo y sigue las instrucciones');
    } catch (err) {
      console.error(err);
      setStatusMsg('No se pudo enviar el correo para cambio de contraseña');
    }
  };

  return (
    <form className="form space-y-4" onSubmit={handleReset}>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Cambiar contraseña
      </button>

      {statusMsg && (
        <p className="mt-2 text-center">{statusMsg}</p>
      )}
    </form>
  );
}

export default ResetPasswordForm;
