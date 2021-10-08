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
function Movietipage10() {
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
        Q. 10
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        영화를 보는데 열린 결말로 끝났다! 당신의 행동은?
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
                "result": "S"
              }
            },)
              .then(res => {
                history.push(`/movie/movieti/11`)
              })
              .catch(err => {
                console.log(err)
              })
          }}
        >
          감독의 의도를 생각하고 찾아보다가 만다
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
                "result": "N"
              }
            },)
              .then(res => {
                history.push(`/movie/movieti/11`)
              })
              .catch(err => {
                console.log(err)
              })
          }}
        >
          열린결말이니 내 마음대로 상상하고 만족해한다
        </Button>      
        <Typography variant="h6" align="center" gutterBottom>
          10/13
        </Typography>
      </div>
    </Grid>
  </div>
  )
}

export default Movietipage10
