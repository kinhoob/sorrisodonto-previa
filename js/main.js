/* Header dinâmico e menu mobile */
(function(){
  var header=document.getElementById('header'),nav=document.getElementById('nav'),burger=document.getElementById('burger');
  document.documentElement.classList.add('js');
  function onScroll(){header.classList.toggle('is-scrolled',window.scrollY>24)}
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});
  function toggle(open){burger.setAttribute('aria-expanded',open);burger.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
    nav.classList.toggle('open',open);header.classList.toggle('menu-open',open);}
  burger.addEventListener('click',function(){toggle(burger.getAttribute('aria-expanded')!=='true')});
  nav.addEventListener('click',function(e){if(e.target.closest('a'))toggle(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')toggle(false)});
  window.addEventListener('resize',function(){if(innerWidth>900)toggle(false)});
  document.getElementById('year').textContent=new Date().getFullYear();
})();

/* Abas e comparador antes/depois */
(function(){
  var tabs=[].slice.call(document.querySelectorAll('.ba__tab'));
  function show(t){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;
    document.getElementById(x.getAttribute('aria-controls')).hidden=!on});}
  tabs.forEach(function(t,i){t.tabIndex=i?-1:0;t.addEventListener('click',function(){show(t)});
    t.addEventListener('keydown',function(e){var k=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(!k)return;
      var n=tabs[(i+k+tabs.length)%tabs.length];n.focus();show(n);e.preventDefault()})});
  [].forEach.call(document.querySelectorAll('[data-ba]'),function(c){
    var r=c.querySelector('.ba__range');
    r.addEventListener('input',function(){c.style.setProperty('--pos',r.value+'%')});
  });
})();

/* Demonstra o comparador uma vez ao aparecer */
(function(){
  var cs=[].slice.call(document.querySelectorAll('[data-ba]'));
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;io.unobserve(e.target);
    var c=e.target,r=c.querySelector('.ba__range'),t0=performance.now();c.classList.add('hint');
    (function s(t){var p=Math.min((t-t0)/1800,1),v=50+Math.sin(p*Math.PI*2)*28*(1-p*.3);
      c.style.setProperty('--pos',v+'%');r.value=v;if(p<1)requestAnimationFrame(s);else{c.style.setProperty('--pos','50%');r.value=50}})(t0);
  })},{threshold:.6});
  cs.forEach(function(c){io.observe(c)});
})();
