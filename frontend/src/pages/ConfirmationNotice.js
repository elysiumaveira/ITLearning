import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import s from '../css/ConfirmationNotice.module.css';

const ConfirmationNotice = () => {
    const navigate = useNavigate();

    const onSubmit = () => {
        navigate('/home');
    }

    const ColorButton = styled(Button)(() => ({
        fontFamily: "Montserrat",
        fontSize: "14px",
        color: "white",
        backgroundColor: "#F7941D;",
        '&:hover': {
            backgroundColor: "#F7941D",
        },
        width: "190px",
        height: "50px",
        padding: "12px",
    }));

    return (
        <>
            <div className={ s.container }>
                <p className={ s.text }>
                    Мы отправили ссылку для подтверждения смены <br /> пароля на введенный Вами электронный адрес!
                </p>
                <div className={ s.button }>
                    <ColorButton variant="contained" onClick={ onSubmit }>Главная</ColorButton>
                </div>
            </div>
        </>
    );
};

export default ConfirmationNotice;