const data = {
  CBC: ["Biología", "Semiología", "Psicología", "Pensamiento Científico", "Matemática", "Sociedad y Estado"],
  Bloque1: ["Psicología General", "Estadística", "Psicología Social", "Psicoanálisis Freud", "Psicología y Epistemología Genética", "Neurofisiología"],
  Bloque2: ["Historia de la Psicología", "Metodología de la Investigación", "Salud Pública y Mental", "Teoría y Técnica de Grupos", "Ps. Evolutiva Niñez", "Ps. Evolutiva Adolescencia"],
  Bloque3: ["Psicopatología", "Materia Electiva", "T. y T. de Exploración y Diagnóstico Psicológico Módulo I", "T. y T. de Exploración y Diagnóstico Psicológico Módulo II", "Materia Electiva", "Requisito de Idioma"],
  Bloque4: ["Psicología Educacional", "Ps. Ética y Derechos Humanos", "Psicología Institucional", "Psicología del Trabajo", "Clínica de Adultos", "Psicología Jurídica"],
  Bloque5: ["Psicoterapias", "Práctica Profesional o de Investigación", "Materia Electiva", "Materia Electiva", "Materia Electiva"],
  Tesis: ["Requisito de Tesis"]
};

// Relaciones mínimas para probar (simplificadas para ejemplo)
const correlativas = {
  "Historia de la Psicología": ["Psicología General"],
  "Psicopatología": ["Psicología General", "Psicoanálisis Freud"],
  "T. y T. de Exploración y Diagnóstico Psicológico Módulo I": ["Psicopatología"],
  "Psicoterapias": ["Psicopatología"],
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
  title.textContent = block === "Tesis" ? "Tesis" : block;
  col.appendChild(title);

  subjects.forEach(subject => {
    const div = document.createElement("div");
    div.className = "subject disabled";
    if (block === "Tesis") div.classList.add("tesis");
    div.textContent = subject;
    div.dataset.name = subject;
    col.appendChild(div);
    state[subject] = { el: div, approved: false };
  });

  grid.appendChild(col);
});

function updateState() {
  Object.entries(state).forEach(([name, obj]) => {
    if (obj.approved) return;
    const reqs = Object.entries(correlativas).find(([k]) => k === name);
    if (!reqs || reqs[1].every(r => state[r]?.approved)) {
      if (!obj.el.classList.contains("tesis")) {
        obj.el.classList.remove("disabled");
        obj.el.classList.add("enabled");
      }
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