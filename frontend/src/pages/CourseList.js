import React from 'react';

import CourseItem from '../components/CourseItem';

import s from '../css/CourseList.module.css';

const CourseList = () => {
    return(
        <>
            <h2 className={ s.pageTitle }>Все программы обучения</h2>
            <div className={ s.courseList }>
                <CourseItem></CourseItem>
            </div>
        </>
    );
};

export default CourseList;