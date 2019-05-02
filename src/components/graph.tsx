import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Color from 'color';
import { assetItems, liabilityItems } from './config';

const Graph = (data) => {
  const assetBars = assetItems.map(function(elem, index) {
    const color = Color.rgb(255, 64, 0).lighten(0.1 + index * 0.25);
    return <Bar stackId="a" key={elem.name} dataKey={elem.name} name={elem.label} fill={color.string()} stroke="#333" label />;
  }).reverse();
  const liabilityBars = liabilityItems.map(function(elem, index) {
    const color = Color.rgb(0, 164, 255).lighten(0.1 + index * 0.25);
    return <Bar stackId="b" key={elem.name} dataKey={elem.name} name={elem.label} fill={color.string()} stroke="#333" label />;
  }).reverse();

  const graphData = [
    {
      // name: 'FY2018',
      cash: data.data.cash,
      currentAssets: data.data.currentAssets,
      nonCurrentAssets: data.data.nonCurrentAssets,
      currentLiabilities: data.data.currentLiabilities,
      nonCurrentLiabilities: data.data.nonCurrentLiabilities,
      equity: data.data.equity
    }
  ];

  return (
    <BarChart width={600} height={300} data={graphData}
        margin={{top: 20, right: 30, left: 20, bottom: 5}}>
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="name"/>
      <YAxis/>
      <Tooltip/>
      <Legend />
      {assetBars}
      {liabilityBars}
    </BarChart>
  )
}

export default Graph;
