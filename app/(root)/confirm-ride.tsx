import CustomButton from "@/components/Biu/CustomButton";
import DriverCard from "@/components/Biu/DriverCard";
import RideLayout from "@/components/Biu/RideLayout";
import { useDriversStore } from "@/lib";
import { router } from "expo-router";
import { FlatList, View } from "react-native";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } =
    useDriversStore();

  return (
    <RideLayout
      title={"Choose a Rider"}
      snapPoints={["65%", "85%"]}
    >
      <FlatList
        data={drivers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(item.id!)}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
