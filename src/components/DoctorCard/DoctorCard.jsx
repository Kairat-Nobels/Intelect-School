import styles from './doctorCard.module.css'

function DoctorCard({ data }) {
    return (
        <div className={styles.card}>
            <div className={styles.img}><img src={data.img} alt={data.name} /></div>
            <h3 className={styles.name}>{data.name}</h3>
            <div className={styles.subject}>{data.subject}</div>
            <div className={styles.education}><span>Образование:</span> {data.education}</div>
            <div className={styles.experience}><span>Стаж:</span> {data.experience}</div>
            <div className={styles.about}>{data.about}</div>
        </div>
    )
}

export default DoctorCard