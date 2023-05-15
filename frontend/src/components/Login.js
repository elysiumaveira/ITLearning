import React, { useEffect, useState }  from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/auth';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import s from '../css/Login.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { isAuthenticated } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onSubmit = () => {
        login(username, password)(dispatch)
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        if(isAuthenticated) {
            navigate('/home')
        }

    }, [isAuthenticated])

    const ColorButton = styled(Button)(() => ({
        fontFamily: "Montserrat",
        fontSize: "14px",
        color: "white",
        backgroundColor: "#F7941D;",
        '&:hover': {
            backgroundColor: "#F7941D",
        },
        width: "180px",
        height: "50px",
        padding: "12px",
    }));

    return (
        <>
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
                        label="Логин"
                        onChange={ onUsernameChange }
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Пароль"
                        type="password"
                        autoComplete="current-password"
                        onChange={ onPasswordChange }
                    />
                </div>
            </Box>
            <div>
                <p className={s.resetPassword}>Забыли пароль? <Link to='/reset_password' className={s.link}>Восстановить пароль</Link></p>
            </div>
            <div className={ s.button }>
                <ColorButton variant="contained" onClick={ onSubmit }>Войти</ColorButton>
            </div>
        </div>
        </>
    );
};

export default Login;