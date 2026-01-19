import { useRouter } from "expo-router";
import { BarChart3, Car, Home, Shield, User } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppMode } from "../context/AppModeContext";

export default function BottomNav() {
  const router = useRouter();
  const { mode, setMode } = useAppMode();

  return (
    <View style={styles.container}>
      {/* USER TABS */}
      <TouchableOpacity onPress={() => router.push("/explore")}>
        <Home color="white" />
        <Text style={styles.label}>Explore</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Car color="white" />
        <Text style={styles.label}>Bookings</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <User color="white" />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>

      {/* OWNER MODE TOGGLE */}
      <TouchableOpacity onPress={() => setMode(mode === "user" ? "owner" : "user")}>
        <Shield color={mode === "owner" ? "#FACC15" : "white"} />
        <Text style={styles.label}>
          {mode === "owner" ? "Owner" : "User"}
        </Text>
      </TouchableOpacity>

      {/* OWNER TABS */}
      {mode === "owner" && (
        <>
          <TouchableOpacity onPress={() => router.push("/owner/dashboard")}>
            <BarChart3 color="white" />
            <Text style={styles.label}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Car color="white" />
            <Text style={styles.label}>Fleet</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1E293B", // dark3
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  label: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
  },
});
