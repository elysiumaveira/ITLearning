import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import ComputerIcon from '@mui/icons-material/Computer';

import s from '../css/TestItem.module.css'

const TestItem = () => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/tests/tests`)
        .then(result => {
            const test = result.data;
            setTests(result.data);
        })
    }, [])

    return (
        <>
            {tests.map((test) =>
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
            )}
        </>
    )
}

export default TestItem;