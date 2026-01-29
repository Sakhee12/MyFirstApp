import { LinearGradient } from "expo-linear-gradient";
import { BarChart3, Car, Shield } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppMode } from "../../context/AppModeContext";

export default function OwnerPreview() {
  const { mode } = useAppMode();

  const ownerBg = ["#020617", "#0B132B"];

  return (
    <LinearGradient colors={ownerBg} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* HEADER */}
        <Text style={styles.title}>Welcome to CarHub Owners</Text>
        <Text style={styles.subtitle}>
          Manage your fleet & earnings
        </Text>

          {/* HOW IT WORKS */}
<View style={styles.card}>
  <Text style={styles.cardTitle}>How Renting Works</Text>

  {[
    "1. Add your car to the fleet",
    "2. Set availability & price",
    "3. Receive booking requests",
    "4. Accept or reject rentals",
    "5. Track car in real-time",
    "6. Complete rental & get paid",
  ].map((step, i) => (
    <Text key={i} style={styles.stepText}>
      {step}
    </Text>
  ))}
</View>

{/* OWNER FEATURES */}
<View style={styles.card}>
  <Text style={styles.cardTitle}>Owner Features</Text>

  {[
    "Live GPS Tracking",
    "Remote Kill Switch",
    "Earnings Dashboard",
    "Fleet Management",
    "Booking Management",
    "Maintenance Mode",
    "Security Alerts",
    "Performance Analytics",
  ].map((feature, i) => (
    <Text key={i} style={styles.featureText}>
      • {feature}
    </Text>
  ))}
</View>


        {/* SECURITY CONTROL CENTER */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Shield color="#D4AF37" size={20} />
            <Text style={styles.cardTitle}>
              Security Control Center
            </Text>
          </View>

          <Text style={styles.textMuted}>
            • Live GPS: Active
          </Text>
          <Text style={styles.textDanger}>
            • Remote Kill Switch Available
          </Text>
        </View>

        {/* EARNINGS */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <BarChart3 color="#D4AF37" size={20} />
            <Text style={styles.cardTitle}>
              Earnings Preview
            </Text>
          </View>

          <View style={styles.barRow}>
            {[40, 80, 55, 90, 65].map((h, i) => (
              <View key={i} style={styles.barWrap}>
                <View style={[styles.bar, { height: h }]} />
              </View>
            ))}
          </View>

          <Text style={styles.earningsText}>
            ₹1,45,000 this week
          </Text>
        </View>

        {/* FLEET STATUS */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Car color="#D4AF37" size={20} />
            <Text style={styles.cardTitle}>
              Fleet Status
            </Text>
          </View>

          <Text style={styles.textSuccess}>
            ✔ BMW X7 – Rented
          </Text>
          <Text style={styles.textWarning}>
            ⚠ Audi A8 – Idle
          </Text>
          <Text style={styles.textDanger}>
            ✖ Maybach – Maintenance
          </Text>
        </View>
      </ScrollView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  scroll: {
    padding: 18,
    paddingBottom: 120,
  },

  stepText: {
  color: "#E5E7EB",
  fontSize: 14,
  marginTop: 4,
  lineHeight: 20,
},

featureText: {
  color: "#CBD5E1",
  fontSize: 14,
  marginTop: 6,
  lineHeight: 20,
},


  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 0,
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.25)",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 8,
  },

  textMuted: {
    color: "#CBD5E1",
    marginTop: 6,
  },

  textDanger: {
    color: "#F87171",
    marginTop: 6,
  },

  textSuccess: {
    color: "#4ADE80",
    marginTop: 6,
  },

  textWarning: {
    color: "#FACC15",
    marginTop: 6,
  },

  barRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    alignItems: "flex-end",
  },

  barWrap: {
    width: 24,
    height: 100,
    justifyContent: "flex-end",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 10,
    padding: 3,
  },

  bar: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#D4AF37",
  },

  earningsText: {
    color: "#D4AF37",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 12,
    textAlign: "center",
  },
});
