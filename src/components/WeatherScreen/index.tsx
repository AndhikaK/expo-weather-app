import React, { useEffect } from "react";
import { ColorValue, View } from "react-native";

import Animated, {
  EntryExitAnimationFunction,
  useSharedValue,
  withDelay,
  withSpring,
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
};

const DELAY_DURATION = 200;

export const WeatherScreen: React.FunctionComponent<WeatherScreenProps> = ({
  color,
  wind,
  index,
  snapIndex,
}) => {
  const insets = useSafeAreaInsets();

  const anim1Translate = useSharedValue(20);
  const anim1Opacity = useSharedValue(0);

  useEffect(() => {
    if (index === snapIndex) {
      // start animation
      anim1Translate.value = withTiming(0, { duration: 300 });
      anim1Opacity.value = withTiming(1, { duration: 400 });
    } else {
      anim1Translate.value = 20;
      anim1Opacity.value = 0;
    }
  }, [snapIndex]);

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
            <Animated.View
              style={{
                transform: [{ translateY: anim1Translate }],
                opacity: anim1Opacity,
              }}
            >
              <Typography fontSize={15} fontWeight="bold" color={color}>
                Friay, 20 January
              </Typography>
            </Animated.View>
          </View>
        </View>

        {index === snapIndex && (
          <>
            <CustomEnterView delay={0} initialValues={{ translateY: 10 }}>
              <Typography
                fontSize={18}
                fontWeight="bold"
                align="center"
                style={{ marginTop: 16 }}
              >
                Rain
              </Typography>
            </CustomEnterView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <CustomEnterView delay={DELAY_DURATION * 1}>
                <Typography fontSize={200} fontWeight="bold">
                  2
                </Typography>
              </CustomEnterView>
              <CustomEnterView delay={DELAY_DURATION * 1.5}>
                <Typography fontSize={200} fontWeight="bold">
                  7
                </Typography>
              </CustomEnterView>
            </View>

            <View style={{ gap: 4 }}>
              <CustomEnterView delay={DELAY_DURATION * 2}>
                <Typography fontSize={20}>Daily Summary</Typography>
              </CustomEnterView>
              <CustomEnterView delay={DELAY_DURATION * 2.5}>
                <Typography fontSize={14}>
                  Now it's seems that +25°, in fact +28°.{`\n`}It's humid now
                  because of the heavy rain. Today, the temeperature is felt in
                  the range from +22° to +28°.
                </Typography>
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
                  value={wind}
                  label="Wind"
                  delay={DELAY_DURATION * 3.5}
                />
                <WeatherInfoItem
                  color={color}
                  value={wind}
                  label="Wind"
                  delay={DELAY_DURATION * 4}
                />
                <WeatherInfoItem
                  color={color}
                  value={wind}
                  label="Wind"
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
                  <ForecastItem
                    date="23 Jan"
                    temp={20}
                    delay={DELAY_DURATION * 4.5}
                  />
                  <ForecastItem
                    date="23 Jan"
                    temp={20}
                    delay={DELAY_DURATION * 5}
                  />
                  <ForecastItem
                    date="23 Jan"
                    temp={20}
                    delay={DELAY_DURATION * 5.5}
                  />
                  <ForecastItem
                    date="23 Jan"
                    temp={20}
                    delay={DELAY_DURATION * 6}
                  />
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
  temp: number;
  delay: number;
};

const ForecastItem: React.FunctionComponent<ForecastProps> = ({
  date,
  temp,
  delay,
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
          justifyContent: "space-between",
          paddingVertical: 12,
        }}
      >
        <Typography fontWeight="bold">{temp}°</Typography>
        <Typography fontWeight="bold" fontSize={12}>
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
  initialValues = {
    translateY: 40,
  },
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
      transform: [{ translateY: initialValues.translateY }],
    };

    return { animations, initialValues: initialValuesProps };
  };

  return <Animated.View entering={enterAnimation}>{children}</Animated.View>;
};
