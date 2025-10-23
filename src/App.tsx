import './App.css'
import MapView from './components/MapView';
import { MapProvider } from './context/MapContext';
import Layers from './components/Layers';
import Panels from './components/Panels';

function App() {
  return (
    <MapProvider>
      <div style={{ width: '90vh', height: '50vh', margin: 0, padding: 0 }}>
        <MapView />
        <Layers />
        <Panels />
      </div>
    </MapProvider>
  );
}

export default App;