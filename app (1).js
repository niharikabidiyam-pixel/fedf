/* =============================================================
   EduTrack — Attendance Management System
   app.js — All logic: Auth, Navigation, Content, CO Topics
============================================================= */

// ===================== CO-WISE DATA =====================
const coData = [
  {
    id: 'CO1',
    title: 'Foundations of Front-End Engineering & Framework Design',
    icon: '🏗️',
    color: 'co1',
    topics: [
      { id:'c1t1', name:'Problem frameworks solve', desc:'Imperative vs declarative UIs' },
      { id:'c1t2', name:'Engineering constraints of front-end systems', desc:'DOM limitations' },
      { id:'c1t3', name:'Virtual DOM as an engineering abstraction', desc:'Unidirectional data flow' },
      { id:'c1t4', name:'Component-driven thinking', desc:'Rendering pipeline' },
      { id:'c1t5', name:'Reconciliation (logic, not React.exe)', desc:'How frameworks abstract complexity' },
      { id:'c1t6', name:'Architectural concepts enabling React-like frameworks', desc:'Composition, immutability, reactive state' },
    ]
  },
  {
    id: 'CO2',
    title: 'JavaScript & TypeScript Engineering for Frameworks',
    icon: '⚙️',
    color: 'co2',
    topics: [
      { id:'c2t1', name:'ES6+ essentials for framework engineering', desc:'Closures as memory/state constructs' },
      { id:'c2t2', name:'Immutability and pure functions', desc:'Functional programming in UI' },
      { id:'c2t3', name:'Module patterns', desc:'Async/await and promise chains for UI updates' },
      { id:'c2t4', name:'Error boundaries at JS level', desc:'Runtime safety strategies' },
      { id:'c2t5', name:'TS types/interfaces/generics', desc:'Enforce UI correctness' },
      { id:'c2t6', name:'Architecture of a front-end codebase', desc:'Folder organization, modules, services' },
    ]
  },
  {
    id: 'CO3',
    title: 'React Component Model (Engineering View)',
    icon: '⚛️',
    color: 'co3',
    topics: [
      { id:'c3t1', name:'Component as deterministic UI function', desc:'Not syntax view' },
      { id:'c3t2', name:'Props as configuration contract', desc:'State as dynamic runtime data' },
      { id:'c3t3', name:'Side-effects as controlled event loops', desc:'React hooks as abstractions over lifecycle' },
      { id:'c3t4', name:'Reconciliation: how React decides to re-render', desc:'Controlled vs uncontrolled UI engineering' },
      { id:'c3t5', name:'Component composition patterns', desc:'Designing reusable components' },
      { id:'c3t6', name:'Styling approaches', desc:'CSS modules, styled frameworks, Tailwind' },
    ]
  },
  {
    id: 'CO4',
    title: 'State Architecture, Async Data Engineering & API Integration',
    icon: '🔗',
    color: 'co4',
    topics: [
      { id:'c4t1', name:'Lifting state; state co-location; derived state', desc:'Global state requirements' },
      { id:'c4t2', name:'React Context engineering rationale', desc:'API service layers' },
      { id:'c4t3', name:'Async flow control; race conditions', desc:'Stale state problems' },
      { id:'c4t4', name:'Data caching strategies', desc:'Skeleton UIs' },
      { id:'c4t5', name:'Architectural patterns', desc:'Container-presenter, smart-dumb components' },
      { id:'c4t6', name:'Error boundaries in React', desc:'Handling complex UI events and async sequencing' },
    ]
  },
  {
    id: 'CO5',
    title: 'Routing, Forms, Accessibility & Performance Engineering',
    icon: '🚦',
    color: 'co5',
    topics: [
      { id:'c5t1', name:'SPA routing fundamentals', desc:'Dynamic & nested routing' },
      { id:'c5t2', name:'Rendering boundaries; protected routes', desc:'Route-level code splitting' },
      { id:'c5t3', name:'Form engineering', desc:'Validation pipelines, controlled forms, error surfaces' },
      { id:'c5t4', name:'Accessibility engineering', desc:'ARIA, keyboard flow, color contrast' },
      { id:'c5t5', name:'Performance tuning', desc:'Virtualization, memoization, keying, batching renders, lazy loading' },
      { id:'c5t6', name:'Architectural tradeoffs in performance engineering', desc:'Profiling & optimization strategies' },
    ]
  },
  {
    id: 'CO6',
    title: 'Build Systems, Testing, CI/CD & Deployment Engineering',
    icon: '🚀',
    color: 'co6',
    topics: [
      { id:'c6t1', name:'Why bundlers exist; Vite/Webpack engineering flow', desc:'Bundling, tree-shaking, minification, asset optimization' },
      { id:'c6t2', name:'Environment configs; error reporting', desc:'Linting/formatting' },
      { id:'c6t3', name:'React testing (unit, integration)', desc:'Jest & RTL' },
      { id:'c6t4', name:'CI/CD pipeline design', desc:'Cloud deployment (Netlify/Vercel)' },
      { id:'c6t5', name:'Monitoring production', desc:'Performance evaluation through Lighthouse' },
      { id:'c6t6', name:'Engineering practices for maintainability and scalability', desc:'Code quality & team conventions' },
    ]
  }
];

// ===================== STATE STORE =====================
let state = {
  currentRole: 'admin',
  currentUser: null,
  users: [
    { id:1, name:'Dr. Admin',         email:'admin@edu.com',   password:'admin123',   role:'admin' },
    { id:2, name:'Prof. Ravi Kumar',  email:'ravi@edu.com',    password:'faculty123', role:'faculty', dept:'Computer Science', subject:'CO1 – Framework Design' },
    { id:3, name:'Prof. Meena Sharma',email:'meena@edu.com',   password:'faculty123', role:'faculty', dept:'Mathematics',       subject:'CO2 – JS/TS Engineering' },
    { id:4, name:'Arjun Reddy',       email:'arjun@edu.com',   password:'student123', role:'student', rollNo:'101', className:'CS-A' },
    { id:5, name:'Priya Nair',        email:'priya@edu.com',   password:'student123', role:'student', rollNo:'102', className:'CS-A' },
    { id:6, name:'Karthik Rao',       email:'karthik@edu.com', password:'student123', role:'student', rollNo:'103', className:'CS-A' },
  ],
  students: [
    { id:101, name:'Arjun Reddy',   rollNo:'101', className:'CS-A', email:'arjun@edu.com',   phone:'9876543210' },
    { id:102, name:'Priya Nair',    rollNo:'102', className:'CS-A', email:'priya@edu.com',   phone:'9876543211' },
    { id:103, name:'Karthik Rao',   rollNo:'103', className:'CS-A', email:'karthik@edu.com', phone:'9876543212' },
    { id:104, name:'Sneha Patel',   rollNo:'104', className:'CS-A', email:'sneha@edu.com',   phone:'9876543213' },
    { id:105, name:'Rahul Verma',   rollNo:'105', className:'CS-A', email:'rahul@edu.com',   phone:'9876543214' },
    { id:106, name:'Ananya Singh',  rollNo:'106', className:'CS-B', email:'ananya@edu.com',  phone:'9876543215' },
    { id:107, name:'Vikram Das',    rollNo:'107', className:'CS-B', email:'vikram@edu.com',  phone:'9876543216' },
    { id:108, name:'Divya Menon',   rollNo:'108', className:'ECE-A',email:'divya@edu.com',   phone:'9876543217' },
    { id:109, name:'Suresh Kumar',  rollNo:'109', className:'ECE-A',email:'suresh@edu.com',  phone:'9876543218' },
    { id:110, name:'Lakshmi Iyer',  rollNo:'110', className:'ME-A', email:'lakshmi@edu.com', phone:'9876543219' },
  ],
  faculties: [
    { id:1, name:'Prof. Ravi Kumar',   email:'ravi@edu.com',   dept:'Computer Science', subject:'CO1 – Framework Design' },
    { id:2, name:'Prof. Meena Sharma', email:'meena@edu.com',  dept:'Mathematics',       subject:'CO2 – JS/TS Engineering' },
    { id:3, name:'Dr. Sunil Reddy',    email:'sunil@edu.com',  dept:'Electronics',       subject:'CO3 – React Component Model' },
  ],
  attendanceRecords: {},
  subjects: ['CO1 – Framework Design','CO2 – JS/TS Engg','CO3 – React Model','CO4 – State & API','CO5 – Routing & Perf','CO6 – Build & Deploy'],
  classes: ['CS-A','CS-B','ECE-A','ME-A'],
  periods: ['Period 1','Period 2','Period 3','Period 4','Period 5','Period 6','Period 7','Period 8'],
  currentAttendance: {},
  // CO coverage tracking: topicId → { covered: bool, date, notes }
  topicCoverage: {},
};

// Seed some initial topic coverage
(function seedCoverage() {
  // CO1 all covered
  coData[0].topics.forEach(t => { state.topicCoverage[t.id] = { covered: true, date:'2025-06-01', notes:'Completed in lecture' }; });
  // CO2 partially covered
  coData[1].topics.slice(0,4).forEach(t => { state.topicCoverage[t.id] = { covered: true, date:'2025-06-08', notes:'Covered' }; });
  // CO3 partially
  coData[2].topics.slice(0,3).forEach(t => { state.topicCoverage[t.id] = { covered: true, date:'2025-06-10', notes:'Covered' }; });
  // CO4, CO5, CO6 not started
})();

// ===================== AUTH =====================
let selectedRole = 'admin';

function selectRole(el, role) {
  selectedRole = role;
  document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}
function showAlert(msg, type='error') {
  const b = document.getElementById('alertBox');
  b.innerHTML = `<div class="alert alert-${type}">${msg}</div>`;
  setTimeout(() => b.innerHTML = '', 3000);
}
function showRegister() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('regRole').addEventListener('change', function() {
    document.getElementById('regClassGroup').style.display = this.value==='student' ? 'block' : 'none';
  });
}
function showLogin() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
}
function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPassword').value;
  if (!email || !pass) { showAlert('Please fill in all fields'); return; }
  const user = state.users.find(u => u.email===email && u.password===pass && u.role===selectedRole);
  if (!user) { showAlert('Invalid credentials or role mismatch'); return; }
  state.currentUser = user;
  launchApp(user.role);
}
function handleRegister() {
  const name  = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const role  = document.getElementById('regRole').value;
  const pass  = document.getElementById('regPassword').value;
  if (!name||!email||!pass) { showAlert('Please fill all fields'); return; }
  if (state.users.find(u=>u.email===email)) { showAlert('Email already registered'); return; }
  const newUser = { id:Date.now(), name, email, password:pass, role };
  if (role==='student') {
    newUser.rollNo = document.getElementById('regClass').value || '000';
    newUser.className = 'CS-A';
    state.students.push({ id:Date.now(), name, rollNo:newUser.rollNo, className:'CS-A', email, phone:'' });
  }
  state.users.push(newUser);
  showAlert(`Account created! You can now sign in as ${role}.`, 'success');
  setTimeout(showLogin, 1500);
}
function handleLogout() {
  state.currentUser = null;
  document.getElementById('appWrap').classList.remove('active');
  document.getElementById('authWrap').style.display = 'flex';
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPassword').value = '';
}

// ===================== APP LAUNCH =====================
function launchApp(role) {
  document.getElementById('authWrap').style.display = 'none';
  document.getElementById('appWrap').classList.add('active');
  const u = state.currentUser;
  const initial = u.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  const colors  = { admin:'#7c3aed', faculty:'#0284c7', student:'#059669' };
  document.getElementById('sidebarAvatar').textContent = initial;
  document.getElementById('sidebarAvatar').style.background = colors[role]||'#2563eb';
  document.getElementById('sidebarName').textContent = u.name;
  document.getElementById('sidebarRole').textContent  = role.charAt(0).toUpperCase()+role.slice(1);
  buildNav(role);
  buildContent(role);
}

// ===================== NAVIGATION =====================
const navItems = {
  admin: [
    { icon:'📊', label:'Dashboard',         id:'dashboard' },
    { icon:'👥', label:'Students',           id:'students'  },
    { icon:'👨‍🏫', label:'Faculty',           id:'faculty'   },
    { icon:'📋', label:'Attendance Records', id:'records'   },
    { icon:'📚', label:'CO-wise Topics',     id:'cotopics'  },
    { icon:'📈', label:'Reports',            id:'reports'   },
  ],
  faculty: [
    { icon:'📊', label:'Dashboard',      id:'dashboard' },
    { icon:'✅', label:'Mark Attendance', id:'markatt'   },
    { icon:'📋', label:'My Records',     id:'records'   },
    { icon:'📚', label:'CO-wise Topics', id:'cotopics'  },
    { icon:'📈', label:'Class Report',   id:'reports'   },
  ],
  student: [
    { icon:'📊', label:'Dashboard',       id:'dashboard' },
    { icon:'📋', label:'My Attendance',   id:'myatt'     },
    { icon:'📚', label:'CO-wise Topics',  id:'cotopics'  },
    { icon:'📈', label:'My Report',       id:'reports'   },
  ],
};

function buildNav(role) {
  const nav = document.getElementById('sidebarNav');
  nav.innerHTML = '<div class="nav-label">Main Menu</div>';
  navItems[role].forEach((item, i) => {
    nav.innerHTML += `<div class="nav-item ${i===0?'active':''}" onclick="navigate('${item.id}',this)">
      <span class="nav-icon">${item.icon}</span>${item.label}
    </div>`;
  });
}
function navigate(id, el) {
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  const sec = document.getElementById('sec-'+id);
  if (sec) sec.classList.add('active');
}

// ===================== CONTENT BUILD =====================
function buildContent(role) {
  const main = document.getElementById('mainContent');
  if (role==='admin')   main.innerHTML = buildAdminContent();
  else if (role==='faculty') main.innerHTML = buildFacultyContent();
  else                  main.innerHTML = buildStudentContent();
  if (role==='faculty') initAttendance();
}

// ===================== CO TOPICS SECTION =====================
function buildCoTopicsSection(role) {
  const totalTopics  = coData.reduce((a,co)=>a+co.topics.length,0);
  const coveredCount = Object.values(state.topicCoverage).filter(t=>t.covered).length;
  const covPct = Math.round(coveredCount/totalTopics*100);

  const canEdit = (role==='admin'||role==='faculty');

  return `
  <section class="section" id="sec-cotopics">
    <div class="page-header">
      <h2>📚 CO-wise Topic Coverage</h2>
      <p>Front-End Engineering curriculum — CO1 through CO6 topic tracking</p>
    </div>

    <!-- Summary stats -->
    <div class="stat-grid" style="margin-bottom:24px">
      <div class="stat-card">
        <div class="stat-icon" style="background:#dbeafe">📚</div>
        <div class="stat-info"><p>Total Topics</p><h3>${totalTopics}</h3><small>Across 6 COs</small></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#dcfce7">✅</div>
        <div class="stat-info"><p>Topics Covered</p><h3>${coveredCount}</h3><small>${covPct}% complete</small></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#fee2e2">⏳</div>
        <div class="stat-info"><p>Pending Topics</p><h3>${totalTopics-coveredCount}</h3><small>To be covered</small></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:#f3e8ff">🎯</div>
        <div class="stat-info"><p>COs in Progress</p>
          <h3>${coData.filter(co=>{ const cov=co.topics.filter(t=>state.topicCoverage[t.id]?.covered).length; return cov>0&&cov<co.topics.length; }).length}</h3>
          <small>Out of 6 COs</small>
        </div>
      </div>
    </div>

    <!-- Overall progress bar -->
    <div class="co-progress-wrap" style="margin-bottom:24px">
      <h4>Overall Curriculum Progress — ${covPct}%</h4>
      <div class="progress-bar" style="height:14px;margin-bottom:20px">
        <div class="progress-fill" style="width:${covPct}%;background:linear-gradient(90deg,#2563eb,#7c3aed)"></div>
      </div>
      <h4 style="margin-bottom:12px">CO-wise Breakdown</h4>
      ${coData.map(co=>{
        const cov = co.topics.filter(t=>state.topicCoverage[t.id]?.covered).length;
        const pct = Math.round(cov/co.topics.length*100);
        const clr = ['#2563eb','#7c3aed','#0891b2','#d97706','#16a34a','#dc2626'][coData.indexOf(co)];
        return `<div class="co-progress-row">
          <span class="co-label" style="color:${clr}">${co.id}</span>
          <div class="co-bar-wrap">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${pct}%;background:${clr}"></div>
            </div>
          </div>
          <span class="co-pct" style="color:${clr}">${pct}%</span>
          <span class="badge" style="background:${clr}22;color:${clr};margin-left:8px">${cov}/${co.topics.length}</span>
        </div>`;
      }).join('')}
    </div>

    <!-- CO Tabs -->
    <div class="co-tabs" id="coTabsRow">
      ${coData.map((co,i)=>`
        <div class="co-tab ${i===0?'active':''}" data-co="${co.id}" onclick="switchCoTab('${co.id}',this)">${co.id}</div>
      `).join('')}
    </div>

    <!-- CO Panels -->
    ${coData.map((co,i)=>{
      const cov = co.topics.filter(t=>state.topicCoverage[t.id]?.covered).length;
      const pct = Math.round(cov/co.topics.length*100);
      return `
      <div class="co-panel ${i===0?'active':''}" id="copanel-${co.id}">
        <div class="co-header co-header-${co.color}">
          <div class="co-header-icon">${co.icon}</div>
          <div>
            <h3>${co.id}: ${co.title}</h3>
            <p>${cov} of ${co.topics.length} topics covered &nbsp;•&nbsp; ${pct}% complete</p>
          </div>
        </div>
        <div class="topic-grid">
          ${co.topics.map(t=>{
            const covered = state.topicCoverage[t.id]?.covered;
            const dateStr = state.topicCoverage[t.id]?.date || '';
            return `<div class="topic-card ${covered?'covered':'not-covered'}" id="tcard-${t.id}">
              <div class="topic-icon">${covered?'✅':'⏳'}</div>
              <div style="flex:1">
                <div class="topic-name">${t.name}</div>
                <div class="topic-meta">${t.desc}${dateStr?` &nbsp;•&nbsp; ${dateStr}`:''}</div>
                ${canEdit ? `<div style="margin-top:8px">
                  <button class="btn-sm" style="padding:4px 12px;font-size:11px;border-radius:6px;
                    background:${covered?'#fef2f2':'#f0fdf4'};color:${covered?'#dc2626':'#16a34a'};
                    border:1px solid ${covered?'#fecaca':'#bbf7d0'}"
                    onclick="toggleTopic('${t.id}','${co.id}')">
                    ${covered?'Mark Uncovered':'Mark Covered'}
                  </button>
                </div>` : ''}
              </div>
            </div>`;
          }).join('')}
        </div>
        ${canEdit ? `
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn-sm btn-green" onclick="markAllTopics('${co.id}',true)">✅ Mark All Covered</button>
          <button class="btn-sm btn-outline" onclick="markAllTopics('${co.id}',false)">⏳ Mark All Pending</button>
        </div>` : ''}
      </div>`;
    }).join('')}
  </section>`;
}

function switchCoTab(coId, el) {
  document.querySelectorAll('.co-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.co-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('copanel-'+coId).classList.add('active');
}

function toggleTopic(topicId, coId) {
  const cur = state.topicCoverage[topicId]?.covered;
  state.topicCoverage[topicId] = {
    covered: !cur,
    date: new Date().toISOString().split('T')[0],
    notes: 'Updated'
  };
  // Re-render the CO panel content
  refreshCoSection();
  showToast((!cur ? '✅ Topic marked as covered' : '⏳ Topic marked as pending'), !cur ? 'success' : '');
}

function markAllTopics(coId, coveredVal) {
  const co = coData.find(c=>c.id===coId);
  co.topics.forEach(t=>{
    state.topicCoverage[t.id] = { covered: coveredVal, date: new Date().toISOString().split('T')[0], notes:'Bulk update' };
  });
  refreshCoSection();
  showToast(coveredVal ? `✅ All ${coId} topics marked covered` : `⏳ All ${coId} topics marked pending`, coveredVal ? 'success' : '');
}

function refreshCoSection() {
  const role = state.currentUser.role;
  // Find the active CO tab before re-render
  const activeTab = document.querySelector('.co-tab.active')?.dataset?.co || 'CO1';
  const newSec = document.createElement('div');
  newSec.innerHTML = buildCoTopicsSection(role);
  const freshSec = newSec.querySelector('#sec-cotopics');

  const oldSec = document.getElementById('sec-cotopics');
  if (oldSec) {
    const wasActive = oldSec.classList.contains('active');
    oldSec.replaceWith(freshSec);
    if (wasActive) freshSec.classList.add('active');
    // Restore active tab
    const tabEl = freshSec.querySelector(`.co-tab[data-co="${activeTab}"]`);
    if (tabEl) switchCoTab(activeTab, tabEl);
  }
}

// ===================== ADMIN CONTENT =====================
function buildAdminContent() {
  const totalAtt = Object.values(state.attendanceRecords).reduce((a,r)=>a+r.length,0);
  return `
  <section class="section active" id="sec-dashboard">
    <div class="page-header"><h2>Admin Dashboard</h2><p>Welcome back, ${state.currentUser.name}. Here's your system overview.</p></div>
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-icon" style="background:#dbeafe">📚</div><div class="stat-info"><p>Total Students</p><h3>${state.students.length}</h3><small>↑ Active</small></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#dcfce7">👨‍🏫</div><div class="stat-info"><p>Faculty Members</p><h3>${state.faculties.length}</h3><small>↑ Active</small></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#fef9c3">📋</div><div class="stat-info"><p>Att. Sessions</p><h3>${totalAtt}</h3><small>This month</small></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#f3e8ff">🏫</div><div class="stat-info"><p>Classes</p><h3>${state.classes.length}</h3><small>Active</small></div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:16px">📢 Recent Activity</h3>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${[['Prof. Ravi Kumar marked CS-A attendance','2 hrs ago','🟢'],['New student Lakshmi Iyer enrolled','Today','🔵'],['CO1 topics fully covered','Yesterday','📚']].map(([a,b,c])=>`
          <div style="display:flex;align-items:center;gap:12px;padding:10px;background:var(--surface);border-radius:8px">
            <span style="font-size:18px">${c}</span>
            <div><p style="font-size:13px;font-weight:500">${a}</p><p style="font-size:12px;color:var(--text-light)">${b}</p></div>
          </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:16px">📊 Attendance by Class</h3>
        ${state.classes.map(c=>{
          const pct = Math.floor(Math.random()*20)+75;
          return `<div style="margin-bottom:14px">
            <div style="display:flex;justify-content:space-between;margin-bottom:5px">
              <span style="font-size:13px;font-weight:500">${c}</span>
              <span style="font-size:13px;font-weight:600;color:${pct>80?'var(--green)':'var(--orange)'}">${pct}%</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${pct>80?'var(--green)':'var(--orange)'}"></div></div>
          </div>`;
        }).join('')}
      </div>
    </div>
    <!-- CO Summary in Dashboard -->
    <div class="card" style="margin-top:20px">
      <h3 style="font-size:16px;font-weight:600;margin-bottom:16px">📚 CO-wise Curriculum Progress</h3>
      <div class="grid-3">
        ${coData.map(co=>{
          const cov = co.topics.filter(t=>state.topicCoverage[t.id]?.covered).length;
          const pct = Math.round(cov/co.topics.length*100);
          const clr = ['#2563eb','#7c3aed','#0891b2','#d97706','#16a34a','#dc2626'][coData.indexOf(co)];
          return `<div style="padding:14px;border:1.5px solid ${clr}22;border-radius:10px;background:${clr}08">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
              <span style="font-size:20px">${co.icon}</span>
              <span style="font-size:12px;font-weight:700;color:${clr}">${co.id}</span>
              <span class="badge" style="background:${clr}22;color:${clr};margin-left:auto">${pct}%</span>
            </div>
            <p style="font-size:11px;color:var(--text-mid);margin-bottom:6px;line-height:1.4">${co.title.split('&')[0].trim()}</p>
            <div class="progress-bar" style="height:5px"><div class="progress-fill" style="width:${pct}%;background:${clr}"></div></div>
            <p style="font-size:11px;color:var(--text-light);margin-top:4px">${cov}/${co.topics.length} topics</p>
          </div>`;
        }).join('')}
      </div>
    </div>
  </section>

  <section class="section" id="sec-students">
    <div class="page-header"><h2>Student Management</h2><p>Manage all enrolled students.</p></div>
    <div class="card">
      <div class="attendance-header">
        <h3 style="font-size:16px;font-weight:600">All Students (${state.students.length})</h3>
        <button class="btn-sm btn-blue" onclick="openModal('addStudentModal')">+ Add Student</button>
      </div>
      <div class="table-wrap"><table>
        <thead><tr><th>#</th><th>Name</th><th>Roll No.</th><th>Class</th><th>Email</th><th>Attendance</th><th>Status</th></tr></thead>
        <tbody id="studentsTable">${buildStudentRows()}</tbody>
      </table></div>
    </div>
  </section>

  <section class="section" id="sec-faculty">
    <div class="page-header"><h2>Faculty Management</h2><p>Manage faculty members and their subjects.</p></div>
    <div class="card">
      <div class="attendance-header">
        <h3 style="font-size:16px;font-weight:600">Faculty Members (${state.faculties.length})</h3>
        <button class="btn-sm btn-blue" onclick="openModal('addFacultyModal')">+ Add Faculty</button>
      </div>
      <div class="table-wrap"><table>
        <thead><tr><th>#</th><th>Name</th><th>Department</th><th>CO Subject</th><th>Email</th><th>Status</th></tr></thead>
        <tbody>${state.faculties.map((f,i)=>`
          <tr>
            <td style="color:var(--text-light);font-weight:500">${String(i+1).padStart(2,'0')}</td>
            <td><div style="display:flex;align-items:center;gap:10px">
              <div style="width:34px;height:34px;border-radius:50%;background:#dbeafe;color:#2563eb;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px">${f.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
              <p style="font-weight:500;font-size:13px">${f.name}</p>
            </div></td>
            <td>${f.dept}</td>
            <td><span class="badge badge-purple">${f.subject}</span></td>
            <td style="color:var(--text-mid);font-size:13px">${f.email}</td>
            <td><span class="badge badge-green">Active</span></td>
          </tr>`).join('')}
        </tbody>
      </table></div>
    </div>
  </section>

  <section class="section" id="sec-records">
    <div class="page-header"><h2>Attendance Records</h2><p>View all attendance sessions.</p></div>
    <div class="card">
      <div class="select-row" style="margin-bottom:16px">
        <select onchange="filterRecords(this.value)"><option value="">All Classes</option>${state.classes.map(c=>`<option>${c}</option>`).join('')}</select>
        <select><option>All CO Subjects</option>${state.subjects.map(s=>`<option>${s}</option>`).join('')}</select>
        <input type="date" value="${new Date().toISOString().split('T')[0]}">
      </div>
      <div class="table-wrap"><table>
        <thead><tr><th>Date</th><th>Class</th><th>CO Subject</th><th>Period</th><th>Faculty</th><th>Present</th><th>Absent</th><th>%</th></tr></thead>
        <tbody>${buildRecordsRows()}</tbody>
      </table></div>
    </div>
  </section>

  ${buildCoTopicsSection('admin')}

  <section class="section" id="sec-reports">
    <div class="page-header"><h2>Reports & Analytics</h2><p>Overall attendance statistics.</p></div>
    ${buildReports('admin')}
  </section>`;
}

function buildStudentRows() {
  return state.students.map((s,i)=>{
    const pct = Math.floor(Math.random()*25)+70;
    return `<tr>
      <td style="color:var(--text-light);font-weight:500">${String(i+1).padStart(2,'0')}</td>
      <td><div style="display:flex;align-items:center;gap:10px">
        <div style="width:34px;height:34px;border-radius:50%;background:#dcfce7;color:#16a34a;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px">${s.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
        <div><p style="font-weight:500;font-size:13px">${s.name}</p><p style="font-size:12px;color:var(--text-light)">${s.email}</p></div>
      </div></td>
      <td><span class="badge badge-blue">${s.rollNo}</span></td>
      <td>${s.className}</td>
      <td style="font-size:13px;color:var(--text-mid)">${s.email}</td>
      <td><div style="display:flex;align-items:center;gap:8px">
        <div class="progress-bar" style="width:80px"><div class="progress-fill" style="width:${pct}%;background:${pct>75?'var(--green)':'var(--orange)'}"></div></div>
        <span style="font-size:12px;font-weight:600;color:${pct>75?'var(--green)':'var(--orange)'}">${pct}%</span>
      </div></td>
      <td><span class="badge ${pct>75?'badge-green':'badge-yellow'}">${pct>75?'Good':'Low'}</span></td>
    </tr>`;
  }).join('');
}

function buildRecordsRows() {
  const rows = [];
  const today = new Date();
  for (let d=0; d<5; d++) {
    const date = new Date(today); date.setDate(today.getDate()-d);
    const dateStr = date.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
    for (let p=0; p<3; p++) {
      const prs = Math.floor(Math.random()*3)+3;
      const abs = 5-prs;
      const pct = Math.round(prs/5*100);
      rows.push(`<tr>
        <td>${dateStr}</td>
        <td><span class="badge badge-blue">${state.classes[p%state.classes.length]}</span></td>
        <td><span class="badge badge-purple">${state.subjects[p%state.subjects.length]}</span></td>
        <td>Period ${p+1}</td>
        <td style="font-size:13px;color:var(--text-mid)">${state.faculties[p%state.faculties.length].name}</td>
        <td><span style="color:var(--green);font-weight:600">${prs}</span></td>
        <td><span style="color:var(--red);font-weight:600">${abs}</span></td>
        <td><span class="badge ${pct>=80?'badge-green':'badge-yellow'}">${pct}%</span></td>
      </tr>`);
    }
  }
  return rows.join('');
}

// ===================== FACULTY CONTENT =====================
function buildFacultyContent() {
  const u = state.currentUser;
  return `
  <section class="section active" id="sec-dashboard">
    <div class="page-header"><h2>Faculty Dashboard</h2><p>Welcome, ${u.name}. Manage your class attendance below.</p></div>
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-icon" style="background:#dbeafe">👥</div><div class="stat-info"><p>My Students</p><h3>${state.students.filter(s=>s.className==='CS-A').length}</h3><small>CS-A Class</small></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#dcfce7">✅</div><div class="stat-info"><p>Today's Sessions</p><h3>3</h3><small>Marked today</small></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#fef9c3">📊</div><div class="stat-info"><p>Avg Attendance</p><h3>82%</h3><small>This month</small></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#fee2e2">⚠️</div><div class="stat-info"><p>Low Attendance</p><h3>2</h3><small>Below 75%</small></div></div>
    </div>
    <div class="card">
      <h3 style="font-size:16px;font-weight:600;margin-bottom:16px">📅 Today's Schedule</h3>
      <div class="table-wrap"><table>
        <thead><tr><th>Period</th><th>Time</th><th>CO Subject</th><th>Class</th><th>Status</th></tr></thead>
        <tbody>${['8:00–8:50','9:00–9:50','10:00–10:50','11:00–11:50','12:00–12:50','1:00–1:50','2:00–2:50','3:00–3:50'].map((t,i)=>`
          <tr>
            <td class="period-label">Period ${i+1}</td>
            <td style="color:var(--text-mid);font-size:13px">${t}</td>
            <td><span class="badge badge-purple">${state.subjects[i%state.subjects.length]}</span></td>
            <td><span class="badge badge-blue">CS-A</span></td>
            <td><span class="badge ${i<3?'badge-green':'badge-yellow'}">${i<3?'Marked':'Pending'}</span></td>
          </tr>`).join('')}
        </tbody>
      </table></div>
    </div>
  </section>

  <section class="section" id="sec-markatt">
    <div class="page-header"><h2>Mark Attendance</h2><p>Select class, CO subject and period to mark attendance.</p></div>
    <div class="card" style="margin-bottom:20px">
      <div class="select-row" style="flex-wrap:wrap;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:500;color:var(--text-mid);display:block;margin-bottom:4px">Date</label>
          <input type="date" id="attDate" value="${new Date().toISOString().split('T')[0]}">
        </div>
        <div>
          <label style="font-size:12px;font-weight:500;color:var(--text-mid);display:block;margin-bottom:4px">Class</label>
          <select id="attClass" onchange="filterStudentsByClass()">${state.classes.map(c=>`<option>${c}</option>`).join('')}</select>
        </div>
        <div>
          <label style="font-size:12px;font-weight:500;color:var(--text-mid);display:block;margin-bottom:4px">CO Subject</label>
          <select id="attSubject">${state.subjects.map(s=>`<option>${s}</option>`).join('')}</select>
        </div>
        <div>
          <label style="font-size:12px;font-weight:500;color:var(--text-mid);display:block;margin-bottom:4px">Period</label>
          <select id="attPeriod">${state.periods.map((p,i)=>`<option value="${i+1}">${p} (${['8:00','9:00','10:00','11:00','12:00','1:00','2:00','3:00'][i]}–${['8:50','9:50','10:50','11:50','12:50','1:50','2:50','3:50'][i]})</option>`).join('')}</select>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="attendance-header">
        <div>
          <h3 style="font-size:16px;font-weight:600">Student List</h3>
          <p style="font-size:13px;color:var(--text-mid);margin-top:3px" id="attSummaryLine">Mark each student present or absent</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn-sm btn-outline" onclick="markAll('present')">✅ All Present</button>
          <button class="btn-sm btn-outline" onclick="markAll('absent')">❌ All Absent</button>
          <button class="btn-sm btn-green" onclick="submitAttendance()">💾 Save Attendance</button>
        </div>
      </div>
      <div class="table-wrap"><table class="attendance-table">
        <thead><tr><th>#</th><th>Roll No.</th><th>Student Name</th><th>Mark Attendance</th><th>Status</th></tr></thead>
        <tbody id="attendanceBody">${buildAttendanceRows('CS-A')}</tbody>
      </table></div>
    </div>
  </section>

  <section class="section" id="sec-records">
    <div class="page-header"><h2>My Attendance Records</h2><p>View previously marked attendance.</p></div>
    <div class="card">
      <div class="table-wrap"><table>
        <thead><tr><th>Date</th><th>CO Subject</th><th>Period</th><th>Class</th><th>Present</th><th>Absent</th><th>%</th></tr></thead>
        <tbody>${[...Array(8)].map((_,i)=>{
          const d = new Date(); d.setDate(d.getDate()-i);
          const prs = Math.floor(Math.random()*3)+3;
          const pct = Math.round(prs/5*100);
          return `<tr>
            <td>${d.toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}</td>
            <td><span class="badge badge-purple">${state.subjects[i%state.subjects.length]}</span></td>
            <td>Period ${(i%8)+1}</td>
            <td><span class="badge badge-blue">CS-A</span></td>
            <td><span style="color:var(--green);font-weight:600">${prs}</span></td>
            <td><span style="color:var(--red);font-weight:600">${5-prs}</span></td>
            <td><span class="badge ${pct>=80?'badge-green':'badge-yellow'}">${pct}%</span></td>
          </tr>`;
        }).join('')}</tbody>
      </table></div>
    </div>
  </section>

  ${buildCoTopicsSection('faculty')}

  <section class="section" id="sec-reports">
    <div class="page-header"><h2>Class Report</h2><p>Attendance analytics for your class.</p></div>
    ${buildReports('faculty')}
  </section>`;
}

function buildAttendanceRows(className) {
  const students = state.students.filter(s=>s.className===className);
  if (!students.length) return `<tr><td colspan="5" style="text-align:center;color:var(--text-light);padding:30px">No students in this class</td></tr>`;
  return students.map((s,i)=>{
    if (!state.currentAttendance[s.id]) state.currentAttendance[s.id] = 'present';
    const status = state.currentAttendance[s.id];
    return `<tr id="att-row-${s.id}">
      <td style="color:var(--text-light);font-weight:500">${String(i+1).padStart(2,'0')}</td>
      <td><span class="badge badge-blue">${s.rollNo}</span></td>
      <td><div style="display:flex;align-items:center;gap:10px">
        <div style="width:32px;height:32px;border-radius:50%;background:#dcfce7;color:#16a34a;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px">${s.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
        <span style="font-weight:500;font-size:14px">${s.name}</span>
      </div></td>
      <td><div class="att-toggle">
        <button class="att-btn ${status==='present'?'present':'inactive'}" onclick="setAttendance(${s.id},'present',this)">✓ Present</button>
        <button class="att-btn ${status==='absent'?'absent':'inactive'}"  onclick="setAttendance(${s.id},'absent',this)">✗ Absent</button>
      </div></td>
      <td><span class="badge ${status==='present'?'badge-green':'badge-red'}" id="att-status-${s.id}">${status==='present'?'Present':'Absent'}</span></td>
    </tr>`;
  }).join('');
}

function initAttendance() {
  const students = state.students.filter(s=>s.className==='CS-A');
  students.forEach(s=>{ state.currentAttendance[s.id]='present'; });
  updateAttSummary();
}
function filterStudentsByClass() {
  const cls = document.getElementById('attClass').value;
  const tbody = document.getElementById('attendanceBody');
  if (tbody) { state.currentAttendance = {}; tbody.innerHTML = buildAttendanceRows(cls); updateAttSummary(); }
}
function setAttendance(sid, status, btn) {
  state.currentAttendance[sid] = status;
  const row = document.getElementById('att-row-'+sid);
  row.querySelectorAll('.att-btn').forEach(b=>b.className='att-btn inactive');
  btn.className = `att-btn ${status}`;
  const statusBadge = document.getElementById('att-status-'+sid);
  statusBadge.className = `badge ${status==='present'?'badge-green':'badge-red'}`;
  statusBadge.textContent = status==='present'?'Present':'Absent';
  updateAttSummary();
}
function markAll(status) {
  const cls = document.getElementById('attClass')?.value || 'CS-A';
  state.students.filter(s=>s.className===cls).forEach(s=>{ state.currentAttendance[s.id]=status; });
  document.getElementById('attendanceBody').innerHTML = buildAttendanceRows(cls);
  updateAttSummary();
}
function updateAttSummary() {
  const vals  = Object.values(state.currentAttendance);
  const prs   = vals.filter(v=>v==='present').length;
  const total = vals.length;
  const el    = document.getElementById('attSummaryLine');
  if (el) el.textContent = `Present: ${prs} / ${total} students (${total?Math.round(prs/total*100):0}%)`;
}
function submitAttendance() {
  const date    = document.getElementById('attDate')?.value;
  const cls     = document.getElementById('attClass')?.value;
  const subject = document.getElementById('attSubject')?.value;
  const period  = document.getElementById('attPeriod')?.value;
  const key     = `${date}-${cls}-${subject}-${period}`;
  state.attendanceRecords[key] = Object.entries(state.currentAttendance).map(([id,status])=>({studentId:parseInt(id),status}));
  showToast('✅ Attendance saved successfully!','success');
}

// ===================== STUDENT CONTENT =====================
function buildStudentContent() {
  const u = state.currentUser;
  const student    = state.students.find(s=>s.email===u.email) || state.students[0];
  const subjectData = state.subjects.map(s=>({ name:s, pct: Math.floor(Math.random()*25)+70 }));
  const overall     = Math.round(subjectData.reduce((a,s)=>a+s.pct,0)/subjectData.length);
  return `
  <section class="section active" id="sec-dashboard">
    <div class="page-header"><h2>My Dashboard</h2><p>Hello ${u.name}! Here's your attendance summary.</p></div>
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-icon" style="background:#dbeafe">📊</div><div class="stat-info"><p>Overall Attendance</p><h3 style="color:${overall>=75?'var(--green)':'var(--red)'}">${overall}%</h3><small>${overall>=75?'✓ Good Standing':'⚠ Below 75%'}</small></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#dcfce7">✅</div><div class="stat-info"><p>Classes Attended</p><h3>42</h3><small>Out of 51</small></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#fee2e2">❌</div><div class="stat-info"><p>Classes Missed</p><h3>9</h3><small>This semester</small></div></div>
      <div class="stat-card"><div class="stat-icon" style="background:#fef9c3">🎓</div><div class="stat-info"><p>Class</p><h3 style="font-size:20px">${student?.className||'CS-A'}</h3><small>Roll: ${student?.rollNo||'101'}</small></div></div>
    </div>
    <div class="card">
      <h3 style="font-size:16px;font-weight:600;margin-bottom:16px">CO-wise Attendance</h3>
      ${subjectData.map(s=>`<div class="subject-row">
        <label>${s.name}</label>
        <div class="progress-bar" style="flex:1"><div class="progress-fill" style="width:${s.pct}%;background:${s.pct>=75?'var(--green)':'var(--red)'}"></div></div>
        <span class="att-percent ${s.pct>=75?'good':'bad'}" style="font-size:14px;min-width:42px;text-align:right">${s.pct}%</span>
        ${s.pct<75?`<span class="badge badge-red" style="margin-left:6px">Low</span>`:`<span class="badge badge-green" style="margin-left:6px">Good</span>`}
      </div>`).join('')}
    </div>
  </section>

  <section class="section" id="sec-myatt">
    <div class="page-header"><h2>My Attendance</h2><p>Full attendance record for this semester.</p></div>
    <div class="card">
      <div class="select-row" style="margin-bottom:16px">
        <select><option>All CO Subjects</option>${state.subjects.map(s=>`<option>${s}</option>`).join('')}</select>
        <select><option>All Periods</option>${state.periods.map(p=>`<option>${p}</option>`).join('')}</select>
      </div>
      <div class="table-wrap"><table>
        <thead><tr><th>Date</th><th>CO Subject</th><th>Period</th><th>Faculty</th><th>Status</th></tr></thead>
        <tbody>${[...Array(15)].map((_,i)=>{
          const d = new Date(); d.setDate(d.getDate()-i);
          const present = Math.random()>0.2;
          return `<tr>
            <td>${d.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}</td>
            <td><span class="badge badge-purple">${state.subjects[i%state.subjects.length]}</span></td>
            <td>Period ${(i%8)+1}</td>
            <td style="font-size:13px;color:var(--text-mid)">${state.faculties[i%state.faculties.length].name}</td>
            <td><span class="badge ${present?'badge-green':'badge-red'}">${present?'Present':'Absent'}</span></td>
          </tr>`;
        }).join('')}
        </tbody>
      </table></div>
    </div>
  </section>

  ${buildCoTopicsSection('student')}

  <section class="section" id="sec-reports">
    <div class="page-header"><h2>My Report</h2><p>Detailed attendance analytics.</p></div>
    ${buildReports('student', subjectData, overall)}
  </section>`;
}

// ===================== REPORTS =====================
function buildReports(role, subjectData, overall) {
  if (!subjectData) {
    subjectData = state.subjects.map(s=>({ name:s, pct: Math.floor(Math.random()*25)+70 }));
    overall = Math.round(subjectData.reduce((a,s)=>a+s.pct,0)/subjectData.length);
  }
  return `<div class="grid-2">
    <div class="card">
      <h3 style="font-size:16px;font-weight:600;margin-bottom:8px">${role==='student'?'My':'Class'} Overall Attendance</h3>
      <p style="font-size:13px;color:var(--text-mid);margin-bottom:20px">Semester aggregate</p>
      <div style="text-align:center;margin:20px 0">
        <div class="att-percent ${overall>=75?(overall>=85?'good':'warn'):'bad'}" style="font-size:52px">${overall}%</div>
        <p style="font-size:14px;color:var(--text-mid);margin-top:6px">${overall>=75?'✅ Meets minimum requirement':'⚠️ Below 75% threshold'}</p>
      </div>
      <div class="progress-bar" style="height:12px"><div class="progress-fill" style="width:${overall}%;background:${overall>=75?'var(--green)':'var(--red)'}"></div></div>
      <div style="display:flex;justify-content:space-between;margin-top:6px">
        <span style="font-size:12px;color:var(--text-light)">0%</span>
        <span style="font-size:12px;color:var(--text-mid);font-weight:500">Min: 75%</span>
        <span style="font-size:12px;color:var(--text-light)">100%</span>
      </div>
    </div>
    <div class="card">
      <h3 style="font-size:16px;font-weight:600;margin-bottom:16px">CO-wise Attendance Breakdown</h3>
      ${subjectData.map(s=>`<div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
          <span style="font-size:13px;font-weight:500">${s.name}</span>
          <span style="font-size:13px;font-weight:600;color:${s.pct>=75?'var(--green)':'var(--red)'}">${s.pct}%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${s.pct}%;background:${s.pct>=75?'var(--green)':'var(--red)'}"></div></div>
      </div>`).join('')}
    </div>
  </div>
  ${role==='admin'?`<div class="card" style="margin-top:20px">
    <h3 style="font-size:16px;font-weight:600;margin-bottom:16px">Students Below 75% Attendance</h3>
    <div class="table-wrap"><table>
      <thead><tr><th>Student</th><th>Class</th><th>Attendance</th><th>Action</th></tr></thead>
      <tbody>${state.students.slice(0,4).map(s=>{
        const pct = Math.floor(Math.random()*20)+55;
        return `<tr>
          <td style="font-weight:500">${s.name}</td><td>${s.className}</td>
          <td><span class="att-percent bad" style="font-size:16px">${pct}%</span></td>
          <td><button class="btn-sm" style="padding:5px 12px;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;border-radius:6px;cursor:pointer;font-size:12px">⚠ Send Notice</button></td>
        </tr>`;
      }).join('')}</tbody>
    </table></div>
  </div>`:''}`;
}

// ===================== HELPERS =====================
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function showToast(msg, type='') {
  const t = document.getElementById('toast');
  t.textContent = msg; t.className = `toast ${type} show`;
  setTimeout(()=>t.classList.remove('show'), 3000);
}

function saveNewStudent() {
  const name  = document.getElementById('newStudentName').value.trim();
  const roll  = document.getElementById('newStudentRoll').value.trim();
  const email = document.getElementById('newStudentEmail').value.trim();
  const cls   = document.getElementById('newStudentClass').value;
  if (!name||!roll) { showToast('Name and Roll No. are required','error'); return; }
  state.students.push({ id:Date.now(), name, rollNo:roll, className:cls, email, phone:'' });
  closeModal('addStudentModal');
  const tbody = document.getElementById('studentsTable');
  if (tbody) tbody.innerHTML = buildStudentRows();
  showToast(`✅ ${name} added successfully!`,'success');
  document.getElementById('newStudentName').value='';
  document.getElementById('newStudentRoll').value='';
  document.getElementById('newStudentEmail').value='';
}

function saveNewFaculty() {
  const name  = document.getElementById('newFacultyName').value.trim();
  const email = document.getElementById('newFacultyEmail').value.trim();
  const dept  = document.getElementById('newFacultyDept').value;
  const co    = document.getElementById('newFacultyCO').value;
  if (!name) { showToast('Name is required','error'); return; }
  state.faculties.push({ id:Date.now(), name, email, dept, subject:co });
  closeModal('addFacultyModal');
  showToast(`✅ ${name} added successfully!`,'success');
  document.getElementById('newFacultyName').value='';
  document.getElementById('newFacultyEmail').value='';
}

function filterRecords(cls) { /* filtering hook */ }

// Register role toggle
document.getElementById('regRole')?.addEventListener('change', function() {
  document.getElementById('regClassGroup').style.display = this.value==='student'?'block':'none';
});
