import { useEffect, useState } from 'react'
import styles from './servicePage.module.css'
import { useSelector } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'

function ServicePage() {
    const { services: schedules, loading, error } = useSelector(state => state.servicesReducer)
    // Получаем все классы и учителей из данных
    const classList = Array.from(new Set(schedules.map(s => s.class)))
    const teacherList = Array.from(
        new Set(
            schedules.flatMap(s =>
                s.schedule.flatMap(day =>
                    day.lessons.map(lesson => lesson.teacher)
                )
            )
        )
    )

    // По умолчанию выбран первый класс, если ничего не выбрано
    const [selectedClass, setSelectedClass] = useState(classList[0] || '')
    const [selectedTeacher, setSelectedTeacher] = useState('')

    // Если schedules обновились, сбрасываем выбранный класс на первый
    useEffect(() => {
        if (classList.length && !selectedClass) setSelectedClass(classList[0])
    }, [schedules])

    // Фильтрация по выбранному классу и учителю
    const filtered = schedules.filter(sch =>
        (selectedClass ? sch.class === selectedClass : true)
    ).map(sch => ({
        ...sch,
        schedule: sch.schedule.map(day => ({
            ...day,
            lessons: day.lessons.filter(lesson =>
                selectedTeacher ? lesson.teacher === selectedTeacher : true
            )
        })).filter(day => day.lessons.length > 0)
    })).filter(sch => sch.schedule.length > 0)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Выберите Класс или Преподавателя:</h2>
            <div className={styles.filters}>
                <select
                    value={selectedClass}
                    onChange={e => setSelectedClass(e.target.value)}
                    className={styles.select}
                >
                    {classList.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                    ))}
                </select>
                <select
                    value={selectedTeacher}
                    onChange={e => setSelectedTeacher(e.target.value)}
                    className={styles.select}
                >
                    <option value="">Все преподаватели</option>
                    {teacherList.map(teacher => (
                        <option key={teacher} value={teacher}>{teacher}</option>
                    ))}
                </select>
            </div>
            <div className={styles.scheduleWrap}>
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <div className='fetchError'>
                        <p>😕 Error: {error}</p>
                        <p>Проверьте Интернет и Обновите страницу</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className={styles.noData}>Нет расписания по выбранным параметрам</div>
                ) : (
                    filtered.map(sch => (
                        <div key={sch.id}>
                            <h3 className={styles.classTitle}>Класс {sch.class}</h3>
                            <div className={styles.daysColumn}>
                                {sch.schedule.map(day => (
                                    <div className={styles.dayCard} key={day.day}>
                                        <div className={styles.dayName}>{day.day}</div>
                                        <div className={styles.lessonsList}>
                                            {day.lessons.map(lesson => (
                                                <div className={styles.lessonRow} key={lesson.number}>
                                                    <div className={styles.time}>
                                                        <span>{lesson.timeStart} – {lesson.timeEnd}</span>
                                                    </div>
                                                    <div className={styles.lessonInfo}>
                                                        <p className={styles.subject}><b>{lesson.subject}</b></p>
                                                        <p className={styles.teacher}>{lesson.teacher}</p>
                                                        <p className={styles.room}>{lesson.room}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ServicePage