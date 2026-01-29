import { Animated, Easing } from "react-native";
import CarFilterModal from "../../components/CarFilterModal";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { filterCars, getAllCars } from "../../api/cars";
import { useTheme } from "../../context/ThemeContext";
import { darkTheme, lightTheme } from "../../theme/colors";
import CustomDrawer from "./CustomDrawer";

const BASE_URL = "http://192.168.1.6:1000";

const SobGOGHomeScreen = () => {
  const router = useRouter();

  const { theme, toggleTheme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const slideAnim = useState(new Animated.Value(-400))[0];

  const openFilters = () => {
    setShowFilters(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 280,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeFilters = () => {
    Animated.timing(slideAnim, {
      toValue: -400,
      duration: 220,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setShowFilters(false));
  };

  useEffect(() => {
    console.log("CURRENT THEME (CarBookingForm):", theme);
  }, [theme]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [filterVisible, setFilterVisible] = useState(false);


  const tiers = [
    {
      key: "PLATINUM",
      name: "Platinum",
      desc: "The Ultimate Luxury (Rolls Royce, Maybach)",
      bg: ["#1A1A1D", "#198dbb"],
      glow: "#B4B4B4",
      info: [
        "Most popular luxury cars",
        "Rolls Royce, Maybach, Lamborghini",
        "AI Surveillance + Live GPS",
        "Chauffeur Option Available",
        "24/7 Premium Support",
      ],
    },
    {
      key: "GOLD",
      name: "Gold",
      desc: "Premium Performance (BMW, Mercedes, Audi)",
      bg: ["#D4AF37", "#8A6623"],
      glow: "#D4AF37",
      info: [
        "Premium segment cars",
        "Mercedes, BMW, Audi",
        "Live GPS Tracking",
        "Self-drive & Chauffeur",
        "24/7 Support",
      ],
    },
    {
      key: "SILVER",
      name: "Silver",
      desc: "Executive Comfort (Lexus, Volvo, Tesla)",
      bg: ["#71706E", "#E5E4E2"],
      glow: "#E5E4E2",
      info: [
        "Affordable executive cars",
        "Lexus, Volvo, Tesla",
        "GPS Enabled",
        "Self-drive",
        "Standard Support",
      ],
    },
  ];

  const applyFilters = async (filtersData: any) => {
    try {
      const params: any = {};

      Object.entries(filtersData).forEach(([key, value]) => {
        if (
          value !== "" &&
          value !== "all" &&
          value !== null &&
          !(Array.isArray(value) && value.length === 0)
        ) {
          params[key] = Array.isArray(value) ? value.join(",") : value;
        }
      });

      const res = await filterCars(params);
      setCars(res.data);
    } catch (err) {
      console.log("FILTER ERROR", err);
    }
  };

  const [cars, setCars] = useState<any[]>([]);
  const [likedCars, setLikedCars] = useState<Record<number, boolean>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [filters, setFilters] = useState({
    category_id: "",
    brand: "",
    city: "",
    fuel_type: "",
    seats: "",
    min_price: "",
    max_price: "",
    badge: "all",
  });

  const mapModalFiltersToApi = (selected: any) => {
  const params: any = {};

  if (selected.Brand?.length) params.brand = selected.Brand.join(",");
  if (selected.City?.length) params.city = selected.City.join(",");
  if (selected.FuelType?.length) params.fuel_type = selected.FuelType[0];
  if (selected.Seats?.length)
    params.seats = selected.Seats[0].split(" ")[0];

  if (selected.Price?.length) {
    const p = selected.Price[0];
    if (p === "< ₹2000") params.max_price = 2000;
    if (p === "₹2000 - ₹5000") {
      params.min_price = 2000;
      params.max_price = 5000;
    }
    if (p === "> ₹5000") params.min_price = 5000;
  }

  if (selected.Rating?.length) {
    params.min_rating = selected.Rating[0].startsWith("4") ? 4 : 3;
  }

  return params;
};


  const [selectedTier, setSelectedTier] = useState<any>(null);
  const [showTierModal, setShowTierModal] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchText.trim() !== "") {
        // ← FIXED: changed name → brand
        const newFilters = { ...filters, brand: searchText };
        setFilters(newFilters);
        applyFilters(newFilters);
      } else {
        loadCars();
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `${BASE_URL}${imagePath}`;
  };

  const toggleLike = (id: number) => {
    setLikedCars((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const res = await getAllCars();
      setCars(res.data);
    } catch (err) {
      console.log("GET CARS ERROR", err);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setDrawerOpen(true)}>
          <Ionicons name="menu" size={26} color={colors.text} />
        </TouchableOpacity>

        {/* 🔥 CarHub = Theme Toggle Button */}
        <TouchableOpacity activeOpacity={0.7} onPress={toggleTheme}>
          <Text style={[styles.logo, { color: colors.text }]}>
            Car<Text style={{ color: colors.primary }}>Hub</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="heart" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroText, { color: colors.text }]}>
            Ready for your next drive?
          </Text>

          <View style={styles.searchRow}>
            <TextInput
              placeholder="Search for a car"
              placeholderTextColor={theme === "dark" ? "#888" : "#666"}
              style={[
                styles.searchInput,
                {
                  backgroundColor:
                    theme === "dark"
                      ? "#121212"
                      : "rgba(255,255,255,0.9)",
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              value={searchText}
              onChangeText={setSearchText}
            />

            <TouchableOpacity
              style={[
                styles.filterButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={() => setFilterVisible(true)}

            >
              <Ionicons name="options" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tier Cards */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Choose Your Tier
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tiers.map((tier) => (
            <TouchableOpacity
              key={tier.key}
              activeOpacity={0.9}
              onPress={() => {
                setSelectedTier(tier);
                setShowTierModal(true);
              }}
              style={{ marginRight: 14 }}
            >
              <LinearGradient
                colors={tier.bg}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.tierCard,
                  {
                    shadowColor: tier.glow,
                  },
                ]}
              >
                <Text style={styles.tierCardTitle}>{tier.name}</Text>
                <Text style={styles.tierCardDesc}>{tier.desc}</Text>
                <Text style={styles.securityText}>✔ Security Verified</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recommended */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recommended for You
          </Text>
        </View>

        {cars.slice(0, 6).map((car) => (
          <TouchableOpacity
            key={car.id}
            style={[
              styles.recommendCard,
              {
                backgroundColor:
                  theme === "dark"
                    ? "#1b1b1b"
                    : "rgba(255,255,255,0.95)",
                borderColor: colors.border,
              },
            ]}
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: "/user/car-details",
                params: {
                  name: car.name,
                  image: car.cars_image,
                  price: car.price_per_day,
                  tier: car.badge,
                  city: car.city,
                  seats: car.seats,
                  fuel_type: car.fuel_type,
                  rating: car.rating,
                },
              })
            }
          >
            {/* Tier Tag */}
            <View
              style={[
                styles.tierTag,
                car.badge === "PLATINUM" && styles.platinumTag,
                car.badge === "GOLD" && styles.goldTag,
                car.badge === "SILVER" && styles.silverTag,
              ]}
            >
              <Text style={styles.tierTagText}>{car.badge}</Text>
            </View>

            {/* Like */}
            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => toggleLike(car.id)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={likedCars[car.id] ? "heart" : "heart-outline"}
                size={18}
                color={likedCars[car.id] ? "#ff4d6d" : colors.text}
              />
            </TouchableOpacity>

            {/* Image */}
            <Image
              source={{ uri: getImageUrl(car.cars_image) }}
              style={styles.recommendImage}
            />

            {/* Info */}
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text
                style={[styles.recommendTitle, { color: colors.text }]}
              >
                {car.name}
              </Text>

              <View style={styles.metaRow}>
                <Text style={[styles.metaText, { color: colors.subText }]}>
                  📍 {car.city}
                </Text>
              </View>

              <Text style={styles.recommendPrice}>
                ₹{car.price_per_day}/day
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Nav */}
      <View
        style={[
          styles.bottomNav,
          {
            backgroundColor:
              theme === "dark"
                ? "#121212"
                : "rgba(255,255,255,0.95)",
          },
        ]}
      >
        <Ionicons name="home-outline" size={24} color={colors.text} />

        <TouchableOpacity
          onPress={() => router.push("/user/EventBookingPage")}
        >
          <Ionicons
            name="calendar-outline"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/user/SearchScreen")}
        >
          <Ionicons
            name="search-outline"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
           
        <Ionicons name="person-outline" size={24} color={colors.text} />
      </View>

      {/* Tier Modal */}
      {showTierModal && selectedTier && (
        <View style={styles.filterOverlay}>
          <LinearGradient
            colors={selectedTier.bg}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.tierBorderWrapper}
          >
            <View
              style={[
                styles.tierModal,
                {
                  backgroundColor:
                    theme === "dark"
                      ? "#0f172a"
                      : "#ffffff",
                },
              ]}
            >
              <Text
                style={[
                  styles.tierModalTitle,
                  { color: colors.text },
                ]}
              >
                {selectedTier.name} Tier
              </Text>

              <Text
                style={[
                  styles.tierModalSub,
                  { color: colors.subText },
                ]}
              >
                {selectedTier.desc}
              </Text>

              {selectedTier.info.map((line: string, i: number) => (
                <Text
                  key={i}
                  style={[
                    styles.tierModalItem,
                    { color: colors.text },
                  ]}
                >
                  • {line}
                </Text>
              ))}

              <TouchableOpacity
                style={styles.exploreButton}
                onPress={() => {
                  setShowTierModal(false);
                  const newFilters = {
                    ...filters,
                    badge: selectedTier.key,
                  };
                  setFilters(newFilters);
                  applyFilters(newFilters);
                }}
              >
                <Text style={styles.exploreButtonText}>
                  Explore Cars
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowTierModal(false)}
                style={styles.cancelTierButton}
              >
                <Text
                  style={[
                    styles.cancelButtonText,
                    { color: colors.text },
                  ]}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      )}

      {/* Drawer */}
      <CustomDrawer
        activeItem="Explore Fleets"
        onItemPress={() => {}}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <CarFilterModal
  visible={filterVisible}
  onClose={() => setFilterVisible(false)}
  onApply={(selected) => {
    applyFilters(mapModalFiltersToApi(selected));
    setFilterVisible(false);
  }}
/>


    </View>
  );
};

export default SobGOGHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: {
    fontSize: 22,
    fontWeight: "bold",
  },
  heroSection: {
    marginBottom: 25,
  },
  heroText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
    borderWidth: 1,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHeader: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tierCard: {
    width: 220,
    height: 140,
    borderRadius: 20,
    padding: 16,
    marginRight: 14,
    justifyContent: "space-between",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  tierCardTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  tierCardDesc: {
    color: "#eaeaea",
    fontSize: 13,
  },
  securityText: {
    color: "#4ade80",
    fontSize: 12,
  },
  recommendCard: {
    flexDirection: "row",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    alignItems: "center",
    borderWidth: 1,
  },
  recommendImage: {
    width: 90,
    height: 70,
    borderRadius: 10,
  },
  recommendTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  recommendPrice: {
    color: "#f5c542",
    fontSize: 14,
    marginTop: 6,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderRadius: 20,
    marginBottom: 18,
  },
  filterOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,

    justifyContent: "center",  
    alignItems: "center",       
    backgroundColor: "rgba(0,0,0,0.4)", 
  },

  tierModal: {
    borderRadius: 24,
    padding: 20,
  },
  tierModalTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  tierModalSub: {
    fontSize: 14,
    marginBottom: 14,
  },
  tierModalItem: {
    fontSize: 14,
    marginBottom: 8,
  },
  exploreButton: {
    backgroundColor: "#f5c542",
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 14,
  },
  exploreButtonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  cancelTierButton: {
    marginTop: 12,
    alignSelf: "center",
  },
  cancelButtonText: {
    fontSize: 16,
  },
  tierBorderWrapper: {
    width: "92%",
    borderRadius: 26,
    padding: 2.5,
    shadowColor: "#f5c542",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 12,
  },
  tierTag: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    zIndex: 10,
  },
  platinumTag: {
    backgroundColor: "#5D3FD3",
  },
  goldTag: {
    backgroundColor: "#D4AF37",
  },
  silverTag: {
    backgroundColor: "#9CA3AF",
  },
  tierTagText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  metaText: {
    fontSize: 12,
    marginRight: 10,
  },
  likeButton: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  filterInput: {
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 1,
    borderWidth: 1,
    marginBottom: 10,
  },

  filterPanel: {
    width: "90%",
    borderRadius: 26,
    padding: 18,
  },

  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  filterSheet: {
    position: "absolute",
    top: 120,
    alignSelf: "center",
    width: "88%",

    backgroundColor: "#fff",
    borderRadius: 24,

    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,

    maxHeight: 320,

    overflow: "hidden",
  },

  filterTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },

  filterCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  filterLabel: {
    fontSize: 13,
    marginBottom: 6,
  },

  filterValue: {
    fontSize: 16,
  },

  applyFilterBtn: {
    backgroundColor: "#f5c542",
    borderRadius: 16,
    paddingVertical: 10,
    marginTop: 8,
  },

  applyFilterText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },

  resetFilterBtn: {
    marginTop: 8,
    alignSelf: "center",
  },

  resetFilterText: {
    fontSize: 16,
  },
});
