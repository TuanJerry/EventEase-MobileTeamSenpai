// hooks/useLocation.ts
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { LocationObject, LocationGeocodedAddress } from 'expo-location';

export const useLocation = () => {
    const [coordinates, setCoordinates] = useState<LocationObject | null>(null);
    const [location, setLocation] = useState<LocationGeocodedAddress | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const getLocation = async () => {
        try {
            setLoading(true);
            setErrorMsg(null);

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            setCoordinates(currentLocation);

            const geocode = await Location.reverseGeocodeAsync({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            });

            if (geocode && geocode.length > 0) {
                setLocation(geocode[0]);
            }
        } catch (error) {
            console.error('Error getting location:', error);
            setErrorMsg('Error getting location');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return { coordinates, location, errorMsg, loading, getLocation };
};
