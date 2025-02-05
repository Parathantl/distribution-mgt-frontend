import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Parathan Traders</h1>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-semibold'
                : 'hover:text-yellow-300'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/invoices"
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-semibold'
                : 'hover:text-yellow-300'
            }
          >
            Invoices
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-semibold'
                : 'hover:text-yellow-300'
            }
          >
            Products
          </NavLink>
        </nav>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-blue-700 text-white p-3 flex flex-col items-center space-y-3">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-semibold'
                : 'hover:text-yellow-300'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/invoices"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-semibold'
                : 'hover:text-yellow-300'
            }
          >
            Invoices
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-semibold'
                : 'hover:text-yellow-300'
            }
          >
            Products
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Header;
