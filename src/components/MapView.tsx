import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import { Feature } from "ol";
import { createMBTilesSource, createBaseTileLayer, initializeMap } from '../utils/mapUtils';
import { useMap } from "../context/MapContext";
import { highlightService } from "../services/HighlightService";

const BaseUrl: string = import.meta.env.VITE_API_BASE_URL;
const MapName: string = import.meta.env.VITE_MAP_DEFAULT_NAME;

const MapView: React.FC = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);

    const { setMap, setSelectedFeature } = useMap();

    // useRef để lưu trữ đối tượng Map đã khởi tạo (để cleanup dễ dàng hơn)
    const olMap = useRef<Map | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        // 2. Tạo Source và Layer
        const tileSource = createMBTilesSource({
            baseUrl: BaseUrl,
            mapName: MapName,
            maxZoom: 16,
            minZoom: 9
        });

        const mbtilesLayer = createBaseTileLayer(tileSource);

        const map = initializeMap(mapRef.current!, [mbtilesLayer], [12030335.234, 1804233.19], 7);
        olMap.current = map;

        setMap(olMap.current);

        // Click on Commune
        const handleClick = (evt: any) => {
            let foundFeature = null;

            map.forEachFeatureAtPixel(evt.pixel, (feature) => {
                if (!feature) {
                    highlightService.clearHighlight(map);
                    return;
                }

                foundFeature = feature;

                highlightService.showHighlight(foundFeature as Feature, map);

                const properties = feature.getProperties();
                console.log("Feature clicked:", properties);
                setSelectedFeature(properties);
                return true; // Dừng khi đã chọn được 1 feature
            });
        };

        map.on("singleclick", handleClick);;

        // Cleanup: Xóa map khi component unmount
        return () => {
            olMap.current?.setTarget(undefined);
        };
    }, [setMap, setSelectedFeature]);

    return (
        // Đảm bảo div có kích thước để hiển thị bản đồ
        <div ref={mapRef} style={{ position: "relative", width: '100%', height: '95vh', border: '1px solid black' }}>
        </div>

    );
};

export default MapView;