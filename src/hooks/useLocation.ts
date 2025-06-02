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
                console.log('Requesting location permission...');
                const { status } = await Location.requestForegroundPermissionsAsync();
                console.log('Location permission status:', status);
                
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                console.log('Getting current position...');
                const coords = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });
                console.log('Current coordinates:', coords);

                console.log('Reverse geocoding...');
                const [loc] = await Location.reverseGeocodeAsync({
                    latitude: coords.coords.latitude,
                    longitude: coords.coords.longitude
                });
                console.log('Geocoded location:', loc);

                setCoordinates(coords);
                setLocation(loc);
            } catch (error: any) {
                console.error('Location error:', error);
                setErrorMsg(error.message || 'Error getting location');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { coordinates, location, errorMsg, loading };
}
