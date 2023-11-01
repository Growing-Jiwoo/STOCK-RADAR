## 주식 거래 사이트

### [인원]
- 1명

### [사용 기술]

#### * Client
React.js, TypeScript, JSX, CSS

#### * Server
MySQL, Django

### [구현 예정 기능]
##### 계속 추가될 수 있으며 기능 구현이 끝났으면 취소선으로 표시

- 로그인, 로그아웃 기능 구현
- 최초 로그인 시 전 날 기준으로 보유중이지 않은 주식 중 10퍼이상 증가한 주식의 구매를 유도하는 팝업 구현
- 내 정보를 들어가면 구매한 주식들의 리스트와 사용자의 수익 정보를 한 눈에 볼 수 있는 UI 구현
- 주식 조회 UI 구현
- 주식 상세 조회 UI (차트)
- 주식 상세 조회 시 댓글 CRUD (주식에 대한 의견을 나누는 댓그럐 
- 주식 구매, 판매가 가능한 UI 구현
- 크롤링을 통한 증권 관련 소식 UI 구현

### [git 컨벤션] (2023. 11. 01 수정)
- feat: 새로운 기능 구현
- fix: 발생한 에러 수정
- style: 코드 스타일 변경 (코드 포맷 변경, 세미콜론 누락 등)
- refactor: 코드 리팩토링
- perf: 성능 개선을 위한 코드 수정
- chore: 빌드, 패키지 관련 업데이트
- rename: 파일 혹은 폴더명을 수정만 한 경우
- remove: 파일을 삭제만 한 경우
###### 2023. 11. 01 수정 이전에는 잘못된 컨벤션이 존재할 수 있음

   
### [Commit 메시지 컨벤션]
##### 형태 : git commit -m '[git 컨벤션]: [작업내용] (#[깃이슈/pr 번호])'
##### 예시 : git commit -m 'feat: 새로운 기능 추가(#1)'
   
### [코딩 컨벤션]
- 변수/ 함수: camelCalse
- 컴포넌트/ 타입(인터페이스 등): PascalCase
- 상수: UPPER_SNAKE_CASE
