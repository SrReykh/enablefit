export function handleFirebaseAuthError(error) {
  switch (error.code) {
    case "auth/invalid-email":
      return "O endereço de e-mail inserido está em um formato inválido.";

    case "auth/user-disabled":
      return "A conta do usuário foi desativada pelo administrador.";

    case "auth/user-not-found":
      return "Não há registro de usuário correspondente ao e-mail fornecido.";

    case "auth/wrong-password":
      return "A senha fornecida está incorreta.";

    case "auth/email-already-in-use":
      return "O endereço de e-mail já está em uso por outra conta.";

    case "auth/operation-not-allowed":
      return "O tipo de conta especificado está desabilitado no Firebase Authentication.";

    case "auth/too-many-requests":
      return "Muitas requisições... Aguarde.";

    case "auth/weak-password":
      return "A senha fornecida é muito fraca.";

    case "auth/account-exists-with-different-credential":
      return "Já existe uma conta com o mesmo e-mail, mas com um provedor de autenticação diferente.";

    case "auth/popup-blocked":
      return "O popup de login foi bloqueado pelo navegador.";

    case "auth/popup-closed-by-user":
      return "O popup de login foi fechado pelo usuário antes de concluir a operação.";

    case "auth/credential-already-in-use":
      return "Essas credenciais já estão associadas a uma conta de usuário diferente.";

    case "auth/user-not-found":
      return "Não há registro de usuário correspondente ao e-mail fornecido.";

    case "auth/invalid-action-code":
      return "O código de ação de verificação de e-mail é inválido ou expirou.";

    case "auth/expired-action-code":
      return "O código de ação de verificação de e-mail expirou.";

    default:
      return "Ocorreu um erro desconhecido: " + error.message;
  }
}
