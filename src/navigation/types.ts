import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Diary: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type DiaryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Diary"
>;
