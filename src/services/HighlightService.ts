import Map from "ol/Map";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import { Style, Stroke, Fill } from "ol/style";

class HighlightService {
    private highlightLayer: VectorLayer<VectorSource> | null = null;

    constructor() {
        this.highlightLayer = new VectorLayer({
            source: new VectorSource(),
            style: new Style({
                fill: new Fill({
                    color: "rgba(0, 255, 255, 0.3)", // màu fill cyan trong suốt
                }),
                stroke: new Stroke({
                    color: "rgba(255, 0, 0, 0.8)", // viền đỏ
                    width: 2,
                }),
            }),
        });
    }

    showHighlight(feature: Feature, map: Map) {
        if (!this.highlightLayer) return;

        // Clear cũ
        const source = this.highlightLayer.getSource();
        source?.clear();

        // Clone feature (để tránh ảnh hưởng layer gốc)
        const clone = feature.clone();
        source?.addFeature(clone);

        // Thêm layer nếu chưa có
        const hasLayer = map.getLayers().getArray().includes(this.highlightLayer);
        if (!hasLayer) map.addLayer(this.highlightLayer);
    }

    clearHighlight(map: Map) {
        if (!this.highlightLayer) return;
        this.highlightLayer.getSource()?.clear();
        const hasLayer = map.getLayers().getArray().includes(this.highlightLayer);
        if (hasLayer) map.removeLayer(this.highlightLayer);
    }
}

export const highlightService = new HighlightService();