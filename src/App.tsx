import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ShopList from './components/Shops/ShopList';
import AddShop from './components/Shops/AddShop';
import InvoiceList from './components/Invoices/InvoiceList';
import AddInvoice from './components/Invoices/AddInvoice';
import InvoiceDetails from './components/Invoices/InvoiceDetails';
import ItemList from './components/Items/ItemList';
import AddItem from './components/Items/AddItem';
import SignUp from './components/User/SignUp';
import LoginForm from './components/User/Login';
import api from './api/api';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    try {
      const response = await api.get('/users/check-auth', { withCredentials: true });
      if (response.status === 200) {
        setIsAuthenticated(true);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optionally, show a loading spinner here
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            {/* Public Routes */}
            <Route path="/sign-up" element={isAuthenticated ? <Navigate to="/" /> : <SignUp/>} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginForm setIsAuthenticated={setIsAuthenticated} />} />

            {/* Protected Routes */}
            <Route path="/" element={isAuthenticated ? <ShopList /> : <Navigate to="/login" />} />
            <Route path="/add-shop" element={isAuthenticated ? <AddShop /> : <Navigate to="/login" />} />
            <Route path="/products" element={isAuthenticated ? <ItemList /> : <Navigate to="/login" />} />
            <Route path="/add-item" element={isAuthenticated ? <AddItem /> : <Navigate to="/login" />} />
            <Route path="/invoices" element={isAuthenticated ? <InvoiceList /> : <Navigate to="/login" />} />
            <Route path="/add-invoice" element={isAuthenticated ? <AddInvoice /> : <Navigate to="/login" />} />
            <Route path="/invoices/:id" element={isAuthenticated ? <InvoiceDetails /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
