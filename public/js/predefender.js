(function(){
  var root=document.documentElement;
  function current(){return root.dataset.theme||'light';}
  function apply(theme,persist){
    root.dataset.theme=theme;root.style.colorScheme=theme;
    if(persist){try{localStorage.setItem('predefender-theme',theme);}catch(e){}}
    document.querySelectorAll('.pd-theme-toggle').forEach(function(button){var dark=theme==='dark';button.setAttribute('aria-label',dark?'Use light mode':'Use dark mode');button.setAttribute('aria-pressed',String(dark));var label=button.querySelector('.pd-theme-label');if(label){label.textContent=dark?'Light':'Dark';}});
  }
  apply(current(),false);
  document.querySelectorAll('.pd-theme-toggle').forEach(function(button){button.addEventListener('click',function(){apply(current()==='dark'?'light':'dark',true);if(document.querySelector('.pd-mermaid'))window.location.reload();});});
  document.querySelectorAll('.pd-menu-button').forEach(function(button){button.addEventListener('click',function(){var open=document.body.classList.toggle('menu-open');button.setAttribute('aria-expanded',String(open));});});
})();