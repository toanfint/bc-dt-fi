import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import type { Options as XYZOptions } from 'ol/source/XYZ'; // Kiểu cho options của XYZ\
import type { Options as TileLayerOptions } from 'ol/layer/BaseTile'; // Kiểu cho options của TileLayer
import { View } from 'ol';
import Map from 'ol/Map';
import Layer from 'ol/layer/Layer';
import { defaults as defaultControls } from "ol/control";

// Định nghĩa kiểu cho các tham số tùy chọn (nếu có)
interface MBTilesSourceParams {
    baseUrl: string;
    mapName: string;
    maxZoom?: number; // Optional zoom level
    minZoom?: number; // Optional zoom level
}

/**
 * Tạo một đối tượng ol/source/XYZ cho base map từ MBTiles.
 * @param {MBTilesSourceParams} params - Các tham số cần thiết để tạo source.
 * @returns {XYZ} Nguồn tile XYZ của OpenLayers.
 */
export const createMBTilesSource = (params: MBTilesSourceParams): XYZ => {
    const { baseUrl, mapName, maxZoom = 13, minZoom = 6 } = params;

    // Định dạng URL OpenLayers tiêu chuẩn (ZXY)
    const tileUrl: string = `${baseUrl}/TileMap?t=${mapName}&z={z}&x={x}&y={y}`;

    const options: XYZOptions = {
        url: tileUrl,
        maxZoom: maxZoom,
        minZoom: minZoom,
    };

    return new XYZ(options);
};

/**
 * Tạo một TileLayer sử dụng nguồn tile đã cho.
 * @param {XYZ} tileSource - Nguồn tile được tạo bởi createMBTilesSource.
 * @returns {TileLayer<XYZ>} Lớp tile của OpenLayers.
 */
export const createBaseTileLayer = (tileSource: XYZ, name: string = 'BaseMapFromMBTiles'): TileLayer<XYZ> => {
    const options: TileLayerOptions<XYZ> = {
        source: tileSource,
        properties: { name: name },
    };

    // Chú ý: Chúng ta cần chỉ định kiểu generic là <XYZ> cho TileLayer
    return new TileLayer<XYZ>(options);
};

/**
 * Khởi tạo đối tượng Map của OpenLayers.
 * @param {HTMLElement} targetElement - Phần tử DOM mà bản đồ sẽ được gắn vào (mapRef.current).
 * @param {Layer[]} layers - Mảng các lớp bản đồ (ví dụ: lớp tile base map).
 * @returns {Map} Đối tượng Map đã khởi tạo.
 */
export const initializeMap = (targetElement: HTMLElement, layers: Layer[], center: [number, number], zoom: number): Map => {
    return new Map({
        target: targetElement,
        layers: layers,
        view: new View({
            center: center,
            zoom: zoom,
            projection: 'EPSG:3857',
            constrainResolution: true,
        }),
        controls: defaultControls({ zoom: false, attribution: false, rotate: false }),
    });
};