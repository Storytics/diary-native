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
      title: "Atividade Recente",
      placeholderText: "A atividade recente aparece aqui",
    },
  },
  terms: {
    netWorkStatus: {
      offline:
        "Sem conexão com a Internet, verifique sua conexão novamente ou conecte-se ao Wi-Fi.",
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
  password: {
    section: {
      title: "Criar PIN",
    },
  },
  cloud: {
    sync: {
      success: "Upload para nuvem com sucesso.",
      updateToDate: "Tudo está atualizado.",
      error: "Não foi possível sincronizar.",
      expired: "Whoops, sua sessão expirou.",
    },
  },
  billing: {
    section: {
      title: "Faturamento",
    },
  },
  modal: {
    create: {
      title: "Novo Diário",
      inputs: {
        title: "Título",
        identifier: "Identificador",
      },
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
      pinProtection: "Proteção PIN",
      logout: "Sair da conta",
      premium: "Sincronizar com Premium",
      portal: "Gerir Subscrição",
      removeAds: "Remover Anúncios",
    },
    diaryActions: {
      buttons: {
        edit: {
          title: "Editar",
          text: "Título e identificador",
        },
        hold: {
          title: "Apagar",
          text: "Segure para apagar",
          feedbackText: "Tem certeza? Esta ação é permanente",
        },
        favorite: {
          title: "Favorito",
          text: "Marcar este diario como favorito",
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
    title: "Apagar",
    initialText: "Segure para apagar",
    feedbackText: "Tem certeza? Esta ação é permanente",
  },
  // Notifications
  notifications: {
    createDiary: {
      success: "Diário criado com sucesso.",
      error: "Erro ao criar diário.",
    },
    editDiary: {
      success: "Diário atualizado com sucesso.",
      error: "Erro ao atualizar diário.",
    },
    deleteDiary: {
      success: "Diário apagado com sucesso.",
      error: "Erro ao apagar diário.",
    },
    changeTheme: {
      error: "Erro ao mudar de tema.",
    },
    loadPages: {
      error: "Erro ao carregar páginas para este diário.",
    },
    editPage: {
      success: "Página atualizada com sucesso.",
      error: "Erro ao atualizar a página.",
    },
    savePage: {
      success: "Página guardada com sucesso.",
      error: "Erro ao guardar a página.",
    },
    savePasswordPin: {
      success: "Código PIN criado com sucesso.",
      error: "Erro ao criar o código PIN.",
    },
    removePasswordPin: {
      error: "Erro ao remover o código PIN.",
    },
    logout: {
      error: "Erro inesperado. Por favor, tente novamente.",
    },
    signup: {
      error: "Erro ao criar uma conta.",
      invalidEmail: "Por favor escreva um email válido.",
      invalidPassword: "A password deve ter pelo menos 8 caracteres.",
    },
    signin: {
      error: "Erro ao fazer login na conta.",
    },
    auth: {
      error: "Erro ao verificar os detalhes da sua conta.",
    },
    recoverAccount: {
      success: "Email de recuperação enviado com sucesso.",
      error: "Erro ao enviar e-mail de recuperação.",
    },
    formFields: {
      empty: "Os campos não podem estar vazios.",
    },
  },
  // Diary Screen
  diaryScreen: {
    richEditor: {
      placeholder: "Clique no botão 'mais' para criar uma nova página.",
    },
  },
  // Editor Screen
  editorScreen: {
    richEditor: {
      placeholder: "Em que estás a pensar?",
    },
  },
  // Cloud Screen
  cloudScreen: {
    email: {
      title: "Email",
      placeholder: "examplo@dominio.com",
    },
    password: {
      title: "Senha",
      placeholder: "pelo menos 8 caracteres",
      loginPlaceholder: "********",
    },
    // signUp specific
    signUp: {
      terms: "Ao criar uma conta, aceita nossos termos e condições",
      primaryButton: "Inscrever-se",
      content: {
        title: "Melhor com Premium",
        subtitle: "Desbloquear recursos premium",
        value: "1.99$/Mês",
        // break word
        listItem1: "Cópia de\nsegurança",
        listItem2: "Dados\nSeguros",
        listItem3: "Múltiplo\ndispositivos",
      },
      footer: {
        text: "Já tem uma conta?",
        link: "Iniciar Sessão",
      },
    },
    // login specific
    logIn: {
      primaryButton: "Iniciar Sessão",
      forgotPassword: "Esqueceu a password?",
      content: {
        title: "Iniciar Sessão",
        text: "Olá de novo!\nBem vindo\nde volta",
      },
      footer: {
        text: "Não tem conta?",
        link: "Inscrever-se",
      },
    },
    recoverAccount: {
      primaryButton: "Enviar e-mail de recuperação",
      content: {
        title: "Recuperar password",
        text:
          "Por favor, indique o seu endereço de e-mail para receber um link de recuperação.",
      },
    },
  },
  alerts: {
    draft: {
      title: "Vamos continuar?",
      message:
        "Você tem um rascunho, carregue o rascunho para continuar escrevendo onde parou.",
      buttons: {
        cancel: "Descartar",
        ok: "Carregar",
      },
    },
    ota: {
      title: "Nova atualização disponível",
      message:
        "Está disponível uma nova versão do aplicativo, que traz melhorias e correções.",
      buttons: {
        ok: "Descarregar",
      },
    },
    ads: {
      title: "Anúncios Personalizados",
      message:
        "Ativar anúncios personalizados possibilitará a entrega de anúncios relevantes para você.",
      buttons: {
        ok: "Ativar",
        cancel: "Desativar",
      },
    },
  },
};
