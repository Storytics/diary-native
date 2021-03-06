import { StackNavigationProp } from "@react-navigation/stack";
import { PageProps } from "types/page";
import { User } from "types/store";

export enum AuthType {
  signin = "signin",
  signup = "signup",
  recover = "recover",
}

export enum LegalType {
  terms = "terms",
  privacy = "privacy",
}

export interface EditorNavigationParams {
  noteBookHeight: number;
  bookId: number;
  isEdit?: boolean;
  bookTitle: string;
  pageNumber: number;
  page?: PageProps;
}

export interface DiaryNavigationParams {
  bookId: number;
  bookTitle: string;
  activityPageId?: number;
}

export interface BillingNavigationParams {
  user: User;
}

export interface CloudNavigationParams {
  type: AuthType;
}

export type RootStackParamList = {
  Home: undefined;
  Diary: DiaryNavigationParams;
  Editor: EditorNavigationParams;
  Cloud: CloudNavigationParams;
  Password: undefined;
  Billing: BillingNavigationParams;
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

export type CloudScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Cloud"
>;

export interface CloudNavigationProps {
  navigation: CloudScreenNavigationProp;
  route: {
    params: CloudNavigationParams;
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

export type BillingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Billing"
>;

export interface BillingNavigationProps {
  navigation: BillingScreenNavigationProp;
  route: {
    params: BillingNavigationParams;
  };
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
