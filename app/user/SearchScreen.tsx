import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
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

import { useTheme } from "../../context/ThemeContext";

const SearchScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();

  const [service, setService] = useState<"rental" | "transfer">("rental");
  const [billing, setBilling] = useState("Per Day");

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");

  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<Date | null>(null);

  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const isTwoWay = service === "rental";

  const handleSearch = () => {
    router.push({
      pathname: "user/available-cars",
      params: {
        service,
        billing,
        pickupLocation,
        dropLocation,
        pickupDate: pickupDate ? pickupDate.toISOString() : null,
        pickupTime: pickupTime ? pickupTime.toISOString() : null,
        returnDate: isTwoWay && returnDate ? returnDate.toISOString() : null,
      },
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* TITLE */}
      <Text style={[styles.title, { color: colors.text }]}>Find Your Car</Text>
      <Text style={[styles.subtitle, { color: colors.subtext }]}>
        Fill in the details to search available vehicles
      </Text>

      {/* SERVICE TOGGLE */}
      <View
        style={[styles.toggleContainer, { backgroundColor: colors.card }]}
      >
        <TouchableOpacity
          style={[
            styles.toggleButton,
            service === "rental" && { backgroundColor: colors.primary },
          ]}
          onPress={() => setService("rental")}
        >
          <Text
            style={[
              styles.toggleText,
              service === "rental" && { color: colors.text },
            ]}
          >
            Rental (Two-way)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            service === "transfer" && { backgroundColor: colors.primary },
          ]}
          onPress={() => setService("transfer")}
        >
          <Text
            style={[
              styles.toggleText,
              service === "transfer" && { color: colors.text },
            ]}
          >
            Transfer (One-way)
          </Text>
        </TouchableOpacity>
      </View>

      {/* BILLING DROPDOWN */}
      <View style={[styles.inputCard, { backgroundColor: colors.card }]}>
        <Feather name="dollar-sign" size={20} color={colors.primary} />
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={billing}
            onValueChange={(val) => setBilling(val)}
            style={[styles.picker, { color: colors.text }]}
            dropdownIconColor={colors.subtext}
          >
            <Picker.Item label="Per Day" value="Per Day" />
            <Picker.Item label="Per KM" value="Per KM" />
          </Picker>
        </View>
      </View>

      {/* PICKUP LOCATION */}
      <View style={[styles.inputCard, { backgroundColor: colors.card }]}>
        <Feather name="map-pin" size={20} color={colors.primary} />
        <TextInput
          placeholder="Pickup Location"
          placeholderTextColor={colors.subtext}
          style={[styles.input, { color: colors.text }]}
          value={pickupLocation}
          onChangeText={setPickupLocation}
        />
      </View>

      {/* DROP LOCATION */}
      <View style={[styles.inputCard, { backgroundColor: colors.card }]}>
        <Feather name="map-pin" size={20} color={colors.primary} />
        <TextInput
          placeholder="Drop Location"
          placeholderTextColor={colors.subtext}
          style={[styles.input, { color: colors.text }]}
          value={dropLocation}
          onChangeText={setDropLocation}
        />
      </View>

      {/* PICKUP DATE */}
      <TouchableOpacity
        style={[styles.inputCard, { backgroundColor: colors.card }]}
        onPress={() => setShowPickupPicker(true)}
      >
        <Feather name="calendar" size={20} color={colors.primary} />
        <Text style={[styles.dateText, { color: colors.text }]}>
          {pickupDate ? pickupDate.toDateString() : "Pickup Date"}
        </Text>
      </TouchableOpacity>

      {showPickupPicker && (
        <DateTimePicker
          value={pickupDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowPickupPicker(false);
            if (selectedDate) setPickupDate(selectedDate);
          }}
        />
      )}

      {/* PICKUP TIME */}
      <TouchableOpacity
        style={[styles.inputCard, { backgroundColor: colors.card }]}
        onPress={() => setShowTimePicker(true)}
      >
        <Feather name="clock" size={20} color={colors.primary} />
        <Text style={[styles.dateText, { color: colors.text }]}>
          {pickupTime ? pickupTime.toLocaleTimeString() : "Pickup Time"}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={pickupTime || new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setPickupTime(selectedTime);
          }}
        />
      )}

      {/* RETURN DATE (ONLY FOR RENTAL) */}
      {isTwoWay && (
        <>
          <TouchableOpacity
            style={[styles.inputCard, { backgroundColor: colors.card }]}
            onPress={() => setShowReturnPicker(true)}
          >
            <Feather name="calendar" size={20} color={colors.primary} />
            <Text style={[styles.dateText, { color: colors.text }]}>
              {returnDate ? returnDate.toDateString() : "Return Date"}
            </Text>
          </TouchableOpacity>

          {showReturnPicker && (
            <DateTimePicker
              value={returnDate || new Date()}
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

      {/* SEARCH BUTTON */}
      <TouchableOpacity
        onPress={handleSearch}
        style={[styles.searchButton, { backgroundColor: colors.primary }]}
      >
        <Text
          style={[styles.searchButtonText, { color: colors.buttonText }]}
        >
          Search Available Cars
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 4,
  },

  subtitle: {
    marginBottom: 20,
  },

  /* Toggle Switch */
  toggleContainer: {
    flexDirection: "row",
    borderRadius: 30,
    padding: 4,
    marginBottom: 20,
    marginTop: 10,
  },

  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },

  toggleText: {
    color: "#aaa",
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
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
  },

  dateText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
  },

  pickerWrapper: {
    flex: 1,
    marginLeft: 12,
  },

  picker: {},

  /* Search Button */
  searchButton: {
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 25,
  },

  searchButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
