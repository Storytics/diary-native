import { StackNavigationProp } from "@react-navigation/stack";
import { PageProps } from "types/page";

export enum LegalType {
  terms = "terms",
  privacy = "privacy",
}

export interface EditorNavigationParams {
  bookId: string;
  isEdit?: boolean;
  bookTitle: string;
  pageNumber: number;
  page?: PageProps;
}

export interface DiaryNavigationParams {
  bookId: string;
  bookTitle: string;
  activityPageId?: string;
}

export type RootStackParamList = {
  Home: undefined;
  Diary: DiaryNavigationParams;
  Editor: EditorNavigationParams;
  Password: undefined;
  Terms: undefined;
  Privacy: undefined;
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

export type PasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Editor"
>;

export interface PasswordNavigationProps {
  navigation: PasswordScreenNavigationProp;
}

export type TermsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Terms"
>;

export interface TermsNavigationProps {
  navigation: TermsScreenNavigationProp;
}

export type PrivacyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Privacy"
>;

export interface PrivacyNavigationProps {
  navigation: PrivacyScreenNavigationProp;
}
