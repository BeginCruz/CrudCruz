import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

type NavBarProps = {
  links: { path: string; label: string }[];
};

const NavBar: React.FC<NavBarProps> = ({ links }) => {
  return (
    <nav className="nav-bar">
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
