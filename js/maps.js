function initMap() {

    const DELIVERY_BOUNDS = {
        north: 34.50,
        south: 33.45,
        west: -119.58,
        east: -116.80,
    };
    const MAP_OPTIONS = {
        isInDeliveryRadius: true,
        zoom: 6,
        center: { lat: 33.9806, lng: -117.3755 },
        mapId: "3a2b78e6ed566683",
        draggable: true,
        mapTypeControl: false,
        restriction: {
            latLngBounds: DELIVERY_BOUNDS,
            strictBounds: false
        }
    };
    
    const MAP = new google.maps.Map(document.querySelector("#map"), MAP_OPTIONS);
    const DIRECTIONS_RENDERER = new google.maps.DirectionsRenderer({suppressMarkers: true});
    
    function MarkerFeatures(iconSource, contentString, position) {
        this.map = MAP;
        this.icon = iconSource;
        this.position = position,
            this.infoWindow = new google.maps.InfoWindow({
                content: contentString,
            });
        this.anchorPoint = new google.maps.Point(0, -29);
    };

    function setMarkerAndFeatures(object) {
        let marker = object.marker;
        let icon = object.iconSource;
        let content = object.contentString;
        let position = object.position();
        let markerFeatures = new MarkerFeatures(icon, content, position);

        marker.setOptions(markerFeatures);
        marker.setVisible(true);
        marker.addListener("click", () => {
            object.marker.infoWindow.open(MAP, marker);
            setTimeout(() => marker.infoWindow.close(MAP, marker), 4000)
        });
    }

    const ORIGIN_MARKER = {
        marker: new google.maps.Marker(),
        iconSource: "images/cupcake-map-pin.svg",
        contentString: "<p>Origin Point</p>",
        position: () => MAP_OPTIONS.center,
    };
    setMarkerAndFeatures(ORIGIN_MARKER);

    let recipientMarker = {
        marker: new google.maps.Marker(),
        iconSource: "images/delivery-map-pin.svg",
        contentString: "<p>Delivery Point</p>",
        position: () => {
            let latitudeInput = recipientMarker.place.geometry.location.lat();
            let longitudeInput = recipientMarker.place.geometry.location.lng();
            return new google.maps.LatLng(latitudeInput, longitudeInput);
        },
    }




    const ADDRESS_INPUT = document.querySelector("#search_input");
    ADDRESS_INPUT.addEventListener("click", () => ADDRESS_INPUT.select());
    ADDRESS_INPUT.addEventListener("keydown", event => {
        (event.key === "Enter") ? event.preventDefault() : false;
    });


    const AUTO_COMPLETE_OPTIONS = {
        componentRestrictions: { country: "us" },
        fields: ["formatted_address", "address_components", "geometry", "place_id" ],
        origin: MAP.getCenter(),
        strictBounds: false,
        types: ["address"],
    };
    const AUTO_COMPLETE = new google.maps.places.Autocomplete(ADDRESS_INPUT, AUTO_COMPLETE_OPTIONS);
    AUTO_COMPLETE.bindTo("bounds", MAP);
    AUTO_COMPLETE.addListener("place_changed", addressChangeHandler);

    
    function addressChangeHandler() {
        (isSearchErrorMessageActive()) ? toggleSearchError() : false;
        recipientMarker.place = AUTO_COMPLETE.getPlace();
        let placeId = getPlaceId();
        if (isInputValid(recipientMarker)) {
            DIRECTIONS_RENDERER.setMap(MAP);
            setMarkerAndFeatures(recipientMarker);
            calculateDistanceAndDirections();
            fillInAddressInputs();
            return true;
        } else {
            clearInput();
            toggleSearchError();
            recipientMarker.marker.setVisible(false);
            return false;
        }; 
    };

    function getPlaceId () { 
        return recipientMarker.place.place_id; 
    }

    function isInputValid(marker) {
        return !marker.place.geometry ? false
             : !marker.place.geometry.location ? false
             : true;
    };

    function isSearchErrorMessageActive() {
        let searchErrorMessage = document.querySelector("#search-error");
        return searchErrorMessage.classList.contains("active") ? true : false;
    }
    function toggleSearchError() {
        let searchErrorMessage = document.querySelector("#search-error");
        searchErrorMessage.classList.toggle("active");
    }
    function toggleAddressInputs() {
        let addressInputs = document.querySelector("#address-input-container");
        addressInputs.classList.toggle("active");
    }

    function calculateDistanceAndDirections() {
        let serviceOptions = {
            origins: [MAP_OPTIONS.center],
            destinations: [recipientMarker.position()],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false,
        };
        let distanceService = new google.maps.DistanceMatrixService();
        distanceService.getDistanceMatrix(serviceOptions, distanceServiceCallback);
    }
    let distanceServiceCallback = (response, status) => {
        if (isStatusOk(status)) {
            let distance = response.rows[0].elements[0].distance.text;
            if (isInDeliveryRange(distance)) {
                setRoute();
            } else {
                clearInput()
                return alert("Sorry delivery is not available in your area. Please call us at 555-555-5555 to arrange a pick-up order");
            }
        }
    }

    let isStatusOk = (status) => (status === "OK") ? true : alert("Error was: " + status);

    function isInDeliveryRange(distance) {
        let nonNumberChar = /(\d+\.\d+|\d+)/g;
        return distance.match(nonNumberChar)[0] <= 75 ? true : false
    }
    
    function setRoute() {
        let directionService = new google.maps.DirectionsService();
        let directionOptions = {
            origin: MAP_OPTIONS.center,
            destination: { placeId: getPlaceId() },
            travelMode: "DRIVING",
            unitSystem: google.maps.UnitSystem.IMPERIAL,
        };
        directionService.route(directionOptions, (result, status) => {
            (isStatusOk(status)) ? DIRECTIONS_RENDERER.setDirections(result) : alert("Error was: " + status);
            MAP.fitBounds(recipientMarker.place.geometry.viewport);
        });
    }


    function clearInput() {
        document.querySelector(".form-container").reset();
        MAP.setCenter(MAP_OPTIONS.center);
        DIRECTIONS_RENDERER.setMap(null);
    }

    function fillInAddressInputs() {
        let place = AUTO_COMPLETE.getPlace();
        let postalField = document.querySelector("#postcode");
        let deliveryAddress = document.querySelector("#delivery-address");
        
        let address1 = "";
        let address2 = "";
        let postcode = "";

        for (const component of place.address_components) {
            const componentType = component.types[0];

            switch (componentType) {
                case "street_number": {
                    address1 = `${component.long_name} ${address1}`;
                    break;
                }
                case "route": {
                    address1 += component.short_name;
                    break;
                }
                case "postal_code": {
                    postcode = `${component.long_name}${postcode}`;
                    break;
                }

                case "postal_code_suffix": {
                    postcode = `${postcode}-${component.long_name}`;
                    break;
                }
                case "locality":
                    document.querySelector("#locality").value = component.long_name;
                    break;

                case "administrative_area_level_1": {
                    document.querySelector("#state").value = component.short_name;
                    break;
                }
                case "country":
                    document.querySelector("#country").value = component.long_name;
                    break;
            }
        }
        deliveryAddress.value = address1;
        postalField.value = postcode;
    }





    const SUBMIT_BUTTON = document.getElementById("submit");
    SUBMIT_BUTTON.addEventListener("click", () => {
        passValue(recipientMarker.place.formatted_address);
    });
    function passValue(address) {
        localStorage.setItem("textvalue", address);
    }



    enableEnterKey();
    function enableEnterKey() {
        let input = document.querySelector("#search_input");
        /* Store original event listener */
        const _addEventListener = input.addEventListener

        const addEventListenerWrapper = (type, listener) => {
            if (type === 'keydown') {
                /* Store existing listener function */
                const _listener = listener
                listener = (event) => {
                    /* Simulate a 'down arrow' keypress if no address has been selected */
                    const suggestionSelected = document.querySelectorAll('.pac-item-selected').length
                    if (event.key === 'Enter' && !suggestionSelected) {
                        const e = new KeyboardEvent('keydown', {
                            key: 'ArrowDown',
                            code: 'ArrowDown',
                            keyCode: 40,
                        })
                        _listener.apply(input, [e])
                    }
                    _listener.apply(input, [event])
                }
            }
            _addEventListener.apply(input, [type, listener])
        }

        input.addEventListener = addEventListenerWrapper
    }

} //END OF initMap

