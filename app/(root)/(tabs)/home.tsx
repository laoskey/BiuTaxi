import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { Link, router } from "expo-router";
import {
  ActivityIndicator,
  ActivityIndicatorBase,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { mockRecentRides } from "@/lib/mock";
import RideCard from "@/components/Biu/RideCard";
import { icons, images } from "@/constances";
import React, { useEffect, useState } from "react";
import GoogleTextInput from "@/components/Biu/GoogleTextInput";
import Map from "@/components/Biu/Map";
import { useLocationStore } from "@/lib";

export default function Page() {
  const { user } = useUser();
  const { setDestinationLocation, setUserLocation } =
    useLocationStore();
  const [hasPermissions, setHasPermissions] = useState(false);

  const loading = true;
  const handleSignOut = () => {
    // TODO: Delete this line
    setDestinationLocation({
      longitude: 120.22,
      latitude: 35.88,
      address: "QinDao",
    });
    router.push("/(root)/find-ride");
  };
  const handleDestinationPress = (location: {
    longitude: number;
    latitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  };

  useEffect(() => {
    const requestLocation = async () => {
      let { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setHasPermissions(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync();

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name},${address[0].region}`,
      });
    };
    requestLocation();
  }, []);
  return (
    <SafeAreaView>
      <FlatList
        // data={[]}
        data={mockRecentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent rides found</Text>
              </>
            ) : (
              <>
                <ActivityIndicator
                  size={"large"}
                  color="#000"
                  className="mt-5"
                />
              </>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-2xl font-JakartaBold capitalize">
                Welecome{", "}
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split("@")[0]}
                👏
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className=" justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image
                  source={icons.out}
                  className=" w-5 h-5"
                />
              </TouchableOpacity>
            </View>
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-netural-300"
              handlePress={handleDestinationPress}
            />
            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3 capitalize">
                Your current location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>
            <Text className="text-xl font-JakartaBold mt-5 mb-3 capitalize">
              Recent rides
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
}
