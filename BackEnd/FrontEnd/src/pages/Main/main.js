import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import axios from 'axios';
import Layout from '../../Layout';
import {
  Grid,
  Button,
  Modal,
} from '@material-ui/core';
import Detail from './detail'
import Spinner from '../../components/Spinner.js';


const main_carousel_settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  centerMode: true,
  slidesToScroll: 1
};

const sub_carousel_settings = {
  infinite: true,
  speed: 1150,
  slidesToShow: 5,
  centerMode: false,
  slidesToScroll: 5
};


function Main( {history} ){
  const [nowMovies,setNowMovies] = useState([])
  const [topRatedMovies,setTopRatedMovies] = useState([])
  const [upComingmovies,setUpComingMovies] = useState([])
  const [recommendMovies,setRecommendMovies] = useState([])
  const [movietiMovies,setMovietiMovies] = useState([])  
  const [movietiCollaboMovies,setMovietiCollaboMoviesUrl]= useState([])

  const [loading, setLoading] = useState(true); 

  const [open, setOpen] = useState(false);
  const [tmdbid, setTmdbid] = useState('');
  const handleOpen = (tmdb_id) => {
      setOpen(true);
      setTmdbid(tmdb_id);
    }
  const handleClose = () => setOpen(false);


  const nowMoviesUrl = "/movie/nowplaying"
  const topRatedMoviesUrl = "/movie/toprated"
  const upComingmoviesUrl = "/movie/upcoming"
  const recommendMoviesUrl = "/movie/recommend/list"
  const movietiMoviesUrl = "/movie/movieti/list"
  const movietiCollaboMoviesUrl = "/movie/recommendmovieti/list"
  
  useEffect(()=>{
    const headers = {
      headers: {Authorization: `JWT ${localStorage.getItem('jwt')}`}
    }
    
    axios.get(nowMoviesUrl)
    .then((res)=>{
      console.log(res.data);
      setNowMovies(res.data);
    })
    .catch((err)=>{
      console.log(err)
    })

    axios.get(topRatedMoviesUrl)
    .then((res)=>{
      console.log(res.data);
      setTopRatedMovies(res.data);
    })
    .catch((err)=>{
      console.log(err)
    })

    axios.get(upComingmoviesUrl)
    .then((res)=>{
      console.log(res.data);
      setUpComingMovies(res.data);
    })
    .catch((err)=>{
      console.log(err)
    })

    axios.get(recommendMoviesUrl,headers)
    .then((res)=>{
      console.log(res.data);
      setRecommendMovies(res.data);
    })
    .catch((err)=>{
      console.log(err)
    })

    axios.get(movietiMoviesUrl,headers)
    .then((res)=>{
      setLoading(false);
      console.log(res.data);
      setMovietiMovies(res.data);
    })
    .catch((err)=>{
      setLoading(false);
      console.log(err)
    })

    axios.get(movietiCollaboMoviesUrl,headers)
    .then((res)=>{
      console.log(res.data,"애 나오긴햇어?");
      setMovietiCollaboMoviesUrl(res.data);
    })
    .catch((err)=>{
      console.log(err,"이거나옴?")
    })
  },[]);

  const reSurvey = () =>{
    const headers = {
      headers: {Authorization: `JWT ${localStorage.getItem('jwt')}`}
    }
    axios.delete(`/accounts/resetsurvey`, headers)
    .then((res)=>{
      console.log(res.data);
      history.push("/survey");
    })
    .catch((err)=>{
      console.log(err)
      console.log(headers)
    })
  }

    return (
      <MainPage>
        <Layout>
        </Layout>
        <Slider {...main_carousel_settings}>
            {
              upComingmovies.map((upComingmovie,idx)=>(
              <div key={upComingmovie.tmdb_id}>
                <MainCarousel 
                  style={{position:"relative",top:"50%", zIndex:1}}
                  id={`posterId${idx}`} 
                  src={`https://image.tmdb.org/t/p/original${upComingmovie.backdrop_path}`} 
                  alt="img1"
                />
                <span>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item xs={2}>
                      <MoviePoster
                      style={{width:300,position:"absolute",top:"50%",transform: "translate( -50%,-50% )",zIndex:2}}
                      src={`https://image.tmdb.org/t/p/original${upComingmovie.poster_path}`} 
                      alt="img1"
                    />
                    </Grid>
                    <Grid item xs={2}>
                      <p style={{width:400, position:"absolute",top:"40%",color:"white",fontSize:30,zIndex:2}}
                      >{upComingmovie.title}</p>
                    </Grid>
                  </Grid>
                </span>
                  {/* box-shadow: 12px 100px 100px 100px #001122; 이미지 테두리 생성*/ }
              </div>
              ))
            }
          </Slider>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <SubContent id="user_recommend_movie">
            {
              movietiMovies.length?
              (
                loading?
                <Spinner/>
                :(
                <div>
                  <h2>나와 같은 Movieti가 좋아한 영화</h2>
                  <Slider {...sub_carousel_settings}>
                    {
                      movietiCollaboMovies.map((movietiCollaboMovie,idx)=>(
                      <div key={movietiCollaboMovie.tmdb_id}>
                        <MoviePoster 
                          onClick = {(e)=>handleOpen(movietiCollaboMovie.tmdb_id,e)}
                          id={`posterId${idx}`} 
                          src={`https://image.tmdb.org/t/p/w200${movietiCollaboMovie.poster_path}`} 
                          alt="img1"
                        />
                        <Grid
                          container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <p>{movietiCollaboMovie.title}</p>
                        </Grid>
                      </div>
                      ))
                    }
                  </Slider>
                  <h2>나의 Movieti 추천 영화</h2>
                  <Slider {...sub_carousel_settings}>
                    {
                      movietiMovies.map((movietiMovie,idx)=>(
                      <div key={movietiMovie.tmdb_id}>
                        <MoviePoster 
                          onClick = {(e)=>handleOpen(movietiMovie.tmdb_id,e)}
                          id={`posterId${idx}`} 
                          src={`https://image.tmdb.org/t/p/w200${movietiMovie.poster_path}`} 
                          alt="img1"
                        />
                        <Grid
                          container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <p>{movietiMovie.title}</p>
                        </Grid>
                      </div>
                      ))
                    }
                  </Slider>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button size="large" color="primary"  onClick = {()=> {history.push("/movie/movietimain")}}>다시 검사하기</Button>
                    <Button size="large" color="primary"  onClick = {()=> {history.push("/movie/movieti/result")}}>결과 다시보기</Button>
                  </Grid>
                </div>)
              ):
                (
                  loading ?
                    <Spinner/>
                  :(
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                  <Button size="large" color="primary" onClick = {()=> {history.push("/movie/movietimain")}} style={{margin:70}}>MovieTi 검사하기</Button>
                  </Grid>
                  )
              )
            }
              <h2>추천 영화</h2>
              <Slider {...sub_carousel_settings}>
                {
                  recommendMovies.map((recommendMovie,idx)=>(
                  <div key={recommendMovie.tmdb_id}>
                    <MoviePoster 
                    onClick = {(e)=>handleOpen(recommendMovie.tmdb_id,e)}
                    id={`posterId${idx}`} 
                    src={`https://image.tmdb.org/t/p/w200${recommendMovie.poster_path}`} 
                    alt="img1"
                    />
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <p>{recommendMovie.title}</p>
                    </Grid>
                  </div>
                  ))
                }
              </Slider>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Button size="large" color="primary" onClick = { (e)=>reSurvey(e) } style={{marginBottom:10}}>다시추천받기</Button>
              </Grid>
            </SubContent>
            <SubContent  id="new_movie">
              <h2>Upcoming Movie</h2>
              <Slider {...sub_carousel_settings}>
                {
                  upComingmovies.map((upComingmovie,idx)=>(
                  <div key={upComingmovie.tmdb_id}>
                    <MoviePoster
                    onClick = {(e)=>handleOpen(upComingmovie.tmdb_id,e)}
                    id={`posterId${idx}`} 
                    src={`https://image.tmdb.org/t/p/w200${upComingmovie.poster_path}`} 
                    alt="img1"
                    />
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <p>{upComingmovie.title}</p>
                    </Grid>
                  </div>
                  ))
                }
              </Slider>
            </SubContent>
            <SubContent id="trending_movie">
              <h2>Top Rated Movie</h2>  
              <Slider {...sub_carousel_settings}>
                {
                  topRatedMovies.map((topRatedMovie,idx)=>(
                  <div key={topRatedMovie.tmdb_id}>
                    <MoviePoster 
                      onClick = {(e)=>handleOpen(topRatedMovie.tmdb_id,e)}
                      id={`posterId${idx}`} 
                      src={`https://image.tmdb.org/t/p/w200${topRatedMovie.poster_path}`} 
                      alt="img1"
                    />
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <p>{topRatedMovie.title}</p>
                    </Grid>
                  </div>
                  ))
                }
              </Slider>
            </SubContent>
            <SubContent  id="new_movie">
              <h2>Now Playing Movie</h2>
              <Slider {...sub_carousel_settings}>
                {
                  nowMovies.map((nowMovie,idx)=>(
                  <div key={nowMovie.tmdb_id}>
                    <MoviePoster 
                      onClick = {(e)=>handleOpen(nowMovie.tmdb_id,e)}
                      id={`posterId${idx}`} 
                      src={`https://image.tmdb.org/t/p/original${nowMovie.poster_path}`} 
                      alt="img1"
                    />
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <p>{nowMovie.title}</p>
                    </Grid>
                  </div>
                  ))
                }
              </Slider>
            </SubContent>
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Detail tmdb_id={tmdbid}/>
          </Modal>

      </MainPage>
    );
}

const MainPage = styled.div`
  width:100%;
  justify-content:center;
  `;
const SubContent = styled.div`
  width:80%;
  margin:auto;
  background-color:#101010;
  color:#e6e6e6;
  justify-content:center;
  aligin-content:center;
`;
const MoviePoster = styled.img`
  width:60%;
  margin:auto;
  color:black;
  border-radius:10px;
`;

const MainCarousel = styled.img`
  width:83%;
  height:50vh;
  margin:auto;
  color:black;
  filter: blur(20px);
`;

export default Main;