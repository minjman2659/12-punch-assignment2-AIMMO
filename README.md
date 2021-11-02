# 12-punch-assignment2-AIMMO

[위코드 x 원티드] 백엔드 프리온보딩 1주차 과제(1) \_ AIMMO

12팀(원투펀치 팀) <br/>
팀원: 김민재, 정천우, 최유진

<br/>

### < 게시판 Restful API >

서버 배포 링크 : http://13.125.0.161:3000/

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

<br/>

## 🔥 회고록

**김민재** :
<br/>

**정천우** :
<br/>

**최유진** :
