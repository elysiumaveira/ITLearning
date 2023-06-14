import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import classNames from 'classnames'

import s from '../css/CourseDetail.module.css'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';

import { SnackbarProvider, enqueueSnackbar } from 'notistack'

import line1 from '../images/CourseDetailPage/line1.svg'
import line2 from '../images/CourseDetailPage/line2.svg'
import line3 from '../images/CourseDetailPage/line3.svg'
import line4 from '../images/CourseDetailPage/line4.svg'
import rectangle from '../images/CourseDetailPage/rectangle.svg'
import cross from '../images/CourseDetailPage/cross.svg'
import circle from '../images/CourseDetailPage/circle.svg'
import owl from '../images/CourseDetailPage/owl.svg'
import principlesImage1 from '../images/CourseDetailPage/principlesImage1.svg'
import principlesImage2 from '../images/CourseDetailPage/principlesImage2.svg'
import principlesImage3 from '../images/CourseDetailPage/principlesImage3.svg'
import principlesImage4 from '../images/CourseDetailPage/principlesImage4.svg'
import owlWithShapes from '../images/CourseDetailPage/owlWithShapes.svg'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
};

const CourseDetail = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [ course, setCourse ] = useState(null);
    
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');

    const [open, setOpen] = React.useState(false);

    const BuyCourseButton = styled(Button)(() => ({
        fontFamily: "Montserrat",
        fontSize: "14px",
        fontWeight: 700,
        color: "white",
        backgroundColor: "#F7941D;",
            '&:hover': {
                backgroundColor: "#FFAE4D",
        },
        height: "50px",
        padding: "12px",
        marginLeft: "46%",
    }));

    const ColorSubmitButton = styled(Button)(() => ({
        fontFamily: "Montserrat",
        fontSize: "14px",
        fontWeight: 700,
        color: "white",
        backgroundColor: "#F7941D;",
            '&:hover': {
                backgroundColor: "#FFAE4D",
        },
        width: "",
        height: "50px",
        padding: "12px",
        marginLeft: "33%",
        marginTop: "5%"
    }));

    const ColorButton = styled(Button)(() => ({
        fontFamily: "Montserrat",
        fontSize: "14px",
        fontWeight: 700,
        color: "white",
        backgroundColor: "#F7941D;",
        '&:hover': {
            backgroundColor: "#FFAE4D",
        },
        width: "286px",
        height: "50px",
        padding: "12px",
    }));

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(`${process.env.REACT_APP_API_URL}/mainapp/course/${ id }/`)
        .then(result => {
            const course = result.data;
            setCourse(result.data);
        })
    }, [])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        const submit = {
            'course': id,
            'email': email,
            'name': first_name
        }

        if (submit.email === '' || submit.name === '') {
            const message = 'Вы должны заполнить поля'
            enqueueSnackbar(message, { autoHideDuration: 5000, variant: 'error' })
            
            return
        }

        const message = `${ submit.name }, мы отправим ссылку на конференцию на указанный Вами email (${submit.email})`

        enqueueSnackbar(message, { autoHideDuration: 5000, variant: 'success' })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }

        const body = JSON.stringify(submit);

        axios.post(`${process.env.REACT_APP_API_URL}/mainapp/trial_lessons/`, body, config);

        setEmail('');
        setFirstName('');

        setOpen(false);
    }

    const handleBuy = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        }

        axios.post(`${process.env.REACT_APP_API_URL}/payment/create_checkout_session/${course?.id}/`, headers)
        .then((res) => {
            window.location.replace(res.data.redirect_url)
        })
    }

    const onFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    return (
        <>
            <SnackbarProvider autoHideDuration={5000}>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Записаться на пробное занятие
                        </Typography>
                        <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root' : {
                                marginLeft: 5,
                                marginTop: 3,
                                marginBottom: 1,
                                width: '300px'
                            }
                        }}
                        >
                            <TextField
                                id="outlined-required"
                                label="Email"
                                type='email'
                                onChange={ onEmailChange }
                            />
                        </Box>
                        <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root' : {
                                marginLeft: 5,
                                marginTop: 1,
                                marginBottom: 1,
                                width: '300px'
                            }
                        }}
                        >
                            <TextField
                                id="outlined-required"
                                label="Имя"
                                type='text'
                                onChange={ onFirstNameChange }
                            />
                        </Box>
                        <ColorSubmitButton variant="contained" onClick={ handleSubmit }> Записаться </ColorSubmitButton>
                    </Box>
                </Modal>
        </div>

        <div className={ s.banner }>
            <div className={ s.bannerCourseInfo }>
                <p className={ s.bannerCourseName }>{ course?.name }</p>
                <div>
                    <p className={ s.bannerCourseGoal }>{ course?.goal }</p>
                </div>
                <div className={ s.bannerCourseDescription }>
                    <div>
                        <p className={ classNames(s.gradientTopBorder, s.bannerPeriod) }>Срок обучения: <br/> { course?.period } месяцев</p>
                    </div>
                    <div>
                        <p className={ classNames(s.gradientTopBorder, s.bannerSchedule) }>Режим занятий: <br/> 3 раза в неделю по 2 академических часа</p>
                    </div>
                </div>
                <div>
                    <p className={ classNames(s.gradientTopBorder, s.bannerCoursePrice) }>От { course?.price } BYN в месяц</p>
                </div>
                <div>
                    <p className={ s.bannerLesson }>1 занятие бесплатно</p>
                </div>
                <div>
                    <p className={ s.bannerLessonDescription }>Прежде чем начать обучение, советуем записаться на пробное занятие</p>
                </div>
                <div className={s.bannerButtonBox}>
                    <ColorButton variant="contained" onClick={ handleOpen }>Записаться на пробное занятие</ColorButton>
                </div>
            </div>
            <div>
                <img className={ s.bannerImage } src={ `${process.env.REACT_APP_API_URL}/${ course?.image }` }/>
                <img src={ cross } className={ s.bannerCross } alt='cross'></img>
                <img src={ rectangle } className={ s.bannerRectangleSmall } alt='rectangle'></img>
                <img src={ circle } className={ s.bannerCircle } alt='circle'></img>
                <img src={ line1 } className={ s.bannerLeftLine } alt='line'></img>
                <img src={ line3 } className={ s.bannerMiddleLine } alt='line'></img>
                <img src={ line2 } className={ s.bannerBottomLeftLine } alt='line'></img>
                <img src={ line4 } className={ s.bannerBottomRightLine } alt='line'></img>
                <img src={ rectangle } className={ s.bannerRectangleBig } alt='rectangle'></img>
            </div>
        </div>

        <div className={ s.courseDescription }>
            <div className={ s.owl }>
                <img src={ owl } className={ s.owlImage }></img>
                <p className={ s.owlText }>Получите востребованную <br/> профессию и возможность открыть <br/> бизнес в сфере информационных <br/> технологий!</p>
            </div>
            <div className={ s.description }>
                <p className={ s.title }>Кто такой { course?.name?.toLowerCase() }</p>
                <p className={ s.descriptionText }>{ course?.description }</p>
            </div>
        </div>

        <div className={ s.salary }>
            <div>
                <p className={ s.title }>Сколько зарабатывает { course?.name?.toLowerCase() }</p>
            </div>
            <div className={ s.cardList }>
                <div className={ classNames(s.card, s.junior) }>
                    <p className={ s.cardName }>Junior</p>
                    <p className={ s.cardText }>Junior разработчик – это новичок с опытом от 6-12 месяцев, который знает базовые конструкции. Он может самостоятельно сделать простую программу, дописать или протестировать код, внести небольшие правки. </p>
                    <p className={ s.cardPrice }>от  1200 BYN в месяц</p>
                </div>
                <div className={ classNames(s.card, s.middle) }>
                    <p className={ s.cardName }>Middle</p>
                    <p className={ s.cardText }>Middle-разработчик — это уже полноценный разработчик. У него есть определенный опыт, он может самостоятельно решать большинство проблем и не нуждается в наставничестве. Важные качества Middle-разработчика: Понимание функций и структуры продукта</p>
                    <p className={ s.cardPrice} >от 2500 BYN в месяц</p>
                </div>
                <div className={ classNames(s.card, s.senior) }>
                    <p className={ s.cardName }>Senior</p>
                    <p className={ s.cardText }>Senior разработчик глубоко понимает архитектуру, устройство библиотек, фреймворков и инструментов разработки и может сам разработать любой сервис или приложение с нуля. Он знает технические риски и может заранее их прогнозировать и снижать.</p>
                    <p className={ s.cardPrice }>от 4200 BYN в месяц</p>
                </div>
            </div>
        </div>

        <div className={ s.list }>
            <p className={ classNames(s.title, s.listTitle) }>Эта программа <br/> подойдет тем, кто</p>
            <div className={ s.listItems }>
                <div className={ s.listItem }>
                    <p className={ classNames(s.gradientTopBorder, s.itemMainText) }>Никогда не работал</p>
                    <p className={ s.itemSubText }>и хочет получить востребованную профессию, трудоустроиться или создать собственный бизнес с нуля</p>
                </div>
                <div className={ s.listItem }>
                    <p className={ classNames(s.gradientTopBorder, s.itemMainText) }>Хочет научиться новому</p>
                    <p className={ s.itemSubText }>и попробовать себя в интересной и востребованной професии</p>
                </div>
                <div className={ s.listItem }>
                    <p className={ classNames(s.gradientTopBorder, s.itemMainText) }>Хочет сменить работу</p>
                    <p className={ s.itemSubText }>и получить актуальную высокооплачиваемую специальность в IT</p>
                </div>
            </div>

            <BuyCourseButton onClick={ handleBuy }> Купить курс </BuyCourseButton>

            {/* <form action={`${process.env.REACT_APP_API_URL}/payment/create_checkout_session/${course?.id}/`} method="POST">
                <button type="submit" className={ s.buyButton }>
                    КУПИТЬ КУРС
                </button>
            </form> */}
        </div>

        <div className={ s.principlesList }>
            <p className={ s.title} >Принципы обучения</p>
            <div className={ s.principlesItems }>
                <div className={ s.principlesItem }>
                    <img src={ principlesImage1 }></img>
                    <p>Передовой подход <br/> к образовательному процессу</p>
                </div>
                <div className={ s.principlesItem }>
                    <img src={ principlesImage2 }></img>
                    <p>Непрерывное усовершенствование и пополнение базы курсов</p>
                </div>
                <div className={ s.principlesItem }>
                    <img src={ principlesImage3 }></img>
                    <p>Только практикующие преподаватели</p>
                </div>
                <div className={ s.principlesItem }>
                    <img src={ principlesImage4 }></img>
                    <p>Сопровождение на всех этапах. От начала обучения до трудоустройства</p>
                </div>
            </div>
        </div>

        <div className={ s.teachingList }>
            <p className={ s.title }>Как проходит обучение</p>
            <div className={ s.teachingItems }>
                <div className={ classNames(s.gradientTopBorder, s.teachingItem) }>
                    <p>Наша уникальная программа сможет открыть ребенку безграничные возможности в обучении. Позволит развить у учеников стремление и способности к непрерывному образованию в течение всей жизни. Сформирует у учащихся критическое и рефлексивное мышление, а также способностей к самоорганизации.</p>
                </div>
                <div className={ classNames(s.gradientTopBorder, s.teachingItem) }>
                    <p>В соответствии с этими представлениями наша академия видит образование как целенаправленный развивающий процесс, который приводит к определенному результату — становлению человека, развитию у него интегральных человеческих качеств и способностей, которые позволяют человеку развиваться гораздо быстрее, открывать новые горизонты , стать объектом собственного развития и собственной жизни.</p>
                </div>
                <div className={ classNames(s.gradientTopBorder, s.teachingItem) }>
                    <p>В своем образовательном процессе мы применяем принцип обучения по пирамиде Дейла, что способствует лучшему усвоению материала. В совокупности с применением STEAM технологий,целью которых является развитие интеллектуальных способностей ребенка с возможностью вовлечения его в научно-техническое творчество, мы комплексно работаем с ребятами в интересных для них направлениях.</p>
                </div>
                <div className={ classNames(s.gradientTopBorder, s.teachingItem) }>
                    <p>Программа обучения –авторская,  разработанная с анализом современных педагогических критериев в европейской системе образования. Родители всегда видят результат занятий в выполненных проектах наших детей.</p>
                </div>
            </div>
        </div>

        </SnackbarProvider>
        </>
    );
};

export default CourseDetail;