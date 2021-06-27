export default {
  // HomePage
  diaries: {
    section: {
      title: "My Diaries",
      placeholderText: "Added diaries appear here",
    },
  },
  activity: {
    section: {
      title: "Recent Activity",
      placeholderText: "The recent activity appears here",
    },
  },
  terms: {
    netWorkStatus: {
      offline:
        "No internet connection, please check your connection again, or connect to Wi-Fi.",
    },
    section: {
      title: "Terms & Conditions",
    },
  },
  privacy: {
    section: {
      title: "Privacy Policy",
    },
  },
  password: {
    section: {
      title: "Create PIN",
    },
  },
  cloud: {
    sync: {
      success: "Upload to cloud successfully.",
      updateToDate: "Everything is up to date.",
      error: "Something went wrong, unable to sync.",
      expired: "Whoops, your session has expired.",
    },
  },
  billing: {
    section: {
      title: "Billing",
    },
  },
  releases: {
    section: {
      title: "What's new",
    },
  },
  modal: {
    create: {
      title: "New Diary",
      inputs: {
        title: "Title",
        identifier: "Identifier",
      },
      buttons: {
        primary: "Save",
        secondary: "Cancel",
      },
    },
    edit: {
      title: "Edit Diary",
      buttons: {
        primary: "Update",
        secondary: "Cancel",
      },
    },
    menu: {
      title: "Settings",
      theme: "Theme",
      pinProtection: "Pin Protection",
      logout: "Logout",
      premium: "Sync with Premium",
      portal: "Manage Subscription",
      removeAds: "Remove Ads",
      releases: "What's new",
    },
    diaryActions: {
      buttons: {
        edit: {
          title: "Edit",
          text: "Title and identifier",
        },
        hold: {
          title: "Delete",
          text: "Hold to delete",
          feedbackText: "Are you sure? This action is permanent",
        },
        favorite: {
          title: "Favorite",
          text: "Bookmark this diary as favorite",
        },
      },
    },
  },
  // Input Component
  input: {
    placeholder: "Type something here",
    error: "The field can't be empty",
  },
  // Border Button
  borderButton: {
    theme: {
      dark: "Dark",
      light: "Light",
    },
  },
  // Hold Button
  holdButton: {
    title: "Delete",
    initialText: "Hold to delete",
    feedbackText: "Are you sure? This action is permanent",
  },
  // Notifications
  notifications: {
    createDiary: {
      success: "Diary created with success.",
      error: "Error creating diary.",
    },
    editDiary: {
      success: "Diary updated with success.",
      error: "Error updating diary.",
    },
    deleteDiary: {
      success: "Diary deleted with success.",
      error: "Error deleting diary.",
    },
    changeTheme: {
      error: "Error switching theme.",
    },
    loadPages: {
      error: "Error loading pages for this diary.",
    },
    editPage: {
      success: "Page updated with success.",
      error: "Error updating the page.",
    },
    savePage: {
      success: "Page saved with success.",
      error: "Error saving the page.",
    },
    savePasswordPin: {
      success: "Pin code created with success.",
      error: "Error creating PIN code.",
    },
    removePasswordPin: {
      error: "Error removing PIN code.",
    },
    logout: {
      error: "Something went wrong. Please try again.",
    },
    signup: {
      error: "Error creating an account.",
      invalidEmail: "Please type a valid email.",
      invalidPassword: "Please type a password at least 8 characters.",
    },
    signin: {
      error: "Error signing into account.",
    },
    auth: {
      error: "Error verifying your account details.",
    },
    recoverAccount: {
      success: "Recovery email sent successfully.",
      error: "Error sending recover email.",
    },
    formFields: {
      empty: "The fields can't be empty.",
    },
  },
  // Diary Screen
  diaryScreen: {
    richEditor: {
      placeholder: "Click on the plus button to create a new page.",
    },
  },
  // Editor Screen
  editorScreen: {
    richEditor: {
      placeholder: "What's on your mind?",
    },
  },
  // Cloud Screen
  cloudScreen: {
    email: {
      title: "Email",
      placeholder: "example@domain.com",
    },
    password: {
      title: "Password",
      placeholder: "at least 8 characters.",
      loginPlaceholder: "********",
    },
    // signUp specific
    signUp: {
      terms: "By creating an account you're accepting our terms & conditions",
      primaryButton: "Sign Up",
      content: {
        title: "Better with Premium",
        subtitle: "Unlock premium features",
        value: "1.99$/Month",
        // break word
        listItem1: "Backup\ndata",
        listItem2: "Secure\ndata",
        listItem3: "Multiple\ndevices",
      },
      footer: {
        text: "Already have an account?",
        link: "Login",
      },
    },
    // login specific
    logIn: {
      primaryButton: "Login",
      forgotPassword: "Forgot password?",
      content: {
        title: "Login",
        text: "Hello Again!\nWelcome\nback",
      },
      footer: {
        text: "Don't have an account?",
        link: "Sign up",
      },
    },
    recoverAccount: {
      primaryButton: "Send Recover Email",
      content: {
        title: "Forgot Password",
        text: "Please enter your email address to receive a recovery link",
      },
    },
  },
  alerts: {
    draft: {
      title: "Let's continue?",
      message:
        "You have an unsaved draft, load draft to continue writing where you left off.",
      buttons: {
        cancel: "Discard",
        ok: "Load Draft",
      },
    },
    ota: {
      title: "New update available",
      message:
        "A new version of the app is available, which brings improvements and corrections.",
      buttons: {
        ok: "Download",
      },
    },
    ads: {
      title: "Personalized Ads",
      message:
        "Turning on personalized Ads will enable the ability to deliver relevant ads to you.",
      buttons: {
        ok: "Enable",
        cancel: "Disable",
      },
    },
  },
};
