import { Dimensions, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

export default function MainScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text>This is main screen</Text>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors[0],
  },
});
