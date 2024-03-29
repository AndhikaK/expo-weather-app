import React from "react";
import {
  ColorValue,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

type TypographyProps = {
  variant?: "body";
  fontSize?: number;
  color?: ColorValue;
  align?: TextStyle["textAlign"];
  fontWeight?: TextStyle["fontWeight"];
} & TextProps;

export const Typography: React.FunctionComponent<TypographyProps> = (props) => {
  const { style, children, ...rest } = props;
  const styles = getStyle(props);

  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
};

const getStyle = (props: TypographyProps) => {
  const {
    fontSize = 16,
    color = "black",
    align = "left",
    fontWeight = "normal",
  } = props;

  const text: TextStyle = {
    fontSize,
    fontFamily: "SFCompact",
    color,
    textAlign: align,
    fontWeight,
  };

  return StyleSheet.create({
    text,
  });
};
