# POT Frontend

POT (Plant On Trust)은 식물 돌봄이 필요한 팟오너와 방문 돌봄을 제공하는 팟트너를 연결하는 서비스입니다. 이 저장소는 사용자 화면을 담당합니다. 현재는 개발 기반과 폴더 구조가 준비된 단계이며, 화면과 기능은 팀원들이 순차적으로 구현하고 있습니다.

## 기술 구성

- Next.js 16, React 19, TypeScript
- ESLint, Prettier, Husky, GitHub Actions
- 배포: Vercel

## 시작하기

Node.js **24.16.0**과 npm **11.x**를 사용합니다. 저장소 루트에서 다음 순서로 실행하세요.

```bash
nvm use
npm ci
cp .env.example .env
npm run dev
```

브라우저에서 <http://localhost:3000>을 열면 됩니다. 현재 첫 화면은 기본 안내 화면입니다.

`.env.example`의 `NEXT_PUBLIC_API_URL`은 API 주소입니다. 로컬 백엔드를 함께 실행한다면 기본값인 `http://localhost:4000`을 사용할 수 있습니다. 실제 API 연동 방식과 주소는 백엔드 작업 상황에 맞춰 팀에서 정합니다. `NEXT_PUBLIC_`으로 시작하는 값은 브라우저에 노출되므로 비밀값을 넣지 마세요.

## 폴더 구성

| 경로                                         | 용도                                  |
| -------------------------------------------- | ------------------------------------- |
| `src/app/`                                   | URL 경로, 페이지 및 레이아웃          |
| `src/features/`                              | 기능별 컴포넌트, API, 훅, 타입        |
| `src/components/`                            | 여러 기능에서 쓰는 공통 UI            |
| `src/lib/`                                   | 공통 API 클라이언트와 라이브러리 설정 |
| `src/types/`, `src/constants/`, `src/utils/` | 공통 타입, 상수, 유틸리티             |
| `src/styles/`, `public/`                     | 스타일 및 정적 파일                   |

여러 폴더는 `.gitkeep`만 있는 빈 자리입니다. 필요한 파일은 기능 구현 시 해당 담당자가 추가합니다.

## 작업 흐름

할 일과 진행 상태는 [POT 개발 일정](https://github.com/orgs/fs14-pot-team2/projects/1)의 **프론트엔드** 보드에서 관리합니다.

1. `pot-fe`에 작업 Issue를 만들고 프로젝트의 **Todo**에 추가합니다.
2. 작업을 시작할 때 Issue를 **In Progress**로 옮기고 `develop`에서 작업 브랜치를 만듭니다. 예: `feat/sitter-profile`.
3. 작업이 끝나면 `develop`을 대상으로 PR을 만들고, PR 오른쪽 **Development**에서 해당 Issue를 연결합니다. PR 제목과 커밋은 `feat: 팟트너 프로필 화면 구현`처럼 팀의 형식을 사용합니다.
4. 리뷰와 CI 확인 후 PR을 `develop`에 머지합니다. 완료된 Issue를 닫으면 프로젝트의 **Done**으로 이동하도록 설정할 수 있습니다. `main`이 기본 브랜치이므로 `develop` 대상 PR에 `Closes #번호`를 적는 것만으로는 Issue가 자동 종료되지 않습니다.
5. 배포할 변경사항은 팀 일정에 맞춰 `develop`에서 `main`으로 별도 PR을 만듭니다.

## 코드 규칙과 검사

- 들여쓰기 2칸, 큰따옴표, 세미콜론을 사용합니다.
- 변수·함수는 `camelCase`, 컴포넌트·컴포넌트 파일은 `PascalCase`, 일반 폴더는 `kebab-case`를 사용합니다. Next.js 예약 파일명은 프레임워크 규칙을 따릅니다.
- 공통 상수는 `UPPER_SNAKE_CASE`, 일반 지역 `const`는 `camelCase`를 사용합니다.
- 컴포넌트와 CSS Module 파일은 같은 폴더에 두고, 해당 CSS 파일은 `컴포넌트명.module.css`로 이름 짓습니다.
- 커밋과 PR 제목은 `feat/fix/refactor/chore/style: 한글 설명` 형식을 사용합니다.

```bash
npm run lint
npm run format:check
npm run typecheck
npm run build
```

`npm ci`로 설치하면 Husky가 설정되어 커밋 전에 변경 파일 검사와 커밋 메시지 검사가 실행됩니다. GitHub Actions도 `main`·`develop` 대상 PR과 해당 브랜치의 push에서 품질 검사를 수행합니다. 검사에서 실패하면 로그를 확인하고 수정한 뒤 다시 push하세요.

## 도움과 관련 저장소

- 작업 중 막히거나 변경 제안이 있으면 이 저장소에 Issue를 남기고 담당 팀원과 논의해 주세요.
- 서버 코드는 [pot-be](https://github.com/fs14-pot-team2/pot-be)에서 관리합니다.
