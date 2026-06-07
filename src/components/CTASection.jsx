import { useState } from 'react'
import styles from './CTASection.module.css'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://formspree.io/f/xwvjlnql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="cta" className={styles.section}>
      <h2 className={styles.heading}>Ready to Reclaim Your Financial Future?</h2>
      <p className={styles.sub}>
        Join thousands of families who have taken the first step toward total financial independence.
      </p>

      {status === 'success' ? (
        <div className={styles.success}>
          🎉 Thank you! Joyce will be in touch soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              className="btn-gold"
              type="submit"
              style={{ whiteSpace: 'nowrap' }}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Start Your Journey'}
            </button>
          </div>
          {status === 'error' && (
            <p className={styles.error}>Something went wrong. Please try again.</p>
          )}
        </form>
      )}

      <p className={styles.fine}>No spam, ever. Unsubscribe anytime.</p>
    </section>
  )
}