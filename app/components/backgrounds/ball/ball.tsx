import styles from "./ball.module.css";

export function BallBackground(): React.ReactElement {
    return (
        <div className={styles.ball} style={{ position: 'fixed', top: '30%', left: 'auto'}}/>
    );
}