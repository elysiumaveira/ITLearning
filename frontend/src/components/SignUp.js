import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/actions/auth';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { SnackbarProvider, enqueueSnackbar } from 'notistack'

import s from '../css/SignUp.module.css';

const SignUp = () => {
    const { signUp } = useSelector((store) => store.auth);

    const [accountCreated, setAccountCreated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRePassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onRePasswordChange = (e) => {
        setRePassword(e.target.value)
    }

    const onFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }

    const onLastNameChange = (e) => {
        setLastName(e.target.value)
    }

    const onSubmit = () => {
        if (password === re_password) {
            signup(username, email, first_name, last_name, password, re_password)(dispatch);

            setAccountCreated(true);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        if (signUp) {
            const message = 'Мы отправили ссылку для подтверждения почты на указанный Вами email'
            enqueueSnackbar(message, { autoHideDuration: 5000, variant: 'success' })
        } else {
            const message = 'Упс, произошла ошибка'
            enqueueSnackbar(message, { autoHideDuration: 5000, variant: 'error' })
        }

        if(accountCreated) {
            navigate('/login');
        }
    }, [accountCreated])

    const ColorButton = styled(Button)(() => ({
        fontFamily: "Montserrat",
        fontSize: "14px",
        color: "white",
        backgroundColor: "#F7941D;",
        '&:hover': {
            backgroundColor: "#FFAE4D",
        },
        width: "200px",
        height: "50px",
        padding: "12px",
    }));

    return (
        <>
        <SnackbarProvider autoHideDuration={5000}>
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
                        autoComplete='off'
                        type='text'
                        onChange={ onUsernameChange }
                    />
                    <TextField
                        id="outlined-required"
                        label="Email"
                        type='email'
                        onChange={ onEmailChange }
                    />
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root' : {
                                m: 1,
                                width: '182px'
                            }
                        }}
                    >
                        <TextField
                            id="outlined-required"
                            label="Имя"
                            type='text'
                            onChange={ onFirstNameChange }
                        />
                        <TextField
                            id="outlined-required"
                            label="Фамилия"
                            type='text'
                            onChange={ onLastNameChange }
                        />
                    </Box>
                    <TextField
                        id="outlined-password-input"
                        label="Пароль"
                        type="password"
                        autoComplete="current-password"
                        onChange={ onPasswordChange }
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Повторите пароль"
                        type="password"
                        autoComplete="current-password"
                        onChange={ onRePasswordChange }
                    />
                </div>
            </Box>
            <div className={ s.button }>
                <ColorButton variant="contained" onClick={ onSubmit }>Зарегистрироваться</ColorButton>
            </div>
        </div>
        </SnackbarProvider>
        </>
    );
};

export default SignUp;