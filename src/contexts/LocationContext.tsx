import React, { createContext, useContext, useState, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  address?: string;
}

interface LocationContextType {
  location: Location | null;
  isLoading: boolean;
  error: string | null;
  requestLocation: () => void;
  setManualLocation: (city: string) => void;
  nearbyAreas: string[];
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const defaultAreas = [
  "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", 
  "Ahmedabad", "Jaipur", "Lucknow", "Surat", "Kanpur", "Nagpur", "Indore", 
  "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ludhiana"
];

const indianCityMapping: { [key: string]: string } = {
  "delhi": "Delhi",
  "mumbai": "Mumbai", 
  "bangalore": "Bangalore",
  "bengaluru": "Bangalore",
  "hyderabad": "Hyderabad",
  "chennai": "Chennai",
  "pune": "Pune",
  "kolkata": "Kolkata",
  "ahmedabad": "Ahmedabad",
  "jaipur": "Jaipur",
  "lucknow": "Lucknow",
  "surat": "Surat",
  "kanpur": "Kanpur",
  "nagpur": "Nagpur",
  "indore": "Indore",
  "thane": "Thane",
  "bhopal": "Bhopal",
  "visakhapatnam": "Visakhapatnam",
  "patna": "Patna",
  "vadodara": "Vadodara",
  "ludhiana": "Ludhiana"
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nearbyAreas, setNearbyAreas] = useState<string[]>(defaultAreas);

  const getCityName = (name: string): string => {
    const lowerName = name.toLowerCase();
    return indianCityMapping[lowerName] || name;
  };

  const requestLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Your browser doesn't support location services");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Simulate getting city name from coordinates (in a real app, you'd use reverse geocoding)
        let detectedCity = "Delhi"; // Default to Delhi
        
        // Simple logic to detect some major Indian cities based on coordinates
        if (latitude >= 18.9 && latitude <= 19.3 && longitude >= 72.7 && longitude <= 73.0) {
          detectedCity = "Mumbai";
        } else if (latitude >= 12.8 && latitude <= 13.1 && longitude >= 77.4 && longitude <= 77.8) {
          detectedCity = "Bangalore";
        } else if (latitude >= 17.3 && latitude <= 17.5 && longitude >= 78.3 && longitude <= 78.6) {
          detectedCity = "Hyderabad";
        } else if (latitude >= 13.0 && latitude <= 13.2 && longitude >= 80.1 && longitude <= 80.4) {
          detectedCity = "Chennai";
        } else if (latitude >= 28.4 && latitude <= 28.9 && longitude >= 77.0 && longitude <= 77.4) {
          detectedCity = "Delhi";
        }

        setLocation({
          latitude,
          longitude,
          city: detectedCity,
          address: `${detectedCity}, India`
        });
        setIsLoading(false);
      },
      (error) => {
        setError("Unable to access your location");
        setIsLoading(false);
        console.error("Location error:", error);
        
        // Set default location to Delhi if geolocation fails
        setLocation({
          latitude: 28.6139,
          longitude: 77.2090,
          city: "Delhi",
          address: "Delhi, India"
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const setManualLocation = (city: string) => {
    const cityName = getCityName(city);
    
    setLocation({
      latitude: 0,
      longitude: 0,
      city: cityName,
      address: `${cityName}, India`
    });
    setError(null);
  };

  // Update nearby areas based on selected location
  useEffect(() => {
    if (location?.city) {
      const currentCityIndex = defaultAreas.indexOf(location.city);
      let areas;
      
      if (currentCityIndex !== -1) {
        // Rearrange to show current city first, then others
        areas = [
          location.city,
          ...defaultAreas.slice(0, currentCityIndex),
          ...defaultAreas.slice(currentCityIndex + 1)
        ].slice(0, 12); // Show only 12 areas
      } else {
        areas = [location.city, ...defaultAreas.slice(0, 11)];
      }
      
      setNearbyAreas(areas);
    }
  }, [location]);

  // Set default location to Delhi on component mount
  useEffect(() => {
    if (!location) {
      setLocation({
        latitude: 28.6139,
        longitude: 77.2090,
        city: "Delhi",
        address: "Delhi, India"
      });
    }
  }, []);

  const value = {
    location,
    isLoading,
    error,
    requestLocation,
    setManualLocation,
    nearbyAreas
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
