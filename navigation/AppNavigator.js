import { createDrawerNavigator } from "@react-navigation/drawer";
import { useState } from "react";

import CustomDrawer from "../app/user/CustomDrawer";
import BookingsScreen from "../screens/BookingsScreen";
import HomeScreen from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  const [activeItem, setActiveItem] = useState("Premium Cars");

  return (
   
      <Drawer.Navigator
        drawerContent={() => (
          <CustomDrawer
            activeItem={activeItem}
            onItemPress={(item) => setActiveItem(item)}
          />
        )}
        screenOptions={{
          headerShown: false,
          drawerStyle: { width: "78%" },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Bookings" component={BookingsScreen} />
      </Drawer.Navigator>
   
  );
}
