import { useDispatch } from 'react-redux'
import styles from './layout.module.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getRecords } from '../../redux/slices/recordSlice'
import CameModal from '../../components/CameModal/CameModal'
import { getService } from '../../redux/slices/servicesSlice'
import logo from '../../../public/school-logo.png'
import { getReviews } from '../../redux/slices/reviewsSlice'
import { getNews } from '../../redux/slices/newsSlice'
import { getDoctors } from '../../redux/slices/doctorsSlice'


function Layout() {
    const [modal, setModal] = useState(false)
    const [burger, setBurger] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getRecords())
        dispatch(getService())
        dispatch(getDoctors())
        dispatch(getReviews())
        dispatch(getNews())
    }, [])
    burger ? document.body.style.overflow = 'hidden' : document.body.style.overflow = '';
    return (
        <>
            <div className="container">
                <nav className={styles.navbar}>
                    <div className={styles.left}>
                        <NavLink className={styles.logo} to='/'>
                            <h1>INTELLECT</h1>
                            <div className={styles.logoImg}><img src={logo} alt="logo" /></div>
                            <h1><span>SCHOOL</span></h1>
                        </NavLink>
                    </div>
                    <div className={styles.info}>
                        <ul>
                            <li><NavLink to='/' className={({ isActive }) => (isActive ? styles.active : '')}>Главная</NavLink></li>
                            <li><NavLink to='/shedules' className={({ isActive }) => (isActive ? styles.active : '')}>Расписания</NavLink></li>
                            <li><NavLink to='/teachers' className={({ isActive }) => (isActive ? styles.active : '')}>Учителя</NavLink></li>
                            <li><NavLink to='/news' className={({ isActive }) => (isActive ? styles.active : '')}>Новости</NavLink></li>
                        </ul>
                        <div><button className={styles.adminBtn} onClick={e => {
                            if (localStorage.getItem('admin') === "true") {
                                navigate('/admin');
                            } else setModal(true)
                        }}>Административная панель</button></div>
                        <div className={styles.burger}>
                            <div onClick={() => setBurger(!burger)} className={styles.burgerBtn}>
                                <p className={burger ? styles.close : ''}></p>
                            </div>
                            {
                                burger && <div className={styles.burgerContent}>

                                    <div className={styles.tel}><a href='tel:+996705889889'>+996 705 889 889</a></div>
                                    <ul>
                                        <li><NavLink onClick={() => setBurger(false)} to='/' className={({ isActive }) => (isActive ? styles.active : '')}>Главная</NavLink></li>
                                        <li><NavLink onClick={() => setBurger(false)} to='/shedules' className={({ isActive }) => (isActive ? styles.active : '')}>Расписания</NavLink></li>
                                        <li><NavLink onClick={() => setBurger(false)} to='/teachers' className={({ isActive }) => (isActive ? styles.active : '')}>Учителя</NavLink></li>
                                        <li><NavLink onClick={() => setBurger(false)} to='/news' className={({ isActive }) => (isActive ? styles.active : '')}>Новости</NavLink></li>
                                        <div><button className={styles.adminBtn} onClick={e => {
                                            if (localStorage.getItem('admin') === "true") {
                                                navigate('/admin');
                                            } else setModal(true)
                                            setBurger(false)
                                        }}>Админ</button></div>

                                    </ul>
                                    <p className={styles.workTime}>Время работы: <span>ПН-ПТ: с 8:00 до 17:00</span></p>
                                </div>}
                        </div>
                    </div>
                </nav>
                {
                    modal && <CameModal setModal={setModal} />
                }
            </div>
            <div className="outlet">
                <Outlet />
            </div>
        </>
    )
}

export default Layout