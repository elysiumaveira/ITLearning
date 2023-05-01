import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import '../css/CourseDetailButtons.css'

const CourseItem = ({courseType}) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/course', { params: { course_type: courseType } })
        .then(result => {
            console.log(result)
            const course = result.data;
            setCourses(result.data);
        })
    }, [])

    return <div className='course-buttons-container'>
        {courses.map(course => 
                <NavLink to="/coursedetail" className="box">{course.name}</NavLink>
        )}
    </div>
}

export default CourseItem;