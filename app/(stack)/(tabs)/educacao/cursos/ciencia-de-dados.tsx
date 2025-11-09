import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";

const highlights = [
  "Formação voltada à coleta, preparação, modelagem e interpretação de grandes volumes de dados.",
  "Ênfase em estatística aplicada, aprendizado de máquina, visualização e storytelling com dados.",
  "Integração com projetos desenvolvidos em parceria com empresas e órgãos públicos da região.",
];

const curriculum = [
  "Matemática para Ciência de Dados, Probabilidade e Estatística",
  "Programação para Análise de Dados, Banco de Dados e Big Data",
  "Aprendizado de Máquina, Inteligência Artificial e Mineração de Dados",
  "Visualização, Storytelling e Ética no Uso da Informação",
];

const labs = [
  "Laboratórios de informática com softwares estatísticos e ambientes de nuvem educacionais.",
  "Projetos integradores semestrais com foco em problemas reais da indústria e do setor público.",
  "Eventos e hackathons promovidos pelo Centro Paula Souza e parceiros do ecossistema de dados.",
];

const careers = [
  "Cientista ou Analista de Dados",
  "Engenheiro de Dados",
  "Business Intelligence Analyst",
  "Consultor em Analytics e Transformação Digital",
];

const sources = [
  {
    title: "Centro Paula Souza – Curso de Ciência de Dados",
    url: "https://www.cps.sp.gov.br/cursos/ciencia-de-dados/",
  },
  {
    title: "Fatec Cotia – Informativo do Curso de Ciência de Dados",
    url: "https://www.fateccotia.edu.br/",
  },
];

export default function CienciaDeDados() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(32)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 90,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleVestibular = () => {
    Linking.openURL("https://www.vestibularfatec.com.br/home/");
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
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#e2e8f0" />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <LinearGradient
            colors={["rgba(59,130,246,0.9)", "rgba(147,51,234,0.8)"]}
            style={styles.heroCard}
          >
            <View style={styles.heroBadge}>
              <Ionicons name="flask-outline" size={24} color="#0f172a" />
            </View>
            <Text style={styles.heroTitle}>Ciência de Dados</Text>
            <Text style={styles.heroSubtitle}>
              Curso superior de tecnologia – 6 semestres • 40 vagas • Período
              noturno
            </Text>
            <View style={styles.heroChips}>
              <View style={styles.chip}>
                <Ionicons name="time-outline" size={16} color="#0f172a" />
                <Text style={styles.chipText}>Duração: 3 anos</Text>
              </View>
              <View style={styles.chip}>
                <Ionicons name="location-outline" size={16} color="#0f172a" />
                <Text style={styles.chipText}>Campus Fatec Cotia</Text>
              </View>
            </View>
          </LinearGradient>

          <Section title="Destaques do Curso" icon="sparkles-outline">
            {highlights.map((item, index) => (
              <Bullet key={index} text={item} />
            ))}
          </Section>

          <Section
            title="Matriz Curricular – Principais Eixos"
            icon="layers-outline"
          >
            {curriculum.map((item, index) => (
              <Bullet key={index} text={item} />
            ))}
          </Section>

          <Section title="Projetos e Laboratórios" icon="beaker-outline">
            {labs.map((item, index) => (
              <Bullet key={index} text={item} />
            ))}
          </Section>

          <Section title="Perspectivas de Carreira" icon="trending-up-outline">
            {careers.map((item, index) => (
              <Bullet key={index} text={item} />
            ))}
          </Section>

          <TouchableOpacity style={styles.ctaButton} onPress={handleVestibular}>
            <LinearGradient
              colors={["#38bdf8", "#6366f1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaGradient}
            >
              <Ionicons name="open-outline" size={20} color="#ffffff" />
              <Text style={styles.ctaText}>Saiba mais e inscreva-se</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.sourceCard}>
            <Text style={styles.sourceTitle}>Fontes oficiais</Text>
            {sources.map((source) => (
              <TouchableOpacity
                key={source.url}
                style={styles.sourceItem}
                onPress={() => Linking.openURL(source.url)}
              >
                <Ionicons name="link-outline" size={18} color="#38bdf8" />
                <Text style={styles.sourceText}>{source.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

type SectionProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  children: React.ReactNode;
};

function Section({ title, icon, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon} size={20} color="#38bdf8" />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <View style={styles.bullet}>
      <View style={styles.bulletDot} />
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  animatedContent: {
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 6,
  },
  backText: {
    color: "#e2e8f0",
    fontSize: 15,
    fontWeight: "600",
  },
  heroCard: {
    borderRadius: 28,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 22,
    elevation: 12,
  },
  heroBadge: {
    backgroundColor: "#e0f2fe",
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#f8fafc",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 15,
    color: "rgba(248, 250, 252, 0.85)",
    lineHeight: 22,
    marginBottom: 16,
  },
  heroChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(15, 23, 42, 0.12)",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0f172a",
  },
  section: {
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.18)",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#e2e8f0",
  },
  sectionContent: {
    gap: 12,
  },
  bullet: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#38bdf8",
    marginTop: 6,
  },
  bulletText: {
    flex: 1,
    color: "rgba(226, 232, 240, 0.9)",
    fontSize: 15,
    lineHeight: 22,
  },
  ctaButton: {
    borderRadius: 18,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 24,
    shadowColor: "#38bdf8",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 10,
  },
  ctaGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 10,
  },
  ctaText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  sourceCard: {
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.18)",
    gap: 12,
  },
  sourceTitle: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  sourceItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sourceText: {
    color: "#38bdf8",
    fontSize: 14,
    flex: 1,
  },
});
