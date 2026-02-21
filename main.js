const state = {
  gender: "female",
  imageSelected: false,
};

const animals = [
  {
    name: "강아지상",
    desc: "밝고 친근한 인상이 돋보이며, 주변을 편안하게 만드는 타입입니다.",
  },
  {
    name: "고양이상",
    desc: "또렷한 눈매와 세련된 분위기로 매력을 주는 타입입니다.",
  },
  {
    name: "토끼상",
    desc: "부드럽고 사랑스러운 분위기로 친근하게 다가가는 타입입니다.",
  },
  {
    name: "여우상",
    desc: "도도하고 시크한 무드가 특징인 타입입니다.",
  },
  {
    name: "곰상",
    desc: "따뜻하고 든든한 느낌으로 신뢰를 주는 타입입니다.",
  },
  {
    name: "사슴상",
    desc: "맑고 순수한 이미지로 편안함을 주는 타입입니다.",
  },
  {
    name: "햄스터상",
    desc: "작고 귀여운 인상이 매력 포인트인 타입입니다.",
  },
  {
    name: "늑대상",
    desc: "카리스마 있고 선명한 인상으로 존재감을 주는 타입입니다.",
  },
];

const genderButtons = document.querySelectorAll(".toggle-btn");
const imageInput = document.getElementById("imageInput");
const dropzone = document.getElementById("dropzone");
const preview = document.getElementById("preview");
const analyzeBtn = document.getElementById("analyzeBtn");
const loader = document.getElementById("loader");
const resultSection = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultDesc = document.getElementById("resultDesc");
const resultGender = document.getElementById("resultGender");
const retryBtn = document.getElementById("retryBtn");

function setGender(nextGender) {
  state.gender = nextGender;
  genderButtons.forEach((btn) => {
    const active = btn.dataset.gender === nextGender;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-checked", active ? "true" : "false");
  });
}

genderButtons.forEach((btn) => {
  btn.addEventListener("click", () => setGender(btn.dataset.gender));
});

function updatePreview(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    preview.src = event.target.result;
    preview.classList.add("is-visible");
    state.imageSelected = true;
    analyzeBtn.disabled = false;
  };
  reader.readAsDataURL(file);
}

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  updatePreview(file);
});

["dragenter", "dragover"].forEach((type) => {
  dropzone.addEventListener(type, (event) => {
    event.preventDefault();
    dropzone.classList.add("dragover");
  });
});

["dragleave", "drop"].forEach((type) => {
  dropzone.addEventListener(type, (event) => {
    event.preventDefault();
    dropzone.classList.remove("dragover");
  });
});

dropzone.addEventListener("drop", (event) => {
  const file = event.dataTransfer.files[0];
  if (file) {
    imageInput.files = event.dataTransfer.files;
    updatePreview(file);
  }
});

function pickAnimal() {
  return animals[Math.floor(Math.random() * animals.length)];
}

function showResult() {
  const selected = pickAnimal();
  resultTitle.textContent = selected.name;
  resultDesc.textContent = selected.desc;
  resultGender.textContent = state.gender === "female" ? "여자 결과" : "남자 결과";
  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

analyzeBtn.addEventListener("click", () => {
  if (!state.imageSelected) return;
  analyzeBtn.disabled = true;
  loader.style.display = "flex";
  setTimeout(() => {
    loader.style.display = "none";
    analyzeBtn.disabled = false;
    showResult();
  }, 1200);
});

retryBtn.addEventListener("click", () => {
  resultSection.hidden = true;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

setGender(state.gender);
