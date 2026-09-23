import React from 'react';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import './App.css';
import Header from "./components/main/Header";
import Home from "./components/main/Home";
import Footer from "./components/main/Footer";
import FoodList from "./components/food/FoodList";
import FoodDetail from "./components/food/FoodDetail";
import BoardList from "./components/board/BoardList";
import BoardInsert from "./components/board/BoardInsert";
import BoardDetail from "./components/board/BoardDetail";
import BoardUpdate from "./components/board/BoardUpdate";
import BoardDelete from "./components/board/BoardDelete";
import YoutubeFind from "./components/youtube/YoutubeFind";
/*
     TanStack-Query : Next.js는 변경 사항 없이 구조만 변경
     - 개념: 서버에서 데이터를 가지고 온다
            캐시 가능(임시 저장 장소)
            React 동기화 라이브러리
     - 장점
        1) 서버 데이터를 관리하기 쉽다
        2) 자동 캐싱
        3) 중복 소스 감소
        4) 로딩 / 에러 관리가 용이
        5) 자동으로 재요청할 수 있다
        6) 데이터 갱신을 자동화
        7) 오픈소스 그룹에서 관리
      - 단점
        1) 용어가 많다
        2) 단순한 프로젝트에서는 복잡할 수 있다
        3) 서버 상태 / 클라이언트 상태 구분이 어렵다
      - 동작 순서
        - useQuery / useEffect
           ==> 서버 연결(axios/fetch)
        1) React 컴포넌트 => JSP(HTML)
        2) useQuery()
        3) Query Key 확인 => useQuery(1)
        4) Cache 확인
           - 캐시 존재 => 캐시 데이터 사용(임시 저장소 store)
           - 캐시 없으면 axios로 서버 연결
        5) SpringBoot / Node.js
        6) 응답 데이터 받기
        7) Cache 저장
        8) 화면 출력

      - 핵심 기능
        1) Query => 서버에서 데이터 조회
            useQuery({
                queryKey: ['food'+no],
                queryFn: axios,
                ...
            })
            => SELECT
        2) Mutation : 서버의 데이터를 변경하는 경우
            => INSERT / UPDATE / DELETE
        3) Query Key : 캐시(메모리) 구분하는 이름
        4) Query Function : 실제 API를 이용해서 서버 연결(axios 등)
        5) Cache : 서버에서 데이터를 받아서 임시 저장하는 메모리 공간
          - 캐시가 없을때
            1. 요청
            2. axios
            3. 데이터 저장 => Cache
          - 캐시가 있을때
            1. 요청
            2. Cache 확인
            3. Cache에 존재하면 메모리에 저장된 데이터를 출력
            4. 없다면 axios 호출
        6) Stale: 캐시에 저장된 데이터가 최신 데이터인지 확인
        7) Refetch: 서버에서 데이터를 다시 가지고온다(예시: hit 출력 등)
        8) Invalidate: 최신 데이터가 아닌 경우 표시
            => 추가 / 삭제 후 사용

       ==> Query 설정: index.tsx
       ==> component에서 값을 읽어서 출력

       <Router> :
       <Routes> : @Controller
       <Route>  : @GetMapping, @PostMapping 등

       <Header /> => Header()
       <Footer /> => Footer()
 */
function App() {
  return (
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/food/list" element={<FoodList />}/>
          <Route path="/food/detail/:no" element={<FoodDetail />}/>
          <Route path="/board/list" element={<BoardList />}/>
          <Route path="/board/insert" element={<BoardInsert />}/>
          <Route path="/board/detail/:no" element={<BoardDetail />}/>
          <Route path="/board/update/:no" element={<BoardUpdate />}/>
          <Route path="/board/delete/:no" element={<BoardDelete />}/>
          <Route path="/youtube/find" element={<YoutubeFind />}/>
        </Routes>
        <Footer/>
      </Router>
  );
}

export default App;
