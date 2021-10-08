import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  AppBar,
  useScrollTrigger,
  Slide,
  Box,
  FormControl,
  InputLabel,
  makeStyles,
  withStyles,
  InputBase,
  Select,
  MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types'
import {AiOutlineSearch} from "react-icons/ai";
import Logo from '../../image/Leadme.png';

const HideOnScroll=(props)=>{
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      // 기본 속성 값 
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,    
    
    padding: '5px 26px 10px 10px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),

    fontFamily: [
      'fontPrimary',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  heroContent: {    
    padding: theme.spacing(3, 0, 3),
    margin: {
      margin: theme.spacing(5),
    },
  },
  search: {
    width: '100%',
    height: '80%',
  },
  sort: {
    width: '100%',
    height: '80%',
  },
  searchLabel: {
    margin: '0px 0px 0px 0px',
    fontSize:"24px"
  },
  button: {
    width: '40%',
  },
  img: {
    height: '30%',
  },
}));

const Header = props => {
  let history = useHistory();
  const classes = useStyles();
  const [sort, setSort] = useState('');
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const [name] = useState(localStorage.getItem("nickname"));

  const [searchWord, setSearchWord] = useState([]);

  return (
    <HideOnScroll {...props}>
    <AppBar position="relative" style={{ background: '#101010', boxShadow: 'none'}}>
      <Grid container  justify="space-between" alignItems="center" spacing={12}
      > 
        <Grid item xs={3}
          style={{                  
            display: 'flex' ,    
            justifyContent: 'center',            
          }} 
        >
          <img src={Logo} className={classes.img}
            onClick={()=>{
              history.push('/main');
            }}
            style={{
            display: 'flex' ,
            justifyContent: 'center',            
          }} />
        </Grid>
                    
        <Grid item xs={7}
          style={{                  
            display: 'flex' ,    
            justifyContent: 'center',
          }} 
        >          
            <Box bgcolor="" width="100%">
                <form onSubmit={(e)=>{
                    e.preventDefault();                      
                    history.push('/search') 
                    }}>
                    <Grid item xs={10}
                      style={{                  
                        display: 'flex' ,    
                        justifyContent: 'right',
                      }} 
                    >
                    <FormControl className={classes.search}                  
                    >                    
                        {/* <TextField> */}
                          <BootstrapInput 
                            id="demo-customized-textbox"
                            onChange={(e)=>{
                              setSearchWord(e.target.value);
                            }}
                          />                        
                        {/* </TextField> */}
                    </FormControl>                  
                  <Grid item xs={2}
                      style={{                  
                        display: 'flex' ,    
                        justifyContent: 'center',
                      }} 
                    >
                        <AiOutlineSearch
                          onClick = { ()=> {history.push({
                          pathname:`movie/search/title/${searchWord}`,
                          state:{searchWord:searchWord},
                        })}}
                        style={{ fontSize: '30px', color: 'violet' }}>
                        </AiOutlineSearch>  
                  </Grid>        
                  </Grid>            
                </form>
            </Box>
          </Grid>
          <Grid item xs={2} 
            style={{                  
              display: 'flex' ,    
              justifyContent: 'end',
            }} 
          >     
            <Grid item xs={8} 
            style={{                  
              display: 'flex' ,    
              justifyContent: 'end',
            }} 
          >     
              <FormControl fullWidth>
                <InputLabel
                  style={{                  
                    display: 'flex' ,    
                    justifyContent: 'center',
                    color:'violet',
                  }} 
                >안녕하세요 {name}님!!</InputLabel>
                <Select                
                  value={sort}                  
                  onChange={handleChange}
                >
                  <MenuItem value={10}
                      onClick={()=>{
                        history.push('/mypage') 
                      }}                      
                      >마이페이지</MenuItem>
                  <MenuItem value={20}
                      onClick={()=>{
                        history.push('/') 
                      }}  
                      >로그아웃</MenuItem>
                </Select>
              </FormControl>
              </Grid>
            </Grid>
      </Grid>
    </AppBar>
  </HideOnScroll>
  );
};

export default Header;
