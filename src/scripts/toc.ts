export function initToc() {
  const toc = document.querySelector('#toc')

  if (toc) {
    const links = toc.querySelectorAll<HTMLAnchorElement>('.toc-link')
    const headingElements: HTMLElement[] = []

    links.forEach((link) => {
      const slug = link.dataset.headingSlug
      if (slug) {
        const heading = document.querySelector<HTMLElement>(
          `#${CSS.escape(slug)}`,
        )
        if (heading) headingElements.push(heading)
      }
    })

    const activeClasses = [
      'text-stone-500',
      'dark:text-stone-400',
      'border-l',
      'border-stone-400',
      'dark:border-stone-500',
      '-ml-px',
    ]
    const inactiveClasses = ['text-stone-300', 'dark:text-stone-600']

    const setActive = (slug: string) => {
      links.forEach((link) => {
        if (link.dataset.headingSlug === slug) {
          link.classList.remove(...inactiveClasses)
          link.classList.add(...activeClasses)
        } else {
          link.classList.remove(...activeClasses)
          link.classList.add(...inactiveClasses)
        }
      })
    }

    if (headingElements.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActive(entry.target.id)
              break
            }
          }
        },
        { rootMargin: '-80px 0px -70% 0px' },
      )

      headingElements.forEach((el) => observer.observe(el))
    }
  }
}
