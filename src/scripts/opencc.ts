import type * as OpenCCModule from 'opencc-js'
import type { HTMLConvertHandler } from 'opencc-js'

type OpenCCMode = 'simp' | 'trad'

const ROOT_SELECTOR = '[data-opencc-root]'
const TOGGLE_SELECTOR = '[data-opencc-toggle]'
const STORAGE_KEY = 'opencc-mode'
const FROM_LANG = 'zh'
const TO_LANG = 'zh-Hant'
const OPENCC_URL = 'https://cdn.jsdelivr.net/npm/opencc-js@1/dist/esm/cn2t.js'

let openccRoot: HTMLElement | null = null
let toggleEl: HTMLElement | null = null
let currentMode: OpenCCMode = 'simp'
let htmlConvertHandler: HTMLConvertHandler | undefined
let isLoading = false
let isBound = false

function getStoredMode(): OpenCCMode {
  return localStorage.getItem(STORAGE_KEY) === 'trad' ? 'trad' : 'simp'
}

function setLoading(loading: boolean) {
  const button = toggleEl?.querySelector<HTMLButtonElement>(
    'button[data-opencc-mode="trad"]',
  )
  if (!button) return
  button.classList.toggle('is-loading', loading)
  button.setAttribute('aria-busy', String(loading))
}

function updateButtons() {
  if (!toggleEl) return
  toggleEl
    .querySelectorAll<HTMLButtonElement>('button[data-opencc-mode]')
    .forEach((button) => {
      const isActive = button.dataset.openccMode === currentMode
      button.setAttribute('aria-pressed', String(isActive))
      button.classList.toggle('text-stone-800', isActive)
      button.classList.toggle('dark:text-stone-200', isActive)
      button.classList.toggle('text-stone-400', !isActive)
      button.classList.toggle('dark:text-stone-500', !isActive)
    })
}

async function getHandler(): Promise<HTMLConvertHandler | undefined> {
  if (!openccRoot) return
  if (htmlConvertHandler) return htmlConvertHandler

  const OpenCC: typeof OpenCCModule = await import(
    /* @vite-ignore */ OPENCC_URL
  )
  const converter = OpenCC.Converter({ from: 'cn', to: 't' })
  htmlConvertHandler = OpenCC.HTMLConverter(
    converter,
    openccRoot,
    FROM_LANG,
    TO_LANG,
  )
  return htmlConvertHandler
}

async function applyMode(mode: OpenCCMode) {
  if (mode === currentMode || !openccRoot || !toggleEl || isLoading) return

  if (mode === 'trad') {
    const shouldLoad = !htmlConvertHandler
    if (shouldLoad) {
      isLoading = true
      setLoading(true)
    }
    try {
      const handler = await getHandler()
      handler?.convert()
    } finally {
      if (shouldLoad) {
        isLoading = false
        setLoading(false)
      }
    }
  } else {
    htmlConvertHandler?.restore()
  }

  openccRoot.lang = mode === 'trad' ? TO_LANG : FROM_LANG
  currentMode = mode
  localStorage.setItem(STORAGE_KEY, mode)
  updateButtons()
  animateContent()
}

function animateContent() {
  if (!openccRoot) return
  console.log(openccRoot.getAnimations())
  for (
    const animation of document.querySelector('.prose')!.getAnimations()
  ) {
    animation.cancel()
    animation.play()
  }
}

function handleClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof Element)) return

  const button = target.closest<HTMLButtonElement>(
    'button[data-opencc-mode]',
  )
  if (!button || !toggleEl?.contains(button)) return
  const mode = button.dataset.openccMode
  if (mode !== 'simp' && mode !== 'trad') return
  applyMode(mode)
}

function syncElements() {
  openccRoot = document.querySelector<HTMLElement>(ROOT_SELECTOR)
  toggleEl = document.querySelector<HTMLElement>(TOGGLE_SELECTOR)
  currentMode = 'simp'
  htmlConvertHandler = undefined
  isLoading = false
  updateButtons()
  if (getStoredMode() === 'trad') {
    applyMode('trad')
  }
}

export function initOpenCCToggle() {
  if (!isBound) {
    document.addEventListener('click', handleClick)
    document.addEventListener('astro:before-swap', () => {
      openccRoot = null
      toggleEl = null
      htmlConvertHandler = undefined
      isLoading = false
    })
    document.addEventListener('astro:page-load', syncElements)
    isBound = true
  }
  syncElements()
}
