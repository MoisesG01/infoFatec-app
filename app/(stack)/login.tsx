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
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [senhaFocused, setSenhaFocused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const emailGlowAnim = useRef(new Animated.Value(0)).current;
  const senhaGlowAnim = useRef(new Animated.Value(0)).current;
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
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 1500,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Animação flutuante do logo
    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );
    floatAnimation.start();

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

  useEffect(() => {
    if (emailFocused) {
      Animated.timing(emailGlowAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(emailGlowAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [emailFocused]);

  useEffect(() => {
    if (senhaFocused) {
      Animated.timing(senhaGlowAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(senhaGlowAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [senhaFocused]);

  const handleLogin = () => {
    setErro("");

    if (!email.trim()) {
      setErro("Por favor, insira seu email ou RA");
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

    console.log("Login:", { email, senha });
    router.replace("/(stack)/(tabs)");
  };

  const floatInterpolate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 10],
  });

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

  const emailGlow = emailGlowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(59, 130, 246, 0)", "rgba(59, 130, 246, 0.3)"],
  });

  const senhaGlow = senhaGlowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(147, 51, 234, 0)", "rgba(147, 51, 234, 0.3)"],
  });

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
            {/* Logo Section */}
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  opacity: logoAnim,
                  transform: [{ translateY: floatInterpolate }],
                },
              ]}
            >
              <View style={styles.logoGlowContainer}>
                <LinearGradient
                  colors={[
                    "rgba(59, 130, 246, 0.4)",
                    "rgba(147, 51, 234, 0.3)",
                    "rgba(59, 130, 246, 0.2)",
                  ]}
                  style={styles.logoGlow}
                />
              </View>
              <Image
                source={require("../../assets/logo_login.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </Animated.View>

            <Animated.View
              style={[
                styles.headerSection,
                {
                  opacity: logoAnim,
                },
              ]}
            >
              <Text style={styles.title}>Bem-vindo</Text>
              <Text style={styles.subtitle}>
                Entre na sua conta para continuar
              </Text>
              <View style={styles.titleUnderline} />
            </Animated.View>

            {/* Form Section */}
            <View style={styles.formSection}>
              {/* Email/RA Input */}
              <Animated.View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: emailGlow,
                    shadowColor: emailGlow,
                  },
                ]}
              >
                <View style={styles.inputWrapper}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color={
                        emailFocused ? "#3b82f6" : "rgba(255, 255, 255, 0.6)"
                      }
                    />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite seu email ou RA"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setErro("");
                    }}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </Animated.View>

              {/* Senha Input */}
              <Animated.View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: senhaGlow,
                    shadowColor: senhaGlow,
                  },
                ]}
              >
                <View style={styles.passwordContainer}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={
                        senhaFocused ? "#9333ea" : "rgba(255, 255, 255, 0.6)"
                      }
                    />
                  </View>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Digite sua senha"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={senha}
                    onChangeText={(text) => {
                      setSenha(text);
                      setErro("");
                    }}
                    onFocus={() => setSenhaFocused(true)}
                    onBlur={() => setSenhaFocused(false)}
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
              </Animated.View>

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

              {/* Forgot Password Link */}
              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>
                  Esqueceu sua senha?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <Animated.View
                style={[
                  {
                    transform: [{ scale: buttonScale }],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={[
                      "rgba(59, 130, 246, 1)",
                      "rgba(147, 51, 234, 0.9)",
                    ]}
                    style={styles.loginButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.loginButtonText}>Entrar</Text>
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

              {/* Sign Up Link */}
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Não tem uma conta? </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(stack)/cadastro")}
                >
                  <Text style={styles.signUpLink}>Cadastre-se</Text>
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
    justifyContent: "center",
    padding: 24,
    zIndex: 1,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  logoGlowContainer: {
    position: "absolute",
    width: 380,
    height: 380,
    alignItems: "center",
    justifyContent: "center",
  },
  logoGlow: {
    width: "100%",
    height: "100%",
    borderRadius: 190,
  },
  logoImage: {
    width: 360,
    height: 360,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 12,
    letterSpacing: -1,
    textShadowColor: "rgba(59, 130, 246, 0.5)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.75)",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 16,
  },
  titleUnderline: {
    width: 60,
    height: 4,
    backgroundColor: "#3b82f6",
    borderRadius: 2,
    marginTop: 8,
  },
  formSection: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 20,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.15)",
    shadowColor: "rgba(59, 130, 246, 0)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    paddingLeft: 18,
    overflow: "hidden",
  },
  iconContainer: {
    marginRight: 14,
  },
  input: {
    flex: 1,
    padding: 18,
    paddingLeft: 0,
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    paddingLeft: 18,
    paddingRight: 12,
    overflow: "hidden",
  },
  passwordInput: {
    flex: 1,
    padding: 18,
    paddingLeft: 0,
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
  },
  eyeButton: {
    padding: 10,
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
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 28,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#00d4ff",
    fontWeight: "700",
    textShadowColor: "rgba(0, 212, 255, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  loginButton: {
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 28,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  loginButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  loginButtonText: {
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
    marginVertical: 28,
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
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  signUpText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  signUpLink: {
    fontSize: 14,
    color: "#00d4ff",
    fontWeight: "800",
    textShadowColor: "rgba(0, 212, 255, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
