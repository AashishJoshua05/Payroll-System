import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../UserContext';

const Header = () => {
  const auth = useAuth();
  return (
    <header className="flex flex-row justify-between py-2 px-28 mb-6 bg-[#e6e6aa]">
    <NavLink to="/" exact>
      <h1 className="font-black text-4xl">Employee Paycheck</h1>
    </NavLink>
      <nav className="flex space-x-4 items-center font-semibold">
        <Link to='/' className='hover:underline'>
          Home
        </Link>
        <Link to="/employeeForm" className="hover:underline">
          Add Employee
        </Link>
        <button onClick={() => auth.logout()} className="hover:underline">
          logout
        </button>
      </nav>
  </header>
  );
};

export default Header;
