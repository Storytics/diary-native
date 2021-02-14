import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Diary: undefined;
  Editor: {
    noteBookHeight: number;
  };
  Cloud: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type DiaryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Diary"
>;

export type EditorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Editor"
>;

export type CloudScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Cloud"
>;
