import { FunctionComponent, useMemo } from "react";
import { GoogleMap, InfoWindow, useLoadScript, MarkerF } from "@react-google-maps/api"

interface BusinessMapProps {
    lat: number;
    lng: number;

}

const BusinessMap: FunctionComponent<BusinessMapProps> = ({ lat, lng }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!
    })
    if (!isLoaded) return <div>Loading...</div>
    return <Map lat={lat} lng={lng} />;
}
interface MapProps {
    lat: number;
    lng: number;
}
function Map({ lat, lng }: MapProps) {

    const center = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

    return <GoogleMap zoom={17} center={center} mapContainerClassName="map-container">
        <MarkerF position={center} />
    </GoogleMap>
}
export default BusinessMap;