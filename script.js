document.addEventListener('DOMContentLoaded', () => {

  /* ---------- ヘッダー：スクロールで背景を付与 ---------- */
  const header = document.getElementById('header');
  const floatingCta = document.querySelector('.floating-cta');

  /* フッター／最終CTAが見えている間は、フローティングCTAを隠して重なりを防ぐ */
  let nearFooter = false;
  const footerWatchTargets = document.querySelectorAll('.final-cta, .site-footer');

  const updateFloatingCta = () => {
    const scrolled = window.scrollY > window.innerHeight * 0.6;
    floatingCta.classList.toggle('show', scrolled && !nearFooter);
  };

  if ('IntersectionObserver' in window && footerWatchTargets.length) {
    const footerObserver = new IntersectionObserver((entries) => {
      nearFooter = entries.some((entry) => entry.isIntersecting);
      updateFloatingCta();
    }, { threshold: 0.05 });
    footerWatchTargets.forEach((el) => footerObserver.observe(el));
  }

  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle('scrolled', scrolled);
    updateFloatingCta();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- スクロールリビールアニメーション ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------- FAQ アコーディオン ---------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-q');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach((el) => el.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  /* ---------- アンカーリンクのスムーススクロール（ヘッダー分オフセット） ---------- */
  const headerHeight = () => header.offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight() + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
