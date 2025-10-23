import { Map } from "ol";
import TileWMS from "ol/source/TileWMS";
import ImageWMS from "ol/source/ImageWMS";

export async function getFeatureInfo(
    map: Map,
    coordinate: any,
    viewResolution: number,
    sources: { source: TileWMS | ImageWMS; workspace: string; layer: string }[],
    featureCount: number = 10
): Promise<any[]> {
    if (!sources || sources.length === 0) return [];

    const projection = map.getView().getProjection();

    // Tạo danh sách promises cho từng source
    const promises = sources.map(({ source, workspace, layer }) => {
        if (!source) return null;

        const url = source.getFeatureInfoUrl(coordinate, viewResolution, projection, {
            INFO_FORMAT: "application/json",
            QUERY_LAYERS: `${workspace}:${layer}`,
            FEATURE_COUNT: featureCount,
        });

        if (!url) return null;

        return fetch(url)
            .then((res) => res.json())
            .then((data) => ({
                layer: `${workspace}:${layer}`,
                features: data.features || [],
            }))
            .catch((err) => {
                console.error("Lỗi GetFeatureInfo:", err);
                return { layer: `${workspace}:${layer}`, features: [] };
            });
    });

    // Lọc bỏ null
    const results = await Promise.all(promises.filter(Boolean) as Promise<any>[]);
    return results;
}