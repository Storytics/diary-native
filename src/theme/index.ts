import { colors, sizes } from "./constants";

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
      largeText: colors.gray600,
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
    underlayColor: colors.gray300,
    titleColor: colors.gray800,
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
    // mainly for ios
    shadowColor: colors.gray700,
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
    // gray-100 in rgba, can't use transparent in ios
    linearGradient: ["rgba(238, 238, 238, 0)", colors.gray100],
  },
  diaryCardList: {
    // gray-100 in rgba, can't use transparent in ios
    linearGradient: ["rgba(238, 238, 238, 0)", colors.gray100],
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
    // mainly for ios
    shadowColor: colors.gray900,
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
  select: {
    backgroundColor: colors.gray100,
    button: {
      borderColor: colors.gray800,
    },
  },
  customSwitch: {
    thumb: {
      on: colors.white,
      off: colors.white,
    },
    track: {
      on: colors.gray700,
      off: colors.gray300,
    },
  },
  borderButton: {
    backgroundColor: colors.white,
    borderColor: colors.gray100,
    underlayColor: colors.gray100,
    iconColor: colors.gray800,
    customSwitch: {
      text: {
        left: colors.gray800,
        right: colors.gray400,
      },
    },
  },
  brand: {
    textColor: colors.gray500,
  },
  richEditor: {
    backgroundColor: colors.white,
    textColor: colors.gray800,
    placeholderColor: colors.gray500,
  },
  toolBar: {
    backgroundColor: colors.white,
    // mainly for ios
    shadowColor: colors.gray700,
    button: {
      active: {
        backgroundColor: colors.primary,
        iconColor: colors.white,
        underlayColor: colors.primaryUnderlayColor,
      },
      default: {
        backgroundColor: colors.white,
        iconColor: colors.gray600,
        underlayColor: colors.mainUnderlayColor,
      },
    },
  },
  holdButton: {
    color: colors.danger,
    feedbackColor: colors.red600,
    backgroundColor: colors.white,
    animationColor: colors.red300,
  },
  passwordScreen: {
    circles: {
      backgroundColor: colors.gray400,
      feedbackColor: colors.primary,
    },
    logo: {
      color: colors.primary,
    },
    numbers: {
      color: colors.gray800,
      backgroundColor: colors.gray100,
      underlayColor: colors.gray300,
    },
  },
  logo: {
    color: colors.white,
    backgroundColor: colors.primary,
  },
  notification: {
    color: colors.white,
    // mainly for ios
    shadowColor: colors.gray700,
    // gray-100 in rgba
    linearGradient: ["rgba(238, 238, 238, 0)", colors.gray100],
  },
  cloudScreen: {
    valueColor: colors.primary,
    listItem: {
      borderColor: colors.white,
      linearGradient: [colors.gray100, colors.gray50],
      icon: {
        backgroundColor: colors.blue100,
        color: colors.blue400,
      },
    },
    form: {
      backgroundColor: colors.white,
    },
  },
};

export type ThemeType = typeof Theme;

export default Theme;
