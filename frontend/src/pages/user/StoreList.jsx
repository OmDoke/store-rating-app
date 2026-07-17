import { useEffect, useState } from 'react';
import api from '../../api/axios';
import RatingStars from '../../components/RatingStars';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  const loadStores = async () => {
    const { data } = await api.get(`/stores?search=${search}`);
    setStores(data.data || []);
  };

  useEffect(() => { loadStores(); }, []);

  const rateStore = async (storeId, rating) => {
    await api.post('/ratings', { storeId, rating });
    loadStores();
  };

  return (
    <div className="mx-auto max-w-6xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Stores</h2>
        <input className="rounded border p-2" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <button className="mb-4 rounded bg-slate-900 px-4 py-2 text-white" onClick={loadStores}>Search</button>
      <div className="space-y-4">
        {stores.map((store) => (
          <div key={store.id} className="rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{store.name}</h3>
                <p className="text-sm text-slate-600">{store.address}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Overall rating</p>
                <p className="text-xl font-semibold">{store.avgRating?.toFixed(1)}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm">My rating:</span>
              <RatingStars value={store.myRating ?? 0} onChange={(rating) => rateStore(store.id, rating)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
