import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StarRatingComponent from 'react-star-rating-component';
import Grid from '@material-ui/core/Grid';
import Item from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Spinner from '../../components/Spinner.js';
import { Typography } from "@material-ui/core";


function Survey( {history} ){
  const [movies,setMovies] = useState([])
  const url = "/movie/survey"
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setLoading(false);
    axios.get(url)
    .then((res)=>{
      console.log(res.data);
      setMovies(res.data);
    })
    .catch((err)=>{
      console.log(err)
    })
  },[]);

  const [rating, setRating] = useState(Array.from({length:movies.length})); // 점수 저장하는곳
  const [isRate, setisRate] = useState(Array.from({length:movies.length})); // 클릭되있는지 확인
  const [scores, setScores] = useState(Array.from({length:movies.length})); // 호버 되있는지 확인
  const [result, setResult] = useState({}); // 결과

  const onStarClick = (idx,tmdb_id,nextValue)=>{
    let newRating = [...rating];
    newRating[idx] = nextValue;
    setRating(newRating); // 별점에 표시하려면 필요함
    const newResult = {...result};
    newResult[tmdb_id] = nextValue;
    setResult(newResult); // 결과값을 이걸로


    let newIsRate = [...isRate]
    newIsRate[idx] = true
    setisRate(newIsRate);
  };

  const EnterEvent = (params,e) => {
    let newScores =[...scores];
    newScores[params] = true;
    setScores(newScores);

    document.getElementById("posterId"+params).style.filter = "brightness(10%)";
    console.log("1들어갑니다.");
    console.log(scores)
  }

  const LeaveEvent = (params,e) => {
    console.log("1나갑니다.");
    const poster = document.getElementById("posterId"+params);
    if(isRate[params]){
      poster.style.filter = "brightness(10%)"
    }else{
      poster.style.filter = "brightness(100%)"
      let newwScores =[...scores];
      newwScores[params] = undefined;
      setScores(newwScores);
    }
  }

  // console.log(result);

  const submitEvent =() =>{
    setLoading(true);
    axios.post("/accounts/survey",{
      result:result,
      id:localStorage.getItem("id")
    })
    .then((res)=>{
      setLoading(false);
      console.log(res.data);
      localStorage.setItem('servey', true)
      history.push("/main")
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  if (loading) return (
    <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
    >
      <Spinner/>
    </Grid>
  )
  
  return (
    <div>
      <Grid item xs={12}>
            <Typography variant="h3" align="center"
              style={{
                marginTop:50,
                marginBottom: 50,
              }}
            >
            시청한 영화를 평가해주세요</Typography>
        </Grid>

      <PosterContainer>
        <Grid container>
          <Grid item xs={1}>
            <Item></Item>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            xs={10}
          >
            {
              movies.map((movie,idx) =>(
                <Grid
                  item xs={2}
                >
                  <div style={{position:"relative",width:"80%"}}
                    key={movie.tmdb_id}
                    onMouseEnter={(e)=>EnterEvent(idx,e)}
                    onMouseLeave={(e)=>LeaveEvent(idx,e)}
                  >
                    <MoviePoster 
                      id={`posterId${idx}`} 
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                      alt="img1"
                    />
                  <span 
                    // onClick={(e) => clickEvent(idx,e)}
                    style={{position:"absolute",top:"50%",left:"50%",transform: "translate(-50%, -50%)"}}>
                    {
                      scores[idx]?
                        <StarRatingComponent
                          id="rate"
                          starCount={5}
                          value={rating[idx]}
                          onStarClick= {(e)=>onStarClick(idx,movie.tmdb_id,e)}
                        />
                        :null
                    }
                  </span>
                  {/* <p>{movie.title}</p> */}
                  <p></p>
                  </div>
                </Grid>
              )) 
            }
          </Grid>
          <Grid item xs={1}>
            <Item></Item>
          </Grid>
        </Grid>
      </PosterContainer>
      <Grid 
        container
        direction="row"
        justifyContent="center"
        alignItems="center">

        { 
          Object.keys(result).length > 4?
          <Button onClick={()=>submitEvent()} size="large" variant="contained" color="primary">제출하기</Button>
          :<Button size="large" variant="contained" color="primary" disabled>제출하기</Button>
        }
      </Grid>
    </div>
  );
}

const MoviePoster = styled.img`
  width:100%;
  margin:4px;
  border-radius:10px;
`;

const PosterContainer = styled.div`
  overflow:scroll;
  overflow-x:hidden;
  height: 800px;
`;

export default Survey;

// 오버하면 회색으로 바뀌고 클릭안하고 그냥가면 원래 이미지로 바귐
// 근데 오버 하고 클릭하면 회색인채로 남아있음
