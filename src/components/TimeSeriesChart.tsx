"use client";

import { ITimeSeriesChartProps } from "@/types";
import React, { FC } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

const TimeSeriesChart: FC<ITimeSeriesChartProps> = ({ data }) => {

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

  return (
    <div className="w-full h-[400px] px-4 pt-2 shadow rounded-2xl">
      <h1 className="font-bold text-sm pt-2">Temperature & Humidity</h1>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 10 }} className="w-full">
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" tickFormatter={formatDate} fontSize={9} />
          <YAxis
            dataKey="temperature"
            fontSize={9}
            label={{
              angle: -90,
              position: "none",
            }}
          />
          <Tooltip
            labelFormatter={(value) =>
              new Date(value).toLocaleDateString("en-GB", {
                weekday: "short",
                day: "2-digit",
                month: "short",
              })
            }
            formatter={(value: number) => [`${value.toFixed(2)} K`, "Temperature"]}
          />
          <Area
            type="monotone"
            dataKey="temperature"
            stroke="#8884d8" 
            fillOpacity={1} 
            fill="url(#colorUv)"
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
          <Area
            type="monotone"
            dataKey="humidity"
            stroke="#82ca9d" 
            fillOpacity={1} 
            fill="url(#colorPv)"
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSeriesChart;
