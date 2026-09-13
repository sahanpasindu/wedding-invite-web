/**
 * Anu & Nirmal Luxury Wedding Invitation Web
 * JavaScript Controller, Animation Engine & Interactive Systems
 */

document.addEventListener('DOMContentLoaded', () => {
  // Target Wedding Date: November 5, 2026, 09:30:00 (Sri Lanka Time GMT+5:30)
  const weddingDate = new Date('2026-11-05T09:30:00+05:30').getTime();

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
    const count = window.innerWidth < 600 ? 32 : 55;

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
        this.y = init ? Math.random() * height : -25;
        this.size = Math.random() * 5 + 3.2;
        this.speedY = Math.random() * 0.75 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.45;
        
        // 3D rotation parameters
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.032;
        this.pitch = Math.random() * Math.PI;
        this.pitchSpeed = Math.random() * 0.038 + 0.018;

        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.025 + 0.01;
        this.opacity = Math.random() * 0.55 + 0.35;
        this.type = Math.random() > 0.45 ? 'gold' : 'petal';
      }

      update() {
        this.y += this.speedY;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.6 + this.speedX;

        // Subtle reaction to touch/mouse wind gust
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += (dx / (dist || 1)) * force * 3;
          this.y += (dy / (dist || 1)) * force * 1.5;
        }

        this.rotation += this.rotSpeed;
        this.pitch += this.pitchSpeed;

        if (this.y > height + 25) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        const flip = Math.cos(this.pitch);
        ctx.scale(1, flip);

        if (this.type === 'gold') {
          // Shimmering metallic gold leaf flake
          const grad = ctx.createLinearGradient(-this.size, -this.size, this.size, this.size);
          grad.addColorStop(0, '#FFE8B0');
          grad.addColorStop(0.4, '#D4B680');
          grad.addColorStop(0.8, '#BA955A');
          grad.addColorStop(1, '#8E6A2E');

          ctx.fillStyle = grad;
          ctx.globalAlpha = Math.max(0.1, Math.abs(flip) * this.opacity);
          ctx.beginPath();
          ctx.moveTo(0, -this.size * 0.9);
          ctx.lineTo(this.size * 0.8, -this.size * 0.2);
          ctx.lineTo(this.size * 0.5, this.size * 0.9);
          ctx.lineTo(-this.size * 0.6, this.size * 0.7);
          ctx.lineTo(-this.size * 0.8, -this.size * 0.4);
          ctx.closePath();
          ctx.fill();
        } else {
          // Soft romantic champagne/ivory rose petal
          const petalGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, this.size * 1.3);
          petalGrad.addColorStop(0, 'rgba(255, 252, 245, 0.9)');
          petalGrad.addColorStop(0.6, 'rgba(240, 226, 206, 0.75)');
          petalGrad.addColorStop(1, 'rgba(215, 185, 140, 0.5)');

          ctx.fillStyle = petalGrad;
          ctx.globalAlpha = Math.max(0.12, Math.abs(flip) * (this.opacity * 0.85));
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 1.1, this.size * 0.65, Math.PI / 4, 0, Math.PI * 2);
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
     4. Initial Viewport Reveal & Ambient Music Start
     ========================================================================== */
  // Reveal elements in initial viewport on page load
  setTimeout(() => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('active');
      }
    });
  }, 100);

  // Gentle audio start on first user interaction anywhere on the screen
  const startMusicOnFirstInteraction = () => {
    if (!isMusicPlaying) {
      playWeddingMusic();
    }
  };
  document.addEventListener('click', startMusicOnFirstInteraction, { once: true });
  document.addEventListener('touchstart', startMusicOnFirstInteraction, { once: true, passive: true });

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
    start: '20261105T040000Z', // 09:30 SLT in UTC
    end: '20261105T100000Z',   // 15:30 SLT in UTC
    location: 'Hotel Grand Guardian, Ratnapura, Sri Lanka',
    description: 'We joyfully invite you to celebrate our wedding day. Hotel Grand Guardian, Ratnapura. Anu & Nirmal.'
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
     7. Dynamic Personalized Guest Invitation Engine
     ========================================================================== */
  const urlParams = new URLSearchParams(window.location.search);
  const rawGuestName = urlParams.get('to') || urlParams.get('name') || urlParams.get('guest');
  const rawScope = urlParams.get('invite') || urlParams.get('with') || '';

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
  const heroGuestName = document.getElementById('heroGuestName');
  const heroGuestScope = document.getElementById('heroGuestScope');

  if (rawGuestName) {
    const cleanName = rawGuestName.trim();
    const scopeText = getScopeLabel(rawScope);

    if (envelopeGuestName) envelopeGuestName.textContent = cleanName;
    if (envelopeGuestScope) envelopeGuestScope.textContent = scopeText;
    if (heroGuestName) heroGuestName.textContent = cleanName;
    if (heroGuestScope) heroGuestScope.textContent = scopeText;
  }

  /* ==========================================================================
     8A. Couple Tool: Personalized Guest Link Generator Logic
     ========================================================================== */
  const genGuestNameInput = document.getElementById('genGuestName');
  const genInviteScopeSelect = document.getElementById('genInviteScope');
  const genLinkInput = document.getElementById('genLinkInput');
  const copySuccessNote = document.getElementById('copySuccessNote');
  const btnCopyGeneratedLink = document.getElementById('btnCopyGeneratedLink');
  const btnShareWhatsAppGuest = document.getElementById('btnShareWhatsAppGuest');
  const btnPreviewGeneratedLink = document.getElementById('btnPreviewGeneratedLink');

  function getCleanBaseUrl() {
    // The live hosted website domain
    const LIVE_HOSTED_URL = 'http://anu-nirmal.site.je/';

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

  function generateInvitationMessage(guestName, scopeText, linkUrl) {
    return `💍 *Wedding Invitation: Anu & Nirmal*\n\n` +
           `Dear ${guestName},\n` +
           `We joyfully invite *${scopeText}* to celebrate our wedding union on Thursday, November 5, 2026 at Hotel Grand Guardian, Ratnapura.\n\n` +
           `Kindly open your personalized wedding invitation card here:\n${linkUrl}\n\n` +
           `With warm love,\n` +
           `Anu & Nirmal`;
  }

  function updateGeneratedLink() {
    if (!genLinkInput) return '';
    const name = genGuestNameInput ? genGuestNameInput.value.trim() : '';
    const scope = genInviteScopeSelect ? genInviteScopeSelect.value : 'family';
    const scopeText = genInviteScopeSelect ? genInviteScopeSelect.options[genInviteScopeSelect.selectedIndex].text : 'You & Your Family';
    const baseUrl = getCleanBaseUrl();

    // If no name entered, generate a clear live template preview
    const effectiveName = name || 'Uncle Bandara & Family';
    const fullUrl = `${baseUrl}?to=${encodeURIComponent(effectiveName)}&invite=${encodeURIComponent(scope)}`;

    genLinkInput.value = fullUrl;

    if (btnPreviewGeneratedLink) {
      btnPreviewGeneratedLink.href = fullUrl;
    }

    // Update WhatsApp link immediately so clicking it works natively
    if (btnShareWhatsAppGuest) {
      const msg = generateInvitationMessage(name || effectiveName, scopeText, fullUrl);
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
      btnShareWhatsAppGuest.setAttribute('href', waUrl);
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

  // Bind live updates
  if (genGuestNameInput) {
    genGuestNameInput.addEventListener('input', updateGeneratedLink);
    genGuestNameInput.addEventListener('change', updateGeneratedLink);
    genGuestNameInput.addEventListener('keyup', updateGeneratedLink);
  }
  if (genInviteScopeSelect) {
    genInviteScopeSelect.addEventListener('change', updateGeneratedLink);
  }

  // Clicking on the readonly input selects all text for easy manual copy if desired
  if (genLinkInput) {
    genLinkInput.addEventListener('click', () => {
      genLinkInput.select();
      genLinkInput.setSelectionRange(0, 99999);
    });
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
     9. Wishes Guestbook & File-Based Storage (Zero Database Required)
     ========================================================================== */
  const wishForm = document.getElementById('wishForm');
  const wishesContainer = document.getElementById('wishesContainer');

  const defaultWishes = [
    {
      id: 'wish_1',
      author: 'Uncle Sunimal & Family',
      time: 'Nov 2026',
      text: 'Warmest congratulations to dearest Anu and Nirmal! Counting down the days to celebrate at Hotel Grand Guardian.'
    },
    {
      id: 'wish_2',
      author: 'Chathura & Kaveesha',
      time: 'Nov 2026',
      text: 'May your journey together be blessed with endless happiness, love, and laughter. See you on Nov 5th!'
    },
    {
      id: 'wish_3',
      author: 'Dilani Perera',
      time: 'Nov 2026',
      text: 'Such an elegant couple! Wishing you both a lifetime of togetherness and joy.'
    }
  ];

  let currentWishes = [];

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  async function loadWishes() {
    try {
      const res = await fetch('api/wishes.php', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.status === 'success' && Array.isArray(data.wishes) && data.wishes.length > 0) {
          currentWishes = data.wishes;
          localStorage.setItem('anu_nirmal_wishes', JSON.stringify(currentWishes));
          renderWishes();
          return;
        }
      }
    } catch (err) {
      console.warn('api/wishes.php offline, falling back to local store:', err);
    }

    try {
      currentWishes = JSON.parse(localStorage.getItem('anu_nirmal_wishes') || '[]');
    } catch (e) {
      currentWishes = [];
    }
    if (currentWishes.length === 0) {
      currentWishes = defaultWishes;
    }
    renderWishes();
  }

  function renderWishes() {
    if (!wishesContainer) return;
    wishesContainer.innerHTML = '';

    if (currentWishes.length === 0) {
      wishesContainer.innerHTML = '<div style="text-align:center; padding: 22px; color: var(--text-muted); font-size: 0.88rem;">No wishes added yet. Be the first to bless the couple!</div>';
      return;
    }

    currentWishes.forEach(item => {
      const div = document.createElement('div');
      div.className = 'wish-item';
      div.id = `wish-${item.id}`;

      const deleteBtnHtml = isCoupleMode
        ? `<button type="button" class="btn-delete-wish" data-id="${escapeHtml(item.id)}" title="Delete this wish">✕ Remove</button>`
        : '';

      div.innerHTML = `
        <div class="wish-meta">
          <span class="wish-author">${escapeHtml(item.author)}</span>
          <div class="wish-right-meta">
            <span class="wish-time">${escapeHtml(item.time || '')}</span>
            ${deleteBtnHtml}
          </div>
        </div>
        <div class="wish-text">“${escapeHtml(item.text)}”</div>
      `;
      wishesContainer.appendChild(div);
    });

    // Bind wish delete handlers when in couple mode
    if (isCoupleMode) {
      document.querySelectorAll('.btn-delete-wish').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const wishId = btn.getAttribute('data-id');
          const wishItem = currentWishes.find(w => w.id === wishId);
          const authorName = wishItem ? wishItem.author : 'this guest';

          if (!confirm(`Are you sure you want to remove the wish from "${authorName}"?`)) {
            return;
          }

          // Try deleting via server JSON file
          try {
            await fetch('api/wishes.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'delete', id: wishId })
            });
          } catch (err) {
            console.warn('API delete offline, removing from local store');
          }

          currentWishes = currentWishes.filter(w => w.id !== wishId);
          localStorage.setItem('anu_nirmal_wishes', JSON.stringify(currentWishes));

          const el = document.getElementById(`wish-${wishId}`);
          if (el) {
            el.style.transition = 'all 0.3s ease';
            el.style.opacity = '0';
            el.style.transform = 'scale(0.92)';
            setTimeout(() => {
              renderWishes();
            }, 280);
          } else {
            renderWishes();
          }
        });
      });
    }
  }

  if (wishForm) {
    wishForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const author = document.getElementById('wishAuthor')?.value.trim();
      const text = document.getElementById('wishText')?.value.trim();

      if (!author || !text) {
        alert('Please write your name and a short blessing.');
        return;
      }

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
        console.warn('API offline, saving locally:', err);
      }

      currentWishes.unshift(newWish);
      localStorage.setItem('anu_nirmal_wishes', JSON.stringify(currentWishes));
      renderWishes();
      wishForm.reset();
      alert('Thank you for your heartfelt blessing!');
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
