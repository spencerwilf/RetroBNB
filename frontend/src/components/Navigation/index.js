import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);


  return (
    <nav className='nav-bar'>
      <div className='home-text'>
        <NavLink exact to="/">
    <span className='logo-text'>RetroBnb</span>
        </NavLink>
        </div>

        <div className='right-hand-icons'>
        {sessionUser && (
          <Link to='/spots/new'>
        <h4 id='list-your-spot'>RetroBnb your Home</h4>
        </Link>
      )}
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
          </div>
      )}

      </div>
    </nav>
  );
}

export default Navigation;
