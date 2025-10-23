import React, { useEffect } from "react";
import { useMap } from "../context/MapContext";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import { VectorTile as VectorTileLayer } from "ol/layer";
import { VectorTile as VectorTileSource } from "ol/source";
import MVT from "ol/format/MVT";
import { Style, Fill, Stroke } from "ol/style";

const BASE_PG_TILES: string = import.meta.env.VITE_PG_TILESERVER_URL;

const Layers: React.FC = () => {
    const { map } = useMap();

    useEffect(() => {
        if (!map) return;

        const vectorTileLayer = new VectorTileLayer({
            source: new VectorTileSource({
                format: new MVT(),
                url: `${BASE_PG_TILES}/public.xa/{z}/{x}/{y}.pbf`,
            }),
            style: new Style({
                fill: new Fill({ color: "rgba(255, 128, 128, 0.4)" }),
                stroke: new Stroke({ color: "#830505ff", width: 0.5 }),
            }),
        });
        map.addLayer(vectorTileLayer);
        console.log("Vector tile layer added.", vectorTileLayer);

        return () => { map.removeLayer(vectorTileLayer); };
    }, [map]);

    return null;
};

export default Layers;