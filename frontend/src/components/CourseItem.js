import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import ComputerIcon from '@mui/icons-material/Computer';

import s from '../css/CourseItem.module.css';

const CourseItem = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/mainapp/courses`)
        .then(result => {
            const course = result.data;
            setCourses(result.data);
        })
    }, [])

    return (
        <>
            {courses.map((course) =>
                <div className={ s.container } key={ course?.id }>
                    <Link to={ `/coursedetail/${course?.id}`} className={ s.box }>
                        <div className={ s.wrapper }>
                            <div className={ s.title }>
                                <ComputerIcon />
                                <p className={ s.courseTitle }> «{ course?.name }» </p>
                            </div>
                            <p className={ s.courseDescription }> { course?.description } </p>
                            <p className={ s.coursePeriod }> { course?.period } месяцев</p>
                        </div>
                    </Link>
                </div>
            )}
        </>
    )
};

export default CourseItem;