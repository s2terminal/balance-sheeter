import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
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

  const graphData = data.data.bs.map((bs, index) => {
    return {
      name: bs.date,
      cash: bs.cash,
      currentAssets: bs.currentAssets,
      nonCurrentAssets: bs.nonCurrentAssets,
      currentLiabilities: bs.currentLiabilities,
      nonCurrentLiabilities: bs.nonCurrentLiabilities,
      equity: bs.equity
    }
  });

  return (
    <ResponsiveContainer height={320}>
      <BarChart data={graphData}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        {assetBars}
        {liabilityBars}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Graph;