import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Calendar,
  Fuel,
  MapPin,
  Minus,
  Plus,
  Star,
  Users
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/context/ThemeContext";
import { darkTheme, lightTheme } from "@/theme/colors";

const BASE_URL = "http://192.168.1.6:1000";

const getImageUrl = (img?: string) => {
  if (!img) return undefined;
  if (img.startsWith("http")) return img;
  return `${BASE_URL}${img}`;
};

export default function CarDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const name = String(params.name || "Defender");
  const brand = String(params.brand || "Land Rover");
  const image = String(params.image || "");
  const pricePerDay = Number(params.price || 5000);
  const tier = String(params.tier || "PLATINUM").toUpperCase();
  const city = String(params.city || "Mumbai");
  const seats = String(params.seats || "5");
  const fuel_type = String(params.fuel_type || "Petrol");
  const year = String(params.year || "2026");
  const rating = String(params.rating || "4.9");
  const description =
    String(params.description || "") ||
    "An ultra-luxury off-road SUV designed for comfort, power, and prestige. Experience commanding presence with premium interiors and refined performance.";

  const imageUrl = getImageUrl(image);

  // 🔥 USER SELECTED TRIP DAYS
  const [tripDays, setTripDays] = useState(6);

  const totalInvestment = useMemo(
    () => pricePerDay * tripDays,
    [pricePerDay, tripDays]
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* HERO */}
          <View style={styles.heroWrapper}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.heroImage} />
            ) : (
              <View
                style={[
                  styles.heroImage,
                  { backgroundColor: colors.card },
                ]}
              />
            )}

            <LinearGradient
              colors={["transparent", colors.background]}
              style={styles.heroOverlay}
            />

            <View style={styles.heroTextBlock}>
              <Text style={[styles.brandText, { color: colors.subText }]}>
                {brand}
              </Text>
              <Text style={[styles.carNameText, { color: colors.text }]}>
                {name}
              </Text>

              <View style={styles.badgeRow}>
                <View
                  style={[
                    styles.badgePill,
                    { borderColor: colors.primary },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      { color: colors.primary },
                    ]}
                  >{tier}
                  </Text>
                </View>

                <View
                  style={[
                    styles.ratingPill,
                    { borderColor: colors.border },
                  ]}
                >
                  <Star
                    size={14}
                    color={colors.primary}
                    fill={colors.primary}
                  />
                  <Text
                    style={[
                      styles.ratingText,
                      { color: colors.text },
                    ]}
                  >
                    {rating}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* QUICK SPECS */}
          <View style={styles.specGrid}>
            <SpecItem icon={<Users size={18} color={colors.primary} />} value={`${seats} Seats`} />
            <SpecItem icon={<Fuel size={18} color={colors.primary} />} value={fuel_type} />
            <SpecItem icon={<Calendar size={18} color={colors.primary} />} value={year} />
            <SpecItem icon={<MapPin size={18} color={colors.primary} />} value={city} />
          </View>

          {/* ABOUT */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionLabel,
                { color: colors.subText },
              ]}
            >
              About
            </Text>
            <Text
              style={[
                styles.aboutText,
                { color: colors.text },
              ]}
            >
              {description}
            </Text>
          </View>

          {/* REVIEW */}
          <View style={styles.section}>
            <Text
              style={[
                styles.sectionLabel,
                { color: colors.subText },
              ]}
            >
              Review
            </Text>

            <RowItem
              label="Service & Billing"
              value="Rental • Per Day"
              colors={colors}
            />

            {/* LOCATION TIMELINE */}
            <View style={styles.timeline}>
              <View
                style={[
                  styles.timelineDot,
                  { backgroundColor: colors.primary },
                ]}
              />
              <View
                style={[
                  styles.timelineLine,
                  { backgroundColor: colors.border },
                ]}
              />
              <View
                style={[
                  styles.timelineDot,
                  { backgroundColor: colors.primary },
                ]}
              />

              <View style={styles.timelineContent}>
                <Text
                  style={[
                    styles.timelineLabel,
                    { color: colors.subText },
                  ]}
                >
                  Pickup
                </Text>
                <Text
                  style={[
                    styles.timelineValue,
                    { color: colors.text },
                  ]}
                >
                  {city}
                </Text>

                <Text
                  style={[
                    styles.timelineLabel,
                    { color: colors.subText },
                  ]}
                >
                  Drop
                </Text>
                <Text
                  style={[
                    styles.timelineValue,
                    { color: colors.text },
                  ]}
                >
                  {city}
                </Text>
              </View>
            </View>

            {/* SCHEDULE */}
            <View style={styles.scheduleRow}>
              <ScheduleItem label="Pickup Date" value="18 Aug" colors={colors} />
              <ScheduleItem label="Return Date" value="24 Aug" colors={colors} />
              <ScheduleItem label="Time" value="10:00 AM" colors={colors} />
            </View>

            {/* 🔥 TRIP DURATION SELECTOR */}
            <View style={styles.durationRow}>
              <Text
                style={[
                  styles.durationLabel,
                  { color: colors.subText },
                ]}
              >
                Trip Duration
              </Text>

              <View
                style={[
                  styles.durationControl,
                  { backgroundColor: colors.card },
                ]}
              >
                <TouchableOpacity
                  onPress={() =>
                    setTripDays((d) => Math.max(1, d - 1))
                  }
                >
                  <Minus size={18} color={colors.text} />
                </TouchableOpacity>

                <Text
                  style={[
                    styles.durationValue,
                    { color: colors.text },
                  ]}
                >
                  {tripDays} Days
                </Text>

                <TouchableOpacity
                  onPress={() => setTripDays((d) => d + 1)}
                >
                  <Plus size={18} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* PRICING GLASS CARD */}
          <View
            style={[
              styles.glassCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.glassLabel,
                { color: colors.subText },
              ]}
            >
              Trip Duration
            </Text>
            <Text
              style={[
                styles.glassValue,
                { color: colors.text },
              ]}
            >
              {tripDays} Days
            </Text>

            <View
              style={[
                styles.glassDivider,
                { backgroundColor: colors.border },
              ]}
            />

            <Text
              style={[
                styles.glassLabel,
                { color: colors.subText },
              ]}
            >
              Total Investment
            </Text>
            <Text
              style={[
                styles.glassPrice,
                { color: colors.primary },
              ]}
            >
              ₹{totalInvestment}
            </Text>
          </View>
        </ScrollView>

        {/* CTA BAR */}
        <View
          style={[
            styles.bottomBar,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
            },
          ]}
        >
          <View>
            <Text
              style={[
                styles.priceLabel,
                { color: colors.subText },
              ]}
            >
              Price / Day
            </Text>
            <Text
              style={[
                styles.priceValue,
                { color: colors.text },
              ]}
            >
              ₹{pricePerDay}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: "/user/review-booking",
                params: {
                  ...params,
                  tripDays,
                  totalInvestment,
                },
              })
            }
          >
            <View
              style={[
                styles.ctaButton,
                {
                  backgroundColor: colors.primary,
                  shadowColor: colors.primary,
                },
              ]}
            >
              <Text style={styles.ctaText}>
                Confirm Booking
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const SpecItem = ({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) => (
  <View style={styles.specItem}>
    {icon}
    <Text style={styles.specText}>{value}</Text>
  </View>
);

const RowItem = ({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: any;
}) => (
  <View
    style={[
      styles.rowItem,
      { borderBottomColor: colors.border },
    ]}
  >
    <Text
      style={[
        styles.rowLabel,
        { color: colors.subText },
      ]}
    >
      {label}
    </Text>
    <Text
      style={[
        styles.rowValue,
        { color: colors.text },
      ]}
    >
      {value}
    </Text>
  </View>
);

const ScheduleItem = ({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: any;
}) => (
  <View style={styles.scheduleItem}>
    <Text
      style={[
        styles.scheduleLabel,
        { color: colors.subText },
      ]}
    >
      {label}
    </Text>
    <Text
      style={[
        styles.scheduleValue,
        { color: colors.text },
      ]}
    >
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },

  scrollContent: { paddingBottom: 160 },

  heroWrapper: { height: 420 },
  heroImage: { width: "100%", height: "100%" },
  heroOverlay: { position: "absolute", left: 0, right: 0, bottom: 0, top: 0 },

  heroTextBlock: {
    position: "absolute",
    bottom: 28,
    left: 20,
    right: 20,
  },

  brandText: {
    letterSpacing: 2,
    fontSize: 12,
    textTransform: "uppercase",
  },

  carNameText: {
    fontSize: 34,
    fontWeight: "900",
    marginTop: 4,
  },

  badgeRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },

  badgePill: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },

  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  ratingText: {
    fontSize: 13,
    fontWeight: "700",
  },

  specGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
    paddingHorizontal: 20,
  },

  specItem: {
    alignItems: "center",
    gap: 6,
  },

  specText: {
    fontSize: 13,
    fontWeight: "600",
  },

  section: {
    marginTop: 36,
    paddingHorizontal: 20,
  },

  sectionLabel: {
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 12,
    textTransform: "uppercase",
  },

  aboutText: {
    fontSize: 15,
    lineHeight: 26,
  },

  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 0.5,
  },

  rowLabel: {
    fontSize: 13,
  },

  rowValue: {
    fontSize: 14,
    fontWeight: "700",
  },

  timeline: {
    marginTop: 20,
    flexDirection: "row",
    gap: 14,
  },

  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  timelineLine: {
    width: 1,
    flex: 1,
    marginLeft: 3,
  },

  timelineContent: { flex: 1 },

  timelineLabel: {
    fontSize: 12,
    marginTop: 4,
  },

  timelineValue: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },

  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  scheduleItem: {
    alignItems: "center",
  },

  scheduleLabel: {
    fontSize: 11,
    letterSpacing: 1,
  },

  scheduleValue: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 6,
  },

  durationRow: {
    marginTop: 26,
  },

  durationLabel: {
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 10,
    textTransform: "uppercase",
  },

  durationControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  durationValue: {
    fontSize: 16,
    fontWeight: "800",
  },

  glassCard: {
    marginTop: 36,
    marginHorizontal: 20,
    padding: 22,
    borderRadius: 22,
    borderWidth: 1,
  },

  glassLabel: {
    fontSize: 12,
    letterSpacing: 1,
  },

  glassValue: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },

  glassDivider: {
    height: 1,
    marginVertical: 14,
  },

  glassPrice: {
    fontSize: 26,
    fontWeight: "900",
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderTopWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  priceLabel: {
    fontSize: 12,
    letterSpacing: 1,
  },

  priceValue: {
    fontSize: 22,
    fontWeight: "900",
  },

  ctaButton: {
    borderRadius: 999,
    paddingHorizontal: 28,
    paddingVertical: 14,
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 10,
  },

  ctaText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.6,
  },
});
