export interface ILinks {
    label: string;
    href: string;
    icon: React.JSX.Element | React.ReactNode;
}

export interface ISidebarContextProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    animate: boolean;
}

export type ICard = {
    id: number;
    name: string;
    designation: string;
    content: React.ReactNode;
};

interface ITrafficSpeed {
    type: "no_traffic" | "with_traffic" | string
    speed_kmh: number
}

export interface IWeatherData {
    city: string
    temperature: number
    humidity: number
    visibility: number
    condition: string
    wind_speed: number
    timestamp: string
    id: number
}

export interface IWeatherProps {
    weatherData: IWeatherData
}

export type ITrafficData = {
    id: number
    origin: string
    destination: string
    journey_time_min: number
    journey_time_with_traffic_min: number
    delay_min: number
    congestion_percentage: number
    timestamp: string
    traffic_speeds?: ITrafficSpeed[]
}

export interface TrafficCardOriginToDestinationProps {
    trafficDataOriginToDestination: ITrafficData
}

export type IIncidentData = {
    id: string
    severity: "Minimal" | "Moderate" | "Severe" | string;
    category: string
    sub_category: string
    current_update: string
    location: string
    start_date: string
    end_date: string
    timestamp: string
}

export type ISeverity = "Minimal" | "Moderate" | "Severe" | string

export type IFeature =
    | "temperature"
    | "humidity"
    | "wind_speed"
    | "delay_min"
    | "congestion_percentage";

export type ICorrelationMatrix = Record<IFeature, Record<IFeature, number>>

interface ITimeSeriesData {
    timestamp: string
    temperature: number
    humidity: number
}

export interface ITimeSeriesChartProps {
    data: ITimeSeriesData[];
}

export type IColumnKey = keyof IIncidentData | "actions";

export interface IMapBoxProps {
    trafficData: ITrafficData[],
    incidentData: IIncidentData[]
}

interface ITrafficSummary {
  avg_delay_min: number
  avg_congestion_percentage: number
  avg_journey_time_min: number
  total_origin: number 
  total_destination: number 
}

export interface ITrafficProps {
    trafficSummary: ITrafficSummary
}

export type ISeverityDistribution = Record<ISeverity, number>

interface IIncidentSummary {
   total_incidents : number,
   unique_categories : number,
   most_common_category :  string ,
   severity_distribution : ISeverityDistribution
}

export interface IIncidentProps {
    incidentSummary: IIncidentSummary
}

export interface ITrafficHeatMapProps {
    data: ICorrelationMatrix
}

export interface IIncidentTableProps {
    incidents: IIncidentData[]
}