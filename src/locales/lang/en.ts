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
      placeholderText: "Recent activity appears here",
    },
  },
  terms: {
    section: {
      title: "Terms & Conditions",
    },
  },
  privacy: {
    section: {
      title: "Privacy Policy",
    },
  },
  cloud: {
    sync: {
      success: "Successfully saved in the cloud",
      updateToDate: "Everything is up to date",
      error: "Error syncing to the cloud",
      expired: "Session expired, login again and sync.",
    },
  },
  billing: {
    section: {
      title: "Billing",
    },
  },
  modal: {
    create: {
      title: "New Diary",
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
    },
    diaryActions: {
      buttons: {
        primary: "Edit",
        hold: {
          text: "Delete",
          feedbackText: "Delete",
        },
      },
    },
  },
  // Input Component
  input: {
    placeholder: "Type something here",
    error: "Input can't be empty",
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
    initialText: "Delete",
    feedbackText: "Delete",
  },
  // Notifications
  notifications: {
    createDiary: {
      success: "Diary created with success",
      error: "Error creating diary",
    },
    editDiary: {
      success: "Diary edited with success",
      error: "Error editing diary",
    },
    deleteDiary: {
      success: "Diary deleted with success",
      error: "Error deleting diary",
    },
    changeTheme: {
      error: "Error changing theme",
    },
    loadPages: {
      error: "Error loading pages for this diary",
    },
    editPage: {
      success: "Page edited with success",
      error: "Error editing the page",
    },
    savePage: {
      success: "Page saved with success",
      error: "Error saving the page",
    },
    savePasswordPin: {
      success: "Pin created with success",
      error: "Error creating pin",
    },
    removePasswordPin: {
      error: "Error removing pin",
    },
    logout: {
      error: "Something went wrong. Please try Again!",
    },
    signup: {
      error: "Error creating an account!",
    },
    signin: {
      error: "Error signing into account!",
    },
    auth: {
      error: "Error verifying your account details",
    },
  },
  // Diary Screen
  diaryScreen: {
    richEditor: {
      placeholder: "Click on the blue button to create a new page.",
    },
  },
  // Editor Screen
  editorScreen: {
    richEditor: {
      placeholder: "Start writing here.",
    },
  },
  // Cloud Screen
  cloudScreen: {
    email: {
      title: "Email",
      placeholder: "example@gmail.com",
    },
    password: {
      title: "Password",
      placeholder: "••••••",
    },
    // signUp specific
    signUp: {
      primaryButton: "Sign Up",
      content: {
        title: "Better with premium",
        subtitle: "Unlock premium features",
        value: "1.99$/Month",
        // break word
        listItem1: "Backup\ndata",
        listItem2: "Premium\nfeatures",
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
        text: "Dont have an account?",
        link: "Sign up",
      },
    },
  },
};
