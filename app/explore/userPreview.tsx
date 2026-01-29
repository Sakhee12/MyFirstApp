import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Shield } from "lucide-react-native";
import { useRef, useState } from "react";

import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const tierDetails = {
  Platinum: {
    title: "Platinum Tier",
    desc: "The ultimate luxury experience with top-tier security.",
    features: [
      "Most popular luxury cars",
      "Rolls Royce, Maybach, Lamborghini",
      "AI Surveillance + Live GPS",
      "Chauffeur Option Available",
      "24/7 Premium Support",
    ],
  },
  Gold: {
    title: "Gold Tier",
    desc: "Premium performance with high-end comfort.",
    features: [
      "BMW, Mercedes, Audi",
      "High-speed GPS Tracking",
      "Biometric Entry System",
      "Priority Customer Support",
    ],
  },
  Silver: {
    title: "Silver Tier",
    desc: "Executive comfort with standard luxury features.",
    features: [
      "Tesla, Lexus, Volvo",
      "Standard Tracking",
      "Remote Lock/Unlock",
      "Affordable Luxury",
    ],
  },
};

const tiers = [
  {
    name: "Platinum",
    desc: "The Ultimate Luxury (Rolls Royce, Maybach)",
    bg: ["#1A1A1D", "#198dbb"],
    glow: "#B4B4B4",
  },
  {
    name: "Gold",
    desc: "Premium Performance (BMW, Mercedes, Audi)",
    bg: ["#D4AF37", "#8A6623"],
    glow: "#D4AF37",
  },
  {
    name: "Silver",
    desc: "Executive Comfort (Lexus, Volvo, Tesla)",
    bg: ["#71706E", "#E5E4E2"],
    glow: "#E5E4E2",
  },
];

const cars = [
  {
    name: "Rolls Royce Ghost",
    price: "₹45,000/day",
    image:
      "https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "BMW M5",
    price: "₹28,000/day",
    image:
      "https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Tesla Model S",
    price: "₹22,000/day",
    image:
      "https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=800&q=80",
  },
];

export default function UserExplore() {
  const scrollRef = useRef<ScrollView>(null);
  const carSectionRef = useRef<View>(null);


  const [activeTier, setActiveTier] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] =
    useState<null | keyof typeof tierDetails>(null);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  

  const animateCard = (tier: string) => {
    setActiveTier(tier);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleExploreCars = () => {
  setSelectedTier(null);

  setTimeout(() => {
    scrollRef.current?.scrollTo({
      y: 650,   // 👈 bigger value
      animated: true,
    });
  }, 200);
};


  return (
    <>
      <ScrollView
        ref={scrollRef}
        style={styles.wrap}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <Text style={styles.header}>Welcome to CarHub</Text>
        <Text style={styles.subHeader}>
          Your gateway to secure & luxury rides
        </Text>

        {/* TIERS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 20 }}
        >
          {tiers.map((tier) => (
            <TouchableOpacity
              key={tier.name}
              onPress={() => {
                animateCard(tier.name);
                setSelectedTier(tier.name as keyof typeof tierDetails);
              }}
              activeOpacity={0.9}
            >
              <Animated.View
                style={[
                  styles.tierWrap,
                  activeTier === tier.name && {
                    transform: [{ scale: scaleAnim }],
                    shadowColor: tier.glow,
                    shadowOpacity: 0.9,
                    shadowRadius: 18,
                  },
                ]}
              >
                <LinearGradient colors={tier.bg} style={styles.tierCard}>
                  <Text style={styles.tierTitle}>{tier.name}</Text>
                  <Text style={styles.tierDesc}>{tier.desc}</Text>
                  <Text style={styles.badge}>✔ Security Verified</Text>
                </LinearGradient>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* RECOMMENDED */}
        <Text
  ref={carSectionRef}
  style={styles.sectionTitle}
>
  Recommended for You
</Text>


        {cars.map((car) => (
          <View key={car.name} style={styles.carCard}>
            <Image source={{ uri: car.image }} style={styles.carImage} />

            <View style={{ flex: 1 }}>
              <Text style={styles.carName}>{car.name}</Text>

              <View style={styles.securityRow}>
                <Shield size={14} color="#22C55E" />
                <Text style={styles.secureText}>100% Secure & Tracked</Text>
              </View>

              <Text style={styles.price}>{car.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* MODAL */}
      {selectedTier && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {tierDetails[selectedTier].title}
            </Text>

            <Text style={styles.modalDesc}>
              {tierDetails[selectedTier].desc}
            </Text>

            {tierDetails[selectedTier].features.map((item, index) => (
              <Text key={index} style={styles.modalFeature}>
                • {item}
              </Text>
            ))}

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
              setSelectedTier(null);
              router.push({
             pathname: "/explore/tierCars",
    params: { tier: selectedTier },
  });
}} >
              <Text style={styles.closeText}>Explore Cars</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 16, backgroundColor: "#0F0F10" },

  header: {
    color: "#fff",
    fontSize: 28,
    marginTop: 0,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.5,
  },

  subHeader: {
    color: "#e3e9f1",
    fontSize: 13,
    textAlign: "center",
    marginTop: 2,
    lineHeight: 18,
  },

  tierWrap: {
    marginRight: 14,
    borderRadius: 22,
  },

  tierCard: {
    width: 250,
    height: 160,
    borderRadius: 22,
    padding: 16,
    justifyContent: "space-between",
  },

  tierTitle: { color: "#fff", fontSize: 22, fontWeight: "700" },
  tierDesc: { color: "#E5E7EB", fontSize: 13 },
  badge: { color: "#22C55E", fontSize: 12 },

  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 18,
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
    fontSize: 16,
    fontWeight: "800",
    marginTop: 6,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#0F172A",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D4AF37",
  },

  modalTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
    textAlign: "center",
  },

  modalDesc: {
    color: "#CBD5E1",
    fontSize: 14,
    marginBottom: 14,
    textAlign: "center",
  },

  modalFeature: {
    color: "#E5E7EB",
    fontSize: 14,
    marginBottom: 8,
    paddingLeft: 6,
  },

  closeBtn: {
    marginTop: 16,
    backgroundColor: "#D4AF37",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },

  closeText: {
    color: "#020617",
    fontWeight: "800",
    fontSize: 15,
  },
});
