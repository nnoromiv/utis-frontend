import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTrafficCurrent } from "@/lib/traffic_api";
import { getIncidentsCurrent } from "@/lib/incidents_api";
import MapBox from "../MapBox";
import { Button } from "@heroui/react";

const TrafficIncidentMapSection: React.FC = () => {
    
    const {
        data: trafficData,
        isLoading: loadingTrafficData,
        isError: errorTrafficData,
        refetch: trafficRefetch,
    } = useQuery({
        queryKey: ["traffic-current"],
        queryFn: getTrafficCurrent,
        refetchInterval: 100000,
    });

    const {
        data: incidentData,
        isLoading: loadingIncidentData,
        isError: errorIncidentData,
        refetch: incidentRefetch,
    } = useQuery({
        queryKey: ["incident-current"],
        queryFn: getIncidentsCurrent,
        refetchInterval: 100000,
    });

    // Combined loading/error flags
    const isLoading = loadingTrafficData || loadingIncidentData;
    const isError = errorTrafficData || errorIncidentData;

    const handleRefetch = () => {
        trafficRefetch();
        incidentRefetch();
    }

    // Handle loading state
    if (isLoading) {
        return (
            <div className="h-[300px] w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                Loading live traffic & incidents...
            </div>
        );
    }

    // Handle error state
    if (isError) {
        return (
            <div className="h-[300px] w-full flex items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                Failed to load traffic or incident data. Please try again later.
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
        );
    }

    // Handle empty state
    if (!trafficData?.length || !incidentData?.length) {
        return (
            <div className="h-[300px] w-full flex items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                No active traffic or incidents found.
            </div>
        );
    }

    // Render Map
    return <MapBox trafficData={trafficData} incidentData={incidentData} />;
};

export default TrafficIncidentMapSection;
