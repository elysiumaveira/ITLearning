import { Outlet, NavLink } from 'react-router-dom';
import '../css/Layout.css';

import FooterCourses from '../components/FooterCourses';

import logo from '../images/logo.svg'
import allCourses from '../images/allCourses.svg'
import selectCity from '../images/select.svg'
import loginIcon from '../images/loginIcon.svg'
import logoFooter from '../images/logo-footer.svg'

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';

const Layout = () => {
const style = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
});

return (
    <>

    <div className='container'>
    <nav>
        <NavLink to="/home" style={style}>
            <div className='logo'>
                <img src={logo} alt='logo'/>    
            </div>
        </NavLink>
        <NavLink to="/courses" style={style} className={"navLink"}>
            <div className='wrapper'>
                <img src={allCourses} alt='courses'/>
                <p>Все курсы</p>
            </div>
        </NavLink>
        <NavLink to="/events" style={style} className={"navLink"}>
            Мероприятия
        </NavLink>
        <NavLink to="/knowlege" style={style} className={"navLink"}>
            Базы знаний
        </NavLink>
        <NavLink to="/career" style={style} className={"navLink"}>
            Карьера
        </NavLink>
        <div className='wrapper'>
            <img src={selectCity} alt='select' className='icon'/>
            <select name="selectCity">
                <option value="value1">Нижний Новгород</option>
            </select>
        </div>
        <p className="phone-number">
            8 800 950-33-98
        </p>
        <NavLink to="#" className={"navLink"}>
            <div className='wrapper'>
                <img src={loginIcon} alt='loginIcon' className='icon'/>
                <p>Войти</p>
            </div>
        </NavLink>
    </nav>

    </div>

    <main >
        <Outlet />
    </main>

    <div className='footer'>
        <div className='footer-container'>
            <div className='footer-info-block'>
                <div>
                    <img src={logoFooter} />
                </div>

                <div className='footer-info-block-number'>
                    <p>8 800 950-33-98</p>
                </div>

                <div>
                    <p className='footer-info-block-text'>г. Москва, ул. Ленина, д. 50</p>
                    <p className='footer-info-block-text'>info@hodfutureacademy.ru</p>
                </div>

                <div className='footer-social'>
                    <InstagramIcon style={{color: 'white', marginRight: 20}}/>
                    <FacebookRoundedIcon style={{color: 'white', marginRight: 20}}/>
                    <YouTubeIcon style={{color: 'white', marginRight: 20}}/>
                    <TelegramIcon style={{color: 'white', marginRight: 20}}/>
                </div>

                <div className='footer-brand'>
                    © ХОД, Future Academy
                </div>
            </div>

            <div className='footer-block'>
                <p className='footer-block-title'>Детям</p>
                <div className='footer-course'>
                    <FooterCourses courseType={"Children"}/>
                </div>
            </div>

            <div className='footer-block'>
                <p className='footer-block-title'>Подросткам</p>
                <div className='footer-course'>
                    <FooterCourses courseType={"Teenagers"}/>
                </div>
            </div>

            <div className='footer-block'>
                <p className='footer-block-title'>Взрослым</p>
                <div className='footer-course'>
                    <FooterCourses courseType={"Adults"}/>
                </div>
            </div>

            <div className='footer-block'>
                <p className='footer-block-title'>Информация</p>
                <p className='footer-text'>Об академии</p>
                <p className='footer-text'>Мероприятия</p>
                <p className='footer-text'>Новости</p>
                <p className='footer-text'>База знаний</p>
                <p className='footer-text'>Карьера</p>
                <p className='footer-text'>Контакты</p>
            </div>
        </div>
    </div>
    </>
);
};

export default Layout;