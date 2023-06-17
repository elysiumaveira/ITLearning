import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import axios from 'axios';

import s from '../css/MyEducation.module.css';

import Loading from '../components/Loading';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ComputerIcon from '@mui/icons-material/Computer';

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

const MyEducation = () => {
    const { user_id } = useParams();
    const [courses, setCourses] = useState(null);
    const [userTests, setUserTests] = useState(null);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (user_id) {
            axios.get(`${process.env.REACT_APP_API_URL}/mainapp/get-course-and-lesson/${ user_id }`)
            .then((result) => {
                setCourses(result.data)
            })
            .catch((err) => {
                return
            })
        }

        if(user_id) {
            axios.get(`${process.env.REACT_APP_API_URL}/tests/get-user-tests/${ user_id }/`)
            .then((result) => {
                setUserTests(result.data)
            })
            .catch((err) => {
                setUserTests(null)
                return
            })
        }
    }, [user_id])

    if (!user_id) {
        return <Loading />
    }

    if (!courses) {
        return <Loading />
    }

    return (
        <>
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
                    <Tab label="Приобретенные курсы" {...a11yProps(0)} style={{
                        minWidth:"50%",
                        fontFamily: "Montserrat", 
                        fontWeight: 700,
                        color: "black"
                    }} />
                    <Tab label="Пройденные тесты" {...a11yProps(1)} style={{ 
                        minWidth: "50%", 
                        fontFamily: "Montserrat", 
                        fontWeight: 700,
                        color: "black"
                    }}/>
                </Tabs>
            </Box>
                <TabPanel value={value} index={0}>
                    <div className={ s.accordion }>
                        { courses.map((course) => {
                            return (
                                <Accordion sx={{
                                    width: '1000px',
                                    border: '1px solid',
                                    borderImageSlice: 1,
                                    borderImageSource: 'linear-gradient(to right, #F7941D 0%, #27AAE1 100%)',
                                }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        sx={{
                                            borderRadius: '20px',
                                        }}
                                    >
                                        <Typography> { course.course[0] ? course.course[0].name : null } </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ borderTop: '1px solid' }}>
                                        { course.lesson[0] ? course.lesson.map((lesson) => {
                                            return (
                                                <Typography>
                                                    <Link to={ `/lesson/${lesson.id}/1/` }>
                                                        { lesson.name }
                                                    </Link>
                                                </Typography>
                                            )
                                        }) : null }
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                        { userTests ? userTests.map((userTest) => {
                            return (
                                <>
                                    { userTest.map((test) => {
                                        return (
                                            <div className={ s.box } key={ test?.id }>
                                                <div className={ s.title }>
                                                    <ComputerIcon />
                                                    <p>{ test?.name }</p>
                                                </div>
                                                <p className={ s.description }>{ test?.description }</p>
                                                <Stack spacing={2} direction="row">
                                                    <Link to={ `/test/${test?.id}` } className={ s.button }>
                                                        <Button variant="outlined" sx={{
                                                            border: '1px solid rgb(0 0 0 / 50%)',
                                                            color: 'black',
                                                        }}
                                                        >
                                                            Пройти тест
                                                        </Button>
                                                    </Link>
                                                </Stack>
                                            </div>
                                        )
                                    }) }
                                </>
                            )
                        }) : null }
                </TabPanel>
        </Box>
        </>
    );
}

export default MyEducation;