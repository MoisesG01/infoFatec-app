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
  "Formação para planejar, controlar e otimizar processos produtivos em indústrias e serviços.",
  "Ênfase em Lean Manufacturing, qualidade, manutenção, gestão de estoques e sustentabilidade.",
  "Projetos integradores com empresas do polo industrial de Cotia, Barueri e região oeste metropolitana.",
];

const curriculum = [
  "Gestão da Produção, Planejamento e Controle da Produção (PCP)",
  "Logística, Cadeia de Suprimentos e Gestão de Estoques",
  "Qualidade, Metrologia, Segurança do Trabalho e Normas ISO",
  "Custos Industriais, Indicadores de Desempenho e Projetos de Melhoria Contínua",
];

const labs = [
  "Laboratórios de metrologia, processos industriais e manufatura enxuta.",
  "Projetos de melhoria em parceria com empresas do Centro Paula Souza e Arranjos Produtivos Locais.",
  "Visitas técnicas e semanas acadêmicas sobre inovação e Indústria 4.0.",
];

const careers = [
  "Gestor(a) da Produção Industrial",
  "Analista de PCP ou Logística",
  "Coordenador(a) de Qualidade e Melhoria Contínua",
  "Supervisor(a) de Operações e Manutenção",
];

const sources = [
  {
    title: "Centro Paula Souza – Gestão da Produção Industrial",
    url: "https://www.cps.sp.gov.br/cursos/gestao-da-producao-industrial/",
  },
  {
    title: "Fatec Cotia – Portal institucional",
    url: "https://www.fateccotia.edu.br/",
  },
];

export default function GestaoDaProducaoIndustrial() {
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
    <LinearGradient colors={["#0f172a", "#1f2937", "#1e3a8a"]} style={styles.container}>
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
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#e2e8f0" />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <LinearGradient
            colors={["rgba(251,146,60,0.85)", "rgba(245,101,101,0.85)"]}
            style={styles.heroCard}
          >
            <View style={styles.heroBadge}>
              <Ionicons name="construct-outline" size={24} color="#0f172a" />
            </View>
            <Text style={styles.heroTitle}>Tecnologia em Gestão da Produção Industrial</Text>
            <Text style={styles.heroSubtitle}>
              Curso superior de tecnologia – 6 semestres • 40 vagas • Período noturno
            </Text>
            <View style={styles.heroChips}>
              <View style={styles.chip}>
                <Ionicons name="time-outline" size={16} color="#0f172a" />
                <Text style={styles.chipText}>Duração: 3 anos</Text>
              </View>
              <View style={styles.chip}>
                <Ionicons name="speedometer-outline" size={16} color="#0f172a" />
                <Text style={styles.chipText}>Lean &amp; Kaizen</Text>
              </View>
            </View>
          </LinearGradient>

          <Section title="Destaques do Curso" icon="sparkles-outline">
            {highlights.map((item) => (
              <Bullet key={item} text={item} />
            ))}
          </Section>

          <Section title="Matriz Curricular – Principais Eixos" icon="layers-outline">
            {curriculum.map((item) => (
              <Bullet key={item} text={item} />
            ))}
          </Section>

          <Section title="Laboratórios e Projetos" icon="prism-outline">
            {labs.map((item) => (
              <Bullet key={item} text={item} />
            ))}
          </Section>

          <Section title="Perspectivas de Carreira" icon="briefcase-outline">
            {careers.map((item) => (
              <Bullet key={item} text={item} />
            ))}
          </Section>

          <TouchableOpacity style={styles.ctaButton} onPress={handleVestibular}>
            <LinearGradient
              colors={["#fb923c", "#ef4444"]}
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
                <Ionicons name="link-outline" size={18} color="#fb923c" />
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
        <Ionicons name={icon} size={20} color="#fb923c" />
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
    backgroundColor: "#fff7ed",
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
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
    backgroundColor: "#fb923c",
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
    shadowColor: "#fb923c",
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
    color: "#fb923c",
    fontSize: 14,
    flex: 1,
  },
});

