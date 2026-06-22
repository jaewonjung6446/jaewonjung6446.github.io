const projects = [
  {
    title: "AXOL v2",
    image: "assets/axol-v2.png",
    visibility: "Private",
    categories: ["ai", "tooling", "sample"],
    stack: ["Python", "LLM workflow", "Benchmark"],
    summary: "반복되는 에이전트 작업에서 확신 높은 다음 작업만 빠른 경로로 처리하고, 불확실하면 fallback 모델로 넘기는 추론 가속 실험입니다.",
    role: "라우팅/기억/벤치마크 구조 설계",
    clientFocus: "클라이언트 핵심 프로젝트가 아니라, 개발 자동화와 AI 워크플로우 이해도를 보여주는 보조 연구 항목입니다.",
    pmFocus: "실험 목표, 측정 지표, fallback 조건을 분리해 불확실한 연구를 관리 가능한 검증 단위로 나눴습니다.",
    problem: "반복되는 로컬 에이전트 흐름에서 매번 큰 모델을 호출하면 시간과 비용이 커지는 문제가 있었습니다.",
    implementation: "confidence gate, cumulative router, benchmark harness, emit/verify/fallback 결정을 구성했습니다.",
    result: "프로토타입 벤치마크 기반으로 반복 워크플로우에서 fast-path 가능성을 검증했습니다.",
    link: "",
    sampleLabel: "실제 코드 발췌: CumulativeAXOLRouter",
    codeSample: `class CumulativeAXOLRouter:
    """Routes confident next-op transitions through AXOL memory."""

    def route_case(self, case, fallback_ops_fn):
        prefix = tuple()
        predicted = []
        fallback_ops = None

        for _ in range(self.config.max_steps):
            fast = self.try_fast_next(case.text, prefix)
            if fast is not None:
                decision = fast
            else:
                if fallback_ops is None:
                    fallback_ops = fallback_ops_fn()
                next_op = fallback_ops[len(prefix)]
                decision = FastPathDecision(
                    source="TRANSFORMER_FALLBACK",
                    next_op=next_op,
                    confidence=0.0,
                )
            predicted.append(decision.next_op)`
  },
  {
    title: "이자카야 이자코자",
    image: "assets/izakoza.png",
    visibility: "Private",
    categories: ["client", "pm", "tooling", "sample"],
    stack: ["Unity", "C#", "Editor tooling"],
    summary: "이자카야 운영과 카드 전투를 잇는 Unity 프로젝트입니다. 데이터/에셋 편집 병목을 줄이기 위해 디자이너 파이프라인과 검증 도구를 구축했습니다.",
    role: "게임 시스템 구현, 데이터/에셋 파이프라인 개선",
    clientFocus: "카드 전투, 운영 UI, 데이터 기반 콘텐츠 흐름을 Unity 클라이언트 구조 안에서 연결했습니다.",
    pmFocus: "개발자에게 몰리던 XML 작성, 에셋 배치, 검증 작업을 외부 편집/검증 흐름으로 분리했습니다.",
    problem: "데이터 작성과 리소스 배치가 Unity Editor와 개발자에게 집중되어 병렬 작업이 어려웠습니다.",
    implementation: "Unity Editor Extension, XML/JSON export-import, React 편집 화면, import validator를 구성했습니다.",
    result: "반복 입력과 에셋 배치 병목을 줄이고, 개발자와 비개발자가 같은 데이터 흐름에서 작업할 수 있는 기반을 만들었습니다.",
    link: "",
    sampleLabel: "실제 코드 발췌: DesignerAssetPipeline",
    codeSample: `[MenuItem("Izakoza/Designer Pipeline/Apply Request JSON")]
private static void ApplyRequestJsonMenu()
{
    if (!File.Exists(RequestPath))
    {
        EnsureParentDirectory(RequestPath);
        WriteJson(RequestPath, DesignerAssetPipelineRequestManifest.CreateExample());
        AssetDatabase.Refresh();
        Debug.LogWarning($"request 파일이 없어 예시 파일을 생성했습니다: {RequestPath}");
        return;
    }

    DesignerAssetPipelineRequestManifest requestManifest =
        ReadJson<DesignerAssetPipelineRequestManifest>(RequestPath);
    DesignerAssetPipelineApplyReport report = ApplyRequests(requestManifest);
    WriteJson(ReportPath, report);
    AssetDatabase.SaveAssets();
    AssetDatabase.Refresh();
}`
  },
  {
    title: "울려라! 판소리",
    image: "assets/pansori.png",
    visibility: "Sample-only",
    categories: ["client", "pm", "sample"],
    stack: ["Unity", "Game jam", "Minigame architecture"],
    summary: "40시간 게임잼에서 9개 미니게임과 연습 모드를 통합한 프로젝트입니다. 미니게임을 개별 씬이 아닌 프리팹 단위로 묶어 통합 비용을 줄였습니다.",
    role: "개발 리드, 전체 구조, 에디터 도구, 미니게임 통합",
    clientFocus: "미니게임을 prefab 단위로 통합해 GameManager가 로딩과 전환을 제어하는 클라이언트 구조를 만들었습니다.",
    pmFocus: "개발 3명, 기획 1명, 아트 1명 팀에서 일정, 통합 기준, 작업 분담을 잡아 짧은 시간 안에 빌드를 완성했습니다.",
    problem: "약 40시간 안에 9개 미니게임과 연습 모드를 하나의 안정적인 플레이 흐름으로 통합해야 했습니다.",
    implementation: "prefab 기반 미니게임 구조, GameManager 로딩 흐름, 신규 미니게임 코드/폴더 템플릿 생성 흐름을 구성했습니다.",
    result: "통합 빌드를 완성하고 제4회 유니잼 with 컴투스에서 우승했습니다.",
    link: "",
    sampleLabel: "공개용 구조 샘플: 미니게임 프리팹 실행 흐름",
    codeSample: `public interface IMinigame
{
    UniTask RunAsync(MinigameContext context, CancellationToken token);
}

public sealed class MinigameFlow : MonoBehaviour
{
    [SerializeField] private Transform mount;

    public async UniTask PlayAsync(MinigameDefinition definition)
    {
        IMinigame game = Instantiate(definition.prefab, mount)
            .GetComponent<IMinigame>();

        await game.RunAsync(new MinigameContext(score, input, ui), destroyCancellationToken);
        Destroy(((MonoBehaviour)game).gameObject);
    }
}`
  },
  {
    title: "2024 메타버스: 도란도란",
    image: "assets/metaverse-2024.png",
    visibility: "Public",
    categories: ["client", "pm", "ai", "public"],
    stack: ["Unity", "C#", "AI NPC", "TTS"],
    summary: "AI와 TTS를 활용해 가상 섬에서 NPC와 대화하고 감정을 기록하는 메타버스 프로젝트입니다. 공개 저장소와 발표 자료가 연결되어 있습니다.",
    role: "팀장, 개발 총괄, AI 인격체 구현, API 연동",
    clientFocus: "Unity 클라이언트에서 AI NPC 대화, TTS 출력, 다이어리 기능 흐름을 하나의 체험으로 연결했습니다.",
    pmFocus: "팀장으로 AI/API/클라이언트 작업 범위를 조율하고 발표 가능한 결과물 형태로 정리했습니다.",
    problem: "가상 섬에서 NPC와 자연스럽게 대화하고 감정을 기록하는 경험을 구현해야 했습니다.",
    implementation: "GPT 기반 대화 AI, TTS 연동, 다이어리 자동 생성 흐름, Unity 클라이언트 기능을 통합했습니다.",
    result: "2024 메타버스 개발자 경진대회 공개 저장소와 발표 자료로 정리했습니다.",
    link: "https://github.com/jaewonjung6446/metaverse2024",
    codeSample: ""
  },
  {
    title: "여우비",
    image: "assets/yeoubi.png",
    visibility: "Sample-only",
    categories: ["client", "sample"],
    stack: ["Unity", "Narrative interaction", "Prototype"],
    summary: "저장소 공개 여부가 확인되지 않은 프로젝트라 공개 링크 없이 예시 이미지와 코드 샘플만 배치했습니다. 감정/날씨 상태를 플레이 흐름과 연결하는 형태로 소개합니다.",
    role: "프로토타입 구조 설계",
    clientFocus: "상태 기반 연출과 대화 톤을 클라이언트 흐름에 연결하는 프로토타입 구조를 강조합니다.",
    pmFocus: "공개 근거가 제한된 프로젝트이므로 일정/성과보다 공개 가능한 샘플 단위로만 보수적으로 소개합니다.",
    problem: "감정 상태와 날씨 연출을 플레이 장면의 분위기 변화로 연결해야 했습니다.",
    implementation: "WeatherMood 상태에 따라 비주얼 레이어, 조명, 대화 톤을 전환하는 구조로 정리했습니다.",
    result: "공개 저장소 없이 샘플 코드와 예시 이미지 중심으로 노출합니다.",
    link: "",
    sampleLabel: "공개용 샘플: 상태 기반 장면 전환",
    codeSample: `public enum WeatherMood
{
    Clear,
    Drizzle,
    Sunshower
}

public sealed class MoodSceneDirector : MonoBehaviour
{
    public void Apply(WeatherMood mood)
    {
        rainLayer.SetActive(mood != WeatherMood.Clear);
        lightRig.intensity = mood == WeatherMood.Sunshower ? 1.2f : 0.72f;
        dialogue.SetTone(mood.ToString());
    }
}`
  },
  {
    title: "Super Light Brothers",
    image: "assets/super-light-brothers.png",
    visibility: "Public",
    categories: ["client", "public"],
    stack: ["Unity", "Team project", "Light mechanic"],
    summary: "현재 확인 가능한 공개 저장소 `UniLIght`와 연결해 둔 산학협력 프로젝트입니다. 빛을 핵심 키워드로 한 팀 프로젝트 항목으로 정리했습니다.",
    role: "Unity 프로젝트 구현 참여",
    clientFocus: "빛 기믹을 중심으로 한 Unity 팀 프로젝트 구현 경험을 보여주는 공개 항목입니다.",
    pmFocus: "산학협력 프로젝트 맥락에서 팀 작업과 결과물 정리 경험을 보조적으로 보여줍니다.",
    problem: "팀 프로젝트에서 빛을 핵심 상호작용 요소로 구현해야 했습니다.",
    implementation: "Unity 프로젝트 구조 안에서 빛 기믹과 플레이 흐름을 연결하는 작업에 참여했습니다.",
    result: "공개 저장소 `UniLIght`로 연결해 확인 가능한 프로젝트로 배치했습니다.",
    link: "https://github.com/jaewonjung6446/UniLIght",
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
