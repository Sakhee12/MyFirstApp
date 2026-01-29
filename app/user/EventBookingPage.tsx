import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { API } from "../../api/apis";
import { useTheme } from "../../context/ThemeContext";
import { darkTheme, lightTheme } from "../../theme/colors";

type FormState = {
  event_type: string;
  start_date: Date | null;
  end_date: Date | null;
  start_time: Date | null;
  city: string;
  cars_qty: number;
  badge: string;
  min_seats: number;
  billing_type: string;
  pickup_location: string;
  drop_location: string;
  phone: string;
  note: string;
};

export default function EventBookingPage() {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [form, setForm] = useState<FormState>({
    event_type: "WEDDING",
    start_date: null,
    end_date: null,
    start_time: null,
    city: "",
    cars_qty: 1,
    badge: "ANY",
    min_seats: 4,
    billing_type: "PER_DAY",
    pickup_location: "",
    drop_location: "",
    phone: "",
    note: "",
  });

  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const increment = (key: "cars_qty" | "min_seats") =>
    setForm((prev) => ({ ...prev, [key]: prev[key] + 1 }));

  const decrement = (key: "cars_qty" | "min_seats") =>
    setForm((prev) => ({
      ...prev,
      [key]: Math.max(1, prev[key] - 1),
    }));

  const formatDate = (d: Date | null) =>
    d ? d.toLocaleDateString("en-GB") : "";

  const formatTime = (d: Date | null) =>
    d
      ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "";

  const handleSubmit = async () => {
    if (!form.event_type) {
      Alert.alert("Validation", "Please select event type");
      return;
    }

    if (!form.start_date || !form.end_date || !form.start_time) {
      Alert.alert("Validation", "Please select start date, end date and time");
      return;
    }

    if (!form.city) {
      Alert.alert("Validation", "Please enter city");
      return;
    }

    if (!form.pickup_location) {
      Alert.alert("Validation", "Please enter pickup location");
      return;
    }

    if (!form.phone) {
      Alert.alert("Validation", "Please enter phone number");
      return;
    }

    try {
      const payload = {
        event_type: form.event_type.toUpperCase(),
        city: form.city,

        start_date: form.start_date
          ?.toISOString()
          .slice(0, 10),

        end_date: form.end_date
          ?.toISOString()
          .slice(0, 10),

        start_time: form.start_time
          ?.toTimeString()
          .slice(0, 5),

        cars_qty: Number(form.cars_qty),
        badge: form.badge.toUpperCase(),
        min_seats: Number(form.min_seats),
        billing_type: form.billing_type.toUpperCase(),

        pickup_location: form.pickup_location,
        drop_location: form.drop_location || null,

        phone: form.phone,
        note: form.note || "",
      };

      console.log("EVENT PAYLOAD:", payload);

     const res = await API.post("/event-requests/request", payload);


      console.log("EVENT RESPONSE:", res.data);

      Alert.alert(
  "Success 🎉",
  "Your event booking request has been submitted.",
  [
    {
      text: "My Events",
      onPress: () => {
        router.push("/user/MyEventBookings");
      },
    },
    {
      text: "OK",
      style: "cancel",
    },
  ]
);
    
    } catch (err: any) {
      console.log(
        "EVENT REQUEST ERROR FULL:",
        err?.response || err
      );

      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Server error while submitting request";

      Alert.alert("Failed", msg);
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor:
                theme === "dark"
                  ? "#0f172a"
                  : "rgba(255,255,255,0.95)",
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            ✨ Book Cars for Event
          </Text>

          {/* EVENT DETAILS */}
          <Text style={[styles.sectionTitle, { color: colors.subText }]}>
            EVENT DETAILS
          </Text>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.subText }]}>
              Event Type
            </Text>
            <View style={[styles.inputWrap, { borderColor: colors.border }]}>
              <Ionicons
                name="calendar-outline"
                size={18}
                color={colors.subText}
              />
              <TextInput
                value={form.event_type}
                onChangeText={(v) => update("event_type", v)}
                placeholder="Wedding / Corporate / Party"
                placeholderTextColor={colors.subText}
                style={[styles.input, { color: colors.text }]}
              />
            </View>
          </View>

          {/* DATE & TIME */}
          <Text style={[styles.sectionTitle, { color: colors.subText }]}>
            DATE & TIME
          </Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.dateBox,
                { borderColor: colors.border },
              ]}
              onPress={() => setShowStartDate(true)}
            >
              <Ionicons
                name="calendar"
                size={18}
                color={colors.subText}
              />
              <Text style={[styles.dateText, { color: colors.text }]}>
                {form.start_date
                  ? formatDate(form.start_date)
                  : "Start Date"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.dateBox,
                { borderColor: colors.border },
              ]}
              onPress={() => setShowEndDate(true)}
            >
              <Ionicons
                name="calendar"
                size={18}
                color={colors.subText}
              />
              <Text style={[styles.dateText, { color: colors.text }]}>
                {form.end_date
                  ? formatDate(form.end_date)
                  : "End Date"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.dateBox,
              { borderColor: colors.border },
            ]}
            onPress={() => setShowTime(true)}
          >
            <Ionicons
              name="time-outline"
              size={18}
              color={colors.subText}
            />
            <Text style={[styles.dateText, { color: colors.text }]}>
              {form.start_time
                ? formatTime(form.start_time)
                : "Start Time"}
            </Text>
          </TouchableOpacity>

          {/* CARS & PREFERENCES */}
          <Text style={[styles.sectionTitle, { color: colors.subText }]}>
            CARS & PREFERENCES
          </Text>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.subText }]}>
              City
            </Text>
            <View style={[styles.inputWrap, { borderColor: colors.border }]}>
              <Ionicons
                name="location-outline"
                size={18}
                color={colors.subText}
              />
              <TextInput
                value={form.city}
                onChangeText={(v) => update("city", v)}
                placeholder="Pune / Mumbai"
                placeholderTextColor={colors.subText}
                style={[styles.input, { color: colors.text }]}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View
              style={[
                styles.counterBox,
                { borderColor: colors.border },
              ]}
            >
              <Text
                style={[
                  styles.counterLabel,
                  { color: colors.subText },
                ]}
              >
                Cars Needed
              </Text>
              <View style={styles.counterRow}>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => decrement("cars_qty")}
                >
                  <Text style={{ color: colors.text }}>−</Text>
                </TouchableOpacity>

                <Text
                  style={[
                    styles.counterValue,
                    { color: colors.text },
                  ]}
                >
                  {form.cars_qty}
                </Text>

                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => increment("cars_qty")}
                >
                  <Text style={{ color: colors.text }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={[
                styles.counterBox,
                { borderColor: colors.border },
              ]}
            >
              <Text
                style={[
                  styles.counterLabel,
                  { color: colors.subText },
                ]}
              >
                Min Seats
              </Text>
              <View style={styles.counterRow}>
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => decrement("min_seats")}
                >
                  <Text style={{ color: colors.text }}>−</Text>
                </TouchableOpacity>

                <Text
                  style={[
                    styles.counterValue,
                    { color: colors.text },
                  ]}
                >
                  {form.min_seats}
                </Text>

                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => increment("min_seats")}
                >
                  <Text style={{ color: colors.text }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Billing */}
          <View style={styles.row}>
            {["PER_DAY", "PACKAGE"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.billingBtn,
                  {
                    backgroundColor:
                      form.billing_type === type
                        ? "#667eea"
                        : "rgba(255,255,255,0.06)",
                  },
                ]}
                onPress={() => update("billing_type", type)}
              >
                <Text
                  style={{
                    color:
                      form.billing_type === type
                        ? "#000"
                        : colors.text,
                    fontWeight: "700",
                  }}
                >
                  {type === "PER_DAY"
                    ? "Per Day"
                    : "Package"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* LOCATIONS */}
          <Text style={[styles.sectionTitle, { color: colors.subText }]}>
            LOCATIONS
          </Text>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.subText }]}>
              Pickup Location
            </Text>
            <TextInput
              value={form.pickup_location}
              onChangeText={(v) =>
                update("pickup_location", v)
              }
              placeholder="Pickup location"
              placeholderTextColor={colors.subText}
              style={[
                styles.inputPlain,
                {
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
            />
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.subText }]}>
              Drop Location (optional)
            </Text>
            <TextInput
              value={form.drop_location}
              onChangeText={(v) =>
                update("drop_location", v)
              }
              placeholder="Drop not required"
              placeholderTextColor={colors.subText}
              style={[
                styles.inputPlain,
                {
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
            />
          </View>

          {/* CONTACT */}
          <Text style={[styles.sectionTitle, { color: colors.subText }]}>
            CONTACT
          </Text>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.subText }]}>
              Phone
            </Text>
            <TextInput
              value={form.phone}
              onChangeText={(v) => update("phone", v)}
              placeholder="Enter phone number"
              placeholderTextColor={colors.subText}
              keyboardType="phone-pad"
              style={[
                styles.inputPlain,
                {
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
            />
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.subText }]}>
              Note (optional)
            </Text>
            <TextInput
              value={form.note}
              onChangeText={(v) => update("note", v)}
              placeholder="Any special requirement..."
              placeholderTextColor={colors.subText}
              multiline
              style={[
                styles.noteInput,
                {
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
            />
          </View>
        </View>
      </ScrollView>

      {/* SUBMIT BUTTON */}
      <View style={styles.submitWrapper}>
        <TouchableOpacity
          style={styles.submitBtn}
          activeOpacity={0.9}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>
            Submit Event Booking Request
          </Text>
        </TouchableOpacity>
      </View>

      {/* Native Pickers */}
      {showStartDate && (
        <DateTimePicker
          value={form.start_date || new Date()}
          mode="date"
          display={
            Platform.OS === "ios"
              ? "inline"
              : "default"
          }
          onChange={(_, date) => {
            setShowStartDate(false);
            if (date) update("start_date", date);
          }}
        />
      )}

      {showEndDate && (
        <DateTimePicker
          value={form.end_date || new Date()}
          mode="date"
          display={
            Platform.OS === "ios"
              ? "inline"
              : "default"
          }
          onChange={(_, date) => {
            setShowEndDate(false);
            if (date) update("end_date", date);
          }}
        />
      )}

      {showTime && (
        <DateTimePicker
          value={form.start_time || new Date()}
          mode="time"
          display={
            Platform.OS === "ios"
              ? "spinner"
              : "default"
          }
          onChange={(_, date) => {
            setShowTime(false);
            if (date) update("start_time", date);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 140,
  },

  card: {
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    shadowColor: "#d4af37",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 10,
    letterSpacing: 0.8,
  },

  field: { marginBottom: 14 },

  label: { fontSize: 12, marginBottom: 6 },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
    backgroundColor: "rgba(255,255,255,0.04)",
  },

  input: { flex: 1, marginLeft: 10, fontSize: 15 },

  inputPlain: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
    fontSize: 15,
    backgroundColor: "rgba(255,255,255,0.04)",
  },

  noteInput: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 90,
    textAlignVertical: "top",
    fontSize: 15,
    backgroundColor: "rgba(255,255,255,0.04)",
  },

  row: { flexDirection: "row", gap: 14, marginBottom: 14 },

  dateBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.04)",
  },

  dateText: { fontSize: 15 },

  counterBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  counterLabel: {
    fontSize: 12,
    marginBottom: 10,
    letterSpacing: 0.5,
  },

  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  counterBtn: {
    width: 22,
    height: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  counterValue: { fontSize: 12, fontWeight: "400" },

  billingBtn: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
  },

  submitWrapper: {
    position: "absolute",
    bottom: 18,
    left: 18,
    right: 18,
  },

  submitBtn: {
    borderRadius: 26,
    paddingVertical: 18,
    backgroundColor: "#667eea",
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.55,
    shadowRadius: 22,
    elevation: 16,
  },

  submitText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
});
