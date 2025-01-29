import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Parathan Traders</h1>
        <nav className="space-x-4">
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
            to="/items"
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-semibold'
                : 'hover:text-yellow-300'
            }
          >
            Items
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
