import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './style.css'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════ */
const progressBar = document.getElementById('scroll-progress')
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  progressBar.style.width = pct + '%'
})

/* ═══════════════════════════════════════
   NAVBAR — glass on scroll
═══════════════════════════════════════ */
const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40)
})

/* ═══════════════════════════════════════
   SMOOTH SCROLL NAV LINKS
═══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'))
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth' })
    }
  })
})

/* ═══════════════════════════════════════
   MOBILE MENU TOGGLE
═══════════════════════════════════════ */
const menuBtn  = document.getElementById('menu-btn')
const mobileMenu = document.getElementById('mobile-menu')
menuBtn?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('hidden')
  menuBtn.setAttribute('aria-expanded', String(!open))
})
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'))
})

/* ═══════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════ */
const cursorDot  = document.querySelector('.cursor-dot')
const cursorRing = document.querySelector('.cursor-ring')

let mouseX = 0, mouseY = 0
let ringX  = 0, ringY  = 0

if (cursorDot && cursorRing) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX
    mouseY = e.clientY
    cursorDot.style.left = mouseX + 'px'
    cursorDot.style.top  = mouseY + 'px'
  })

  // Lag the ring slightly for a smooth trailing effect
  ;(function animateRing() {
    ringX += (mouseX - ringX) * 0.14
    ringY += (mouseY - ringY) * 0.14
    cursorRing.style.left = ringX + 'px'
    cursorRing.style.top  = ringY + 'px'
    requestAnimationFrame(animateRing)
  })()

  // Expand ring over interactive elements
  document.querySelectorAll('a, button, .project-card, .skill-pill, .social-link').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'))
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'))
  })
}

/* ═══════════════════════════════════════
   TEXT SCRAMBLE — Hero name reveal
═══════════════════════════════════════ */
class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!<>-_\\/[]{}—=+*^?#'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const old = this.el.innerText
    const len = Math.max(old.length, newText.length)
    const promise = new Promise(resolve => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < len; i++) {
      const from  = old[i]  || ''
      const to    = newText[i] || ''
      const start = Math.floor(Math.random() * 18)
      const end   = start + Math.floor(Math.random() * 18)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameReq)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      const { from, to, start, end } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        output += `<span class="opacity-30">${this.randomChar()}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameReq = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

const scrambleEl = document.getElementById('scramble-name')
if (scrambleEl) {
  const fx = new TextScramble(scrambleEl)
  // Start after short delay so user catches it
  setTimeout(() => fx.setText('Samadhan Shinde'), 600)
}

/* ═══════════════════════════════════════
   ROLE CYCLER — typewriter effect
═══════════════════════════════════════ */
const roles = [
  'scalable systems.',
  'cloud solutions.',
  'automation tools.',
  'robust networks.',
  'full-stack apps.',
]
const cyclerEl = document.getElementById('role-cycler')
if (cyclerEl) {
  let rIdx = 0
  let charIdx = 0
  let deleting = false
  let pause = false

  function typeRole() {
    const current = roles[rIdx]
    if (pause) { setTimeout(typeRole, 1600); pause = false; return }

    if (!deleting) {
      cyclerEl.textContent = current.slice(0, ++charIdx)
      if (charIdx === current.length) { deleting = true; pause = true }
      setTimeout(typeRole, 75)
    } else {
      cyclerEl.textContent = current.slice(0, --charIdx)
      if (charIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length }
      setTimeout(typeRole, 40)
    }
  }
  setTimeout(typeRole, 1200)
}

/* ═══════════════════════════════════════
   NUMBER COUNTER — about stats
═══════════════════════════════════════ */
function animateCounter(el, target, duration = 1800) {
  const start = performance.now()
  const update = (now) => {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    // ease-out
    const ease = 1 - Math.pow(1 - progress, 3)
    el.textContent = Math.floor(ease * target)
    if (progress < 1) requestAnimationFrame(update)
    else el.textContent = target
  }
  requestAnimationFrame(update)
}

ScrollTrigger.create({
  trigger: '#about',
  start: 'top 75%',
  once: true,
  onEnter: () => {
    document.querySelectorAll('.stat-num[data-target]').forEach(el => {
      animateCounter(el, parseInt(el.dataset.target))
    })
  },
})

/* ═══════════════════════════════════════
   GSAP SCROLL REVEAL — generic
═══════════════════════════════════════ */
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    }
  )
})

/* ═══════════════════════════════════════
   GSAP STAGGER — skill pills
═══════════════════════════════════════ */
ScrollTrigger.create({
  trigger: '#skills',
  start: 'top 75%',
  once: true,
  onEnter: () => {
    gsap.fromTo('.skill-pill',
      { opacity: 0, y: 20, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.5,
        ease: 'back.out(1.3)',
        stagger: 0.05,
      }
    )
  },
})

/* ═══════════════════════════════════════
   GSAP STAGGER — project cards
═══════════════════════════════════════ */
ScrollTrigger.create({
  trigger: '#projects',
  start: 'top 75%',
  once: true,
  onEnter: () => {
    gsap.fromTo('.project-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
      }
    )
  },
})

/* ═══════════════════════════════════════
   GSAP — timeline items
═══════════════════════════════════════ */
ScrollTrigger.create({
  trigger: '#journey',
  start: 'top 75%',
  once: true,
  onEnter: () => {
    gsap.fromTo('.timeline-content',
      { opacity: 0, x: (i) => i % 2 === 0 ? -40 : 40 },
      {
        opacity: 1, x: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.15,
      }
    )
    gsap.fromTo('.timeline-dot',
      { scale: 0, opacity: 0 },
      {
        scale: 1, opacity: 1,
        duration: 0.5,
        ease: 'back.out(2)',
        stagger: 0.15,
      }
    )
  },
})

/* ═══════════════════════════════════════
   3D CARD TILT — project cards
═══════════════════════════════════════ */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    const dx   = (e.clientX - cx) / (rect.width  / 2)
    const dy   = (e.clientY - cy) / (rect.height / 2)
    card.style.transform = `translateY(-8px) scale(1.01) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg)`
  })
  card.addEventListener('mouseleave', () => {
    card.style.transform = ''
  })
})

/* ═══════════════════════════════════════
   PAGE LOAD ANIMATION
═══════════════════════════════════════ */
window.addEventListener('load', () => {
  gsap.timeline()
    .fromTo('#hero-greeting', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 })
    .fromTo('#hero-name-wrap', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.1')
    .fromTo('#hero-role-line', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.3')
    .fromTo('#hero-tagline', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    .fromTo('#hero-cta', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    .fromTo('#hero-visual', { opacity: 0, x: 40, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.6')
})

/* ═══════════════════════════════════════
   CONTACT FORM — EmailJS integration
═══════════════════════════════════════ */
const form  = document.getElementById('contact-form')
const toast = document.getElementById('toast')

function showToast(msg, isError = false) {
  toast.textContent = msg
  toast.style.borderLeftColor = isError ? '#EF4444' : '#10B981'
  toast.classList.add('show')
  setTimeout(() => toast.classList.remove('show'), 4000)
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const btn = form.querySelector('button[type="submit"]')
  btn.disabled = true
  btn.textContent = 'Sending…'

  // ───────────────────────────────────
  // TODO: Replace with your EmailJS credentials
  // 1. Sign up at https://emailjs.com (free)
  // 2. Create a service + template
  // 3. Replace SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY below
  // ───────────────────────────────────
  const SERVICE_ID  = 'YOUR_SERVICE_ID'
  const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
  const PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

  const payload = {
    from_name:  form.name.value,
    from_email: form.email.value,
    message:    form.message.value,
    to_name:    'Samadhan Shinde',
  }

  try {
    // Load EmailJS lazily to keep bundle small
    const emailjs = await import('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js')
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, payload, PUBLIC_KEY)
    showToast('✅ Message sent! Samadhan will get back to you soon.')
    form.reset()
  } catch {
    // Fallback: open mail client
    const subject = encodeURIComponent(`Portfolio contact from ${form.name.value}`)
    const body    = encodeURIComponent(form.message.value)
    window.open(`mailto:samadhan@example.com?subject=${subject}&body=${body}`)
    showToast('📬 Opening your mail app as fallback…')
  } finally {
    btn.disabled = false
    btn.textContent = 'Send Message →'
  }
})

/* ═══════════════════════════════════════
   KONAMI CODE EASTER EGG 🎮
═══════════════════════════════════════ */
const KONAMI = [38,38,40,40,37,39,37,39,66,65]
let konamiIdx = 0
document.addEventListener('keydown', e => {
  if (e.keyCode === KONAMI[konamiIdx]) {
    konamiIdx++
    if (konamiIdx === KONAMI.length) {
      konamiIdx = 0
      document.body.style.transition = 'filter .5s'
      document.body.style.filter = 'hue-rotate(180deg)'
      setTimeout(() => { document.body.style.filter = '' }, 1800)
      showToast('🎮 Konami code! Samadhan approves.')
    }
  } else { konamiIdx = 0 }
})

/* ═══════════════════════════════════════
   PREFERS REDUCED MOTION — kill animations
═══════════════════════════════════════ */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(0)
}

