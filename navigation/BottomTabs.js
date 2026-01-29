import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";

import CarBookingForm from "../user/CarBookingForm";
import FavoritesScreen from "../user/FavoritesScreen";
import HomeScreen from "../user/home";
import ProfileScreen from "../user/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopColor: "#121212",
          height: 75,
        },
        tabBarActiveTintColor: "#5D3FD3",
        tabBarInactiveTintColor: "#777",
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home";
          if (route.name === "Favorites") iconName = "heart";
          if (route.name === "Booking") iconName = "calendar";
          if (route.name === "Profile") iconName = "user";

          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      {/* 👇 3rd Tab opens booking form */}
      <Tab.Screen name="Booking" component={CarBookingForm} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
