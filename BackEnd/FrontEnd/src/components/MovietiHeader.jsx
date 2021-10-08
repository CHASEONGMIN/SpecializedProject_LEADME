import React from 'react'
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Grid,
  AppBar,
  makeStyles,
} from '@material-ui/core';
import Logo from '../image/Leadme.png';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.common.white,
  },
}));

function MovietiHeader() {
  const classes = useStyles();
  const history = useHistory();

  return (
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
                
          <Typography variant="h3" align="center" paragraph style={{marginRight:250, color:"white"}}>
            MovieTI      
          </Typography>
          
          <Grid item>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  )
}

export default MovietiHeader
