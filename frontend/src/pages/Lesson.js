import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import Loading from '../components/Loading';

import s from '../css/Lesson.module.css';

const style = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
});

const Lesson = () => {
    const { user } = useSelector((store) => store.auth);
    const { lesson_id, theme_id } = useParams();

    const [lessons, setLessons] = useState(null);
    const [materialID, setMaterialID] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLessons(null);

        if (lesson_id && theme_id) {
            axios.get(`${process.env.REACT_APP_API_URL}/mainapp/get-themes-for-lesson/${lesson_id}/${theme_id}/`)
            .then(result => {
                setLessons(result.data)
            })
            .catch((err) => {
                return
            })
        }
    }, [lesson_id, theme_id])

    if(!lessons) {
        return (
            <Loading />
        )
    }

    const ColorButton = styled(Button)(() => ({
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
    }));

    const handleOpen = (materialLink) => {
        window.open(materialLink)
    }

    return (
        <>
            <div className={ s.container }>
                <div className={ s.themes }>
                    { lessons.map((lesson) => {
                        return (
                            <div>
                                {lesson.themes.map((theme) => {
                                    return (
                                        <div className= { s.theme }>
                                            <NavLink to={ `/lesson/${lesson_id}/${theme.id}/` } style={ style }>
                                                { theme.name }
                                            </NavLink>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }) }
                </div>
                <div className={ s.main }>
                    { lessons.length ? lessons.map((lesson) => {
                        return (
                            <div>
                                { lesson.materials ? lesson.materials.map((material) => <>
                                { console.log('MATERIAL', material) }
                                    {material.video ? (
                                        <>
                                            <iframe src={material.video}
                                                frameborder='0'
                                                allow='autoplay; encrypted-media; fullscreen'
                                                title='video'
                                                width={900}
                                                height={600}
                                            />
                                        </>
                                    ) : (
                                        <div className={ s.warning }>
                                            <p>
                                                Этот урок еще не прошел, ссылка на онлайн-урок будет отправлена Вам на email ({ user.email })
                                            </p>
                                        </div>
                                    )}
                                </>) : <div className={ s.warning }>
                                            <p>
                                                Этот урок еще не прошел, ссылка на онлайн-урок будет отправлена Вам на email ({ user.email })
                                            </p>
                                        </div> }
                            </div>
                        )
                    }) : null}
                </div>
                <div className={ s.materials }>
                    {
                        lessons.map((lesson) => {
                            return (
                                <div>
                                    { lesson.materials.length ?
                                            lesson.materials.map((material) => {
                                                return (
                                                    <>
                                                        <ColorButton onClick={ ()=> handleOpen(`${process.env.REACT_APP_API_URL}/${material.file}`) }>
                                                            Открыть документацию
                                                        </ColorButton>
                                                    </>
                                                )
                                            })
                                    : <p className={ s.warning }>Материалов к уроку пока нет</p> }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default Lesson;