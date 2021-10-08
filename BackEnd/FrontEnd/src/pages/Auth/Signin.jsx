import React,{useState} from 'react';
import { useHistory } from 'react-router';
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core/';
import axios from 'axios';
import Logo from '../../image/Leadme.png';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',  
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
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
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '65%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  Field: {
    width: '65%', 
    marginTop: theme.spacing(1),
    // margin: 3,
  },
  submit: {
    width: '50%',
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  let history = useHistory();

  const classes = useStyles();
  const [user_id, setUser_id] = useState('')
  const [password, setPassword] = useState('')

  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}
        >
          <img src={Logo} 
            style={{
            display: 'flex' ,
            justifyContent: 'center',
            marginTop: 60,
          }} />
          <form className={classes.form} noValidate
            onSubmit={(e) => {
              e.preventDefault();
              let body = {
                email: user_id,
                password: password,
              }
              axios.post('/accounts/login', body) //라우터 설정 맞추기
                .then(res => {
                  localStorage.setItem('jwt', res.data.token)
                  localStorage.setItem('id', user_id)
                  localStorage.setItem('survey', res.data.surveyed)
                  localStorage.setItem('nickname', res.data.nickname)
                  localStorage.setItem('uid', res.data.user_pk)
                  if (res.data.surveyed === true){
                    history.push('/main')
                  }else{
                      history.push('/survey')
                  }
                })
                .catch(err => {
                  if (err.response.data === 'login failed') {
                    alert('아이디나 비밀번호를 확인해주세요.')
                    // 아이디 없을 때,
                    // 아이디나 비밀번호가 틀렸을 때,
                  } else {
                    alert('알 수 없는 오류로 다시 시도해주세요.')
                  }
                  console.log(err.response.data)
                })
            }}
          >
            <TextField
              onChange={(e)=>{setUser_id(e.target.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Email"
              label="Email"
              name="Email"
              autoComplete="Email"
              autoFocus
              style={{
                display: 'flex' ,
                justifyContent: 'center',
                marginTop: 40,
                }}
            />
            <TextField
              onChange={(e)=>{setPassword(e.currentTarget.value)}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="primary"
              style={{
                display: 'flex' ,
                justifyContent: 'center',
                marginTop: 40,
                }}
            />
            <Grid container xs={12}>
              <Grid item xs={9}>        
                <Typography component="h3" variant="h5"
                  style={{
                    display: 'flex' ,
                    justifyContent: 'left',
                    marginTop: 40,
                    }}
                >
                  처음이시라면?
                </Typography>         
              </Grid>
              <Grid item xs={3}>
                <Link href="/signup" variant="Signup"
                  style={{
                    display: 'flex' ,
                    justifyContent: 'right',
                    marginTop: 40,
                    }}
                >   
                  {"회원가입"}
                </Link>
              </Grid>
            </Grid>            
            <div 
              style={{
                display: 'flex' ,
                justifyContent: 'center',
                marginTop: 50,
              }}
            >
              <Button            
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                로그인
              </Button>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}