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
function Movietipage11() {
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
        Q. 11
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        우리 내일 영화보고 뭐할래? 나는...
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
                history.push(`/movie/movieti/12`)
              })
              .catch(err => {
                console.log(err)
              })
          }}
        >
          음 내일 영화보고 카페가고 밥먹을래?
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
                history.push(`/movie/movieti/12`)
              })
              .catch(err => {
                console.log(err)
              })
          }}
        >
          영화 끝나면 2시쯤이니 카페에서 3시간 수다떨고 1시간 쇼핑하고 6시에 음식점 예약해 놓을게! 
        </Button>      
        <Typography variant="h6" align="center" gutterBottom>
          11/13
        </Typography>
      </div>
    </Grid>
  </div>
  )
}

export default Movietipage11
