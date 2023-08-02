## 실시간 주식 거래 사이트

###### pull request 학습을 위해 혼자서 pull request를 진행하는 중 입니다.

### [인원]
- 1명

### [사용 기술]

#### * Client
React.js, TypeScript, JSX, CSS
#### * Server
MySQL, Django

### [구현 예정 기능]
##### 계속 추가될 수 있으며 기능 구현이 끝났으면 취소선으로 표시

- JWT를 활용한 모든 API의 JWT 검증 방식 적용
- 로그인, 로그아웃 기능 구현
- 최초 로그인 시 전 날엔 보유중이지 않는 주식 중에서 10퍼이상 증가하여 구매를 유도하는 팝업 구현
- 내 정보를 들어가면 구매한 주식들의 리스트와 사용자의 수익 정보를 볼 수 있는 UI 구현
- 주식 조회 UI 구현
- 주식 구매, 판매가 가능한 UI 구현

### [git 컨벤션]
- feat: 새 기능 추가
- fix: 발생한 에러 수정
- style: 코드 포맷팅, css 코드 추가 및 수정
- refactor: 성능 개선을 위한 코드 수정   
   
### [Commit 메시지 컨벤션]
##### 형태 : git commit -m '[git 컨벤션]: [작업내용] (#[깃이슈/pr 번호])'
##### 예시 : git commit -m 'feat: 새로운 기능 추가(#1)'
   
### [코딩 컨벤션]
- 변수/ 함수: camelCalse
- 컴포넌트/ 타입(인터페이스 등): PascalCase
- 상수: UPPER_SNAKE_CASE
