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
    width: '28%',  
    height: '50%',  
    margin: theme.spacing(3, 0, 2),
    fontSize: '2rem',
  },
}));
function Movietipage5() {
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
        Q. 05
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        지금 보고싶은 영화가 개봉했다. 당신의 선택은? 
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
                "result": "P"
              }
            },)
              .then(res => {
                history.push(`/movie/movieti/6`)
              })
              .catch(err => {
                console.log(err)
              })
          }} 
        >
          일단 보자! 돈 들어오고나서 보나 지금보나 어차피 같은돈!
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
                "result": "J"
              }
            },)
              .then(res => {
                history.push(`/movie/movieti/6`)
              })
              .catch(err => {
                console.log(err)
              })
          }} 
        >
          현재 생활비가 모자랄 수 있으니 다음에 보자
        </Button>      
        <Typography variant="h6" align="center" gutterBottom>
          5/13
        </Typography>
      </div>
    </Grid>
  </div>
  )
}

export default Movietipage5
