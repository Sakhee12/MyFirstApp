import { LinearGradient } from "expo-linear-gradient";
import { BarChart3, Car, Home, Shield, User } from "lucide-react-native";
import { useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OwnerDashboard from "./ownerPreview";
import UserExplore from "./userPreview";

export default function ExploreRoot() {
  const [isOwnerMode, setIsOwnerMode] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleMode = (owner: boolean) => {
    setIsOwnerMode(owner);
    Animated.timing(slideAnim, {
      toValue: owner ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120],
  });

  return (
    <LinearGradient colors={["#020617", "#0F172A"]} style={styles.container}>
      {/* PERSONA SWITCHER */}
      <View style={styles.switcherWrap}>
        <Animated.View style={[styles.slider, { transform: [{ translateX }] }]} />

        <TouchableOpacity style={styles.switchBtn} onPress={() => toggleMode(false)}>
          <Text style={styles.switchText}>User</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.switchBtn} onPress={() => toggleMode(true)}>
          <Text style={styles.switchText}>Owner</Text>
        </TouchableOpacity>
      </View>

      {/* MAIN CONTENT */}
      {isOwnerMode ? <OwnerDashboard /> : <UserExplore />}

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        {!isOwnerMode ? (
          <>
            <Tab icon={<Home color="white" />} label="Explore" />
            <Tab icon={<Car color="white" />} label="Bookings" />
            <Tab icon={<User color="white" />} label="Profile" />
          </>
        ) : (
          <>
            <Tab icon={<BarChart3 color="white" />} label="Dashboard" />
            <Tab icon={<Car color="white" />} label="My Fleet" />
            <Tab icon={<Shield color="#D4AF37" />} label="Security" />
          </>
        )}
      </View>

    </LinearGradient>
  );
}

function Tab({ icon, label }: any) {
  return (
    <TouchableOpacity style={styles.tabBtn}>
      {icon}
      <Text style={styles.tabText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F0F10" },

  welcome:
  {
     margin: 26,
     color: "#fff",
    fontWeight: "600",
  },

  /* TOGGLE */
  switcherWrap: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "#D4AF37",
    borderRadius: 22,
    margin: 46,
    height: 44,
    position: "relative",
    overflow: "hidden",
  },

  slider: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "rgba(212,175,55,0.18)",
    borderRadius: 22,
  },

  switchBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  switchText: {
    color: "#fff",
    fontWeight: "600",
  },

  /* BOTTOM NAV */
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    backgroundColor: "#020617",
    borderTopWidth: 1,
    borderTopColor: "#1E293B",
  },

  tabBtn: { alignItems: "center" },
  tabText: { color: "#fff", fontSize: 11, marginTop: 4 },
});
