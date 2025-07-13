const data = {
  CBC: ["Biología", "Semiología", "Psicología", "Pensamiento Científico", "Matemática", "Sociedad y Estado"],
  Bloque1: ["Psicología General", "Estadística", "Psicología Social", "Psicoanálisis Freud", "Psicología y Epistemología Genética", "Neurofisiología"],
  Bloque2: ["Historia de la Psicología", "Metodología de la Investigación", "Salud Pública y Mental", "Teoría y Técnica de Grupos", "Ps. Evolutiva Niñez", "Ps. Evolutiva Adolescencia"],
  Bloque3: ["Psicopatología", "Materia Electiva", "T. y T. de Exploración y Diagnóstico Psicológico Módulo I", "T. y T. de Exploración y Diagnóstico Psicológico Módulo II", "Materia Electiva", "Requisito de Idioma"],
  Bloque4: ["Psicología Educacional", "Ps. Ética y Derechos Humanos", "Psicología Institucional", "Psicología del Trabajo", "Clínica de Adultos", "Psicología Jurídica"],
  Bloque5: ["Psicoterapias", "Práctica Profesional o de Investigación", "Materia Electiva", "Materia Electiva", "Materia Electiva"],
  Tesis: ["Requisito de Tesis"]
};

const correlativas = {
  "Psicología General": ["Biología", "Semiología", "Psicología", "Pensamiento Científico", "Matemática", "Sociedad y Estado"],
  "Estadística": ["Biología", "Semiología", "Psicología", "Pensamiento Científico", "Matemática", "Sociedad y Estado"],
  "Psicología Social": ["Biología", "Semiología", "Psicología", "Pensamiento Científico", "Matemática", "Sociedad y Estado"],
  "Psicoanálisis Freud": ["Biología", "Semiología", "Psicología", "Pensamiento Científico", "Matemática", "Sociedad y Estado"],
  "Psicología y Epistemología Genética": ["Biología", "Semiología", "Psicología", "Pensamiento Científico", "Matemática", "Sociedad y Estado"],
  "Neurofisiología": ["Biología", "Semiología", "Psicología", "Pensamiento Científico", "Matemática", "Sociedad y Estado"],

  "Historia de la Psicología": ["Psicología General"],
  "Metodología de la Investigación": ["Psicología General", "Estadística"],
  "Salud Pública y Mental": ["Metodología de la Investigación", "Psicología Social"],
  "Teoría y Técnica de Grupos": ["Psicología Social", "Psicoanálisis Freud"],
  "Ps. Evolutiva Niñez": ["Psicoanálisis Freud", "Psicología y Epistemología Genética"],
  "Ps. Evolutiva Adolescencia": ["Ps. Evolutiva Niñez"],

  "Psicopatología": ["Neurofisiología", "Ps. Evolutiva Adolescencia"],
  "Materia Electiva": ["Psicopatología"],
  "T. y T. de Exploración y Diagnóstico Psicológico Módulo I": ["Psicopatología"],
  "T. y T. de Exploración y Diagnóstico Psicológico Módulo II": ["Psicopatología"],
  "Requisito de Idioma": ["Psicopatología"],

  "Ps. Ética y Derechos Humanos": ["Historia de la Psicología", "Psicología Social"],
  "Psicología Educacional": ["Ps. Evolutiva Adolescencia", "Salud Pública y Mental", "Teoría y Técnica de Grupos"],
  "Psicología Institucional": ["Salud Pública y Mental", "Teoría y Técnica de Grupos"],
  "Psicología del Trabajo": ["Salud Pública y Mental", "Teoría y Técnica de Grupos", "T. y T. de Exploración y Diagnóstico Psicológico Módulo II"],
  "Clínica de Adultos": ["T. y T. de Exploración y Diagnóstico Psicológico Módulo II"],
  "Psicología Jurídica": ["T. y T. de Exploración y Diagnóstico Psicológico Módulo II"],

  "Psicoterapias": ["T. y T. de Exploración y Diagnóstico Psicológico Módulo II"],
  "Práctica Profesional o de Investigación": ["T. y T. de Exploración y Diagnóstico Psicológico Módulo II"],
  "Materia Electiva": ["T. y T. de Exploración y Diagnóstico Psicológico Módulo II"],

  "Requisito de Tesis": [
    "Psicoterapias",
    "Práctica Profesional o de Investigación",
    "Materia Electiva",
    "Materia Electiva",
    "Materia Electiva"
  ]
};

const state = {};
const grid = document.getElementById("grid");

Object.entries(data).forEach(([block, subjects]) => {
  const col = document.createElement("div");
  col.className = "column";
  const title = document.createElement("h2");
  title.textContent = block;
  col.appendChild(title);

  subjects.forEach(subject => {
    const div = document.createElement("div");
    div.className = "subject";
    div.textContent = subject;
    div.dataset.name = subject;

    if (block === "CBC") {
      div.classList.add("enabled");
    } else if (block === "Tesis") {
      div.classList.add("tesis", "disabled");
    } else {
      div.classList.add("disabled");
    }

    col.appendChild(div);
    state[subject] = { el: div, approved: false };
  });

  grid.appendChild(col);
});

function updateState() {
  Object.entries(state).forEach(([name, obj]) => {
    if (obj.approved || obj.el.classList.contains("enabled")) return;
    const reqs = correlativas[name];
    if (!reqs) return;
    const allApproved = reqs.every(r => state[r]?.approved);
    if (allApproved) {
      obj.el.classList.remove("disabled");
      obj.el.classList.add("enabled");
    }
  });
}

grid.addEventListener("click", e => {
  if (!e.target.classList.contains("subject")) return;
  const name = e.target.dataset.name;
  const subject = state[name];
  if (e.target.classList.contains("disabled") || e.target.classList.contains("tesis")) return;

  subject.approved = !subject.approved;
  e.target.classList.toggle("approved", subject.approved);
  e.target.classList.remove("enabled");
  updateState();
});

updateState();
