import axios from 'axios';
import React, { useState, useEffect } from 'react';

import '../css/FooterCourses.css'

const FooterCourses = ({courseType}) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/mainapp/course`, { params: { course_type: courseType } })
        .then(result => {
            const course = result.data;
            setCourses(result.data);
        })
    }, [])

    return <div className='course-container'>
        {courses.map((course) => 
            <p  className="course" key={ course.id }>{course.name}</p>
        )}
    </div>
}

export default FooterCourses;