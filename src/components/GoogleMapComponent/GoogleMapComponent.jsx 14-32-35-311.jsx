import React from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 37.7749, // Example latitude (San Francisco)
  lng: -122.4194, // Example longitude
};

const locations = [
  {
    id: 1,
    name: "Golden Gate Bridge",
    position: { lat: 37.8199, lng: -122.4783 },
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg",
  },
  {
    id: 2,
    name: "Alcatraz Island",
    position: { lat: 37.8267, lng: -122.423 },
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Alcatraz_Island_photo_D_Ramey_Logan.jpg",
  },
];

const GoogleMapComponent = () => {
  const [selected, setSelected] = React.useState(null);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAYbCyqbPTGR-m-3kKsktdZcXTcku40cJw">
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={loc.position}
            onClick={() => setSelected(loc)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={selected.position}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h3>{selected.name}</h3>
              <img src={selected.image} alt={selected.name} style={{ width: "150px", borderRadius: "8px" }} />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
