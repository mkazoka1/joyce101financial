import { useState, useEffect } from 'react'
import { NAV_LINKS } from '../data'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Close menu when clicking outside
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (!e.target.closest('#navbar')) setOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <>
      <nav className={styles.navbar} id="navbar">
        <span className={styles.logo}>FinanceFree™</span>

        {/* Desktop links */}
        <ul className={styles.links}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className={styles.link}>{label}</a>
            </li>
          ))}
        </ul>

        {/* Hamburger — mobile only */}
        <button
          className={`${styles.hamburger} ${open ? styles.open : ''}`}
          onClick={(e) => { e.stopPropagation(); setOpen(o => !o) }}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div className={`${styles.mobileMenu} ${open ? styles.menuOpen : ''}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <a key={href} href={href} className={styles.mobileLink} onClick={closeMenu}>
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
