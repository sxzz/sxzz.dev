export function runTypewriter() {
  const prefersReducedMotion = matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  document.querySelectorAll<HTMLElement>('[data-typewriter]').forEach((el) => {
    if (el.dataset.typewriterReady === 'true') return
    el.dataset.typewriterReady = 'true'

    const text = el.dataset.text || ''

    if (prefersReducedMotion) {
      el.textContent = text
      return
    }

    const charDelay = +(el.dataset.charDelay || '60')
    const startDelay = +(el.dataset.startDelay || '650')

    const cursor = document.createElement('span')
    cursor.className = 'terminal-cursor'
    cursor.textContent = '\u{258C}'
    cursor.setAttribute('aria-hidden', 'true')
    el.append(cursor)

    let i = 0
    setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          el.insertBefore(document.createTextNode(text[i]), cursor)
          i++
        } else {
          clearInterval(interval)
        }
      }, charDelay)
    }, startDelay)
  })
}
