import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; // 라우터
import './App.css';
// 추가 부분

import Signup from './pages/Auth/Signup.jsx';
import Signin from './pages/Auth/Signin.jsx';
import Movietimain from './pages/MovieTi/Movietimain.jsx';
import Movietipage1 from './pages/MovieTi/Movietipage1.jsx';
import Movietipage2 from './pages/MovieTi/Movietipage2.jsx';
import Movietipage3 from './pages/MovieTi/Movietipage3.jsx';
import Movietipage4 from './pages/MovieTi/Movietipage4.jsx';
import Movietipage5 from './pages/MovieTi/Movietipage5.jsx';
import Movietipage6 from './pages/MovieTi/Movietipage6.jsx';
import Movietipage7 from './pages/MovieTi/Movietipage7.jsx';
import Movietipage8 from './pages/MovieTi/Movietipage8.jsx';
import Movietipage9 from './pages/MovieTi/Movietipage9.jsx';
import Movietipage10 from './pages/MovieTi/Movietipage10.jsx';
import Movietipage11 from './pages/MovieTi/Movietipage11.jsx';
import Movietipage12 from './pages/MovieTi/Movietipage12.jsx';
import Movietipage13 from './pages/MovieTi/Movietipage13.jsx';
import Movietiresult from './pages/MovieTi/Movietiresult.jsx';

//
import GlobalStyle from "./GlobalStyle"; // 전역으로 CSS를 적용시킵니다.
import main from './pages/Main/main.js'; // main 불러오기
import MyPage from './pages/MyPage/MyPage.jsx'; // mypage 불러오기
import Survey from './pages/Auth/Survey.js'; // 설문 불러오기
import Search from './pages/Search/Search.js'; // 설문 불러오기

function App () {
    return(
      <>
        <GlobalStyle/>
            <BrowserRouter>
              <Switch>
                <Route path="/main" component={main}/>
                <Route path="/mypage" component={MyPage}/>
                <Route path="/survey" component={Survey}/>
                <Route path="/movie/search/title/" component={Search}/>
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/" component={Signin} />
                <Route exact path="/movie/movietimain" component={Movietimain} />
                <Route exact path="/movie/movieti/1" component={Movietipage1} />
                <Route exact path="/movie/movieti/2" component={Movietipage2} />
                <Route exact path="/movie/movieti/3" component={Movietipage3} />
                <Route exact path="/movie/movieti/4" component={Movietipage4} />
                <Route exact path="/movie/movieti/5" component={Movietipage5} />
                <Route exact path="/movie/movieti/6" component={Movietipage6} />
                <Route exact path="/movie/movieti/7" component={Movietipage7} />
                <Route exact path="/movie/movieti/8" component={Movietipage8} />
                <Route exact path="/movie/movieti/9" component={Movietipage9} />
                <Route exact path="/movie/movieti/10" component={Movietipage10} />
                <Route exact path="/movie/movieti/11" component={Movietipage11} />
                <Route exact path="/movie/movieti/12" component={Movietipage12} />
                <Route exact path="/movie/movieti/13" component={Movietipage13} />
                <Route exact path="/movie/movieti/result" component={Movietiresult} />
              </Switch>
            </BrowserRouter>
      </>
    )
}

export default App;

//npm install slick-carousel
//npm install react-slick
//npm install --save styled-components
//npm install --save styled-reset 
//npm install @material-ui/core
//npm install @material-ui/icons
//npm install react-star-rating-component --save

//npm install @mui/material @mui/styled-engine-sc styled-components 매터리어UI 스타일드컴포넌트
//npm install @mui/material @emotion/react @emotion/styled 매터리얼 UI
//npm install @mui/icons-material  매터리얼 ui svg

//
// npm install react-router-dom
// npm install axios


//
// npm install --save react-youtube
// npm install react-player # or yarn add react-player

//
// npm install recharts
// npm install react-icons --save

