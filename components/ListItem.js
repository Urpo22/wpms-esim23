import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { mediaUrl } from "../utils/app-config";

const ListItem = (props) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        console.log("touched!", props.singleMedia.title);
      }}
    >
      <Image
        style={{ width: 100, height: 100 }}
        source={{ uri: mediaUrl + props.singleMedia.thumbnails.w160 }}
      />
      <Text>{props.singleMedia.title}</Text>
      <Text>{props.singleMedia.description}</Text>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "green",
    padding: 20,
    marginVertical: 8,
    flex: 1,
    flexDirection: "row",
  },
});

export default ListItem;
