import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Cultura() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

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
    ]).start();
  }, []);

  const eventos = [
    {
      id: 1,
      titulo: "Festival de Artes",
      data: "15 de Novembro",
      local: "Auditório Principal",
      descricao: "Apresentações de teatro, música e dança dos estudantes",
      cor: ["rgba(147, 51, 234, 0.9)", "rgba(219, 39, 119, 0.8)"],
    },
    {
      id: 2,
      titulo: "Exposição Fotográfica",
      data: "20 de Novembro",
      local: "Galeria Central",
      descricao: "Trabalhos fotográficos sobre a cidade de Cotia",
      cor: ["rgba(59, 130, 246, 0.9)", "rgba(147, 51, 234, 0.8)"],
    },
    {
      id: 3,
      titulo: "Workshop de Cinema",
      data: "25 de Novembro",
      local: "Sala de Multimídia",
      descricao: "Oficina prática de produção cinematográfica",
      cor: ["rgba(245, 101, 101, 0.9)", "rgba(251, 146, 60, 0.8)"],
    },
    {
      id: 4,
      titulo: "Sarau Literário",
      data: "30 de Novembro",
      local: "Biblioteca",
      descricao: "Leitura de poesias e textos originais",
      cor: ["rgba(16, 185, 129, 0.9)", "rgba(59, 130, 246, 0.8)"],
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0f172a", "#1e293b", "#334155"]}
        style={styles.gradient}
      >
        {/* Header */}
        <LinearGradient
          colors={["rgba(147, 51, 234, 0.9)", "rgba(219, 39, 119, 0.8)"]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerIcon}>🎭</Text>
            <Text style={styles.headerTitle}>Cultura</Text>
            <Text style={styles.headerSubtitle}>
              Eventos e atividades culturais
            </Text>
          </View>
        </LinearGradient>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Informações Gerais */}
            <View style={styles.infoCard}>
              <View style={styles.infoHeader}>
                <Ionicons name="information-circle" size={24} color="#00d4ff" />
                <Text style={styles.infoTitle}>Sobre a Cultura na Fatec</Text>
              </View>
              <Text style={styles.infoText}>
                A Fatec Cotia promove diversas atividades culturais durante o
                ano letivo, proporcionando aos estudantes experiências
                enriquecedoras e oportunidades de expressão artística.
              </Text>
            </View>

            {/* Lista de Eventos */}
            <View style={styles.eventsSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="calendar" size={24} color="#ffffff" />
                <Text style={styles.sectionTitle}>Próximos Eventos</Text>
              </View>

              {eventos.map((evento, index) => (
                <Animated.View
                  key={evento.id}
                  style={[
                    styles.eventCard,
                    {
                      opacity: fadeAnim,
                      transform: [
                        {
                          translateY: slideAnim.interpolate({
                            inputRange: [0, 30],
                            outputRange: [0, 20 + index * 10],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <LinearGradient
                    colors={evento.cor as [string, string]}
                    style={styles.eventGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.eventHeader}>
                      <Text style={styles.eventTitle}>{evento.titulo}</Text>
                      <View style={styles.eventBadge}>
                        <Text style={styles.eventBadgeText}>Novo</Text>
                      </View>
                    </View>
                    <View style={styles.eventInfo}>
                      <View style={styles.eventInfoItem}>
                        <Ionicons
                          name="calendar-outline"
                          size={16}
                          color="#ffffff"
                        />
                        <Text style={styles.eventInfoText}>{evento.data}</Text>
                      </View>
                      <View style={styles.eventInfoItem}>
                        <Ionicons
                          name="location-outline"
                          size={16}
                          color="#ffffff"
                        />
                        <Text style={styles.eventInfoText}>{evento.local}</Text>
                      </View>
                    </View>
                    <Text style={styles.eventDescription}>
                      {evento.descricao}
                    </Text>
                    <TouchableOpacity style={styles.eventButton}>
                      <Text style={styles.eventButtonText}>
                        Mais Informações
                      </Text>
                      <Ionicons
                        name="arrow-forward"
                        size={16}
                        color="#ffffff"
                      />
                    </TouchableOpacity>
                  </LinearGradient>
                </Animated.View>
              ))}
            </View>

            {/* Benefícios */}
            <View style={styles.benefitsCard}>
              <Text style={styles.benefitsTitle}>
                Benefícios da Participação
              </Text>
              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                  <Text style={styles.benefitText}>
                    Desenvolvimento de habilidades artísticas
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                  <Text style={styles.benefitText}>
                    Networking com profissionais da área
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                  <Text style={styles.benefitText}>
                    Certificados de participação
                  </Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                  <Text style={styles.benefitText}>
                    Enriquecimento do currículo
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    alignItems: "center",
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  infoCard: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginLeft: 12,
  },
  infoText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 22,
  },
  eventsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    marginLeft: 12,
  },
  eventCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  eventGradient: {
    padding: 20,
    borderRadius: 20,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    flex: 1,
  },
  eventBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#ffffff",
  },
  eventInfo: {
    flexDirection: "row",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  eventInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  eventInfoText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
    marginLeft: 6,
    fontWeight: "500",
  },
  eventDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: 20,
    marginBottom: 16,
  },
  eventButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  eventButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    marginRight: 8,
  },
  benefitsCard: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 16,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  benefitText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});
