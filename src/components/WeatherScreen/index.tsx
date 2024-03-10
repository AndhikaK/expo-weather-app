import React from "react";
import { ColorValue, Dimensions, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Typography } from "../Typography";

export type WeatherScreenProps = {
  city: string;
  temperature: string;
  weather: string;
  summary: string;
  wind: string;
  humidity: string;
  visibility: string;
  color: ColorValue;
};

export const WeatherScreen: React.FunctionComponent<WeatherScreenProps> = ({
  color,
  wind,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: color }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingVertical: 16,
        }}
      >
        <Typography fontSize={27} fontWeight="bold">
          Sydney
        </Typography>
      </View>

      <View style={{ paddingHorizontal: 36 }}>
        <View style={{ alignItems: "center", gap: 16, marginTop: 8 }}>
          <View
            style={{
              backgroundColor: "black",
              paddingHorizontal: 16,
              paddingVertical: 4,
              borderRadius: 99,
            }}
          >
            <Typography fontSize={15} fontWeight="bold" color={color}>
              Friay, 20 January
            </Typography>
          </View>
          <Typography fontSize={18} fontWeight="bold">
            Rain
          </Typography>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Typography fontSize={210} fontWeight="bold">
            2
          </Typography>
          <Typography fontSize={210} fontWeight="bold">
            7
          </Typography>
        </View>

        <View style={{ gap: 4 }}>
          <Typography fontSize={20}>Daily Summary</Typography>
          <Typography fontSize={14}>
            Now it's seems that +25°, in fact +28°.{`\n`}It's humid now because
            of the heavy rain. Today, the temeperature is felt in the range from
            +22° to +28°.
          </Typography>
        </View>

        <View
          style={{
            backgroundColor: "black",
            borderRadius: 16,
            padding: 24,
            marginVertical: 24,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <WeatherInfoItem color={color} value={wind} label="Wind" />
          <WeatherInfoItem color={color} value={wind} label="Wind" />
          <WeatherInfoItem color={color} value={wind} label="Wind" />
        </View>

        <View style={{ gap: 8 }}>
          <Typography fontSize={20}>Weekly forecast</Typography>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ForecastItem date="23 Jan" temp={20} />
            <ForecastItem date="23 Jan" temp={20} />
            <ForecastItem date="23 Jan" temp={20} />
            <ForecastItem date="23 Jan" temp={20} />
          </View>
        </View>
      </View>
    </View>
  );
};

type WheatherInfoItemProps = {
  color: ColorValue;
  label: string;
  value: string;
};
const WeatherInfoItem: React.FunctionComponent<WheatherInfoItemProps> = ({
  color,
  label,
  value,
}) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ height: 40 }} />

      <Typography color={color} fontSize={16} fontWeight="bold">
        {value}
      </Typography>
      <Typography color={color} fontSize={12}>
        {label}
      </Typography>
    </View>
  );
};

type ForecastProps = {
  date: string;
  temp: number;
};

const ForecastItem: React.FunctionComponent<ForecastProps> = ({
  date,
  temp,
}) => {
  return (
    <View
      style={{
        height: 95,
        width: 60,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
      }}
    >
      <Typography fontWeight="bold">{temp}°</Typography>
      <Typography fontWeight="bold" fontSize={12}>
        {date}
      </Typography>
    </View>
  );
};
