import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feather, FontAwesome5 } from "@expo/vector-icons";

export interface Props {
  containerStyle?: ViewStyle;
  onButtonPress: (event: string, customJS?: boolean) => void;
}

const EditorToolbar: React.FC<Props> = ({ onButtonPress }) => {
  const handlePress = (event: string, customJS?: boolean) => {
    if (onButtonPress) {
      onButtonPress(event, customJS);
    }
  };
  return (
    <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 20 }}>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "grey",
          borderRadius: 2,
          margin: 2,
        }}
        onPress={() => handlePress("bold")}
      >
        <Text style={{ fontWeight: "bold" }}>B</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "grey",
          borderRadius: 2,
          margin: 2,
        }}
        onPress={() => handlePress("underline")}
      >
        <Text style={{ textDecorationLine: "underline" }}>U</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "grey",
          borderRadius: 2,
          margin: 2,
        }}
        onPress={() => handlePress("italic")}
      >
        <Text>I</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "grey",
          borderRadius: 2,
          margin: 2,
        }}
        onPress={() => handlePress("insertUnorderedList")}
      >
        <FontAwesome5 name="list-ul" size={16} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "grey",
          borderRadius: 2,
          margin: 2,
        }}
        onPress={() => handlePress("insertOrderedList")}
      >
        <FontAwesome5 name="list-ol" size={16} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "grey",
          borderRadius: 2,
          margin: 2,
        }}
        onPress={() => handlePress("justifyLeft")}
      >
        <Feather name="align-left" size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "grey",
          borderRadius: 2,
          margin: 2,
        }}
        onPress={() => handlePress("justifyCenter")}
      >
        <Feather name="align-center" size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "grey",
          borderRadius: 2,
          margin: 2,
        }}
        onPress={() => handlePress("justifyFull")}
      >
        <Feather name="align-justify" size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "grey",
          borderRadius: 2,
          margin: 2,
        }}
        onPress={() => handlePress("justifyRight")}
      >
        <Feather name="align-right" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default EditorToolbar;
