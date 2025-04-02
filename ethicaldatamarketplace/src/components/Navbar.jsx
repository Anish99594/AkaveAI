import { NavLink } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <NavLink to="/">AkaveAI</NavLink>
        </div>
        <ul className="navbar-menu">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>
              Marketplace
            </NavLink>
          </li>
          <li>
            <NavLink to="/upload" className={({ isActive }) => isActive ? 'active' : ''}>
              Upload
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
              Dashboard
            </NavLink>
          </li>
          <li className="wallet-connect">
            <ConnectButton />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;