import '../css/Home.css';

import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import BasicTabs from '../components/BasicTabs';

import owl from '../images/HomePage/owl.svg';
import monitor from '../images/HomePage/monitor.svg'
import newsIcon from '../images/HomePage/newsIcon.svg'
import itIcon from '../images/HomePage/itIcon.svg'
import tryIcon from '../images/HomePage/tryIcon.svg'
import { Container } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    })

return (
    <>
    <div className="banner-container">
        <div className="banner-text">
            <p className="banner-main-text">Образовательная платформа<br/>ХОД Future Academy</p>
            <p className="banner-sub-text">Актуальные знания для новичков и профессионалов</p>
        </div>
    </div>
        
    <div className="course-type-container">
        <div className='owl-container'>
            <img src={owl} className="owl-image"/>
            <div className="owl-text">
                <p className="owl-text-question">Кем вы хотите стать?</p>
                <p className="owl-sub-text">Пора найти себя<br/>и выбрать подходящий<br/>курс :)</p>
                <p className="owl-sub-text">Удачи!</p>
            </div>
        </div>
        <BasicTabs></BasicTabs>
    </div>

    <Container component="main">
        <Grid container spacing={1}>
            <Grid xs={12}>
                <div className='block-opened-doors'>
                    <div className='opened-doors-date'>
                        <p className='date-number'>25</p>
                        <p className='date-month'>ноября</p>
                    </div>
                    <div className='opened-doors-text'>
                        <p className='text-title'>День открытых дверей</p>
                        <p className='text-description'>Приглашаем всех желающих на бесплатную экскурсию <br/> в мир востребованных профессий и полезных навыков</p>
                    </div>
                    <div className='button-wrapper'>
                        <NavLink className={"button"}>Записаться</NavLink>
                    </div>
                </div>
            </Grid>

            <Grid xs={5}>
                <div className='block-courses'>
                    <img src={monitor} className='block-icon'/>
                    <p className='block-title'>Программы обучения</p>
                    <p className='block-text'>В списке наших курсов вы сможете найти <br/> профессию и занятие по душе, изучить новое и <br/> получить практические знания, которые <br/> помогут получить работу мечты.</p>
                    <div className='button-wrapper'>
                        <NavLink className={"button-courses"}>Подробнее</NavLink>
                    </div>
                </div>
            </Grid>
            <Grid xs={7}>
                <Grid container spacing={1}>
                    <Grid xs={6} sm={6}>
                        <div className='news-block'>
                            <img src={newsIcon} />
                            <p>Новости академии</p>
                        </div>
                    </Grid>
                    <Grid xs={6} sm={6}>
                        <div className='it-world'>
                            <img src={itIcon} />
                            <p>Мир IT</p>
                        </div>
                    </Grid>
                    <Grid xs={12}>
                    <div className='block-try'>
                        <div>
                            <img src={tryIcon} />
                        </div>
                        <div>
                            <p className='block-try-title'>Попробуй!</p>
                            <p className='block-try-text'>Пройдите тест и узнайте свои способности <br/> в сфере информационных технологий</p>
                        </div>
                    </div>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
    </Container>
    </>
);
};

export default Home;