import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { darkTheme, lightTheme } from "../../theme/colors";

const ProfileScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;
  const { user, setUser } = useAuth();

  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+91 9XXXXXXXXX",
  });

  const onSave = () => {
    setUser({
      ...user!,
      name: form.name,
      email: form.email,
    });

    setEditMode(false);
    Alert.alert("✅ Saved", "Profile updated successfully");
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.multiRemove(["token", "user"]);
          setUser(null);
          router.replace("/user/login");
        },
      },
    ]);
  };

  const handleSwitchToOwner = () => {
    router.replace("/owner/login");
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
    >
      {/* 🧑 HERO */}
      <View style={styles.hero}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: user?.profile_image || "https://i.pravatar.cc/300",
            }}
            style={styles.avatar}
          />

          <TouchableOpacity
            style={[
              styles.cameraIcon,
              { backgroundColor: colors.primary },
            ]}
          >
            <Ionicons name="camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={[styles.name, { color: colors.text }]}>
          {form.name || "Your Name"}
        </Text>

        <Text style={[styles.username, { color: colors.subText }]}>
          @{form.email?.split("@")[0] || "username"}
        </Text>

        <TouchableOpacity
          style={[
            styles.editBtn,
            { backgroundColor: colors.primary },
          ]}
          onPress={() => setEditMode(!editMode)}
        >
          <Text style={styles.editBtnText}>
            {editMode ? "Cancel" : "Edit Details"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 📝 PERSONAL INFO */}
      <Card title="Personal Information" colors={colors}>
        <Label label="Full Name" colors={colors} />
        {editMode ? (
          <Input
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            colors={colors}
          />
        ) : (
          <Value text={form.name} colors={colors} />
        )}

        <Label label="Email Address" colors={colors} />
        {editMode ? (
          <Input
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            colors={colors}
          />
        ) : (
          <Value text={form.email} colors={colors} />
        )}

        <Label label="Phone Number" colors={colors} />
        <Value text={form.phone} colors={colors} />
      </Card>

      {/* 🚗 ACTIVITY */}
      <Card title="Activity & Convenience" colors={colors}>
        <ActionItem icon="car-outline" text="My Garage" colors={colors} />
        <ActionItem icon="time-outline" text="Trip History" colors={colors} />
        <ActionItem icon="card-outline" text="Payment Hub" colors={colors} />
        <ActionItem icon="pricetag-outline" text="Promos" colors={colors} />
      </Card>

      {/* ⚙️ ACCOUNT ACTIONS */}
      <Card title="Account" colors={colors}>
        <TouchableOpacity
          style={styles.dangerItem}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={22} color="#ef4444" />
          <Text style={[styles.dangerText, { color: "#ef4444" }]}>
            Logout
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchItem}
          onPress={handleSwitchToOwner}
        >
          <Ionicons
            name="repeat-outline"
            size={22}
            color={colors.primary}
          />
          <Text
            style={[
              styles.switchText,
              { color: colors.primary },
            ]}
          >
            Switch to Owner
          </Text>
        </TouchableOpacity>
      </Card>

      {/* 💾 SAVE BAR */}
      {editMode && (
        <View style={styles.saveBar}>
          <TouchableOpacity
            style={[
              styles.saveBtn,
              { backgroundColor: colors.primary },
            ]}
            onPress={onSave}
          >
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;

/* 🔹 COMPONENTS */

const Card = ({ title, children, colors }: any) => (
  <View
    style={[
      styles.card,
      {
        backgroundColor: colors.background,
        borderColor: colors.border,
      },
    ]}
  >
    <Text style={[styles.sectionTitle, { color: colors.text }]}>
      {title}
    </Text>
    {children}
  </View>
);

const Label = ({ label, colors }: any) => (
  <Text style={[styles.label, { color: colors.subText }]}>{label}</Text>
);

const Value = ({ text, colors }: any) => (
  <Text style={[styles.value, { color: colors.text }]}>{text}</Text>
);

const Input = ({ value, onChange, colors }: any) => (
  <TextInput
    value={value}
    onChangeText={onChange}
    style={[
      styles.input,
      {
        borderColor: colors.border,
        color: colors.text,
      },
    ]}
  />
);

const ActionItem = ({ icon, text, colors }: any) => (
  <TouchableOpacity style={styles.actionItem}>
    <Ionicons name={icon} size={22} color={colors.primary} />
    <Text style={[styles.actionText, { color: colors.text }]}>
      {text}
    </Text>
    <Ionicons
      name="chevron-forward"
      size={18}
      color={colors.subText}
    />
  </TouchableOpacity>
);

/* 🎨 STYLES */

const styles = StyleSheet.create({
  hero: { alignItems: "center", paddingVertical: 30 },
  avatarWrapper: { position: "relative" },
  avatar: { width: 120, height: 120, borderRadius: 60 },

  cameraIcon: {
    position: "absolute",
    bottom: 6,
    right: 6,
    padding: 8,
    borderRadius: 20,
  },

  name: { fontSize: 22, fontWeight: "700", marginTop: 12 },
  username: { fontSize: 13, marginBottom: 12 },

  editBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  editBtnText: { color: "#fff", fontWeight: "600" },

  card: {
    marginHorizontal: 20,
    marginBottom: 18,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  label: { fontSize: 12, marginTop: 12 },
  value: { fontSize: 15, marginTop: 4 },

  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 6,
  },

  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },

  actionText: { flex: 1, fontSize: 15 },

  dangerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },

  dangerText: { fontSize: 15, fontWeight: "600" },

  switchItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },

  switchText: { fontSize: 15, fontWeight: "600" },

  saveBar: { padding: 16 },

  saveBtn: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
