import styles from './homePage.module.css'
import about from '../../assets/images/aboutMen.webp'
import { useSelector } from 'react-redux'
import HomeCards from '../../components/HomeCards/HomeCards'
import SwipperSlider from '../../components/SwipperSlider/SwipperSlider'
import Footer from '../../components/Footer/Footer'
import { useEffect, useState } from 'react'
import ReviewModal from '../../components/ReviewModal/ReviewModal'

function HomePage() {
  const { reviews } = useSelector(state => state.reviewsReducer)
  const [reviewModal, setReviewModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* Баннер */}
      <section className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <h1>
            INTELLECT SCHOOL<br />
            ШКОЛА НОВОГО ПОКОЛЕНИЯ<br />
            ИДЕТ НАБОР С 0-10 КЛАССЫ
          </h1>
          <p>
            Приглашаем Вас на ежедневные экскурсии<br />
            с 10:00 утра до 17:00 дня в школу нового поколения INTELLECT SCHOOL
          </p>
          <a href="#about" className={styles.heroBtn}>УЗНАТЬ ПОДРОБНЕЕ</a>
        </div>
      </section>

      {/* Преимущества */}
      <section id="about" className={styles.advantages}>
        <h2 className={styles.advantagesTitle}>Наши преимущества</h2>
        <div className={styles.advList}>
          <div className={styles.advItem}>
            <span className={styles.advIcon}>🎓</span>
            <h3>Опытные педагоги</h3>
            <p>Профессиональная команда учителей с большим опытом работы</p>
          </div>
          <div className={styles.advItem}>
            <span className={styles.advIcon}>🏫</span>
            <h3>Современная инфраструктура</h3>
            <p>Уютные классы, современные лаборатории и спортзал</p>
          </div>
          <div className={styles.advItem}>
            <span className={styles.advIcon}>📚</span>
            <h3>Углублённое обучение</h3>
            <p>Развитие интеллектуальных и творческих способностей</p>
          </div>
          <div className={styles.advItem}>
            <span className={styles.advIcon}>🌐</span>
            <h3>Языки и IT</h3>
            <p>Изучение иностранных языков и современных технологий</p>
          </div>
        </div>
      </section>

      {/* О школе */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutImg}>
          <img src={about} alt="О школе" />
        </div>
        <div className={styles.aboutText}>
          <h2>Добро пожаловать в 0-9 класс школы «Интеллект»!</h2>
          <p>
            <b>«INTELLECT SCHOOL» — это общеобразовательная частная школа, основанная на базе одноимённого образовательного центра.</b>
          </p>
          <p>
            Программа обучения выстроена на приобретение актуальных знаний: программирование (IT) и английский язык. Помимо базовых школьных предметов, в программе заложены уникальные авторские курсы: ментальная арифметика, скорочтение, развитие «суперпамяти» и спорт-стекинг.
          </p>
          <div className={styles.aboutListBlock}>
            <div className={styles.aboutListTitle}>По итогу, наш ученик получает:</div>
            <ul className={styles.aboutList}>
              <li>— общеобразовательную базу;</li>
              <li>— актуальные знания в сфере программирования (IT);</li>
              <li>— уверенное знание английского языка;</li>
              <li>— уникальные способности, благодаря авторским курсам.</li>
            </ul>
          </div>
          <p>
            Ребёнок приобретает здравую тягу к образованию, уверенную самооценку, разносторонние знания и верных друзей из числа единомышленников — всё это необходимо для успешного будущего каждого человека.
          </p>
        </div>
      </section>

      {/* Направления/программы */}
      <section className={styles.servicesSection}>
        <h2>ПОЧЕМУ ЗАБОТЛИВЫЕ РОДИТЕЛИ ВЫБИРАЮТ
          ШКОЛУ "ИНТЕЛЛЕКТ"?</h2>
        <HomeCards />
      </section>

      {/* Отзывы */}
      <section className={styles.reviewsSection}>
        <h2>Отзывы родителей и учеников</h2>
        {reviews.length > 0 ? (
          <SwipperSlider items={reviews} />
        ) : (
          <div className={styles.noReviews}>К сожалению, пока нет отзывов.</div>
        )}
      </section>

      {/* Контакты и карта */}
      <section className={styles.contactsSection}>
        <div className={styles.contactsContent}>
          <div className={styles.contactsInfo}>
            <h2>Контакты</h2>
            <p>г. Бишкек, улица Малабая Джунусалиева, 177/1</p>
            <p>Телефон: <a href="tel:+996508141312">+996 508 141 312</a></p>
            <p>Email: <a href="mailto:intellect.school.bishkek@gmail.com">intellect.school.bishkek@gmail.com</a></p>
            <p>Время работы: ПН-ПТ: с 8:00 до 17:00</p>
          </div>
          <button onClick={() => setReviewModal(true)}>Оставить отзыв</button>
        </div>
        <div className={styles.contactsMap}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1462.753667523366!2d74.57973568864475!3d42.84101963019988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec9c326c2b4c9%3A0xc1ef280fbd32f6d7!2zUkhSSis2NkMsINCR0LjRiNC60LXQug!5e0!3m2!1sru!2skg!4v1747501830352!5m2!1sru!2skg" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
      {
        reviewModal && <ReviewModal setModal={setReviewModal} />
      }
      <Footer />
    </>
  )
}

export default HomePage