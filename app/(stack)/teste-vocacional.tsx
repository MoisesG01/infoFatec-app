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
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// Perguntas do teste vocacional
const perguntas = [
  {
    id: 1,
    pergunta: "O que mais te atrai na área de tecnologia?",
    opcoes: [
      {
        texto: "Análise de dados e descoberta de padrões",
        pontos: {
          "ciencia-de-dados": 3,
          "desenvolvimento-de-software-multiplataforma": 1,
          "design-de-produto": 0,
          "comercio-exterior": 0,
          "gestao-da-producao-industrial": 1,
          "gestao-empresarial": 0,
        },
      },
      {
        texto: "Criar aplicativos e sistemas do zero",
        pontos: {
          "ciencia-de-dados": 1,
          "desenvolvimento-de-software-multiplataforma": 3,
          "design-de-produto": 2,
          "comercio-exterior": 0,
          "gestao-da-producao-industrial": 1,
          "gestao-empresarial": 0,
        },
      },
      {
        texto: "Design e experiência do usuário",
        pontos: {
          "ciencia-de-dados": 0,
          "desenvolvimento-de-software-multiplataforma": 1,
          "design-de-produto": 3,
          "comercio-exterior": 0,
          "gestao-da-producao-industrial": 0,
          "gestao-empresarial": 0,
        },
      },
      {
        texto: "Negócios internacionais e comércio",
        pontos: {
          "ciencia-de-dados": 0,
          "desenvolvimento-de-software-multiplataforma": 0,
          "design-de-produto": 0,
          "comercio-exterior": 3,
          "gestao-da-producao-industrial": 1,
          "gestao-empresarial": 2,
        },
      },
    ],
  },
  {
    id: 2,
    pergunta: "Qual ambiente de trabalho você prefere?",
    opcoes: [
      {
        texto: "Laboratório com análise de dados e algoritmos",
        pontos: {
          "ciencia-de-dados": 3,
          "desenvolvimento-de-software-multiplataforma": 1,
          "design-de-produto": 1,
          "comercio-exterior": 0,
          "gestao-da-producao-industrial": 1,
          "gestao-empresarial": 0,
        },
      },
      {
        texto: "Escritório criativo com foco em projetos",
        pontos: {
          "ciencia-de-dados": 0,
          "desenvolvimento-de-software-multiplataforma": 2,
          "design-de-produto": 3,
          "comercio-exterior": 1,
          "gestao-da-producao-industrial": 0,
          "gestao-empresarial": 2,
        },
      },
      {
        texto: "Ambiente industrial e processos de produção",
        pontos: {
          "ciencia-de-dados": 0,
          "desenvolvimento-de-software-multiplataforma": 0,
          "design-de-produto": 1,
          "comercio-exterior": 0,
          "gestao-da-producao-industrial": 3,
          "gestao-empresarial": 1,
        },
      },
      {
        texto: "Ambiente corporativo com foco em negócios",
        pontos: {
          "ciencia-de-dados": 1,
          "desenvolvimento-de-software-multiplataforma": 0,
          "design-de-produto": 0,
          "comercio-exterior": 2,
          "gestao-da-producao-industrial": 1,
          "gestao-empresarial": 3,
        },
      },
    ],
  },
  {
    id: 3,
    pergunta: "Qual é sua relação com matemática e estatística?",
    opcoes: [
      {
        texto: "Adoro! É minha área favorita",
        pontos: {
          "ciencia-de-dados": 3,
          "desenvolvimento-de-software-multiplataforma": 1,
          "design-de-produto": 0,
          "comercio-exterior": 1,
          "gestao-da-producao-industrial": 2,
          "gestao-empresarial": 1,
        },
      },
      {
        texto: "Gosto, mas prefiro aplicações práticas",
        pontos: {
          "ciencia-de-dados": 2,
          "desenvolvimento-de-software-multiplataforma": 2,
          "design-de-produto": 1,
          "comercio-exterior": 2,
          "gestao-da-producao-industrial": 3,
          "gestao-empresarial": 2,
        },
      },
      {
        texto: "Prefiro áreas mais criativas e visuais",
        pontos: {
          "ciencia-de-dados": 0,
          "desenvolvimento-de-software-multiplataforma": 1,
          "design-de-produto": 3,
          "comercio-exterior": 1,
          "gestao-da-producao-industrial": 0,
          "gestao-empresarial": 1,
        },
      },
      {
        texto: "Gosto mais de áreas de negócios e gestão",
        pontos: {
          "ciencia-de-dados": 0,
          "desenvolvimento-de-software-multiplataforma": 0,
          "design-de-produto": 0,
          "comercio-exterior": 3,
          "gestao-da-producao-industrial": 1,
          "gestao-empresarial": 3,
        },
      },
    ],
  },
  {
    id: 4,
    pergunta: "O que você gosta de fazer no seu tempo livre?",
    opcoes: [
      {
        texto: "Resolver problemas complexos e quebra-cabeças",
        pontos: {
          "ciencia-de-dados": 3,
          "desenvolvimento-de-software-multiplataforma": 2,
          "design-de-produto": 1,
          "comercio-exterior": 0,
          "gestao-da-producao-industrial": 1,
          "gestao-empresarial": 0,
        },
      },
      {
        texto: "Criar projetos e experimentar novas tecnologias",
        pontos: {
          "ciencia-de-dados": 1,
          "desenvolvimento-de-software-multiplataforma": 3,
          "design-de-produto": 2,
          "comercio-exterior": 0,
          "gestao-da-producao-industrial": 1,
          "gestao-empresarial": 0,
        },
      },
      {
        texto: "Desenhar, criar arte e design",
        pontos: {
          "ciencia-de-dados": 0,
          "desenvolvimento-de-software-multiplataforma": 1,
          "design-de-produto": 3,
          "comercio-exterior": 0,
          "gestao-da-producao-industrial": 0,
          "gestao-empresarial": 0,
        },
      },
      {
        texto: "Ler sobre economia, negócios e mercado",
        pontos: {
          "ciencia-de-dados": 0,
          "desenvolvimento-de-software-multiplataforma": 0,
          "design-de-produto": 0,
          "comercio-exterior": 3,
          "gestao-da-producao-industrial": 1,
          "gestao-empresarial": 3,
        },
      },
    ],
  },
  {
    id: 5,
    pergunta: "Qual habilidade você considera mais importante?",
    opcoes: [
      {
        texto: "Análise crítica e pensamento lógico",
        pontos: {
          "ciencia-de-dados": 3,
          "desenvolvimento-de-software-multiplataforma": 2,
          "design-de-produto": 1,
          "comercio-exterior": 1,
          "gestao-da-producao-industrial": 2,
          "gestao-empresarial": 1,
        },
      },
      {
        texto: "Criatividade e inovação",
        pontos: {
          "ciencia-de-dados": 1,
          "desenvolvimento-de-software-multiplataforma": 2,
          "design-de-produto": 3,
          "comercio-exterior": 1,
          "gestao-da-producao-industrial": 1,
          "gestao-empresarial": 1,
        },
      },
      {
        texto: "Comunicação e negociação",
        pontos: {
          "ciencia-de-dados": 0,
          "desenvolvimento-de-software-multiplataforma": 0,
          "design-de-produto": 1,
          "comercio-exterior": 3,
          "gestao-da-producao-industrial": 1,
          "gestao-empresarial": 3,
        },
      },
      {
        texto: "Organização e planejamento",
        pontos: {
          "ciencia-de-dados": 1,
          "desenvolvimento-de-software-multiplataforma": 1,
          "design-de-produto": 1,
          "comercio-exterior": 2,
          "gestao-da-producao-industrial": 3,
          "gestao-empresarial": 3,
        },
      },
    ],
  },
  {
    id: 6,
    pergunta: "Como você prefere trabalhar?",
    opcoes: [
      {
        texto: "Sozinho, com foco e concentração",
        pontos: {
          "ciencia-de-dados": 2,
          "desenvolvimento-de-software-multiplataforma": 2,
          "design-de-produto": 2,
          "comercio-exterior": 0,
          "gestao-da-producao-industrial": 1,
          "gestao-empresarial": 0,
        },
      },
      {
        texto: "Em equipe colaborativa",
        pontos: {
          "ciencia-de-dados": 1,
          "desenvolvimento-de-software-multiplataforma": 2,
          "design-de-produto": 2,
          "comercio-exterior": 2,
          "gestao-da-producao-industrial": 2,
          "gestao-empresarial": 3,
        },
      },
      {
        texto: "Liderando projetos e pessoas",
        pontos: {
          "ciencia-de-dados": 0,
          "desenvolvimento-de-software-multiplataforma": 1,
          "design-de-produto": 1,
          "comercio-exterior": 2,
          "gestao-da-producao-industrial": 2,
          "gestao-empresarial": 3,
        },
      },
      {
        texto: "Variando entre individual e em equipe",
        pontos: {
          "ciencia-de-dados": 2,
          "desenvolvimento-de-software-multiplataforma": 2,
          "design-de-produto": 2,
          "comercio-exterior": 3,
          "gestao-da-producao-industrial": 3,
          "gestao-empresarial": 2,
        },
      },
    ],
  },
];

// Mapeamento de slugs para informações dos cursos
const cursosInfo = {
  "ciencia-de-dados": {
    nome: "Ciência de Dados",
    slug: "ciencia-de-dados",
    cor: ["rgba(59, 130, 246, 0.9)", "rgba(147, 51, 234, 0.8)"],
    icon: "analytics-outline",
    descricao:
      "Ideal para quem ama análise de dados, estatística e descobrir padrões em grandes volumes de informação.",
  },
  "desenvolvimento-de-software-multiplataforma": {
    nome: "Desenvolvimento de Software Multiplataforma",
    slug: "desenvolvimento-de-software-multiplataforma",
    cor: ["rgba(16, 185, 129, 0.9)", "rgba(59, 130, 246, 0.8)"],
    icon: "code-slash-outline",
    descricao:
      "Perfeito para quem quer criar aplicativos e sistemas, trabalhando com programação e tecnologia.",
  },
  "design-de-produto": {
    nome: "Design de Produto",
    slug: "design-de-produto",
    cor: ["rgba(245, 101, 101, 0.9)", "rgba(240, 147, 251, 0.8)"],
    icon: "color-palette-outline",
    descricao:
      "Ideal para pessoas criativas que gostam de design, UX/UI e criar experiências visuais incríveis.",
  },
  "comercio-exterior": {
    nome: "Comércio Exterior",
    slug: "comercio-exterior",
    cor: ["rgba(251, 191, 36, 0.9)", "rgba(245, 101, 101, 0.8)"],
    icon: "globe-outline",
    descricao:
      "Perfeito para quem se interessa por negócios internacionais, economia e relações comerciais globais.",
  },
  "gestao-da-producao-industrial": {
    nome: "Gestão da Produção Industrial",
    slug: "gestao-da-producao-industrial",
    cor: ["rgba(139, 92, 246, 0.9)", "rgba(59, 130, 246, 0.8)"],
    icon: "construct-outline",
    descricao:
      "Ideal para quem gosta de processos industriais, otimização e gestão de produção.",
  },
  "gestao-empresarial": {
    nome: "Gestão Empresarial",
    slug: "gestao-empresarial",
    cor: ["rgba(34, 197, 94, 0.9)", "rgba(16, 185, 129, 0.8)"],
    icon: "business-outline",
    descricao:
      "Perfeito para quem quer liderar, administrar negócios e trabalhar com gestão estratégica.",
  },
};

export default function TesteVocacional() {
  const router = useRouter();
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacoes, setPontuacoes] = useState<Record<string, number>>({
    "ciencia-de-dados": 0,
    "desenvolvimento-de-software-multiplataforma": 0,
    "design-de-produto": 0,
    "comercio-exterior": 0,
    "gestao-da-producao-industrial": 0,
    "gestao-empresarial": 0,
  });
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [cursoRecomendado, setCursoRecomendado] = useState<string | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

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
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    // Animação de progresso
    const progress = (perguntaAtual + 1) / perguntas.length;
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [perguntaAtual]);

  const handleResposta = (opcao: (typeof perguntas)[0]["opcoes"][0]) => {
    // Adicionar pontos
    const novasPontuacoes = { ...pontuacoes };
    Object.keys(opcao.pontos).forEach((curso) => {
      novasPontuacoes[curso] +=
        opcao.pontos[curso as keyof typeof opcao.pontos];
    });
    setPontuacoes(novasPontuacoes);

    // Avançar para próxima pergunta ou mostrar resultado
    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
    } else {
      // Calcular curso recomendado
      const cursoComMaisPontos = Object.keys(novasPontuacoes).reduce((a, b) =>
        novasPontuacoes[a] > novasPontuacoes[b] ? a : b
      );
      setCursoRecomendado(cursoComMaisPontos);
      setMostrarResultado(true);
    }
  };

  const handleReiniciar = () => {
    setPerguntaAtual(0);
    setPontuacoes({
      "ciencia-de-dados": 0,
      "desenvolvimento-de-software-multiplataforma": 0,
      "design-de-produto": 0,
      "comercio-exterior": 0,
      "gestao-da-producao-industrial": 0,
      "gestao-empresarial": 0,
    });
    setMostrarResultado(false);
    setCursoRecomendado(null);
  };

  const handleVerDetalhes = () => {
    if (cursoRecomendado) {
      router.push(
        `/educacao/cursos/${
          cursosInfo[cursoRecomendado as keyof typeof cursosInfo].slug
        }`
      );
    }
  };

  if (mostrarResultado && cursoRecomendado) {
    const curso = cursosInfo[cursoRecomendado as keyof typeof cursosInfo];
    return (
      <LinearGradient
        colors={["#0f172a", "#1e293b", "#334155"]}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
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
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleReiniciar}
            >
              <Ionicons name="chevron-back" size={24} color="#e2e8f0" />
              <Text style={styles.backText}>Fazer novamente</Text>
            </TouchableOpacity>

            <LinearGradient
              colors={curso.cor as [string, string]}
              style={styles.resultCard}
            >
              <View style={styles.resultIconContainer}>
                <Ionicons name={curso.icon as any} size={64} color="#0f172a" />
              </View>
              <Text style={styles.resultTitle}>Seu curso ideal é:</Text>
              <Text style={styles.resultCourseName}>{curso.nome}</Text>
              <Text style={styles.resultDescription}>{curso.descricao}</Text>
            </LinearGradient>

            <View style={styles.pontuacoesCard}>
              <Text style={styles.pontuacoesTitle}>Sua pontuação:</Text>
              {Object.entries(pontuacoes)
                .sort(([, a], [, b]) => b - a)
                .map(([cursoSlug, pontos]) => {
                  const cursoInfo =
                    cursosInfo[cursoSlug as keyof typeof cursosInfo];
                  const isRecomendado = cursoSlug === cursoRecomendado;
                  return (
                    <View
                      key={cursoSlug}
                      style={[
                        styles.pontuacaoItem,
                        isRecomendado && styles.pontuacaoItemRecomendado,
                      ]}
                    >
                      <View style={styles.pontuacaoHeader}>
                        <Ionicons
                          name={cursoInfo.icon as any}
                          size={20}
                          color={
                            isRecomendado
                              ? "#00d4ff"
                              : "rgba(255, 255, 255, 0.6)"
                          }
                        />
                        <Text
                          style={[
                            styles.pontuacaoNome,
                            isRecomendado && styles.pontuacaoNomeRecomendado,
                          ]}
                        >
                          {cursoInfo.nome}
                        </Text>
                        <Text
                          style={[
                            styles.pontuacaoValor,
                            isRecomendado && styles.pontuacaoValorRecomendado,
                          ]}
                        >
                          {pontos} pts
                        </Text>
                      </View>
                      <View style={styles.pontuacaoBar}>
                        <View
                          style={[
                            styles.pontuacaoBarFill,
                            {
                              width: `${
                                (pontos /
                                  Math.max(...Object.values(pontuacoes))) *
                                100
                              }%`,
                              backgroundColor: isRecomendado
                                ? "#00d4ff"
                                : "rgba(255, 255, 255, 0.3)",
                            },
                          ]}
                        />
                      </View>
                    </View>
                  );
                })}
            </View>

            <TouchableOpacity
              style={styles.detalhesButton}
              onPress={handleVerDetalhes}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#00d4ff", "#00aaff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.detalhesButtonGradient}
              >
                <Text style={styles.detalhesButtonText}>
                  Ver Detalhes do Curso
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#0f172a" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.reiniciarButton}
              onPress={handleReiniciar}
              activeOpacity={0.8}
            >
              <Text style={styles.reiniciarButtonText}>
                Fazer teste novamente
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    );
  }

  const pergunta = perguntas[perguntaAtual];

  return (
    <LinearGradient
      colors={["#0f172a", "#1e293b", "#334155"]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#e2e8f0" />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <LinearGradient
              colors={["rgba(59,130,246,0.9)", "rgba(147,51,234,0.8)"]}
              style={styles.headerCard}
            >
              <View style={styles.headerIconContainer}>
                <Ionicons name="school-outline" size={32} color="#0f172a" />
              </View>
              <Text style={styles.headerTitle}>Teste Vocacional</Text>
              <Text style={styles.headerSubtitle}>
                Descubra qual curso da Fatec Cotia combina mais com você!
              </Text>
            </LinearGradient>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressBarFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              Pergunta {perguntaAtual + 1} de {perguntas.length}
            </Text>
          </View>

          <View style={styles.perguntaContainer}>
            <Text style={styles.perguntaNumero}>
              {String(perguntaAtual + 1).padStart(2, "0")}
            </Text>
            <Text style={styles.perguntaTexto}>{pergunta.pergunta}</Text>
          </View>

          <View style={styles.opcoesContainer}>
            {pergunta.opcoes.map((opcao, index) => (
              <TouchableOpacity
                key={index}
                style={styles.opcaoCard}
                onPress={() => handleResposta(opcao)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.1)",
                    "rgba(255, 255, 255, 0.05)",
                  ]}
                  style={styles.opcaoGradient}
                >
                  <View style={styles.opcaoContent}>
                    <View style={styles.opcaoIcon}>
                      <Ionicons
                        name="ellipse-outline"
                        size={24}
                        color="rgba(255, 255, 255, 0.6)"
                      />
                    </View>
                    <Text style={styles.opcaoTexto}>{opcao.texto}</Text>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="rgba(255, 255, 255, 0.4)"
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 24,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  backText: {
    color: "#e2e8f0",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  header: {
    marginBottom: 32,
  },
  headerCard: {
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  headerIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(15, 23, 42, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: 8,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(15, 23, 42, 0.8)",
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 22,
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#00d4ff",
    borderRadius: 4,
  },
  progressText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  perguntaContainer: {
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  perguntaNumero: {
    fontSize: 48,
    fontWeight: "900",
    color: "rgba(0, 212, 255, 0.3)",
    marginRight: 16,
    lineHeight: 56,
  },
  perguntaTexto: {
    flex: 1,
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    lineHeight: 32,
  },
  opcoesContainer: {
    gap: 16,
  },
  opcaoCard: {
    marginBottom: 12,
  },
  opcaoGradient: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  opcaoContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  opcaoIcon: {
    marginRight: 16,
  },
  opcaoTexto: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    lineHeight: 24,
  },
  resultCard: {
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  resultIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(15, 23, 42, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(15, 23, 42, 0.8)",
    marginBottom: 12,
    textAlign: "center",
  },
  resultCourseName: {
    fontSize: 32,
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: 16,
    textAlign: "center",
  },
  resultDescription: {
    fontSize: 16,
    color: "rgba(15, 23, 42, 0.8)",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "600",
  },
  pontuacoesCard: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  pontuacoesTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  pontuacaoItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  pontuacaoItemRecomendado: {
    borderBottomColor: "rgba(0, 212, 255, 0.3)",
  },
  pontuacaoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  pontuacaoNome: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    marginLeft: 12,
  },
  pontuacaoNomeRecomendado: {
    color: "#00d4ff",
  },
  pontuacaoValor: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.6)",
  },
  pontuacaoValorRecomendado: {
    color: "#00d4ff",
  },
  pontuacaoBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  pontuacaoBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  detalhesButton: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  detalhesButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  detalhesButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginRight: 12,
  },
  reiniciarButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  reiniciarButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
  },
});

