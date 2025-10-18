import React, { FC, useCallback } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
} from "@heroui/react";
import { IColumnKey, IIncidentData, IIncidentTableProps } from "@/types";

export const columns = [
    { name: "LOCATION", uid: "location" },
    { name: "CATEGORY", uid: "category" },
    { name: "UPDATE", uid: "current_update" },
    { name: "SEVERITY", uid: "severity" },
    { name: "END DATE", uid: "end_date" },
];

const severityColorMap: Record<"Minimal" | "Moderate" | "Severe", "success" | "warning" | "danger" | "default" | "primary" | "secondary" | undefined> = {
    Minimal: "success",
    Moderate: "warning",
    Severe: "danger",
};

const IncidentTable : FC<IIncidentTableProps> = ({ incidents }) => {
    const renderCell = useCallback((incident: IIncidentData, columnKey: IColumnKey) => {
        const cellValue = incident[columnKey as keyof IIncidentData];

        switch (columnKey) {
            case "severity":
                return (
                    <Chip
                        className="capitalize"
                        color={severityColorMap[incident.severity as "Minimal" | "Moderate" | "Severe"] || "default"}
                        size="sm"
                        variant="flat"
                    >
                        {incident.severity}
                    </Chip>
                );
            default:
                return <p className="text-xs max-md:text-[9px]">{cellValue}</p>;
        }
    }, []);

    return (
        <Table aria-label="Traffic Incident Table" className="mt-6 pb-6 max-md:pb-16">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>

            <TableBody items={incidents}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof IIncidentData)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}


export default IncidentTable