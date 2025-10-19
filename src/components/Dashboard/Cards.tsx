import React, { useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWeatherByCity } from "@/lib/weather_api";
import { getTrafficByCity, getTrafficSummary } from "@/lib/traffic_api";
import { getIncidentsSummary } from "@/lib/incidents_api";
import { WeatherCard, TrafficCard, IncidentCard, TrafficCardOriginToDestination } from "../CCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@heroui/react";
import { setIsDataRefreshed } from "@/store/refreshSlice";

const Cards: React.FC = () => {
    const dispatch = useDispatch();
    const city = useSelector((state: RootState) => state.location.defaultCity);
    const isDataRefreshed = useSelector((state: RootState) => state.isDataRefreshed.refresh);

    const {
        data: cityWeatherData,
        isLoading: loadingWeatherByCity,
        isError: errorWeatherByCity,
        refetch: weatherRefetch,
    } = useQuery({
        queryKey: ["weather-city", city],
        queryFn: () => getWeatherByCity(city),
        refetchInterval: 100000,
        enabled: Boolean(city),
        staleTime: 120000
    });

    const {
        data: trafficSummary,
        isLoading: loadingTrafficSummary,
        isError: errorTrafficSummary,
        refetch: trafficRefetch,
    } = useQuery({
        queryKey: ["traffic-summary"],
        queryFn: getTrafficSummary,
        refetchInterval: 100000,
    });

    const {
        data: trafficDataOriginToDestination,
        isLoading: loadingTrafficDataOriginToDestination,
        refetch: trafficOriginToDestinationRefetch,
    } = useQuery({
        queryKey: ["traffic-origin-destination", "London", city],
        queryFn: () => getTrafficByCity("London", city),
        refetchInterval: 100000,
        enabled: Boolean(city && city !== "London"),
        staleTime: 120000
    });


    const {
        data: incidentSummary,
        isLoading: loadingIncidentSummary,
        isError: errorIncidentSummary,
        refetch: incidentRefetch,
    } = useQuery({
        queryKey: ["incident-summary"],
        queryFn: getIncidentsSummary,
        refetchInterval: 100000,
        staleTime: 120000
    });

    const isLoading =
        loadingWeatherByCity || loadingTrafficSummary || loadingIncidentSummary || loadingTrafficDataOriginToDestination;
    const isError = errorWeatherByCity || errorTrafficSummary || errorIncidentSummary;

    const handleRefetch = useCallback(async () => {
        try {
            const coreRefetches = [
                weatherRefetch(),
                trafficRefetch(),
                incidentRefetch(),
            ];

            // If the city isn't London, also refresh traffic origin→destination
            if (city && city !== "London") {
                coreRefetches.push(trafficOriginToDestinationRefetch());
            }

            await Promise.all(coreRefetches);
            console.log("Dashboard data refreshed successfully");
        } catch (err) {
            console.error("Error refreshing dashboard data:", err);
        }
    }, [city, incidentRefetch, trafficOriginToDestinationRefetch, trafficRefetch, weatherRefetch]);

    useEffect(() => {
        if (isDataRefreshed) {
            handleRefetch();
            dispatch(setIsDataRefreshed(false));
        }
    }, [isDataRefreshed, handleRefetch, dispatch]);

    if (isLoading) {
        return (
            <div className="flex justify-between w-full gap-3 mb-2 max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="h-[150px] w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
                    />
                ))}
            </div>
        );
    }


    if (isError) {
        return (
            <div className="flex justify-between w-full gap-3 mb-2 max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1">
                <div className="h-[150px] w-full flex items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    Error loading summaries
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
        <div className='flex justify-between w-full gap-3 mb-2 max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1'>
            <WeatherCard weatherData={cityWeatherData} />
            <TrafficCard trafficSummary={trafficSummary} />
            {
                city !== "London" && trafficDataOriginToDestination &&
                (<TrafficCardOriginToDestination trafficDataOriginToDestination={trafficDataOriginToDestination} />)
            }
            <IncidentCard incidentSummary={incidentSummary} />
        </div>
    );
};

export default Cards;
