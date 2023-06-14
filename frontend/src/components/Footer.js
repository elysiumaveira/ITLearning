import FooterCourses from '../components/FooterCourses';

import s from '../css/Footer.module.css';

import logoFooter from '../images/logo-footer.svg';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import React from 'react';

import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';

const Footer = () => {
    return (
        <div className={ s.footer }>
            <div className={ s.container }>
                <div className={ s.infoBlock }>
                    <div>
                        <img src={ logoFooter } />
                    </div>

                    <div className={ s.infoBlockNumber }>
                        <p>+375(29)238-71-66</p>
                    </div>

                    <div>
                        <p className={ s.infoBlockText }>г. Гродно, ул. Курчатова, д. 4</p>
                        <p className={ s.infoBlockText }>xodacademy@gmail.com</p>
                    </div>

                    <div className={ s.social }>
                        <InstagramIcon style={{color: 'white', marginRight: 20}}/>
                        <FacebookRoundedIcon style={{color: 'white', marginRight: 20}}/>
                        <YouTubeIcon style={{color: 'white', marginRight: 20}}/>
                        <TelegramIcon style={{color: 'white', marginRight: 20}}/>
                    </div>

                    <div className={ s.brand }>
                        © ХОД, Future Academy
                    </div>
                </div>

                <div className={ s.block }>
                    <p className={ s.blockTitle }>Детям</p>
                    <div className={ s.course }>
                        <FooterCourses courseType={"Children"}/>
                    </div>
                </div>

                <div className={ s.block }>
                    <p className={ s.blockTitle }>Подросткам</p>
                    <div className={ s.course }>
                        <FooterCourses courseType={"Teenagers"}/>
                    </div>
                </div>

                <div className={ s.block }>
                    <p className={ s.blockTitle }>Взрослым</p>
                    <div className={ s.course }>
                        <FooterCourses courseType={"Adults"}/>
                    </div>
                </div>

                <div className={ s.block }>
                    <p className={ s.blockTitle }>Информация</p>
                    <p className={ s.text }>Об академии</p>
                    <p className={ s.text }>Мероприятия</p>
                    <p className={ s.text }>Новости</p>
                    <p className={ s.text }>База знаний</p>
                    <p className={ s.text }>Карьера</p>
                    <p className={ s.text }>Контакты</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;