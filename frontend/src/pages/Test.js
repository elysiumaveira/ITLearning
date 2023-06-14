import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import axios from 'axios';

import Loading from '../components/Loading';
import TestError from '../components/TestError';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import Modal from '@mui/material/Modal';

const OpenModal = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(true);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={ open }
                onClose={ handleClose }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ style }>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

const Test = () => {
    const [steps, setSteps] = useState(null);    
    const { user } = useSelector((store) => store.auth);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/tests/test_question/`, { params: { test: id } })
        .then(result => {
            result.data.forEach((data) => data.value = null)
            setSteps(result.data);
        })
    }, [])

    const handleChange = (event) => {
        setSteps((prev) => {
            const newStep = prev.map((step, index) => {
                if (index === activeStep) {
                    return {
                        ...step,
                        value: event.target.value,
                    }
                }
                return step;
            })
            return newStep;
        })
    };

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps?.length;

    const handleSubmit = () => {
        const submit = {
            'user':  user.id,
            'test': id,
            'answers': steps.map((value) => ({
                ['question'] : value.question,
                ['answer'] : value.value,
            })),
        }

        for (const answer in submit.answers) {
            if (submit.answers[answer]['answer'] === null) {
                console.log(`Вы не ответили на вопрос ${+answer + 1}`)
                return 
            }
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };

        const body = JSON.stringify(submit)

        axios.post(`${process.env.REACT_APP_API_URL}/tests/save_user_test/`, body, config);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    if(!steps) {
        return <Loading />
    };

    return (
        <Box sx={{ maxWidth: 800, flexGrow: 1, marginLeft: 70 }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            >
                <Typography>{steps[activeStep]?.question}</Typography>
            </Paper>
            <Box sx={{ height: 500, maxWidth: 800, width: '100%', p: 2 }}>
                <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={ steps[activeStep].value }
                            onChange={handleChange}
                        >
                            { steps[activeStep].answers.map((answer) => {
                                return (
                                    <FormControlLabel key={ answer?.id } value={ answer?.answer } control={<Radio />} label={ answer.answer }/>
                                )
                            }) }
                        </RadioGroup>
                </FormControl>
                
            </Box>
            <MobileStepper
                variant="text"
                steps={ maxSteps }
                position="static"
                activeStep={ activeStep }
                nextButton={
                    activeStep === maxSteps - 1 ? 
                    <Button
                        size="small"
                        onClick={ handleSubmit }
                    >
                        Отправить
                    </Button> : 
                    <Button
                        size="small"
                        onClick={ handleNext }
                    >
                        Следующий
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button 
                        size="small" 
                        onClick={ handleBack } 
                        disabled={ activeStep === 0 }
                    >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Предыдущий
                    </Button>
                }
            />
        </Box>
    );
}

export default Test;