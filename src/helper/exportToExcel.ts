import { IExportData } from "@/types";
import * as XLSX from "xlsx";

export const exportToExcel = (data: IExportData, fileName: string) => {
    if (!data) {
        console.error("No data to export");
        return;
    }

    try {
        const workbook = XLSX.utils.book_new();

        (Object.keys(data) as (keyof IExportData)[]).forEach((key) => {
            const sheetData = data[key];

            if (Array.isArray(sheetData)) {
                const worksheet = XLSX.utils.json_to_sheet(sheetData);
                XLSX.utils.book_append_sheet(
                    workbook,
                    worksheet,
                    key.charAt(0).toUpperCase() + key.slice(1)
                );
            }
        });


        // Write file
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
        console.log("Excel file exported successfully!");
    } catch (error) {
        console.error("Error exporting Excel file:", error);
    }
};
