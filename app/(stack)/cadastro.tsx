import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [ra, setRa] = useState("");
  const [telefone, setTelefone] = useState("");
  const [curso, setCurso] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [erro, setErro] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Elementos flutuantes
  const circle1 = useRef(new Animated.Value(0)).current;
  const circle2 = useRef(new Animated.Value(0)).current;
  const circle3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animações principais
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    // Animações dos círculos de fundo
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(circle1, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(circle1, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(circle2, {
            toValue: 1,
            duration: 5000,
            delay: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(circle2, {
            toValue: 0,
            duration: 5000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(circle3, {
            toValue: 1,
            duration: 6000,
            delay: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(circle3, {
            toValue: 0,
            duration: 6000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const handleCadastro = () => {
    setErro("");

    if (!nome.trim()) {
      setErro("Por favor, insira seu nome completo");
      return;
    }

    if (!email.trim()) {
      setErro("Por favor, insira seu email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErro("Por favor, insira um email válido");
      return;
    }

    if (!ra.trim()) {
      setErro("Por favor, insira seu RA");
      return;
    }

    if (!telefone.trim()) {
      setErro("Por favor, insira seu telefone");
      return;
    }

    if (!curso.trim()) {
      setErro("Por favor, insira seu curso");
      return;
    }

    if (!periodo.trim()) {
      setErro("Por favor, insira seu período");
      return;
    }

    if (!senha.trim()) {
      setErro("Por favor, insira sua senha");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    // Animação do botão ao pressionar
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    console.log("Cadastro:", {
      nome,
      email,
      ra,
      telefone,
      curso,
      periodo,
      senha,
    });

    // Após cadastro bem-sucedido, redireciona para login ou para as tabs
    router.replace("/(stack)/(tabs)");
  };

  const circle1Y = circle1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const circle2Y = circle2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40],
  });

  const circle3Y = circle3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  const cursos = [
    "Ciência de Dados",
    "Comércio Exterior",
    "Desenvolvimento de Software Multiplataforma",
    "Design de Produto",
    "Gestão da Produção Industrial",
    "Gestão Empresarial",
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={["#0a0e27", "#0f172a", "#1e293b", "#334155"]}
        style={styles.gradient}
      >
        {/* Background Elements */}
        <Animated.View
          style={[
            styles.backgroundCircle1,
            {
              transform: [{ translateY: circle1Y }],
              opacity: 0.15,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.backgroundCircle2,
            {
              transform: [{ translateY: circle2Y }],
              opacity: 0.1,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.backgroundCircle3,
            {
              transform: [{ translateY: circle3Y }],
              opacity: 0.08,
            },
          ]}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.headerSection}>
              <Text style={styles.title}>Criar Conta</Text>
              <Text style={styles.subtitle}>
                Preencha seus dados para começar
              </Text>
              <View style={styles.titleUnderline} />
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              {/* Nome Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={nome}
                    onChangeText={(text) => {
                      setNome(text);
                      setErro("");
                    }}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setErro("");
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* RA Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="school-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="RA (Registro Acadêmico)"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={ra}
                    onChangeText={(text) => {
                      setRa(text);
                      setErro("");
                    }}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Telefone Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Telefone"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={telefone}
                    onChangeText={(text) => {
                      setTelefone(text);
                      setErro("");
                    }}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Curso Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="book-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Curso"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={curso}
                    onChangeText={(text) => {
                      setCurso(text);
                      setErro("");
                    }}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Período Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Período (ex: 1º, 2º, 3º)"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={periodo}
                    onChangeText={(text) => {
                      setPeriodo(text);
                      setErro("");
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Senha Input */}
              <View style={styles.inputContainer}>
                <View style={styles.passwordContainer}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Senha"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={senha}
                    onChangeText={(text) => {
                      setSenha(text);
                      setErro("");
                    }}
                    secureTextEntry={!mostrarSenha}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setMostrarSenha(!mostrarSenha)}
                  >
                    <Ionicons
                      name={mostrarSenha ? "eye-outline" : "eye-off-outline"}
                      size={22}
                      color="rgba(255, 255, 255, 0.6)"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirmar Senha Input */}
              <View style={styles.inputContainer}>
                <View style={styles.passwordContainer}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirmar senha"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={confirmarSenha}
                    onChangeText={(text) => {
                      setConfirmarSenha(text);
                      setErro("");
                    }}
                    secureTextEntry={!mostrarConfirmarSenha}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() =>
                      setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                    }
                  >
                    <Ionicons
                      name={
                        mostrarConfirmarSenha
                          ? "eye-outline"
                          : "eye-off-outline"
                      }
                      size={22}
                      color="rgba(255, 255, 255, 0.6)"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Error Message */}
              {erro ? (
                <Animated.View
                  style={[
                    styles.errorContainer,
                    {
                      opacity: fadeAnim,
                    },
                  ]}
                >
                  <Ionicons name="alert-circle" size={18} color="#ef4444" />
                  <Text style={styles.errorText}>{erro}</Text>
                </Animated.View>
              ) : null}

              {/* Cadastro Button */}
              <Animated.View
                style={[
                  {
                    transform: [{ scale: buttonScale }],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.cadastroButton}
                  onPress={handleCadastro}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={[
                      "rgba(59, 130, 246, 1)",
                      "rgba(147, 51, 234, 0.9)",
                    ]}
                    style={styles.cadastroButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.cadastroButtonText}>Criar Conta</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(255, 255, 255, 0.15)",
                    "transparent",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.dividerLine}
                />
                <Text style={styles.dividerText}>ou</Text>
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(255, 255, 255, 0.15)",
                    "transparent",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.dividerLine}
                />
              </View>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Já tem uma conta? </Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.loginLink}>Entrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    position: "relative",
  },
  backgroundCircle1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#3b82f6",
    top: -50,
    right: -50,
  },
  backgroundCircle2: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#9333ea",
    bottom: 100,
    left: -100,
  },
  backgroundCircle3: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#00d4ff",
    top: height * 0.5,
    right: 50,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingVertical: 20,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    zIndex: 1,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 8,
    letterSpacing: -0.8,
    textShadowColor: "rgba(0, 212, 255, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 17,
    color: "rgba(255, 255, 255, 0.75)",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 24,
    marginBottom: 12,
  },
  titleUnderline: {
    width: 80,
    height: 4,
    backgroundColor: "#00d4ff",
    borderRadius: 2,
    shadowColor: "#00d4ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
  },
  formSection: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    paddingLeft: 18,
    height: 56,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 0,
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    paddingLeft: 18,
    paddingRight: 12,
    height: 56,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 0,
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
  },
  eyeButton: {
    padding: 8,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.4)",
  },
  errorText: {
    fontSize: 13,
    color: "#ef4444",
    flex: 1,
    fontWeight: "600",
  },
  cadastroButton: {
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 30,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 10,
  },
  cadastroButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  cadastroButtonText: {
    fontSize: 19,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.8,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "600",
    letterSpacing: 1,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  loginText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  loginLink: {
    fontSize: 14,
    color: "#00d4ff",
    fontWeight: "800",
    textShadowColor: "rgba(0, 212, 255, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
