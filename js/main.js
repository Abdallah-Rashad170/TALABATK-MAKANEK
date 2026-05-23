
// Particles
const particlesContainer = document.getElementById('particles');
for(let i=0;i<30;i++){
  const p=document.createElement('div');
  p.className='particle';
  p.style.cssText=`
    right:${Math.random()*100}%;
    animation-duration:${5+Math.random()*10}s;
    animation-delay:${Math.random()*10}s;
    width:${1+Math.random()*3}px;
    height:${1+Math.random()*3}px;
  `;
  particlesContainer.appendChild(p);
}

// Scroll fade-up
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible')}});
},{threshold:0.1});
document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));

// Counter animation
function animateCounter(el){
  const target=parseInt(el.dataset.target);
  let current=0;
  const step=target/60;
  const timer=setInterval(()=>{
    current+=step;
    if(current>=target){current=target;clearInterval(timer);}
    el.textContent=Math.floor(current);
  },25);
}
const counterObserver=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.count-up').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  });
},{threshold:0.5});
document.querySelector('.hero-stats')&&counterObserver.observe(document.querySelector('.hero-stats'));

// Services toggle
const serviceEmojis={
  '🍕':'🍕\nمطاعم وأكل\nأشهر مطاعم البلينا وجرجا',
  '💊':'💊\nصيدليات وأدوية\nنجيبلك دواؤك في دقائق',
  '🛒':'🛒\nسوبر ماركت\nمستلزماتك اليومية',
  '📦':'📦\nتوصيل طرود\nأرسل لأي مكان في المنطقة',
  '🌸':'🌸\nورد وهدايا\nفاجئ أحبائك'
};
function setActive(el,emoji){
  document.querySelectorAll('.service-item').forEach(i=>i.classList.remove('active'));
  el.classList.add('active');
  const div=document.getElementById('service-emoji');
  div.style.opacity='0';
  div.style.transform='scale(0.8)';
  setTimeout(()=>{
    const parts=serviceEmojis[emoji].split('\n');
    div.innerHTML=`${parts[0]}<br><div style="font-size:1.2rem;font-weight:700;margin-top:1rem">${parts[1]}</div><div style="font-size:0.9rem;color:var(--gray);margin-top:0.5rem">${parts[2]}</div>`;
    div.style.opacity='1';
    div.style.transform='scale(1)';
  },200);
}
document.getElementById('service-emoji').style.transition='all 0.3s ease';

// Navbar scroll
window.addEventListener('scroll',()=>{
  const nav=document.getElementById('navbar');
  if(window.scrollY>50){
    nav.style.background='rgba(15,23,42,0.97)';
    nav.style.borderBottomColor='rgba(255,107,0,0.25)';
  } else {
    nav.style.background='rgba(15,23,42,0.85)';
    nav.style.borderBottomColor='rgba(255,107,0,0.15)';
  }
});
