import React from 'react'
import { useSelector } from 'react-redux'
import styles from './newsPage.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Footer from '../../components/Footer/Footer'

const NewsPage = () => {
  const { news, loading, error } = useSelector(state => state.newsReducer)

  return (
    <>
      <div className={styles.page}>
        <h2 className={styles.title}>Новости школы</h2>
        {loading ? <div className={styles.spinner}>Загрузка...</div>
          : error ? <div className='fetchError'><p>😕 Error: {error}</p><p>Проверьте Интернет и обновите страницу</p></div>
            : news.length > 0 ?
              <div className={`${styles.newsSlider} newsSlider`}>
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  spaceBetween={32}
                  slidesPerView={2} // всегда по 2 карточки
                  navigation
                  pagination={{ clickable: true }}
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    700: { slidesPerView: 2 }
                  }}
                >
                  {news.map(item => (
                    <SwiperSlide key={item.id}>
                      <div className={styles.newsCard}>
                        {item.image && <div className={styles.imgWrap}><img src={item.image} alt={item.title} /></div>}
                        <div className={styles.newsContent}>
                          <h3>{item.title}</h3>
                          {item.subtitle && <div className={styles.subtitle}>{item.subtitle}</div>}
                          <div className={styles.date}>{item.date}</div>
                          <p>{item.text}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              : <h3 className={styles.noNews}>Пока нет новостей.</h3>
        }
      </div>
      <Footer />
    </>
  )
}

export default NewsPage