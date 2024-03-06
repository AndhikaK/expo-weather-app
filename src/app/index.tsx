import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel, {
  type TAnimationStyle,
} from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { withAnchorPoint } from "@/utils/anchor-point";

const colors = ["#FF64d4", "#FFe142", "#42c6ff"];
const weathers = [
  {
    city: "Sydney",
    temperature: "28",
    weather: "rain",
    summary:
      "It's humid because today is raining, please bring your umbrella and coat if you're planning to go outside.",
    wind: "1km/h",
    humidity: "29",
    visibility: "0.8km",
  },
];

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function MainScreen() {
  const insets = useSafeAreaInsets();

  const PAGE_WIDTH = width;
  const PAGE_HEIGHT = height;

  const animationStyle: TAnimationStyle = React.useCallback(
    (value: number) => {
      "worklet";
      const zIndex = interpolate(value, [-1, 0, 1], [-1000, 0, -1000]);

      const translateX = interpolate(
        value,
        [-1, 0, 1],
        [-PAGE_WIDTH * 1.5, 0, PAGE_WIDTH * 1.5],
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
        [PAGE_WIDTH * 0.89, PAGE_WIDTH * 1.5, PAGE_WIDTH * 0.89],
        Extrapolation.CLAMP
      );

      const rotateY = `${interpolate(
        value,
        [-1, 0, 1],
        [-135, 0, 135],
        Extrapolation.CLAMP
      )}deg`;

      const transform = {
        transform: [{ scale }, { translateX }, { perspective }, { rotateY }],
      };

      return {
        ...withAnchorPoint(
          transform,
          { x: 0.5, y: 0.5 },
          { width: PAGE_WIDTH, height: PAGE_HEIGHT }
        ),
        zIndex,
      };
    },
    [PAGE_HEIGHT, PAGE_WIDTH]
  );

  return (
    <View style={[styles.container]}>
      <Carousel
        loop
        width={width}
        height={Dimensions.get("screen").height}
        style={{
          width: width,
          height: height,
          justifyContent: "center",
          alignItems: "center",
        }}
        autoPlay={true}
        data={colors}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        customAnimation={animationStyle}
        renderItem={({ index, item, animationValue }) => (
          <CustomItem
            key={index}
            color={item}
            animationValue={animationValue}
          />
        )}
      />
    </View>
  );
}

interface ItemProps {
  color: string;
  animationValue: Animated.SharedValue<number>;
}
const CustomItem: React.FC<ItemProps> = ({ color, animationValue }) => {
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
      {/* <SBItem pretty key={index} index={index} style={{ borderRadius: 0 }} /> */}
      <View style={{ flex: 1, backgroundColor: color }}></View>
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
