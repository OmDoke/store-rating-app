import { useEffect, useState } from 'react';
import api from '../../api/axios';
import DataTable from '../../components/DataTable';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: '', email: '', address: '' });

  const loadStores = async () => {
    const query = new URLSearchParams(filters).toString();
    const { data } = await api.get(`/admin/stores?${query}`);
    setStores(data.data || []);
  };

  useEffect(() => { loadStores(); }, []);

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="mx-auto max-w-6xl p-8">
      <h2 className="mb-4 text-2xl font-semibold">Stores</h2>
      <button className="mb-4 rounded bg-slate-900 px-4 py-2 text-white" onClick={loadStores}>Apply</button>
      <DataTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'address', label: 'Address' },
          { key: 'avgRating', label: 'Avg Rating', render: (row) => row.avgRating?.toFixed(1) },
        ]}
        data={stores}
        filters={filters}
        onFilterChange={handleFilterChange}
        filterFields={[
          { key: 'name', placeholder: 'Name' },
          { key: 'email', placeholder: 'Email' },
          { key: 'address', placeholder: 'Address' },
        ]}
      />
    </div>
  );
};

export default StoreList;
