import React from "react";
import GoogleMapReact from "google-map-react";
import ReactModal from "react-modal";

const Map = ({isVisible, setShowMap}) => {

    const location = {
        center: { lat: 40.73, lng: -73.93 },
        zoom: 12
    }
   


    return (
        <ReactModal style={
            {"content": {
                
                // "width": "90%"
            }}
        } isOpen={isVisible}>
            <button className="exitMapModal" onClick={()=> {
               setShowMap(false)
            }}>X</button>
        <div style={{"height": 500, "width": 500}}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                    language: 'en'
                }}
                defaultCenter={location.center}
                center={location.center}
                defaultZoom={location.zoom}
                // onClickEnter={() => {}}
                // onClickLeave={() => {}}
            >
            
            </GoogleMapReact>

        </div>
        </ReactModal>
    )

}




export default Map;