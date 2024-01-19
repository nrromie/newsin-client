import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {

    const location = {
        lat: 23.091817746546383,
        lng: 91.34273082282296
    };

    return (
        <MapContainer
            center={[location.lat, location.lng]}
            zoom={16}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.lat, location.lng]}>
                <Popup>{"Padua Bazar"}</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;