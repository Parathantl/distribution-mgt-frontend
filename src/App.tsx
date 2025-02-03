import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>

        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/login' element={<LoginForm/>} />

  {/* Shops */}
  <Route path="/" element={<ShopList />} />
        <Route path="/add-shop" element={<AddShop />} />

        {/* Products */}
        <Route path="/products" element={<ItemList />} />
        <Route path="/add-item" element={<AddItem />} />

        {/* Invoices */}
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/add-invoice" element={<AddInvoice />} />
        <Route path="/invoices/:id" element={<InvoiceDetails />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
