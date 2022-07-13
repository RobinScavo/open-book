import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../redux/auth/authSlice';

import Logo from '../logo/Logo';
import ControlPanel from '../controlPanel/ControlPanel';
import {  RiUserSmileFill } from 'react-icons/ri'

import './header.scss';

const Header = (props) => {
    const [controlPanelDisplay, setcontrolPanelDisplay] = useState(false);
    const rotated = controlPanelDisplay ? 'rotated' : '';

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/decks')
    }

    const toggleControlPanel = () => {
        setcontrolPanelDisplay(!controlPanelDisplay)
    }

    return (
        <div className="header-container" data-testid='header-container'>
            <div className="upper-header">
                <button
                    className={`navigation-icon ${rotated}`}
                    data-testid='navigation-button'
                    onClick={toggleControlPanel}
                ><i className="fas fa-bars"></i></button>

                {!user &&
                    <Link
                        to='/login'
                        className='login-link'
                        data-testid='login-link'
                    >
                        <div className="icon-container">
                            <  RiUserSmileFill className='my-icon'/>
                        </div>
                        <h2 className="login-text">Log In</h2>

                    </Link>
                }

                {user &&
                    <button
                        className="login-link"
                        onClick={handleLogout}
                        data-testid='logout-link'
                    >
                        <h2 className="logout-name">{`${user.name}`}</h2>
                        <h2 className="login-text">{`Log out`}</h2>
                    </button>
                }
            </div>

            <div className="lower-header"></div>
            <Logo />
            < ControlPanel
                {...props}
                controlPanelDisplay={controlPanelDisplay}
            />
        </div>
     );
}

export default Header;
