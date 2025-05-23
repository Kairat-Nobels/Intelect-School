import { NavLink } from 'react-router-dom'
import styles from './footer.module.css'
import logo from '../../../public/school-logo.png'
import tel from '../../assets/images/call.png'
import whats from '../../assets/images/whatsApp.png'
import insta from '../../assets/images/Instagram.png'
import faceBookicon from '../../assets/images/faceBookicon.png'
import Modal from '../Modal/Modal'
import { useState } from 'react'

function Footer() {
    const [modal, setModal] = useState(false);

    return (
        <div className={styles.footer}>
            <div className="container">
                <nav className={styles.navbar}>
                    <NavLink className={styles.logo} to='/'>
                        <h1>INTELLECT</h1>
                        <div className={styles.logoImg}><img src={logo} alt="logo" /></div>
                        <h1>SCHOOL</h1>
                    </NavLink>
                    <ul>
                        <li><a target='_blank' href="https://www.facebook.com/"><div><img src={faceBookicon} alt="img" /></div></a></li>
                        <li><a target='_blank' href="https://www.instagram.com/"><div><img src={insta} alt="img" /></div></a></li>
                        <li><a target='_blank' href="https://wa.me/996705889889"><div><img src={whats} alt="img" /></div></a></li>
                    </ul>
                    <div className={styles.info}>
                        <div>
                            <p className={styles.workTime}>Время работы: <span>ПН-ПТ: с 8:00 до 17:00</span></p>
                            <div className={styles.tel}><img className={styles.telIcon} src={tel} alt="" /><a href='tel:+996508141312'>+996 508 141 312</a></div>
                        </div>
                        <button onClick={() => setModal(true)} className={styles.linkBtn} to={'/services'}>Оставить Заявку</button>
                    </div>
                </nav>
                <div className={styles.mobileFooter}>
                    <ul>
                        <li><a target='_blank' href="https://www.facebook.com/"><div><img src={faceBookicon} alt="img" /></div></a></li>
                        <li><a target='_blank' href="https://www.instagram.com/"><div><img src={insta} alt="img" /></div></a></li>
                        <li><a target='_blank' href="https://wa.me/996508141312"><div><img src={whats} alt="img" /></div></a></li>
                    </ul>
                    <button onClick={() => setModal(true)} className={styles.linkBtn}>Оставить Заявку</button>
                </div>
                {modal && <Modal setModal={setModal} />}
            </div>
        </div>
    )
}

export default Footer