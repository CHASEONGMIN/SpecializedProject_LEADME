import React, {useState} from 'react'
import {useHistory} from 'react-router-dom';
import {
  Button,
  Typography,
  makeStyles,
  Grid,
} from '@material-ui/core'
import MovietiHeader from '../../components/MovietiHeader'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  submit: {
    width: '30%',  
    height: '50%',  
    margin: theme.spacing(3, 0, 2),
    fontSize: '2rem',
  },
}));


function Movietipage2() {
  const classes = useStyles();
  const history = useHistory();
  
  return (
    <div>
      <MovietiHeader />
      <Grid container spacing={12}
        style={{
          display: 'flex' ,
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 50
          }}
      >        
      <Typography variant="h2" align="center" color="text.secondary" paragraph>
        Q. 02 
      </Typography>
      <Typography variant="h4" align="center" color="text.secondary" paragraph>
        같이 영화를 보러가기로 한 친구가 늦어서 영화를 못보게 된 당신! 친구에게 듣고 싶은 말은?
      </Typography>      
      <div
          style={{
            display: 'flex' ,
            flexDirection: 'column',
            alignItems:"center",
            marginTop: 50
            }}
        >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"          
          className={classes.submit}
          onClick = {() => {                 
            axios.get(`/movie/movieti`, {
              headers: {
                Authorization: `JWT ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
              },   
              params: {
                "result": "T"
              }
            },)
              .then(res => {
                history.push(`/movie/movieti/3`)
              })
              .catch(err => {
                console.log(err)
              })
          }}          
        >
          왜 늦었는지 이유가 궁금해
        </Button>      
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick = {() => {                 
            axios.get(`/movie/movieti`, {
              headers: {
                Authorization: `JWT ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
              },   
              params: {
                "result": "F"
              }
            },)
              .then(res => {
                history.push(`/movie/movieti/3`)
              })
              .catch(err => {
                console.log(err)
              })
          }}                 
        >
          변명은 나중에, 사과부터 해야지
        </Button>      
        <Typography variant="h6" align="center" gutterBottom>
          2/13
        </Typography>
      </div>
    </Grid>
  </div>
  )
}

export default Movietipage2
