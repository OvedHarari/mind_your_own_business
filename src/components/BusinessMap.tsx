import { FunctionComponent, useMemo } from "react";
import { GoogleMap, InfoWindow, useLoadScript, MarkerF } from "@react-google-maps/api"

interface BusinessMapProps {

}

const BusinessMap: FunctionComponent<BusinessMapProps> = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!
    })
    if (!isLoaded) return <div>Loading...</div>
    return <Map />;
}

function Map() {
    const center = useMemo(() => ({ lat: 32.1755739, lng: 35.0172525 }), []);

    return <GoogleMap zoom={17} center={center} mapContainerClassName="map-container">
        <MarkerF position={center} />
    </GoogleMap>
}
export default BusinessMap;