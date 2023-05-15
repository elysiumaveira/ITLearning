import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Login from '../components/Login';
import SignUp from '../components/SignUp';

import owlImage from '../images/AuthenticationPage/owl.svg';

import s from '../css/Authentication.module.css'

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

const Authentication = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className={ s.tabs }>
                <Box sx={{ 
                    width: "580px",
                }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs 
                            value={value} 
                            onChange={handleChange} 
                            aria-label="basic tabs example" 
                            TabIndicatorProps={{ 
                                sx: { 
                                    background:"linear-gradient(to right, #F7941D 0%, #27AAE1 100%)", 
                                    height: 3,
                                }
                            }}
                            centered
                        >
                            <Tab label="Вход" {...a11yProps(0)} style={{
                                minWidth:"50%",
                                fontFamily: "Montserrat", 
                                fontWeight: 700,
                                color: "black"
                            }} />
                            <Tab label="Регистрация" {...a11yProps(1)} style={{ 
                                minWidth: "50%", 
                                fontFamily: "Montserrat", 
                                fontWeight: 700,
                                color: "black"
                            }}/>
                        </Tabs>
                    </Box>
                        <TabPanel value={value} index={0}>
                            <Login />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <SignUp />
                        </TabPanel>
                </Box>
            </div>
            <img src={ owlImage } className={ s.owl }></img>
            <p className={ s.owlText }>Войдите в систему <br />или зарегистрируйтесь, <br />если у Вас ещё нет аккаунта</p>
        </>
    );
}

export default Authentication;