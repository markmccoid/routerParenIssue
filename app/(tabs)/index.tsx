import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link, useRouter } from "expo-router";

export default function TabOneScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* Link Component */}
      <Link href={{ pathname: "/(tabs)/two", params: { id: "/123#test#" } }}>
        Link Without Parens
      </Link>
      <Link href={{ pathname: "/(tabs)/two", params: { id: "/123(test)" } }}>Link WITH Parens</Link>
      <View style={{ height: 2, backgroundColor: "red", width: "100%", marginVertical: 10 }} />
      {/* router.push() */}
      <TouchableOpacity
        onPress={() => router.push({ pathname: "/(tabs)/two", params: { id: "/123#test#" } })}
      >
        <Text>Push Without Parens</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push({ pathname: "/(tabs)/two", params: { id: "/123(test)" } })}
      >
        <Text>Push WITH Parens</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
