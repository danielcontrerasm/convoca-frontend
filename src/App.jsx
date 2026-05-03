import React, { useEffect, useState } from "react";
import {
  BookOpen, Users, ClipboardList, PlayCircle, FileText, Video,
  Puzzle, CheckCircle2, XCircle, BarChart3, LogOut, Settings, ShieldCheck, Upload,
  Award, Trophy, GraduationCap, MessageCircle, Mail, Clock, Crown, Lock,
  Send, Star, Headphones, Target, FileQuestion, ChartNoAxesColumnIncreasing
} from "lucide-react";
import "./styles/convocapro-neon-additions.css";
import heroGirl from "./assets/images/hero-girl.jpg";
const API = import.meta.env.VITE_API_URL || "https://convocapro-backend-production.up.railway.app";
const DEMO_EXAM_TYPE = "DEMO";
const DEMO_USER_ID = import.meta.env.VITE_DEMO_USER_ID || "7";
const DEMO_QUESTION_COUNT = 20;
const DEFAULT_EXAM = {
  title: "Examen práctico",
  examType: "GENERIC",
  badge: "Base",
  description: "Banco general para entrenar comprensión lectora y competencias básicas.",
  questions: "20"
};

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

const SLIDER_ITEMS = [
  {
    title: "Simulacros idénticos al examen real",
    description: "Entrena con experiencia cronometrada, preguntas tipo CNSC y resultados inmediatos.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Análisis detallado de desempeño",
    description: "Visualiza aciertos, errores y categorías para reforzar donde más lo necesitas.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Estudia desde cualquier lugar",
    description: "Acceso desde computador o celular para preparar tu perfil Asistencial, Técnico o Profesional.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Contenido actualizado según CNSC",
    description: "Banco organizado por perfiles, competencias, dificultad y tipo de simulacro.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80"
  }
];

const VALUE_CARDS = [
  {
    icon: <FileQuestion size={24} />,
    title: "Simulacros reales",
    text: "Simulacros idénticos al examen CNSC.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=700&q=80"
  },
  {
    icon: <ChartNoAxesColumnIncreasing size={24} />,
    title: "Análisis de desempeño",
    text: "Identifica tus errores por competencias.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80"
  },
  {
    icon: <BookOpen size={24} />,
    title: "Estudia desde cualquier lugar",
    text: "Accede desde tu celular o computador.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80"
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Contenido actualizado",
    text: "Basado en estructura real de la CNSC.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=700&q=80"
  }
];

const TESTIMONIALS = [
  { name: "María G.", role: "Profesional Universitario", text: "Gracias a ConvocaPro entendí mis debilidades y mejoré muchísimo. Pasé la CNSC en mi primer intento." },
  { name: "Carlos A.", role: "Técnico Administrativo", text: "Los simulacros son idénticos al examen real. La plataforma es intuitiva y muy completa." },
  { name: "Laura P.", role: "Asistencial", text: "Me encantan las explicaciones detalladas, aprendes en cada pregunta que respondes." }
];

const UPCOMING_EXAMS = [
  ["Simulacro 4", "Profesional"],
  ["Simulacro 5", "Técnico"],
  ["Simulacro 6", "Asistencial"],
  ["Simulacro 7", "Mixto"],
  ["Simulacro 8", "Avanzado"],
  ["Simulacro 9", "Final"]
];

function Home({ setPage }) {
  return (
    <>
      <section className="hero neon-home">
        <div className="container grid-hero">
          <div className="card pad hero-main neon-hero-card">
            <div className="badge"><ShieldCheck size={16}/> Plataforma #1 para la CNSC Territorial 12</div>
            <div className="h1">Aprueba la <span>CNSC</span> Territorial 12</div>
            <p className="lead">
              Simulacros reales, preguntas actualizadas, cursos por perfil y análisis inteligente
              para ayudarte a lograr tu mejor resultado.
            </p>
            <div className="hero-kpis">
              <div><FileQuestion size={18}/><b>+10.000</b><small>Preguntas tipo CNSC</small></div>
              <div><Clock size={18}/><b>Simulacros</b><small>Cronometrados</small></div>
              <div><Target size={18}/><b>Resultados</b><small>Inmediatos</small></div>
            </div>
            <div className="actions">
              <button className="btn primary" onClick={() => setPage("auth")}>Comenzar simulacro</button>
              <button className="btn outline" onClick={() => setPage("plans")}>Ver planes</button>
            </div>
          </div>

          <div className="hero-visual card pad">
            <div className="progress-widget">
              <div className="small">Tu progreso</div>
              <div className="progress-ring">72%</div>
              <div className="small">Vas por buen camino</div>
            </div>
            <div className="student-visual">
              <img src={heroGirl} alt="Estudiante CNSC" />
            </div>
          </div>
        </div>
      </section>

      <section className="section neon-section">
        <div className="container neon-slider card pad">
          <button className="slider-arrow">‹</button>
          <div className="slider-grid">
            {SLIDER_ITEMS.map(item => (
              <div className="slider-tile" key={item.title}>
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="slider-arrow">›</button>
        </div>
      </section>

      <section className="section neon-section compact-top">
        <div className="container grid grid-4">
          {VALUE_CARDS.map(card => (
            <div className="value-card" key={card.title}>
              <img src={card.image} alt={card.title} />
              <div className="value-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Plans />

      <section className="section neon-section">
        <div className="container">
          <h2 className="title center">Lo que dicen nuestros aspirantes</h2>
          <div className="grid grid-3">
            {TESTIMONIALS.map(t => (
              <div className="testimonial-card" key={t.name}>
                <div className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="currentColor" />)}</div>
                <p>“{t.text}”</p>
                <b>{t.name}</b>
                <div className="small">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section compact-top neon-section">
        <div className="container stats-strip">
          <div><Users size={34}/><b>12.450+</b><span>Estudiantes activos</span></div>
          <div><GraduationCap size={34}/><b>85%</b><span>Tasa de aprobación</span></div>
          <div><MessageCircle size={34}/><b>320.000+</b><span>Preguntas respondidas</span></div>
          <div><Trophy size={34}/><b>9.800+</b><span>Simulacros realizados</span></div>
        </div>
      </section>

      <section className="section neon-section">
        <div className="container split-showcase">
          <div>
            <div className="section-head-inline">
              <h2 className="title">Simulacros disponibles</h2>
              <button className="link-button" onClick={() => setPage("simulacros")}>Ver todos →</button>
            </div>
            <div className="grid grid-3">
              {["Profesional Universitario", "Técnico Administrativo", "Asistencial"].map((profile, i) => (
                <div className="unit exam-card mini-exam" key={profile}>
                  <div className="badge">Disponible</div>
                  <FileText size={32}/>
                  <h3>Simulacro {i + 1}</h3>
                  <p>{profile}</p>
                  <div className="small">200 preguntas · 2h 30m</div>
                  <button className="btn primary" onClick={() => setPage("simulacros")}>Iniciar simulacro</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="title">Próximamente (6 más)</h2>
            <div className="upcoming-grid">
              {UPCOMING_EXAMS.map(([name, profile]) => (
                <div className="upcoming-card" key={name}>
                  <Lock size={26}/>
                  <b>{name}</b>
                  <span>{profile}</span>
                  <small>Próximamente</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-band">
        <div className="container contact-grid">
          <div>
            <h2 className="title">¿Tienes dudas? Contáctanos</h2>
            <p className="subtitle">Estamos aquí para ayudarte en tu preparación.</p>
            <input className="input" placeholder="Nombre completo" />
            <input className="input" placeholder="Correo electrónico" />
            <textarea className="input" placeholder="Mensaje" rows="4" />
            <button className="btn primary"><Send size={16}/> Enviar mensaje</button>
          </div>
          <div className="support-card card pad">
            <Headphones size={58}/>
            <h3>Escríbenos por nuestros canales</h3>
            <p><MessageCircle size={16}/> WhatsApp: +57 300 123 4567</p>
            <p><Mail size={16}/> soporte@convocapro.com</p>
            <p><Clock size={16}/> Lunes a viernes · 8:00 a.m. - 6:00 p.m.</p>
            <button className="btn primary">Hablar por WhatsApp</button>
          </div>
        </div>
      </section>

      <footer className="footer neon-footer">
        <div className="container footer-grid">
          <div>
            <div className="logo-title">ConvocaPro</div>
            <p>Plataforma líder en simulacros para concursos de mérito. No estamos afiliados a la CNSC.</p>
          </div>
          <div><b>Enlaces rápidos</b><p>Inicio<br/>Simulacros<br/>Cursos<br/>Planes<br/>Contacto</p></div>
          <div><b>Información</b><p>¿Cómo funciona?<br/>Preguntas frecuentes<br/>Términos y condiciones<br/>Política de privacidad</p></div>
          <div><b>Mapa del sitio</b><div className="site-map"><span>Inicio</span><span>Simulacros</span><span>Cursos</span><span>Exámenes</span><span>Planes</span><span>Ayuda</span></div></div>
        </div>
        <div className="footer-bottom">© 2024 ConvocaPro. Todos los derechos reservados.</div>
      </footer>
    </>
  );
}

function Auth({ setUser, setPage }) {
  const [form, setForm] = useState({
    username: "",
    password: ""
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
  const [exams, setExams] = useState([]);
  const [loadingExams, setLoadingExams] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/users/stats`).then(r => r.json()).then(setStats).catch(() => {});

    fetch(`${API}/api/exams`)
      .then(r => r.json())
      .then(data => setExams(Array.isArray(data) ? data : []))
      .catch(() => setExams([]))
      .finally(() => setLoadingExams(false));

    if (user?.userId) {
      fetch(`${API}/api/users/${user.userId}`)
        .then(r => r.json())
        .then(data => {
          const merged = normalizeUser({ ...user, ...data, userId: data.id ?? user.userId });
          saveUser(merged);
          refreshUser(merged);
        })
        .catch(() => {});
    }
  }, []);

  if (!user) return <NeedLogin setPage={setPage} />;

  return (
    <section className="section">
      <div className="container">
        <div className="card pad hero-main">
          <div className="badge"><BarChart3 size={16}/> Simulacros del usuario</div>
          <h1 className="title" style={{ fontSize: "2.7rem", marginTop: 16 }}>
            Hola, {user.fullName || user.username}
          </h1>
          <p className="subtitle">
            Perfil: <b>{user.profile}</b> · Intentos: <b>{user.retriesUsed ?? 0}/{user.retryLimit ?? 3}</b> · Accesos: <b>{user.totalAccesses ?? 0}</b>
          </p>
          <div className="actions">
            <button className="btn primary" onClick={() => setPage("course")}>
              <BookOpen size={16}/> Ir al curso
            </button>
            {user?.role === "ADMIN" && (
              <button className="btn outline" onClick={() => setPage("admin")}>
                <Users size={16}/> Admin
              </button>
            )}
          </div>
        </div>

        <div className="section">
          <h2 className="title">Exámenes disponibles</h2>
          <p className="subtitle">Elige un banco cargado desde la base de datos.</p>

          {loadingExams ? (
            <div className="card pad">Cargando exámenes...</div>
          ) : exams.length === 0 ? (
            <div className="card pad">No hay exámenes activos disponibles.</div>
          ) : (
            <div className="grid grid-3">
              {exams.map(exam => (
                <div className="unit exam-card" key={exam.examType}>
                  <div className="badge">{exam.badge || "Simulacro"}</div>
                  <h3>{exam.title}</h3>
                  <p>{exam.description}</p>
                  <div className="mini">
                    <b>{exam.questions}</b> preguntas
                  </div>
                  <button
                    className="btn dark"
                    onClick={() => {
                      setSelectedExam({
                        ...exam,
                        questions: String(exam.questions)
                      });
                      setPage("exam");
                    }}
                  >
                    Abrir simulacro
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
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
  const [selectedExam, setSelectedExam] = useState(DEFAULT_EXAM);

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
      {page === "plans" && <Plans />}
      {page === "exam" && <FinalExam user={user} selectedExam={selectedExam} refreshUser={setUser} setPage={setPage} />}
      {page === "admin" && (
        user?.role === "ADMIN"
          ? <Admin />
          : <section className="section"><div className="container"><div className="card pad"><h2 className="title">Acceso restringido</h2><p>Solo administradores pueden ver esta sección.</p><button className="btn primary" onClick={() => setPage("simulacros")}>Volver a simulacros</button></div></div></section>
      )}

    </>
  );
}
