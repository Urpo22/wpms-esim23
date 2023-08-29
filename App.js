import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { SafeAreaView, StyleSheet } from "react-native";
import List from "./components/List";

const App = () => {
  return (
    <>
      <Home></Home>
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 25 : 0,
    flex: 5,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
