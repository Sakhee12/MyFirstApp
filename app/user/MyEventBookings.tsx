import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getMyEventRequests } from "../../api/events";
import { useTheme } from "../../context/ThemeContext";
import { darkTheme, lightTheme } from "../../theme/colors";

type EventRequest = {
  id: number;
  event_type: string;
  city: string;
  start_date: string;
  end_date: string;
  start_time: string;
  cars_qty: number;
  billing_type: string;
  pickup_location: string;
  status: string;
};

export default function MyEventBookings() {
  const { theme } = useTheme();
  const colors = theme === "dark" ? darkTheme : lightTheme;

  const [events, setEvents] = useState<EventRequest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const res = await getMyEventRequests();
      setEvents(res.data || []);
    } catch (err) {
      console.log("LOAD EVENTS ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        My Event Bookings
      </Text>

      {/* Loading */}
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.subText, marginTop: 10 }}>
            Loading your bookings...
          </Text>
        </View>
      )}

      {/* Empty */}
      {!loading && events.length === 0 && (
        <View style={styles.center}>
          <Text style={{ color: colors.subText }}>
            No event bookings found.
          </Text>
        </View>
      )}

      {/* Cards */}
      {!loading &&
        events.map((e) => (
          <View
            key={e.id}
            style={[
              styles.card,
              {
                backgroundColor:
                  theme === "dark"
                    ? "#0f172a"
                    : "rgba(255,255,255,0.95)",
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.eventType, { color: colors.text }]}>
              {e.event_type}
            </Text>

            <Text style={{ color: colors.subText }}>
              📍 {e.city}
            </Text>

            <Text style={{ color: colors.subText }}>
              🗓 {e.start_date} → {e.end_date}
            </Text>

            <Text style={{ color: colors.subText }}>
              ⏰ {e.start_time}
            </Text>

            <Text style={{ color: colors.subText }}>
              🚗 Cars: {e.cars_qty}
            </Text>

            <Text style={{ color: colors.subText }}>
              💼 Billing: {e.billing_type}
            </Text>

            <Text style={{ color: colors.subText }}>
              📌 Pickup: {e.pickup_location}
            </Text>

            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    e.status === "PENDING"
                      ? "#fbbf24"
                      : e.status === "APPROVED"
                      ? "#4ade80"
                      : "#f87171",
                },
              ]}
            >
              <Text style={styles.statusText}>
                {e.status}
              </Text>
            </View>
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
  },

  center: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  card: {
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },

  eventType: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  statusBadge: {
    marginTop: 12,
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  statusText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 12,
  },
});
