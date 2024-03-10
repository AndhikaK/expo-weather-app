import { Weather } from "./type";

const WEATHER_ENDPOINT = "https://api.weatherapi.com/v1";
const API_KEY = "2edfa69ab8074405822105513241003";

type GetWeatherForecasetParams = {
  lat: string;
  lon: string;
  days: number;
};
export const getWeatherForecast = async ({
  lat,
  lon,
  days,
}: GetWeatherForecasetParams): Promise<Weather> => {
  try {
    const res = await fetch(
      `${WEATHER_ENDPOINT}/forecast.json?q=${lat},${lon}&days=${days}&key=${API_KEY}`
    );

    if (!res.ok) {
      throw new Error("Bad fetch response");
    }

    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
