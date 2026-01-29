import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Booking() {
  const { car, price } = useLocalSearchParams<{
    car: string;
    price: string;
  }>();

  return (
    <LinearGradient colors={["#020617", "#0F172A"]} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Confirm Booking</Text>

        <Text style={styles.label}>Car</Text>
        <Text style={styles.value}>{car}</Text>

        <Text style={styles.label}>Price</Text>
        <Text style={styles.value}>{price}</Text>

        <TouchableOpacity style={styles.confirmBtn}>
          <Text style={styles.confirmText}>Confirm Booking</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },

  card: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 20,
  },

  label: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 12,
  },

  value: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },

  confirmBtn: {
    marginTop: 24,
    backgroundColor: "#D4AF37",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },

  confirmText: {
    color: "#020617",
    fontWeight: "800",
    fontSize: 15,
  },

  backText: {
    color: "#D4AF37",
    marginTop: 16,
    fontSize: 14,
  },
});
