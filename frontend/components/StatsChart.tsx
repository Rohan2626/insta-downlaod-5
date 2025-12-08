import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '00:00', downloads: 4000 },
  { name: '04:00', downloads: 3000 },
  { name: '08:00', downloads: 2000 },
  { name: '12:00', downloads: 2780 },
  { name: '16:00', downloads: 1890 },
  { name: '20:00', downloads: 2390 },
  { name: '23:59', downloads: 3490 },
];

const StatsChart: React.FC = () => {
  return (
    <div className="w-full h-64 mt-4">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Live Download Activity</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="name" stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Area type="monotone" dataKey="downloads" stroke="#ec4899" fill="#ec4899" fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;