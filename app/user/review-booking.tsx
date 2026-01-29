import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

const BASE_URL = "http://192.168.1.6:1000";

const getImageUrl = (img?: string) => {
  if (!img) return undefined;
  if (img.startsWith("http")) return img;
  return `${BASE_URL}${img}`;
};

const TIER_GRADIENTS: Record<string, readonly string[]> = {
  STANDARD: ["#6B7280", "#9CA3AF"],
  SILVER: ["#C7CEDB", "#EEF2F7"],
  GOLD: ["#F5C542", "#FFE6A1"],
  PLATINUM: ["#6366F1", "#C7D2FE"],
};

export default function ReviewBookingScreen() {
  const params = useLocalSearchParams();
  const { colors } = useTheme();

  const carName = String(params.name || "Scorpio");
  const pricePerDay = Number(params.price || 3500);
  const image = String(params.image || "");
  const tier = String(params.tier || "STANDARD").toUpperCase();

  const imageUrl = image ? getImageUrl(image) : undefined;
  const gradientColors = TIER_GRADIENTS[tier] || TIER_GRADIENTS.STANDARD;

  const [pickupLocation, setPickupLocation] = useState(
    String(params.pickupLocation || "Pune")
  );
  const [dropLocation, setDropLocation] = useState(
    String(params.dropLocation || "Mumbai")
  );

  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<Date | null>(null);

  const [days, setDays] = useState(1);
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const autoDays = useMemo(() => {
    if (!pickupDate || !returnDate) return null;
    const start = pickupDate.getTime();
    const end = returnDate.getTime();
    if (isNaN(start) || isNaN(end) || end <= start) return null;
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  }, [pickupDate, returnDate]);

  const effectiveDays = autoDays ?? days;

  const estimatedTotal = useMemo(() => {
    return effectiveDays * pricePerDay;
  }, [effectiveDays, pricePerDay]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerText}>Review Booking</Text>

        {/* HERO CARD */}
        <View style={styles.heroCard}>
          {imageUrl && (
            <Image source={{ uri: imageUrl }} style={styles.heroImage} />
          )}

          {/* Cinematic overlay */}
          <LinearGradient
            colors={["rgba(0,0,0,0.85)", "rgba(0,0,0,0.25)", "transparent"]}
            style={styles.heroOverlay}
          />

          {/* GLASS NAME + PRICE */}
          <BlurView intensity={30} tint="dark" style={styles.heroGlass}>
            <Text style={styles.heroName}>{carName}</Text>

            <LinearGradient
              colors={gradientColors}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.heroPriceBadge}
            >
              <Text style={styles.heroPriceText}>
                ₹{pricePerDay}/day
              </Text>
            </LinearGradient>
          </BlurView>
        </View>

        {/* PICKUP LOCATION */}
        <View style={[styles.luxuryCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.luxuryLabel, { color: colors.subtext }]}>
            Pickup Location
          </Text>
          <TextInput
            value={pickupLocation}
            onChangeText={setPickupLocation}
            style={[styles.luxuryInput, { color: colors.text }]}
            placeholder="Enter pickup location"
            placeholderTextColor={colors.subtext}
          />
        </View>

        {/* DROP LOCATION */}
        <View style={[styles.luxuryCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.luxuryLabel, { color: colors.subtext }]}>
            Drop Location
          </Text>
          <TextInput
            value={dropLocation}
            onChangeText={setDropLocation}
            style={[styles.luxuryInput, { color: colors.text }]}
            placeholder="Enter drop location"
            placeholderTextColor={colors.subtext}
          />
        </View>

        {/* PICKUP DATE */}
        <TouchableOpacity
          style={[styles.luxuryCard, { backgroundColor: colors.card }]}
          onPress={() => setShowPickupPicker(true)}
        >
          <Text style={[styles.luxuryLabel, { color: colors.subtext }]}>
            Pickup Date
          </Text>
          <Text style={[styles.luxuryValue, { color: colors.text }]}>
            {pickupDate ? pickupDate.toDateString() : "Select date"}
          </Text>
        </TouchableOpacity>

        {/* RETURN DATE */}
        <TouchableOpacity
          style={[styles.luxuryCard, { backgroundColor: colors.card }]}
          onPress={() => setShowReturnPicker(true)}
        >
          <Text style={[styles.luxuryLabel, { color: colors.subtext }]}>
            Return Date
          </Text>
          <Text style={[styles.luxuryValue, { color: colors.text }]}>
            {returnDate ? returnDate.toDateString() : "Select date"}
          </Text>
        </TouchableOpacity>

        {/* PICKUP TIME */}
        <TouchableOpacity
          style={[styles.luxuryCard, { backgroundColor: colors.card }]}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={[styles.luxuryLabel, { color: colors.subtext }]}>
            Pickup Time
          </Text>
          <Text style={[styles.luxuryValue, { color: colors.text }]}>
            {pickupTime ? pickupTime.toLocaleTimeString() : "Select time"}
          </Text>
        </TouchableOpacity>

        {/* TRIP DURATION */}
        <View style={[styles.counterLuxuryCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.counterLuxuryLabel, { color: colors.subtext }]}>
            Trip Duration
          </Text>

          <View style={styles.counterLuxuryRow}>
            <TouchableOpacity
              onPress={() => setDays((d) => Math.max(1, d - 1))}
              style={[styles.counterLuxuryBtn, { backgroundColor: colors.background }]}
            >
              <Text style={[styles.counterLuxuryBtnText, { color: colors.text }]}>
                –
              </Text>
            </TouchableOpacity>

            <Text style={[styles.counterLuxuryValue, { color: colors.text }]}>
              {effectiveDays} Days
            </Text>

            <TouchableOpacity
              onPress={() => setDays((d) => d + 1)}
              style={[styles.counterLuxuryBtn, { backgroundColor: colors.background }]}
            >
              <Text style={[styles.counterLuxuryBtnText, { color: colors.text }]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BOOKING SUMMARY */}
        <View style={[styles.summaryLuxuryCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.summaryLuxuryTitle, { color: colors.text }]}>
            Booking Summary
          </Text>

          <View style={styles.summaryLuxuryRow}>
            <Text style={[styles.summaryLuxuryLabel, { color: colors.subtext }]}>
              Price / Day
            </Text>
            <Text style={[styles.summaryLuxuryValue, { color: colors.text }]}>
              ₹{pricePerDay}
            </Text>
          </View>

          <View style={styles.summaryLuxuryRow}>
            <Text style={[styles.summaryLuxuryLabel, { color: colors.subtext }]}>
              Trip Days
            </Text>
            <Text style={[styles.summaryLuxuryValue, { color: colors.text }]}>
              {effectiveDays}
            </Text>
          </View>

          <View style={styles.summaryLuxuryRow}>
            <Text style={[styles.summaryLuxuryLabel, { color: colors.subtext }]}>
              Estimated Total
            </Text>
            <LinearGradient
              colors={gradientColors}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.totalLuxuryBadge}
            >
              <Text style={styles.totalLuxuryText}>
                ₹{estimatedTotal}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={[styles.footerLuxury, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={() => setShowSuccess(true)}>
          <LinearGradient
            colors={gradientColors}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.confirmLuxuryBtn}
          >
            <Text style={styles.confirmLuxuryText}>
              Confirm Booking
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* SUCCESS MODAL */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <BlurView intensity={40} tint="dark" style={styles.modalGlass}>
            <Text style={styles.modalTitle}>Booking Confirmed 🎉</Text>
            <Text style={styles.modalMessage}>
              Your {carName} has been booked successfully.
            </Text>

            <TouchableOpacity onPress={() => setShowSuccess(false)}>
              <LinearGradient
                colors={gradientColors}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.modalLuxuryBtn}
              >
                <Text style={styles.modalLuxuryText}>Close</Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </View>
      </Modal>

      {/* DATE PICKERS */}
      {showPickupPicker && (
        <DateTimePicker
          value={pickupDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(e, d) => {
            setShowPickupPicker(false);
            if (d) setPickupDate(d);
          }}
        />
      )}

      {showReturnPicker && (
        <DateTimePicker
          value={returnDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(e, d) => {
            setShowReturnPicker(false);
            if (d) setReturnDate(d);
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={pickupTime || new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(e, d) => {
            setShowTimePicker(false);
            if (d) setPickupTime(d);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  scrollContent: {
    padding: 20,
    paddingBottom: 160,
  },

  heroCard: {
    height: 280,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 26,
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },

  heroGlass: {
    position: "absolute",
    bottom: 18,
    left: 18,
    right: 18,
    borderRadius: 20,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  heroName: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 8,
  },

  heroPriceBadge: {
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },

  heroPriceText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "900",
  },

  luxuryCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 7,
  },

  luxuryLabel: {
    fontSize: 13,
    marginBottom: 8,
  },

  luxuryInput: {
    fontSize: 16,
    fontWeight: "600",
  },

  luxuryValue: {
    fontSize: 16,
    fontWeight: "600",
  },

  counterLuxuryCard: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 26,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },

  counterLuxuryLabel: {
    fontSize: 14,
    marginBottom: 14,
  },

  counterLuxuryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  counterLuxuryBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },

  counterLuxuryBtnText: {
    fontSize: 22,
    fontWeight: "900",
  },

  counterLuxuryValue: {
    fontSize: 22,
    fontWeight: "900",
    marginHorizontal: 26,
  },

  summaryLuxuryCard: {
    borderRadius: 22,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 12,
  },

  summaryLuxuryTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 18,
  },

  summaryLuxuryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  summaryLuxuryLabel: {
    fontSize: 14,
  },

  summaryLuxuryValue: {
    fontSize: 16,
    fontWeight: "800",
  },

  totalLuxuryBadge: {
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },

  totalLuxuryText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "900",
  },

  footerLuxury: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 22,
  },

  confirmLuxuryBtn: {
    borderRadius: 26,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 14,
  },

  confirmLuxuryText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.7,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalGlass: {
    width: "86%",
    borderRadius: 28,
    padding: 30,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  modalTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 10,
  },

  modalMessage: {
    color: "#ddd",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 24,
  },

  modalLuxuryBtn: {
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 38,
  },

  modalLuxuryText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "900",
  },

  headerText: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
    marginTop: 14,
    textAlign: "center",
  },
});
