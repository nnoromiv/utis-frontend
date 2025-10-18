"use client";

import React, { FC, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { createIncidentGeoJSON, createTrafficGeoJSON } from "@/helper";
import { IMapBoxProps } from "@/types";

const MapBox : FC<IMapBoxProps> = ({ trafficData, incidentData}) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const api = process.env.NEXT_PUBLIC_MAPBOX_API as string;

    useEffect(() => {
        if (!mapContainerRef.current) return;
        if (!api) {
            console.error("Mapbox API key is missing!");
            return;
        }

        mapboxgl.accessToken = api;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [-0.1276, 51.5072], // London
            zoom: 11,
        });

        mapRef.current = map;

        map.addControl(new mapboxgl.FullscreenControl());

        map.on("load", async () => {
            /** TRAFFIC LINES **/
            const trafficGeoJson = await createTrafficGeoJSON(trafficData, api);

            map.addSource("traffic-routes", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: trafficGeoJson,
                },
            });

            map.addLayer({
                id: "traffic-lines",
                type: "line",
                source: "traffic-routes",
                paint: {
                    "line-width": 5,
                    "line-opacity": 0.9,
                    "line-color": [
                        "interpolate",
                        ["linear"],
                        ["get", "congestion_percentage"],
                        0, "#00FF00",   // green
                        15, "#ADFF2F",
                        40, "#FFFF00",
                        65, "#FFA500",
                        90, "#FF0000",  // red
                    ],
                },
            });

            /** INCIDENT POINTS **/
            const incidentGeoJson = await createIncidentGeoJSON(incidentData, api);

            map.addSource("incidents", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: incidentGeoJson,
                },
            });

            // Pins
            map.addLayer({
                id: "incident-points",
                type: "circle",
                source: "incidents",
                paint: {
                    "circle-radius": 7,
                    "circle-stroke-width": 2,
                    "circle-color": [
                        "match",
                        ["get", "severity"],
                        "Severe", "#FF0000",
                        "Moderate", "#FFA500",
                        "Minimal", "#00FF00",
                        "#888888", // default gray
                    ],
                    "circle-stroke-color": "#ffffff",
                },
            });

            // Tooltip popup
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false,
            });

            map.on("mouseenter", "incident-points", (e) => {
                map.getCanvas().style.cursor = "pointer";
                const feature = e.features?.[0];
                if (!feature) return;

                const { location, severity, category, sub_category, current_update } =
                    feature.properties as Record<string, string>;

                if (feature.geometry?.type === "Point") {
                    const coords = feature.geometry.coordinates as [number, number];
                    const html = `
            <div style="font-size: 14px;">
              <strong>${category}</strong> (${severity})<br/>
              ${sub_category}<br/>
              <em>${current_update}</em><br/>
              <small>${location}</small>
            </div>
          `;
                    popup.setLngLat(coords).setHTML(html).addTo(map);
                }
            });

            map.on("mouseleave", "incident-points", () => {
                map.getCanvas().style.cursor = "";
                popup.remove();
            });
        });

        return () => map.remove();
    }, [api, incidentData, trafficData]);

    return (
        <div className="w-full h-[300px] pb-3">
            <div ref={mapContainerRef} className="w-full h-full map-container" />
        </div>
    )
};

export default MapBox;
