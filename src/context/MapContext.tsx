import React, { createContext, useContext, useState } from "react";
import Map from "ol/Map";

// Định nghĩa kiểu dữ liệu của context
interface MapContextType {
    map: Map | null;
    setMap: React.Dispatch<React.SetStateAction<Map | null>>;
}

// Tạo context
const MapContext = createContext<MapContextType | undefined>(undefined);

// Provider để bọc quanh App hoặc component cha
export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [map, setMap] = useState<Map | null>(null);

    return (
        <MapContext.Provider value={{ map, setMap }}>
            {children}
        </MapContext.Provider>
    );
};

// Hook tiện dụng để lấy map
export const useMap = (): MapContextType => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error("useMap must be used within a MapProvider");
    }
    return context;
};