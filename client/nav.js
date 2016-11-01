import React from 'react';

const Nav = ({state, powers}) => {
  console.log("----NAV LOADED----");
  return (
    <nav className="nav">
      <ul>
        <li><a href="https://github.com/desklamp-js/desklamp">Desklamp Github</a></li>
      </ul>
    </nav>
  );
};

export default Nav;
