import { useEffect, useState } from 'react';
import api from '../../api/axios';

const OwnerDashboard = () => {
  const [data, setData] = useState({ averageRating: 0, raters: [] });

  useEffect(() => {
    api.get('/owner/dashboard').then((res) => setData(res.data.data)).catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-6xl p-8">
      <h2 className="mb-4 text-2xl font-semibold">Store Owner Dashboard</h2>
      <div className="mb-6 rounded-xl bg-white p-6 shadow">
        <p className="text-sm text-slate-500">Average Rating</p>
        <p className="text-3xl font-semibold">{data.averageRating?.toFixed(1)}</p>
      </div>
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.raters.map((rater, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{rater.name}</td>
                <td className="p-3">{rater.email}</td>
                <td className="p-3">{rater.rating}</td>
                <td className="p-3">{new Date(rater.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerDashboard;
