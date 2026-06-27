/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LanguageCode } from "./translations";

export interface AuthTransItem {
  account: string;
  signIn: string;
  signUp: string;
  signOut: string;
  email: string;
  password: string;
  guestSignIn: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  syncingProgress: string;
  progressSynced: string;
  loading: string;
  invalidEmailOrPassword: string;
  authTitle: string;
  authSubtitle: string;
  loggedAs: string;
  or: string;
  guestWarning: string;
}

export const authTranslations: Record<LanguageCode, AuthTransItem> = {
  en: {
    account: "Account",
    signIn: "Sign In",
    signUp: "Sign Up",
    signOut: "Sign Out",
    email: "Email Address",
    password: "Password",
    guestSignIn: "Continue as Guest",
    alreadyHaveAccount: "Already have an account? Sign In",
    dontHaveAccount: "Don't have an account? Sign Up",
    syncingProgress: "Syncing progress...",
    progressSynced: "Progress successfully synced to your cloud account!",
    loading: "Loading...",
    invalidEmailOrPassword: "Invalid email or password. Please try again.",
    authTitle: "Trading Academy Cloud Progress",
    authSubtitle: "Create a cloud account to securely save and sync your completed lessons.",
    loggedAs: "Logged in as:",
    or: "OR",
    guestWarning: "As a Guest, your progress is saved locally. Create an account to sync it to the cloud!"
  },
  es: {
    account: "Cuenta",
    signIn: "Iniciar Sesión",
    signUp: "Registrarse",
    signOut: "Cerrar Sesión",
    email: "Correo Electrónico",
    password: "Contraseña",
    guestSignIn: "Continuar como Invitado",
    alreadyHaveAccount: "¿Ya tienes una cuenta? Iniciar Sesión",
    dontHaveAccount: "¿No tienes una cuenta? Registrarse",
    syncingProgress: "Sincronizando progreso...",
    progressSynced: "¡Progreso sincronizado con éxito en tu cuenta en la nube!",
    loading: "Cargando...",
    invalidEmailOrPassword: "Correo electrónico o contraseña inválidos. Inténtalo de nuevo.",
    authTitle: "Progreso en la Nube de la Academia",
    authSubtitle: "Crea una cuenta en la nube para guardar y sincronizar tus lecciones completadas de forma segura.",
    loggedAs: "Sesión iniciada como:",
    or: "O",
    guestWarning: "Como Invitado, tu progreso se guarda localmente. ¡Crea una cuenta para sincronizarlo con la nube!"
  },
  fr: {
    account: "Compte",
    signIn: "Se connecter",
    signUp: "S'inscrire",
    signOut: "Se déconnecter",
    email: "Adresse e-mail",
    password: "Mot de passe",
    guestSignIn: "Continuer en tant qu'invité",
    alreadyHaveAccount: "Vous avez déjà un compte ? Se connecter",
    dontHaveAccount: "Vous n'avez pas de compte ? S'inscrire",
    syncingProgress: "Synchronisation du progrès...",
    progressSynced: "Progrès synchronisé avec succès sur votre compte cloud !",
    loading: "Chargement...",
    invalidEmailOrPassword: "E-mail ou mot de passe invalide. Veuillez réessayer.",
    authTitle: "Progresse dans le Cloud de l'Académie",
    authSubtitle: "Créez un compte cloud pour sauvegarder et synchroniser vos leçons terminées en toute sécurité.",
    loggedAs: "Connecté en tant que :",
    or: "OU",
    guestWarning: "En tant qu'invité, votre progression est enregistrée localement. Créez un compte pour la synchroniser avec le cloud !"
  },
  de: {
    account: "Konto",
    signIn: "Anmelden",
    signUp: "Registrieren",
    signOut: "Abmelden",
    email: "E-Mail-Adresse",
    password: "Passwort",
    guestSignIn: "Als Gast fortfahren",
    alreadyHaveAccount: "Haben Sie bereits ein Konto? Anmelden",
    dontHaveAccount: "Haben Sie noch kein Konto? Registrieren",
    syncingProgress: "Fortschritt wird synchronisiert...",
    progressSynced: "Fortschritt erfolgreich mit Ihrem Cloud-Konto synchronisiert!",
    loading: "Wird geladen...",
    invalidEmailOrPassword: "Ungültige E-Mail-Adresse oder Passwort. Bitte versuchen Sie es erneut.",
    authTitle: "Akademie-Cloud-Fortschritt",
    authSubtitle: "Erstellen Sie ein Cloud-Konto, um Ihre abgeschlossenen Lektionen sicher zu speichern und zu synchronisieren.",
    loggedAs: "Angemeldet als:",
    or: "ODER",
    guestWarning: "Als Gast wird Ihr Fortschritt lokal gespeichert. Erstellen Sie ein Konto, um ihn mit der Cloud zu synchronisieren!"
  },
  ar: {
    account: "الحساب",
    signIn: "تسجيل الدخول",
    signUp: "إنشاء حساب",
    signOut: "تسجيل الخروج",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    guestSignIn: "المتابعة كضيف",
    alreadyHaveAccount: "هل لديك حساب بالفعل؟ تسجيل الدخول",
    dontHaveAccount: "ليس لديك حساب؟ إنشاء حساب",
    syncingProgress: "جاري مزامنة التقدم...",
    progressSynced: "تمت مزامنة التقدم بنجاح مع حسابك السحابي!",
    loading: "جاري التحميل...",
    invalidEmailOrPassword: "البريد الإلكتروني أو كلمة المرور غير صالحة. يرجى المحاولة مرة أخرى.",
    authTitle: "التقدم السحابي للأكاديمية",
    authSubtitle: "أنشئ حسابًا سحابيًا لحفظ ومزامنة دروسك المكتملة بأمان.",
    loggedAs: "تم تسجيل الدخول باسم:",
    or: "أو",
    guestWarning: "كضيف، يتم حفظ تقدمك محليًا. أنشئ حسابًا لمزامنته مع السحابة!"
  },
  ja: {
    account: "アカウント",
    signIn: "サインイン",
    signUp: "新規登録",
    signOut: "サインアウト",
    email: "メールアドレス",
    password: "パスワード",
    guestSignIn: "ゲストとして続行",
    alreadyHaveAccount: "すでにアカウントをお持ちですか？サインイン",
    dontHaveAccount: "アカウントをお持ちでないですか？新規登録",
    syncingProgress: "進捗状況を同期中...",
    progressSynced: "進捗状況がクラウドのアカウントに正常に同期されました！",
    loading: "読み込み中...",
    invalidEmailOrPassword: "メールアドレスまたはパスワードが無効です。もう一度お試しください。",
    authTitle: "アカデミークラウド進捗同期",
    authSubtitle: "完了したレッスンを安全に保存および同期するためのクラウド・アカウントを作成します。",
    loggedAs: "ログイン中：",
    or: "または",
    guestWarning: "ゲストユーザーの場合、進捗はローカルにのみ保存されます。クラウドに同期するためにアカウントを作成してください！"
  },
  zh: {
    account: "账户",
    signIn: "登录",
    signUp: "注册",
    signOut: "退出登录",
    email: "电子邮箱",
    password: "密码",
    guestSignIn: "以游客身份继续",
    alreadyHaveAccount: "已有账户？登录",
    dontHaveAccount: "没有账户？注册",
    syncingProgress: "正在同步进度...",
    progressSynced: "进度已成功同步到您的云端账户！",
    loading: "加载中...",
    invalidEmailOrPassword: "邮箱或密码错误，请重试。",
    authTitle: "交易学院云端进度",
    authSubtitle: "创建云端账户以安全地保存并同步您已完成的的课程进度。",
    loggedAs: "已登录为：",
    or: "或",
    guestWarning: "游客身份下进度仅保存在本地。创建一个账户以将其同步到云端！"
  },
  pt: {
    account: "Conta",
    signIn: "Entrar",
    signUp: "Cadastrar-se",
    signOut: "Sair",
    email: "Endereço de E-mail",
    password: "Senha",
    guestSignIn: "Continuar como Convidado",
    alreadyHaveAccount: "Já tem uma conta? Entrar",
    dontHaveAccount: "Não tem uma conta? Cadastrar-se",
    syncingProgress: "Sincronizando progresso...",
    progressSynced: "Progresso sincronizado com sucesso na sua conta na nuvem!",
    loading: "Carregando...",
    invalidEmailOrPassword: "E-mail ou senha inválidos. Por favor, tente novamente.",
    authTitle: "Progresso na Nuvem da Academia",
    authSubtitle: "Crie uma conta na nuvem para salvar e sincronizar com segurança suas lições concluídas.",
    loggedAs: "Conectado como:",
    or: "OU",
    guestWarning: "Como convidado, seu progresso é salvo localmente. Crie uma conta para sincronizá-lo com a nuvem!"
  },
  it: {
    account: "Account",
    signIn: "Accedi",
    signUp: "Registrati",
    signOut: "Disconnetti",
    email: "Indirizzo e-mail",
    password: "Password",
    guestSignIn: "Continua come ospite",
    alreadyHaveAccount: "Hai già un account? Accedi",
    dontHaveAccount: "Non hai un account? Registrati",
    syncingProgress: "Sincronizzazione dei progressi...",
    progressSynced: "Progressi sincronizzati con successo nel tuo account cloud!",
    loading: "Caricamento...",
    invalidEmailOrPassword: "E-mail o password non valide. Riprova.",
    authTitle: "Progressi Cloud dell'Accademia",
    authSubtitle: "Crea un account cloud per salvare e sincronizzare in sicurezza i tuoi capitoli completati.",
    loggedAs: "Connesso come:",
    or: "OPPURE",
    guestWarning: "Come ospite, i tuoi progressi sono salvati localmente. Crea un account per sincronizzarli nel cloud!"
  },
  ru: {
    account: "Аккаунт",
    signIn: "Войти",
    signUp: "Зарегистрироваться",
    signOut: "Выйти",
    email: "Электронная почта",
    password: "Пароль",
    guestSignIn: "Продолжить как гость",
    alreadyHaveAccount: "Уже есть аккаунт? Войти",
    dontHaveAccount: "Нет аккаунта? Зарегистрироваться",
    syncingProgress: "Синхронизация прогресса...",
    progressSynced: "Прогресс успешно синхронизирован с вашим облачным аккаунтом!",
    loading: "Загрузка...",
    invalidEmailOrPassword: "Неверный адрес электронной почты или пароль. Пожалуйста, попробуйте еще раз.",
    authTitle: "Облачный прогресс Академии",
    authSubtitle: "Создайте облачный аккаунт, чтобы надежно сохранять и синхронизировать пройденные уроки.",
    loggedAs: "Вы вошли как:",
    or: "ИЛИ",
    guestWarning: "Ваш прогресс сохраняется локально. Создайте аккаунт для синхронизации с облаком!"
  }
};
