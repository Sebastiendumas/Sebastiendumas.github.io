document.addEventListener('DOMContentLoaded', () => {

  /* Apparition sections */
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: 0.12 }
  );
  document.querySelectorAll('.section.reveal').forEach(s => io.observe(s));

  /* Barres compétences */
  const barreObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.barre-fill').forEach(f => f.style.width = f.dataset.width + '%');
        barreObs.unobserve(e.target);
      }
    }), { threshold: 0.3 }
  );
  const barresEl = document.querySelector('.barres');
  if (barresEl) barreObs.observe(barresEl);

  /* Nav lien actif */
  const navLinks = document.querySelectorAll('.nav-link');
  const navObs   = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    }), { threshold: 0.4 }
  );
  document.querySelectorAll('main section[id]').forEach(s => navObs.observe(s));

  /* Scroll top */
  const btn = document.getElementById('scrollTop');
  if (btn) {
    window.addEventListener('scroll', () => btn.classList.toggle('visible', scrollY > 400));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ===== MODALES ===== */
  // Ouverture
  document.querySelectorAll('.btn-modal-open').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = 'modal-' + btn.dataset.modal;
      const modal = document.getElementById(id);
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Fermeture — bouton ×
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Fermeture — clic sur l'overlay
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Fermeture — touche Échap
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(modal => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  });

}); // fin DOMContentLoaded
