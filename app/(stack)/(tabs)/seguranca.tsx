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

export default function Seguranca() {
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

  const protocolos = [
    {
      id: 1,
      titulo: "Segurança no Campus",
      descricao: "Protocolos de segurança física e acesso ao campus",
      icon: "shield-checkmark-outline",
      cor: ["rgba(16, 185, 129, 0.9)", "rgba(59, 130, 246, 0.8)"],
      itens: [
        "Controle de acesso com identificação",
        "Vigilância 24 horas",
        "Câmeras de segurança",
      ],
    },
    {
      id: 2,
      titulo: "Segurança Digital",
      descricao: "Proteção de dados e informações pessoais",
      icon: "lock-closed-outline",
      cor: ["rgba(59, 130, 246, 0.9)", "rgba(147, 51, 234, 0.8)"],
      itens: [
        "Senhas seguras obrigatórias",
        "Antivírus atualizado",
        "Backup regular de dados",
      ],
    },
    {
      id: 3,
      titulo: "Emergências",
      descricao: "Procedimentos em caso de emergência",
      icon: "warning-outline",
      cor: ["rgba(245, 101, 101, 0.9)", "rgba(251, 146, 60, 0.8)"],
      itens: [
        "Números de emergência: 190, 192",
        "Pontos de encontro definidos",
        "Brigada de incêndio treinada",
      ],
    },
    {
      id: 4,
      titulo: "Prevenção",
      descricao: "Medidas preventivas de segurança",
      icon: "eye-outline",
      cor: ["rgba(147, 51, 234, 0.9)", "rgba(219, 39, 119, 0.8)"],
      itens: [
        "Reporte atividades suspeitas",
        "Não deixe objetos de valor à vista",
        "Circule em grupo quando possível",
      ],
    },
  ];

  const contatos = [
    {
      icon: "call-outline",
      titulo: "Segurança",
      numero: "(11) 4612-0000",
      horario: "24 horas",
    },
    {
      icon: "medical-outline",
      titulo: "Emergência Médica",
      numero: "192",
      horario: "24 horas",
    },
    {
      icon: "shield-outline",
      titulo: "Polícia",
      numero: "190",
      horario: "24 horas",
    },
    {
      icon: "flame-outline",
      titulo: "Bombeiros",
      numero: "193",
      horario: "24 horas",
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0f172a", "#1e293b", "#334155"]}
        style={styles.gradient}
      >
        <LinearGradient
          colors={["rgba(16, 185, 129, 0.9)", "rgba(59, 130, 246, 0.8)"]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerIcon}>🛡️</Text>
            <Text style={styles.headerTitle}>Segurança</Text>
            <Text style={styles.headerSubtitle}>
              Protocolos e informações de segurança
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
                <Text style={styles.infoTitle}>Segurança na Fatec Cotia</Text>
              </View>
              <Text style={styles.infoText}>
                A segurança da comunidade acadêmica é prioridade. Conheça os
                protocolos, procedimentos e contatos de emergência para garantir
                um ambiente seguro para todos.
              </Text>
            </View>

            <View style={styles.protocolsSection}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color="#ffffff"
                />
                <Text style={styles.sectionTitle}>Protocolos</Text>
              </View>

              {protocolos.map((protocolo, index) => (
                <Animated.View
                  key={protocolo.id}
                  style={[
                    styles.protocolCard,
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
                    colors={protocolo.cor as [string, string]}
                    style={styles.protocolGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.protocolHeader}>
                      <View style={styles.protocolIconContainer}>
                        <Ionicons
                          name={protocolo.icon as any}
                          size={28}
                          color="#ffffff"
                        />
                      </View>
                      <View style={styles.protocolTitleContainer}>
                        <Text style={styles.protocolTitle}>
                          {protocolo.titulo}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.protocolDescription}>
                      {protocolo.descricao}
                    </Text>
                    <View style={styles.protocolItems}>
                      {protocolo.itens.map((item, itemIndex) => (
                        <View key={itemIndex} style={styles.protocolItem}>
                          <Ionicons
                            name="checkmark-circle"
                            size={16}
                            color="rgba(255, 255, 255, 0.9)"
                          />
                          <Text style={styles.protocolItemText}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  </LinearGradient>
                </Animated.View>
              ))}
            </View>

            <View style={styles.contactsSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="call-outline" size={24} color="#ffffff" />
                <Text style={styles.sectionTitle}>Contatos de Emergência</Text>
              </View>

              <View style={styles.contactsGrid}>
                {contatos.map((contato, index) => (
                  <TouchableOpacity key={index} style={styles.contactCard}>
                    <View style={styles.contactIconContainer}>
                      <Ionicons
                        name={contato.icon as any}
                        size={24}
                        color="#00d4ff"
                      />
                    </View>
                    <Text style={styles.contactTitle}>{contato.titulo}</Text>
                    <Text style={styles.contactNumber}>{contato.numero}</Text>
                    <Text style={styles.contactHorario}>{contato.horario}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.tipsCard}>
              <LinearGradient
                colors={["rgba(245, 101, 101, 0.9)", "rgba(251, 146, 60, 0.8)"]}
                style={styles.tipsGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.tipsHeader}>
                  <Ionicons name="bulb-outline" size={28} color="#ffffff" />
                  <Text style={styles.tipsTitle}>Dicas Importantes</Text>
                </View>
                <View style={styles.tipsList}>
                  <View style={styles.tipItem}>
                    <Text style={styles.tipBullet}>•</Text>
                    <Text style={styles.tipText}>
                      Mantenha sempre sua identificação visível
                    </Text>
                  </View>
                  <View style={styles.tipItem}>
                    <Text style={styles.tipBullet}>•</Text>
                    <Text style={styles.tipText}>
                      Reporte qualquer atividade suspeita à segurança
                    </Text>
                  </View>
                  <View style={styles.tipItem}>
                    <Text style={styles.tipBullet}>•</Text>
                    <Text style={styles.tipText}>
                      Conheça os pontos de encontro em caso de evacuação
                    </Text>
                  </View>
                  <View style={styles.tipItem}>
                    <Text style={styles.tipBullet}>•</Text>
                    <Text style={styles.tipText}>
                      Mantenha os números de emergência salvos no celular
                    </Text>
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
  protocolsSection: {
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
  protocolCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  protocolGradient: {
    padding: 20,
    borderRadius: 20,
  },
  protocolHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  protocolIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  protocolTitleContainer: {
    flex: 1,
  },
  protocolTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  protocolDescription: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: 20,
    marginBottom: 16,
  },
  protocolItems: {
    gap: 10,
  },
  protocolItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  protocolItemText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  contactsSection: {
    marginBottom: 24,
  },
  contactsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  contactCard: {
    width: (width - 72) / 2,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
  },
  contactIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 212, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 6,
    textAlign: "center",
  },
  contactNumber: {
    fontSize: 16,
    fontWeight: "800",
    color: "#00d4ff",
    marginBottom: 4,
    textAlign: "center",
  },
  contactHorario: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
  },
  tipsCard: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tipsGradient: {
    padding: 24,
    borderRadius: 20,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginLeft: 12,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tipBullet: {
    fontSize: 18,
    color: "#ffffff",
    marginRight: 12,
    fontWeight: "700",
  },
  tipText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    flex: 1,
    lineHeight: 22,
  },
});
