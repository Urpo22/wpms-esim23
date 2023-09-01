import React from "react";
import PropTypes from "prop-types";
import { Image, Platform, SafeAreaView, StyleSheet, Text } from "react-native";
import { mediaUrl } from "../utils/app-config";
import { formatDate } from "../utils/functions";

const Single = ({ route, navigation }) => {
  // console.log('route params', route.params);
  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
    filesize,
  } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={{ uri: mediaUrl + filename }} />
      <Text>
        Uploaded at: {formatDate(timeAdded)} by user: {userId}
      </Text>
      <Text>{description}</Text>
      <Text>{Math.round(filesize / 1024)} kB</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 0,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
  },
  image: {
    width: 300,
    height: 300,
  },
});

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Single;
