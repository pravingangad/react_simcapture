import * as FileSystem from "expo-file-system";

import { insertPlace, featchPlaces } from "../../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    console.log(newPath);
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      //insert data into db
      const dbResult = await insertPlace(
        title,
        newPath,
        "dummy address",
        15.1,
        14.2
      );
      console.log("dbresult", dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbResult.insertId, title: title, image: image },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await featchPlaces();
      console.log("dbresult fetch", dbResult);
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
