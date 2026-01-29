import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const FILTERS = {
  Brand: ["BMW", "Audi", "Mercedes", "Tata", "Mahindra"],
  CarName: ["Scorpio", "Defender", "Creta", "X5"],
  City: ["Pune", "Mumbai", "Delhi", "Bangalore"],
  CarColor: ["Black", "White", "Red", "Blue"],
  Price: ["< ₹2000", "₹2000 - ₹5000", "> ₹5000"],
  Rating: ["4★ & above", "3★ & above"],
  Discount: ["10%+", "20%+", "30%+"],
  Seats: ["4 Seater", "5 Seater", "7 Seater"],
  FuelType: ["Petrol", "Diesel", "Electric"],
};

export default function CarFilterModal({ visible, onClose, onApply }) {
  const categories = Object.keys(FILTERS);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selected, setSelected] = useState({});

  const toggleOption = (category, option) => {
    setSelected((prev) => {
      const current = prev[category] || [];
      return {
        ...prev,
        [category]: current.includes(option)
          ? current.filter((i) => i !== option)
          : [...current, option],
      };
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ fontSize: 18 }}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            {/* LEFT SIDE */}
            <ScrollView style={styles.left}>
              {categories.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.leftItem,
                    activeCategory === item && styles.activeLeft,
                  ]}
                  onPress={() => setActiveCategory(item)}
                >
                  <Text
                    style={[
                      styles.leftText,
                      activeCategory === item && styles.activeLeftText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* RIGHT SIDE */}
            <ScrollView style={styles.right}>
              {FILTERS[activeCategory].map((option) => {
                const isSelected =
                  selected[activeCategory]?.includes(option);

                return (
                  <TouchableOpacity
                    key={option}
                    style={styles.option}
                    onPress={() => toggleOption(activeCategory, option)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        isSelected && styles.checked,
                      ]}
                    />
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => setSelected({})}
            >
              <Text>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.applyBtn}
              onPress={() => onApply(selected)}
            >
              <Text style={{ color: "#fff" }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  container: {
    height: "85%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
  },
  body: {
    flexDirection: "row",
    flex: 1,
  },
  left: {
    width: "35%",
    backgroundColor: "#f7f7f7",
  },
  right: {
    width: "65%",
    padding: 12,
  },
  leftItem: {
    padding: 14,
  },
  activeLeft: {
    backgroundColor: "#fff",
    borderLeftWidth: 4,
    borderLeftColor: "#6C63FF",
  },
  leftText: {
    color: "#666",
  },
  activeLeftText: {
    color: "#000",
    fontWeight: "600",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#999",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#6C63FF",
    borderColor: "#6C63FF",
  },
  optionText: {
    fontSize: 15,
  },
  footer: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  clearBtn: {
    flex: 1,
    alignItems: "center",
    padding: 12,
  },
  applyBtn: {
    flex: 1,
    backgroundColor: "#6C63FF",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
  },
});
