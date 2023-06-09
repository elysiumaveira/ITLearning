import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    USER_LOADED_SUCCES,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFRIM_SUCCESS,
    PASSWORD_RESET_CONFRIM_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    AUTHENTICATE,
    LOGOUT,
} from './types';

export const checkAuthenticated = () => async dispatch => {
    dispatch({
        type: AUTHENTICATE
    });
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)

            dispatch ({
                type: USER_LOADED_SUCCES,
                payload: res.data
            });
        } catch (err) {
            dispatch ({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch ({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({username, password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)

        dispatch ({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch ({
            type: LOGIN_FAIL
        });
    }
};

export const signup = (username, email, first_name, last_name, password, re_password, enqueueSnackbar) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ username, email, first_name, last_name, password, re_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config)

        dispatch ({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        const message = 'Мы отправили ссылку для подтверждения почты на указанный Вами email'
        enqueueSnackbar(message, { autoHideDuration: 5000, variant: 'success' })
    } catch (err) {
        dispatch ({
            type: SIGNUP_FAIL
        });

        const message = 'Упс, произошла ошибка'
        enqueueSnackbar(message, { autoHideDuration: 5000, variant: 'error' })
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config)

        dispatch ({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch ({
            type: ACTIVATION_FAIL
        });
    }
}

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFRIM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFRIM_FAIL
        });
    }
}

export const profile_update = (formData) => async dispatch => {
    const config = {
        headers: {
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    }

    const body = formData

    try {
        await axios.patch(`${process.env.REACT_APP_API_URL}/auth/users/me/`, body, config);

        dispatch({
            type : UPDATE_PROFILE_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: UPDATE_PROFILE_FAIL
        });
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
};