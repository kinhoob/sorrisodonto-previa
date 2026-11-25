/* Tema claro/escuro com persistência (localStorage) */
(function(){
  var root=document.documentElement,btn=document.getElementById('themeBtn');
  function set(t,save){root.dataset.theme=t;btn.setAttribute('aria-pressed',t==='dark');
    var m=document.querySelector('meta[name=theme-color]');if(m)m.content=t==='dark'?'#101719':'#159EAE';
    if(save){try{localStorage.setItem('so-theme',t)}catch(e){}}}
  set(root.dataset.theme||'light',false);
  btn.addEventListener('click',function(){
    root.classList.add('theme-fade');
    set(root.dataset.theme==='dark'?'light':'dark',true);
    setTimeout(function(){root.classList.remove('theme-fade')},600);
  });
})();
