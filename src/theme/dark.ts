const colors = {
  primary: "#276EF1",
  red600: "#870F00",
  danger: "#E11900", // red400
  red300: "#E85C4A",
  success: "#05944F",
  blue400: "#276EF1",
  blue200: "#A0BFF8",
  blue300: "#5B91F5",
  yellow400: "#FFC043",
  yellow200: "#FFE3AC",
  orange400: "#FF6937",
  orange200: "#FABDA5",
  purple400: "#7356BF",
  purple200: "#C1B5E3",
  green400: "#05944F",
  green200: "#66D19E",
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
  // most cases feedback colors increment or decrement by 200
  mainUnderlayColor: "#545454",
  shadowColor: "#141414",
};

const sizes = {
  borderRadius: {
    small: "5px",
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
      smallTitle: colors.gray300,
      mediumTitle: colors.gray300,
      largeTitle: colors.gray300,
      text: colors.gray400,
      mediumText: colors.gray400,
      largeText: colors.gray400,
    },
  },
  container: {
    backgroundColor: colors.gray900,
  },
  roundButton: {
    underlayColor: colors.gray600,
  },
  header: {
    iconColor: colors.gray300,
    // -200 of background
    underlayColor: colors.gray700,
  },
  diaryCard: {
    backgroundColor: colors.gray800,
    underlayColor: colors.gray600,
  },
  bookIllustration: {
    defaultBookColor: colors.primary,
    fallbackBackgroundColor: colors.gray600,
    linearGradient: [colors.gray600, colors.gray700],
    lineColor: colors.gray500,
    // mainly for ios
    shadowColor: colors.gray200,
  },
  iconDefaultColor: colors.gray400,
  activityCard: {
    backgroundColor: colors.gray800,
    leftIconBackgroundColor: colors.gray700,
    underlayColor: colors.gray600,
  },
  navigation: {
    backgroundColor: colors.gray800,
    mainButton: {
      iconColor: colors.white,
      backgroundColor: colors.primary,
      underlayColor: colors.primaryUnderlayColor,
    },
  },
  activityCardList: {
    // gray-900 in rgba, can't use transparent in ios
    linearGradient: ["rgba(20, 20, 20, 0)", colors.gray900],
  },
  diaryCardList: {
    // gray-900 in rgba, can't use transparent in ios
    linearGradient: ["rgba(20, 20, 20, 0)", colors.gray900],
  },
  /* TODO */
  placeHolder: {
    backgroundColor: colors.gray100,
    borderColor: colors.white,
    linearGradient: [colors.gray100, colors.gray50],
  },
  noteBook: {
    backgroundColor: colors.gray800,
    // 20% of gray700
    linearGradient: ["rgba(51, 51, 51, 0.2)", colors.gray700],
    lineColor: colors.gray700,
    header: {
      dayColor: colors.primary,
    },
  },
  modal: {
    overLayBackgroundColor: "rgba(31,31,31,0.7)",
    backgroundColor: colors.gray900,
    // mainly for ios
    shadowColor: colors.gray200,
    header: {
      textColor: colors.gray300,
      iconColor: colors.gray300,
      borderColor: colors.gray700,
    },
  },
  button: {
    primary: {
      color: colors.white,
      backgroundColor: colors.primary,
      underlayColor: colors.primaryUnderlayColor,
    },
    default: {
      color: colors.gray900,
      backgroundColor: colors.gray300,
      underlayColor: colors.gray500,
    },
  },
  input: {
    backgroundColor: colors.gray800,
    color: colors.gray300,
    borderColor: colors.gray800,
    placeholder: {
      color: colors.gray500,
    },
    focused: {
      color: colors.gray300,
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
    backgroundColor: colors.gray800,
    button: {
      borderColor: colors.gray100,
    },
  },
  /* TODO */
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
    backgroundColor: colors.gray900,
    borderColor: colors.gray700,
    underlayColor: colors.gray700,
    iconColor: colors.gray300,
    customSwitch: {
      text: {
        light: {
          active: colors.gray800,
          muted: colors.gray400,
        },
        /* TODO in the component borderButton change to this values if dark theme */
        dark: {
          active: colors.gray300,
          muted: colors.gray500,
        },
      },
    },
  },
  brand: {
    textColor: colors.gray400,
  },
  richEditor: {
    backgroundColor: colors.gray800,
    textColor: colors.gray300,
    placeholderColor: colors.gray500,
  },
  toolBar: {
    backgroundColor: colors.gray800,
    // mainly for ios
    shadowColor: colors.gray200,
    button: {
      active: {
        backgroundColor: colors.primary,
        iconColor: colors.white,
        underlayColor: colors.primaryUnderlayColor,
      },
      default: {
        backgroundColor: colors.gray800,
        iconColor: colors.gray400,
        // currently this doesn't work because rich editor doesn't accept TouchableHighlight
        underlayColor: colors.gray600,
      },
    },
  },
  holdButton: {
    color: colors.danger,
    feedbackColor: colors.red600,
    backgroundColor: colors.gray300,
    animationColor: colors.red300,
  },
  passwordScreen: {
    circles: {
      backgroundColor: colors.gray500,
      feedbackColor: colors.primary,
    },
    logo: {
      color: colors.primary,
    },
    numbers: {
      color: colors.gray300,
      backgroundColor: colors.gray900,
      underlayColor: colors.gray700,
    },
  },
  logo: {
    color: colors.white,
    backgroundColor: colors.primary,
  },
};

export type ThemeType = typeof Theme;

export default Theme;
