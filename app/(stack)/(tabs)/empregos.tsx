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

export default function Empregos() {
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

  const vagas = [
    {
      id: 1,
      empresa: "TechSolutions Brasil",
      cargo: "Desenvolvedor Full Stack",
      tipo: "CLT",
      salario: "R$ 5.500 - R$ 8.000",
      local: "São Paulo - SP",
      prazo: "10 dias",
      cor: ["rgba(59, 130, 246, 0.9)", "rgba(147, 51, 234, 0.8)"],
      skills: ["React", "Node.js", "TypeScript"],
    },
    {
      id: 2,
      empresa: "Digital Innovation",
      cargo: "Analista de TI",
      tipo: "CLT",
      salario: "R$ 4.500 - R$ 6.500",
      local: "Remoto",
      prazo: "15 dias",
      cor: ["rgba(16, 185, 129, 0.9)", "rgba(59, 130, 246, 0.8)"],
      skills: ["Análise", "Suporte", "Infraestrutura"],
    },
    {
      id: 3,
      empresa: "Logística Express",
      cargo: "Coordenador de Logística",
      tipo: "CLT",
      salario: "R$ 6.000 - R$ 9.000",
      local: "Cotia - SP",
      prazo: "20 dias",
      cor: ["rgba(245, 101, 101, 0.9)", "rgba(251, 146, 60, 0.8)"],
      skills: ["Gestão", "Logística", "Analytics"],
    },
    {
      id: 4,
      empresa: "RH Consulting",
      cargo: "Assistente de RH",
      tipo: "Estágio",
      salario: "R$ 1.500 - R$ 2.000",
      local: "São Paulo - SP",
      prazo: "7 dias",
      cor: ["rgba(147, 51, 234, 0.9)", "rgba(219, 39, 119, 0.8)"],
      skills: ["RH", "Recrutamento", "Gestão"],
    },
  ];

  const recursos = [
    {
      icon: "document-text-outline",
      titulo: "Currículo",
      descricao: "Dicas para criar um currículo profissional",
    },
    {
      icon: "chatbubbles-outline",
      titulo: "Entrevista",
      descricao: "Preparação para processos seletivos",
    },
    {
      icon: "people-circle-outline",
      titulo: "Networking",
      descricao: "Construa sua rede de contatos",
    },
    {
      icon: "trending-up-outline",
      titulo: "Carreira",
      descricao: "Orientação sobre desenvolvimento profissional",
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0f172a", "#1e293b", "#334155"]}
        style={styles.gradient}
      >
        <LinearGradient
          colors={["rgba(245, 101, 101, 0.9)", "rgba(251, 146, 60, 0.8)"]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerIcon}>💼</Text>
            <Text style={styles.headerTitle}>Empregos</Text>
            <Text style={styles.headerSubtitle}>Oportunidades de carreira</Text>
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
            <View style={styles.infoCard}>
              <View style={styles.infoHeader}>
                <Ionicons name="information-circle" size={24} color="#00d4ff" />
                <Text style={styles.infoTitle}>Central de Oportunidades</Text>
              </View>
              <Text style={styles.infoText}>
                A Fatec Cotia mantém parcerias com empresas para oferecer
                oportunidades de emprego, estágio e trainee aos estudantes e
                egressos. Encontre aqui as melhores vagas do mercado.
              </Text>
            </View>

            <View style={styles.jobsSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="briefcase-outline" size={24} color="#ffffff" />
                <Text style={styles.sectionTitle}>Vagas Disponíveis</Text>
              </View>

              {vagas.map((vaga, index) => (
                <Animated.View
                  key={vaga.id}
                  style={[
                    styles.jobCard,
                    {
                      opacity: fadeAnim,
                      transform: [
                        {
                          translateY: slideAnim.interpolate({
                            inputRange: [0, 30],
                            outputRange: [0, 15 + index * 5],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <LinearGradient
                    colors={vaga.cor as [string, string]}
                    style={styles.jobGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.jobHeader}>
                      <View style={styles.jobHeaderLeft}>
                        <Text style={styles.jobCompany}>{vaga.empresa}</Text>
                        <View style={styles.jobBadge}>
                          <Text style={styles.jobBadgeText}>{vaga.tipo}</Text>
                        </View>
                      </View>
                      <View style={styles.urgentBadge}>
                        <Ionicons name="flash" size={12} color="#ffffff" />
                        <Text style={styles.urgentText}>Urgente</Text>
                      </View>
                    </View>

                    <Text style={styles.jobTitle}>{vaga.cargo}</Text>

                    <View style={styles.jobInfo}>
                      <View style={styles.jobInfoItem}>
                        <Ionicons
                          name="cash-outline"
                          size={16}
                          color="rgba(255, 255, 255, 0.9)"
                        />
                        <Text style={styles.jobInfoText}>{vaga.salario}</Text>
                      </View>
                      <View style={styles.jobInfoItem}>
                        <Ionicons
                          name="location-outline"
                          size={16}
                          color="rgba(255, 255, 255, 0.9)"
                        />
                        <Text style={styles.jobInfoText}>{vaga.local}</Text>
                      </View>
                      <View style={styles.jobInfoItem}>
                        <Ionicons
                          name="time-outline"
                          size={16}
                          color="rgba(255, 255, 255, 0.9)"
                        />
                        <Text style={styles.jobInfoText}>
                          Prazo: {vaga.prazo}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.skillsContainer}>
                      {vaga.skills.map((skill, skillIndex) => (
                        <View key={skillIndex} style={styles.skillTag}>
                          <Text style={styles.skillText}>{skill}</Text>
                        </View>
                      ))}
                    </View>

                    <TouchableOpacity style={styles.jobButton}>
                      <Text style={styles.jobButtonText}>Candidatar-se</Text>
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

            <View style={styles.resourcesSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="rocket-outline" size={24} color="#ffffff" />
                <Text style={styles.sectionTitle}>Recursos de Carreira</Text>
              </View>

              <View style={styles.resourcesGrid}>
                {recursos.map((recurso, index) => (
                  <View key={index} style={styles.resourceCard}>
                    <View style={styles.resourceIconContainer}>
                      <Ionicons
                        name={recurso.icon as any}
                        size={28}
                        color="#00d4ff"
                      />
                    </View>
                    <Text style={styles.resourceTitle}>{recurso.titulo}</Text>
                    <Text style={styles.resourceDescription}>
                      {recurso.descricao}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.statsCard}>
              <LinearGradient
                colors={["rgba(16, 185, 129, 0.9)", "rgba(59, 130, 246, 0.8)"]}
                style={styles.statsGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.statsTitle}>Taxa de Empregabilidade</Text>
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>85%</Text>
                    <Text style={styles.statLabel}>Egressos Empregados</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>200+</Text>
                    <Text style={styles.statLabel}>Empresas Parceiras</Text>
                  </View>
                </View>
              </LinearGradient>
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
  jobsSection: {
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
  jobCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  jobGradient: {
    padding: 20,
    borderRadius: 20,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  jobHeaderLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  jobCompany: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    marginRight: 8,
  },
  jobBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  jobBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#ffffff",
  },
  urgentBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 101, 101, 0.4)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  urgentText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#ffffff",
    marginLeft: 4,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 16,
    lineHeight: 26,
  },
  jobInfo: {
    marginBottom: 16,
  },
  jobInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  jobInfoText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
    marginLeft: 8,
    fontWeight: "500",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
    gap: 8,
  },
  skillTag: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  skillText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#ffffff",
  },
  jobButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  jobButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ffffff",
    marginRight: 8,
  },
  resourcesSection: {
    marginBottom: 24,
  },
  resourcesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  resourceCard: {
    width: (width - 72) / 2,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
  },
  resourceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0, 212, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
  },
  resourceDescription: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    lineHeight: 16,
  },
  statsCard: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statsGradient: {
    padding: 24,
    borderRadius: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});
