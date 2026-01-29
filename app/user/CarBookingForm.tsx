import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform } from "react-native";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@/context/ThemeContext";
import { darkTheme, lightTheme } from "@/theme/colors";

const CarBookingForm = () => {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [tripType, setTripType] = useState("oneWay");

  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Toggle Switch */}
      <View
        style={[
          styles.toggleContainer,
          { backgroundColor: colors.card },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.toggleButton,
            tripType === "oneWay" && { backgroundColor: colors.primary },
          ]}
          onPress={() => setTripType("oneWay")}
        >
          <Text
            style={[
              styles.toggleText,
              { color: colors.subText },
              tripType === "oneWay" && { color: "#fff" },
            ]}
          >
            One Way
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            tripType === "twoWay" && { backgroundColor: colors.primary },
          ]}
          onPress={() => setTripType("twoWay")}
        >
          <Text
            style={[
              styles.toggleText,
              { color: colors.subText },
              tripType === "twoWay" && { color: "#fff" },
            ]}
          >
            Two Way
          </Text>
        </TouchableOpacity>
      </View>

      {/* Pickup Location */}
      <View
        style={[
          styles.inputCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Feather name="map-pin" size={20} color={colors.primary} />
        <TextInput
          placeholder="Pickup Location"
          placeholderTextColor={colors.subText}
          style={[styles.input, { color: colors.text }]}
        />
      </View>

      {/* Drop Location (Only for Two Way) */}
      {tripType === "twoWay" && (
        <View
          style={[
            styles.inputCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Feather name="map-pin" size={20} color={colors.primary} />
          <TextInput
            placeholder="Drop Location"
            placeholderTextColor={colors.subText}
            style={[styles.input, { color: colors.text }]}
          />
        </View>
      )}

      {/* Pickup Date */}
      <TouchableOpacity
        style={[
          styles.inputCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
        onPress={() => setShowPickupPicker(true)}
      >
        <Feather name="calendar" size={20} color={colors.primary} />
        <Text style={[styles.dateText, { color: colors.text }]}>
          {pickupDate ? pickupDate.toDateString() : "Pickup Date"}
        </Text>
      </TouchableOpacity>

      {showPickupPicker && (
        <DateTimePicker
          value={pickupDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowPickupPicker(false);
            if (selectedDate) setPickupDate(selectedDate);
          }}
        />
      )}

      {/* Return Date (Only for Two Way) */}
      {tripType === "twoWay" && (
        <>
          <TouchableOpacity
            style={[
              styles.inputCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={() => setShowReturnPicker(true)}
          >
            <Feather name="calendar" size={20} color={colors.primary} />
            <Text style={[styles.dateText, { color: colors.text }]}>
              {returnDate ? returnDate.toDateString() : "Return Date"}
            </Text>
          </TouchableOpacity>

          {showReturnPicker && (
            <DateTimePicker
              value={returnDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowReturnPicker(false);
                if (selectedDate) setReturnDate(selectedDate);
              }}
            />
          )}
        </>
      )}

      {/* Search Button */}
      <TouchableOpacity
        style={[styles.searchButton, { backgroundColor: colors.primary }]}
      >
        <Text style={styles.searchButtonText}>Search Cars</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CarBookingForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },

  /* Toggle Switch */
  toggleContainer: {
    flexDirection: "row",
    borderRadius: 30,
    padding: 4,
    marginBottom: 30,
    marginTop: 20,
  },

  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },

  dateText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
  },

  toggleText: {
    fontSize: 14,
    fontWeight: "600",
  },

  /* Input Cards */
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 15,
    borderWidth: 1,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
  },

  /* Search Button */
  searchButton: {
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 30,
  },

  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
