import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { reset_password } from '../store/actions/auth';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import owl from '../images/ResetPassword/owl.svg';

import s from '../css/ResetPassword.module.css';

const ResetPassword = () => {
    const [requestSent, setRequestSent] = useState(false);
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onSubmit = () => {
        reset_password(email)(dispatch);
        setRequestSent(true);
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        if(requestSent) {
            navigate('/confirmation');
        }

    }, [requestSent])

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
            <div className={ s.owl }>
                <img src={ owl } className={ s.owlImage }/>
                <p className={ s.owlText }>Введите Ваш Email <br/> и мы отправим Вам <br/> ссылку для смены пароля</p>
            </div>
            <div className={ s.container }>
                <Box
                    component="form"
                    sx={{
                    '& .MuiTextField-root': { 
                        m: 1, 
                        width: '380px', 
                },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            id="outlined-required"
                            type='email'
                            label="Email"
                            onChange={ onEmailChange }
                        />
                    </div>
                </Box>
                <div className={ s.button }>
                    <ColorButton variant="contained" onClick={ onSubmit }>Восстановить пароль</ColorButton>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;