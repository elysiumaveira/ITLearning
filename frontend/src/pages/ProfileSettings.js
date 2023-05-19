import React, { useEffect, useState }  from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { profile_update } from '../store/actions/auth';

import AvatarUploadModal from '../components/AvatarUploadModal';

// import { ImageAvatar } from '../components/Avatar';

import s from '../css/ProfileSettings.module.css'

function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function stringAvatar(name) {
    return {
        sx: {
        bgcolor: stringToColor(name),
        width: 128,
        height: 128,
        fontSize: 80
        },
        children: `${name.split(' ')[0][0]}`,
    };
}

function ImageAvatar(image) {
    return (
        <Stack direction="row" spacing={2}>
            <Avatar
                alt="avatar"
                src={ image }
                sx={{ width: 128, height: 128 }}
            />
        </Stack>
    )
}

function LetterAvatar(name) {
    return (
        <Stack direction="row" spacing={2}>
            <Avatar {...stringAvatar(name)} />
        </Stack>
    );
}

const ProfileSettings = () => {
    const { user } = useSelector((store) => store.auth);
    const { isAuthenticated } = useSelector((store) => store.auth);

    const initialState = {
        access: localStorage.getItem('access'),
    };

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const [firstName, setFirstName] = useState(user?.first_name);
    const [lastName, setlastName] = useState(user?.last_name);

    const onFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const onLastNameChange = (e) => {
        setlastName(e.target.value);
    }


    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);

        // if(!isAuthenticated) {
        //     navigate('/home');
        // }
    })

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }

    const ColorButton = styled(Button)(() => ({
        fontFamily: "Montserrat",
        fontSize: "14px",
        color: "white",
        backgroundColor: "#F7941D;",
        '&:hover': {
            backgroundColor: "#FFAE4D",
        },
        width: "180px",
        height: "50px",
        padding: "2px",
    }));

    const handleSave = (e) => {
        const formData = new FormData();

        if (image) formData.append("avatar", image);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);

        profile_update(formData)(dispatch);
    }

    return (
        <>
            <div className={ s.container }>
                { user?.avatar ? ImageAvatar(`${ imageUrl || user?.avatar }`) : LetterAvatar(`${ user?.first_name }`) }
                <div className={ s.avatarButton }>
                    <AvatarUploadModal handleFileChange={ handleFileChange }/>
                </div>
            </div>
            <div className={ s.textFields }>
                <Box
                    component='form'
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' }
                    }}
                    noValidate
                    autoComplete='off'
                >
                    <div>
                        <TextField
                            id="outlined-read-only-input"
                            label="Логин"
                            defaultValue={ user?.username }
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-read-only-input"
                            label="Email"
                            defaultValue={ user?.email }
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-required"
                            label="Имя"
                            defaultValue={ user?.first_name }
                            onChange={ onFirstNameChange }
                        />
                        <TextField
                            id="outlined-required"
                            label="Фамилия"
                            defaultValue={ user?.last_name }
                            onChange={ onLastNameChange }
                        />
                    </div>
                </Box>
            </div>
            <div className={ s.saveButton }>
                <ColorButton onClick={ handleSave }>Сохранить</ColorButton>
            </div>
        </>
    );
};

export default ProfileSettings;