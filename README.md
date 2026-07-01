# Jae Won Jung Portfolio Hub

Unity Gameplay & Client Programmer 채용 검토용 GitHub Pages 허브입니다.

이 저장소는 **짧은 공개 입구 + 검토 가능한 코드 샘플 + 상세 Notion 문서 연결**을 목표로 합니다. 상용/팀 프로젝트 원본 코드는 공개하지 않고, 공개 가능한 구조 샘플과 기술 문서로 구현 범위를 설명합니다.

## Public Routes

| Route | Purpose |
|---|---|
| `/` | recruiter용 30초 랜딩 페이지 |
| `/resume/` | 개인정보를 최소화한 공개 이력서 HTML |
| `/portfolio/` | 상세 Notion 포트폴리오 연결 및 권장 읽기 순서 |
| `/samples/` | 공개 가능한 코드 샘플 허브 |
| `/github/` | GitHub profile cleanup / pinned repository 전략 |
| `/demo/izakoza/` | 이자코자 Gameplay System 요약 |
| `/demo/diet/` | DIET Unity Data Pipeline 요약 |

## Focus

- Unity Gameplay System
- Save/Load & PlayerData
- Shop / Inventory / Reward Flow
- Encounter & Combat Entry Flow
- Unity Editor Tooling
- Data Pipeline

## Featured Portfolio Set

### Izakoza Gameplay System Samples

상용 예정 Unity/Spine 기반 로그라이트 덱빌딩 프로젝트에서 담당한 세이브/로드, 상점·인벤토리, 인카운터·보상, 전투 진입 연결부를 공개 가능한 형태로 축약한 샘플입니다.

- PlayerData 기반 진행 상태 저장
- `.tmp / .bak` 기반 안전 저장
- 저장 실패 시 snapshot rollback
- 상점 구매 검증 / 결제 / 지급 / 저장 확정 흐름
- 인카운터 완료 기록과 보상 중복 방지

문서: [`samples/izakoza-gameplay/README.md`](samples/izakoza-gameplay/README.md)

### Pansori Microgame Framework

40시간 게임잼 우승 프로젝트에서 사용한 미니게임 통합 구조를 공개용으로 정리한 샘플입니다.

- 9개 미니게임 Prefab 기반 통합
- 공통 생명주기 인터페이스
- 실행 / 종료 / 결과 보고 흐름 분리
- 신규 미니게임 템플릿 생성 Unity Editor Tool

문서: [`samples/pansori-microgame-framework/README.md`](samples/pansori-microgame-framework/README.md)

### DIET Unity Data Pipeline Sample

Unity 내부 XML/C# 데이터를 외부 편집 가능한 `schema`, `relations`, `snapshot`으로 export하고, 외부 변경 요청을 validate 후 apply하는 데이터 파이프라인 샘플입니다.

- Export / Validate / Apply workflow
- stale snapshot 방지
- 기존 XML 런타임 로딩 경로와의 호환
- 비개발자 데이터·에셋 작업 병목 완화

문서: [`samples/diet-unity-pipeline/README.md`](samples/diet-unity-pipeline/README.md)

## Public Repositories

- [`unity-mcp`](https://github.com/jaewonjung6446/unity-mcp): Unity Editor와 MCP client를 연결하는 Editor automation bridge
- [`metaverse2024`](https://github.com/jaewonjung6446/metaverse2024): AI NPC, STT/GPT/TTS, 다이어리 기능을 Unity 클라이언트 경험으로 연결한 메타버스 프로젝트

## GitHub Profile Cleanup

채용용 GitHub 정리 체크리스트와 profile README 초안은 아래 문서에 정리했습니다.

- [`docs/github-cleanup-checklist.md`](docs/github-cleanup-checklist.md)
- [`PROFILE_README_DRAFT.md`](PROFILE_README_DRAFT.md)

## Current Structure

```text
jaewonjung6446.github.io/
├── index.html
├── resume/
│   └── index.html
├── portfolio/
│   └── index.html
├── samples/
│   ├── index.html
│   ├── izakoza-gameplay/
│   ├── pansori-microgame-framework/
│   └── diet-unity-pipeline/
├── github/
│   └── index.html
├── demo/
│   ├── izakoza/
│   └── diet/
├── docs/
│   └── github-cleanup-checklist.md
├── robots.txt
├── sitemap.xml
└── 404.html
```

## Policy

- 공개 가능한 샘플만 저장소에 포함합니다.
- 상용 프로젝트 원본 코드, 비공개 팀 리소스, 에셋 원본은 포함하지 않습니다.
- 공개 이력서에는 생년월일, 전화번호, 주소를 포함하지 않습니다.
- 샘플 코드는 구조와 판단 기준을 보여주기 위한 축약본입니다.
