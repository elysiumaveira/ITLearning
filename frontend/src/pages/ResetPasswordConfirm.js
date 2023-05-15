import React, { useState }  from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { reset_password_confirm } from '../store/actions/auth';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import owl from '../images/ResetPassword/owl.svg';

import s from '../css/ResetPasswordConfirm.module.css';

const ResetPasswordConfirm = () => {
    const [new_password, setNewPassword] = useState('');
    const [re_new_password, setReNewPassword] = useState('');

    const { uid } = useParams();
    const { token } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onNewPasswordChange = (e) => {
        setNewPassword(e.target.value)
    }

    const onReNewPasswordChange = (e) => {
        setReNewPassword(e.target.value)
    }
    
    const onSubmit = () => {
        reset_password_confirm(uid, token, new_password, re_new_password)(dispatch);
        navigate('/login');
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
            <div className={ s.owl }>
                <img src={ owl } className={ s.owlImage } />
                <p className={ s.owlText }>Введите новый пароль для <br />Вашей учетной записи!</p>
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
                            type='password'
                            label="Новый пароль"
                            onChange={ onNewPasswordChange }
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-required"
                            type='password'
                            label="Повторите пароль"
                            onChange={ onReNewPasswordChange }
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

export default ResetPasswordConfirm;