import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Shield } from "lucide-react-native";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const allCars = [
  {
    name: "Rolls Royce Ghost",
    price: "₹45,000/day",
    tier: "Platinum",
    image: "https://images.unsplash.com/photo-1617704548623-340376564e68",
  },
  {
    name: "Maybach S-Class",
    price: "₹42,000/day",
    tier: "Platinum",
    image: "https://images.unsplash.com/photo-1617704548623-340376564e68",
  },
  {
    name: "BMW M5",
    price: "₹28,000/day",
    tier: "Gold",
    image: "https://images.unsplash.com/photo-1617704548623-340376564e68",
  },
  {
    name: "Audi A8",
    price: "₹26,000/day",
    tier: "Gold",
    image: "https://images.unsplash.com/photo-1617704548623-340376564e68",
  },
  {
    name: "Tesla Model S",
    price: "₹22,000/day",
    tier: "Silver",
    image: "https://images.unsplash.com/photo-1617704548623-340376564e68",
  },
  {
    name: "Lexus ES",
    price: "₹20,000/day",
    tier: "Silver",
    image: "https://images.unsplash.com/photo-1617704548623-340376564e68",
  },
];

export default function TierCars() {
  const { tier } = useLocalSearchParams<{ tier: string }>();

  const filteredCars = allCars.filter((car) => car.tier === tier);

  return (
    <LinearGradient colors={["#020617", "#0F172A"]} style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        
        {/* BACK BUTTON */}
        <Pressable onPress={() => router.back()} style={{ marginBottom: 12 }}>
          <ChevronLeft color="white" size={26} />
        </Pressable>

        <Text style={styles.header}>{tier} Cars</Text>

        {filteredCars.map((car) => (
          <View key={car.name} style={styles.carCard}>
            <Image source={{ uri: car.image }} style={styles.carImage} />

            <View style={{ flex: 1 }}>
              <Text style={styles.carName}>{car.name}</Text>

              <View style={styles.securityRow}>
                <Shield size={14} color="#22C55E" />
                <Text style={styles.secureText}>
                  100% Secure & Tracked
                </Text>
              </View>

              <Text style={styles.price}>{car.price}</Text>

              <TouchableOpacity
                style={styles.bookBtn}
                onPress={() =>
                  router.push({
                    pathname: "/explore/booking",
                    params: { car: car.name, price: car.price },
                  })
                }
              >
                <Text style={styles.bookText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 16,
    marginTop: 8,
  },

  carCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    alignItems: "center",
  },

  carImage: {
    width: 90,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
  },

  carName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  secureText: {
    color: "#22C55E",
    fontSize: 12,
    marginLeft: 6,
  },

  price: {
    color: "#FFD700",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 6,
  },

  bookBtn: {
    marginTop: 10,
    backgroundColor: "#D4AF37",
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: "center",
  },

  bookText: {
    color: "#020617",
    fontWeight: "800",
    fontSize: 13,
  },
});
