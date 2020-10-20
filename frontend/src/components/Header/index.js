import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import {useUserStatus} from '../../hoc/UserContext/UserContext';
import {ACTIONS} from '../../hoc/UserContext/reducer';

function Header() {
    //retrieve user status from userContext, either logged in or not logged in
    const [{user}, dispatch] = useUserStatus();
    const history = useHistory();

    function logout(){
        dispatch({
            type: ACTIONS.SET_USER,
            user: null
        });
        history.push("/")
    }

    return (
        <nav className="header">
            <div className="header__brand">
                <Link to="/">
                    <div className="header__logo">
                        <HomeIcon />
                    </div>
                </Link>
            </div>
            <div className="header__nav">
                {user && (
                    <>
                        <p style={{color: "white"}}>Hello, {user.userName}</p>
                        <Link to="/favors" className="header__link">
                            <div className="header__option">
                                <span>Your Favor</span>
                            </div>
                        </Link>
                        <Link to="/debts" className="header__link">
                            <div className="header__option">
                                <span>Your Debts</span>
                            </div>
                        </Link>
                    </>
                )}
                <Link to="/leaderboard" className="header__link">
                    <div className="header__option">
                        <span>Leaderboard</span>
                    </div>
                </Link>
                <Link to={!user && "/login"} className="header__link">
                    <div onClick={logout} className="header__option">
                        <span>{user?"Log Out":"Log In"}</span>
                    </div>
                </Link> 
            </div>
        </nav>
    )
}

export default Header
