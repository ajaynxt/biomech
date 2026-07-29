const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
const WA="919929562585";
const images={
 lab:"https://images.pexels.com/photos/8438994/pexels-photo-8438994.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-8438994.jpg&fm=jpg",
 clinical:"https://images.pexels.com/photos/8439076/pexels-photo-8439076.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-8439076.jpg&fm=jpg",
 therapy:"https://images.pexels.com/photos/8439172/pexels-photo-8439172.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-8439172.jpg&fm=jpg",
 hand:"https://images.pexels.com/photos/6153065/pexels-photo-6153065.jpeg?cs=srgb&dl=pexels-cottonbro-6153065.jpg&fm=jpg",
 connected:"https://images.pexels.com/photos/7688763/pexels-photo-7688763.jpeg?cs=srgb&dl=pexels-yaroslav-shuraev-7688763.jpg&fm=jpg",
 human:"https://images.pexels.com/photos/6153743/pexels-photo-6153743.jpeg?cs=srgb&dl=pexels-cottonbro-6153743.jpg&fm=jpg",
 heart:"https://upload.wikimedia.org/wikipedia/commons/9/96/Human_Heart_%28NIH_BioArt_228_-_630867%29.png",
 artificialHeart:"https://upload.wikimedia.org/wikipedia/commons/3/39/Soft_Total_Artificial_Heart_sTAH.jpg"
};
const colors=[
 {name:"Clinical Blue",hex:"#2478ff"},{name:"Cyan Tech",hex:"#00b8d9"},{name:"Emerald Bio",hex:"#10b981"},
 {name:"Deep Violet",hex:"#7c3aed"},{name:"Surgical Red",hex:"#e34b5f"},{name:"Amber Lab",hex:"#e59a16"},
 {name:"Graphite",hex:"#53657d"},{name:"Platinum",hex:"#98a6b8"}
];
const textModes=[
 {name:"Innovation",k:"Next-Generation Biomechanical Innovation",t:"Advancing Human Potential.",s:"Through biomechanical innovation.",p:"A premium concept for prosthetics, medical robotics, artificial organs and rehabilitation technology."},
 {name:"Clinical",k:"Clinical Technology Platform",t:"Precision Systems for Better Care.",s:"Clear technology. Responsible communication.",p:"Present product use, fitting, support and clinical resources without exaggerated claims."},
 {name:"Human-Centered",k:"Designed Around Real Life",t:"Technology Built Around People.",s:"Comfort, control and confidence.",p:"A human-centred story for prosthetics, rehabilitation and long-term product support."},
 {name:"Research",k:"Evidence-Led Engineering",t:"Built Through Testing and Iteration.",s:"From research question to validated workflow.",p:"Explain the method, collaborators, limitations and next development milestone."},
 {name:"Product",k:"Modular Medical Technology",t:"Designed. Fitted. Supported.",s:"A complete product journey.",p:"Show capabilities, control, fit, maintenance and service in a clear commercial structure."},
 {name:"Corporate",k:"Healthcare Innovation Platform",t:"Engineering the Next Care Economy.",s:"For institutions, partners and investors.",p:"A structured corporate story connecting products, research, markets and partnerships."}
];
const styles=[
 {name:"Biomechanical Innovation",className:"style-heart",photo:images.lab,object:"",color:"#2478ff",text:0,position:"center"},
 {name:"Prosthetic Precision",className:"style-prosthetic",photo:images.human,object:"",color:"#00b8d9",text:4,position:"center"},
 {name:"Research Robotics",className:"style-lab",photo:images.lab,object:"",color:"#7c3aed",text:3,position:"center"},
 {name:"Clinical Robotics",className:"style-clinical",photo:images.clinical,object:"",color:"#10b981",text:1,position:"center"},
 {name:"Connected Control",className:"style-connected",photo:images.connected,object:"",color:"#e59a16",text:4,position:"center"},
 {name:"Human-Centered Bionics",className:"style-human",photo:images.human,object:"",color:"#e34b5f",text:2,position:"center"},
 {name:"Artificial Organ Research",className:"style-light",photo:images.artificialHeart,object:"",color:"#53657d",text:5,position:"center"}
];
const products=[
 {name:"NexaGrip Hand",k:"Upper-Limb System",t:"NexaGrip Modular Hand",d:"A concept multi-grip hand platform with configurable control, modular servicing and clinician-led fitting.",photo:images.human,f:["Multi-grip control","EMG input concept","App configuration","Serviceable modules","Fit adjustment","Training pathway"]},
 {name:"NexaStride",k:"Lower-Limb Mobility",t:"NexaStride Adaptive System",d:"A concept lower-limb product presentation focused on stability, gait support, fitting and rehabilitation.",photo:images.therapy,f:["Gait support","Clinical tuning","Activity profiles","Alignment process","Rehab plan","Service support"]},
 {name:"CardioForm",k:"Artificial Organ Research",t:"CardioForm Research Platform",d:"A concept page structure for artificial-organ research, biomaterials, test methods and collaboration.",photo:images.artificialHeart,f:["Research overview","Material studies","Bench testing","Monitoring concept","Partner programme","Publication library"]},
 {name:"Rehab Robotics",k:"Clinical Robotics",t:"NexaMotion Rehabilitation",d:"A concept robotic rehabilitation system page covering assessment, guided sessions, data and support.",photo:images.clinical,f:["Assessment tools","Guided therapy","Progress review","Safety workflow","Clinician training","Technical support"]}
];
let state={style:0,colorLocked:false,textLocked:false,fontLocked:false,auto:true},timer;

function hexToRgb(hex){hex=hex.replace("#","");const n=parseInt(hex,16);return[(n>>16)&255,(n>>8)&255,n&255].join(",")}
function setColor(hex){
 document.documentElement.style.setProperty("--accent",hex);
 document.documentElement.style.setProperty("--accent-rgb",hexToRgb(hex));
 $("#colorPicker").value=hex;
}
function setText(i){
 const x=textModes[i];
 $("#heroKicker").textContent=x.k;$("#heroTitle").textContent=x.t;$("#heroSubtitle").textContent=x.s;$("#heroText").textContent=x.p;
 $$("#textList button").forEach((b,n)=>b.classList.toggle("active",n===i));
}
function setStyle(i,user=false){
 state.style=(i+styles.length)%styles.length;
 const x=styles[state.style];
 document.body.className=x.className;
 $("#heroPhoto").style.backgroundImage=`url("${x.photo}")`;
 $("#heroPhoto").style.backgroundPosition=x.position;
 $("#heroObject").src=x.object;
 $("#heroObject").style.display=x.object?"block":"none";
 if(!state.colorLocked)setColor(x.color);
 if(!state.textLocked)setText(x.text);
 $("#styleName").textContent=`${String(state.style+1).padStart(2,"0")} · ${x.name}`;
 $$("#styleDots button").forEach((b,n)=>b.classList.toggle("active",n===state.style));
 $$("#styleList button").forEach((b,n)=>b.classList.toggle("active",n===state.style));
 if(user)restartAuto();
}
function restartAuto(){clearInterval(timer);if(state.auto)timer=setInterval(()=>setStyle(state.style+1),60000)}

styles.forEach((x,i)=>{
 const dot=document.createElement("button");dot.textContent=String(i+1).padStart(2,"0");dot.onclick=()=>setStyle(i,true);$("#styleDots").appendChild(dot);
 const b=document.createElement("button");b.textContent=x.name;b.onclick=()=>setStyle(i,true);$("#styleList").appendChild(b);
});
colors.forEach(c=>{
 const b=document.createElement("button");b.style.background=c.hex;b.setAttribute("aria-label",c.name);b.onclick=()=>setColor(c.hex);$("#colorList").appendChild(b);
});
textModes.forEach((x,i)=>{const b=document.createElement("button");b.textContent=x.name;b.onclick=()=>setText(i);$("#textList").appendChild(b)});

$("#previousStyle").onclick=()=>setStyle(state.style-1,true);
$("#nextStyle").onclick=()=>setStyle(state.style+1,true);
$("#autoToggle").onclick=e=>{state.auto=!state.auto;e.target.textContent=state.auto?"Pause Auto":"Play Auto";restartAuto()};
$("#customizerToggle").onclick=()=>$("#customizerPanel").classList.toggle("open");
$("#colorPicker").oninput=e=>setColor(e.target.value);
$("#colorSearch").onchange=e=>{
 const v=e.target.value.trim().toLowerCase();
 const found=colors.find(c=>c.name.toLowerCase().includes(v));
 if(found)setColor(found.hex);else if(/^#[0-9a-f]{6}$/i.test(v))setColor(v);
};
$("#lockColor").onclick=e=>{state.colorLocked=!state.colorLocked;e.target.classList.toggle("locked",state.colorLocked);e.target.textContent=state.colorLocked?"Color Locked":"Lock Color"};
$("#lockText").onclick=e=>{state.textLocked=!state.textLocked;e.target.classList.toggle("locked",state.textLocked);e.target.textContent=state.textLocked?"Text Locked":"Lock Text"};
$("#fontSelect").onchange=e=>document.documentElement.style.setProperty("--font",e.target.value);
$("#lockFont").onclick=e=>{state.fontLocked=!state.fontLocked;e.target.classList.toggle("locked",state.fontLocked);e.target.textContent=state.fontLocked?"Font Locked":"Lock Font"};
$("#themeToggle").onclick=e=>{const dark=document.documentElement.dataset.theme!=="dark";document.documentElement.dataset.theme=dark?"dark":"light";e.target.textContent=dark?"Light Mode":"Dark Mode"};
$("#menuButton").onclick=()=>{const n=$("#navLinks");n.classList.toggle("open");$("#menuButton").setAttribute("aria-expanded",n.classList.contains("open"))};
$$("#navLinks a").forEach(a=>a.onclick=()=>$("#navLinks").classList.remove("open"));

products.forEach((x,i)=>{const b=document.createElement("button");b.textContent=x.name;b.onclick=()=>setProduct(i);$("#productTabs").appendChild(b)});
function setProduct(i){
 const x=products[i];$("#productKicker").textContent=x.k;$("#productTitle").textContent=x.t;$("#productDescription").textContent=x.d;$("#productPhoto").src=x.photo;
 $("#productFeatures").innerHTML=x.f.map(v=>`<span>${v}</span>`).join("");
 $$("#productTabs button").forEach((b,n)=>b.classList.toggle("active",n===i));
}
setProduct(0);

$("#specButton").onclick=()=>$("#specModal").classList.add("open");
$("#modalClose").onclick=()=>$("#specModal").classList.remove("open");
$("#specModal").onclick=e=>{if(e.target.id==="specModal")e.currentTarget.classList.remove("open")};
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("#specModal").classList.remove("open")});

$("#contactForm").onsubmit=e=>{
 e.preventDefault();const f=new FormData(e.currentTarget);
 const msg=`Biomech website enquiry\nName: ${f.get("name")}\nOrganisation: ${f.get("organisation")}\nPhone: ${f.get("phone")}\nProject: ${f.get("project")}\nMessage: ${f.get("message")}`;
 window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,"_blank");
};

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
$$(".reveal").forEach(el=>observer.observe(el));

setStyle(0);restartAuto();