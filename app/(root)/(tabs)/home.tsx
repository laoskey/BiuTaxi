import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { mockRecentRides } from "@/lib/mock";
import RideCard from "@/components/Biu/RideCard";

export default function Page() {
  const { user } = useUser();

  return (
    <SafeAreaView>
      <FlatList
        data={mockRecentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
      />
    </SafeAreaView>
  );
}
