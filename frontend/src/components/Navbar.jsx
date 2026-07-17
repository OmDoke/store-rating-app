import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="font-semibold">Store Rating Platform</div>
        <div className="flex items-center gap-4 text-sm">
          {user.role === 'admin' && (
            <>
              <Link to="/admin/dashboard">Dashboard</Link>
              <Link to="/admin/users">Users</Link>
              <Link to="/admin/stores">Stores</Link>
            </>
          )}
          {user.role === 'normal' && <Link to="/user/stores">Stores</Link>}
          {user.role === 'store_owner' && <Link to="/owner/dashboard">Dashboard</Link>}
          <Link to="/update-password">Update Password</Link>
          <button className="rounded bg-white/10 px-3 py-1" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
