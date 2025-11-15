import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Linking,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";

const { width } = Dimensions.get("window");

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/moisesgonçalves",
    icon: "logo-linkedin",
    color: "#0077b5",
  },
  {
    name: "GitHub",
    url: "https://github.com/MoisesG01",
    icon: "logo-github",
    color: "#333",
  },
  {
    name: "Lattes",
    url: "https://lattes.cnpq.br/",
    icon: "school-outline",
    color: "#0066cc",
  },
];

export default function Perfil() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
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
  }, []);

  const handleSocialLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <LinearGradient
      colors={["#0f172a", "#1e293b", "#334155"]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.animatedContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          {/* Hero Section com Foto */}
          <LinearGradient
            colors={[
              "rgba(59,130,246,0.9)",
              "rgba(147,51,234,0.8)",
              "rgba(240,147,251,0.7)",
            ]}
            style={styles.heroCard}
          >
            <View style={styles.photoContainer}>
              <Image
                source={require("../../../assets/perfil.jpg")}
                style={styles.profilePhoto}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.heroTitle}>Moises Gonçalves</Text>
            <Text style={styles.heroSubtitle}>Desenvolvedor de Software</Text>
          </LinearGradient>

          {/* Biografia */}
          <View style={styles.bioCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="person-outline" size={24} color="#00d4ff" />
              <Text style={styles.sectionTitle}>Sobre</Text>
            </View>
            <Text style={styles.bioText}>
              Profissional apaixonado por tecnologia e inovação, com experiência
              em desenvolvimento de software, análise de projetos e gestão de
              qualidade. Atualmente atuando como Desenvolvedor de Software na
              Magnamed, trabalhando com sistemas embarcados e cursando
              Desenvolvimento de Software e Engenharia de Software na Fatec e
              Uninter respectivamente.
            </Text>
            <Text style={styles.bioText}>
              Com uma trajetória que inclui passagem pelo Grupo OLX como
              Estagiário de Engenharia de Software, desenvolvi habilidades em
              desenvolvimento de APIs, microserviços, bancos de dados e
              tecnologias modernas como React, Next.js e AWS.
            </Text>
            <Text style={styles.bioText}>
              Busco constantemente aprimorar minhas habilidades técnicas e
              contribuir para projetos desafiadores que gerem impacto positivo.
            </Text>
          </View>

          {/* Links para Redes Sociais e Portfólios */}
          <View style={styles.linksCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="link-outline" size={24} color="#00d4ff" />
              <Text style={styles.sectionTitle}>Redes Sociais & Portfólio</Text>
            </View>
            <View style={styles.socialContainer}>
              {socialLinks.map((link, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.socialButton}
                  onPress={() => handleSocialLink(link.url)}
                  activeOpacity={0.7}
                >
                  <Ionicons name={link.icon as any} size={28} color="#fff" />
                  <Text style={styles.socialButtonText}>{link.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Informações de Contato */}
          <View style={styles.contactCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="mail-outline" size={24} color="#00d4ff" />
              <Text style={styles.sectionTitle}>Contato</Text>
            </View>
            <TouchableOpacity
              style={styles.contactRow}
              onPress={() =>
                Linking.openURL("mailto:moises_goncalves@outlook.com.br")
              }
            >
              <Ionicons name="mail" size={20} color="#00d4ff" />
              <Text style={styles.contactText}>
                moises_goncalves@outlook.com.br
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactRow}
              onPress={() => Linking.openURL("tel:+5511974516828")}
            >
              <Ionicons name="call" size={20} color="#00d4ff" />
              <Text style={styles.contactText}>(11) 97451-6828</Text>
            </TouchableOpacity>
            <View style={styles.contactRow}>
              <Ionicons name="location" size={20} color="#00d4ff" />
              <Text style={styles.contactText}>Cotia, São Paulo - Brasil</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  animatedContent: {
    padding: 20,
  },
  heroCard: {
    borderRadius: 24,
    padding: 32,
    marginBottom: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  photoContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  profilePhoto: {
    width: "100%",
    height: "100%",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 8,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#0f172a",
    fontWeight: "600",
    textAlign: "center",
    opacity: 0.9,
  },
  bioCard: {
    backgroundColor: "rgba(30, 41, 59, 0.6)",
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 212, 255, 0.2)",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#e2e8f0",
  },
  bioText: {
    fontSize: 15,
    color: "#cbd5e1",
    lineHeight: 24,
    marginBottom: 16,
    textAlign: "justify",
  },
  linksCard: {
    backgroundColor: "rgba(30, 41, 59, 0.6)",
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 212, 255, 0.2)",
  },
  socialContainer: {
    gap: 12,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 212, 255, 0.15)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 212, 255, 0.3)",
    gap: 12,
  },
  socialButtonText: {
    fontSize: 16,
    color: "#e2e8f0",
    fontWeight: "600",
  },
  contactCard: {
    backgroundColor: "rgba(30, 41, 59, 0.6)",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(0, 212, 255, 0.2)",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  contactText: {
    fontSize: 15,
    color: "#e2e8f0",
    flex: 1,
  },
});
