import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Loading from '../components/Loading';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import s from '../css/CreateLesson.module.css';

const CreateLesson = () => {
    const [lesson, setLesson] = useState(null);
    const [courses, setCourses] = useState(null);
    const [course, setCourse] = useState(null)
    const [inputFields, setInputFields] = useState([
        {
            themes_name: '',
        }
    ]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/mainapp/courses/`)
        .then((result) => {
            setCourses(result.data)
        })
        .catch((err) => {
            return
        })
    }, [])

    const onCourseChange = (e) => {
        setCourse(e.target.value)
    }

    const onLessonChange = (e) => {
        setLesson(e.target.value)
    }

    const handleFormChange = (index, event) => {
        const data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addFields = () => {        
        setInputFields([...inputFields, {
            themes_name: '',
        }])
    }

    const removeFields = (index) => {
        const data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    const handleSubmit = () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const themes = []

            inputFields.map((field) => {
                themes.push(field.themes_name)
            })

            const body = {
                lesson: lesson,
                course: course,
                themes_name: themes,
            }

            axios.post(`${process.env.REACT_APP_API_URL}/mainapp/create-course/`, body, config)
            .then((res) => {
                
            })
            .catch((err) => {
                return
            })
        } catch (err) {

        }
    }

    const ColorButton = styled(Button)(() => ({
        fontFamily: "Montserrat",
        fontSize: "14px",
        color: "white",
        backgroundColor: "#F7941D;",
        '&:hover': {
            backgroundColor: "#FFAE4D",
        },
        marginTop: "15px",
        width: "180px",
        height: "50px",
        padding: "12px",
    }));

    const DeleteButton = styled(Button)(() => ({
        fontFamily: "Montserrat",
        fontSize: "20px",
        color: "white",
        backgroundColor: "red",
        '&:hover': {
            backgroundColor: "red",
        },
        marginTop: "15px",
        marginLeft: "15px",
        height: "40px",
        padding: "12px",
    }));

    if (!courses) {
        return <Loading />
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="outlined-textarea"
                    label="Название урока"
                    multiline
                    name="question"
                    onChange={ onLessonChange }
                />
                <select className={ s.selector } onChange={ onCourseChange }>
                    { courses ? courses.map((course) => {
                        return ( 
                            <option>
                                { course.name }
                            </option>
                        )
                    }) : null }
                    <option selected hidden>Выбрать курс</option>
                </select>
            </div>
            { inputFields.map((element, index) => {
                return (
                    <div key={ index }>
                        <TextField
                            id="outlined-textarea"
                            label="Название темы урока"
                            multiline
                            name="themes_name"
                            value={ element.name }
                            onChange={ event => handleFormChange(index, event) }
                        />
                        { index ? <DeleteButton onClick={ () => removeFields(index) }>X</DeleteButton> : null }
                    </div>
                )
            }) }
            <div className={ s.button }>
                <ColorButton onClick={ addFields }>Добавить</ColorButton>
            </div>
            <div>
                <ColorButton onClick={ handleSubmit }>Создать</ColorButton>
            </div>
        </Box>
    );
};

export default CreateLesson;