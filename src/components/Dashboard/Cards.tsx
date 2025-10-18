import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getWeatherByCity } from "@/lib/weather_api";
import { getTrafficByCity, getTrafficSummary } from "@/lib/traffic_api";
import { getIncidentsSummary } from "@/lib/incidents_api";
import { WeatherCard, TrafficCard, IncidentCard, TrafficCardOriginToDestination } from "../CCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Cards: React.FC = () => {
    const city = useSelector((state: RootState) => state.location.defaultCity);

    const {
        data: cityWeatherData,
        isLoading: loadingWeatherByCity,
        isError: errorWeatherByCity,
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
    } = useQuery({
        queryKey: ["traffic-summary"],
        queryFn: getTrafficSummary,
        refetchInterval: 100000,
    });

    const {
        data: trafficDataOriginToDestination,
        isLoading: loadingTrafficDataOriginToDestination,
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
    } = useQuery({
        queryKey: ["incident-summary"],
        queryFn: getIncidentsSummary,
        refetchInterval: 100000,
        staleTime: 120000
    });

    const isLoading =
        loadingWeatherByCity || loadingTrafficSummary || loadingIncidentSummary || loadingTrafficDataOriginToDestination;
    const isError = errorWeatherByCity || errorTrafficSummary || errorIncidentSummary;

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
