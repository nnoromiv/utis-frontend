import React from "react";
import { useQuery } from "@tanstack/react-query";
import IncidentTable from "../IncidentTable";
import { getIncidentsCurrent } from "@/lib/incidents_api";

const IncidentSection: React.FC = () => {
    const {
        data: incidentData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["incident-current"],
        queryFn: getIncidentsCurrent,
        refetchInterval: 100000,
        staleTime: 220000
    });

    if (isLoading) {
        return (
            <div className="h-[400px] w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800" />
        );
    }

    if (isError) {
        return (
            <div className="h-[400px] w-full flex items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                Error loading incidents
            </div>
        );
    }

    return <IncidentTable incidents={incidentData} />;
};

export default IncidentSection;
