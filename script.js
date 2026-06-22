const projects = [
  {
    title: "AXOL v2",
    image: "assets/axol-v2.png",
    visibility: "Private",
    stack: ["Python", "LLM workflow", "Benchmark"],
    summary: "반복되는 에이전트 작업에서 확신 높은 다음 작업만 빠른 경로로 처리하고, 불확실하면 fallback 모델로 넘기는 추론 가속 실험입니다.",
    role: "라우팅/기억/벤치마크 구조 설계",
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
    stack: ["Unity", "C#", "Editor tooling"],
    summary: "이자카야 운영과 카드 전투를 잇는 Unity 프로젝트입니다. 데이터/에셋 편집 병목을 줄이기 위해 디자이너 파이프라인과 검증 도구를 구축했습니다.",
    role: "게임 시스템 구현, 데이터/에셋 파이프라인 개선",
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
    stack: ["Unity", "Game jam", "Minigame architecture"],
    summary: "40시간 게임잼에서 9개 미니게임과 연습 모드를 통합한 프로젝트입니다. 미니게임을 개별 씬이 아닌 프리팹 단위로 묶어 통합 비용을 줄였습니다.",
    role: "개발 리드, 전체 구조, 에디터 도구, 미니게임 통합",
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
    stack: ["Unity", "C#", "AI NPC", "TTS"],
    summary: "AI와 TTS를 활용해 가상 섬에서 NPC와 대화하고 감정을 기록하는 메타버스 프로젝트입니다. 공개 저장소와 발표 자료가 연결되어 있습니다.",
    role: "팀장, 개발 총괄, AI 인격체 구현, API 연동",
    link: "https://github.com/jaewonjung6446/metaverse2024",
    codeSample: ""
  },
  {
    title: "여우비",
    image: "assets/yeoubi.png",
    visibility: "Sample-only",
    stack: ["Unity", "Narrative interaction", "Prototype"],
    summary: "저장소 공개 여부가 확인되지 않은 프로젝트라 공개 링크 없이 예시 이미지와 코드 샘플만 배치했습니다. 감정/날씨 상태를 플레이 흐름과 연결하는 형태로 소개합니다.",
    role: "프로토타입 구조 설계",
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
    stack: ["Unity", "Team project", "Light mechanic"],
    summary: "현재 확인 가능한 공개 저장소 `UniLIght`와 연결해 둔 산학협력 프로젝트입니다. 빛을 핵심 키워드로 한 팀 프로젝트 항목으로 정리했습니다.",
    role: "Unity 프로젝트 구현 참여",
    link: "https://github.com/jaewonjung6446/UniLIght",
    codeSample: ""
  }
];

const projectGrid = document.querySelector("#projectGrid");
const sampleList = document.querySelector("#sampleList");

function visibilityClass(visibility) {
  return visibility === "Public" ? "public" : "private";
}

function projectCard(project) {
  const actions = project.link
    ? `<a class="primary-link" href="${project.link}" target="_blank" rel="noreferrer">GitHub 보기</a>`
    : `<a class="text-link" href="#samples">코드 샘플 보기</a>`;

  return `
    <article class="project-card">
      <img src="${project.image}" alt="${project.title} 예시 이미지" loading="lazy">
      <div class="project-body">
        <div class="project-meta">
          <span class="tag ${visibilityClass(project.visibility)}">${project.visibility}</span>
          ${project.stack.map((item) => `<span class="tag">${item}</span>`).join("")}
        </div>
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
        <p><strong>역할:</strong> ${project.role}</p>
        <div class="project-actions">${actions}</div>
      </div>
    </article>
  `;
}

function sampleItem(project) {
  if (!project.codeSample) {
    return "";
  }

  return `
    <article class="sample-item">
      <div class="sample-copy">
        <p class="eyebrow">${project.visibility}</p>
        <h3>${project.title}</h3>
        <p>${project.sampleLabel}</p>
      </div>
      <pre><code>${escapeHtml(project.codeSample)}</code></pre>
    </article>
  `;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

projectGrid.innerHTML = projects.map(projectCard).join("");
sampleList.innerHTML = projects.map(sampleItem).join("");
