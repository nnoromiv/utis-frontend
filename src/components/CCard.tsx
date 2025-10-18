import { faCloud } from "@fortawesome/free-regular-svg-icons";
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@heroui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarBurst, faCircleInfo, faCircleNodes, faCity, faDroplet, faTrafficLight, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { IIncidentProps, ITrafficProps, IWeatherProps, TrafficCardOriginToDestinationProps } from "@/types";
import { FC } from "react";
import { kelvinToCelsius } from "@/helper";

const WeatherCard : FC<IWeatherProps> = ({ weatherData }) => {
  return (
    <Card className="w-full">

      <CardHeader className="flex gap-2">
        <FontAwesomeIcon icon={faCloud} />
        <div className="flex flex-col">
          <p className="text-md">Today&apos;s Weather</p>
        </div>
      </CardHeader>

      <Divider />
      <CardBody>
        <p className="capitalize">{weatherData.condition}</p>
        <p className="font-bold text-2xl">{weatherData.temperature > 100 ? kelvinToCelsius(weatherData.temperature) : weatherData.temperature} °C <span className="font-normal text-[10px]"> at speed of {weatherData.wind_speed}</span></p>
      </CardBody>
      <Divider />
      <CardFooter className="w-full flex gap-2 justify-between">
        <div className="flex flex-col gap-2 justify-between">
          <FontAwesomeIcon icon={faCity} className="text-xs" />
          <h1 className="font-normal text-[10px]">{weatherData.city}</h1>
        </div>
        <div className="flex flex-col gap-2">
          <FontAwesomeIcon icon={faDroplet} className="text-xs" />
          <h1 className="font-normal text-[10px]">{weatherData.humidity}</h1>
        </div>
      </CardFooter>
    </Card>
  );
}

const TrafficCard: FC<ITrafficProps> = ({ trafficSummary }) => {
  return (
    <Card className="w-full">

      <CardHeader className="flex gap-2">
        <FontAwesomeIcon icon={faTrafficLight} />
        <div className="flex flex-col">
          <p className="text-md">Traffic Summary</p>
        </div>
      </CardHeader>

      <Divider />
      <CardBody>
        <p>Average Journey Time</p>
        <p className="font-bold text-2xl">{trafficSummary.avg_journey_time_min.toFixed(2)} <span className="font-normal text-[10px]">minute</span></p>
      </CardBody>
      <Divider />
      <CardFooter className="w-full flex gap-2 justify-between">
        <div className="w-full flex flex-col items-start justify-between">
          <div className="w-full flex items-center gap-1 text-xs text-danger">
            <FontAwesomeIcon icon={faTriangleExclamation} className="" />
            <p>Delay</p>
          </div>
          <h1 className="flex gap-1 font-bold text-[10px]">{trafficSummary.avg_delay_min.toFixed(2)}<span className="font-normal text-[10px]">minute</span></h1>
        </div>

        <div className="w-full flex flex-col items-end gap-1 justify-between">
          <div className="flex items-center gap-2 text-xs text-primary">
            <FontAwesomeIcon icon={faCircleNodes} className="" />
            <p>Congestion</p>
          </div>
          <h1 className="font-bold text-[10px]">{trafficSummary.avg_congestion_percentage.toFixed(2)}%</h1>
        </div>
      </CardFooter>
    </Card>
  );
}

const IncidentCard : FC<IIncidentProps> = ({ incidentSummary }) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-2">
        <FontAwesomeIcon icon={faCarBurst} />
        <div className="flex flex-col">
          <p className="text-md">Incidents</p>
        </div>
      </CardHeader>

      <Divider />
      <CardBody className="w-full flex flex-row justify-between">
        <div>
          <p>Total Incidents</p>
          <p className="font-bold text-2xl">{incidentSummary.total_incidents} <span className="font-normal text-[10px]"> of {incidentSummary.unique_categories} categories</span></p>
        </div>
        <Divider orientation="vertical" />
        <div>
          <p className="font-bold text-xs text-danger-900">{incidentSummary.severity_distribution["Minimal"]} Minimal</p>
          <p className="font-bold text-xs text-danger-600">{incidentSummary.severity_distribution["Moderate"]} Moderate</p>
          <p className="font-bold text-xs text-danger">{incidentSummary.severity_distribution["Serious"]} Serious</p>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="w-full flex gap-2 justify-between">
        <div className="w-full flex flex-col items-start justify-between">
          <div className="w-full flex items-center gap-1 text-xs text-danger">
            <FontAwesomeIcon icon={faCircleInfo} className="" />
            <p>Most Common</p>
          </div>
          <h1 className="font-bold text-[10px]">{incidentSummary.most_common_category}</h1>
        </div>
      </CardFooter>
    </Card>
  );
}

const TrafficCardOriginToDestination: FC<TrafficCardOriginToDestinationProps> = ({ trafficDataOriginToDestination }) => {
  return (
    <Card className="w-full">

      <CardHeader className="flex gap-2">
        <FontAwesomeIcon icon={faTrafficLight} />
        <div className="flex flex-col">
          <p className="text-md">Destination - <span className="font-normal text-[10px]">{trafficDataOriginToDestination.destination}</span></p>
        </div>
      </CardHeader>

      <Divider />
      <CardBody className="w-full flex flex-row justify-between">
        <div>
          <p>No Traffic</p>
        <p className="font-bold text-2xl">{trafficDataOriginToDestination.journey_time_min.toFixed(2)} <span className="font-normal text-[10px]">min</span></p>
        </div>
        <Divider orientation="vertical" />
        <div>
          <p>Traffic</p>
        <p className="font-bold text-2xl">{trafficDataOriginToDestination.journey_time_with_traffic_min.toFixed(2)} <span className="font-normal text-[10px]">min</span></p>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="w-full flex gap-2 justify-between">
        <div className="w-full flex flex-col items-start justify-between">
          <div className="w-full flex items-center gap-1 text-xs text-danger">
            <FontAwesomeIcon icon={faTriangleExclamation} className="" />
            <p>Delay</p>
          </div>
          <h1 className="flex gap-1 font-bold text-[10px]">{trafficDataOriginToDestination.delay_min.toFixed(2)}<span className="font-normal text-[10px]">minute</span></h1>
        </div>

        <div className="w-full flex flex-col items-end gap-1 justify-between">
          <div className="flex items-center gap-2 text-xs text-primary">
            <FontAwesomeIcon icon={faCircleNodes} className="" />
            <p>Congestion</p>
          </div>
          <h1 className="font-bold text-[10px]">{trafficDataOriginToDestination.congestion_percentage.toFixed(2)}%</h1>
        </div>
      </CardFooter>
    </Card>
  );
}

export {
  WeatherCard,
  TrafficCard,
  IncidentCard,
  TrafficCardOriginToDestination
}
