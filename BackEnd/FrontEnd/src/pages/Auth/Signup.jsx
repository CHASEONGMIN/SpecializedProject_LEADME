import React, {useState} from 'react';
import { useHistory } from 'react-router';
import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  makeStyles,
} from '@material-ui/core/';
import axios from 'axios';
import Logo from '../../image/Leadme.png';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',  
    // 크기 조정 해줘야 함.
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)', //추후 사진 교체
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: '#121212'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  Field: {
    width: '45%', 
    marginTop: theme.spacing(1),
    // margin: 3,
  },
  submit: {
    width: '25%', 
    margin: theme.spacing(3, 0, 2),
    alignItems: "center"
  },
  submit2: {
    width: '25%', 
    marginLeft: theme.spacing(1),
    margin: theme.spacing(1, 0, 2),
    alignItems: "center"
  },
  img2: {
    width: '50%',
    justifyContent: 'center',
  },
}));

export default function SignUp() {
  let history = useHistory();

  const classes = useStyles();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setpasswordConfirmation] = useState('')


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />      
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    <div className={classes.paper}>  
          <div
              style={{
                display: 'flex' ,
                justifyContent: 'center',
                marginTop: 50,
                }} 
            >
        <img src={Logo} className={classes.img2}
              style={{
              marginTop: 60,
            }} />       
          </div>      
            <div
              style={{
                display: 'flex' ,
                justifyContent: 'center',
                marginTop: 50,
                marginLeft: 70,
                }} 
            >
              <TextField
                className={classes.Field}
                onChange={(e)=>{setEmail(e.target.value)}}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                type="email"
                id="email"
                autoComplete="email"
              />
              <form noValidate
                onSubmit={(e) =>{
                  e.preventDefault();
                  let body = {
                    user_email: email,              
                  }
                  axios.post('/accounts/checkEmail', body) //백쪽 api로 post 요청
                    .then(res => {                 
                      alert('사용 가능한 이메일입니다.')
                    })
                    .catch(err => {
                      alert('사용 불가능한 이메일입니다.')
                      console.log(err.response.data)
                    })
                }}  
              >
              <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit2}                 
                >
                  중복확인
              </Button>
            </form>
            </div>
            <form noValidate
            className={classes.form}
            onSubmit={(e) =>{
              e.preventDefault();
              let body = {
                password: password,
                passwordConfirmation: passwordConfirmation,
                email: email,
              }
              axios.post('/accounts/signup', body) //백쪽 api로 post 요청
                .then(res => {                  
                  history.push('/')
                })
                .catch(err => {
                  alert('동일한 비밀번호를 입력해주세요')
                  console.log(err.response.data)
                })
            }}  
          >            
            <div
              style={{
                display: 'flex' ,
                justifyContent: 'center',
                marginTop: 30,
                }} 
            >
              <TextField
                className={classes.Field}
                onChange={(e)=>{setPassword(e.target.value)}}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
                autoComplete="password1"
              />
            </div>
            <div
            style={{
              display: 'flex' ,
              justifyContent: 'center',
              marginTop: 30,
              }} 
            >
              <TextField
                className={classes.Field}
                onChange={(e)=>{setpasswordConfirmation(e.target.value)}}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="passwordConfirmation"
                label="Confirm Password"
                type="password"
                id="passwordConfirmation"
                autoComplete="passwordConfirmation"
              />   
            </div>
            <div 
              style={{
                display: 'flex' ,
                justifyContent: 'center',
                marginTop: 60,
                }}
            >    
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                회원가입
              </Button>
            </div>
          </form>

        </div>
      </Grid>
    </Grid>
  );}
