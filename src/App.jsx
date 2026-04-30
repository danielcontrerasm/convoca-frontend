import React, { useEffect, useMemo, useState } from "react";
import {
  BookOpen, Users, ClipboardList, PlayCircle, FileText, Video,
  Puzzle, CheckCircle2, XCircle, BarChart3, LogOut, Settings, ShieldCheck, Upload
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "https://convocapro-backend-production.up.railway.app";
const DEMO_EXAM_TYPE = "DEMO";
const DEMO_USER_ID = import.meta.env.VITE_DEMO_USER_ID || "7";
const DEMO_QUESTION_COUNT = 20;
const EXAMS = [
  {
    title: "Examen práctico",
    examType: "GENERIC",
    badge: "Base",
    description: "Banco general para entrenar comprensión lectora y competencias básicas.",
    questions: "200"
  },
     {
       title: "Genérico CNSC Real 100",
       examType: "GENERIC_CNSC_REAL_100",
       badge: "Real",
       description: "Banco genérico con trampas conceptuales, principios y razonamiento.",
       questions: "100"
     },
     {
       title: "Examen Trampa CNSC 50",
       examType: "GENERIC_CNSC_TRAP_50",
       badge: "Premium",
       description: "Preguntas difíciles con opciones plausibles y análisis fino.",
       questions: "50"
     }
,
  {
    title: "Profesional Territorial 12 - 50",
    examType: "TERRITORIAL_12_PROFESIONAL_50",
    badge: "Profesional Pro",
    description: "Banco técnico ampliado para preparación intensiva.",
    questions: "50"
  },
  {
    title: "Técnico Territorial 12 - 50",
    examType: "TERRITORIAL_12_TECNICO_50",
    badge: "Técnico",
    description: "Simulacro técnico corto con preguntas revisadas.",
    questions: "50"
  },
  {
    title: "Técnico Territorial 12 - 100",
    examType: "TERRITORIAL_12_TECNICO_100",
    badge: "Técnico Pro",
    description: "Banco técnico ampliado para preparación intensiva.",
    questions: "100"
  },{
        title: "Simulacro Territorial 12",
        examType: "TERRITORIAL_12",
        badge: "Simulacro",
        description: "Banco separado para preparación de Territorial 12.",
        questions: "200"
      },
     {
       title: "Asistencial Territorial 12 - 50",
       examType: "TERRITORIAL_12_ASISTENCIAL_50",
       badge: "Asistencial Pro",
       description: "Banco técnico ampliado para preparación intensiva.",
       questions: "50"
     }
 ,
   {
     title: "Asistencial Territorial 12 - 50 Segundo Examen",
     examType: "TERRITORIAL_12_ASISTENCIAL_50_2",
     badge: "Asistencial Pro",
     description: "Banco técnico ampliado para preparación intensiva.",
     questions: "50"
   }

];

const PLANS = [
  {
    name: "Gratis",
    price: "$0",
    description: "Para probar la plataforma.",
    features: ["Examen práctico", "Resultado básico", "Acceso limitado"]
  },
  {
    name: "Pro",
    price: "$49.000",
    description: "Para preparación seria.",
    features: ["Simulacros por perfil", "Análisis por áreas", "Preguntas trampa", "Retries controlados"]
  },
  {
    name: "Premium",
    price: "$99.000",
    description: "Para entrenamiento intensivo.",
    features: ["Todos los bancos", "Materiales PDF/video", "Feedback avanzado", "Soporte prioritario"]
  }
];

function readUser() {
  try { return normalizeUser(JSON.parse(localStorage.getItem("convocapro-user") || "null")); } catch { return null; }
}
function saveUser(user) {
  localStorage.setItem("convocapro-user", JSON.stringify(normalizeUser(user)));
}
function normalizeUser(user) {
  if (!user) return user;
  return { ...user, userId: user.userId ?? user.id };
}
function getQuestionCount(value) {
  const count = Number.parseInt(value, 10);
  return Number.isFinite(count) ? count : null;
}
function letterOf(option) {
  return String(option || "").trim().charAt(0);
}

function Topbar({ page, setPage, user, logout, examType, openDemoExam }) {
  const nav = [
    ["home", "Inicio"],
    ["demo", "Demo"],
    ["simulacros", "Simulacros"],
 /*    ["course", "Curso"],
    ["plans", "Planes"], */
    ["exam", "Examen final"],
    ...(user?.role === "ADMIN" ? [["admin", "Admin"]] : [])
  ];
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="logo">
          <div className="logo-box">CP</div>
          <div>
            <div className="logo-title">ConvocaPro</div>
            <div className="logo-sub">Prepárate. Practica. Aprueba.</div>
          </div>
        </div>
        <div className="nav">
          {nav.map(([key, label]) => (
            <button
              key={key}
              className={(key === "demo" ? page === "exam" && examType === DEMO_EXAM_TYPE : page === key) ? "active" : ""}
              onClick={() => key === "demo" ? openDemoExam() : setPage(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="nav">
          {user ? (
            <>
              <button className="active">{user.username} · {user.profile}</button>
              <button onClick={logout}><LogOut size={16} /> Salir</button>
            </>
          ) : (
            <button onClick={() => setPage("auth")}>Login</button>
          )}
        </div>
      </div>
    </div>
  );
}

function Home({ setPage }) {
  return (
    <>
      <section className="hero">
        <div className="container grid-hero">
          <div className="card pad hero-main">
            <div className="badge"><ShieldCheck size={16}/> Plataforma educativa completa</div>
            <div className="h1">ConvocaPro para preparar perfiles Asistencial, Técnico y Profesional.</div>
            <p className="lead">
              Plataforma de preparación con login, registro, simulacros, cursos,
              actividades, examen final de 200 preguntas por perfil, resultados en verde/rojo,
              retries y administración de usuarios.
            </p>
            <div className="actions">
              <button className="btn primary" onClick={() => setPage("auth")}>Entrar / Registrarme</button>
              <button className="btn outline" onClick={() => setPage("simulacros")}>Ver Simulacros</button>
            </div>
          </div>
          <div className="card pad">
            <div className="badge">Incluido</div>
            <div className="grid" style={{ marginTop: 18 }}>
               <div className="mini">✅ 3 examenes generico de CNSC para que te entrenes en este tipo de preguntas </div>
               <div className="mini">✅ Examenes de 50, 100 y 150 preguntas con diferentes niveles de dificultad</div>
               <div className="mini">✅ 200 preguntas por examen final según perfil</div>
              <div className="mini">✅ Cursos con unidades, PDFs, Excel, videos y actividades</div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Auth({ setUser, setPage }) {
  const [form, setForm] = useState({
    username: "admin",
    password: "1234"
  });
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username, password: form.password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      const normalized = normalizeUser(data);
      saveUser(normalized);
      setUser(normalized);
      setPage("simulacros");
    } catch (err) {
      setError(err.message || "Error");
    }
  }

  return (
    <section className="section">
      <div className="container grid-2 grid">
        <div className="card pad">
          <div className="title">Login</div>
          <p className="subtitle"></p>
          <form onSubmit={submit}>
            <input className="input" placeholder="Usuario" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
            <input className="input" placeholder="Contraseña" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            {error && <div className="error">{error}</div>}
            <div className="actions">
              <button className="btn primary" type="submit">Entrar</button>
            </div>
          </form>
        </div>
        <div className="card pad hero-main">
          <div className="badge">Control de acceso</div>
          <h2 className="title" style={{ marginTop: 16 }}>Perfiles y retries</h2>
          <p className="lead">
            El perfil del usuario define qué curso y qué banco de preguntas obtiene.
            El sistema controla los retries por usuario al enviar el examen.
          </p>
        </div>
      </div>
    </section>
  );
}

function Simulacros({ user, setPage, refreshUser, setSelectedExam }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/users/stats`).then(r => r.json()).then(setStats).catch(() => {});
    if (user?.userId) {
      fetch(`${API}/api/users/${user.userId}`).then(r => r.json()).then(data => {
        const merged = normalizeUser({ ...user, ...data, userId: data.id ?? user.userId });
        saveUser(merged);
        refreshUser(merged);
      }).catch(() => {});
    }
  }, []);

  if (!user) return <NeedLogin setPage={setPage} />;

  return (
    <section className="section">
      <div className="container">
        <div className="card pad hero-main">
          <div className="badge"><BarChart3 size={16}/> Simulacros del usuario</div>
          <h1 className="title" style={{ fontSize: "2.7rem", marginTop: 16 }}>Hola, {user.fullName || user.username}</h1>
          <p className="subtitle">
            Perfil: <b>{user.profile}</b> · Intentos: <b>{user.retriesUsed ?? 0}/{user.retryLimit ?? 3}</b> · Accesos: <b>{user.totalAccesses ?? 0}</b>
          </p>
          <div className="actions">
            <button className="btn primary" onClick={() => setPage("course")}><BookOpen size={16}/> Ir al curso</button>
            {user?.role === "ADMIN" && (
              <button className="btn outline" onClick={() => setPage("admin")}><Users size={16}/> Admin</button>
            )}
          </div>
        </div>

        <div className="section">
          <h2 className="title">Exámenes disponibles</h2>
          <p className="subtitle">Elige un banco de preguntas para presentar el simulacro.</p>
          <div className="grid grid-3">
            {EXAMS.map(exam => (
              <div className="unit exam-card" key={exam.examType}>
                <div className="badge">{exam.badge}</div>
                <h3>{exam.title}</h3>
                <p>{exam.description}</p>
                <div className="mini"><b>{exam.questions}</b> preguntas</div>
                <button className="btn dark" onClick={() => { setSelectedExam(exam); setPage("exam"); }}>
                  Abrir simulacro
                </button>
              </div>
            ))}
          </div>
        </div>

      {/*   <div className="section grid grid-4">
          <div className="stat"><div className="small">Usuarios totales</div><div className="stat-number">{stats?.totalUsers ?? "-"}</div></div>
          <div className="stat"><div className="small">Usuarios activos</div><div className="stat-number">{stats?.activeUsers ?? "-"}</div></div>
          <div className="stat"><div className="small">Accesos totales</div><div className="stat-number">{stats?.totalAccesses ?? "-"}</div></div>
          <div className="stat"><div className="small">Tu perfil</div><div className="stat-number" style={{ fontSize: "1.4rem" }}>{user.profile}</div></div>
        </div> */}
      </div>
    </section>
  );
}

function NeedLogin({ setPage }) {
  return (
    <section className="section">
      <div className="container">
        <div className="card pad">
          <h2 className="title">Necesitas iniciar sesión</h2>
          <button className="btn primary" onClick={() => setPage("auth")}>Ir al login</button>
        </div>
      </div>
    </section>
  );
}

function Course({ user }) {
  const [units, setUnits] = useState([]);
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState("lesson");
  const profile = user?.profile || "TECNICO";

  useEffect(() => {
    fetch(`${API}/api/courses?profile=${profile}`)
      .then(r => r.json())
      .then(setUnits)
      .catch(() => setUnits([]));
  }, [profile]);

  const unit = units[selected];

  return (
    <section className="section">
      <div className="container">
        <div className="course-layout">
          <div className="card sidebar">
            <div className="badge">Ruta {profile}</div>
            <h2 className="title" style={{ fontSize: "1.5rem", marginTop: 16 }}>Unidades</h2>
            {units.map((u, idx) => (
              <button key={u.id} className={`sidebar-item ${idx === selected ? "active" : ""}`} onClick={() => { setSelected(idx); setTab("lesson"); }}>
                <b>{idx + 1}. {u.title}</b>
                <div style={{ fontSize: ".82rem", opacity: .75 }}>{u.activities?.length ?? 0} actividades</div>
              </button>
            ))}
          </div>

          <div className="card pad">
            {!unit ? (
              <p>Cargando curso...</p>
            ) : (
              <>
                <div className="badge"><BookOpen size={16}/> Curso</div>
                <h1 className="title" style={{ marginTop: 16 }}>{unit.title}</h1>
                <p className="subtitle">{unit.description}</p>

                <div className="tabs">
                  <button className="tab" onClick={() => setTab("lesson")}>Lesson</button>
                  <button className="tab" onClick={() => setTab("resources")}>Resources</button>
                  <button className="tab" onClick={() => setTab("activities")}>Activities</button>
                  <button className="tab" onClick={() => setTab("quiz")}>Quiz</button>
                </div>

                {tab === "lesson" && (
                  <div className="grid grid-2">
                    <div className="unit">
                      <Video size={26} />
                      <h3>Video de la unidad</h3>
                      <p className="small">{unit.videoUrl}</p>
                      <button className="btn primary"><PlayCircle size={16}/> Ver video</button>
                    </div>
                    <div className="unit">
                      <BookOpen size={26} />
                      <h3>Lesson escrita</h3>
                      <p>
                        Esta unidad cubre conceptos clave del perfil {profile}, con enfoque en
                        preguntas funcionales, comportamentales y toma de decisiones.
                      </p>
                    </div>
                  </div>
                )}

                {tab === "resources" && (
                  <div className="grid grid-3">
                    <div className="unit"><FileText size={26}/><h3>PDF guía</h3><p className="small">{unit.pdfUrl}</p></div>
                    <div className="unit"><FileText size={26}/><h3>Excel de práctica</h3><p className="small">{unit.excelUrl}</p></div>
                    <div className="unit"><Video size={26}/><h3>Video resumen</h3><p className="small">{unit.videoUrl}</p></div>
                  </div>
                )}

                {tab === "activities" && (
                  <div className="grid grid-3">
                    {unit.activities?.map(a => (
                      <div key={a.id} className="activity">
                        <Puzzle size={26}/>
                        <h3>{a.type}</h3>
                        <p>{a.prompt}</p>
                        <div className="code">{a.answerKey}</div>
                      </div>
                    ))}
                  </div>
                )}

                {tab === "quiz" && (
                  <div className="unit">
                    <ClipboardList size={26}/>
                    <h3>Quiz de práctica</h3>
                    <p>Este espacio queda reservado para mini quiz por unidad. El examen grande está en la pestaña Examen final.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalExam({ user, selectedExam, refreshUser, setPage }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const examType = selectedExam.examType;
  const isDemo = examType === DEMO_EXAM_TYPE;
  const requestUserId = user?.userId ?? (isDemo ? DEMO_USER_ID : null);
  const questionCount = getQuestionCount(selectedExam.questions);

  async function load() {
    if (!requestUserId) return;
    setError("");
    try {
      const params = new URLSearchParams({ examType });
      params.set("userId", requestUserId);
      if (questionCount) params.set("limit", String(questionCount));
      const res = await fetch(`${API}/api/exams/full?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo cargar el examen");
      setQuestions(questionCount ? data.slice(0, questionCount) : data);
      setCurrent(0);
      setResult(null);
      setAnswers({});
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => { load(); }, [user?.userId, examType, questionCount]);

  async function submit() {
    setError("");
    if (Object.keys(answers).length < questions.length) {
      setError(`Debes responder todas las preguntas. Faltan ${questions.length - Object.keys(answers).length}.`);
      return;
    }
    try {
      const payload = {
        answers: questions.map(q => ({
          questionId: q.id,
          selectedOption: answers[q.id]
        }))
      };
      if (requestUserId) payload.userId = requestUserId;
      const res = await fetch(`${API}/api/exams/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo calificar");
      setResult(data);
      if (!user?.userId) return;
      const userRes = await fetch(`${API}/api/users/${user.userId}`);
      if (userRes.ok) {
        const updated = await userRes.json();
        const merged = normalizeUser({ ...user, ...updated, userId: updated.id ?? user.userId });
        saveUser(merged);
        refreshUser(merged);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  if (!user && !isDemo) return <NeedLogin setPage={setPage} />;

  if (error) {
    return (
      <section className="section"><div className="container"><div className="error">{error}</div><button className="btn primary" onClick={load}>Reintentar</button></div></section>
    );
  }

  if (!questions.length) {
    return <section className="section"><div className="container"><div className="card pad">Cargando examen...</div></div></section>;
  }

  if (result) {
    const reviewMap = new Map(result.review.map(r => [r.questionId, r]));
    return (
      <section className="section">
        <div className="container">
          <div className="card pad hero-main">
            <div className="badge">Resultado final</div>
            <h1 className="title" style={{ fontSize: "3rem", marginTop: 16 }}>{result.score} / {result.total}</h1>
            <p className="subtitle">Porcentaje: <b>{result.percentage}%</b></p><p className="subtitle">Análisis por áreas: revisa en qué categoría tuviste más errores para reforzar el estudio.</p>
            <div className="grid grid-2">
              {Object.entries(result.categories || {}).map(([cat, val]) => (
                <div key={cat} className="stat"><div className="small">{cat}</div><div className="stat-number">{val.correct}/{val.total}</div></div>
              ))}
            </div>
          </div>

          <div className="section">
            <h2 className="title">Hoja de respuestas</h2>
            <div className="grid">
              {questions.map((q, idx) => {
                const r = reviewMap.get(q.id);
                return (
                  <div key={q.id} className="question-card">
                    <b>{idx + 1}. {q.question}</b>
                    <div style={{ marginTop: 12 }}>
                      {q.options.map(opt => {
                        const l = letterOf(opt);
                        const good = l === r?.correctAnswer;
                        const bad = l === r?.selectedOption && !r?.correct;
                        return (
                          <div key={opt} className={`option ${good ? "good" : bad ? "bad" : ""}`}>
                            {good && <CheckCircle2 size={16}/>} {bad && <XCircle size={16}/>} {opt}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const q = questions[current];
  const answered = Object.keys(answers).length;
  const pct = Math.round((answered * 100) / questions.length);

  return (
    <section className="section">
      <div className="container exam-shell">
        <div className="card pad">
          <div className="badge">Examen final · {isDemo ? "DEMO" : user.profile} · {examType}</div>
          <h2 className="title" style={{ fontSize: "1.6rem", marginTop: 16 }}>{questionCount ?? questions.length} preguntas</h2>
          <p className="small">Respondidas: {answered}/{questions.length}</p>
          <div className="progress"><div style={{ width: `${pct}%` }} /></div>
          <div className="qnav">
            {questions.map((qq, idx) => (
              <button key={qq.id} className={`${idx === current ? "active" : ""} ${answers[qq.id] ? "done" : ""}`} onClick={() => setCurrent(idx)}>
                {idx + 1}
              </button>
            ))}
          </div>
          <div className="actions">
            <button className="btn primary" disabled={answered < questions.length} onClick={submit}>
              {answered < questions.length ? `Faltan ${questions.length - answered}` : "Finalizar examen"}
            </button>
          </div>
        </div>

        <div className="card pad">
          <div className="badge">{q.category} · {q.difficulty}</div>
          <h2 className="title" style={{ marginTop: 16 }}>Pregunta {current + 1}</h2>
          <p className="lead">{q.question}</p>
          <div>
            {q.options.map(opt => {
              const l = letterOf(opt);
              return (
                <button key={opt} className={`option ${answers[q.id] === l ? "selected" : ""}`} onClick={() => setAnswers({ ...answers, [q.id]: l })}>
                  {opt}
                </button>
              );
            })}
          </div>
          <div className="actions">
            <button className="btn outline" onClick={() => setCurrent(Math.max(0, current - 1))}>Anterior</button>
            <button className="btn primary" onClick={() => setCurrent(Math.min(questions.length - 1, current + 1))}>Siguiente</button>
          </div>
        </div>
      </div>
    </section>
  );
}


function Plans({ compact = false }) {
  return (
    <section className={compact ? "section" : "section"}>
      <div className="container">
        <h2 className="title">Planes</h2>
        <p className="subtitle">Organiza el acceso por nivel de preparación.</p>
        <div className="grid grid-3">
          {PLANS.map(plan => (
            <div className={`plan-card ${plan.name === "Pro" ? "featured" : ""}`} key={plan.name}>
              <div className="badge">{plan.name}</div>
              <h3>{plan.price}</h3>
              <p>{plan.description}</p>
              <ul>
                {plan.features.map(f => <li key={f}>✅ {f}</li>)}
              </ul>
              <button className={plan.name === "Pro" ? "btn primary" : "btn outline"}>Elegir plan</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Admin() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState("");

  async function load() {
    const [u, s] = await Promise.all([
      fetch(`${API}/api/users`).then(r => r.json()),
      fetch(`${API}/api/users/stats`).then(r => r.json())
    ]);
    setUsers(u);
    setStats(s);
  }

  useEffect(() => { load(); }, []);

  async function resetRetries(id) {
    await fetch(`${API}/api/users/${id}/retries`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ retriesUsed: 0 })
    });
    setMessage("Retries reiniciados");
    load();
  }

  return (
    <section className="section">
      <div className="container">
        <div className="card pad hero-main">
          <div className="badge"><Settings size={16}/> Admin</div>
          <h1 className="title" style={{ marginTop: 16 }}>Usuarios y accesos</h1>
          <div className="grid grid-3">
            <div className="stat"><div className="small">Usuarios</div><div className="stat-number">{stats?.totalUsers ?? "-"}</div></div>
            <div className="stat"><div className="small">Activos</div><div className="stat-number">{stats?.activeUsers ?? "-"}</div></div>
            <div className="stat"><div className="small">Accesos</div><div className="stat-number">{stats?.totalAccesses ?? "-"}</div></div>
          </div>
        </div>

        <div className="section card pad">
          <div className="badge"><Upload size={16}/> Recursos de estudio</div>
          <h2 className="title" style={{ marginTop: 16 }}>Subir archivos y videos a unidades</h2>
          <p className="subtitle">Selecciona una unidad y carga PDFs, Excel o videos para el curso.</p>
          <div className="grid grid-3">
            <div className="unit">
              <h3>Unidad</h3>
              <select className="input">
                <option>Unidad 1</option>
                <option>Unidad 2</option>
                <option>Unidad 3</option>
                <option>Unidad 4</option>
                <option>Unidad 5</option>
              </select>
            </div>
            <div className="unit">
              <h3>PDF / Excel</h3>
              <input className="input" type="file" accept=".pdf,.xlsx,.xls,.doc,.docx" />
              <button className="btn primary">Guardar archivo</button>
            </div>
            <div className="unit">
              <h3>Video</h3>
              <input className="input" type="file" accept="video/*" />
              <button className="btn primary">Guardar video</button>
            </div>
          </div>
        </div>

        {message && <div className="success">{message}</div>}
        <div className="section grid">
          {users.map(u => (
            <div key={u.id} className="user-row">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div>
                  <b>{u.fullName}</b> · {u.username}
                  <div className="small">{u.email} · {u.profile} · {u.role}</div>
                  <div className="small">Retries: {u.retriesUsed}/{u.retryLimit} · Accesos: {u.totalAccesses}</div>
                </div>
                <button className="btn outline" onClick={() => resetRetries(u.id)}>Reset retries</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(readUser());
  const [selectedExam, setSelectedExam] = useState(EXAMS[0]);

  function openDemoExam() {
    setSelectedExam({
      title: "Demo",
      examType: DEMO_EXAM_TYPE,
      badge: "Demo",
      description: "Examen demo.",
      questions: String(DEMO_QUESTION_COUNT)
    });
    setPage("exam");
  }

  function logout() {
    localStorage.removeItem("convocapro-user");
    setUser(null);
    setPage("home");
  }

  return (
    <>
      <Topbar
        page={page}
        setPage={setPage}
        user={user}
        logout={logout}
        examType={selectedExam.examType}
        openDemoExam={openDemoExam}
      />
      {page === "home" && <Home setPage={setPage} />}
      {page === "auth" && <Auth setUser={setUser} setPage={setPage} />}
      {page === "simulacros" && <Simulacros user={user} setPage={setPage} refreshUser={setUser} setSelectedExam={setSelectedExam} />}
      {page === "course" && <Course user={user} />}
      {page === "exam" && <FinalExam user={user} selectedExam={selectedExam} refreshUser={setUser} setPage={setPage} />}
      {page === "admin" && (
        user?.role === "ADMIN"
          ? <Admin />
          : <section className="section"><div className="container"><div className="card pad"><h2 className="title">Acceso restringido</h2><p>Solo administradores pueden ver esta sección.</p><button className="btn primary" onClick={() => setPage("simulacros")}>Volver a simulacros</button></div></div></section>
      )}

    </>
  );
}
