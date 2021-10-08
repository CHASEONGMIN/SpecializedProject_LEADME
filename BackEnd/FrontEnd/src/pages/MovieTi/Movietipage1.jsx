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
function Movietipage1() {
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
          Q. 01  
        </Typography>
        <Typography variant="h3" align="center" color="text.secondary" paragraph>
          어떤 영화를 좋아하세요?  
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
                  "result": ""
                }
              },)
                .then(res => {
                  history.push(`/movie/movieti/2`)
                })
                .catch(err => {
                  console.log(err)
                })
            }}                                        
          >
            볼거리 많은 액션
          </Button>                
          <Button
            type="submit"            
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
                  "result": ""
                }
              },)
                .then(res => {
                  history.push(`/movie/movieti/2`)
                })
                .catch(err => {
                  console.log(err)
                })
            }}             
          >
            감동적인 드라마
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
                  "result": ""
                }
              },)
                .then(res => {
                  history.push(`/movie/movieti/2`)
                })
                .catch(err => {
                  console.log(err)
                })
            }}              
          >
            심장 쪼이는 스릴러
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
                  "result": ""
                }
              },)
                .then(res => {
                  history.push(`/movie/movieti/2`)
                })
                .catch(err => {
                  console.log(err)
                })
            }}               
          >
            알콩달콩 로맨스
          </Button>        
          <Typography variant="h6" align="center" gutterBottom>
            1/13
          </Typography>
        </div>
      </Grid>
    </div>
  )
}

export default Movietipage1
