import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get(`/admin/users/${id}`).then((res) => setUser(res.data.data)).catch(() => {});
  }, [id]);

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow mt-8">
      <h2 className="mb-6 text-2xl font-semibold">User Detail</h2>
      <div className="space-y-3">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Role:</strong> {user.role}</p>
        {user.role === 'store_owner' && <p><strong>Store Avg Rating:</strong> {user.storeAvgRating?.toFixed(1)}</p>}
      </div>
    </div>
  );
};

export default UserDetail;
