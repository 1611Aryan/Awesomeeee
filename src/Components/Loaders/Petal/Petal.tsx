import styles from "./Petal.module.scss"

const Petal = () => {
  return (
    <div className={styles.petal}>
      <div className={styles.loaderContainer}>
        <span className={styles.wave5}></span>
        <span className={styles.wave1}></span>
        <span className={styles.wave2}></span>
        <span className={styles.wave3}></span>
        <span className={styles.wave4}></span>
      </div>
    </div>
  )
}

export default Petal
