import { useVisible } from '../hooks/useVisible'
import { PRINCIPLES } from '../data'
import styles from './PrinciplesSection.module.css'

function PrincipleCard({ p, index, visible }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div
        className={`${styles.card} ${visible ? styles.visible : ''}`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className={styles.icon}>{p.icon}</div>
        <h4 className={styles.title}>{p.title}</h4>
        <p className={styles.text}>{p.text}</p>
      </div>
    </div>
  )
}

export default function PrinciplesSection() {
  const [ref, visible] = useVisible()

  return (
    <section id="principles" className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <p className={styles.label}>The Foundation</p>
        <h2 className={styles.heading}>6 Pillars of Financial Independence</h2>
        <p className={styles.sub}>Master these principles and you master your financial destiny.</p>
        <div className="row g-3">
          {PRINCIPLES.map((p, i) => (
            <PrincipleCard key={i} p={p} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
