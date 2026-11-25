/* Animações de scroll (Intersection Observer), parallax e contadores */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  requestAnimationFrame(function(){document.querySelector('.hero__text').classList.add('hero-in');
    var h=document.querySelector('.hero__img');setTimeout(function(){h.classList.add('in')},200)});
  document.querySelectorAll('[data-stagger]').forEach(function(p){Array.prototype.forEach.call(p.children,function(c,i){c.style.setProperty('--i',i)})});
  function count(el){
    if(reduce)return;
    var to=parseFloat(el.dataset.count),dec=+el.dataset.dec||0,t0=performance.now();
    requestAnimationFrame(function s(t){var p=Math.min((t-t0)/1600,1),e=1-Math.pow(1-p,3);
      el.textContent=(to*e).toFixed(dec).replace('.',',');if(p<1)requestAnimationFrame(s)});
  }
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;
    e.target.classList.add('in');
    e.target.querySelectorAll('[data-count]').forEach(count);
    io.unobserve(e.target);
  })},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('[data-stagger],.reveal-img:not(.hero__img)').forEach(function(el){io.observe(el)});
  if(reduce)return;
  var items=[].slice.call(document.querySelectorAll('[data-parallax]')),ticking=false;
  function update(){items.forEach(function(img){
    var r=img.getBoundingClientRect(),k=parseFloat(img.dataset.parallax);
    if(r.bottom<0||r.top>innerHeight)return;
    img.style.transform='translateY('+((r.top+r.height/2-innerHeight/2)*k).toFixed(1)+'px) scale(1.12)';});ticking=false}
  addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});
  update();
})();
