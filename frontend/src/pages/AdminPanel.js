import React from 'react';

import CreateCourse from '../components/CreateCourse';
import CreateTest from '../components/CreateTest';
import UserModeration from '../components/UserModerations';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import s from '../css/AdminPanel.module.css';

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
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                            <Tab label="Создать тест" {...a11yProps(1)} style={{ 
                                minWidth: "25%", 
                                fontFamily: "Montserrat", 
                                fontWeight: 700,
                                color: "black"
                            }}/>
                            <Tab label="Создать новость" {...a11yProps(1)} style={{ 
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
                            <CreateTest />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <></>
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