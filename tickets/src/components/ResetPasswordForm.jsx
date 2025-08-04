import { useState } from 'react';
import API from '../services/api';

function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [newPass, setNewPass] = useState('');

  const handleReset = async () => {
    try {
      await API.post('/reset-password', { email, new_password: newPass });
      alert("Contraseña actualizada.");
    } catch {
      alert("No se pudo cambiar la contraseña.");
    }
  };

  return (
    <div className="form">
      <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Nueva contraseña" value={newPass} onChange={e => setNewPass(e.target.value)} />
      <button onClick={handleReset}>Cambiar</button>
    </div>
  );
}

export default ResetPasswordForm;
