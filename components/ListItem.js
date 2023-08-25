import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const ListItem = (props) => {
  return (
    <TouchableOpacity
      style={styles.Item}
      onPress={() => {
        console.log("touched!", props.singleMedia.title);
      }}
    >
      <Image
        style={styles.image}
        source={{ uri: props.singleMedia.thumbnails.w160 }}
      />
      <Text style={styles.title}>{props.singleMedia.title}</Text>
      <Text style={styles.text}>{props.singleMedia.description}</Text>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

const styles = StyleSheet.create({
  Item: {
    backgroundColor: "lightblue",
    centerContent: "center",
    margin: 10,
  },
  text: {
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 15,
  },
  image: {
    margin: 10,
    width: 100,
    height: 100,
    flexDirection: "row",
    flexWrap: "wrap",
    flexbox: "column",
  },
  title: {
    margin: 10,
    fontSize: 30,
    fontWeight: "bold",
    flexbox: "column",
  },
});

export default ListItem;
