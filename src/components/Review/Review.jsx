import styles from './review.module.css'
import image from '../../assets/images/userIcon.png'
import icon from '../../assets/images/commentIcon.svg'
function Review({ data }) {
    return (
        <div className={styles.review}>
            <div className={styles.comment}>
                <img className={styles.comIcon} src={icon} alt="icon" />
                <p>{data.comment}</p>
            </div>
            <div className={styles.head}>
                <div className={styles.imageUser}><img src={image} alt="Smashicons" /></div>
                <h3> {data.name}</h3>
            </div>
        </div>
    )
}

export default Review