import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import axios from 'axios';

import Loading from '../components/Loading';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { LetterAvatar, ImageAvatar } from './Avatar';

import { logout } from '../store/actions/auth';

const AccountMenu = ({ logout }) => {
    const { user } = useSelector((store) => store.auth);
    const [userRoles, setUserRoles] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/roles/get-user-role/${user?.id}/`)
        .then((res) => {
            setUserRoles(res.data)
        })
        .catch((err) => {
            return
        })
    }, [user]);

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateToAdminPanel = () => {
        navigate('/admin-panel')
    }

    const navigateToSettings = () => {
        navigate('/profile/settings')
    }

    const navigateToMyEducation = () => {
        navigate(`${user.id}/education`)
    }

    if (!user) {
        return <Loading />
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        { user?.avatar ? ImageAvatar(`${ user?.avatar }`) : LetterAvatar(`${ user?.first_name }`) }
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                { userRoles?.map((userRole) => {
                    return (
                        userRole.system_name === 'admin' ? 
                        <MenuItem onClick={ navigateToAdminPanel }>
                            Админ-панель
                        </MenuItem> : null
                    )
                }) }
                
                <MenuItem onClick={ navigateToMyEducation }>
                    Моё обучение
                </MenuItem>
                <Divider />
                <MenuItem onClick={ navigateToSettings }>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Настройки
                </MenuItem>
                <MenuItem onClick={ logout }>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Выйти
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(AccountMenu)