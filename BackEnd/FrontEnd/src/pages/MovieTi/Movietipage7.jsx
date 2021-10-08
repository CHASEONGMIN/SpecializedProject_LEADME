import React from 'react'
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
    width: '35%',  
    height: '50%',  
    margin: theme.spacing(3, 0, 2),
    fontSize: '2rem',
  },
}));
function Movietipage7() {
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
        Q. 07
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        친구가 오늘 너무 짜증나서 공포영화를 보겠다고 한다.
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
                history.push(`/movie/movieti/8`)
              })
              .catch(err => {
                console.log(err)
              })
          }} 
        >
          짜증나는거랑 공포영화랑 무슨상관이지? 
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
                history.push(`/movie/movieti/8`)
              })
              .catch(err => {
                console.log(err)
              })
          }} 
        >
          무슨 일인데? 왜 짜증난건데?
        </Button>
        <Typography variant="h6" align="center" gutterBottom>
          7/13
        </Typography>
      </div>
    </Grid>
  </div>
  )
}

export default Movietipage7
