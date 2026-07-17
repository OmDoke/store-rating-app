import { useState } from 'react';
import api from '../api/axios';
import { validatePasswordUpdateForm } from '../utils/validation';

const UpdatePassword = () => {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
  const [errors, setErrors] = useState({ currentPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validatePasswordUpdateForm(form);
    setErrors(nextErrors);
    if (nextErrors.currentPassword || nextErrors.newPassword) return;

    try {
      await api.put('/auth/update-password', form);
      setMessage('Password updated successfully');
      setError('');
      setForm({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow mt-8">
      <h2 className="mb-6 text-2xl font-semibold">Update Password</h2>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input className={`w-full rounded border p-2 ${errors.currentPassword ? 'border-red-500' : ''}`} type="password" placeholder="Current Password" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} />
          {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
        </div>
        <div>
          <input className={`w-full rounded border p-2 ${errors.newPassword ? 'border-red-500' : ''}`} type="password" placeholder="New Password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
          {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
        </div>
        <button className="rounded bg-slate-900 px-4 py-2 text-white" type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
