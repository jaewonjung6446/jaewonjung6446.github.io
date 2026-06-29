const projects = [
  {
    title: "이자카야 이자코자 · Gameplay System Samples",
    image: "assets/izakoza.png",
    visibility: "Sample-only",
    categories: ["client", "pm", "tooling", "sample"],
    stack: ["Unity", "C#", "Save/Load", "Gameplay System"],
    summary: "상용 예정 Unity/Spine 기반 로그라이트 덱빌딩 프로젝트에서 담당한 세이브/로드, 상점·인벤토리, 인카운터·보상, 전투 진입 연결부를 공개 가능한 형태로 축약한 샘플입니다.",
    role: "Unity 클라이언트 개발, 게임플레이 시스템 구현, 기능 통합 조율",
    clientFocus: "PlayerData 기반 진행 상태 저장, 구매/보상/전투 진입 연결부, 저장 실패 rollback처럼 플레이 흐름을 보호하는 시스템 구현 역량을 보여줍니다.",
    pmFocus: "기획 데이터, 런타임 저장 데이터, UI 흐름, 보상 처리, 전투 진입 연결부가 어긋나지 않도록 통합 기준을 정리했습니다.",
    problem: "상점 구매, 이벤트 보상, 전투 진입처럼 서로 다른 기능이 같은 플레이어 진행 상태를 안전하게 공유해야 했습니다.",
    implementation: "정적 XML/JSON 데이터와 PlayerData 저장 데이터를 분리하고, 변경 전 snapshot을 만든 뒤 저장 성공 후에만 구매·보상 결과를 확정하는 흐름으로 설계했습니다.",
    result: "세이브/로드, 상점·인벤토리, 인카운터·보상, pending combat 진입 흐름을 하나의 플레이 루프로 연결했습니다.",
    link: "https://github.com/jaewonjung6446/jaewonjung6446.github.io/tree/main/samples/izakoza-gameplay",
    sampleLabel: "공개용 구조 샘플: PlayerData transaction",
    codeSample: `public SaveResult RunTransaction(string reason, Action<PlayerData> applyChanges)
{
    PlayerData snapshot = current.Clone();

    try
    {
        applyChanges.Invoke(current);
        current.Normalize();
    }
    catch (Exception ex)
    {
        current = snapshot;
        return SaveResult.Fail($"Change failed: {reason} / {ex.Message}");
    }

    SaveResult saveResult = store.Save(current);
    if (saveResult.Success)
        return saveResult;

    current = snapshot;
    return SaveResult.Fail($"Save failed and rolled back: {reason}");
}`
  },
  {
    title: "울려라! 판소리 · Microgame Framework",
    image: "assets/pansori.png",
    visibility: "Sample-only",
    categories: ["client", "pm", "sample"],
    stack: ["Unity", "C#", "Game Jam", "Editor Tool"],
    summary: "40시간 게임잼 우승 프로젝트에서 9개 미니게임과 연습 모드를 Prefab 기반 구조로 통합한 경험을 공개용 샘플로 정리했습니다.",
    role: "개발 리드, 미니게임 통합 구조 설계, Editor Tool 구현",
    clientFocus: "개별 미니게임은 자기 규칙에 집중하고, 실행·종료·결과 보고는 공통 manager가 처리하는 클라이언트 구조를 보여줍니다.",
    pmFocus: "개발 3명, 기획 1명, 아트 1명 팀에서 제한 시간 안에 통합 가능한 구조와 작업 기준을 먼저 정했습니다.",
    problem: "약 40시간 안에 9개 미니게임과 연습 모드를 하나의 안정적인 플레이 흐름으로 통합해야 했습니다.",
    implementation: "미니게임을 개별 씬이 아니라 Prefab 단위로 실행하고, 공통 lifecycle interface와 template creator로 통합 비용을 줄였습니다.",
    result: "제4회 유니잼 with 컴투스 우승 프로젝트를 완성했습니다.",
    link: "https://github.com/jaewonjung6446/jaewonjung6446.github.io/tree/main/samples/pansori-microgame-framework",
    sampleLabel: "공개용 구조 샘플: 공통 미니게임 생명주기",
    codeSample: `public abstract class MicrogameBase : MonoBehaviour, IMicrogame
{
    private bool ended;
    public event Action<MicrogameResult> ResultReported;

    public virtual void StartGame(MicrogameContext context)
    {
        ended = false;
    }

    protected void ReportResult(bool success)
    {
        if (ended) return;
        ended = true;
        ResultReported?.Invoke(new MicrogameResult(GameName, success));
    }
}`
  },
  {
    title: "DIET · Unity Data Pipeline Sample",
    image: "assets/izakoza.png",
    visibility: "Sample-only",
    categories: ["client", "pm", "tooling", "sample"],
    stack: ["Unity", "C#", "XML/JSON", "Editor Tool"],
    summary: "Unity 내부 XML/C# 데이터를 schema, relations, snapshot으로 export하고, 외부 변경 요청을 validate 후 apply하는 데이터·에셋 파이프라인 샘플입니다.",
    role: "Unity 데이터·에셋 파이프라인 설계 및 구현",
    clientFocus: "기획 데이터와 런타임 로딩 경로가 어긋나지 않도록 export/validate/apply 흐름과 XML adapter를 구성한 경험을 보여줍니다.",
    pmFocus: "비개발자도 안전하게 데이터·에셋 작업에 참여할 수 있도록 작업 병목을 구조와 도구로 분리했습니다.",
    problem: "마감 직전 XML 작성, 에셋 배치, 검증 작업이 Unity Editor와 특정 개발자에게 집중되는 문제가 있었습니다.",
    implementation: "schema/relations/snapshot export, stale snapshot 검증, dry-run validate, apply/report 흐름을 Unity Editor 메뉴로 묶었습니다.",
    result: "반복 데이터 입력과 배치 작업을 외부 편집·검증 흐름으로 분리할 수 있는 기반을 만들었습니다.",
    link: "https://github.com/jaewonjung6446/jaewonjung6446.github.io/tree/main/samples/diet-unity-pipeline",
    sampleLabel: "공개용 구조 샘플: stale snapshot validation",
    codeSample: `if (manifest.baseSnapshotHash != current.snapshotHash)
{
    return new DietValidationReport
    {
        staleSnapshot = true,
        rejectedCount = manifest.changes.Length,
        message = "Export again before applying changes."
    };
}`
  },
  {
    title: "unity-mcp",
    image: "assets/super-light-brothers.png",
    visibility: "Public",
    categories: ["tooling", "public"],
    stack: ["Unity", "C#", "TypeScript", "MCP"],
    summary: "Unity Editor와 MCP client를 Node.js MCP Server, WebSocket, C# Editor package로 연결하는 Editor automation bridge입니다.",
    role: "Unity Editor automation 구조 설계 및 구현",
    clientFocus: "Unity Editor 상태 조회, 씬/에셋/UI/QA 자동화처럼 개발 생산성을 높이는 툴링 역량을 보여줍니다.",
    pmFocus: "반복 QA와 에디터 조작을 도구화해 팀의 확인 비용을 줄이는 방향의 워크플로우 설계 경험입니다.",
    problem: "Unity Editor 작업과 외부 agent workflow 사이의 연결 지점이 필요했습니다.",
    implementation: "STDIO 기반 MCP server와 Unity Editor WebSocket bridge, C# tool handler 구조를 구성했습니다.",
    result: "Unity Editor automation을 위한 공개 저장소로 정리했습니다.",
    link: "https://github.com/jaewonjung6446/unity-mcp",
    codeSample: ""
  },
  {
    title: "도란도란 · Metaverse 2024",
    image: "assets/metaverse-2024.png",
    visibility: "Public",
    categories: ["client", "pm", "ai", "public"],
    stack: ["Unity", "C#", "AI NPC", "STT/TTS"],
    summary: "AI NPC, STT/GPT/TTS, 다이어리 기능을 Unity 클라이언트 안에서 하나의 대화 경험으로 연결한 메타버스 프로젝트입니다.",
    role: "팀장, 개발 총괄, AI 인격체 구현, API 연동",
    clientFocus: "Unity 클라이언트에서 음성 입력, AI 응답, TTS 출력, 대화 로그 기반 다이어리 흐름을 하나의 사용자 경험으로 연결했습니다.",
    pmFocus: "AI/API/클라이언트/디자인/사운드 작업 범위를 발표 가능한 결과물 형태로 조율했습니다.",
    problem: "NPC와 대화하고 감정을 기록하는 경험을 Unity 클라이언트 안에서 자연스럽게 이어야 했습니다.",
    implementation: "AudioRecorder, STT, GPT, TTS, 다이어리 생성 흐름을 Unity UI 상태 전환과 연결했습니다.",
    result: "2024 메타버스 개발자 경진대회 공개 저장소와 발표 자료로 정리했습니다.",
    link: "https://github.com/jaewonjung6446/metaverse2024",
    codeSample: ""
  }
];

const projectGrid = document.querySelector("#projectGrid");
const sampleList = document.querySelector("#sampleList");
const filterButtons = document.querySelectorAll("[data-filter]");
const roleButtons = document.querySelectorAll("[data-role]");
const modal = document.querySelector("#projectModal");
const modalClose = modal.querySelector(".modal-close");
const modalImage = document.querySelector("#modalImage");
const modalMeta = document.querySelector("#modalMeta");
const modalTitle = document.querySelector("#modalTitle");
const modalSummary = document.querySelector("#modalSummary");
const modalFacts = document.querySelector("#modalFacts");
const modalActions = document.querySelector("#modalActions");

let activeFilter = "all";
let activeRole = "client";

function visibilityClass(visibility) {
  return visibility === "Public" ? "public" : "private";
}

function roleFocus(project) {
  return activeRole === "pm" ? project.pmFocus : project.clientFocus;
}

function projectMatches(project) {
  if (activeFilter === "all") {
    return true;
  }
  return project.categories.includes(activeFilter);
}

function projectCard(project, index) {
  const actions = project.link
    ? `<a class="primary-link" href="${project.link}" target="_blank" rel="noreferrer">GitHub 보기</a>`
    : `<a class="text-link" href="#samples">코드 샘플 보기</a>`;

  const hiddenClass = projectMatches(project) ? "" : " is-hidden";

  return `
    <article class="project-card reveal${hiddenClass}" data-index="${index}" tabindex="0">
      <img src="${project.image}" alt="${project.title} 예시 이미지" loading="lazy">
      <div class="project-body">
        <div class="project-meta">
          <span class="tag ${visibilityClass(project.visibility)}">${project.visibility}</span>
          ${project.stack.map((item) => `<span class="tag">${item}</span>`).join("")}
        </div>
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
        <p><strong>역할:</strong> ${project.role}</p>
        <p class="role-focus"><strong>${activeRole === "pm" ? "PM 관점:" : "클라이언트 관점:"}</strong> ${roleFocus(project)}</p>
        <div class="project-actions">
          <button class="text-link detail-button" type="button" data-open="${index}">자세히</button>
          ${actions}
        </div>
      </div>
    </article>
  `;
}

function sampleItem(project, index) {
  if (!project.codeSample) {
    return "";
  }

  return `
    <article class="sample-item reveal" id="sample-${index}">
      <div class="sample-copy">
        <p class="eyebrow">${project.visibility}</p>
        <h3>${project.title}</h3>
        <p>${project.sampleLabel}</p>
        <button class="text-link copy-button" type="button" data-copy="${index}">Copy code</button>
      </div>
      <details class="sample-code">
        <summary>코드 펼치기</summary>
        <pre><code>${escapeHtml(project.codeSample)}</code></pre>
      </details>
    </article>
  `;
}

function factRow(label, value) {
  return `<div><dt>${label}</dt><dd>${value}</dd></div>`;
}

function openModal(index) {
  const project = projects[index];
  modalImage.src = project.image;
  modalImage.alt = `${project.title} 예시 이미지`;
  modalMeta.textContent = `${project.visibility} · ${project.stack.join(" · ")}`;
  modalTitle.textContent = project.title;
  modalSummary.textContent = project.summary;
  modalFacts.innerHTML = [
    factRow("Problem", project.problem),
    factRow("Implementation", project.implementation),
    factRow("Result", project.result),
    factRow(activeRole === "pm" ? "PM Focus" : "Client Focus", roleFocus(project))
  ].join("");
  modalActions.innerHTML = project.link
    ? `<a class="primary-link" href="${project.link}" target="_blank" rel="noreferrer">GitHub 보기</a>`
    : `<a class="primary-link" href="#sample-${index}">코드 샘플 보기</a>`;

  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderProjects() {
  projectGrid.innerHTML = projects.map(projectCard).join("");
  observeReveals();
}

function renderSamples() {
  sampleList.innerHTML = projects.map(sampleItem).join("");
  observeReveals();
}

function setActiveButton(buttons, target) {
  buttons.forEach((button) => {
    button.classList.toggle("is-active", button === target);
  });
}

function updateFilter(button) {
  activeFilter = button.dataset.filter;
  setActiveButton(filterButtons, button);
  renderProjects();
}

function updateRole(button) {
  activeRole = button.dataset.role;
  setActiveButton(roleButtons, button);
  renderProjects();
}

function copyCode(index, button) {
  const code = projects[index].codeSample;
  const done = () => {
    button.textContent = "Copied";
    setTimeout(() => {
      button.textContent = "Copy code";
    }, 1300);
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(code).then(done).catch(() => fallbackCopy(code, done));
  } else {
    fallbackCopy(code, done);
  }
}

function fallbackCopy(text, done) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  done();
}

let revealObserver;
function observeReveals() {
  if (revealObserver) {
    revealObserver.disconnect();
  }

  const elements = document.querySelectorAll(".reveal:not(.is-hidden)");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  elements.forEach((element) => revealObserver.observe(element));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => updateFilter(button));
});

roleButtons.forEach((button) => {
  button.addEventListener("click", () => updateRole(button));
});

projectGrid.addEventListener("click", (event) => {
  const openButton = event.target.closest("[data-open]");
  if (openButton) {
    openModal(Number(openButton.dataset.open));
    return;
  }

  const card = event.target.closest(".project-card");
  if (card && !event.target.closest("a, button")) {
    openModal(Number(card.dataset.index));
  }
});

projectGrid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }
  const card = event.target.closest(".project-card");
  if (card) {
    openModal(Number(card.dataset.index));
  }
});

sampleList.addEventListener("click", (event) => {
  const copyButton = event.target.closest("[data-copy]");
  if (copyButton) {
    copyCode(Number(copyButton.dataset.copy), copyButton);
  }
});

modal.addEventListener("click", (event) => {
  if (event.target === modal || event.target.closest(".modal-close")) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeModal();
  }
});

renderProjects();
renderSamples();
