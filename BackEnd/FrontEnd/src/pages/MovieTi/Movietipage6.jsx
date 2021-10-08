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
    width: '36%',  
    height: '50%',  
    margin: theme.spacing(3, 0, 2),
    fontSize: '2rem',
  },
}));
function Movietipage6() {
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
        Q. 06
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        오랜만의 휴식시간. 더 끌리는 쪽은?
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
                "result": "I"
              }
            },)
              .then(res => {
                history.push(`/movie/movieti/7`)
              })
              .catch(err => {
                console.log(err)
              })
          }} 
        >
          집에서 편하게 즐기는 넷플릭스
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
                "result": "E"
              }
            },)
              .then(res => {
                history.push(`/movie/movieti/7`)
              })
              .catch(err => {
                console.log(err)
              })
          }} 
        >
          영화는 큰 스크린으로 봐야지! 용아맥 가자!
        </Button>      
        <Typography variant="h6" align="center" gutterBottom>
          6/13
        </Typography>
      </div>
    </Grid>
  </div>
  )
}

export default Movietipage6
