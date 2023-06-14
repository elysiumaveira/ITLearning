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

const MyEducation = () => {
    const { user_id } = useParams();

    const [courses, setCourses] = useState(null);

    useEffect(() => {
        if (user_id) {
            axios.get(`${process.env.REACT_APP_API_URL}/mainapp/get-course-and-lesson/${ user_id }`)
            .then((result) => {
                console.log(result.data)
                setCourses(result.data)
            })
            .catch((err) => {
                console.log(err)
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
        </>
    );
}

export default MyEducation;