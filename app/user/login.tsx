import AsyncStorage from "@react-native-async-storage/async-storage";

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowRight, Car, Lock, Mail } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginOwner, loginUser, verifyOtp } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { darkTheme, lightTheme } from "../../theme/colors";

const { width, height } = Dimensions.get("window");



const LoginScreen = () => {
  const router = useRouter();

  const [role, setRole] = useState<"USER" | "OWNER">("USER");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [showHint, setShowHint] = useState(true);
  const hintOpacity = useRef(new Animated.Value(1)).current;

  
  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(hintOpacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => setShowHint(false));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
const { setUser } = useAuth();


  // Floating animations
  const floatingAnim1 = useRef(new Animated.Value(0)).current;
  const floatingAnim2 = useRef(new Animated.Value(0)).current;
  const floatingAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const makeFloat = (anim: Animated.Value, duration: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
        ])
      );

    const f1 = makeFloat(floatingAnim1, 3000);
    const f2 = makeFloat(floatingAnim2, 4000);
    const f3 = makeFloat(floatingAnim3, 5000);

    f1.start();
    f2.start();
    f3.start();

    return () => {
      f1.stop();
      f2.stop();
      f3.stop();
    };
  }, []);

  const float1TranslateY = floatingAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const float2TranslateY = floatingAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40],
  });

  const float3TranslateY = floatingAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -25],
  });

  // 🔀 Toggle slider animation
  const sliderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(sliderAnim, {
      toValue: role === "OWNER" ? 1 : 0,
      useNativeDriver: true,
      speed: 14,
      bounciness: 8,
    }).start();
  }, [role]);

  const sliderTranslateX = sliderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.32],
  });

  // 🔥 LOGIN HANDLER
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      if (role === "USER") {
        const res = await loginUser({ email, password });

        const user_id = res?.data?.user_id;
        if (!user_id) throw new Error("User ID not received");

        setUserId(user_id);
        setOtpSent(true);
        setOtp("");

        Alert.alert("Success", "OTP sent to your email");
      } else {
        await loginOwner({ email, password });
        Alert.alert("Success", "Login successful");
        router.replace("/owner/home");
      }
    } catch (err: any) {
      console.log("LOGIN ERROR:", err?.response?.data || err?.message);

      setOtpSent(false);
      setUserId(null);

      Alert.alert(
        "Login Failed",
        err?.response?.data?.message || "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔥 VERIFY OTP
  const verifyOtpAndLogin = async () => {
    if (!otp || !userId) {
      Alert.alert("Error", "Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyOtp({ user_id: userId, otp });

      if (res?.data?.token && res?.data?.user) {
        await AsyncStorage.setItem("token", res.data.token);
        await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
        setUser({
        id: res.data.user.id,
        name: res.data.user.name,
        email: res.data.user.email,
        profile_image: "https://i.pinimg.com/736x/64/f7/74/64f774755ab1cd969f274850d0b69b3d.jpg",
      });
        console.log("USER TOKEN SAVED:", res.data.token);
      }

      Alert.alert("Success", "Login successful");
      router.replace("/user/home");
    } catch (err: any) {
      console.log("OTP ERROR:", err?.response?.data || err?.message);

      Alert.alert("Error", err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient colors={colors.gradient} style={styles.gradient} />

      {/* Floating Cars */}
      <Animated.View
        style={[
          styles.floatingCar,
          styles.floatingCar1,
          { transform: [{ translateY: float1TranslateY }] },
        ]}
      >
        <Car
          size={50}
          color={
            theme === "dark"
              ? "rgba(255,255,255,0.25)"
              : "rgba(0,0,0,0.15)"
          }
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.floatingCar,
          styles.floatingCar2,
          { transform: [{ translateY: float2TranslateY }] },
        ]}
      >
        <Car
          size={60}
          color={
            theme === "dark"
              ? "rgba(255,255,255,0.2)"
              : "rgba(0,0,0,0.12)"
          }
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.floatingCar,
          styles.floatingCar3,
          { transform: [{ translateY: float3TranslateY }] },
        ]}
      >
        <Car
          size={50}
          color={
            theme === "dark"
              ? "rgba(255,255,255,0.18)"
              : "rgba(0,0,0,0.1)"
          }
        />
      </Animated.View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.7} onPress={toggleTheme}>
              <View style={styles.logoCircle}>
                <Car size={32} color={colors.text} />
              </View>
            </TouchableOpacity>

            {showHint && (
              <Animated.View
                style={[styles.hintContainer, { opacity: hintOpacity }]}
              >
                <Text style={styles.hintText}>Tap me</Text>
              </Animated.View>
            )}

            <Text style={[styles.title, { color: colors.text }]}>
              LUXE DRIVE
            </Text>
            <Text style={[styles.subtitle, { color: colors.subText }]}>
              Premium Car Rental Experience
            </Text>
          </View>

          {/* Card */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: "transparent",
                borderColor:
                  theme === "dark"
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(180,190,220,0.6)",
              },
            ]}
          >
            <LinearGradient
              colors={
                theme === "dark"
                  ? [
                      "rgba(255,255,255,0.15)",
                      "rgba(255,255,255,0.05)",
                    ]
                  : [
                      "rgba(255,255,255,0.4)",
                      "rgba(240,245,255,0.52)",
                    ]
              }
              style={styles.cardGradient}
            >
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                {otpSent && role === "USER" ? "Verify OTP" : "Welcome Back"}
              </Text>

              <View style={styles.form}>
  {/* 🔀 ROLE TOGGLE */}
  <View style={styles.roleToggleWrapper}>
    <View style={styles.roleToggleBg}>
      <Animated.View
        style={[
          styles.roleSlider,
          { transform: [{ translateX: sliderTranslateX }] },
        ]}
      />

      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => {
          setRole("USER");
          setOtpSent(false);
        }}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.roleText,
            role === "USER" && styles.roleTextActive,
          ]}
        >
          🚗 User
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roleButton}
        onPress={() => {
          setRole("OWNER");
          setOtpSent(false);
        }}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.roleText,
            role === "OWNER" && styles.roleTextActive,
          ]}
        >
          🏷️ Owner
        </Text>
      </TouchableOpacity>
    </View>
  </View>

  {!otpSent && (
    <>
      <View
        style={[
          styles.inputContainer,
          { borderColor: colors.border },
        ]}
      >
        <Mail size={20} color={colors.subText} />
        <TextInput
          placeholder="Email"
          placeholderTextColor={
            theme === "dark"
              ? "rgba(255,255,255,0.5)"
              : "#888"
          }
          value={email}
          onChangeText={setEmail}
          style={[styles.input, { color: colors.text }]}
        />
      </View>

      <View
        style={[
          styles.inputContainer,
          { borderColor: colors.border },
        ]}
      >
        <Lock size={20} color={colors.subText} />
        <TextInput
          placeholder="Password"
          placeholderTextColor={
            theme === "dark"
              ? "rgba(255,255,255,0.5)"
              : "#888"
          }
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { color: colors.text }]}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleLogin}
        disabled={loading}
      >
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          style={styles.submitGradient}
        >
          <Text style={styles.submitText}>
            {loading
              ? "Processing..."
              : role === "USER"
              ? "Send OTP"
              : "Login"}
          </Text>
          <ArrowRight size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </>
  )}

  {otpSent && role === "USER" && (
    <>
      <View
        style={[
          styles.inputContainer,
          { borderColor: colors.border },
        ]}
      >
        <Lock size={20} color={colors.subText} />
        <TextInput
          placeholder="Enter OTP"
          placeholderTextColor={
            theme === "dark"
              ? "rgba(255,255,255,0.5)"
              : "#888"
          }
          value={otp}
          onChangeText={setOtp}
          style={[styles.input, { color: colors.text }]}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={verifyOtpAndLogin}
        disabled={loading}
      >
        <LinearGradient
          colors={["#644bf3", "#9014e2"]}
          style={styles.submitGradient}
        >
          <Text style={styles.submitText}>
            {loading ? "Verifying..." : "Verify & Login"}
          </Text>
          <ArrowRight size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </>
  )}


              </View>
            </LinearGradient>
          </View>

          {!otpSent && role === "USER" && (
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.subText }]}>
                New user?
              </Text>
              <TouchableOpacity onPress={() => router.push("/user/register")}>
                <Text style={[styles.footerLink, { color: colors.primary }]}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};



export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  floatingCar: { position: "absolute" },
  floatingCar1: { top: height * 0.15, left: width * 0.1 },
  floatingCar2: { top: height * 0.3, right: width * 0.15 },
  floatingCar3: { bottom: height * 0.2, left: width * 0.2 },

  scrollContent: {
    padding: 24,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: "center",
  },

  header: { alignItems: "center", marginBottom: 32 },

  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
    marginBottom: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 3,
  },
  subtitle: { fontSize: 14 },

  card: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
  },
  cardGradient: { padding: 28 },

  cardTitle: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 24,
  },

  form: { gap: 16 },

  roleToggleWrapper: {
    marginBottom: 18,
  },

  roleToggleBg: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 999,
    padding: 4,
    position: "relative",
  },

  roleSlider: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "#667eea",
    borderRadius: 999,
    top: 0,
    left: 0,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },

  roleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  roleText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ddd",
    letterSpacing: 0.5,
  },

  roleTextActive: {
    color: "#fff",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    gap: 12,
  },

  input: { flex: 1, height: 56, fontSize: 16 },

  submitButton: {
    marginTop: 12,
    borderRadius: 16,
    overflow: "hidden",
  },

  submitGradient: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  submitText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 6,
  },

  footerText: { fontSize: 15 },
  footerLink: {
    fontSize: 15,
    fontWeight: "600",
  },

  hintContainer: {
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.65)",
  },

  hintText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
});
