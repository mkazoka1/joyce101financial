import { useState, useEffect, useRef } from 'react'
import { HERO, OWNER, TRUST_STATS } from '../data'
import styles from './Hero.module.css'

function HeroEmailForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xwvjlnql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) { setStatus('success'); setEmail('') }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  if (status === 'success') return (
    <div style={{ color: '#c9a84c', marginTop: '1.5rem', fontSize: '1rem', fontWeight: 500 }}>
      🎉 Thank you! Joyce will be in touch soon.
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', maxWidth: '480px' }}>
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          flex: 1, minWidth: '200px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(201,168,76,0.4)',
          borderRadius: '100px',
          padding: '0.8rem 1.4rem',
          color: 'white',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '0.9rem',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        className="btn-gold"
        disabled={status === 'sending'}
        style={{ whiteSpace: 'nowrap' }}
      >
        {status === 'sending' ? 'Sending...' : 'Start Your Journey'}
      </button>
      {status === 'error' && (
        <p style={{ color: '#ff6b6b', fontSize: '0.85rem', width: '100%' }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}

// Splits text into individually animated letter spans
function AnimLetters({ text, baseDelay, gold = false }) {
  return (
    <span style={gold ? { color: '#c9a84c' } : {}}>
      {text.split('').map((ch, i) =>
        ch === ' '
          ? <span key={i} style={{ display: 'inline-block', width: '0.25em' }} />
          : <span key={i} className="letter" style={{ animationDelay: `${baseDelay + i * 0.042}s` }}>
              {ch}
            </span>
      )}
    </span>
  )
}

// Subtitle fade-slide per letter
function AnimSub({ text, baseDelay }) {
  return (
    <span>
      {text.split('').map((ch, i) =>
        ch === ' '
          ? <span key={i} style={{ display: 'inline-block', width: '0.25em' }} />
          : <span key={i} className="sub-letter" style={{ animationDelay: `${baseDelay + i * 0.022}s` }}>
              {ch}
            </span>
      )}
    </span>
  )
}

export default function Hero() {
  // Calculate cascading delays for each line
  let d = 0.4
  const delays = HERO.lines.map(line => {
    const start = d
    d += line.replace(/ /g, '').length * 0.042 + 0.18
    return start
  })
  const subDelay   = d; d += HERO.subtitle.replace(/ /g, '').length * 0.022 + 0.35
  const ctaDelay   = d; d += 0.3
  const trustDelay = d

  return (
    <section className={styles.hero}>
      <div className={styles.glow} />
      <div className={styles.inner}>

        {/* Owner badge */}
        <div className={styles.ownerBadge}>
          <img className={styles.ownerImg} src={OWNER.img} alt={OWNER.name} />
          <span className={styles.ownerName}>{OWNER.name}</span>
          <span className={styles.ownerTitle}>{OWNER.title}</span>
        </div>

        {/* Animated headline */}
        <h1 className={styles.h1}>
          {HERO.lines.map((line, i) => (
            <span key={i}>
              <AnimLetters
                text={line}
                baseDelay={delays[i]}
                gold={i === HERO.lines.length - 1}
              />
              {i < HERO.lines.length - 1 && <br />}
            </span>
          ))}
        </h1>

        {/* Animated subtitle */}
        <p className={styles.sub}>
          <AnimSub text={HERO.subtitle} baseDelay={subDelay} />
        </p>

<HeroEmailForm />

<div style={{ display:'flex', flexWrap:'wrap', gap:'0.75rem', marginTop:'1rem', opacity:1 }} className="hero-cta-wrap">
  <button className="btn-ghost">{HERO.cta2}</button>
</div>

        {/* Trust strip */}
        <div className={styles.trustStrip} style={{ animationDelay: `${trustDelay}s` }}>
          {TRUST_STATS.map(({ num, label }) => (
            <div key={label} className={styles.trustItem}>
              <span className={styles.trustNum}>{num}</span>
              <span className={styles.trustLabel}>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
