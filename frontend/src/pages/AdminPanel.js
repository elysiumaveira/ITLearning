import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';

import Loading from '../components/Loading';
import CreateCourse from '../components/CreateCourse';
import CreateTest from '../components/CreateTest';
import UserModeration from '../components/UserModerations';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import s from '../css/AdminPanel.module.css';
import CreateLesson from '../components/CreateLesson';

function TabPanel(props) {
    const { children, value, index, ...other } = props; 

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AdminPanel = () => {
    const { user } = useSelector((store) => store.auth);
    const [userRoles, setUserRoles] = useState(null);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/roles/get-user-role/${user?.id}/`)
        .then((res) => {
            res.map((userRole) => {
                if(userRole.system_name != 'admin') {
                    navigate('/home')
                    return
                }
            })
            setUserRoles(res.data)
        })
        .catch((err) => {
            return
        })
    }, [user])

    if(!user) {
        setTimeout(2000)
        if (!user) {
            navigate('/home')
            return
        }
        return <Loading />
    }

    return (
        <>
            <div className={ s.tabs }>
                <Box sx={{ 
                    width: "100%",
                }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs 
                            value={value} 
                            onChange={handleChange} 
                            TabIndicatorProps={{ 
                                sx: { 
                                    background:"linear-gradient(to right, #F7941D 0%, #27AAE1 100%)", 
                                    height: 3,
                                }
                            }}
                            centered
                        >
                            <Tab label="Создать курс" {...a11yProps(0)} style={{
                                minWidth:"25%",
                                fontFamily: "Montserrat", 
                                fontWeight: 700,
                                color: "black"
                            }} />
                            <Tab label="Создать урок" {...a11yProps(1)} style={{ 
                                minWidth: "25%", 
                                fontFamily: "Montserrat", 
                                fontWeight: 700,
                                color: "black"
                            }}/>
                            <Tab label="Создать тест" {...a11yProps(1)} style={{ 
                                minWidth: "25%", 
                                fontFamily: "Montserrat", 
                                fontWeight: 700,
                                color: "black"
                            }}/>
                            <Tab label="Модерация пользователей" {...a11yProps(1)} style={{ 
                                minWidth: "25%", 
                                fontFamily: "Montserrat", 
                                fontWeight: 700,
                                color: "black"
                            }}/>
                        </Tabs>
                    </Box>
                        <TabPanel value={value} index={0}>
                            <CreateCourse />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <CreateLesson />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <CreateTest />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <UserModeration />
                        </TabPanel>
                </Box>
            </div>
        </>
    );
};

export default AdminPanel;