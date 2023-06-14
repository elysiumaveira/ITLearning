import React, { Component }  from 'react';

import TestItem from '../components/Tests';

import s from '../css/Tests.module.css'

const TestList = () => {
return (
    <>
        <div className={ s.box }>
            <TestItem />
        </div>
    </>
);
};
export default TestList;