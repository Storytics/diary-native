const colors = {
  primary: "#276EF1",
  danger: "#E11900",
  success: "#05944F",
  blue200: "#A0BFF8",
  yellow400: "#FFC043",
  orange400: "#FF6937",
  purple400: "#7356BF",
  green400: "#05944F",
  gray50: "#F6F6F6",
  gray100: "#EEEEEE",
  gray200: "#E2E2E2",
  gray300: "#CBCBCB",
  gray400: "#AFAFAF",
  gray500: "#757575",
  gray600: "#545454",
  gray700: "#333333",
  gray800: "#1F1F1F",
  gray900: "#141414",
  white: "#FFFFFF",
  primaryUnderlayColor: "#A0BFF8",
  // underLay colors increment or decrement by 200
  mainUnderlayColor: "#E2E2E2",
  shadowColor: "#141414",
};

const sizes = {
  borderRadius: {
    default: "10px",
    large: "30px",
  },
};

const Theme = {
  colors,
  sizes,
  typography: {
    fontFamily: {
      openSansRegular: "OpenSans-Regular",
      openSansSemiBold: "OpenSans-SemiBold",
      openSansBold: "OpenSans-Bold",
      robotoRegular: "Roboto-Regular",
      robotoMedium: "Roboto-Medium",
      robotoBold: "Roboto-Bold",
    },
    defaultColors: {
      smallTitle: colors.gray800,
      mediumTitle: colors.gray800,
      largeTitle: colors.gray800,
      text: colors.gray600,
      mediumText: colors.gray500,
    },
  },
  container: {
    backgroundColor: colors.gray100,
  },
  roundButton: {
    underlayColor: colors.mainUnderlayColor,
  },
  header: {
    iconColor: colors.gray800,
  },
  diaryCard: {
    backgroundColor: colors.white,
    underlayColor: colors.mainUnderlayColor,
  },
  bookIllustration: {
    defaultBookColor: colors.primary,
    fallbackBackgroundColor: colors.gray200,
    linearGradient: [colors.gray200, colors.gray400],
    lineColor: colors.gray100,
  },
  iconDefaultColor: colors.gray600,
  activityCard: {
    backgroundColor: colors.white,
    leftIconBackgroundColor: colors.gray100,
    underlayColor: colors.mainUnderlayColor,
  },
  navigation: {
    backgroundColor: colors.white,
    mainButton: {
      iconColor: colors.white,
      backgroundColor: colors.primary,
      underlayColor: colors.primaryUnderlayColor,
    },
  },
  activityCardList: {
    linearGradient: ["transparent", colors.gray100],
  },
  diaryCardList: {
    linearGradient: ["transparent", colors.gray100],
  },
  placeHolder: {
    backgroundColor: colors.gray100,
    borderColor: colors.white,
    linearGradient: [colors.gray100, colors.gray50],
  },
  noteBook: {
    backgroundColor: colors.white,
    linearGradient: [colors.gray100, colors.gray200],
    lineColor: colors.gray100,
    header: {
      dayColor: colors.primary,
    },
  },
  modal: {
    overLayBackgroundColor: "rgba(20,20,20,0.2)",
    backgroundColor: colors.white,
    header: {
      textColor: colors.gray800,
      iconColor: colors.gray800,
      borderColor: colors.gray100,
    },
  },
  button: {
    primary: {
      color: colors.white,
      backgroundColor: colors.primary,
      underlayColor: colors.primaryUnderlayColor,
    },
    default: {
      color: colors.gray800,
      backgroundColor: colors.gray100,
      underlayColor: colors.gray300,
    },
  },
  input: {
    backgroundColor: colors.gray100,
    color: colors.gray800,
    borderColor: colors.gray100,
    placeholder: {
      color: colors.gray500,
    },
    focused: {
      color: colors.gray800,
      borderColor: colors.primary,
    },
    error: {
      color: colors.danger,
      borderColor: colors.danger,
    },
    success: {
      iconColor: colors.success,
    },
  },
};

export type ThemeType = typeof Theme;

export default Theme;
