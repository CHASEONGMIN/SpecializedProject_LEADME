import React, { PureComponent } from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';


const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

class CustomizedContent extends PureComponent {

  
  render() {
    const {depth, x, y, width, height, name } = this.props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 ? (
          <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
            {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text x={x + 4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9}>
          </text>
        ) : null}
      </g>
    );
  }
}

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/treemap-with-customized-content-7qxfp';

  
  render() {
    const list = this.props.data;
    const data =[];
    for(let li in list){
      data.push({"name":li,"size":list[li]});
    }
    return (
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          width={400}
          height={200}
          data={data}
          dataKey="size"
          ratio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
          content={<CustomizedContent colors={COLORS} />}
        />
      </ResponsiveContainer>
    );
  }
}
