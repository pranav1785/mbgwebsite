const root=document.documentElement;
const theme=document.querySelector('.theme-toggle');
const setTheme=t=>{root.dataset.theme=t;localStorage.setItem('theme',t);theme?.setAttribute('aria-pressed',String(t==='dark'));};
theme?.addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark'));
theme?.setAttribute('aria-pressed',String(root.dataset.theme==='dark'));

const menuButton=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('.mobile-nav');
menuButton?.addEventListener('click',()=>{const open=mobileNav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});

const pathData={
  recover:{kicker:'Signal recovery',heading:'Recover the waveform',copy:'Learning-assisted calibration reconstructs high-fidelity signals from a nonlinear photonic front end across changing power and sampling conditions.',href:'/research/photonic-adc/',label:'Read more ↗',image:'/assets/graph-photonic-architecture.png',alt:'Photonic time-stretch ADC architecture from Medha’s publication'},
  adapt:{kicker:'Channel adaptation',heading:'Adapt to the channel',copy:'Variable-momentum equalization and reinforcement-learning formulations respond to dispersion, carrier offset, and changing optical conditions.',href:'/research/',label:'View undergraduate research ↗',image:'/assets/graph-dsp-evm.png',alt:'EVM and convergence plots from Medha’s adaptive DSP report'},
  deploy:{kicker:'Embedded systems',heading:'Fit intelligence to hardware',copy:'Boot flows, flash protection, multicore loading, and edge inference make memory, latency, safety, and interfaces part of the algorithm.',href:'/experience/',label:'See engineering experience ↗',image:'/assets/graph-arista-gnn.png',alt:'Prediction results from a hardware-aware learning workflow'},
  coordinate:{kicker:'Network control',heading:'Coordinate the network',copy:'Client measurements, bandits, graph optimization, event detection, and safe reinforcement learning operate across fast and slow timescales.',href:'/projects/adaptive-wifi/',label:'Read more ↗',image:'/assets/graph-arista-topology.png',alt:'Access-point topology, interference graph, and channel coloring'}
};
const signalButtons=[...document.querySelectorAll('[data-signal]')];
signalButtons.forEach(button=>button.addEventListener('click',()=>{const item=pathData[button.dataset.signal];if(!item)return;signalButtons.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));});document.querySelector('#signal-kicker').textContent=item.kicker;document.querySelector('#signal-heading').textContent=item.heading;document.querySelector('#signal-copy').textContent=item.copy;const link=document.querySelector('#signal-link');link.href=item.href;link.textContent=item.label;const image=document.querySelector('#signal-image');image.src=item.image;image.alt=item.alt;}));

const filters=[...document.querySelectorAll('[data-filter]')];
const cards=[...document.querySelectorAll('[data-categories]')];
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>b.classList.toggle('active',b===button));const value=button.dataset.filter;cards.forEach(card=>card.hidden=value!=='all'&&!card.dataset.categories.split(' ').includes(value));}));

const path=location.pathname;
document.querySelectorAll('.desktop-nav a').forEach(a=>{if(path.startsWith(new URL(a.href).pathname))a.setAttribute('aria-current','page');});
