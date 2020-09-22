import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="header">
            <Link to="/">
                <div className="header__logo">
                    <HomeIcon />
                </div>
            </Link>
        
            <div className="header__nav">
                <Link to="/leaderboard" className="header__link">
                    <div className="header__option">
                        <span>Leaderboard</span>
                    </div>
                </Link>
                <Link to="/login" className="header__link">
                    <div className="header__option">
                        <span>Login</span>
                    </div>
                </Link> 
            </div>
        </nav>
    )
}

export default Header
