import styles from "@/app/page.module.css";

export default function Appbar() {
    return (
        <div className={styles.appbar}>
            <div className={`${styles.font} ${styles.title} ${styles.user}`}>Hi Justin~</div>
            <button className={`${styles.font} ${styles.logout}`}>Logout</button>
        </div>
    )
}