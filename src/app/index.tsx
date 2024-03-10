import React, { useState } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";

import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel, {
  type TCarouselProps,
} from "react-native-reanimated-carousel";

import { WeatherScreen, WeatherScreenProps } from "@/components/WeatherScreen";
import { withAnchorPoint } from "@/utils/anchor-point";

const colors = [
  "#FF64d4",
  "#FFe142",
  "#42c6ff",
  "#FFe142",
  "#42c6ff",
  //
];
const weathers: Omit<WeatherScreenProps, "index" | "snapIndex">[] = [
  {
    city: "Sydney",
    temperature: "28",
    weather: "rain",
    summary:
      "It's humid because today is raining, please bring your umbrella and coat if you're planning to go outside.",
    wind: "1km/h",
    humidity: "29",
    visibility: "0.8km",
    color: "#FF64d4",
  },
  {
    city: "Sydney",
    temperature: "28",
    weather: "rain",
    summary:
      "It's humid because today is raining, please bring your umbrella and coat if you're planning to go outside.",
    wind: "1km/h",
    humidity: "29",
    visibility: "0.8km",
    color: "#42c6ff",
  },
  {
    city: "Sydney",
    temperature: "28",
    weather: "rain",
    summary:
      "It's humid because today is raining, please bring your umbrella and coat if you're planning to go outside.",
    wind: "1km/h",
    humidity: "29",
    visibility: "0.8km",
    color: "#FFe142",
  },
];

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function MainScreen() {
  const animationStyle: TCarouselProps["customAnimation"] = React.useCallback(
    (value: number) => {
      "worklet";
      const zIndex = interpolate(value, [-1, 0, 1], [-1000, 0, -1000]);

      const translateX = interpolate(
        value,
        [-1, 0, 1],
        [-width, 0, width],
        Extrapolation.CLAMP
      );

      const scale = interpolate(
        value,
        [-1, 0, 1],
        [0.49, 1, 0.49],
        Extrapolation.CLAMP
      );

      const perspective = interpolate(
        value,
        [-1, 0, 1],
        [width * 0.89, width * 1.5, width * 0.89],
        Extrapolation.CLAMP
      );

      const rotateY = `${interpolate(
        value,
        [-1, 0, 1],
        [-90, 0, 90],
        Extrapolation.CLAMP
      )}deg`;

      const transform = {
        transform:
          Platform.OS === "ios"
            ? [{ scale }, { translateX }, { perspective }, { rotateY }]
            : [{ perspective }, { scale }, { translateX }, { rotateY }],
      };

      return {
        ...withAnchorPoint(transform, { x: 0.5, y: 0.5 }, { width, height }),
        zIndex,
      };
    },
    [height, width]
  );

  const [snapIndex, setSnapIndex] = useState(0);

  return (
    <View style={[styles.container]}>
      <Carousel
        loop
        width={width}
        height={height}
        style={{
          width,
          height,
          justifyContent: "center",
          alignItems: "center",
        }}
        autoPlay
        data={weathers}
        autoPlayInterval={5000}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setSnapIndex(index)}
        customAnimation={animationStyle}
        renderItem={({ index, item, animationValue }) => (
          <CustomItem
            key={index}
            animationValue={animationValue}
            snapIndex={snapIndex}
            index={index}
            {...item}
          />
        )}
      />
    </View>
  );
}

type ItemProps = {
  animationValue: SharedValue<number>;
  snapIndex: number;
  index: number;
} & WeatherScreenProps;
const CustomItem: React.FC<ItemProps> = ({
  snapIndex,
  animationValue,
  index,
  ...rest
}) => {
  const maskStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["#000000dd", "transparent", "#000000dd"]
    );

    return {
      backgroundColor,
    };
  }, [animationValue]);

  return (
    <View style={{ flex: 1 }}>
      <WeatherScreen index={index} snapIndex={snapIndex} {...rest} />
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          maskStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
