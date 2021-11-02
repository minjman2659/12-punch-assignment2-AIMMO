# 12-punch-assignment2-AIMMO

[위코드 x 원티드] 백엔드 프리온보딩 1주차 과제(1) \_ AIMMO

12팀 (원투펀치 팀) <br/>
팀원: 김민재, 정천우, 최유진

<br/>

### < 게시판 Restful API >

서버 배포 링크 : http://13.125.0.161:3000/

<br/>

## 📍 Team Rules

### [팀 규칙 바로가기](https://mangrove-spectrum-269.notion.site/84675958ee2b4373912678e06160b13d)

<br/>

## 💻 Tech Stack

Programming Language : JavaScript <br/>
Runtime : NodeJS <br/>
Framework : Express <br/>
Database : MongoDB <br/>
Deploy : AWS EC2 <br/>
ETC : Mongoose, JWT, Bcrypt

<br/>

## 📋 API Docs

### [Postman Document 바로 가기](https://documenter.getpostman.com/view/16853602/UVBzmUhk)

### [Gitbook API Docs 바로 가기](https://aimmo-express.gitbook.io/aimmo_express/)

<br/>

## 💾 DB Scheme

### [Notion 페이지에서 보기](https://mangrove-spectrum-269.notion.site/DB-NoSQL-Schema-1604f4bf4c6344a69e119aa49fac3a92)

<br/>

## 🔎 Description

**서버(로컬) 실행 방법** <br/>
Github Repository를 clone 한 후, <br/>`npm install` 명령어를 통해 필요한 npm 모듈을 설치합니다. <br/>
이후, `npm run start` 명령어를 통해 서버를 실행시킬 수 있습니다. <br/>
\*JWT Secret key는 임시 키로 코드상에 구현해 놓았으니 별도로 .env 파일을 만들지 않아도 됩니다. <br/>

**서버 url** <br/>
[1] 배포: http://13.125.0.161:3000 <br/>
[2] 로컬: http://localhost:3000 <br/>

**로그인 이전 할 수 있는 기능** <br/>
회원가입(POST), 게시글 리스트 조회(GET), 게시글 단건 조회(GET),<br/>
댓글 조회(GET), 대댓글 조회(GET)
<br/>

- 게시글 리스트 조회, 댓글 조회, 대댓글 조회는 Pagination을 구현했습니다.
- 게시글 단건 조회의 경우, 로그인 상태인 유저가 조회를 할 경우에만 count가 누적되며, 중복되어서 count가 누적되지는 않습니다.

**로그인 기능** <br/>
유저 로그인(POST)
<br/>

**로그인 이후 할 수 있는 기능** <br/>
게시글 작성(POST), 게시글 수정(PATCH), 게시글 삭제(DELETE), <br/>
댓글 작성(POST), 대댓글 작성(POST)
<br/>

**API에 대한 자세한 내용은 [Postman Document](https://documenter.getpostman.com/view/16853602/UVBzmUhk) 을 통해 더 자세하게 확인 할 수 있습니다.** <br/>

<br/>

**구현 방법** <br/>
NodeJS 런타임에서 Express 미들웨어를 활용해서 CRUD 게시판 API를 구현했습니다. 유저 로그인 방식은 JWT를 활용한 토큰 인증 방식으로 구현했으며, Bcrypt 해싱 모듈을 활용해 유저로부터 전달받은 패스워드를 암호화 하여 데이터베이스에 저장했습니다.<br/>

API 중 유저 권한이 필요한 요청들은 <br/>

1. accessToken이 있는지 먼저 판별 후 있다면 바로 응답을, <br/>
2. accessToken이 만료되었을 경우, refreshToken을 판별 후 있다면 accessToken 재발급과 함께 응답을, <br/>
3. 두 토큰 모두 만료되었을 경우, 다시 로그인해달라는 메세지와 401 응답코드를 응답하도록 구현했습니다. <br/>

DB는 mongoose를 이용하여 서버와 연결하였고, AWS의 EC2 서비스를 이용해서 배포를 완료했습니다.

<br/>

## 🔥 회고록

**김민재** : https://minjman2659.notion.site/1-_AIMMO-123cd4f913cc4d84b7b037f9db3e54de
<br/>

**정천우** : https://blog.naver.com/codehouse9/222556847652
<br/>

**최유진** : https://become-clear.tistory.com/85
