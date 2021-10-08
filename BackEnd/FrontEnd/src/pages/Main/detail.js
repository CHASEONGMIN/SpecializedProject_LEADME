import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import ReactPlayer from 'react-player';
import { Button } from "@material-ui/core";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { borderColor } from "@mui/system";
import Spinner from '../../components/Spinner.js';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  height: '100vh',
  bgcolor: '#161318',
  border: '2px solid #000',
  boxShadow: 24,
  overflow:"scroll",
  overflowX: "hidden",
  p: 4,
};

const related_movie_carousel_settings = {
  dots: true,
  infinite: true,
  speed: 1150,
  slidesToShow: 5,
  centerMode: false,
  slidesToScroll: 5
};

const actor_carousel_settings = {
  dots: true,
  infinite: true,
  speed: 1150,
  slidesToShow: 5,
  centerMode: false,
  slidesToScroll: 5
};

function Detail(props){
  const [loading, setLoading] = useState(true);

  const [value, setValue] = React.useState(0);

  const [movie,setmovie] = useState([])
  const [relatedMovies,setrelatedMovies] = useState([])
  const [actors,setActors] = useState([])
  const [comments,setComments] = useState([])
  const [userComment,setUserComment] = useState('')
  const [isOpenedComments,setisOpenedComments] = useState(false)
  const [prop,setProp] = useState(props)
  const clickRelatedMovie=(relatedMovie)=>setProp(relatedMovie);
  const uid = localStorage.getItem('uid');
  const headers = {
    headers: {Authorization: `JWT ${localStorage.getItem('jwt')}`}
  }

  useEffect(() => {
    setLoading(true);
    const headers = {
      headers: {Authorization: `JWT ${localStorage.getItem('jwt')}`}
    }
    axios.get(`/movie/${prop.tmdb_id}`, headers)
    .then((res)=>{
      console.log(res.data);
      setmovie(res.data)
      setrelatedMovies(res.data.movielist)
      setActors(res.data.cast)
      setValue(res.data.rating)
      setLoading(false)
    })
    .catch((err)=>{
      console.log(err)
    })

    axios.get(`/movie/${prop.tmdb_id}/comment`,headers)
    .then((res)=>{
      console.log(res);
      setComments(res.data);
    })
    .catch((err)=>{
      console.log(err)
      console.log("SubmitComment")
    })
    
  },[prop]);

  const OpenComments = () =>{
    if(isOpenedComments){
      setisOpenedComments(false);
    }else{
      axios.get(`/movie/${prop.tmdb_id}/comment`, headers)
      .then((res)=>{
        setisOpenedComments(true);
      })
      .catch((err)=>{
        console.log(err)
        console.log("OpenComments")
      })
    }
  }

  const SubmitComment = () =>{
    axios.post(`/movie/${prop.tmdb_id}/comment`,
    {
      comment: userComment,
    },
    {
      headers: {Authorization: `JWT ${localStorage.getItem('jwt')}`},
    })
    .then((res)=>{
      // console.log(typeof(res));
      // console.log(res);
    })
    .catch((err)=>{
      console.log(err)
      console.log("SubmitComment")
    })

    axios.get(`/movie/${prop.tmdb_id}/comment`,headers)
    .then((res)=>{
      console.log(res);
      setComments(res.data);
    })
    .catch((err)=>{
      console.log(err)
      console.log("SubmitComment")
    })
  }

  const DeleteComment = (commentid) =>{
    axios.delete(`/movie/comment/${commentid}`,headers)
    .then((res)=>{
      console.log(res);
      let filtered = comments.filter((element) => element.commentid !== commentid);
      setComments(filtered);
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const clickRating = (newValue) =>{
    axios.post(`/movie/${prop.tmdb_id}/rating`,{
      result:newValue,
    },headers)
    .then((res)=>{
      console.log(res);
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
    <Box sx={style} style={{color:"white"}}>
      <h1>{movie.title} </h1>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
            alt={movie.title}
          />
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(e, newValue) => {
                  setValue(newValue);
                  clickRating(newValue);
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid
          container 
          item xs={8}
          justifyContent="center"
          alignItems="center"
        >
          <ReactPlayer url={movie.trailer_path} playing controls width="100%" height="94%" />
          <br/>
        </Grid>
      </Grid>
      <Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ mt: 2 }}>
            {movie.overview}
          </Typography>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
        >
          <h1>SCORE : {movie.vote_average} </h1>
        </Grid>
      </Grid>
      <Grid>
        <Grid 
          container
          justifyContent="center"
          alignItems="center" 
        >
          
          <Grid item xs={8}>
            <TextField 
              onChange={(e)=>setUserComment(e.target.value)}
              id="standard-search"
              label="댓글 작성하기"
              type="search"
              variant="standard"
              color="secondary"
              style={{ width: "100%" }}
              InputLabelProps={{
                style: { color: '#B0B0B0' },
              }}
              />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={(e)=>SubmitComment(e)}>댓글 작성</Button>
          </Grid>
          <Grid >
              {
                isOpenedComments?
                  <Button variant="contained" onClick={(e)=>OpenComments(e)}>댓글 접기</Button>
                  :<Button variant="contained" onClick={(e)=>OpenComments(e)}>댓글 열기</Button>
              }  
          </Grid>
        </Grid>   
          <Grid
            container
            justifyContent="center"
            alignItems="center"  
          >
            {
              isOpenedComments?
              (
                <List style={{width:"100%"}}>
                  {
                    comments.map((commentOne,idx)=>(
                      <ListItem key={idx} style={{width:"100%"}}>
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={8} container justifyContent="center">
                        <p>"{commentOne.comment}"</p>
                        </Grid>
                        <Grid item xs={2} container justifyContent="center">
                          {
                            uid == commentOne.uid?
                            <Button variant="outlined" style={{color:"red", borderColor:"red"}} onClick={(e)=>DeleteComment(commentOne.commentid,e)}>댓글 삭제</Button>
                            :null
                          }
                        </Grid>
                      </ListItem>
                      ))
                  }
                </List>
              )
              :null
            }
          </Grid>
      </Grid>
      <Typography sx={{ mt: 2 }}>
        관련 영화
      </Typography>
      <Grid> 
        <Slider {...related_movie_carousel_settings}>
          {
            relatedMovies.map((relatedMovie,idx)=>(
            <div key={relatedMovie.tmdb_id}>
              <MoviePoster
                onClick={()=>clickRelatedMovie(relatedMovie)}
                src={`https://image.tmdb.org/t/p/w200${relatedMovie.poster_path}`} 
                alt="img1"
                style={{width:"6vw"}}
              />
              <Grid
                container
                justifyContent="center"
                alignItems="center"  
              >
              <p>{relatedMovie.title}</p>
              </Grid>
            </div>
            ))
          }
        </Slider>
      </Grid>
      <Typography sx={{ mt: 2 }}>
        출연진
      </Typography>
      <Grid> 
        <Slider {...actor_carousel_settings}>
          {
            actors.map((actor,idx)=>(
            <div key={actor.id}>
              <ActorPoster
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} 
              alt="img1"
              />
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={1}
              >
                <Typography variant="button" display="block" gutterBottom sx={{ mt: 2 }}>
                  {actor.name}&nbsp;
                </Typography>
                <Typography variant="caption" display="block" gutterBottom sx={{ mt: 2 }}>
                  {actor.character}
                </Typography>
              </Grid>
            </div>
            ))
          }
        </Slider>
      </Grid>
    </Box>
  );
}

const MoviePoster = styled.img`
  width:100%;
  margin:auto;
  color:black;
  border-radius:10px;
`;

const ActorPoster = styled.img`
  width:50%;
  margin:auto;
  color:black;
  border-radius:10px;
`;


export default Detail;
