import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { SafeAreaView, StyleSheet } from "react-native";
import List from "./components/List";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <List />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

// Change and adjust the colors of the statusbar. https://reactnative.dev/docs/statusbar
// Position Views on top of each other with absolute/relative layout https://reactnative.dev/docs/flexbox#absolute--relative-layout
// Use Flexbox for the spacing of the Views. Remember that you can make nested flex views.
// Apply adequate margin/padding to elements
// Try the border radius for rounding images or edges of some views
// Add a navigation/setting or any other icon. You can use: https://www.npmjs.com/package/react-native-feather https://feathericons.com/
// Header Image should be an <imageBackground> https://reactnative.dev/docs/imagebackground
// Change the font size & color

const styles = StyleSheet.create({
  container: {
    flex: 5,
    padding: 20,
    backgroundColor: "grey",
    flexDirection: "column",
    flexWrap: "wrap",
  },
});

export default App;
