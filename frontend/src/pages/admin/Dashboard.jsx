import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });

  useEffect(() => {
    api.get('/admin/dashboard').then((res) => setStats(res.data.data)).catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-6xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <div className="space-x-3">
          <Link className="rounded bg-slate-900 px-4 py-2 text-white" to="/admin/users/new">Add User</Link>
          <Link className="rounded bg-slate-900 px-4 py-2 text-white" to="/admin/stores/new">Add Store</Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow"><p className="text-sm text-slate-500">Users</p><p className="text-3xl font-semibold">{stats.users}</p></div>
        <div className="rounded-xl bg-white p-6 shadow"><p className="text-sm text-slate-500">Stores</p><p className="text-3xl font-semibold">{stats.stores}</p></div>
        <div className="rounded-xl bg-white p-6 shadow"><p className="text-sm text-slate-500">Ratings</p><p className="text-3xl font-semibold">{stats.ratings}</p></div>
      </div>
    </div>
  );
};

export default Dashboard;
