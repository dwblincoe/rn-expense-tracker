import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import ManageExpense from "./screens/ManageExpense";
import IconButton from "./components/ui/IconButton";
import ExpensesProvider from "./store/context/expenses";

import { GlobalStyles } from "./constants/styles";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const { colors } = GlobalStyles;

const ExpensesOverview = () => (
  <Tabs.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: colors.primary500 },
      headerTintColor: "white",
      tabBarStyle: { backgroundColor: colors.primary500 },
      tabBarActiveTintColor: colors.accent500,
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="add"
          color={tintColor}
          size={24}
          onPress={() => navigation.navigate("ManageExpense")}
        />
      ),
    })}
  >
    <Tabs.Screen
      name="RecentExpenses"
      component={RecentExpenses}
      options={{
        title: "Recent Expenses",
        tabBarLabel: "Recent Expenses",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="hourglass" color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="AllExpenses"
      component={AllExpenses}
      options={{
        title: "All Expenses",
        tabBarLabel: "All Expenses",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="calendar" color={color} size={size} />
        ),
      }}
    />
  </Tabs.Navigator>
);

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              //only effects IOS
              options={{ presentation: "modal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
