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
    width: '40%',  
    height: '50%',  
    margin: theme.spacing(3, 0, 2),
    fontSize: '2rem',
  },
}));
function Movietipage9() {
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
        Q. 09
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        시험을 못봐서 우울해하는 친구에게 당신이 해줄 말은? 
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
                "result": "F"
              }
            },)
              .then(res => {
                history.push(`/movie/movieti/10`)
              })
              .catch(err => {
                console.log(err)
              })
          }} 
        >
          우리 영화보고 맛있는거 먹으러가자!
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
                "result": "T"
              }
            },)
              .then(res => {
                history.push(`/movie/movieti/10`)
              })
              .catch(err => {
                console.log(err)
              })
          }}
        >
          다음에 잘하면 돼! 이번 시험 다들 어려웠대!
        </Button>    
        <Typography variant="h6" align="center" gutterBottom>
          9/13
        </Typography>
      </div>
    </Grid>
  </div>
  )
}

export default Movietipage9
