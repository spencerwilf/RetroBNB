import React from 'react';
import { NavLink } from 'react-router-dom';
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
        <form>
      <input className='search-bar'type='text' placeholder='Where to?'></input>
      <button className='search-button' type='submit'><i class="fa-solid fa-magnifying-glass"></i></button>
    </form>
        <div className='right-hand-icons'>
    <i class="fa-solid fa-globe"></i>
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
