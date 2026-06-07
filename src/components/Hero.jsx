import { useEffect, useRef } from 'react'
import { HERO, OWNER, TRUST_STATS } from '../data'
import styles from './Hero.module.css'

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

        {/* CTA buttons */}
        <div className={styles.cta} style={{ animationDelay: `${ctaDelay}s` }}>
          <button className="btn-gold">{HERO.cta1}</button>
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
