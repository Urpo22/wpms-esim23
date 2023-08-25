import {Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';



const ListItem = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('touched!', props.singleMedia.title);
      }}
    >
      <Image
        style={{width: 100, height: 100}}
        source={{uri: props.singleMedia.thumbnails.w160}}
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
    container: {
      flex: 5,
      padding: 20,
      backgroundColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
    },
    flexbox:{
      flex: 1,
      padding: 20,
      alignItems: 'center',
    }
  });

export default ListItem;