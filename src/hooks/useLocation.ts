// hooks/useLocation.ts
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export function useLocation() {
    const [coordinates, setCoordinates] = useState<Location.LocationObject | null>(null);
    const [location, setLocation] = useState<Location.LocationGeocodedAddress | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                const coords = await Location.getCurrentPositionAsync({});
                const [loc] = await Location.reverseGeocodeAsync(coords.coords);
                setCoordinates(coords);
                setLocation(loc);
            } catch (error: any) {
                setErrorMsg(error.message || 'Error getting location');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { coordinates, location, errorMsg, loading };
}
