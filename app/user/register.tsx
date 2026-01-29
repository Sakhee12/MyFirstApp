import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Car,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerUser } from "../../api/auth";
import { useTheme } from "../../context/ThemeContext";
import { darkTheme, lightTheme } from "../../theme/colors";

const { width, height } = Dimensions.get("window");

const RegisterScreen = () => {
  const router = useRouter();

  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Floating animations
  const floatingAnim1 = useRef(
    new Animated.Value(0)
  ).current;
  const floatingAnim2 = useRef(
    new Animated.Value(0)
  ).current;
  const floatingAnim3 = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    const floating1 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim1, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim1, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    const floating2 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim2, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim2, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    const floating3 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim3, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim3, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    );

    floating1.start();
    floating2.start();
    floating3.start();

    return () => {
      floating1.stop();
      floating2.stop();
      floating3.stop();
    };
  }, []);

  const float1TranslateY =
    floatingAnim1.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -30],
    });

  const float2TranslateY =
    floatingAnim2.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -40],
    });

  const float3TranslateY =
    floatingAnim3.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -25],
    });

  const handleRegister = async () => {
    if (
      !name ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Error",
        "Passwords do not match"
      );
      return;
    }

    try {
      setLoading(true);
      await registerUser({
        name,
        email,
        phone: mobile,
        password,
      });
      Alert.alert(
        "Success",
        "Registration successful"
      );
      router.replace("/user/login");
    } catch (err: any) {
      Alert.alert(
        "Registration Failed",
        err?.response?.data?.message ||
          "Error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 🔥 THEMED GRADIENT */}
      <LinearGradient
        colors={colors.gradient}
        style={styles.gradient}
      />

      {/* 🔥 Floating Cars */}
      <Animated.View
        style={[
          styles.floatingCar,
          styles.floatingCar1,
          {
            transform: [
              { translateY: float1TranslateY },
            ],
          },
        ]}
      >
        <Car
          size={60}
          color={
            theme === "dark"
              ? "rgba(255,255,255,0.18)"
              : "rgba(0,0,0,0.12)"
          }
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.floatingCar,
          styles.floatingCar2,
          {
            transform: [
              { translateY: float2TranslateY },
            ],
          },
        ]}
      >
        <Car
          size={55}
          color={
            theme === "dark"
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.1)"
          }
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.floatingCar,
          styles.floatingCar3,
          {
            transform: [
              { translateY: float3TranslateY },
            ],
          },
        ]}
      >
        <Car
          size={60}
          color={
            theme === "dark"
              ? "rgba(255,255,255,0.06)"
              : "rgba(0,0,0,0.08)"
          }
        />
      </Animated.View>

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : "height"
          }
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={
              styles.scrollContent
            }
            showsVerticalScrollIndicator={
              false
            }
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoCircle}>
                <Car size={32} color={colors.text} />
              </View>
              <Text style={[styles.title, { color: colors.text }]}>
                LUXE DRIVE
              </Text>
              <Text style={[styles.subtitle, { color: colors.subText }]}>
                Create Your Account
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
                        "rgba(255,255,255,0.75)",
                        "rgba(240,245,255,0.85)",
                      ]
                }
                style={styles.cardGradient}
              >
                <Text style={[styles.cardTitle, { color: colors.text }]}>
                  Create Account
                </Text>

                <View style={styles.form}>
                  <Input
                    icon={<User size={20} color={colors.subText} />}
                    value={name}
                    setValue={setName}
                    placeholder="Full Name"
                    theme={theme}
                    colors={colors}
                  />

                  <Input
                    icon={<Mail size={20} color={colors.subText} />}
                    value={email}
                    setValue={setEmail}
                    placeholder="Email"
                    theme={theme}
                    colors={colors}
                  />

                  <Input
                    icon={<Phone size={20} color={colors.subText} />}
                    value={mobile}
                    setValue={setMobile}
                    placeholder="Mobile Number"
                    theme={theme}
                    colors={colors}
                  />

                  <Input
                    icon={<Lock size={20} color={colors.subText} />}
                    value={password}
                    setValue={setPassword}
                    placeholder="Password"
                    secure
                    theme={theme}
                    colors={colors}
                  />

                  <Input
                    icon={<Lock size={20} color={colors.subText} />}
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    placeholder="Confirm Password"
                    secure
                    theme={theme}
                    colors={colors}
                  />

                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleRegister}
                    disabled={loading}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={["#667eea", "#764ba2"]}
                      style={styles.submitGradient}
                    >
                      <Text style={styles.submitText}>
                        {loading
                          ? "Registering..."
                          : "Register"}
                      </Text>
                      <ArrowRight
                        size={20}
                        color="#fff"
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.subText }]}>
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() =>
                  router.back()
                }
              >
                <Text
                  style={[
                    styles.footerLink,
                    { color: colors.primary },
                  ]}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const Input = ({
  icon,
  value,
  setValue,
  placeholder,
  secure = false,
  theme,
  colors,
}: any) => (
  <View
    style={[
      styles.inputContainer,
      {
        backgroundColor:
          theme === "dark"
            ? "rgba(255,255,255,0.1)"
            : "rgba(255,255,255,0.85)",
        borderColor: colors.border,
      },
    ]}
  >
    {icon}
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={
        theme === "dark"
          ? "rgba(255,255,255,0.5)"
          : "#888"
      }
      value={value}
      onChangeText={setValue}
      style={[styles.input, { color: colors.text }]}
      secureTextEntry={secure}
    />
  </View>
);

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  floatingCar: {
    position: "absolute",
  },

  floatingCar1: {
    top: height * 0.15,
    left: width * 0.1,
  },

  floatingCar2: {
    top: height * 0.3,
    right: width * 0.15,
  },

  floatingCar3: {
    bottom: height * 0.2,
    left: width * 0.2,
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 32,
  },

  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor:
      "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor:
      "rgba(255,255,255,0.2)",
    marginBottom: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 3,
  },

  subtitle: {
    fontSize: 14,
  },

  card: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
  },

  cardGradient: {
    padding: 28,
  },

  cardTitle: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 24,
  },

  form: {
    gap: 16,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    gap: 12,
  },

  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
  },

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

  footerText: {
    fontSize: 15,
  },

  footerLink: {
    fontSize: 15,
    fontWeight: "600",
  },
});
