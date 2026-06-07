import styles from './CTASection.module.css'

export default function CTASection() {
  return (
    <section id="cta" className={styles.section}>
      <h2 className={styles.heading}>Ready to Reclaim Your Financial Future?</h2>
      <p className={styles.sub}>Join thousands of families who have taken the first step toward total financial independence.</p>
      <div className={styles.inputRow}>
        <input className={styles.input} type="email" placeholder="Enter your email address" />
        <button className="btn-gold" style={{ whiteSpace: 'nowrap' }}>Get Free Guide</button>
      </div>
      <p className={styles.fine}>No spam, ever. Unsubscribe anytime.</p>
    </section>
  )
}
