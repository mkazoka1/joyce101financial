import { QUOTE } from '../data'
import styles from './QuoteBand.module.css'

export default function QuoteBand() {
  return (
    <div className={styles.band}>
      <p className={styles.text}>{QUOTE.text}</p>
      <p className={styles.attr}>{QUOTE.attr}</p>
    </div>
  )
}
