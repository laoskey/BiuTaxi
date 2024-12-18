import { icons } from "@/constances";
import { useDriversStore, useLocationStore } from "@/lib";
import { calculateRegion, generateMarkersFromData } from "@/lib/map";
import { mockDrivers } from "@/lib/mock";
import { MarkerData } from "@/types/type";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

function Map() {
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const { selectedDriver, setDrivers } = useDriversStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
    if (Array.isArray(mockDrivers)) {
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: mockDrivers,
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, []);
  return (
    <MapView
      // provider={PROVIDER_GOOGLE}
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      // mapType="mutedStandard"
      mapType="standard"
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === marker.id
              ? icons.selectedMarker
              : icons.marker
          }
        ></Marker>
      ))}
    </MapView>
  );
}

export default Map;
