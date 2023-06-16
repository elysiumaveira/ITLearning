import React, { useState } from 'react';

import axios from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import s from '../css/CreateTest.module.css';

const CreateTest = () => {
    const [inputFields, setInputFields] = useState([
        {
            question: '',
            correct_answer: '',
            uncorrect_answer: ''
        }
    ]);

    const [testName, setTestName] = useState(null);
    const [testDescription, setTestDescription] = useState(null);

    const onTestNameChange = (e) => {
        setTestName(e.target.value);
    }

    const ontestDescriptionChange = (e) => {
        setTestDescription(e.target.value);
    }

    const handleFormChange = (index, event) => {
        const data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addFields = () => {        
        setInputFields([...inputFields, { 
            question: '',
            correct_answer: '',
            uncorrect_answer: ''
        }])
    }

    const removeFields = (index) => {
        const data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    const submit = (e) => {
        e.preventDefault();
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            
            const questions = []
            const correct_answers = []
            const uncorrect_answers = []

            inputFields.map((field) => {
                questions.push(field.question)
                correct_answers.push(field.correct_answer)
                uncorrect_answers.push(field.uncorrect_answer)
            })

            const body = {
                'test_name': testName,
                'test_description': testDescription,
                'question': questions,
                'correct_answer': correct_answers,
                'uncorrect_answer': uncorrect_answers,
            }
            
            axios.post(`${process.env.REACT_APP_API_URL}/tests/create-test/`, body, config)
            .then((result) => {
            })
            .catch((err) => {
                return
            })
        } catch (err) {
            return
        }
    }

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

    return (
        <div className={s.container}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '30ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div className={ s.test }>
                    <TextField
                        id="outlined-textarea"
                        label="Название теста"
                        multiline
                        helperText='Максимум 255 символов'
                        onChange={ onTestNameChange }
                    />
                </div>
                <div className={ s.test }> 
                    <TextField
                        id="outlined-textarea"
                        label="Описание теста"
                        multiline
                        helperText='Максимум 255 символов'
                        onChange={ ontestDescriptionChange }
                    />
                </div>
                { inputFields.map((element, index) => {
                    return (
                        <div key={ index }>
                            <TextField
                                id="outlined-textarea"
                                label="Вопрос"
                                multiline
                                helperText='Максимум 255 символов'
                                name="question"
                                value={ element.name }
                                onChange={ event => handleFormChange(index, event) }
                            />
                            <TextField
                                id="outlined-textarea"
                                label="Правильный ответ"
                                multiline
                                helperText='Максимум 255 символов'
                                name="correct_answer"
                                value={ element.name }
                                onChange={ event => handleFormChange(index, event) }
                            />
                            <TextField
                                id="outlined-textarea"
                                label="Неправильный ответ"
                                multiline
                                helperText='Максимум 255 символов'
                                name="uncorrect_answer"
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
                <div className={ s.button }>
                    <ColorButton onClick={ submit }>Создать тест</ColorButton>
                </div>
            </Box>
        </div>
    );
};

export default CreateTest;