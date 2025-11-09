import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
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

    // Animação flutuante dos círculos
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
  }, []);

  const floatInterpolate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const handleLogout = () => {
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section - Design Moderno e Elegante */}
        <LinearGradient
          colors={["#0f172a", "#1e293b", "#334155"]}
          style={styles.heroSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroHeader}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Ionicons name="log-out-outline" size={18} color="#0f172a" />
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          </View>
          {/* Círculos animados que você gostou */}
          <Animated.View
            style={[
              styles.backgroundElement1,
              { transform: [{ translateY: floatInterpolate }] },
            ]}
          />
          <Animated.View
            style={[
              styles.backgroundElement2,
              { transform: [{ translateY: floatInterpolate }] },
            ]}
          />
          <Animated.View
            style={[
              styles.backgroundElement3,
              { transform: [{ translateY: floatInterpolate }] },
            ]}
          />

          <Animated.View
            style={[
              styles.heroContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.logoContainer}>
              <Image
                source={require("../../../assets/fatec.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.heroTitle}>InfoFatec</Text>
            <Text style={styles.heroSubtitle}>
              Centro de informações acadêmicas
            </Text>
          </Animated.View>
        </LinearGradient>

        {/* Conteúdo Principal - Design Harmonioso */}
        <LinearGradient
          colors={["#0f172a", "#1e293b", "#334155"]}
          style={styles.contentContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Formas de fundo discretas */}
          <View style={styles.contentBackgroundShape1} />
          <View style={styles.contentBackgroundShape2} />
          <View style={styles.contentBackgroundShape3} />
          <View style={styles.contentBackgroundShape4} />
          {/* Card de Boas-vindas Espetacular */}
          <LinearGradient
            colors={[
              "rgba(102, 126, 234, 0.9)",
              "rgba(118, 75, 162, 0.8)",
              "rgba(240, 147, 251, 0.7)",
            ]}
            style={styles.welcomeCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.welcomeHeader}>
              <Text style={styles.welcomeIcon}>🎓</Text>
              <Text style={styles.welcomeTitle}>Bem-vindo ao InfoFatec</Text>
            </View>
            <Text style={styles.welcomeDescription}>
              Explore informações acadêmicas, eventos culturais, oportunidades
              de emprego e protocolos de segurança da Fatec Cotia.
            </Text>
          </LinearGradient>

          {/* Estatísticas Discretas */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🎓</Text>
              <Text style={styles.statNumber}>6</Text>
              <Text style={styles.statLabel}>Cursos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>👨‍🎓</Text>
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Alunos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🏆</Text>
              <Text style={styles.statNumber}>15+</Text>
              <Text style={styles.statLabel}>Anos</Text>
            </View>
          </View>

          {/* Serviços */}
          <View style={styles.servicesSection}>
            <View style={styles.servicesContainer}>
              <Text style={styles.sectionTitle}>Nossos Serviços</Text>
              <View style={styles.servicesGrid}>
                <Link href="/(stack)/(tabs)/cultura" asChild>
                  <TouchableOpacity style={styles.serviceCard}>
                    <View style={styles.serviceIconContainer}>
                      <Text style={styles.serviceIcon}>🎭</Text>
                    </View>
                    <View style={styles.serviceContent}>
                      <Text style={styles.serviceTitle}>Cultura</Text>
                      <Text style={styles.serviceDescription}>
                        Eventos culturais e atividades artísticas
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Link>

                <Link href="/(stack)/(tabs)/educacao" asChild>
                  <TouchableOpacity style={styles.serviceCard}>
                    <View style={styles.serviceIconContainer}>
                      <Text style={styles.serviceIcon}>📚</Text>
                    </View>
                    <View style={styles.serviceContent}>
                      <Text style={styles.serviceTitle}>Educação</Text>
                      <Text style={styles.serviceDescription}>
                        Cursos e recursos acadêmicos
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Link>

                <Link href="/(stack)/(tabs)/empregos" asChild>
                  <TouchableOpacity style={styles.serviceCard}>
                    <View style={styles.serviceIconContainer}>
                      <Text style={styles.serviceIcon}>💼</Text>
                    </View>
                    <View style={styles.serviceContent}>
                      <Text style={styles.serviceTitle}>Empregos</Text>
                      <Text style={styles.serviceDescription}>
                        Oportunidades de carreira
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Link>

                <Link href="/(stack)/(tabs)/seguranca" asChild>
                  <TouchableOpacity style={styles.serviceCard}>
                    <View style={styles.serviceIconContainer}>
                      <Text style={styles.serviceIcon}>🛡️</Text>
                    </View>
                    <View style={styles.serviceContent}>
                      <Text style={styles.serviceTitle}>Segurança</Text>
                      <Text style={styles.serviceDescription}>
                        Protocolos e informações
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>

          {/* Acesso Rápido */}
          <View style={styles.quickAccessSection}>
            <View style={styles.quickAccessTitleContainer}>
              <View style={styles.quickAccessIconContainer}>
                <Text style={styles.quickAccessTitleIcon}>⚡</Text>
              </View>
              <Text style={styles.quickAccessTitle}>Acesso Rápido</Text>
              <View style={styles.quickAccessDots}>
                <View style={styles.quickAccessDot} />
                <View style={styles.quickAccessDot} />
                <View style={styles.quickAccessDot} />
              </View>
            </View>
            <View style={styles.quickAccessGrid}>
              <View style={styles.quickAccessItem}>
                <Text style={styles.quickAccessIcon}>📅</Text>
                <Text style={styles.quickAccessText}>Calendário</Text>
              </View>
              <View style={styles.quickAccessItem}>
                <Text style={styles.quickAccessIcon}>📞</Text>
                <Text style={styles.quickAccessText}>Contato</Text>
              </View>
              <View style={styles.quickAccessItem}>
                <Text style={styles.quickAccessIcon}>📍</Text>
                <Text style={styles.quickAccessText}>Localização</Text>
              </View>
              <View style={styles.quickAccessItem}>
                <Text style={styles.quickAccessIcon}>ℹ️</Text>
                <Text style={styles.quickAccessText}>Sobre</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    paddingTop: 60,
    paddingBottom: 80,
    paddingHorizontal: 24,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  backgroundElement1: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    top: 40,
    right: 20,
  },
  backgroundElement2: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(147, 51, 234, 0.12)",
    bottom: 60,
    left: 30,
  },
  backgroundElement3: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    top: 100,
    left: 50,
  },
  heroHeader: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 16,
    zIndex: 2,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  logoutText: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "700",
  },
  heroContent: {
    alignItems: "center",
    zIndex: 1,
  },
  logoContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  logoImage: {
    width: 250,
    height: 100,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 12,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 26,
  },
  contentContainer: {
    padding: 24,
    marginTop: -50,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 16,
    minHeight: height * 0.7,
    borderWidth: 1,
    borderColor: "rgba(226, 232, 240, 0.3)",
    position: "relative",
    overflow: "hidden",
  },
  contentBackgroundShape1: {
    position: "absolute",
    width: 80,
    height: 120,
    backgroundColor: "rgba(59, 130, 246, 0.12)",
    top: 40,
    right: 30,
    transform: [{ rotate: "15deg" }],
  },
  contentBackgroundShape2: {
    position: "absolute",
    width: 100,
    height: 60,
    backgroundColor: "rgba(147, 51, 234, 0.1)",
    bottom: 100,
    left: 20,
    transform: [{ rotate: "-20deg" }],
  },
  contentBackgroundShape3: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "rgba(16, 185, 129, 0.08)",
    top: 180,
    left: 15,
    transform: [{ rotate: "45deg" }],
  },
  contentBackgroundShape4: {
    position: "absolute",
    width: 90,
    height: 90,
    backgroundColor: "rgba(245, 101, 101, 0.06)",
    bottom: 180,
    right: 15,
    transform: [{ rotate: "-30deg" }],
  },
  welcomeCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 12,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  welcomeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  welcomeIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#ffffff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  welcomeDescription: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.95)",
    lineHeight: 22,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    padding: 12,
    flex: 1,
    marginHorizontal: 3,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  statIcon: {
    fontSize: 18,
    marginBottom: 6,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  servicesSection: {
    marginBottom: 24,
  },
  servicesContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },
  servicesGrid: {
    flexDirection: "column",
  },
  serviceCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 16,
    width: "100%",
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    flexDirection: "row",
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  serviceIcon: {
    fontSize: 24,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 18,
  },
  quickAccessSection: {
    marginBottom: 24,
  },
  quickAccessTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  quickAccessIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 212, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 212, 255, 0.3)",
  },
  quickAccessTitleIcon: {
    fontSize: 20,
    color: "#00d4ff",
  },
  quickAccessTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    flex: 1,
    textAlign: "center",
  },
  quickAccessDots: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  quickAccessDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(0, 212, 255, 0.6)",
    marginHorizontal: 2,
  },
  quickAccessGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickAccessItem: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  quickAccessIcon: {
    fontSize: 18,
    marginBottom: 6,
  },
  quickAccessText: {
    fontSize: 10,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },
});
