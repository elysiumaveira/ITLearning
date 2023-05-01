import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import '../css/FooterCourses.css'

const FooterCourses = ({courseType}) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/course', { params: { course_type: courseType } })
        .then(result => {
            console.log(result)
            const course = result.data;
            setCourses(result.data);
        })
    }, [])

    return <div className='course-container'>
        {courses.map(course => 
                <p  className="course">{course.name}</p>
        )}
    </div>
}

export default FooterCourses;