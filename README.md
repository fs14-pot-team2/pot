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

- `nvm use`: `.nvmrc`에 지정된 Node.js 버전으로 맞춥니다.
- `npm ci`: 잠금 파일에 기록된 의존성을 설치하고 Husky 커밋 검사를 설정합니다.
- `cp .env.example .env`: 예시 환경 변수 파일을 복사해 개인용 `.env` 파일을 만듭니다. 기존 `.env`가 있다면 덮어쓰지 않도록 이 명령을 건너뛰세요.
- `npm run dev`: 로컬 개발 서버를 실행합니다.

브라우저에서 <http://localhost:3000>을 열면 됩니다. 현재 첫 화면은 기본 안내 화면입니다.

`.env.example`의 `NEXT_PUBLIC_API_URL=http://localhost:4000`은 로컬 개발용 예시입니다. Vercel에서 백엔드 API를 호출할 환경에는 `NEXT_PUBLIC_API_URL=https://pot-api.duckdns.org`를 설정합니다. 환경 변수를 추가하거나 변경한 뒤에는 해당 환경을 다시 배포해야 적용됩니다. `NEXT_PUBLIC_`으로 시작하는 값은 브라우저에 노출되므로 비밀값을 넣지 마세요. 브라우저에서 허용할 프론트 주소는 프론트 환경 변수가 아니라 백엔드 Elastic Beanstalk의 `CORS_ORIGINS`에서 관리합니다.

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
4. 리뷰와 CI 확인 후 PR을 `develop`에 머지합니다. 현재 기본 브랜치는 `develop`입니다. 같은 저장소의 Issue를 자동 종료하려면 PR 본문에 `Closes #번호`를 적거나 PR의 **Development**에서 Issue를 연결합니다. 프로젝트에서 Issue 종료 시 **Done**으로 이동하는 워크플로가 켜져 있어야 상태도 함께 바뀝니다.
5. 배포할 변경사항은 팀 일정에 맞춰 `develop`에서 `main`으로 별도 PR을 만듭니다. Vercel의 Production 배포는 `main`을 기준으로 하고, `develop` 배포는 Preview에서 확인합니다.

## 코드 규칙과 검사

- 들여쓰기 2칸, 큰따옴표, 세미콜론을 사용합니다.
- 변수·함수는 `camelCase`, 컴포넌트·컴포넌트 파일은 `PascalCase`, 일반 폴더는 `kebab-case`를 사용합니다. Next.js 예약 파일명은 프레임워크 규칙을 따릅니다.
- 공통 상수는 `UPPER_SNAKE_CASE`, 일반 지역 `const`는 `camelCase`를 사용합니다.
- 컴포넌트와 CSS Module 파일은 같은 폴더에 두고, 해당 CSS 파일은 `컴포넌트명.module.css`로 이름 짓습니다.
- 커밋과 PR 제목은 `feat/fix/refactor/chore/style/test: 한글 설명` 형식을 사용합니다.
- 제품 코드 변경 없이 테스트 코드를 추가하거나 수정할 때는 `test` 타입을 사용합니다.

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
