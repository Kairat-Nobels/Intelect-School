
import { useSelector } from 'react-redux'
import styles from './doctorsPage.module.css'
import DoctorCard from '../../components/DoctorCard/DoctorCard'
import { useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import Spinner from '../../components/Spinner/Spinner'

function DoctorsPage() {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const { doctors, loading, error } = useSelector(state => state.doctorsReducer)
  return (
    <>
      <div className={styles.page}>
        <h2 className='title'>Наши Учителя:</h2>
        <div className={styles.doctors}>
          {
            loading ? <Spinner /> :
              error ? <div className='fetchError'><p>😕 Error: {error}</p><p>Проверьте Интернет и Обновите страницу</p></div> :
                doctors.map(s => <DoctorCard key={s.id} data={s} />)
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DoctorsPage