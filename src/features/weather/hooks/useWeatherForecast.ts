import { useMemo } from "react";

import { useQueries } from "@tanstack/react-query";

import { Weather } from "@/api/type";
import { getWeatherForecast } from "@/api/weather";
import { formatDate } from "@/utils/date";

const defaultCity = [
  {
    city: "New York",
    lat: "40.71",
    lon: "-74.01",
  },
  {
    city: "London",
    lat: "51.52",
    lon: "-0.11",
  },
  {
    city: "Sydney",
    lat: "-33.88",
    lon: "151.22",
  },
];

const colors = ["#FF64d4", "#FFe142", "#42c6ff"];

export const useWeatherForecast = () => {
  const queries = useQueries({
    queries: defaultCity.map((city) => ({
      queryKey: [city.city, city.lon, city.lat],
      queryFn: () =>
        getWeatherForecast({
          days: 4,
          lat: city.lat,
          lon: city.lon,
        }),
    })),
  });

  const data = useMemo(
    () =>
      queries
        .filter((item) => item.data)
        .map((item, index) => {
          const forecasts = item.data?.forecast.forecastday?.map((cast) => ({
            temp: cast.day.avgtemp_c,
            icon: "https:" + cast.day.condition.icon,
            date: formatDate(cast.date),
          }));

          return {
            color: colors[index],
            city: item.data?.location.name,
            temperature: item.data?.current.temp_c.toString(),
            weather: item.data?.current.condition.text,
            wind: item.data?.current.wind_kph,
            humidity: item.data?.current.humidity,
            visibility: item.data?.current.vis_km,
            summary: generateWeatherSummary(item.data?.current),
            forecasts,
          };
        }),
    [queries]
  );

  return { data };
};

function generateWeatherSummary(weatherData?: Weather["current"]) {
  if (!weatherData) return "";

  const { temp_c, wind_mph, condition, wind_dir, humidity } = weatherData;
  let humidityDescription = "";
  let windDirection = "";
  let windDescription = "";

  // Handle humidity description
  if (humidity >= 80) {
    humidityDescription = "very high";
  } else if (humidity >= 60 && humidity < 80) {
    humidityDescription = "high";
  } else if (humidity >= 40 && humidity < 60) {
    humidityDescription = "moderate";
  } else {
    humidityDescription = "low";
  }
  // Handle wind direction
  switch (wind_dir) {
    case "N":
      windDirection = "north";
      break;
    case "NNE":
      windDirection = "north-northeast";
      break;
    case "NE":
      windDirection = "northeast";
      break;
    case "ENE":
      windDirection = "east-northeast";
      break;
    case "E":
      windDirection = "east";
      break;
    case "ESE":
      windDirection = "east-southeast";
      break;
    case "SE":
      windDirection = "southeast";
      break;
    case "SSE":
      windDirection = "south-southeast";
      break;
    case "S":
      windDirection = "south";
      break;
    case "SSW":
      windDirection = "south-southwest";
      break;
    case "SW":
      windDirection = "southwest";
      break;
    case "WSW":
      windDirection = "west-southwest";
      break;
    case "W":
      windDirection = "west";
      break;
    case "WNW":
      windDirection = "west-northwest";
      break;
    case "NW":
      windDirection = "northwest";
      break;
    case "NNW":
      windDirection = "north-northwest";
      break;
    default:
      windDirection = wind_dir;
      break;
  }

  // Handle wind description
  if (wind_mph < 1) {
    windDescription = "calm";
  } else if (wind_mph < 10) {
    windDescription = "light";
  } else if (wind_mph < 20) {
    windDescription = "moderate";
  } else {
    windDescription = "strong";
  }

  return `Overall, the weather is ${condition.text.toLowerCase()} with ${windDescription} winds coming from the ${windDirection}. The temperature feels like ${temp_c}°C, and humidity is ${humidityDescription}.`;
}
