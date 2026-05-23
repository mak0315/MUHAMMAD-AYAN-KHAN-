/* MAK PORTFOLIO — main.js */
(function() {

  /* Cursor */
  const cur  = document.getElementById('cur');
  const ring = document.getElementById('ring');
  let cx=0,cy=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    cx = e.clientX; cy = e.clientY;
    cur.style.left = cx+'px'; cur.style.top = cy+'px';
  });
  (function tick(){
    rx += (cx-rx)*0.1; ry += (cy-ry)*0.1;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
    requestAnimationFrame(tick);
  })();
  document.querySelectorAll('a,button,.card,.stat-card,.photo-cell,.startup-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cur.classList.add('big'); ring.classList.add('big'); });
    el.addEventListener('mouseleave',()=>{ cur.classList.remove('big'); ring.classList.remove('big'); });
  });

  /* Card mouse-shine */
  document.querySelectorAll('.card').forEach(c=>{
    c.addEventListener('mousemove', e=>{
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
      c.style.setProperty('--my', ((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
    });
  });

  /* Nav scroll */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', ()=> nav.classList.toggle('scrolled', scrollY > 60));

  /* Mobile nav */
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  if (burger) burger.addEventListener('click', ()=> mobileNav.classList.add('open'));
  if (mobileClose) mobileClose.addEventListener('click', ()=> mobileNav.classList.remove('open'));
  if (mobileNav) mobileNav.querySelectorAll('a').forEach(a=> a.addEventListener('click',()=> mobileNav.classList.remove('open')));

  /* Scroll reveal */
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('on'); });
  },{threshold:0.08});
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.stagger').forEach(el=>io.observe(el));

  /* Skill bars */
  const skillIo = new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(e.isIntersecting){
        e.target.querySelectorAll('.skill-item__fill').forEach(f=> f.classList.add('animated'));
      }
    });
  },{threshold:0.3});
  const sg = document.getElementById('skillGrid');
  if(sg) skillIo.observe(sg);

  /* Counter animation */
  function animCount(el, target, suffix){
    const dur=1800, t0=Date.now();
    (function f(){
      const p = Math.min((Date.now()-t0)/dur,1);
      const ease = 1-Math.pow(1-p,3);
      el.textContent = Math.round(ease*target)+suffix;
      if(p<1) requestAnimationFrame(f);
    })();
  }
  const cntIo = new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(!e.isIntersecting || e.target._counted) return;
      e.target._counted = true;
      const el = e.target.querySelector('.stat-card__num');
      if(!el) return;
      const raw = el.textContent, val = parseInt(raw), suf = raw.replace(/\d/g,'');
      animCount(el, val, suf);
    });
  },{threshold:0.5});
  document.querySelectorAll('.stat-card').forEach(c=> cntIo.observe(c));

})();
