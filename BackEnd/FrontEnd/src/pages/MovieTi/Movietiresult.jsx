import React, { useState, useEffect }  from 'react'
import {useHistory} from 'react-router-dom';
import {
  Typography,
  makeStyles,
  Grid,
  Card,
  CardMedia,
  AppBar,
  Button
} from '@material-ui/core'
import axios from 'axios';
import Logo from '../../image/Leadme.png';

const useStyles = makeStyles((theme) => ({
  submit: {
    width: '10%',
    margin: theme.spacing(3, 0, 2),

  },
  content: {
    marginTop: 50,
  },
  text: {
    marginTop: 10,
  },
  text2: {
    marginTop: 40,
  },
  image: {
    marginTop: 65,
    height: "500px",
    width: "350px",    
  },
  card: {
    marginTop: 75,
    height: '30vh',
    width: '240px',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%',
    height:"100%"
  },
}));
function Movietimain() {

  useEffect(()=>{
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
                  console.log(res.data.movielist[0].poster_path)                  
                  setCharacter(res.data.character)  
                  setImgurl(res.data.imgurl)
                  setTitle(res.data.title)
                  setContent1(res.data.content1)
                  setContent2(res.data.content2)
                  setContent3(res.data.content3)
                  setContent4(res.data.content4)
                  setContent5(res.data.content5)
                  setPoster(res.data.movielist[0].poster_path)
                  setPoster1(res.data.movielist[1].poster_path)
                  setPoster2(res.data.movielist[2].poster_path)
                  setPoster3(res.data.movielist[3].poster_path)
                })
                .catch(err => {
                  console.log(err)
                })
  },[]);

  const classes = useStyles();
  const history = useHistory();
  const [character, setCharacter] = useState('')
  const [title, setTitle] = useState('')
  const [imgurl, setImgurl] = useState('')
  const [content1, setContent1] = useState('')
  const [content2, setContent2] = useState('')
  const [content3, setContent3] = useState('')
  const [content4, setContent4] = useState('')
  const [content5, setContent5] = useState('')
  const [poster, setPoster] =  useState('')
  const [poster1, setPoster1] =  useState('')
  const [poster2, setPoster2] =  useState('')
  const [poster3, setPoster3] =  useState('')
  



  return (
    <div>
      <div>
      <AppBar position="relative" style={{ background: 'transparent', boxShadow: 'none', marginTop:20}}>
        <Grid container justify="space-around" alignItems="center">
          <Grid item style={{marginRight:0}}>
            <img src={Logo} className={classes.img}
                onClick={()=>{
                  history.push('/main');
                }}
                style={{
                display: 'flex' ,
                justifyContent: 'center',            
              }} />
          </Grid>
                
          <Typography variant="h3" align="center" paragraph style={{marginRight:200, color:'white'}}>
            MovieTI      
          </Typography>
          
          <Grid item>
                <Button
                  // size="small"
                  onClick={()=>{
                    history.push('/movie/movietimain');
                  }}
                  variant="outlined" color="secondary"
                  >
                  다시 검사하기
                </Button>
          </Grid>
        </Grid>
      </AppBar>
    </div>

      <div>
        <Grid container spacing={12} className={classes.content}>
              <Grid item xs={8}>
                <Grid item xs={12} >
                  <Typography variant="h2" align="center">
                    {character}
                  </Typography>
                  <Typography variant="h2" align="center" className={classes.text} style={{color:'white'}}>
                    {title}
                  </Typography>
                </Grid>
                <Grid container spacing={12}>
                  <Grid item xs={5}
                    style={{
                      display: 'flex' ,
                      justifyContent: 'center'          
                      }} 
                  >
                    <img src={imgurl} className={classes.image}/>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" align="left" className={classes.text2}>
                      {content1} </Typography>
                    <Typography variant="h6" align="left" className={classes.text2}>
                      {content2}  </Typography>
                    <Typography variant="h6" align="left" className={classes.text2}>
                      {content3} </Typography>       
                    <Typography variant="h6" align="left" className={classes.text2}>
                      {content4} </Typography>         
                    <Typography variant="h6" align="left" className={classes.text2}>
                      {content5} </Typography>                                        
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                  <Grid item xs={9}>
                    <Typography variant="h2" align="center" style={{color:'violet'}}>
                      비슷한 영화
                    </Typography>
                  </Grid>
                <Grid container spacing={12}>                  
                    <Grid xs={5}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={`https://image.tmdb.org/t/p/original${poster}`}
                        />
                      </Card>
                    </Grid>
                    <Grid xs={5}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={`https://image.tmdb.org/t/p/original${poster1}`}
                        />
                      </Card>
                    </Grid>              
                </Grid>    
                <Grid container spacing={12}>                  
                    <Grid xs={5}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={`https://image.tmdb.org/t/p/original${poster2}`}
                        />
                      </Card>
                    </Grid>
                    <Grid xs={5}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={`https://image.tmdb.org/t/p/original${poster3}`}
                        />
                      </Card>
                    </Grid>              
                </Grid>                   
              </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Movietimain
