import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import s from '../css/CourseButtons.module.css'
import classNames from 'classnames';

const CourseItem = ({ courseType }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/course/`, { params: { course_type: courseType } })
        .then(result => {
            const course = result.data;
            setCourses(result.data);
        })
    }, [])

    return (
        <>
            {courses.map((course) =>
                <Link to={`/coursedetail/${ course.id }`} className={ s.box } key={ course.id }>{ course.name }</Link>
            )}
        </>
    )
}

export default CourseItem;