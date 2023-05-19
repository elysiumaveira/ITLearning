import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { logout } from '../store/actions/auth';
import { connect } from 'react-redux';

import AccountMenu from './AccountMenu';

import logo from '../images/logo.svg'
import allCourses from '../images/allCourses.svg'
import selectCity from '../images/select.svg'
import loginIcon from '../images/loginIcon.svg'

import s from '../css/Navbar.module.css'

const style = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
});

const Navbar = ( { logout, isAuthenticated }) => {
    const guestLinks = () => (
        <Fragment>
            <NavLink to="login">
                <div className={ s.wrapper }>
                    <img src={loginIcon} alt='loginIcon' className={ s.icon }/>
                    <p>Войти</p>
                </div>
            </NavLink>
        </Fragment>
    );

    const authLinks = () => (
        <AccountMenu />
    );

    return (
        <>
            <div className={ s.container }>
                <nav className={ s.nav }>
                    <NavLink to="/home" style={ style }>
                        <div>
                            <img src={ logo } alt='logo'/>    
                        </div>
                    </NavLink>
                    <NavLink to="/courses" style={style}>
                        <div className={ s.wrapper }>
                            <img src={allCourses} alt='courses'/>
                            <p>Все курсы</p>
                        </div>
                    </NavLink>
                    <NavLink to="/events" style={style}>
                        Мероприятия
                    </NavLink>
                    <NavLink to="/knowlege" style={style}>
                        Базы знаний
                    </NavLink>
                    <NavLink to="/career" style={style}>
                        Карьера
                    </NavLink>
                    <div className={ s.wrapper }>
                        <img src={selectCity} alt='select' className={ s.icon }/>
                        <select name="selectCity">
                            <option value="value1">Нижний Новгород</option>
                        </select>
                    </div>
                    <p>
                        8 800 950-33-98
                    </p>
                    
                    { isAuthenticated ? authLinks() : guestLinks() }
                </nav>
            </div>

        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar);