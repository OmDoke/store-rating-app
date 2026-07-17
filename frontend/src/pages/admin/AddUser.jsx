import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const AddUser = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '', role: 'normal' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/users', form);
      navigate('/admin/users');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow mt-8">
      <h2 className="mb-6 text-2xl font-semibold">Add User</h2>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full rounded border p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full rounded border p-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <textarea className="w-full rounded border p-2" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <input className="w-full rounded border p-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select className="w-full rounded border p-2" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="normal">Normal</option>
          <option value="store_owner">Store Owner</option>
          <option value="admin">Admin</option>
        </select>
        <button className="rounded bg-slate-900 px-4 py-2 text-white" type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddUser;
