import React, { useState, useEffect } from 'react';
import 
{ Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } 
from 'recharts';
import axios from 'axios';

const Chart_star = () => {
  

  useEffect(()=>{
    axios.get(`/accounts/favorite/user`, {
                headers: {
                  Authorization: `JWT ${localStorage.getItem('jwt')}`,
                  'Content-Type': 'application/json'
                }                
              },)
                .then(res => {
                  // console.log(res.data.cnt_rate[4])
                  localStorage.setItem('movie_count', res.data.rated_movie_cnt) // 평가한 영화 개수
                  localStorage.setItem('average_rate', res.data.average_rate) // 평균 평점
                  localStorage.setItem('most_rate', res.data.most_rate) // 가장 많은 평점 및 개수
                  setcount1(res.data.cnt_rate[1])  // 각 평점 별 개수 
                  setcount2(res.data.cnt_rate[2])
                  setcount3(res.data.cnt_rate[3])
                  setcount4(res.data.cnt_rate[4])
                  setcount5(res.data.cnt_rate[5])
                })
                .catch(err => {
                  console.log(err)
                })
  },[]);

  const [name] = useState(localStorage.getItem("nickname"));
  const [count1, setcount1] = useState(0);
  const [count2, setcount2] = useState(0);
  const [count3, setcount3] = useState(0);
  const [count4, setcount4] = useState(0);
  const [count5, setcount5] = useState(0);


  const data = [
    {
      subject: '1점',
      A: count1,
      fullMark: 20,
    },
    {
      subject: '2점',
      A: count2,
      fullMark: 20,
    },
    {
      subject: '3점',
      A: count3,
      fullMark: 20,
    },
    {
      subject: '4점',
      A: count4,
      fullMark: 20,
    },
    {
      subject: '5점',
      A: count5,
      fullMark: 20,
    },
  ];

    return(
      <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data} fill='#8884d8'>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            {/* <PolarRadiusAxis /> */}
            <Radar name={name} dataKey= "A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.7}/>
          </RadarChart>
        </ResponsiveContainer>
    );  
};


export default Chart_star;