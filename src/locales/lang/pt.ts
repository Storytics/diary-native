export default {
  // HomePage
  diaries: {
    section: {
      title: "Meus Diários",
      placeholderText: "Os diários adicionados aparecem aqui",
    },
  },
  activity: {
    section: {
      title: "Atividade recente",
      placeholderText: "A atividade recente aparece aqui",
    },
  },
  terms: {
    netWorkStatus: {
      offline: "Sem ligação com a internet",
    },
    section: {
      title: "Termos e Condições",
    },
  },
  privacy: {
    section: {
      title: "Política de Privacidade",
    },
  },
  cloud: {
    sync: {
      success: "Guardado com sucesso na nuvem",
      updateToDate: "Tudo está sincronizado",
      error: "Erro ao sincronizar com a nuvem",
      expired: "Sessão expirada, faça login novamente e sincronize.",
    },
  },
  billing: {
    section: {
      title: "Subscrição",
    },
  },
  modal: {
    create: {
      title: "Novo Diário",
      buttons: {
        primary: "Guardar",
        secondary: "Cancelar",
      },
    },
    edit: {
      title: "Editar Diário",
      buttons: {
        primary: "Atualizar",
        secondary: "Cancelar",
      },
    },
    menu: {
      title: "Configurações",
      theme: "Tema",
      pinProtection: "Código de proteção",
      logout: "Sair",
      premium: "Sincronizar com Premium",
    },
    diaryActions: {
      buttons: {
        primary: "Editar",
        hold: {
          text: "Segure para eliminar",
          feedbackText: "Segure para eliminar",
        },
      },
    },
  },
  // Input Component
  input: {
    placeholder: "Escreva algo aqui",
    error: "O campo não pode estar vazio",
  },
  // Border Button
  borderButton: {
    theme: {
      dark: "Escuro",
      light: "Claro",
    },
  },
  // Hold Button
  holdButton: {
    initialText: "Segure para eliminar",
    feedbackText: "Segure para eliminar",
  },
  // Notifications
  notifications: {
    createDiary: {
      success: "Diário criado com sucesso",
      error: "Erro ao criar diário",
    },
    editDiary: {
      success: "Diário editado com sucesso",
      error: "Erro ao editar diário",
    },
    deleteDiary: {
      success: "Diário eliminado com sucesso",
      error: "Erro ao eliminar diário",
    },
    changeTheme: {
      error: "Erro ao alterar o tema",
    },
    loadPages: {
      error: "Erro ao carregar páginas para este diário",
    },
    editPage: {
      success: "Página editada com sucesso",
      error: "Erro ao editar a página",
    },
    savePage: {
      success: "Página guardada com sucesso",
      error: "Erro ao guardar a página",
    },
    savePasswordPin: {
      success: "Código criado com sucesso",
      error: "Erro ao criar código",
    },
    removePasswordPin: {
      error: "Erro ao remover o código de proteção",
    },
    logout: {
      error: "Algo correu errado. Por favor, tente novamente!",
    },
    signup: {
      error: "Erro ao criar uma nova conta!",
    },
    signin: {
      error: "Erro ao entrar na conta!",
    },
    auth: {
      error: "Erro ao verificar os detalhes da sua conta",
    },
    recoverAccount: {
      success: "Email de recuperação enviado com sucesso",
      error: "Erro ao enviar e-mail de recuperação!",
    },
    formFields: {
      empty: "Os campos não podem estar vazios",
    },
  },
  // Diary Screen
  diaryScreen: {
    richEditor: {
      placeholder: "Clique no botão + para criar uma nova página.",
    },
  },
  // Editor Screen
  editorScreen: {
    richEditor: {
      placeholder: "Comece a escrever aqui.",
    },
  },
  // Cloud Screen
  cloudScreen: {
    email: {
      title: "Email",
      placeholder: "example@gmail.com",
    },
    password: {
      title: "Senha",
      placeholder: "••••••",
    },
    // signUp specific
    signUp: {
      terms: "Ao criar uma conta, você aceita os nossos termos e condições",
      primaryButton: "Inscrever-se",
      content: {
        title: "Melhor com premium",
        subtitle: "Desbloquear recursos com premium",
        value: "1.99$/Mês",
        // break word
        listItem1: "Cópia de segurança",
        listItem2: "Recursos\nPremium",
        listItem3: "Múltiplo\ndispositivos",
      },
      footer: {
        text: "já tem uma conta?",
        link: "Iniciar Sessão",
      },
    },
    // login specific
    logIn: {
      primaryButton: "Iniciar Sessão",
      forgotPassword: "Esqueceu a senha?",
      content: {
        title: "Iniciar Sessão",
        text: "Olá de novo!\nbem vindo\nde volta",
      },
      footer: {
        text: "Não tem conta?",
        link: "Inscrever-se",
      },
    },
    recoverAccount: {
      primaryButton: "Enviar e-mail de recuperação",
      content: {
        title: "Recuperar a conta",
        text: "Enviaremos um link de recuperação para o seu e-mail",
      },
    },
  },
};
