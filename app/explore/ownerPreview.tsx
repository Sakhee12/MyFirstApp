import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BottomNav from "../../components/BottomNav";
import { useAppMode } from "../../context/AppModeContext";

export default function OwnerPreview() {
  const { mode } = useAppMode();

  const bg: string[] =
    mode === "owner"
      ? ["#020617", "#020617", "#1E293B"]
      : ["#020617", "#0F172A"];

  return (
    <LinearGradient colors={bg} style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>Owner Dashboard</Text>

        {/* Security Control Center */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Security Control Center</Text>
          <Text style={styles.textMuted}>Live GPS: Active</Text>
          <Text style={styles.textDanger}>Remote Kill Switch Available</Text>
        </View>

        {/* Earnings */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Earnings Preview</Text>

          <View style={styles.barRow}>
            {[40, 80, 55, 90, 65].map((h, i) => (
              <View key={i} style={[styles.bar, { height: h }]} />
            ))}
          </View>
        </View>

        {/* Fleet Status */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fleet Status</Text>
          <Text style={styles.textSuccess}>✔ BMW X7 – Rented</Text>
          <Text style={styles.textWarning}>⚠ Audi A8 – Idle</Text>
          <Text style={styles.textDanger}>✖ Maybach – Maintenance</Text>
        </View>
      </ScrollView>

      <BottomNav />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 16,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.12)", // glassmorphism
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  textMuted: {
    color: "#CBD5E1",
    marginTop: 8,
  },
  textDanger: {
    color: "#F87171",
    marginTop: 8,
  },
  textSuccess: {
    color: "#4ADE80",
    marginTop: 8,
  },
  textWarning: {
    color: "#FACC15",
    marginTop: 8,
  },
  barRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    alignItems: "flex-end",
  },
  bar: {
    width: 24,
    borderRadius: 8,
    backgroundColor: "#FACC15",
  },
});
