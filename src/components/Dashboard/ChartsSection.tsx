import React, { useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Divider } from "@heroui/react";
import TrafficHeatMap from "../TrafficHeatMap";
import TimeSeriesChart from "../TimeSeriesChart";
import { getWeatherTrafficCorrelation, getWeatherTrend } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setIsDataRefreshed } from "@/store/refreshSlice";

const ChartsSection: React.FC = () => {
    const dispatch = useDispatch();
    const isDataRefreshed = useSelector((state: RootState) => state.isDataRefreshed.refresh);

    const {
        data: heatMapData,
        isLoading: loadingHeatMapData,
        isError: errorHeatMapData,
        refetch: heatMapRefetch,
    } = useQuery({
        queryKey: ["heat-map"],
        queryFn: getWeatherTrafficCorrelation,
        refetchInterval: 100000,
    });

    const {
        data: weatherTrendData,
        isLoading: loadingWeatherTrendData,
        isError: errorWeatherTrendData,
        refetch: weatherTrendRefetch,
    } = useQuery({
        queryKey: ["weather-trend"],
        queryFn: getWeatherTrend,
        refetchInterval: 100000,
    });

    const isLoading = loadingHeatMapData || loadingWeatherTrendData;
    const isError = errorHeatMapData || errorWeatherTrendData;

    const handleRefetch = useCallback(async () => {
        try {
            await Promise.all([
                heatMapRefetch(),
                weatherTrendRefetch()
            ]);
            console.log("Dashboard data refreshed successfully");
        } catch (err) {
            console.error("Error refreshing dashboard data:", err);
        }
    }, [
        heatMapRefetch,
        weatherTrendRefetch,
    ]);

    useEffect(() => {
        if (isDataRefreshed) {
            handleRefetch();
            dispatch(setIsDataRefreshed(false));
        }
    }, [isDataRefreshed, handleRefetch, dispatch]);

    if (isLoading) {
        return (
            <div className="flex flex-row gap-2 max-lg:grid max-lg:grid-cols-1">
                <div className="h-[400px] w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800" />
                <Divider orientation="vertical" className="max-lg:hidden" />
                <div className="h-[400px] w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-row gap-2 max-lg:grid max-lg:grid-cols-1 pb-5">
                <div className="h-[400px] w-full flex items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    Error loading charts

                    <Button
                        size="sm"
                        variant="flat"
                        color="warning"
                        className="ml-4"
                        onPress={() => handleRefetch()}
                    >
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-row gap-2 max-lg:grid max-lg:grid-cols-1">
            <TrafficHeatMap data={heatMapData} />
            <Divider orientation="vertical" className="max-lg:hidden" />
            <TimeSeriesChart data={weatherTrendData} />
        </div>
    );
};

export default ChartsSection;
