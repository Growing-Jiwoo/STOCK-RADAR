## [NUMBLE 딥다이브] 클론코딩의 정석_TypeScript + React 로 소개팅 앱 만들어보기

###### https://www.numble.it/deepdive/50 해당 딥다이브를 진행한 결과물입니다.


### [사용 기술]

React.js, TypeScript, HTML, CSS

### [와이어프레임]
<img width="2351" alt="와이어프레임" src="https://github.com/Growing-Jiwoo/NumbleDeepDIve/assets/115076308/d8d2014d-872f-44e4-af71-94fd7e4bb59c">

### [구현된 기능]
- 회원가입 및 로그인
- 좋아요 / 싫어요 구현
- 내가 좋아요를 한 사람 / 나에게 좋아요를 한 사람 구현
- 회원 정보 변경 구현 (이미지 업로드 -> aws s3 사용)
- 나에게 좋아요를 한 사람과 채팅 기능 구현 (express.js 사용)

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

### [사용 라이브러리]
`aws-sdk@2.1377.0`   
`axios@1.4.0`   
`react-async@10.0.1`   
`react-cookie@4.1.1`   
`react-dom@18.2.0`   
`react-hook-form@7.43.9`   
`react-modal@3.16.1`      
`react-router-dom@6.11.1`   
`socket.io-client@4.6.1`
`styled-components@5.3.10`   
`typescript@4.9.5`   
`cors@2.8.5`   
`express@4.18.2`   
`socket.io@4.6.1`   
