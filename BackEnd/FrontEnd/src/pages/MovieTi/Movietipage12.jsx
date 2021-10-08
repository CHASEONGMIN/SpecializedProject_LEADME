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
function Movietipage12() {
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
        Q. 12
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        미리 찾아봤던 영화 시간표가 다음날 시간표이다. 당신의 선택은?
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
                "result": "J"
              }
            },)
              .then(res => {
                history.push(`/movie/movieti/13`)
              })
              .catch(err => {
                console.log(err)
              })
          }}
        >
          근처에 영화관이 있는지 다시 검색해본다
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
                "result": "P"
              }
            },)
              .then(res => {
                history.push(`/movie/movieti/13`)
              })
              .catch(err => {
                console.log(err)
              })
          }}
        >
          그럼 되는 시간에 보지뭐, 다른거 하고 있자
        </Button>
        <Typography variant="h6" align="center" gutterBottom>
          12/13
        </Typography>
      </div>
    </Grid>
  </div>
  )
}

export default Movietipage12
