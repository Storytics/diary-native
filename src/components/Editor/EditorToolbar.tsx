import React, { useReducer } from "react";
import { View, Text, TouchableOpacity } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Props, initialState, reducer } from "./types";

const EditorToolbar: React.FC<Props> = ({
  onToolPress,
  bold = false,
  underline = false,
  italic = false,
  insertUnorderedList = false,
  insertOrderedList = false,
  justifyLeft = false,
  justifyCenter = false,
  justifyFull = false,
  justifyRight = false,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 20 }}>
      {bold && (
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: state.bold ? "green" : "grey",
            borderRadius: 2,
            margin: 2,
          }}
          onPress={() => {
            onToolPress("bold", false);
            dispatch({ type: "bold", payload: { active: !state.bold } });
          }}
        >
          <Text style={{ fontWeight: "bold" }}>B</Text>
        </TouchableOpacity>
      )}

      {underline && (
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: state.underline ? "green" : "grey",
            borderRadius: 2,
            margin: 2,
          }}
          onPress={() => {
            onToolPress("underline");
            dispatch({
              type: "underline",
              payload: { active: !state.underline },
            });
          }}
        >
          <Text style={{ textDecorationLine: "underline" }}>U</Text>
        </TouchableOpacity>
      )}
      {italic && (
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: state.italic ? "green" : "grey",
            borderRadius: 2,
            margin: 2,
          }}
          onPress={() => {
            onToolPress("italic");
            dispatch({
              type: "italic",
              payload: { active: !state.italic },
            });
          }}
        >
          <Text>I</Text>
        </TouchableOpacity>
      )}
      {insertUnorderedList && (
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: state.insertUnorderedList ? "green" : "grey",
            borderRadius: 2,
            margin: 2,
          }}
          onPress={() => {
            onToolPress("insertUnorderedList");
            dispatch({
              type: "insertUnorderedList",
              payload: { active: !state.insertUnorderedList },
            });
          }}
        >
          <FontAwesome5 name="list-ul" size={16} />
        </TouchableOpacity>
      )}
      {insertOrderedList && (
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: state.insertOrderedList ? "green" : "grey",
            borderRadius: 2,
            margin: 2,
          }}
          onPress={() => {
            onToolPress("insertOrderedList");
            dispatch({
              type: "insertOrderedList",
              payload: { active: !state.insertOrderedList },
            });
          }}
        >
          <FontAwesome5 name="list-ol" size={16} />
        </TouchableOpacity>
      )}
      {justifyLeft && (
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: state.justifyLeft ? "green" : "grey",
            borderRadius: 2,
            margin: 2,
          }}
          onPress={() => {
            onToolPress("justifyLeft");
            dispatch({
              type: "justifyLeft",
              payload: { active: !state.justifyLeft },
            });
          }}
        >
          <Feather name="align-left" size={20} />
        </TouchableOpacity>
      )}
      {justifyCenter && (
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: state.justifyCenter ? "green" : "grey",
            borderRadius: 2,
            margin: 2,
          }}
          onPress={() => {
            onToolPress("justifyCenter");
            dispatch({
              type: "justifyCenter",
              payload: { active: !state.justifyCenter },
            });
          }}
        >
          <Feather name="align-center" size={20} />
        </TouchableOpacity>
      )}
      {justifyFull && (
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: state.justifyFull ? "green" : "grey",
            borderRadius: 2,
            margin: 2,
          }}
          onPress={() => {
            onToolPress("justifyFull");
            dispatch({
              type: "justifyFull",
              payload: { active: !state.justifyFull },
            });
          }}
        >
          <Feather name="align-justify" size={20} />
        </TouchableOpacity>
      )}
      {justifyRight && (
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: state.justifyRight ? "green" : "grey",
            borderRadius: 2,
            margin: 2,
          }}
          onPress={() => {
            onToolPress("justifyRight");
            dispatch({
              type: "justifyRight",
              payload: { active: !state.justifyRight },
            });
          }}
        >
          <Feather name="align-right" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EditorToolbar;
