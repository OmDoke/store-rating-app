import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import DataTable from '../../components/DataTable';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' });

  const loadUsers = async () => {
    const query = new URLSearchParams(filters).toString();
    const { data } = await api.get(`/admin/users?${query}`);
    setUsers(data.data || []);
  };

  useEffect(() => { loadUsers(); }, []);

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="mx-auto max-w-6xl p-8">
      <h2 className="mb-4 text-2xl font-semibold">Users</h2>
      <button className="mb-4 rounded bg-slate-900 px-4 py-2 text-white" onClick={loadUsers}>Apply</button>
      <DataTable
        columns={[
          { key: 'name', label: 'Name', render: (row) => <Link className="text-blue-600" to={`/admin/users/${row.id}`}>{row.name}</Link> },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
        ]}
        data={users}
        filters={filters}
        onFilterChange={handleFilterChange}
        filterFields={[
          { key: 'name', placeholder: 'Name' },
          { key: 'email', placeholder: 'Email' },
          { key: 'address', placeholder: 'Address' },
          { key: 'role', placeholder: 'Role' },
        ]}
      />
    </div>
  );
};

export default UserList;
