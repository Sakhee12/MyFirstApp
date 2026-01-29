import React, { useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const TABS = ["Upcoming", "History", "Cancelled"];

const BOOKINGS = {
  Upcoming: [
    {
      id: "1",
      name: "Hyundai i30 N",
      dates: "Jan 22 - Jan 25",
      price: "$420",
      status: "In Progress",
      image:
        "https://images.unsplash.com/photo-1549921296-3ec93abae3f0?auto=format&fit=crop&w=800&q=80",
    },
  ],
  History: [
    {
      id: "2",
      name: "BMW M4",
      dates: "Dec 02 - Dec 05",
      price: "$780",
      status: "Confirmed",
      image:
        "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80",
    },
  ],
  Cancelled: [
    {
      id: "3",
      name: "Audi A6",
      dates: "Nov 12 - Nov 14",
      price: "$510",
      status: "Cancelled",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    },
  ],
};

export default function MyBookingsScreen() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  const renderCard = ({ item }: any) => {
    const statusStyle =
      item.status === "Confirmed"
        ? styles.confirmed
        : item.status === "Pending"
        ? styles.pending
        : item.status === "In Progress"
        ? styles.inProgress
        : styles.cancelled;

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />

        <View style={styles.cardContent}>
          <View style={[styles.statusTag, statusStyle]}>
            <Text style={[styles.statusText, statusStyle]}>
              {item.status}
            </Text>
          </View>

          <Text style={styles.carName}>{item.name}</Text>
          <Text style={styles.dates}>{item.dates}</Text>
          <Text style={styles.price}>{item.price}</Text>

          <TouchableOpacity style={styles.manageBtn}>
            <Text style={styles.manageText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerTitle}>My Bookings</Text>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[styles.tabText, activeTab === tab && styles.activeTabText]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Booking List */}
      <FlatList
        data={(BOOKINGS as any)[activeTab]}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    alignItems: "center",
    fontWeight: "700",
    marginBottom: 16,
    marginTop: 40,
  },

  tabRow: {
    flexDirection: "row",
    backgroundColor: "#121212",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#5D3FD3",
  },
  tabText: {
    color: "#BBBBBB",
    fontSize: 14,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    borderRadius: 14,
    marginBottom: 16,
    overflow: "hidden",
  },

  cardImage: {
    width: 120,
    height: 120,
  },

  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },

  statusTag: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 6,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },

  confirmed: {
    borderColor: "#2ECC71",
    color: "#2ECC71",
  },
  pending: {
    borderColor: "#F1C40F",
    color: "#F1C40F",
  },
  inProgress: {
    borderColor: "#5D3FD3",
    color: "#5D3FD3",
  },
  cancelled: {
    borderColor: "#888888",
    color: "#888888",
  },

  carName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  dates: {
    color: "#AAAAAA",
    fontSize: 13,
  },

  price: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  manageBtn: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(93,63,211,0.2)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  manageText: {
    color: "#5D3FD3",
    fontSize: 13,
    fontWeight: "600",
  },
});
