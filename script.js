  Tesis: ["Requisito de Tesis"]
};

// Relaciones mínimas para probar (simplificadas para ejemplo)
const correlativas = {
  "Psicología General": ["Biología", "Semiología", "Psicología", "Pensamiento Científico", "Matemática", "Sociedad y Estado"],
  "Estadística": ["Biología", "Semiología", "Psicología", "Pensamiento Científico", "Matemática", "Sociedad y Estado"],
  "Psicología Social": ["Biología", "Semiología", "Psicología", "Pensamiento Científico", "Matemática", "Sociedad y Estado"],
  "Psicoanálisis Freud": ["Biología", "Semiología", "Psicología", "Pensamiento Científico", "Matemática", "Sociedad y Estado"],
  "Psicología y Epistemología Genética": ["Biología", "Semiología", "Psicología", "Pensamiento Científico", "Matemática", "Sociedad y Estado"],
  "Neurofisiología": ["Biología", "Semiología", "Psicología", "Pensamiento Científico", "Matemática", "Sociedad y Estado"],

  "Historia de la Psicología": ["Psicología General"],
  "Psicopatología": ["Psicología General", "Psicoanálisis Freud"],
  "Metodología de la Investigación": ["Psicología General", "Estadística"],
  "Salud Pública y Mental": ["Metodología de la Investigación", "Psicología Social"],
  "Teoría y Técnica de Grupos": ["Psicología Social", "Psicoanálisis Freud"],
  "Ps. Evolutiva Niñez": ["Psicoanálisis Freud", "Psicología y Epistemología Genética"],
  "Ps. Evolutiva Adolescencia": ["Ps. Evolutiva Niñez"],

  "Psicopatología": ["Neurofisiología", "Ps. Evolutiva Adolescencia"],
  "Materia Electiva": ["Psicopatología"],
  "T. y T. de Exploración y Diagnóstico Psicológico Módulo I": ["Psicopatología"],
  "Psicoterapias": ["Psicopatología"],
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
@@ -30,15 +56,23 @@ Object.entries(data).forEach(([block, subjects]) => {
  const col = document.createElement("div");
  col.className = "column";
  const title = document.createElement("h2");
  title.textContent = block === "Tesis" ? "Tesis" : block;
  title.textContent = block;
  col.appendChild(title);

  subjects.forEach(subject => {
    const div = document.createElement("div");
    div.className = "subject disabled";
    if (block === "Tesis") div.classList.add("tesis");
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
@@ -48,13 +82,13 @@ Object.entries(data).forEach(([block, subjects]) => {

function updateState() {
  Object.entries(state).forEach(([name, obj]) => {
    if (obj.approved) return;
    const reqs = Object.entries(correlativas).find(([k]) => k === name);
    if (!reqs || reqs[1].every(r => state[r]?.approved)) {
      if (!obj.el.classList.contains("tesis")) {
        obj.el.classList.remove("disabled");
        obj.el.classList.add("enabled");
      }
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
@@ -64,10 +98,11 @@ grid.addEventListener("click", e => {
  const name = e.target.dataset.name;
  const subject = state[name];
  if (e.target.classList.contains("disabled") || e.target.classList.contains("tesis")) return;

  subject.approved = !subject.approved;
  e.target.classList.toggle("approved", subject.approved);
  e.target.classList.remove("enabled");
  updateState();
});

updateState();
updateState();
