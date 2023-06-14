import React, { useState, useEffect } from 'react';

import axios from 'axios';

import AvatarUploadModal from '../components/AvatarUploadModal';

import { SnackbarProvider, enqueueSnackbar } from 'notistack'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


import s from '../css/CreateCourse.module.css';

const CreateCourse = () => {
    const [teachersList, setTeachersList] = useState(null);
    const [name, setName] = useState(null);
    const [goal, setGoal] = useState(null);
    const [description, setDescription] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [image, setImage] = useState(undefined);
    const [imageURL, setImageURL] = useState(undefined);
    const [courseType, setCourseType] = useState(null);
    const [period, setPeriod] = useState(null);
    const [price, setPrice] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/mainapp/get-teachers/`)
        .then((result) => {
            setTeachersList(result.data);
        })
        .catch((err) => {
            return
        })
    }, [])

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onGoalChange = (e) => {
        setGoal(e.target.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const onImageChange = (e) => {
        setImage(e.target.files[0]);
        setImageURL(URL.createObjectURL(e.target.files[0]));
    }

    const onTeacherChange = (e) => {
        setTeacher(e.target.value);
    }

    const onCourseTypeChange = (e) => {
        setCourseType(e.target.value);
    }

    const onPeriodChange = (e) => {
        setPeriod(e.target.value);
    }

    const onPriceChange = (e) => {
        setPrice(e.target.value);
    }

    const createCourse = () => {
        if (!name || !goal || !description || !teacher || !courseType || !period || !price) {
            const message = 'Вы должны заполнить все поля'
            enqueueSnackbar(message, { autoHideDuration: 5000, variant: 'error' })

            return
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const formData = new FormData();

        // if(image) {
        //     formData.append('image', image);
        // }
        // formData.append('name', name)
        // formData.append('goal', goal)
        // formData.append('description', description)
        // formData.append('teacher', [parseInt(teacher)])
        // formData.append('course_type', courseType)
        // formData.append('period', period)
        // formData.append('price', price)

        // console.log('FORM DATA', formData)

        // const body = formData

        const body = {
            'name': name,
            'goal': goal,
            'description': description,
            'teacher': [parseInt(teacher)],
            'image': imageURL,
            'course_type': courseType,
            'period': parseInt(period),
            'price': parseInt(price),
        }

        console.log(body)

        axios.post(`${process.env.REACT_APP_API_URL}/mainapp/courses/`, body, config)
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const ColorButton = styled(Button)(() => ({
        fontFamily: "Montserrat",
        fontSize: "14px",
        color: "white",
        backgroundColor: "#F7941D;",
        '&:hover': {
            backgroundColor: "#FFAE4D",
        },
        width: "180px",
        height: "50px",
        padding: "12px",
    }));

    return (
        <SnackbarProvider autoHideDuration={5000}>
            <div className={ s.container }>
                <div className={ s.imageUploading }>
                    { image ? <img src={ imageURL } alt='course image'/> : null}
                    <div className={ s.buttonUploadImage }>
                        <AvatarUploadModal handleFileChange={ onImageChange }/>
                    </div>
                </div>
                <div className={ s.textFields }>
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
                                label="Название курса"
                                multiline
                                onChange={ onNameChange }
                                helperText='Максимум 255 символов'
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined-textarea"
                                label="Цель курса"
                                multiline
                                onChange={ onGoalChange }
                                helperText='Максимум 255 символов'
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined-textarea"
                                label="Описание курса"
                                multiline
                                onChange={ onDescriptionChange }
                                helperText='Максимум 255 символов'
                            />
                        </div>
                        <div className={ s.selectors }>
                            <div>
                                { teachersList ? teachersList.map((teacher) => {
                                    return <select onChange={ onTeacherChange } className={ s.selector }>
                                        { teacher ? teacher.users.map((user) => {
                                            return <option key={ user.id } value={ user.id }>{ `${user.first_name} ${user.last_name}` }</option>
                                        }) : null }
                                        <option selected hidden> Выбрать учителя </option>
                                    </select>
                                }) : null }
                            </div>
                            <div>
                                <select onChange={ onCourseTypeChange } className={ s.selector }>
                                    <option selected hidden> Выбрать тип курса </option>
                                    <option key='Children' value='Children'>Для детей</option>
                                    <option key='Teenagers' value='Teenagers'>Для подростков</option>
                                    <option key='Adults' value='Adults'>Для взрослых</option>
                                </select>
                            </div>
                        </div> 
                        <div>
                            <TextField
                                id="outlined-textarea"
                                label="Период курса"
                                multiline
                                onChange={ onPeriodChange }
                            />
                        </div>
                        <div>
                            <TextField
                                id="outlined-textarea"
                                label="Цена курса"
                                multiline
                                onChange={ onPriceChange }
                            />
                        </div>
                        <div className={ s.buttonSubmit }>
                            <ColorButton onClick={ createCourse }>Создать</ColorButton>
                        </div>
                    </Box>
                </div>
            </div>
        </SnackbarProvider>
    );
};

export default CreateCourse;