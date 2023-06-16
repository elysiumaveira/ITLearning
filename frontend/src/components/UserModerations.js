import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Loading from '../components/Loading';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import s from '../css/UserModeration.module.css';

const UserModeration = () => {
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/roles/get-user-and-role/`)
        .then((result) => {
            setUsers(result.data)
        })
        .catch((err) => {
            return
        })
        
    }, [])

    if(!users) {
        return <Loading />
    }

    const onRoleChange = (e) => {
        setRole(e.target.value);
    }

    const onUserChange = (e) => {
        setUser(e.target.options.selectedIndex + 1);
    }

    const ColorButton = styled(Button)(() => ({
        fontFamily: "Montserrat",
        fontSize: "14px",
        color: "white",
        backgroundColor: "#F7941D;",
        '&:hover': {
            backgroundColor: "#FFAE4D",
        },
        marginTop: "15px",
        width: "180px",
        height: "50px",
        padding: "12px",
    }));

    const onSubmit = () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const body = {
                'user': user,
                'role': role
            };

            axios.post(`${process.env.REACT_APP_API_URL}/roles/create-user-role/`, body, config)
            .then((result) => {
            })
            .catch((err) => {
            })
        } catch (err) {
            return
        }
        
    }

    return (
        <div className={ s.container }>
            <div>
                <div className={ s.wrapper }>
                    <div>
                        <select className={ s.selector } onChange={ onUserChange }>
                            { users.map((user) => {
                                return (
                                    <option key={ user.id } value={ user.id }> {user.user} </option>
                                )
                            }) }
                            <option selected hidden > Пользователь </option>
                        </select>
                    </div>
                    <div>
                        <select className={ s.selector } onChange={ onRoleChange }>
                            <option key='Администратор' value='Администратор'> Администратор </option>
                            <option key='Преподаватель' value='Преподаватель'> Преподаватель </option>
                            <option key='Модератор' value='Модератор'> Модератор </option>
                            <option key='Пользователь' value='Пользователь'> Пользователь </option>
                            <option selected hidden> Роль </option>
                        </select>
                    </div>
                </div>

                {/* { users.map((user) => {
                    return (
                        <div className={ s.wrapper }>
                            <div>
                                <select>
                                    <option> { user.user } </option>
                                </select>
                                <p>
                                    { user.user }
                                </p>
                            </div>
                            <div>
                                <select className={ s.selector } onChange={ onRoleChange }>
                                    <option key='Администратор' value='Администратор'> Администратор </option>
                                    <option key='Преподаватель' value='Преподаватель'> Преподаватель </option>
                                    <option key='Модератор' value='Модератор'> Модератор </option>
                                    <option key='Пользователь' value='Пользователь'> Пользователь </option>
                                    <option selected hidden> { user.role } </option>
                                </select>
                            </div>
                        </div>
                    )
                }) } */}
            </div>
            <div className={ s.button }>
                <ColorButton onClick={ onSubmit }>Сохранить</ColorButton>
            </div>
        </div>
    );
};

export default UserModeration;