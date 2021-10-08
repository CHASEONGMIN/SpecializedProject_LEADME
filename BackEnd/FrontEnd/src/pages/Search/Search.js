import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';
import Item from '@material-ui/core/Grid';
import axios from 'axios';
import {useLocation} from "react-router";
import Layout from '../../Layout';
import Modal from '@mui/material/Modal';
import Detail from '../Main/detail.js'


function Search( {history} ){

  const [open, setOpen] = useState('');
  const handleOpen = (tmdb_id) => setOpen(tmdb_id);
  const handleClose = () => setOpen('');

  const location = useLocation();
  console.log(location);
  const searchWord = location.state.searchWord;

  const [searchedMovies,setSearchedMovies] = useState([]);
  useEffect(() => {
    axios.get(`/movie/search/title/${searchWord}`)
    .then((res)=>{
      console.log(res.data);
      setSearchedMovies(res.data.movies)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[searchWord]);

  return (
    <div>
      <Layout>
      </Layout>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <h2>"{searchWord}" 검색 결과</h2>
      </Grid>
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
              searchedMovies.map((searchedMovie,idx) =>(
                <Grid
                  item xs={2}
                >
                  <div style={{position:"relative",width:"80%"}}
                    key={searchedMovie.tmdb_id}
                  >
                    <MoviePoster 
                      onClick = {(e)=>handleOpen(searchedMovie.tmdb_id,e)}
                      id={`posterId${idx}`} 
                      src={`https://image.tmdb.org/t/p/w500${searchedMovie.poster_path}`} 
                      alt="img1"
                    />
                  <p>{searchedMovie.title}</p>
                  </div>
                </Grid>
              )) 
            }
          </Grid>
          <Grid item xs={1}>
            <Item></Item>
          </Grid>
        </Grid>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Detail tmdb_id={open}/>
        </Modal>
    </div>
  );
}

const MoviePoster = styled.img`
  width:100%;
  margin:4px;
  border-radius:10px;
`;


export default Search;

// 오버하면 회색으로 바뀌고 클릭안하고 그냥가면 원래 이미지로 바귐
// 근데 오버 하고 클릭하면 회색인채로 남아있음