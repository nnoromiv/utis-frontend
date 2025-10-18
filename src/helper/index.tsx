import { ICorrelationMatrix, IIncidentData, ITrafficData } from "@/types";
import { GeoJsonProperties, Geometry } from "geojson";

async function geocodeLocation(location: string, apiKey: string): Promise<[number, number]> {
    const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${apiKey}`
    );
    const data = await res.json();
    return data.features[0]?.center;
}

async function fetchRouteGeometry(originCoords: [number, number], destinationCoords: [number, number], apiKey: string) {
    const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoords.join(
            ","
        )};${destinationCoords.join(",")}?geometries=geojson&overview=full&access_token=${apiKey}`
    );
    const data = await res.json();
    return data.routes[0]?.geometry; // [lng, lat]
}

export async function createTrafficGeoJSON(trafficData: ITrafficData[], apiKey: string) {
    const features: GeoJSON.Feature<Geometry, GeoJsonProperties>[] = [];

    for (const t of trafficData) {
        try {
            const [originCoords, destinationCoords] = await Promise.all([
                geocodeLocation(t.origin, apiKey), geocodeLocation(t.destination, apiKey)
            ])

            if (!originCoords || !destinationCoords) {
                console.warn("Invalid geocoding result for:", t);
                continue;
            }

            const routeGeometry = await fetchRouteGeometry(originCoords, destinationCoords, apiKey)

            if (!routeGeometry) {
                console.warn("No route found for:", t);
                continue;
            }

            features.push({
                type: "Feature",
                properties: { ...t },
                geometry: routeGeometry
            });
        } catch (err) {
            console.error("Error creating route for:", t, err);

        }
    }

    return features
}

export async function createIncidentGeoJSON(incidentData: IIncidentData[], apiKey: string) {
    const features: GeoJSON.Feature<Geometry, GeoJsonProperties>[] = [];

    for (const i of incidentData) {
        try {
            const coords = await geocodeLocation(i.location, apiKey)

            if (!coords) {
                console.warn("Invalid geocoding result for:", i);
                continue;
            }

            features.push({
                type: "Feature",
                properties: { ...i },
                geometry: {
                    type: "Point",
                    coordinates: coords
                }
            });
        } catch (err) {
            console.error("Error creating route for:", i, err);

        }
    }

    return features
}

export function transformToHeatmapData(matrix: ICorrelationMatrix) {
  return Object.entries(matrix).map(([rowKey, rowValues]) => ({
    id: rowKey,
    data: Object.entries(rowValues).map(([colKey, value]) => ({
      x: colKey,
      y: value,
    })),
  }));
}

export function kelvinToCelsius(kelvin: number): string {
    return (kelvin - 273.15).toFixed(2);
}
