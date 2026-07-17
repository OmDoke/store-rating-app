import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateSignupForm } from '../utils/validation';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', address: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validateSignupForm(form);
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.email || nextErrors.address || nextErrors.password) return;

    try {
      await register(form);
      navigate('/user/stores');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h2 className="mb-6 text-2xl font-semibold">Create Account</h2>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input className={`w-full rounded border p-2 ${errors.name ? 'border-red-500' : ''}`} placeholder="Full Name (20-60 chars)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          <div>
            <input className={`w-full rounded border p-2 ${errors.email ? 'border-red-500' : ''}`} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <textarea className={`w-full rounded border p-2 ${errors.address ? 'border-red-500' : ''}`} placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>
          <div>
            <input className={`w-full rounded border p-2 ${errors.password ? 'border-red-500' : ''}`} type="password" placeholder="Password (8-16, uppercase + special)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
          <button className="w-full rounded bg-slate-900 px-4 py-2 text-white" type="submit">Create Account</button>
        </form>
        <p className="mt-4 text-sm"><Link className="text-blue-600" to="/login">Back to login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
