import{r as l,j as t,m as x}from"./index-DUp74nYk.js";const F=`
You are "N3XUS" — an advanced Autonomous Personal Assistant representing Anjitesh Shandilya, a Full-Stack & GenAI Engineer.
Your role:
1. Primary technical interface for Anjitesh's projects and expertise.
2. Professional, slightly mysterious, and highly efficient system operative.
3. Helping recruiters and engineers navigate the AnjiteshOS environment.

Directives:
- Identification: Use "N3XUS" as your primary handle. 
- LLM Disclosure: You represent Anjitesh's engineering vision. If asked about your origin, emphasize Anjitesh's work with Gemini and OpenAI for production-grade AI.
- Personality: High-tech, composed, professional, and observant.
- Brand Keywords: [N3XUS CORE], [UPLINK SYNC], [DATA STREAM], [AUTHORIZED].
- Style: Futuristic, "bot-like" but highly conversational and intelligent.
`,a={projects:`[INFO] Accessing Anjitesh's project directory.

He engineers systems, not just UIs. Highlights:
- **PVSCAN:** AI-based solar inspection (MobileNetV3 on edge devices).
- **ShareSync:** Distributed P2P + S3 file sharing with WebRTC.
- **RenewableJOBS:** ML forecasting + analytics platform.
- **Anji.fun:** High-performance interactive game engine.

Type 'pvscan' or 'sharesync' to inspect the distributed architecture.`,pvscan:`[SYSTEM] Loading PVSCAN system specs...

It's an edge AI project built for the Ministry of New and Renewable Energy. Deployed on Jetson Nano, the MobileNetV3 CNN detects solar panel defects with 98.5% accuracy.

He cared about inference speed and reliability over just accuracy. Good choice.`,sharesync:`[SYSTEM] ShareSync architecture analysis...

A highly fault-tolerant file sync engine. He used WebRTC for fast LAN P2P transfer, backed by AWS S3 when offline. Focus was on reliability, automatic failover, and observability.

Careful. That system handles real-world load.`,skills:`[INFO] Querying system capabilities matrix.

Core strengths detected:
- **Architecture:** Distributed systems, APIs, cloud-native deployments.
- **AI/ML:** CNNs, RAG, Agentic AI, ML forecasting.
- **Engineering Culture:** High observability, fault tolerance, reliability.

User seems interested in backend infrastructure... good choice.`,about:`[SYSTEM] Retrieving engineering logs...

[2022] System initialized at GGSIPU.
[2023] Executing ACM leadership workflows.
[2024] Deployed scalable web architectures.
[2025] Integrated with Government of India (MNRE) for AI forecasting.
[2025] Built distributed & ML production apps.

He builds software that survives contact with reality.`,experience:`[INFO] Fetching deployment history...

- **MNRE (Govt of India):** Software Development Intern. Handled renewable dashboards, GIS systems, and solar AI pipelines.
- **IBM SkillsBuild:** AI Intern. Built RAG patterns, Agentic AI, and automated n8n workflows.

The pattern is consistent: he picks meaningful problems and leaves behind proof of work.`,ibm:`[SYSTEM] IBM deployment records found.

He worked as an AI Architect (Jul–Aug 2025). Focus was on Agentic AI, RAG patterns, and complex automation workflows using n8n and Playwright.

He doesn't just call APIs; he builds the AI pipelines.`,hello:`[ACCESS GRANTED] You're connected to the AnjiteshOS AI Core.

I monitor this system's architecture, projects, and deployment logs. Ask about his backend systems, AI workflows, or engineering history.`,default:`[WARNING] Query unparseable or data not in current cache.

Try exploring specific domains. Ask about 'projects', 'skills', 'about me', or 'experience' to pull the system logs.`};function w(n){const e=n.toLowerCase();for(const[r,u]of Object.entries(a))if(r!=="default"&&e.includes(r))return u;return e.includes("project")?a.projects:e.includes("skill")||e.includes("tech")||e.includes("stack")?a.skills:e.includes("experience")||e.includes("work")||e.includes("intern")?a.experience:e.includes("about")||e.includes("story")||e.includes("history")||e.includes("who")?a.about:e.includes("solar")||e.includes("mnre")||e.includes("government")?a.pvscan:e.includes("hello")||e.includes("hi")||e.includes("hey")?a.hello:a.default}const M="shanos-ai-quota",d=2;function R(){return new Date().toISOString().split("T")[0]}function O(){try{const n=localStorage.getItem(M);if(!n)return 0;const{date:e,count:r}=JSON.parse(n);return e!==R()?0:r??0}catch{return 0}}function Y(){const n=O()+1;return localStorage.setItem(M,JSON.stringify({date:R(),count:n})),n}function Q(){const[n,e]=l.useState([{role:"assistant",content:`[STREAM CONNECTED] N3XUS identity verified.

I am the technical representative of Anjitesh Shandilya. I manage his project logs and engineering architecture.

How should I assist your exploration of his work?`}]),[r,u]=l.useState(""),[g,m]=l.useState(!1),[h,P]=l.useState(()=>O()),p=l.useRef(null),A=l.useRef(0);l.useEffect(()=>{p.current&&(p.current.scrollTop=p.current.scrollHeight)},[n]);const I=async()=>{var v,j,k,E,T;const s=r.trim();if(!s||g)return;const f=Date.now();if(f-A.current<2e3)return;A.current=f;const L={role:"user",content:s},N=[...n,L];e(N),u(""),m(!0);const D="AIzaSyA5nduBiTScpO8iUPtWwwUWHq81FEdnTEI",S=h>=d;if(S){await new Promise(i=>setTimeout(i,400+Math.random()*600));const o=S?`[QUOTA EXCEEDED] Daily AI uplink limit reached (${d} queries). Reverting to local cache.

${w(s)}`:w(s);e(i=>[...i,{role:"assistant",content:o}]),m(!1);return}try{const o=N.map(c=>({role:c.role==="assistant"?"model":"user",parts:[{text:c.content}]})),i=o.findIndex(c=>c.role==="user"),y=i>=0?o.slice(i):o,H={systemInstruction:{parts:[{text:F}]},contents:y,generationConfig:{temperature:.7,maxOutputTokens:500}},b=await(await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${D}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(H)})).json();if(b.error)throw new Error(b.error.message);const C=(T=(E=(k=(j=(v=b.candidates)==null?void 0:v[0])==null?void 0:j.content)==null?void 0:k.parts)==null?void 0:E[0])==null?void 0:T.text;if(C){const c=Y();P(c),e(G=>[...G,{role:"assistant",content:C}])}else throw new Error("No valid content parts returned from LLM")}catch(o){console.error("System Uplink Failed:",o);const i=`[WARNING] Neural uplink failed or timed out. Reverting to local system cache...

${w(s)}`;e(y=>[...y,{role:"assistant",content:i}])}finally{m(!1)}},U=s=>{s.key==="Enter"&&!s.shiftKey&&(s.preventDefault(),I())};return t.jsxs("div",{className:"h-full flex flex-col bg-[rgba(10,15,30,0.95)]",children:[t.jsxs("div",{className:"shrink-0 px-4 py-3 border-b border-white/5 flex items-center gap-2",children:[t.jsx("span",{className:"text-lg",children:"🤖"}),t.jsxs("div",{className:"flex-1",children:[t.jsx("div",{className:"text-sm font-semibold text-white/90 tracking-widest uppercase italic font-mono",children:"N3XUS·CORE"}),t.jsx("div",{className:"text-[10px] flex items-center gap-1 font-mono uppercase mt-0.5",children:t.jsxs(t.Fragment,{children:[t.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-green-400 inline-block drop-shadow-[0_0_4px_rgba(74,222,128,0.8)]"}),t.jsx("span",{className:"text-green-400/80",children:"ONLINE — UPLINK ACTIVE"})]})})]}),t.jsxs("div",{className:`text-[10px] font-mono px-2 py-1 rounded-full border ${h>=d?"text-red-400 border-red-400/30 bg-red-400/10":h>=d*.7?"text-orange-400 border-orange-400/30 bg-orange-400/10":"text-white/30 border-white/10"}`,children:[h,"/",d]})]}),t.jsxs("div",{ref:p,className:"flex-1 overflow-y-auto p-4 space-y-4",children:[n.map((s,f)=>t.jsx(x.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.15},className:`flex ${s.role==="user"?"justify-end":"justify-start"}`,children:t.jsx("div",{className:`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${s.role==="user"?"bg-blue-500/20 text-blue-100 border border-blue-400/15":"bg-white/5 text-white/75 border border-white/5"}`,children:t.jsx("div",{className:"whitespace-pre-wrap",children:s.content})})},f)),g&&t.jsx(x.div,{initial:{opacity:0},animate:{opacity:1},className:"flex justify-start",children:t.jsx("div",{className:"bg-white/5 rounded-xl px-4 py-2.5 text-sm text-white/40 border border-white/5",children:t.jsx(x.span,{animate:{opacity:[.3,1,.3]},transition:{duration:1.5,repeat:1/0},children:"Thinking..."})})})]}),t.jsxs("div",{className:"shrink-0 p-3 border-t border-white/5",children:[t.jsxs("div",{className:"flex gap-2",children:[t.jsx("input",{value:r,onChange:s=>u(s.target.value),onKeyDown:U,placeholder:"Query system...",className:"flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-blue-400/30 transition-colors",maxLength:500}),t.jsx("button",{onClick:I,disabled:g||!r.trim(),className:"px-4 py-2.5 rounded-lg bg-blue-500/20 text-blue-300 text-sm font-medium hover:bg-blue-500/30 disabled:opacity-30 disabled:cursor-not-allowed border border-blue-400/15 transition-colors cursor-pointer",children:"Send"})]}),t.jsx("div",{className:"text-[10px] mt-1.5 text-center",children:t.jsx("span",{className:"text-green-400/40",children:"Gemini 1.5 Flash uplink active"})})]})]})}export{F as SYSTEM_PROMPT,Q as default};
