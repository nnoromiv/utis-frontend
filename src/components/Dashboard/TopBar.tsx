"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, Spinner } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { setDefaultCity } from "@/store/locationSlice";
import { RootState } from "@/store";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { getAllCity } from "@/lib/weather_api";
import Link from "next/link";
import { getExportData } from "@/lib/api";
import { exportToExcel } from "@/helper/exportToExcel";

const TopBar = () => {
  const dispatch = useDispatch();
  const city = useSelector((state: RootState) => state.location.defaultCity);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getAllCity,
  });

  const {
    data: exportData,
    isLoading: loadingExport,
    isError: errorExport,
    refetch: exportRefetch,
  } = useQuery({
    queryKey: ["export-data"],
    queryFn: getExportData,
  });

  const selectOption = (value: string) => {
    dispatch(setDefaultCity(value || "London"));
  };

  const handleDownload = () => {
    if (loadingExport) {
      return;
    }

    if (errorExport) {
      exportRefetch(); // Optionally retry automatically
      return;
    }

    if (!exportData || exportData.length === 0) {
      return;
    }

    try {
      exportToExcel(exportData, "UTIS_Weather_Data");
      console.log("Excel file exported successfully!");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  return (
    <div className="w-full flex gap-60 max-lg:gap-20 max-md:gap-5 justify-between">
      <div className="w-full flex gap-3 items-center">
        {isLoading ? (
          <div className="h-[50px] w-full flex items-center justify-center rounded-lg bg-gray-100 dark:bg-neutral-800">
            <Spinner color="warning" size="sm" />
          </div>
        ) : isError ? (
          <div className="flex items-center gap-2 text-red-600">
            ⚠️ <span>Failed to load cities.</span>
            <Button
              size="sm"
              variant="flat"
              color="warning"
              onPress={() => refetch()}
            >
              Retry
            </Button>
          </div>
        ) : (
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">
                Current City - {city || "London"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Select City">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((item: string, index: number) => (
                  <DropdownItem key={index} onClick={() => selectOption(item)}>
                    {item}
                  </DropdownItem>
                ))
              ) : (
                <DropdownItem key="none" isDisabled>
                  No cities available
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>

      <div className="flex items-end gap-5">
        <Tooltip
          content={
            loadingExport
              ? "Preparing export..."
              : errorExport
                ? "Click to retry"
                : "Download data"
          }
        >
          <FontAwesomeIcon
            icon={faDownload}
            className={`cursor-pointer transition-all ${loadingExport ? "opacity-50 pointer-events-none" : "text-amber-900 hover:text-amber-700" }`}
            onClick={handleDownload}
          />
        </Tooltip>

        <Tooltip content="Refresh dashboard">
          <Link href="/" >
            <FontAwesomeIcon
              icon={faRefresh}
              className="cursor-pointer text-success"
            />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default TopBar;
