const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
const colors=[
 {name:"Clinical Blue",hex:"#2f7cff"},{name:"Cyan Tech",hex:"#00b8d9"},{name:"Emerald Bio",hex:"#10b981"},
 {name:"Deep Violet",hex:"#7c3aed"},{name:"Surgical Red",hex:"#e34b5f"},{name:"Graphite",hex:"#475569"},{name:"Platinum",hex:"#94a3b8"}
];
const texts=[
 {name:"Clinical & Professional",k:"Clinical Bioengineering",t:"Precision systems for better care pathways.",p:"Clinical collaboration, modular engineering and responsible product communication."},
 {name:"Futuristic & Premium",k:"Future Human Systems",t:"Engineering the next generation of human capability.",p:"Advanced biomechanical platforms designed where medicine, robotics and intelligent materials meet."},
 {name:"Research Driven",k:"Research-Led Innovation",t:"Built through evidence, testing and iteration.",p:"From early concepts to validated workflows, every stage is explained with clarity."},
 {name:"Human-Centered Care",k:"Designed Around People",t:"Technology that supports movement, confidence and independence.",p:"Human outcomes shape every engineering decision, fitting journey and support process."},
 {name:"Product Focused",k:"Modular Product Systems",t:"Designed. Tested. Serviceable.",p:"A clear product story covering use case, components, maintenance and support."},
 {name:"Innovation First",k:"Biomechanics Reimagined",t:"Turning complex science into practical systems.",p:"Robotics, sensing, biomaterials and connected care brought together in one platform."},
 {name:"Corporate & Investor",k:"Healthcare Technology Platform",t:"Scalable innovation for modern healthcare markets.",p:"A structured story for partners, investors, institutions and clinical collaborators."}
];
const styles=[
 {name:"Clinical Light",cls:"style-clinical",accent:"#2f7cff",text:0},
 {name:"Dark Futuristic",cls:"style-research",accent:"#00b8d9",text:1},
 {name:"Premium Robotics",cls:"style-premium",accent:"#d4a017",text:4},
 {name:"Research Lab",cls:"style-research",accent:"#7c3aed",text:2},
 {name:"Prosthetics Focus",cls:"style-product",accent:"#10b981",text:3},
 {name:"Bioengineering",cls:"style-human",accent:"#e34b5f",text:5},
 {name:"Corporate MedTech",cls:"style-corporate",accent:"#475569",text:6}
];
let state={style:0,colorLock:false,textLock:false,fontLock:false,auto:true},timer;
function rgb(hex){hex=hex.replace("#","");const n=parseInt(hex,16);return[(n>>16)&255,(n>>8)&255,n&255].join(",")}
function setColor(hex){document.documentElement.style.setProperty("--accent",hex);document.documentElement.style.setProperty("--accent-rgb",rgb(hex));$("#colorPicker").value=hex}
function setText(i){const x=texts[i];$("#heroKicker").textContent=x.k;$("#heroTitle").textContent=x.t;$("#heroText").textContent=x.p;$$(".text-options button").forEach((b,n)=>b.classList.toggle("locked",n===i))}
function setStyle(i,user=false){state.style=(i+styles.length)%styles.length;const s=styles[state.style];document.body.className=s.cls;if(!state.colorLock)setColor(s.accent);if(!state.textLock)setText(s.text);$("#styleLabel").textContent=`${String(state.style+1).padStart(2,"0")} · ${s.name}`;$$("#styleButtons button").forEach((b,n)=>b.classList.toggle("active",n===state.style));if(user)restart()}
styles.forEach((s,i)=>{const b=document.createElement("button");b.textContent=String(i+1).padStart(2,"0");b.onclick=()=>setStyle(i,true);$("#styleButtons").appendChild(b)});
colors.forEach(c=>{const b=document.createElement("button");b.className="chip";b.innerHTML=`<i style="background:${c.hex}"></i>${c.name}`;b.onclick=()=>setColor(c.hex);$("#colorList").appendChild(b)});
texts.forEach((t,i)=>{const b=document.createElement("button");b.textContent=t.name;b.onclick=()=>setText(i);$("#textList").appendChild(b)});
function restart(){clearInterval(timer);if(state.auto)timer=setInterval(()=>setStyle(state.style+1),60000)}
$("#prevStyle").onclick=()=>setStyle(state.style-1,true);$("#nextStyle").onclick=()=>setStyle(state.style+1,true);
$("#dockToggle").onclick=()=>$("#dockPanel").classList.toggle("open");
$("#colorPicker").oninput=e=>setColor(e.target.value);
$("#colorSearch").onchange=e=>{const v=e.target.value.trim().toLowerCase();const hit=colors.find(c=>c.name.toLowerCase().includes(v));if(hit)setColor(hit.hex);else if(/^#[0-9a-f]{6}$/i.test(v))setColor(v)};
$("#lockColor").onclick=e=>{state.colorLock=!state.colorLock;e.target.classList.toggle("locked",state.colorLock);e.target.textContent=state.colorLock?"Color Locked":"Lock Color"};
$("#lockText").onclick=e=>{state.textLock=!state.textLock;e.target.classList.toggle("locked",state.textLock);e.target.textContent=state.textLock?"Text Locked":"Lock Text"};
$("#fontSelect").onchange=e=>document.documentElement.style.setProperty("--font",e.target.value);
$("#lockFont").onclick=e=>{state.fontLock=!state.fontLock;e.target.classList.toggle("locked",state.fontLock);e.target.textContent=state.fontLock?"Font Locked":"Lock Font"};
$("#modeToggle").onclick=e=>{const dark=document.documentElement.dataset.mode!=="dark";document.documentElement.dataset.mode=dark?"dark":"light";e.target.textContent=dark?"Light Mode":"Dark Mode"};
$("#autoToggle").onclick=e=>{state.auto=!state.auto;e.target.textContent=state.auto?"Pause Auto":"Play Auto";restart()};
$("#menuToggle").onclick=()=>$("#navLinks").classList.toggle("open");
$$("#navLinks a").forEach(a=>a.onclick=()=>$("#navLinks").classList.remove("open"));
$("#contactForm").onsubmit=e=>{e.preventDefault();const f=new FormData(e.currentTarget);const msg=`Biomech website enquiry\nName: ${f.get("name")}\nOrganisation: ${f.get("company")}\nPhone: ${f.get("phone")}\nInterest: ${f.get("interest")}\nMessage: ${f.get("message")}`;window.open(`https://wa.me/919929562585?text=${encodeURIComponent(msg)}`,"_blank")};
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)x.target.classList.add("visible")}),{threshold:.12});$$(".reveal").forEach(x=>io.observe(x));
setStyle(0);restart();