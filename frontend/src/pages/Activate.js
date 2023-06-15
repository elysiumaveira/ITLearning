import React, { useEffect, useState }  from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { verify } from '../store/actions/auth';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import s from '../css/Activation.module.css';

const Activate = () => {
    const [verified, setVerified] = useState(false);

    const { uid } = useParams();
    const { token } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = () => {
        verify(uid, token)(dispatch);
        setVerified(true);
    }

    useEffect(() =>{
        if(verified) {
            navigate('/login');
        }
    })

    const ColorButton = styled(Button)(() => ({
        fontFamily: "Montserrat",
        fontSize: "14px",
        color: "white",
        backgroundColor: "#F7941D;",
        '&:hover': {
            backgroundColor: "#F7941D",
        },
        width: "200px",
        height: "50px",
        padding: "12px",
    }));

    return (
        <>
            <div className={ s.container }>
                <h1>Подтвердите регистрацию Вашего аккаунта: </h1>
                <div className={ s.button }>
                    <ColorButton variant="contained" onClick={ onSubmit }>Подтвердить</ColorButton>
                </div>
            </div>
        </>
    );
};

export default Activate;