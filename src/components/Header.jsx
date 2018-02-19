import React from 'react';
import { Link } from 'react-router-dom';

function Header(){
  return (
    <div>
      <h2>Header Content</h2>
      <Link to="/">List</Link> | <Link to="/newticket">Create Ticket</Link>
    </div>
  );
}

export default Header;
