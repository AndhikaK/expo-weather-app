import React from "react";
import { Platform } from "react-native";

import { Extrapolation, interpolate } from "react-native-reanimated";
import { TCarouselProps } from "react-native-reanimated-carousel";

import { withAnchorPoint } from "@/utils/anchor-point";

export const useCarouselBox3d = (width: number, height: number) => {
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

  return { animationStyle };
};
