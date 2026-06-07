import { useVisible } from '../hooks/useVisible'
import { LIFESTYLE_CARDS } from '../data'
import styles from './LifestyleSection.module.css'

function LifestyleCard({ card, index, visible }) {
  return (
    <div
      className={`${styles.card} ${visible ? styles.visible : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <img className={styles.cardImg} src={card.img} alt={card.title} loading="lazy" />
      <div className={styles.cardBody}>
        <span className={styles.cardTag}>{card.tag}</span>
        <h3 className={styles.cardTitle}>{card.title}</h3>
        <p className={styles.cardDesc}>{card.desc}</p>
        <span className="card-arrow">Learn More →</span>
      </div>
    </div>
  )
}

export default function LifestyleSection() {
  const [ref, visible] = useVisible()

  return (
    <section id="lifestyle" className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <p className={styles.label}>The Life That Awaits</p>
        <h2 className={styles.heading}>Freedom Looks Like This</h2>
        <p className={styles.sub}>
          Financial independence is not just a number in a bank account — it is waking up every day and choosing exactly how you spend your time.
        </p>
        <div className={styles.grid}>
          {LIFESTYLE_CARDS.map((card, i) => (
            <LifestyleCard key={i} card={card} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
