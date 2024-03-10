import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

import { WeatherScreen, WeatherScreenProps } from "@/components/WeatherScreen";
import { useCarouselBox3d } from "@/features/ui/hooks/useCarouselBox3d";
import { useWeatherForecast } from "@/features/weather/hooks/useWeatherForecast";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function MainScreen() {
  const [snapIndex, setSnapIndex] = useState(0);

  const { animationStyle } = useCarouselBox3d(width, height);

  // queries
  const { data: weathers } = useWeatherForecast();

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
      <WeatherScreen
        animationValue={animationValue}
        index={index}
        snapIndex={snapIndex}
        {...rest}
      />
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
