import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_BASE_URL = "http://192.168.1.6:1000"; // your backend IP

type Car = {
  id: number;
  name: string;
  brand: string;
  cars_image: string;
  price_per_day: number;
  badge: string;
  seats: number;
  fuel_type: string;
  city: string;
};

const AvailableCars = () => {
  const params = useLocalSearchParams();

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  // FILTER STATE
  const [filterVisible, setFilterVisible] = useState(false);
  const [location, setLocation] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [seats, setSeats] = useState("All");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("99999");

  useEffect(() => {
    console.log("SEARCH PARAMS:", params);
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);

      const queryObj: any = { available: "1" };

if (location && location !== "All") queryObj.city = location;
if (fuel && fuel !== "All") queryObj.fuel_type = fuel;
if (seats && seats !== "All") queryObj.seats = seats;
if (minPrice && minPrice !== "0") queryObj.min_price = minPrice;
if (maxPrice && maxPrice !== "99999") queryObj.max_price = maxPrice;

const query = new URLSearchParams(queryObj).toString();


      console.log("FINAL QUERY:", query);

      const res = await fetch(`${API_BASE_URL}/cars/filter?${query}`);
      const data = await res.json();

      console.log("CARS API RESPONSE:", data);

      if (Array.isArray(data)) {
        setCars(data);
      } else {
        setCars([]);
      }
    } catch (err) {
      console.error("Fetch cars error:", err);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
  setFilterVisible(false);
  fetchCars();  
};
  

const renderCar = ({ item }: { item: any }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() =>
      router.push({
        pathname: "/user/car-details",
        params: {
          name: item.name,
    image: item.cars_image,
    price: String(item.price_per_day),
    tier: item.badge,
    city: item.city,
    seats: String(item.seats),
    fuel_type: item.fuel_type,
    rating: String(item.rating || "0"),

    service: params.service,
    billing: params.billing,
    pickupLocation: params.pickupLocation,
    dropLocation: params.dropLocation,
    pickupDate: params.pickupDate,
    returnDate: params.returnDate,
    pickupTime: params.pickupTime,
        },
      })
    }
  >
    <Image
      source={{ uri: `${API_BASE_URL}${item.cars_image}` }}
      style={styles.image}
    />

    <View style={styles.info}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.brand}>
        {item.brand} • {item.city}
      </Text>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>
          {item.seats} Seats • {item.fuel_type}
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {item.badge || "STANDARD"}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.price}>₹{item.price_per_day}</Text>

        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() =>
            router.push({
              pathname: "/user/car-details",
              params: { carId: item.id },
            })
          }
        >
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#5D3FD3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Available Cars</Text>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setFilterVisible(true)}
        >
          <Feather name="sliders" size={18} color="#fff" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* CARS LIST */}
      <FlatList
        data={cars}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderCar}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />

      {/* FILTER MODAL */}
      <Modal
        visible={filterVisible}
        animationType="slide"
        transparent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Cars</Text>

            {/* Location */}
            <Text style={styles.label}>Location</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={location}
                onValueChange={setLocation}
                style={styles.picker}
                dropdownIconColor="#aaa"
              >
                <Picker.Item label="All" value="All" />
                <Picker.Item label="Pune" value="Pune" />
                <Picker.Item label="Mumbai" value="Mumbai" />
                <Picker.Item label="Delhi" value="Delhi" />
              </Picker>
            </View>

            {/* Fuel */}
            <Text style={styles.label}>Fuel</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={fuel}
                onValueChange={setFuel}
                style={styles.picker}
                dropdownIconColor="#aaa"
              >
                <Picker.Item label="All" value="All" />
                <Picker.Item label="Petrol" value="Petrol" />
                <Picker.Item label="Diesel" value="Diesel" />
                <Picker.Item label="Electric" value="Electric" />
              </Picker>
            </View>

            {/* Seats */}
            <Text style={styles.label}>Seats</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={seats}
                onValueChange={setSeats}
                style={styles.picker}
                dropdownIconColor="#aaa"
              >
                <Picker.Item label="All" value="All" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="7" value="7" />
              </Picker>
            </View>

            {/* Min Price */}
            <Text style={styles.label}>Min Price</Text>
            <View style={styles.inputCard}>
              <TextInput
                value={minPrice}
                onChangeText={setMinPrice}
                keyboardType="numeric"
                style={styles.input}
                placeholder="0"
                placeholderTextColor="#888"
              />
            </View>

            {/* Max Price */}
            <Text style={styles.label}>Max Price</Text>
            <View style={styles.inputCard}>
              <TextInput
                value={maxPrice}
                onChangeText={setMaxPrice}
                keyboardType="numeric"
                style={styles.input}
                placeholder="99999"
                placeholderTextColor="#888"
              />
            </View>

            {/* BUTTONS */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => {
                  setLocation("All");
                  setFuel("All");
                  setSeats("All");
                  setMinPrice("0");
                  setMaxPrice("99999");
                }}
              >
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyBtn}
                onPress={applyFilters}
              >
                <Text style={styles.applyText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setFilterVisible(false)}
            >
              <Feather name="x" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AvailableCars;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 20,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5D3FD3",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },

  filterText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  center: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#121212",
    borderRadius: 18,
    marginBottom: 16,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 180,
  },

  info: {
    padding: 14,
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  brand: {
    color: "#aaa",
    marginTop: 2,
    fontSize: 13,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  meta: {
    color: "#aaa",
    fontSize: 13,
  },

  badge: {
    backgroundColor: "#5D3FD3",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  price: {
    color: "#5D3FD3",
    fontSize: 16,
    fontWeight: "700",
  },

  bookBtn: {
    backgroundColor: "#00a86b",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },

  bookText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#121212",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: "65%",
  },

  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  label: {
    color: "#aaa",
    marginBottom: 6,
    marginTop: 12,
    fontSize: 13,
  },

  pickerWrapper: {
    backgroundColor: "#000",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 10,
  },

  picker: {
    color: "#fff",
  },

  inputCard: {
    backgroundColor: "#000",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },

  input: {
    color: "#fff",
    fontSize: 14,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  clearBtn: {
    flex: 1,
    backgroundColor: "#222",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
    marginRight: 10,
  },

  clearText: {
    color: "#aaa",
    fontWeight: "700",
  },

  applyBtn: {
    flex: 1,
    backgroundColor: "#5D3FD3",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
  },

  applyText: {
    color: "#fff",
    fontWeight: "700",
  },

  closeBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "#222",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
