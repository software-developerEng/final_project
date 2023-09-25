import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router/tabs";
import { Text, View } from "react-native";

const routes = [
  {
    name: "Home",
    title: "Home",
    icon: ({ focused }) => {
      return (
        <View
          style={{
            backgroundColor: focused ? "white" : "transparent",
            borderRadius: 50,
            width: 45,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          }}
        >
          <Entypo name="home" size={25} color={focused ? "black" : "white"} />
        </View>
      );
    },
  },
  {
    name: "Search",
    title: "Search",
    icon: ({ focused }) => {
      return (
        <View
          style={{
            backgroundColor: focused ? "white" : "transparent",
            borderRadius: 50,
            width: 45,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          }}
        >
          <FontAwesome
            name="search"
            size={25}
            color={focused ? "black" : "white"}
          />
        </View>
      );
    },
  },
  {
    name: "Post",
    title: "Post",
    icon: ({ focused }) => {
      return (
        <View
          style={{
            backgroundColor: focused ? "white" : "transparent",
            borderRadius: 50,
            width: 45,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          }}
        >
          <MaterialIcons
            name="post-add"
            size={25}
            color={focused ? "black" : "white"}
          />
        </View>
      );
    },
  },
  {
    name: "Community",
    title: "Community",
    icon: ({ focused }) => {
      return (
        <View
          style={{
            backgroundColor: focused ? "white" : "transparent",
            borderRadius: 50,
            width: 45,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          }}
        >
          <FontAwesome
            name="users"
            size={25}
            color={focused ? "black" : "white"}
          />
        </View>
      );
    },
  },
  {
    name: "Settings",
    title: "Settings",
    icon: ({ focused }) => {
      return (
        <View
          style={{
            backgroundColor: focused ? "white" : "transparent",
            borderRadius: 50,
            width: 45,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          }}
        >
          <FontAwesome
            name="gear"
            size={25}
            color={focused ? "black" : "white"}
          />
        </View>
      );
    },
  },
];

const styles = {
  tab: {
    backgroundColor: "transparent",
    borderRadius: 50,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#259CD5",
    borderRadius: 50,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default () => (
  <Tabs
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      tabBarStyle: { height: 70, paddingTop: 5, backgroundColor: "#259CD5" },
    }}
  >
    {routes.map(({ name, title, icon }) => (
      <Tabs.Screen
        key={name}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  fontSize: 14,
                }}
              >
                {title}
              </Text>
            );
          },
          tabBarIcon: icon,
        }}
        name={name}
      />
    ))}
  </Tabs>
);
