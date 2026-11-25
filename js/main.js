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
