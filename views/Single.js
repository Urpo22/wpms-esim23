/* eslint-disable camelcase*/
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { mediaUrl } from "../utils/app-config";
import { formatDate } from "../utils/functions";
import { Card, Icon, Text, ListItem, Button } from "@rneui/themed";
import { Video } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFavourite, useUser } from "../hooks/ApiHooks";
import { MainContext } from "../contexts/MainContext";
import * as ScreenOrientation from "expo-screen-orientation";
import { ScrollView } from "react-native";

const Single = ({ route, navigation }) => {
  const [owner, setOwner] = useState({});
  const [userLike, setUserLike] = useState(false);
  const [likes, setLikes] = useState([]);
  const { user } = useContext(MainContext);
  const { getUserById } = useUser();
  const { postFavourite, getFavouritesById, deleteFavourite } = useFavourite();

  const { videoRef, setVideoRef } = useState(null);
  const handleVideoRef = (component) => {
    setVideoRef(component);
  };

  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
    filesize,
    media_type: mediaType,
    file_id: fileId,
  } = route.params;

  // fetch owner info
  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const ownerData = await getUserById(userId, token);
      setOwner(ownerData);
    } catch (error) {
      console.error(error.message);
    }
  };

  // add favourite
  const addFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await postFavourite(
        {
          file_id: fileId,
        },
        token
      );
      response && setUserLike(true);
      console.log("favouriteData", response);
    } catch (error) {
      console.error(error.message);
    }
  };

  //delete favourite
  const removeFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await getFavouritesById(fileId, token);
      response && setUserLike(false);
      console.log("favouriteData", response);
    } catch (error) {
      console.error(error.message);
    }
  };

  // get favouritesbyid
  const fetchLikes = async () => {
    try {
      const likesData = await getFavouritesById(fileId);
      setLikes(likesData);
      // check if user has liked
      // check if userid stored in context is in likesData

      likesData.forEach((like) => {
        if (like.user_id === user.user_id) {
          setUserLike(true);
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // check favourites

  // fullscreen video or landscape
  const unlockOrientation = async () => {
    try {
      await ScreenOrientation.unlockAsync();
    } catch (error) {
      console.error(error.message);
    }
  };

  const lockOrientation = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const showVideoInFullscreen = async () => {
    try {
      videoRef.current.presentFullscreenPlayer();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    unlockOrientation();
    fetchOwner();

    // fullscreen video on landscape
    const orientSub = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        if (event.orientationInfo.orientation > 2) {
          videoRef.curren && showVideoInFullscreen();
        }
      }
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientSub);
      lockOrientation();
    };
  }, []);

  useEffect(() => {
    fetchLikes();
  }, [userLike]);

  // Show full image and metadata
  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      {mediaType === "image" ? (
        <Card.Image
          source={{ uri: mediaUrl + filename }}
          resizeMode="center"
          style={{ height: 300 }}
        />
      ) : (
        <Video
          source={{ uri: mediaUrl + filename }}
          style={{ height: 300 }}
          useNativeControls
          shouldPlay
          isLooping
          ref={videoRef}
        />
      )}
      <Card.Image
        source={{ uri: mediaUrl + filename }}
        resizeMode="center"
        style={{ height: 300 }}
      />
      <ListItem>
        <Text>{description}</Text>
      </ListItem>
      <ListItem>
        <Icon name="save" />
        <Text>{Math.round(filesize / 1024)} kB</Text>
      </ListItem>
      <ListItem>
        <Icon name="today" />
        <Text>{formatDate(timeAdded)}</Text>
      </ListItem>
      <ListItem>
        <Icon name="person" />
        <Text>username: {owner.username}</Text>
      </ListItem>
      <ListItem>
        {userLike ? (
          <Button onPress={removeFavourite} title={"Unlike"} />
        ) : (
          <Button onPress={addFavourite} title={"Like"} />
        )}
        <Text>Total likes: {likes.length}</Text>
      </ListItem>
    </Card>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Single;
