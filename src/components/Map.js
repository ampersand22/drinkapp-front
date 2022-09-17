import React from "react";
import GoogleMapReact from "google-map-react";
import ReactModal from "react-modal";



const Map = ({ isVisible, setShowMap, drink }) => {

    
    const location = {
        center: { lat: parseFloat(drink.latitude), lng: parseFloat(drink.longitude) },
        zoom: 12
    }

    const LocationPin = ({ text }) => {
        return(<div className="pin">
            
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="nonzero"
                    clipRule="evenodd"
                    d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z"
                    fill="red"
                />
                <path
                    fillRule="nonzero"
                    clipRule="evenodd"
                    d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z"
                    fill="white"
                />
            </svg>
            <p>{text}</p>
        </div>)
    }


    return (
        <ReactModal style={
            
            {
                "content": {

                   backgroundColor: "rgb(255,255,255)",
                   display: "flex",
                   flexDirection: "column",
                   top: '20rem',
                   paddingTop: '3px',
                   left: '50%',
                   right: 'auto',
                   bottom: 'auto',
                   width: '33rem',
                   transform: 'translate(-53%, -10%)',
    
                }
            }
        } isOpen={isVisible}>
            <button className="exitMapModal" onClick={() => {
                setShowMap(false)
            }}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M16.3956 7.75734C16.7862 8.14786 16.7862 8.78103 16.3956 9.17155L13.4142 12.153L16.0896 14.8284C16.4802 15.2189 16.4802 15.8521 16.0896 16.2426C15.6991 16.6331 15.0659 16.6331 14.6754 16.2426L12 13.5672L9.32458 16.2426C8.93405 16.6331 8.30089 16.6331 7.91036 16.2426C7.51984 15.8521 7.51984 15.2189 7.91036 14.8284L10.5858 12.153L7.60436 9.17155C7.21383 8.78103 7.21383 8.14786 7.60436 7.75734C7.99488 7.36681 8.62805 7.36681 9.01857 7.75734L12 10.7388L14.9814 7.75734C15.372 7.36681 16.0051 7.36681 16.3956 7.75734Z"
                        fill="white" />
                </svg>
            </button>
            <div style={{ "height": 500, "width": "33rem" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                        language: 'en'
                    }}
                    defaultCenter={location.center}
                    center={location.center}
                    defaultZoom={location.zoom}
                    

                >
                    <LocationPin lat={location.center.lat} lng={location.center.lng} text={drink.locationDisplayName}/>
                </GoogleMapReact>

            </div>
        </ReactModal>
    )

}




export default Map;