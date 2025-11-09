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
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Educacao() {
  const router = useRouter();
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

  const cursos = [
    {
      id: 1,
      nome: "Ciência de Dados",
      periodo: "Noturno",
      duracao: "3 anos",
      vagas: "40",
      cor: ["rgba(59, 130, 246, 0.9)", "rgba(147, 51, 234, 0.8)"],
      slug: "ciencia-de-dados",
    },
    {
      id: 2,
      nome: "Comércio Exterior",
      periodo: "Vespertino",
      duracao: "3 anos",
      vagas: "40",
      cor: ["rgba(16, 185, 129, 0.9)", "rgba(59, 130, 246, 0.8)"],
      slug: "comercio-exterior",
    },
    {
      id: 3,
      nome: "Desenvolvimento de Software Multiplataforma",
      periodo: "Noturno",
      duracao: "3 anos",
      vagas: "40",
      cor: ["rgba(245, 101, 101, 0.9)", "rgba(251, 146, 60, 0.8)"],
      slug: "desenvolvimento-de-software-multiplataforma",
    },
    {
      id: 4,
      nome: "Design de Produto",
      periodo: "Matutino",
      duracao: "3 anos",
      vagas: "40",
      cor: ["rgba(147, 51, 234, 0.9)", "rgba(219, 39, 119, 0.8)"],
      slug: "design-de-produto",
    },
    {
      id: 5,
      nome: "Gestão da Produção Industrial",
      periodo: "Noturno",
      duracao: "3 anos",
      vagas: "40",
      cor: ["rgba(251, 146, 60, 0.9)", "rgba(245, 101, 101, 0.8)"],
      slug: "gestao-da-producao-industrial",
    },
    {
      id: 6,
      nome: "Gestão Empresarial",
      periodo: "Vespertino",
      duracao: "3 anos",
      vagas: "40",
      cor: ["rgba(34, 197, 94, 0.9)", "rgba(16, 185, 129, 0.8)"],
      slug: "gestao-empresarial",
    },
  ];

  const recursos = [
    {
      icon: "library-outline",
      titulo: "Biblioteca Digital",
      descricao: "Acesso a milhares de livros e artigos científicos",
    },
    {
      icon: "laptop-outline",
      titulo: "Laboratórios",
      descricao: "Infraestrutura moderna para prática tecnológica",
    },
    {
      icon: "people-outline",
      titulo: "Corpo Docente",
      descricao: "Professores qualificados e experientes",
    },
    {
      icon: "school-outline",
      titulo: "Programas de Extensão",
      descricao: "Projetos e atividades práticas além da sala de aula",
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0f172a", "#1e293b", "#334155"]}
        style={styles.gradient}
      >
        <LinearGradient
          colors={["rgba(59, 130, 246, 0.9)", "rgba(147, 51, 234, 0.8)"]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerIcon}>📚</Text>
            <Text style={styles.headerTitle}>Educação</Text>
            <Text style={styles.headerSubtitle}>
              Cursos e recursos acadêmicos
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
            <View style={styles.infoCard}>
              <View style={styles.infoHeader}>
                <Ionicons name="information-circle" size={24} color="#00d4ff" />
                <Text style={styles.infoTitle}>Sobre a Fatec Cotia</Text>
              </View>
              <Text style={styles.infoText}>
                A Fatec Cotia oferece cursos superiores de tecnologia com foco
                em formação profissional de qualidade, preparando estudantes
                para o mercado de trabalho com competências técnicas e práticas.
              </Text>
            </View>

            <View style={styles.coursesSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="book-outline" size={24} color="#ffffff" />
                <Text style={styles.sectionTitle}>Nossos Cursos</Text>
              </View>

              {cursos.map((curso, index) => (
                <Animated.View
                  key={curso.id}
                  style={[
                    styles.courseCard,
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
                    colors={curso.cor as [string, string]}
                    style={styles.courseGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.courseName}>{curso.nome}</Text>
                    <View style={styles.courseDetails}>
                      <View style={styles.courseDetailItem}>
                        <Ionicons
                          name="time-outline"
                          size={14}
                          color="rgba(255, 255, 255, 0.9)"
                        />
                        <Text style={styles.courseDetailText}>
                          {curso.periodo}
                        </Text>
                      </View>
                      <View style={styles.courseDetailItem}>
                        <Ionicons
                          name="calendar-outline"
                          size={14}
                          color="rgba(255, 255, 255, 0.9)"
                        />
                        <Text style={styles.courseDetailText}>
                          {curso.duracao}
                        </Text>
                      </View>
                      <View style={styles.courseDetailItem}>
                        <Ionicons
                          name="person-outline"
                          size={14}
                          color="rgba(255, 255, 255, 0.9)"
                        />
                        <Text style={styles.courseDetailText}>
                          {curso.vagas} vagas
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.courseButton}
                      onPress={() =>
                        router.push(`/educacao/cursos/${curso.slug}`)
                      }
                    >
                      <Text style={styles.courseButtonText}>Ver Detalhes</Text>
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
                <Ionicons name="cube-outline" size={24} color="#ffffff" />
                <Text style={styles.sectionTitle}>Recursos Disponíveis</Text>
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

            <View style={styles.enrollmentCard}>
              <LinearGradient
                colors={["rgba(16, 185, 129, 0.9)", "rgba(59, 130, 246, 0.8)"]}
                style={styles.enrollmentGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.enrollmentHeader}>
                  <Ionicons name="school" size={32} color="#ffffff" />
                  <Text style={styles.enrollmentTitle}>Processo Seletivo</Text>
                </View>
                <Text style={styles.enrollmentText}>
                  As inscrições para o vestibular da Fatec são realizadas
                  semestralmente através do processo seletivo unificado.
                </Text>
                <TouchableOpacity style={styles.enrollmentButton}>
                  <Text style={styles.enrollmentButtonText}>
                    Saiba Mais Sobre o Vestibular
                  </Text>
                  <Ionicons
                    name="arrow-forward-circle"
                    size={20}
                    color="#ffffff"
                  />
                </TouchableOpacity>
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
  coursesSection: {
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
  courseCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  courseGradient: {
    padding: 20,
    borderRadius: 20,
  },
  courseName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
    lineHeight: 24,
  },
  courseDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
    gap: 12,
  },
  courseDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  courseDetailText: {
    fontSize: 12,
    color: "#ffffff",
    marginLeft: 6,
    fontWeight: "600",
  },
  courseButton: {
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
  courseButtonText: {
    fontSize: 14,
    fontWeight: "600",
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
  enrollmentCard: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  enrollmentGradient: {
    padding: 24,
    borderRadius: 20,
  },
  enrollmentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  enrollmentTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginLeft: 12,
  },
  enrollmentText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 22,
    marginBottom: 20,
  },
  enrollmentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  enrollmentButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
    marginRight: 8,
  },
});
