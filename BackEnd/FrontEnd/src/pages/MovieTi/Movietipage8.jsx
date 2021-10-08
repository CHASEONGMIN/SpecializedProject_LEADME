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
    width: '31%',  
    height: '50%',  
    margin: theme.spacing(3, 0, 2),
    fontSize: '2rem',
  },
}));
function Movietipage8() {
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
        Q. 08 
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        영화 원데이클래스에 참여하게 된 당신! 
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
                "result": "E"
              }
            },)
              .then(res => {
                history.push(`/movie/movieti/9`)
              })
              .catch(err => {
                console.log(err)
              })
          }} 
        >
          저도 그 영화 재밌게봤어요, 대화에 적극적으로 참여한다.
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
                "result": "I"
              }
            },)
              .then(res => {
                history.push(`/movie/movieti/9`)
              })
              .catch(err => {
                console.log(err)
              })
          }} 
        >
          다른사람들이 하는말을 들으며 고개를 끄덕이며 공감의 표시를 한다. 
        </Button>     
        <Typography variant="h6" align="center" gutterBottom>
          8/13
        </Typography>
    </div>
    </Grid>
  </div>
  )
}

export default Movietipage8
