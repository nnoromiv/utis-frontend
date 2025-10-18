import { transformToHeatmapData } from "@/helper";
import React, { FC } from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { ITrafficHeatMapProps } from "@/types";

const TrafficHeatMap : FC<ITrafficHeatMapProps> = ({ data }) => {
    const heatmapData = transformToHeatmapData(data)

    return (
      <div className="w-full h-[400px] px-4 pt-2 shadow rounded-2xl">
        <h1 className="font-bold text-sm pt-2">Heat Map</h1>
            <ResponsiveHeatMap
                data={heatmapData}
                margin={{ top: 30, right: 30, bottom: 50, left: 30 }}
                colors={{
                    type: 'diverging',
                    scheme: 'red_yellow_green',
                    divergeAt: 0.7,
                    minValue: -1.0,
                    maxValue: 1
                }}
                emptyColor="#555555"
                enableLabels={true}
                labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
                axisTop={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 10,
                    legend: "",
                    legendOffset: 36
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 78,
                    legend: "",
                    legendOffset: -40
                }}
            />
        </div>
    );
};

export default TrafficHeatMap;
