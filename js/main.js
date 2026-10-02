/**
 * Anu & Nirmal Luxury Wedding Invitation Web
 * JavaScript Controller, Animation Engine & Interactive Systems
 */

document.addEventListener('DOMContentLoaded', () => {
  // Target Wedding Date: November 5, 2026, 08:30:00 (Sri Lanka Time GMT+5:30)
  const weddingDate = new Date('2026-11-05T08:30:00+05:30').getTime();

  /* ==========================================================================
     1. Scroll Reveal Animations (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('active'));
  }

  /* ==========================================================================
     2. Haute Couture Gold Leaf & Rose Petal Flutter Canvas Engine
     ========================================================================== */
  const canvas = document.getElementById('sparkleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    // Greatly reduced particle count to keep detail page clean and elegant
    const count = window.innerWidth < 600 ? 10 : 16;

    let mouseX = -1000;
    let mouseY = -1000;
    let lastMouseX = 0;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', (e) => {
      lastMouseX = mouseX = e.clientX;
      mouseY = e.clientY;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        lastMouseX = mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    class GoldFlake {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : -35;
        
        // Greatly reduced balloons (only ~10%), mostly soft petals and subtle gold leaf
        const randType = Math.random();
        if (randType < 0.10) {
          this.type = 'balloon';
          this.size = window.innerWidth < 600 ? (Math.random() * 4 + 6) : (Math.random() * 5 + 7);
          this.opacity = Math.random() * 0.18 + 0.25;
        } else if (randType < 0.60) {
          this.type = 'petal';
          this.size = window.innerWidth < 600 ? (Math.random() * 5 + 6) : (Math.random() * 7 + 8);
          this.opacity = Math.random() * 0.2 + 0.3;
        } else {
          this.type = 'gold';
          this.size = window.innerWidth < 600 ? (Math.random() * 4 + 4) : (Math.random() * 5 + 5);
          this.opacity = Math.random() * 0.2 + 0.3;
        }

        this.speedY = Math.random() * 0.7 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.45;
        
        // 3D rotation parameters
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.028;
        this.pitch = Math.random() * Math.PI;
        this.pitchSpeed = Math.random() * 0.03 + 0.015;

        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.022 + 0.01;
        this.opacity = Math.random() * 0.35 + 0.5;
      }

      update() {
        this.y += this.speedY;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.65 + this.speedX;

        // Subtle reaction to touch/mouse wind gust
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          this.x += (dx / (dist || 1)) * force * 3;
          this.y += (dy / (dist || 1)) * force * 1.5;
        }

        this.rotation += this.rotSpeed;
        this.pitch += this.pitchSpeed;

        if (this.y > height + 35) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        const flip = Math.cos(this.pitch);
        ctx.scale(1, this.type === 'balloon' ? 1 : flip);

        if (this.type === 'balloon') {
          // Floating luminous celebration balloon / golden orb with 3D spherical depth
          const ballGrad = ctx.createRadialGradient(-this.size * 0.32, -this.size * 0.35, 1, 0, 0, this.size);
          ballGrad.addColorStop(0, 'rgba(255, 252, 240, 0.98)');
          ballGrad.addColorStop(0.35, 'rgba(240, 218, 172, 0.9)');
          ballGrad.addColorStop(0.75, 'rgba(198, 160, 98, 0.75)');
          ballGrad.addColorStop(1, 'rgba(142, 106, 46, 0.45)');

          ctx.fillStyle = ballGrad;
          ctx.globalAlpha = this.opacity;
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();

          // Specular glossy reflection highlight
          ctx.fillStyle = 'rgba(255, 255, 255, 0.82)';
          ctx.beginPath();
          ctx.ellipse(-this.size * 0.35, -this.size * 0.38, this.size * 0.28, this.size * 0.16, -Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.type === 'gold') {
          // Shimmering metallic gold leaf flake
          const grad = ctx.createLinearGradient(-this.size, -this.size, this.size, this.size);
          grad.addColorStop(0, '#FFF0C8');
          grad.addColorStop(0.35, '#E4C690');
          grad.addColorStop(0.7, '#C89F5C');
          grad.addColorStop(1, '#8E6A2E');

          ctx.fillStyle = grad;
          ctx.globalAlpha = Math.max(0.18, Math.abs(flip) * this.opacity);
          ctx.beginPath();
          ctx.moveTo(0, -this.size * 0.9);
          ctx.lineTo(this.size * 0.85, -this.size * 0.25);
          ctx.lineTo(this.size * 0.55, this.size * 0.9);
          ctx.lineTo(-this.size * 0.6, this.size * 0.7);
          ctx.lineTo(-this.size * 0.85, -this.size * 0.4);
          ctx.closePath();
          ctx.fill();
        } else {
          // Romantic champagne / blush rose petal
          const petalGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, this.size * 1.3);
          petalGrad.addColorStop(0, 'rgba(255, 245, 238, 0.96)');
          petalGrad.addColorStop(0.55, 'rgba(244, 222, 202, 0.85)');
          petalGrad.addColorStop(1, 'rgba(215, 178, 142, 0.6)');

          ctx.fillStyle = petalGrad;
          ctx.globalAlpha = Math.max(0.2, Math.abs(flip) * this.opacity);
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 1.15, this.size * 0.72, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new GoldFlake());
    }

    let animId;
    function render() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animId = requestAnimationFrame(render);
    }

    // Pause when tab is inactive to save battery on mobile
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        render();
      }
    });

    render();
  }



  /* ==========================================================================
     2B. Subtle Falling Blossom Petals Animation (Exclusive to Envelope Intro)
     ========================================================================== */
  let cancelEnvelopePetals = null;
  const envelopePetalCanvas = document.getElementById('envelopePetalCanvas');
  if (envelopePetalCanvas) {
    const eCtx = envelopePetalCanvas.getContext('2d');
    let eWidth, eHeight;
    let petals = [];
    const petalCount = window.innerWidth < 600 ? 18 : 26;
    let eAnimId = null;

    function resizeEnvelopePetals() {
      eWidth = envelopePetalCanvas.width = window.innerWidth;
      eHeight = envelopePetalCanvas.height = window.innerHeight;
    }
    resizeEnvelopePetals();
    window.addEventListener('resize', resizeEnvelopePetals);

    class SubtlePetal {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * eWidth;
        this.y = init ? Math.random() * eHeight : -35;
        
        // 20% festive celebration balloons/orbs, 80% romantic blossom petals
        this.type = Math.random() < 0.20 ? 'balloon' : 'petal';
        if (this.type === 'balloon') {
          this.size = window.innerWidth < 600 ? (Math.random() * 6 + 9) : (Math.random() * 8 + 12);
        } else {
          this.size = window.innerWidth < 600 ? (Math.random() * 7 + 10) : (Math.random() * 10 + 12);
        }

        this.speedY = Math.random() * 0.55 + 0.38;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
        this.pitch = Math.random() * Math.PI;
        this.pitchSpeed = Math.random() * 0.025 + 0.01;
        this.opacity = Math.random() * 0.35 + 0.55;
        this.colorType = Math.random();
      }

      update() {
        this.y += this.speedY;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.55 + this.speedX;
        this.rotation += this.rotSpeed;
        this.pitch += this.pitchSpeed;

        if (this.y > eHeight + 35) {
          this.reset(false);
        }
      }

      draw() {
        eCtx.save();
        eCtx.translate(this.x, this.y);
        eCtx.rotate(this.rotation);
        const flip = Math.cos(this.pitch);
        eCtx.scale(1, this.type === 'balloon' ? 1 : flip);

        eCtx.globalAlpha = Math.max(0.22, (this.type === 'balloon' ? 1 : Math.abs(flip)) * this.opacity);

        if (this.type === 'balloon') {
          // Floating 3D celebration balloon / pearl orb
          const ballGrad = eCtx.createRadialGradient(-this.size * 0.32, -this.size * 0.35, 1, 0, 0, this.size);
          if (this.colorType < 0.4) {
            // Champagne gold celebration balloon
            ballGrad.addColorStop(0, 'rgba(255, 250, 238, 0.98)');
            ballGrad.addColorStop(0.35, 'rgba(242, 218, 170, 0.9)');
            ballGrad.addColorStop(0.75, 'rgba(202, 162, 98, 0.75)');
            ballGrad.addColorStop(1, 'rgba(155, 118, 55, 0.45)');
          } else if (this.colorType < 0.75) {
            // Romantic rose gold balloon
            ballGrad.addColorStop(0, 'rgba(255, 242, 244, 0.98)');
            ballGrad.addColorStop(0.35, 'rgba(245, 206, 212, 0.9)');
            ballGrad.addColorStop(0.75, 'rgba(216, 150, 162, 0.75)');
            ballGrad.addColorStop(1, 'rgba(175, 102, 115, 0.45)');
          } else {
            // Luminous ivory pearl balloon
            ballGrad.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
            ballGrad.addColorStop(0.4, 'rgba(247, 240, 226, 0.9)');
            ballGrad.addColorStop(0.8, 'rgba(226, 210, 185, 0.7)');
            ballGrad.addColorStop(1, 'rgba(195, 172, 140, 0.4)');
          }

          eCtx.fillStyle = ballGrad;
          eCtx.beginPath();
          eCtx.arc(0, 0, this.size, 0, Math.PI * 2);
          eCtx.fill();

          // Specular balloon highlight reflection
          eCtx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          eCtx.beginPath();
          eCtx.ellipse(-this.size * 0.35, -this.size * 0.38, this.size * 0.28, this.size * 0.16, -Math.PI / 4, 0, Math.PI * 2);
          eCtx.fill();
        } else {
          // Romantic full-bodied blossom petal
          eCtx.beginPath();
          eCtx.moveTo(0, -this.size * 0.9);
          eCtx.bezierCurveTo(this.size * 0.8, -this.size * 0.7, this.size * 0.95, this.size * 0.3, 0, this.size);
          eCtx.bezierCurveTo(-this.size * 0.95, this.size * 0.3, -this.size * 0.8, -this.size * 0.7, 0, -this.size * 0.9);
          eCtx.closePath();

          const grad = eCtx.createRadialGradient(0, -this.size * 0.2, 0, 0, 0, this.size);
          if (this.colorType < 0.45) {
            grad.addColorStop(0, 'rgba(255, 238, 235, 0.98)');
            grad.addColorStop(0.5, 'rgba(247, 210, 208, 0.88)');
            grad.addColorStop(1, 'rgba(230, 168, 165, 0.6)');
          } else if (this.colorType < 0.8) {
            grad.addColorStop(0, 'rgba(255, 253, 248, 0.98)');
            grad.addColorStop(0.55, 'rgba(245, 234, 212, 0.88)');
            grad.addColorStop(1, 'rgba(222, 198, 160, 0.55)');
          } else {
            grad.addColorStop(0, 'rgba(255, 248, 225, 0.98)');
            grad.addColorStop(0.5, 'rgba(235, 204, 138, 0.85)');
            grad.addColorStop(1, 'rgba(195, 155, 88, 0.5)');
          }

          eCtx.fillStyle = grad;
          eCtx.fill();
        }

        eCtx.restore();
      }
    }

    for (let i = 0; i < petalCount; i++) {
      petals.push(new SubtlePetal());
    }

    function renderEnvelopePetals() {
      eCtx.clearRect(0, 0, eWidth, eHeight);
      for (let i = 0; i < petals.length; i++) {
        petals[i].update();
        petals[i].draw();
      }
      eAnimId = requestAnimationFrame(renderEnvelopePetals);
    }

    renderEnvelopePetals();

    cancelEnvelopePetals = function() {
      if (eAnimId) {
        cancelAnimationFrame(eAnimId);
        eAnimId = null;
      }
      if (eCtx && eWidth && eHeight) {
        eCtx.clearRect(0, 0, eWidth, eHeight);
      }
    };
  }

  /* ==========================================================================
     3. Live Countdown Timer
     ========================================================================== */
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ==========================================================================
     4. Invitation Card & Envelope Opening Intro (Square / Round Wax Seal Click)
     ========================================================================== */
  const openInviteBtn = document.getElementById('openInviteBtn');
  const envelopeOverlay = document.getElementById('envelopeOverlay');
  const cardOpenPrompt = document.getElementById('cardOpenPrompt');

  if (cardOpenPrompt && openInviteBtn) {
    cardOpenPrompt.addEventListener('click', () => {
      openInviteBtn.click();
    });
  }

  if (openInviteBtn && envelopeOverlay) {
    openInviteBtn.addEventListener('click', () => {
      // Trigger unsealing pop animation
      openInviteBtn.classList.add('unsealing');

      // Smoothly unveil after tactile wax seal pop
      setTimeout(() => {
        envelopeOverlay.classList.add('opened');
        document.body.classList.remove('envelope-active');
        document.body.style.overflow = 'auto';

        // Start romantic ambient wedding music
        playWeddingMusic();

        // Reveal mobile action bar only after card is opened
        const mobileNav = document.getElementById('mobileActionBar');
        if (mobileNav) mobileNav.style.display = 'flex';

        // Stop envelope petals animation loop once overlay is hidden
        setTimeout(() => {
          if (typeof cancelEnvelopePetals === 'function') {
            cancelEnvelopePetals();
          }
        }, 1100);

        // Trigger reveal on elements in viewport
        setTimeout(() => {
          document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
              el.classList.add('active');
            }
          });
        }, 300);
      }, 320);
    });
  }

  // Classic Wax Seal Button (Fully preserved for 1-click easy revert or ?style=envelope)
  const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
  const envelopeClassicPrompt = document.getElementById('envelopeClassicPrompt');

  if (envelopeClassicPrompt && openEnvelopeBtn) {
    envelopeClassicPrompt.addEventListener('click', () => openEnvelopeBtn.click());
  }

  if (openEnvelopeBtn && envelopeOverlay) {
    openEnvelopeBtn.addEventListener('click', () => {
      openEnvelopeBtn.classList.add('unsealing');
      setTimeout(() => {
        envelopeOverlay.classList.add('opened');
        document.body.classList.remove('envelope-active');
        document.body.style.overflow = 'auto';

        playWeddingMusic();

        const mobileNav = document.getElementById('mobileActionBar');
        if (mobileNav) mobileNav.style.display = 'flex';

        setTimeout(() => {
          if (typeof cancelEnvelopePetals === 'function') {
            cancelEnvelopePetals();
          }
        }, 1100);

        setTimeout(() => {
          document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
              el.classList.add('active');
            }
          });
        }, 300);
      }, 400);
    });
  }

  /* ==========================================================================
     5. Ambient Wedding Music Player (Vertical Left-Center Controller)
     ========================================================================== */
  const verticalMusicBtn = document.getElementById('verticalMusicBtn');
  const weddingMusicAudio = document.getElementById('weddingMusicAudio');
  const musicVinylDisc = document.getElementById('musicVinylDisc');
  const musicStateBadge = document.getElementById('musicStateBadge');
  let isMusicPlaying = false;

  // Gentle, comfortable ambient background volume
  if (weddingMusicAudio) {
    weddingMusicAudio.volume = 0.35;
  }

  function updateMusicUI(playing) {
    if (!verticalMusicBtn) return;
    if (playing) {
      verticalMusicBtn.classList.add('playing');
      verticalMusicBtn.classList.remove('paused');
      verticalMusicBtn.classList.remove('needs-gesture');
      verticalMusicBtn.setAttribute('aria-label', 'Pause Wedding Music');
      verticalMusicBtn.setAttribute('title', 'Pause Wedding Music');
      if (musicStateBadge) musicStateBadge.textContent = 'ON';
    } else {
      verticalMusicBtn.classList.remove('playing');
      verticalMusicBtn.classList.add('paused');
      verticalMusicBtn.setAttribute('aria-label', 'Play Wedding Music');
      verticalMusicBtn.setAttribute('title', 'Play Wedding Music');
      if (musicStateBadge) musicStateBadge.textContent = 'OFF';
    }
  }

  function playWeddingMusic() {
    if (!weddingMusicAudio) return;
    weddingMusicAudio.volume = 0.35;
    const playPromise = weddingMusicAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isMusicPlaying = true;
        updateMusicUI(true);
      }).catch(err => {
        console.warn('Audio autoplay waiting for user interaction:', err);
        isMusicPlaying = false;
        updateMusicUI(false);
        if (verticalMusicBtn) verticalMusicBtn.classList.add('needs-gesture');
      });
    }
  }

  function pauseWeddingMusic() {
    if (!weddingMusicAudio) return;
    weddingMusicAudio.pause();
    isMusicPlaying = false;
    updateMusicUI(false);
  }

  function toggleWeddingMusic() {
    if (isMusicPlaying) {
      pauseWeddingMusic();
    } else {
      playWeddingMusic();
    }
  }

  if (verticalMusicBtn) {
    verticalMusicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWeddingMusic();
    });
  }

  /* ==========================================================================
     6. Add To Calendar (.ics File & Google Calendar)
     ========================================================================== */
  const btnAddToGoogle = document.getElementById('btnAddToGoogle');
  const btnDownloadIcs = document.getElementById('btnDownloadIcs');

  const eventDetails = {
    title: 'Wedding of Anu & Nirmal',
    start: '20261105T030000Z', // 08:30 AM SLT in UTC
    end: '20261105T103000Z',   // 04:00 PM (16:00) SLT in UTC
    location: 'Hotel Grand Guardian, Ratnapura, Sri Lanka',
    description: 'We joyfully invite you to celebrate our wedding day (08:30 AM – 04:00 PM) at Hotel Grand Guardian, Ratnapura. Anu & Nirmal.'
  };

  if (btnAddToGoogle) {
    btnAddToGoogle.addEventListener('click', () => {
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.start}/${eventDetails.end}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;
      window.open(gcalUrl, '_blank');
    });
  }

  if (btnDownloadIcs) {
    btnDownloadIcs.addEventListener('click', () => {
      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Anu and Nirmal Wedding//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `SUMMARY:${eventDetails.title}`,
        `DESCRIPTION:${eventDetails.description}`,
        `LOCATION:${eventDetails.location}`,
        `DTSTART:${eventDetails.start}`,
        `DTEND:${eventDetails.end}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Anu_and_Nirmal_Wedding.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  /* ==========================================================================
     7. Dynamic Personalized Guest Invitation Engine & Style Mode Switcher
     ========================================================================== */
  const urlParams = new URLSearchParams(window.location.search);
  const rawGuestName = urlParams.get('to') || urlParams.get('name') || urlParams.get('guest');
  const rawScope = urlParams.get('invite') || urlParams.get('with') || '';
  const rawTable = urlParams.get('table') || urlParams.get('seat') || '';
  const requestedStyle = (urlParams.get('style') || '').toLowerCase().trim();

  // Mode Switcher: defaults to Sri Lankan Royal Card; ?style=envelope activates Classic Wax Seal Envelope
  const introWeddingCard = document.getElementById('introWeddingCard');
  const envelopeClassicCard = document.getElementById('envelopeClassicCard');
  if (requestedStyle === 'envelope' || requestedStyle === 'classic') {
    if (introWeddingCard) introWeddingCard.style.display = 'none';
    if (envelopeClassicCard) envelopeClassicCard.style.display = 'flex';
    if (envelopeOverlay) envelopeOverlay.classList.remove('card-mode-active');
  } else {
    if (introWeddingCard) introWeddingCard.style.display = 'flex';
    if (envelopeClassicCard) envelopeClassicCard.style.display = 'none';
    if (envelopeOverlay) envelopeOverlay.classList.add('card-mode-active');
  }

  function getScopeLabel(scopeKey) {
    const key = (scopeKey || '').toLowerCase().trim();
    if (key === 'family' || key === 'fam') return 'You & Your Family';
    if (key === 'husband' || key === 'hus') return 'You & Your Husband';
    if (key === 'wife') return 'You & Your Wife';
    if (key === 'partner') return 'You & Your Partner';
    if (key === 'you' || key === 'solo') return 'You';
    if (scopeKey) return scopeKey;
    return 'You & Your Family';
  }

  const envelopeGuestName = document.getElementById('envelopeGuestName');
  const envelopeGuestScope = document.getElementById('envelopeGuestScope');
  const envelopeClassicGuestName = document.getElementById('envelopeClassicGuestName');
  const envelopeClassicGuestScope = document.getElementById('envelopeClassicGuestScope');
  const heroGuestName = document.getElementById('heroGuestName');
  const heroGuestScope = document.getElementById('heroGuestScope');

  const envelopeTableBadge = document.getElementById('envelopeTableBadge');
  const envelopeTableText = document.getElementById('envelopeTableText');
  const envelopeClassicTableBadge = document.getElementById('envelopeClassicTableBadge');
  const envelopeClassicTableText = document.getElementById('envelopeClassicTableText');
  const heroTableBadge = document.getElementById('heroTableBadge');
  const heroTableText = document.getElementById('heroTableText');
  const venueTableBox = document.getElementById('venueTableBox');
  const venueTableText = document.getElementById('venueTableText');

  if (rawGuestName) {
    const cleanName = rawGuestName.trim();
    const scopeText = getScopeLabel(rawScope);

    if (envelopeGuestName) envelopeGuestName.textContent = cleanName;
    if (envelopeGuestScope) envelopeGuestScope.textContent = scopeText;
    if (envelopeClassicGuestName) envelopeClassicGuestName.textContent = cleanName;
    if (envelopeClassicGuestScope) envelopeClassicGuestScope.textContent = scopeText;
    if (heroGuestName) heroGuestName.textContent = cleanName;
    if (heroGuestScope) heroGuestScope.textContent = scopeText;
  }

  // Optional Table Seating (shown only if table parameter is present)
  if (rawTable && rawTable.trim()) {
    const cleanTable = rawTable.trim();
    if (envelopeTableText) envelopeTableText.textContent = cleanTable;
    if (envelopeTableBadge) envelopeTableBadge.style.display = 'inline-flex';
    if (envelopeClassicTableText) envelopeClassicTableText.textContent = cleanTable;
    if (envelopeClassicTableBadge) envelopeClassicTableBadge.style.display = 'inline-flex';
    if (heroTableText) heroTableText.textContent = cleanTable;
    if (heroTableBadge) heroTableBadge.style.display = 'inline-flex';
    if (venueTableText) venueTableText.textContent = cleanTable;
    if (venueTableBox) venueTableBox.style.display = 'block';
  } else {
    if (envelopeTableBadge) envelopeTableBadge.style.display = 'none';
    if (envelopeClassicTableBadge) envelopeClassicTableBadge.style.display = 'none';
    if (heroTableBadge) heroTableBadge.style.display = 'none';
    if (venueTableBox) venueTableBox.style.display = 'none';
  }

  /* ==========================================================================
     8A. Couple Tool: Personalized Guest Link Generator Logic
     ========================================================================== */
  const genGuestNameInput = document.getElementById('genGuestName');
  const genInviteScopeSelect = document.getElementById('genInviteScope');
  const genTableNumberInput = document.getElementById('genTableNumber');
  const tableChipBtns = document.querySelectorAll('.table-chip-btn');
  const genLinkInput = document.getElementById('genLinkInput');
  const copySuccessNote = document.getElementById('copySuccessNote');
  const btnCopyInviteMessage = document.getElementById('btnCopyInviteMessage');
  const btnCopyGeneratedLink = document.getElementById('btnCopyGeneratedLink');
  const btnShareWhatsAppGuest = document.getElementById('btnShareWhatsAppGuest');
  const btnPreviewGeneratedLink = document.getElementById('btnPreviewGeneratedLink');

  function getCleanBaseUrl() {
    // The live hosted website domain
    const LIVE_HOSTED_URL = 'https://anu-nirmal.vercel.app/';

    // When opened directly as local file (file:///) or on local development (localhost / 127.0.0.1),
    // always generate links pointing to the live hosted domain so shared links work immediately for guests!
    if (!window.location.protocol || window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || !window.location.host) {
      return LIVE_HOSTED_URL;
    }

    const origin = window.location.origin || (window.location.protocol + '//' + window.location.host);
    // Strip trailing index.html / index.php and normalize
    const cleanPath = window.location.pathname.replace(/\/(index\.(html|php))?$/i, '');
    return `${origin}${cleanPath}/`;
  }

  function generateInvitationMessage(guestName, scopeText, linkUrl, tableText) {
    const tableLine = tableText ? `\n\n🪑 *Reserved Seating:* ${tableText}` : '';
    return `🌸 💍 *Anu & Nirmal are getting married!* 💍 🌸\n\n` +
           `Dear *${guestName}*,\n\n` +
           `Because you have shared in our lives and brought us joy, we warmly invite *${scopeText}* to celebrate our wedding day with us.\n\n` +
           `📅 *Date:* Thursday, November 5, 2026\n\n` +
           `📍 *Venue:* Hotel Grand Guardian, Ratnapura` +
           tableLine + `\n\n` +
           `✨ *Tap the link below to view your personalized invitation:*\n\n` +
           `${linkUrl}\n\n` +
           `We look forward to celebrating this special day with you! 💕`;
  }

  function updateGeneratedLink() {
    if (!genLinkInput) return '';
    const name = genGuestNameInput ? genGuestNameInput.value.trim() : '';
    const scope = genInviteScopeSelect ? genInviteScopeSelect.value : 'family';
    const scopeText = genInviteScopeSelect ? genInviteScopeSelect.options[genInviteScopeSelect.selectedIndex].text : 'You & Your Family';
    const tableVal = genTableNumberInput ? genTableNumberInput.value.trim() : '';
    const baseUrl = getCleanBaseUrl();

    // If no name entered, generate a clear live template preview
    const effectiveName = name || 'Uncle Bandara & Family';
    let fullUrl = `${baseUrl}?to=${encodeURIComponent(effectiveName)}&invite=${encodeURIComponent(scope)}`;
    if (tableVal) {
      fullUrl += `&table=${encodeURIComponent(tableVal)}`;
    }

    genLinkInput.value = fullUrl;

    if (btnPreviewGeneratedLink) {
      btnPreviewGeneratedLink.href = fullUrl;
    }

    // Update WhatsApp link immediately so clicking it works natively
    if (btnShareWhatsAppGuest) {
      const msg = generateInvitationMessage(name || effectiveName, scopeText, fullUrl, tableVal);
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
      btnShareWhatsAppGuest.setAttribute('href', waUrl);
    }

    // Sync active state on quick-select chips
    if (tableChipBtns && tableChipBtns.length) {
      tableChipBtns.forEach((btn) => {
        const btnVal = btn.getAttribute('data-table') || '';
        if (btnVal && tableVal.toLowerCase() === btnVal.toLowerCase()) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    return fullUrl;
  }

  // Copy link handler that works 100% on HTTP and all devices without prompt dialog!
  async function handleCopyGuestLink(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const name = genGuestNameInput ? genGuestNameInput.value.trim() : '';
    if (!name) {
      alert('Please enter a guest name first.');
      if (genGuestNameInput) genGuestNameInput.focus();
      return;
    }

    const fullUrl = updateGeneratedLink();

    let copied = false;

    // Method 1: Try modern clipboard API if secure context
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(fullUrl);
        copied = true;
      } catch (err) {
        console.warn('Clipboard API error:', err);
      }
    }

    // Method 2: Select and copy from the visible genLinkInput element (works on HTTP & mobile)
    if (!copied && genLinkInput) {
      try {
        genLinkInput.focus();
        genLinkInput.select();
        genLinkInput.setSelectionRange(0, 99999);
        copied = document.execCommand('copy');
      } catch (err) {
        console.warn('execCommand copy failed:', err);
      }
    }

    // Method 3: Fallback hidden element
    if (!copied) {
      try {
        const temp = document.createElement('textarea');
        temp.value = fullUrl;
        temp.setAttribute('readonly', '');
        temp.style.position = 'fixed';
        temp.style.opacity = '0.01';
        temp.style.left = '10px';
        temp.style.top = '10px';
        document.body.appendChild(temp);
        temp.focus();
        temp.select();
        temp.setSelectionRange(0, 99999);
        copied = document.execCommand('copy');
        document.body.removeChild(temp);
      } catch (err) {
        console.warn('Fallback copy failed:', err);
      }
    }

    // UI Feedback (NEVER use prompt())
    if (copySuccessNote) {
      copySuccessNote.style.display = 'block';
      setTimeout(() => {
        copySuccessNote.style.display = 'none';
      }, 3500);
    }

    if (btnCopyGeneratedLink) {
      const origHtml = btnCopyGeneratedLink.innerHTML;
      btnCopyGeneratedLink.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg><span>✓ Link Copied!</span>';
      setTimeout(() => {
        btnCopyGeneratedLink.innerHTML = origHtml;
      }, 2500);
    }
  }

  // Copy full formatted invitation message handler
  async function handleCopyInviteMessage(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const name = genGuestNameInput ? genGuestNameInput.value.trim() : '';
    if (!name) {
      alert('Please enter a guest name first.');
      if (genGuestNameInput) genGuestNameInput.focus();
      return;
    }

    const fullUrl = updateGeneratedLink();
    const scopeText = genInviteScopeSelect ? genInviteScopeSelect.options[genInviteScopeSelect.selectedIndex].text : 'You & Your Family';
    const tableVal = genTableNumberInput ? genTableNumberInput.value.trim() : '';
    const fullMsg = generateInvitationMessage(name, scopeText, fullUrl, tableVal);

    let copied = false;

    // Method 1: Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(fullMsg);
        copied = true;
      } catch (err) {
        console.warn('Clipboard API error:', err);
      }
    }

    // Method 2: Fallback textarea
    if (!copied) {
      try {
        const temp = document.createElement('textarea');
        temp.value = fullMsg;
        temp.setAttribute('readonly', '');
        temp.style.position = 'fixed';
        temp.style.opacity = '0.01';
        temp.style.left = '10px';
        temp.style.top = '10px';
        document.body.appendChild(temp);
        temp.focus();
        temp.select();
        temp.setSelectionRange(0, 99999);
        copied = document.execCommand('copy');
        document.body.removeChild(temp);
      } catch (err) {
        console.warn('Fallback copy failed:', err);
      }
    }

    // UI Feedback
    if (copySuccessNote) {
      copySuccessNote.textContent = '✓ Full invitation message copied! Ready to paste anywhere.';
      copySuccessNote.style.display = 'block';
      setTimeout(() => {
        copySuccessNote.style.display = 'none';
        copySuccessNote.textContent = '✓ Link copied to clipboard! You can paste and send it anywhere.';
      }, 3500);
    }

    if (btnCopyInviteMessage) {
      const origHtml = btnCopyInviteMessage.innerHTML;
      btnCopyInviteMessage.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg><span>✓ Message Copied!</span>';
      setTimeout(() => {
        btnCopyInviteMessage.innerHTML = origHtml;
      }, 2500);
    }
  }

  // Bind live updates
  if (genGuestNameInput) {
    genGuestNameInput.addEventListener('input', updateGeneratedLink);
    genGuestNameInput.addEventListener('change', updateGeneratedLink);
    genGuestNameInput.addEventListener('keyup', updateGeneratedLink);
  }
  if (genInviteScopeSelect) {
    genInviteScopeSelect.addEventListener('change', updateGeneratedLink);
  }
  if (genTableNumberInput) {
    genTableNumberInput.addEventListener('input', updateGeneratedLink);
    genTableNumberInput.addEventListener('change', updateGeneratedLink);
    genTableNumberInput.addEventListener('keyup', updateGeneratedLink);
  }
  if (tableChipBtns && tableChipBtns.length) {
    tableChipBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const tableVal = btn.getAttribute('data-table') || '';
        if (genTableNumberInput) {
          genTableNumberInput.value = tableVal;
          updateGeneratedLink();
          genTableNumberInput.focus();
        }
      });
    });
  }

  // Clicking on the readonly input selects all text for easy manual copy if desired
  if (genLinkInput) {
    genLinkInput.addEventListener('click', () => {
      genLinkInput.select();
      genLinkInput.setSelectionRange(0, 99999);
    });
  }

  if (btnCopyInviteMessage) {
    btnCopyInviteMessage.addEventListener('click', handleCopyInviteMessage);
  }

  if (btnCopyGeneratedLink) {
    btnCopyGeneratedLink.addEventListener('click', handleCopyGuestLink);
  }

  if (btnShareWhatsAppGuest) {
    btnShareWhatsAppGuest.addEventListener('click', (e) => {
      const name = genGuestNameInput ? genGuestNameInput.value.trim() : '';
      if (!name) {
        e.preventDefault();
        alert('Please enter a guest name first.');
        if (genGuestNameInput) genGuestNameInput.focus();
        return;
      }
    });
  }

  // Initialize the link generator immediately on script load
  updateGeneratedLink();

  /* ==========================================================================
     8B. Home URL Couple Portal Gate & Guest Link Separation
        - When on Home URL (no guest name in query string):
          The wedding invitation, photos, schedule, and audio are completely hidden.
          Only the exclusive Couple Portal Gate is displayed.
          Passcode: 2026 (or 'anu' / 'nirmal').
          Once unlocked, displays the Guest Link Generator so the couple can create,
          preview, copy, and share links directly to WhatsApp.
        - When visiting via Personalized Guest Link (?to=GuestName):
          Couple Portal is 100% hidden.
          The luxury Envelope, personalized card, full invitation, and audio are shown.
     ========================================================================== */
  const couplePortalGate = document.getElementById('couplePortalGate');
  const portalLockedCard = document.getElementById('portalLockedCard');
  const portalGeneratorCard = document.getElementById('portalGeneratorCard');
  const portalUnlockForm = document.getElementById('portalUnlockForm');
  const portalPasscodeInput = document.getElementById('portalPasscodeInput');
  const portalErrorMsg = document.getElementById('portalErrorMsg');
  const btnLockPortalAgain = document.getElementById('btnLockPortalAgain');
  const siteWrapper = document.getElementById('siteWrapper');
  const mobileActionBar = document.getElementById('mobileActionBar');
  const footerLockBtn = document.getElementById('footerLockBtn');

  const isGuestLink = Boolean(rawGuestName && rawGuestName.trim());
  let isCoupleMode = false;

  function initPageGating() {
    if (isGuestLink) {
      // --- Guest Mode: Show personalized invitation, hide couple portal ---
      isCoupleMode = false;
      document.body.classList.add('guest-view-mode');
      document.body.classList.add('envelope-active');
      document.body.style.overflow = 'hidden';

      if (couplePortalGate) couplePortalGate.style.display = 'none';
      if (envelopeOverlay) envelopeOverlay.style.display = 'flex';
      if (siteWrapper) siteWrapper.style.display = 'block';

      // Keep bottom navigation hidden until envelope is opened
      if (mobileActionBar) mobileActionBar.style.display = 'none';
      if (verticalMusicBtn) verticalMusicBtn.style.display = 'flex';

    } else {
      // --- Home URL (Couple Gate): Hide entire invitation, show passcode portal ---
      isCoupleMode = true;
      document.body.classList.remove('guest-view-mode');
      document.body.classList.remove('envelope-active');
      document.body.style.overflow = 'auto';

      // Hide all invitation UI
      if (envelopeOverlay) envelopeOverlay.style.display = 'none';
      if (siteWrapper) siteWrapper.style.display = 'none';
      if (mobileActionBar) mobileActionBar.style.display = 'none';
      if (verticalMusicBtn) verticalMusicBtn.style.display = 'none';

      // Show couple portal
      if (couplePortalGate) couplePortalGate.style.display = 'flex';

      // Check session unlock status
      const isUnlocked = sessionStorage.getItem('anu_nirmal_portal_unlocked') === 'true';
      if (isUnlocked) {
        if (portalLockedCard) portalLockedCard.style.display = 'none';
        if (portalGeneratorCard) portalGeneratorCard.style.display = 'block';
        updateGeneratedLink();
        renderPortalWishes();
      } else {
        if (portalLockedCard) portalLockedCard.style.display = 'block';
        if (portalGeneratorCard) portalGeneratorCard.style.display = 'none';
        if (portalPasscodeInput) {
          portalPasscodeInput.value = '';
          setTimeout(() => portalPasscodeInput.focus(), 200);
        }
      }
    }

    renderWishes();
    renderPortalWishes();
  }

  // Handle Passcode Unlock Form submission (Passcode: 2026)
  if (portalUnlockForm) {
    portalUnlockForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = (portalPasscodeInput ? portalPasscodeInput.value : '').trim().toLowerCase();
      if (entered === '2026' || entered === 'anu' || entered === 'nirmal') {
        if (portalErrorMsg) portalErrorMsg.style.display = 'none';
        sessionStorage.setItem('anu_nirmal_portal_unlocked', 'true');

        if (portalLockedCard) portalLockedCard.style.display = 'none';
        if (portalGeneratorCard) portalGeneratorCard.style.display = 'block';
        updateGeneratedLink();
        renderPortalWishes();
        renderWishes();

        if (genGuestNameInput) {
          setTimeout(() => {
            genGuestNameInput.focus();
            genGuestNameInput.select();
          }, 150);
        }
      } else {
        if (portalErrorMsg) portalErrorMsg.style.display = 'block';
        if (portalPasscodeInput) {
          portalPasscodeInput.focus();
          portalPasscodeInput.classList.add('shake');
          setTimeout(() => portalPasscodeInput.classList.remove('shake'), 500);
        }
      }
    });
  }

  // Handle "Lock Portal" button inside the generator card
  if (btnLockPortalAgain) {
    btnLockPortalAgain.addEventListener('click', () => {
      sessionStorage.removeItem('anu_nirmal_portal_unlocked');
      if (portalGeneratorCard) portalGeneratorCard.style.display = 'none';
      if (portalLockedCard) portalLockedCard.style.display = 'block';
      if (portalPasscodeInput) {
        portalPasscodeInput.value = '';
        portalPasscodeInput.focus();
      }
    });
  }

  // Footer lock button fallback (if rendered)
  if (footerLockBtn) {
    footerLockBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = getCleanBaseUrl();
    });
  }

  // Note: initPageGating() is called at the end of DOMContentLoaded once all handlers are registered.

  /* ==========================================================================
     9. Wishes Guestbook & File-Based Storage (Full Couple Management)
     ========================================================================== */
  const wishForm = document.getElementById('wishForm');
  const wishesContainer = document.getElementById('wishesContainer');

  // Dummy wishes removed - guestbook starts 100% clean
  const defaultWishes = [];

  let currentWishes = [];

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // Check if couple workspace is unlocked in this session
  function isCoupleUnlocked() {
    return sessionStorage.getItem('anu_nirmal_portal_unlocked') === 'true';
  }

  async function loadWishes() {
    try {
      const res = await fetch('api/wishes.php', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.status === 'success' && Array.isArray(data.wishes)) {
          currentWishes = data.wishes.filter(w => w && !['wish_1', 'wish_2', 'wish_3'].includes(w.id));
          localStorage.setItem('anu_nirmal_wishes', JSON.stringify(currentWishes));
          renderWishes();
          renderPortalWishes();
          return;
        }
      }
    } catch (err) {
      console.warn('api/wishes.php offline, falling back to local store:', err);
    }

    try {
      const stored = JSON.parse(localStorage.getItem('anu_nirmal_wishes') || '[]');
      // Filter out any legacy dummy wish IDs from previous tests
      currentWishes = Array.isArray(stored) ? stored.filter(w => w && !['wish_1', 'wish_2', 'wish_3'].includes(w.id)) : [];
      localStorage.setItem('anu_nirmal_wishes', JSON.stringify(currentWishes));
    } catch (e) {
      currentWishes = [];
    }

    renderWishes();
    renderPortalWishes();
  }

  // --- Public Guestbook Renderer ---
  function renderWishes() {
    if (!wishesContainer) return;
    wishesContainer.innerHTML = '';

    if (currentWishes.length === 0) {
      wishesContainer.innerHTML = '<div style="text-align:center; padding: 26px 16px; color: var(--text-muted); font-size: 0.88rem;">No wishes added yet. Be the first to bless the couple!</div>';
      return;
    }

    const coupleAuthorized = isCoupleUnlocked();

    currentWishes.forEach(item => {
      const div = document.createElement('div');
      div.className = 'wish-item';
      div.id = `wish-${item.id}`;

      const coupleControlsHtml = coupleAuthorized
        ? `<div class="wish-couple-actions">
             <button type="button" class="btn-edit-wish" data-id="${escapeHtml(item.id)}" title="Edit wish">✎ Edit</button>
             <button type="button" class="btn-delete-wish" data-id="${escapeHtml(item.id)}" title="Delete wish">✕ Remove</button>
           </div>`
        : '';

      div.innerHTML = `
        <div class="wish-meta">
          <span class="wish-author">${escapeHtml(item.author)}</span>
          <div class="wish-right-meta">
            <span class="wish-time">${escapeHtml(item.time || '')}</span>
            ${coupleControlsHtml}
          </div>
        </div>
        <div class="wish-text">“${escapeHtml(item.text)}”</div>
      `;
      wishesContainer.appendChild(div);
    });

    // Bind edit/delete handlers in public view when couple is authorized
    if (coupleAuthorized) {
      wishesContainer.querySelectorAll('.btn-edit-wish').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const wishId = btn.getAttribute('data-id');
          const wishItem = currentWishes.find(w => w.id === wishId);
          if (!wishItem) return;

          const newAuthor = prompt('Edit Guest / Author Name:', wishItem.author);
          if (newAuthor === null) return;
          const newText = prompt('Edit Blessing Message:', wishItem.text);
          if (newText === null) return;

          if (!newAuthor.trim() || !newText.trim()) {
            alert('Name and message cannot be empty.');
            return;
          }

          updateWish(wishId, newAuthor.trim(), newText.trim());
        });
      });

      wishesContainer.querySelectorAll('.btn-delete-wish').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const wishId = btn.getAttribute('data-id');
          const wishItem = currentWishes.find(w => w.id === wishId);
          const authorName = wishItem ? wishItem.author : 'this guest';

          if (confirm(`Are you sure you want to remove the blessing from "${authorName}"?`)) {
            deleteWish(wishId);
          }
        });
      });
    }
  }

  // --- Couple Portal Wishes Management Renderer ---
  function renderPortalWishes() {
    const portalWishesCountBadge = document.getElementById('portalWishesCountBadge');
    const portalWishesList = document.getElementById('portalWishesList');

    if (portalWishesCountBadge) {
      portalWishesCountBadge.textContent = currentWishes.length;
    }

    if (!portalWishesList) return;
    portalWishesList.innerHTML = '';

    if (currentWishes.length === 0) {
      portalWishesList.innerHTML = `
        <div class="portal-empty-wishes">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" style="margin: 0 auto 8px; display: block; opacity: 0.5;">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <strong>No wishes received yet.</strong><br>
          <span style="font-size: 0.78rem;">When guests submit blessings on your website, they will appear here. You can also use the "+ Add Blessing" button above to add one manually.</span>
        </div>
      `;
      return;
    }

    currentWishes.forEach(item => {
      const card = document.createElement('div');
      card.className = 'portal-wish-item';
      card.id = `portal-wish-${item.id}`;

      card.innerHTML = `
        <div class="portal-wish-top">
          <div class="portal-wish-author-info">
            <span class="portal-wish-author-name">${escapeHtml(item.author)}</span>
            <span class="portal-wish-time">${escapeHtml(item.time || 'Guest blessing')}</span>
          </div>
          <div class="portal-wish-actions">
            <button type="button" class="portal-action-btn portal-btn-edit-action" data-id="${escapeHtml(item.id)}" title="Edit Blessing">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              <span>Edit</span>
            </button>
            <button type="button" class="portal-action-btn btn-delete portal-btn-delete-action" data-id="${escapeHtml(item.id)}" title="Delete Blessing">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>Delete</span>
            </button>
          </div>
        </div>
        <div class="portal-wish-body">“${escapeHtml(item.text)}”</div>
      `;

      portalWishesList.appendChild(card);
    });

    // Bind Edit in Portal
    portalWishesList.querySelectorAll('.portal-btn-edit-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const wish = currentWishes.find(w => w.id === id);
        if (!wish) return;

        const portalEditWishCard = document.getElementById('portalEditWishCard');
        const portalAddWishCard = document.getElementById('portalAddWishCard');
        const portalEditWishId = document.getElementById('portalEditWishId');
        const portalEditAuthor = document.getElementById('portalEditAuthor');
        const portalEditText = document.getElementById('portalEditText');

        if (portalAddWishCard) portalAddWishCard.style.display = 'none';

        if (portalEditWishCard && portalEditWishId && portalEditAuthor && portalEditText) {
          portalEditWishId.value = wish.id;
          portalEditAuthor.value = wish.author;
          portalEditText.value = wish.text;
          portalEditWishCard.style.display = 'block';
          portalEditWishCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          portalEditAuthor.focus();
        }
      });
    });

    // Bind Delete in Portal
    portalWishesList.querySelectorAll('.portal-btn-delete-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const wish = currentWishes.find(w => w.id === id);
        const name = wish ? wish.author : 'this guest';

        if (confirm(`Are you sure you want to permanently delete the blessing from "${name}"?`)) {
          deleteWish(id);
        }
      });
    });
  }

  // --- CRUD Operations for Wishes ---
  async function addWish(author, text) {
    let newWish = {
      id: 'wish_' + Date.now(),
      author: author,
      text: text,
      time: 'Just now'
    };

    try {
      const res = await fetch('api/wishes.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', author, text })
      });
      const data = await res.json();
      if (data && data.status === 'success' && data.wish) {
        newWish = data.wish;
      }
    } catch (err) {
      console.warn('API offline, saving wish locally');
    }

    currentWishes.unshift(newWish);
    localStorage.setItem('anu_nirmal_wishes', JSON.stringify(currentWishes));
    renderWishes();
    renderPortalWishes();
    return newWish;
  }

  async function updateWish(id, newAuthor, newText) {
    const wish = currentWishes.find(w => w.id === id);
    if (!wish) return;

    wish.author = newAuthor;
    wish.text = newText;
    wish.time = 'Updated just now';

    localStorage.setItem('anu_nirmal_wishes', JSON.stringify(currentWishes));
    renderWishes();
    renderPortalWishes();

    try {
      await fetch('api/wishes.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', id, author: newAuthor, text: newText })
      });
    } catch (err) {
      console.warn('API offline, wish updated in local store');
    }
  }

  async function deleteWish(id) {
    currentWishes = currentWishes.filter(w => w.id !== id);
    localStorage.setItem('anu_nirmal_wishes', JSON.stringify(currentWishes));
    renderWishes();
    renderPortalWishes();

    try {
      await fetch('api/wishes.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id })
      });
    } catch (err) {
      console.warn('API offline, wish removed from local store');
    }
  }

  // --- Public Wish Form Submission ---
  if (wishForm) {
    wishForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const author = document.getElementById('wishAuthor')?.value.trim();
      const text = document.getElementById('wishText')?.value.trim();

      if (!author || !text) {
        alert('Please write your name and a short blessing.');
        return;
      }

      await addWish(author, text);
      wishForm.reset();
      alert('Thank you for your heartfelt blessing!');
    });
  }

  // --- Portal Tab & Wish Management Wiring ---
  const btnTabLinks = document.getElementById('btnTabLinks');
  const btnTabWishes = document.getElementById('btnTabWishes');
  const panelPortalLinks = document.getElementById('panelPortalLinks');
  const panelPortalWishes = document.getElementById('panelPortalWishes');
  const portalCardHeading = document.getElementById('portalCardHeading');

  if (btnTabLinks && btnTabWishes) {
    btnTabLinks.addEventListener('click', () => {
      btnTabLinks.classList.add('active');
      btnTabWishes.classList.remove('active');
      if (panelPortalLinks) panelPortalLinks.style.display = 'block';
      if (panelPortalWishes) panelPortalWishes.style.display = 'none';
      if (portalCardHeading) portalCardHeading.textContent = 'Guest Link Creator';
    });

    btnTabWishes.addEventListener('click', () => {
      btnTabWishes.classList.add('active');
      btnTabLinks.classList.remove('active');
      if (panelPortalLinks) panelPortalLinks.style.display = 'none';
      if (panelPortalWishes) panelPortalWishes.style.display = 'block';
      if (portalCardHeading) portalCardHeading.textContent = 'Guestbook & Wishes Manager';
      renderPortalWishes();
    });
  }

  // Portal Add Wish Toggle & Handlers
  const btnToggleAddWish = document.getElementById('btnToggleAddWish');
  const portalAddWishCard = document.getElementById('portalAddWishCard');
  const btnCancelAddWish = document.getElementById('btnCancelAddWish');
  const btnSaveNewWish = document.getElementById('btnSaveNewWish');
  const portalNewAuthor = document.getElementById('portalNewAuthor');
  const portalNewText = document.getElementById('portalNewText');

  if (btnToggleAddWish && portalAddWishCard) {
    btnToggleAddWish.addEventListener('click', () => {
      const isHidden = portalAddWishCard.style.display === 'none' || !portalAddWishCard.style.display;
      portalAddWishCard.style.display = isHidden ? 'block' : 'none';
      const portalEditWishCard = document.getElementById('portalEditWishCard');
      if (portalEditWishCard) portalEditWishCard.style.display = 'none';
      if (isHidden && portalNewAuthor) {
        portalNewAuthor.focus();
      }
    });
  }

  if (btnCancelAddWish && portalAddWishCard) {
    btnCancelAddWish.addEventListener('click', () => {
      portalAddWishCard.style.display = 'none';
      if (portalNewAuthor) portalNewAuthor.value = '';
      if (portalNewText) portalNewText.value = '';
    });
  }

  if (btnSaveNewWish) {
    btnSaveNewWish.addEventListener('click', async () => {
      const author = portalNewAuthor ? portalNewAuthor.value.trim() : '';
      const text = portalNewText ? portalNewText.value.trim() : '';

      if (!author || !text) {
        alert('Please enter both the guest name and blessing message.');
        return;
      }

      await addWish(author, text);
      if (portalNewAuthor) portalNewAuthor.value = '';
      if (portalNewText) portalNewText.value = '';
      if (portalAddWishCard) portalAddWishCard.style.display = 'none';
      alert('✓ Blessing added to guestbook!');
    });
  }

  // Portal Edit Wish Cancel & Save Handlers
  const portalEditWishCard = document.getElementById('portalEditWishCard');
  const btnCancelEditWish = document.getElementById('btnCancelEditWish');
  const btnSaveEditWish = document.getElementById('btnSaveEditWish');
  const portalEditWishId = document.getElementById('portalEditWishId');
  const portalEditAuthor = document.getElementById('portalEditAuthor');
  const portalEditText = document.getElementById('portalEditText');

  if (btnCancelEditWish && portalEditWishCard) {
    btnCancelEditWish.addEventListener('click', () => {
      portalEditWishCard.style.display = 'none';
    });
  }

  if (btnSaveEditWish) {
    btnSaveEditWish.addEventListener('click', async () => {
      const id = portalEditWishId ? portalEditWishId.value : '';
      const author = portalEditAuthor ? portalEditAuthor.value.trim() : '';
      const text = portalEditText ? portalEditText.value.trim() : '';

      if (!id || !author || !text) {
        alert('Name and message cannot be empty.');
        return;
      }

      await updateWish(id, author, text);
      if (portalEditWishCard) portalEditWishCard.style.display = 'none';
      alert('✓ Blessing updated successfully!');
    });
  }

  loadWishes();

  /* ==========================================================================
     9. Copy Venue Address
     ========================================================================== */
  const btnCopyAddress = document.getElementById('btnCopyAddress');
  if (btnCopyAddress) {
    btnCopyAddress.addEventListener('click', () => {
      const address = 'Hotel Grand Guardian, Ratnapura, Sri Lanka';
      navigator.clipboard.writeText(address).then(() => {
        const orig = btnCopyAddress.innerHTML;
        btnCopyAddress.innerHTML = '✓ Address Copied';
        setTimeout(() => {
          btnCopyAddress.innerHTML = orig;
        }, 2200);
      });
    });
  }

  /* ==========================================================================
     10. Haute Couture Full-Screen Photo Lightbox Modal
     ========================================================================== */
  const photoLightbox = document.getElementById('photoLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  function openLightbox(src, caption) {
    if (!photoLightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption || 'Wedding Photograph';
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || '';
    }
    photoLightbox.classList.add('active');
    photoLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!photoLightbox) return;
    photoLightbox.classList.remove('active');
    photoLightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!photoLightbox.classList.contains('active') && lightboxImg) {
        lightboxImg.src = '';
      }
    }, 350);
  }

  // Bind Lightbox Trigger Handlers (Clicking photo or magnifying glass icon)
  document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // Don't intercept clicks on navigation links or form controls
      if (e.target.closest('a') || e.target.closest('button')) return;

      const src = trigger.getAttribute('data-lightbox') || trigger.querySelector('img')?.getAttribute('src');
      const caption = trigger.getAttribute('data-caption') || trigger.querySelector('img')?.getAttribute('alt') || '';
      if (src) {
        openLightbox(src, caption);
      }
    });
  });

  // Also directly support clicking on photo zoom hints anywhere
  document.querySelectorAll('.photo-zoom-hint').forEach(hint => {
    hint.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentTrigger = hint.closest('.lightbox-trigger');
      if (parentTrigger) {
        const src = parentTrigger.getAttribute('data-lightbox') || parentTrigger.querySelector('img')?.getAttribute('src');
        const caption = parentTrigger.getAttribute('data-caption') || parentTrigger.querySelector('img')?.getAttribute('alt') || '';
        if (src) openLightbox(src, caption);
      }
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && photoLightbox && photoLightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Finally, initialize Page Mode once all components and event handlers are loaded
  initPageGating();
});
