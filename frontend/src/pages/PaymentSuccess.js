import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loading from '../components/Loading';

const PaymentSuccess = () => {
    const { session_id } = useParams();
    const { user } = useSelector((store) => store.auth);

    const userId = user?.id;

    useEffect(()=> {
        if (userId && session_id) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
    
            const body = JSON.stringify({ session_id, userId })
            try {
                axios.post(`${process.env.REACT_APP_API_URL}/payment/purchase/`, body, config)
                .catch((err) => {
                    return
                })
            } catch (err) {
                return
            }
        }
    }, [userId, session_id])

    if (!user) {
        return (
            <Loading />
        )
    }

    return (
        <h1> Payment Success </h1>
    );
}

export default PaymentSuccess;