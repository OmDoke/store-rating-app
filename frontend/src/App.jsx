import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UpdatePassword from './pages/UpdatePassword';
import AdminDashboard from './pages/admin/Dashboard';
import AddUser from './pages/admin/AddUser';
import AddStore from './pages/admin/AddStore';
import UserList from './pages/admin/UserList';
import StoreListAdmin from './pages/admin/StoreList';
import UserDetail from './pages/admin/UserDetail';
import UserStoreList from './pages/user/StoreList';
import OwnerDashboard from './pages/owner/OwnerDashboard';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users/new" element={<AddUser />} />
            <Route path="/admin/stores/new" element={<AddStore />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/stores" element={<StoreListAdmin />} />
            <Route path="/admin/users/:id" element={<UserDetail />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['normal']} />}>
            <Route path="/user/stores" element={<UserStoreList />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['store_owner']} />}>
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
