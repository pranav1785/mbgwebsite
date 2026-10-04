const root=document.documentElement;
const themeButton=document.querySelector('.theme-toggle');
function setTheme(theme){root.dataset.theme=theme;localStorage.setItem('theme',theme);themeButton?.setAttribute('aria-pressed',String(theme==='dark'));document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#0d1220':'#f7f3e8')}
themeButton?.addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark'));
setTheme(root.dataset.theme||'light');

const menuButton=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('.mobile-nav');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));mobileNav?.classList.toggle('is-open',open)});

const layers={
  physical:{number:'01',title:'Recovering more information from imperfect hardware',body:'Model non-ideal photonic sampling systems and use calibrated learning to reconstruct high-fidelity signals beyond conventional correction limits.',methods:'Signal modelling · calibration · neural inference',work:'Photonic ADC Signal Recovery',href:'/projects/photonic-adc/'},
  link:{number:'02',title:'Links that learn while conditions change',body:'Build adaptive equalizers and decision systems that respond to drift, interference, and changing channel conditions without losing efficiency.',methods:'VM-CMA · LMS · bandits · change detection',work:'Adaptive DSP Equalization · Arista Wi-Fi',href:'/projects/adaptive-dsp/'},
  edge:{number:'03',title:'Deploying intelligence inside real constraints',body:'Translate useful models into embedded systems where latency, memory, power, safety, and the boot path are part of the design—not afterthoughts.',methods:'Embedded C · CNNs · hardware-aware deployment',work:'Texas Instruments · EdgeAI fault detection',href:'/experience/'},
  network:{number:'04',title:'Understanding behavior at network scale',body:'Measure coverage, simulate traffic, and reason about resource allocation across systems where individual links shape collective performance.',methods:'Packet analysis · simulation · graph methods',work:'Wi-Fi Coverage · Traffic Simulator',href:'/projects/network-systems/'}
};
const tabs=[...document.querySelectorAll('[data-layer]')];
const panel=document.querySelector('.layer-panel');
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>{tabs.forEach(t=>t.setAttribute('aria-selected','false'));tab.setAttribute('aria-selected','true');const d=layers[tab.dataset.layer];panel.querySelector('.panel-label span').textContent=d.number;panel.querySelector('h3').textContent=d.title;panel.querySelector('p:not(.panel-label)').textContent=d.body;const dd=panel.querySelectorAll('dd');dd[0].textContent=d.methods;dd[1].textContent=d.work;panel.querySelector('a').href=d.href});tab.addEventListener('keydown',e=>{if(!['ArrowDown','ArrowRight','ArrowUp','ArrowLeft'].includes(e.key))return;e.preventDefault();const next=(index+(['ArrowDown','ArrowRight'].includes(e.key)?1:-1)+tabs.length)%tabs.length;tabs[next].focus();tabs[next].click()})});

const filterButtons=[...document.querySelectorAll('[data-filter]')];
const filterCards=[...document.querySelectorAll('[data-categories]')];
filterButtons.forEach(button=>button.addEventListener('click',()=>{filterButtons.forEach(b=>b.classList.remove('active'));button.classList.add('active');const filter=button.dataset.filter;filterCards.forEach(card=>card.classList.toggle('is-hidden',filter!=='all'&&!card.dataset.categories.split(' ').includes(filter)))}));
