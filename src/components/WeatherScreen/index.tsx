import React from "react";
import { ColorValue, Image, View } from "react-native";

import Animated, {
  EntryExitAnimationFunction,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";
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
  index: number;
  snapIndex: number;
  animationValue: SharedValue<number>;
  forecasts: {
    temp: string;
    date: string;
    icon: string;
  }[];
};

const DELAY_DURATION = 200;

export const WeatherScreen: React.FunctionComponent<WeatherScreenProps> = ({
  color,
  wind,
  index,
  city,
  weather,
  humidity,
  summary,
  visibility,
  temperature,
  snapIndex,
  animationValue,
  forecasts,
}) => {
  const insets = useSafeAreaInsets();

  const isScreenActive = index === snapIndex;

  const cityOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-0.4, 0, 0.4],
      [0, 1, 0]
    );

    return {
      opacity,
    };
  }, [animationValue]);

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: color }}>
      <Animated.View
        style={[
          {
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: 16,
          },
          cityOpacity,
        ]}
      >
        <Typography fontSize={27} fontWeight="bold">
          {city}
        </Typography>
      </Animated.View>

      <View style={{ paddingHorizontal: 36 }}>
        <View style={{ alignItems: "center", gap: 16, marginTop: 8 }}>
          {isScreenActive && (
            <CustomEnterView delay={0} initialValues={{ translateY: 0 }}>
              <Animated.View
                style={{
                  backgroundColor: "black",
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                  borderRadius: 99,
                }}
              >
                <CustomEnterView delay={0}>
                  <Typography fontSize={15} fontWeight="bold" color={color}>
                    Friay, 20 January
                  </Typography>
                </CustomEnterView>
              </Animated.View>
            </CustomEnterView>
          )}
        </View>

        {isScreenActive && (
          <>
            <CustomEnterView delay={0} initialValues={{ translateY: 10 }}>
              <Typography
                fontSize={18}
                fontWeight="bold"
                align="center"
                style={{ marginTop: 16 }}
              >
                {weather}
              </Typography>
            </CustomEnterView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {temperature?.split("").map((temp, i) => (
                <CustomEnterView key={i} delay={DELAY_DURATION * i + 1}>
                  <Typography fontSize={200} fontWeight="bold">
                    {temp}
                  </Typography>
                </CustomEnterView>
              ))}
              <DegreeComponent
                delay={DELAY_DURATION * temperature.split("").length + 1}
              />
            </View>

            <View style={{ gap: 4 }}>
              <CustomEnterView delay={DELAY_DURATION * 2}>
                <Typography fontSize={20}>Daily Summary</Typography>
              </CustomEnterView>
              <CustomEnterView delay={DELAY_DURATION * 2.5}>
                <Typography fontSize={14}>{summary}</Typography>
              </CustomEnterView>
            </View>

            <CustomEnterView delay={DELAY_DURATION * 3}>
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
                <WeatherInfoItem
                  color={color}
                  value={wind + "km/h"}
                  label="Wind"
                  delay={DELAY_DURATION * 3.5}
                />
                <WeatherInfoItem
                  color={color}
                  value={humidity + "%"}
                  label="Humidity"
                  delay={DELAY_DURATION * 4}
                />
                <WeatherInfoItem
                  color={color}
                  value={visibility + "km"}
                  label="Visibility"
                  delay={DELAY_DURATION * 4.5}
                />
              </View>
            </CustomEnterView>

            <CustomEnterView delay={DELAY_DURATION * 4}>
              <View style={{ gap: 8 }}>
                <Typography fontSize={20}>Weekly forecast</Typography>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {forecasts.map((item, i) => (
                    <ForecastItem
                      key={i}
                      date={item.date}
                      temp={item.temp}
                      icon={item.icon}
                      delay={DELAY_DURATION * i + 1}
                    />
                  ))}
                </View>
              </View>
            </CustomEnterView>
          </>
        )}
      </View>
    </View>
  );
};

type WheatherInfoItemProps = {
  color: ColorValue;
  label: string;
  value: string;
  delay: number;
};
const WeatherInfoItem: React.FunctionComponent<WheatherInfoItemProps> = ({
  color,
  label,
  value,
  delay,
}) => {
  return (
    <CustomEnterView delay={delay}>
      <View style={{ alignItems: "center" }}>
        <View style={{ height: 40 }} />

        <Typography color={color} fontSize={16} fontWeight="bold">
          {value}
        </Typography>
        <Typography color={color} fontSize={12}>
          {label}
        </Typography>
      </View>
    </CustomEnterView>
  );
};

type ForecastProps = {
  date: string;
  temp: string;
  delay: number;
  icon: string;
};

const ForecastItem: React.FunctionComponent<ForecastProps> = ({
  date,
  temp,
  delay,
  icon,
}) => {
  return (
    <CustomEnterView delay={delay}>
      <View
        style={{
          height: 95,
          width: 60,
          borderWidth: 2,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 12,
        }}
      >
        <Typography fontWeight="bold" style={{ position: "absolute", top: 12 }}>
          {temp}°
        </Typography>
        <Image source={{ uri: icon }} style={{ width: 30, height: 30 }} />
        <Typography
          fontWeight="bold"
          fontSize={12}
          style={{ position: "absolute", bottom: 12 }}
        >
          {date}
        </Typography>
      </View>
    </CustomEnterView>
  );
};

type CustomEnterViewProps = {
  delay: number;
  children: React.ReactNode;
  initialValues?: {
    translateY?: number;
  };
};
const CustomEnterView: React.FunctionComponent<CustomEnterViewProps> = ({
  delay,
  children,
  initialValues,
}) => {
  const enterAnimation: EntryExitAnimationFunction = () => {
    "worklet";
    const animations = {
      opacity: withDelay(delay, withTiming(1, { duration: 600 })),
      transform: [
        { translateY: withDelay(delay, withTiming(0, { duration: 600 })) },
      ],
    };
    const initialValuesProps = {
      opacity: 0,
      transform: [{ translateY: initialValues?.translateY ?? 40 }],
    };

    return { animations, initialValues: initialValuesProps };
  };

  return <Animated.View entering={enterAnimation}>{children}</Animated.View>;
};

const DegreeComponent = ({ delay }: { delay: number }) => {
  const enterAnimation: EntryExitAnimationFunction = () => {
    "worklet";
    const animations = {
      opacity: withDelay(delay, withTiming(1, { duration: 600 })),
      transform: [
        { translateX: withDelay(delay, withTiming(0, { duration: 600 })) },
      ],
    };
    const initialValuesProps = {
      opacity: 0,
      transform: [{ translateX: -50 }],
    };

    return { animations, initialValues: initialValuesProps };
  };

  return (
    <Animated.View
      entering={enterAnimation}
      style={{
        width: 40,
        height: 40,
        borderWidth: 10,
        borderRadius: 1000,
        marginLeft: 8,
        marginTop: 50,
      }}
    />
  );
};
