import { StackNavigationProp } from "@react-navigation/stack";
import { PageProps } from "types/page";

export interface EditorNavigationParams {
  noteBookHeight: number;
  bookId: number;
  isEdit?: boolean;
  page?: PageProps;
}

export interface DiaryNavigationParams {
  bookId: number;
  bookTitle: string;
  pageNumber?: number;
}

export type RootStackParamList = {
  Home: undefined;
  Diary: DiaryNavigationParams;
  Editor: EditorNavigationParams;
  Cloud: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export interface HomeNavigationProps {
  navigation: HomeScreenNavigationProp;
}

export type DiaryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Diary"
>;

export interface DiaryNavigationProps {
  navigation: DiaryScreenNavigationProp;
  route: {
    params: DiaryNavigationParams;
  };
}

export type CloudScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Cloud"
>;

export type EditorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Editor"
>;

export interface EditorNavigationProps {
  navigation: EditorScreenNavigationProp;
  route: {
    params: EditorNavigationParams;
  };
}
