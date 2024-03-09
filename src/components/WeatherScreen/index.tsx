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
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: color }}>
      <Typography>Sydney</Typography>
      <Typography>{Dimensions.get("screen").width}</Typography>
    </View>
  );
};
