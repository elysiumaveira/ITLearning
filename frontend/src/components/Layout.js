import React, { useEffect }  from 'react';
import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../store/actions/auth'

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = (props) => {
    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
    }, [])

return (
    <>
        <Navbar />
        {props.children}

        <main >
            <Outlet />
        </main>

        <Footer />
    </>
);
};

export default connect(null, { checkAuthenticated, load_user })(Layout);