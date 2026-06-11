const canvas=document.querySelector("#starfield"),ctx=canvas.getContext("2d");let stars=[],w=0,h=0,dpr=1;
function resize(){dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+"px";canvas.style.height=h+"px";ctx.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:Math.min(150,Math.floor(w*h/9000))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.3+.25,v:Math.random()*.13+.025,a:Math.random()*.65+.15}))}
function draw(){ctx.clearRect(0,0,w,h);for(const s of stars){s.y-=s.v;if(s.y<-2){s.y=h+2;s.x=Math.random()*w}ctx.beginPath();ctx.fillStyle=`rgba(255,255,255,${s.a})`;ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)}
resize();draw();addEventListener("resize",resize);
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
const glow=document.querySelector(".cursor-glow"),stage=document.querySelector("[data-depth-stage]"),cards=document.querySelectorAll(".depth-card");
addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";if(!stage||innerWidth<800)return;const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;cards.forEach(card=>{const d=Number(card.dataset.depth||10);card.style.translate=`${x*d}px ${y*d}px`})});
document.querySelector("#year").textContent=new Date().getFullYear();
