import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const AddStore = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '', ownerId: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/stores', form);
      navigate('/admin/stores');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create store');
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow mt-8">
      <h2 className="mb-6 text-2xl font-semibold">Add Store</h2>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full rounded border p-2" placeholder="Store Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full rounded border p-2" placeholder="Store Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <textarea className="w-full rounded border p-2" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <input className="w-full rounded border p-2" placeholder="Owner ID (optional)" value={form.ownerId} onChange={(e) => setForm({ ...form, ownerId: e.target.value })} />
        <button className="rounded bg-slate-900 px-4 py-2 text-white" type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddStore;
