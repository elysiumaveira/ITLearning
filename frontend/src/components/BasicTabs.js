import React from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import CourseItem from './Course'

import childrenIcon from '../images/HomePage/children.svg';
import teenagersIcon from '../images/HomePage/teenagers.svg';
import adultsIcon from '../images/HomePage/adults.svg';

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
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

function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: 880, height: 350 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}} className="customTabs">
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    TabIndicatorProps={{ 
                        sx: { background:"linear-gradient(to right, #F7941D 0%, #27AAE1 100%)", height:3 }
                    }}
                    sx={{"& button": { marginRight: 20, marginTop: 10 }}}
                >
                    <Tab icon={<img src={childrenIcon} />} iconPosition="start" label="Дети" />
                    <Tab icon={<img src={teenagersIcon} />} iconPosition="start" label="Подростки" />
                    <Tab icon={<img src={adultsIcon} />} iconPosition="start" label="Взрослые" />
                </Tabs>
            </Box>
                <TabPanel value={value} index={0}>
                    <CourseItem courseType={"Children"}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CourseItem courseType={"Teenagers"}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <CourseItem courseType={"Adults"}/>
                </TabPanel>
        </Box>
    );
}

export default BasicTabs;