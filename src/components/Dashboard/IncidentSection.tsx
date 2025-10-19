import React from "react";
import { useQuery } from "@tanstack/react-query";
import IncidentTable from "../IncidentTable";
import { getIncidentsCurrent } from "@/lib/incidents_api";
import { Button } from "@heroui/react";

const IncidentSection: React.FC = () => {
    const {
        data: incidentData,
        isLoading,
        isError,
        refetch,
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
            <div className="pb-5">
                <div className="h-[400px] w-full flex items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    Error loading table

                    <Button
                        size="sm"
                        variant="flat"
                        color="warning"
                        className="ml-4"
                        onPress={() => refetch()}
                    >
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return <IncidentTable incidents={incidentData} />;
};

export default IncidentSection;
