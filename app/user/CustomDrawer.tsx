import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { darkTheme, lightTheme } from "../../theme/colors";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.75;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MAIN_MENU = [
  { label: "Premium Cars", icon: "car-outline" },
  { label: "Gold Cars", icon: "star-outline" },
  { label: "Silver Cars", icon: "medal-outline" },
  { label: "My Bookings", icon: "calendar-outline", route: "/user/myBooking" },
  { label: "My Events", icon: "ticket-outline", route: "/user/MyEventBookings" },
  { label: "Payment Methods", icon: "card-outline" },
  { label: "Favorites", icon: "heart-outline" },
  { label: "Offers", icon: "pricetag-outline" },
];

const UTILITY_MENU = [
  { label: "Settings", icon: "settings-outline" },
  { label: "Help", icon: "help-circle-outline" },
  { label: "FAQ", icon: "information-circle-outline" },
  { label: "About Us", icon: "people-outline" },
  { label: "Contact Us", icon: "call-outline" },
];

const CustomDrawer = ({ isOpen, onClose }: Props) => {
  const { user, setUser } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  const colors = theme === "dark" ? darkTheme : lightTheme;

  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: isOpen ? 0 : -DRAWER_WIDTH,
        duration: isOpen ? 280 : 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: isOpen ? 1 : 0,
        duration: isOpen ? 280 : 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={isOpen ? "auto" : "none"}>
      {/* Backdrop */}
      <Pressable onPress={onClose} style={StyleSheet.absoluteFill}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
      </Pressable>

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            backgroundColor: colors.background,
            borderRightColor: colors.border,
            transform: [{ translateX }],
          },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
          {/* PROFILE */}
          <View style={styles.profileSection}>
            <Image
              source={{ uri: user?.profile_image || "https://i.pravatar.cc/150" }}
              style={styles.avatar}
            />

            <View>
              <Text style={[styles.userName, { color: colors.text }]}>
                {user?.name || "Guest User"}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  onClose();
                  router.push("/user/profile");
                }}
              >
                <Text style={styles.viewProfile}>View Profile</Text>
              </TouchableOpacity>

              <View style={styles.pointsRow}>
                <Ionicons name="gift-outline" size={14} color="#f5c542" />
                <Text style={styles.pointsText}>1200 Points</Text>
              </View>
            </View>
          </View>

          {/* MAIN MENU */}
          {MAIN_MENU.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => {
                onClose();
                item.route && router.push(item.route);
              }}
            >
              <Ionicons name={item.icon as any} size={20} color={colors.text} />
              <Text style={[styles.text, { color: colors.text }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.divider} />

          {/* UTILITY */}
          {UTILITY_MENU.map((item, index) => (
            <TouchableOpacity key={index} style={styles.item}>
              <Ionicons name={item.icon as any} size={20} color={colors.subText} />
              <Text style={[styles.text, { color: colors.subText }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.divider} />

          {/* LOGOUT */}
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              onClose();
              setTimeout(() => {
                setUser(null);
                router.replace("/user/login");
              }, 200);
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            <Text style={[styles.text, { color: "#ef4444" }]}>Logout</Text>
          </TouchableOpacity>

          {/* SWITCH OWNER */}
          <TouchableOpacity style={styles.item}>
            <Ionicons name="swap-horizontal-outline" size={20} color="#6C63FF" />
            <Text style={[styles.text, { color: "#6C63FF" }]}>
              Switch to Owner
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    paddingTop: 60,
    paddingHorizontal: 16,
    borderRightWidth: 1,
    zIndex: 100,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  text: {
    marginLeft: 12,
    fontSize: 15,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
  },
  viewProfile: {
    fontSize: 13,
    color: "#6C63FF",
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 12,
  },
  pointsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  pointsText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#f5c542",
    fontWeight: "600",
  },
});
