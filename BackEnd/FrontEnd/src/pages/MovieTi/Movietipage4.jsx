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
function Movietipage4() {
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
        Q. 04 
      </Typography>
      <Typography variant="h4" align="center" color="text.secondary" paragraph>
        귀신이 나온다는 소문이 있는 집에 머물게 된 당신! 자정이 넘은 시각 어디선가 알 수 없는 소리가 들려오는데,,,?
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
                "result": "N"
              }
            },)
              .then(res => {
                history.push(`/movie/movieti/5`)
              })
              .catch(err => {
                console.log(err)
              })
          }} 
        >
          이미 공포영화 한 편 뚝딱임
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
                "result": "S"
              }
            },)
              .then(res => {
                history.push(`/movie/movieti/5`)
              })
              .catch(err => {
                console.log(err)
              })
          }} 
        >
          어디서 누가 왜 나는 소리인지 궁금해! 
        </Button>
      
        <Typography variant="h6" align="center" gutterBottom>
          4/13
        </Typography>
      </div>
    </Grid>
  </div>
  )
}

export default Movietipage4
