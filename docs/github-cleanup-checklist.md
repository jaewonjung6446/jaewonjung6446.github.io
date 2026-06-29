# GitHub Cleanup Checklist

채용용 GitHub 프로필을 Unity Gameplay & Client Programmer 포지션에 맞게 정리하기 위한 체크리스트입니다.

## 1. 비공개 또는 아카이브 권장 저장소

아래 저장소는 현재 포트폴리오 대표 근거로 사용하지 않으므로 공개 노출을 줄이는 것이 좋습니다.

- `survival`
- `survival_jaewon`
- `MobileProject`
- `Portfolio_jaewon`
- `izakoza-dialogue-editor`

권장 처리 순서:

1. GitHub에서 해당 repository로 이동
2. `Settings` → `General`
3. `Danger Zone`
4. `Change repository visibility`
5. `Make private` 선택
6. 확인 문구 입력 후 저장

이미 private인 저장소는 그대로 유지합니다.

## 2. 공개 유지 권장 저장소

### `unity-mcp`

Unity Editor automation / MCP bridge 역량을 보여주는 공개 툴링 프로젝트로 유지합니다.

권장 보강:

- repository description 설정
- topics 추가: `unity`, `mcp`, `editor-tool`, `csharp`, `typescript`, `automation`
- pinned repository에 포함

### `jaewonjung6446.github.io`

포트폴리오 허브로 유지합니다.

권장 보강:

- README를 채용용 포트폴리오 허브로 사용
- 공개 샘플 문서와 연결
- GitHub Pages 배포 상태 확인

### `metaverse2024`

도란도란 프로젝트 공개 근거로 유지합니다.

권장 보강:

- README 상단에 담당 역할과 Unity 클라이언트 구현 범위 추가
- 시스템 구조 다이어그램 추가
- API key, token, 민감 정보가 없는지 재확인

## 3. 신규 저장소 생성 권장

가능하면 아래 3개 저장소를 별도로 만들고 pinned repository에 배치합니다.

### `izakoza-gameplay-samples`

목적: 이자코자 private 원본 코드를 대체하는 공개 코드 샘플 저장소

포함 권장:

- PlayerData transaction sample
- Shop / Inventory flow sample
- Encounter / Reward flow sample
- Save failure rollback tests

### `pansori-microgame-framework`

목적: 40시간 게임잼 우승 프로젝트의 미니게임 통합 구조를 보여주는 저장소

포함 권장:

- `IMicrogame`
- `MicrogameBase`
- `MicrogameManager`
- `MicrogameTemplateCreator`

### `diet-unity-pipeline-sample`

목적: Unity 데이터·에셋 파이프라인 설계 역량을 보여주는 저장소

포함 권장:

- schema / relations / snapshot export sample
- validate / apply sample
- stale snapshot protection
- dashboard window sample

현재 이 저장소에는 위 신규 저장소로 옮길 수 있는 문서 초안을 `samples/` 아래에 먼저 정리해 둡니다.

## 4. Pinned repository 추천 구성

1. `izakoza-gameplay-samples`
2. `pansori-microgame-framework`
3. `diet-unity-pipeline-sample`
4. `unity-mcp`
5. `metaverse2024`
6. `jaewonjung6446.github.io`

## 5. GitHub Profile README

`jaewonjung6446` 이름의 public repository를 만들고 `README.md`를 추가하면 GitHub 프로필 상단에 표시됩니다.

이 저장소의 [`PROFILE_README_DRAFT.md`](../PROFILE_README_DRAFT.md)를 복사해 사용합니다.

## 6. 최종 검토 기준

채용 담당자가 GitHub를 열었을 때 아래 문장이 바로 읽혀야 합니다.

> Unity/C# 기반 게임플레이 시스템을 구현하고, 세이브/로드·상점·인벤토리·인카운터·보상·전투 진입 연결부를 데이터 흐름과 예외 케이스까지 고려해 설계한 개발자.
