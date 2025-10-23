import React from "react";
import { useMap } from "../context/MapContext";

const Panels: React.FC = () => {
    const { selectedFeature } = useMap();

    if (!selectedFeature) {
        return (
            <div style={panelStyle}>
                <h3>Thông tin vùng</h3>
                <p>Hãy click vào một vùng để xem chi tiết.</p>
            </div>
        );
    }

    return (
        <div style={panelStyle}>
            <h3>Thông tin vùng</h3>
            <p><b>Tên:</b> {selectedFeature.tenxa}</p>
            <p><b>Kinh độ:</b> {selectedFeature.longtitude}</p>
            <p><b>Vĩ độ:</b> {selectedFeature.latitude}</p>
        </div>
    );
};

const panelStyle: React.CSSProperties = {
    position: "absolute",
    top: "60px",
    right: "20px",
    background: "white",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    width: "250px",
    zIndex: 1000,
};

export default Panels;