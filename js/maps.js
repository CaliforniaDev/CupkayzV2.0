function initMap() {

    const DELIVERY_BOUNDS = {
        north: 34.50,
        south: 33.45,
        west: -119.58,
        east: -116.80,
    };

    const mapOptions = {
        isInDeliveryRadius: true,
        zoom: 6,
        center: { lat: 33.9806, lng: -117.3755 },
        mapId: "3a2b78e6ed566683",
        draggable: true,
        mapTypeControl: false,
        restriction: {
            latLngBounds: DELIVERY_BOUNDS,
            strictBounds: false
        },
    };

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    const autocompleteOptions = {
        componentRestrictions: { country: "us" },
        fields: ["formatted_address", "geometry", "name", "place_id"],
        origin: map.getCenter(),
        strictBounds: false,
        types: ["address"],
    };
 

    const distanceService = new google.maps.DistanceMatrixService();
    const directionService = new google.maps.DirectionsService();
    const directionRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});

    const addressInput = document.getElementById("search_input");
    const submitButton = document.getElementById("submit");

    addressInput.addEventListener("click", () => addressInput.select());
    addressInput.addEventListener("keydown", event => {
         ( event.key === "Enter") ? event.preventDefault() : false;
    });

    const autocomplete = new google.maps.places.Autocomplete(addressInput, autocompleteOptions);
    autocomplete.bindTo("bounds", map);
    

    const originMarker = {
        marker: new google.maps.Marker(),
        iconSource: "images/cupcake-map-pin.svg",
        contentString: "<h1>Origin Point</h1>",
        position: () => mapOptions.center,
    };
    
    const recipientMarker = {
        marker: new google.maps.Marker(),
        iconSource: "images/delivery-map-pin.svg",
        contentString: "<h1>Delivery Point</h1>",
        position: () => {
            let latitudeInput = recipientMarker.place.geometry.location.lat();
            let longitudeInput = recipientMarker.place.geometry.location.lng();
            return new google.maps.LatLng(latitudeInput, longitudeInput);
        },
    }

    function MarkerFeatures(iconSource,contentString, position) {
        this.map = map;
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
            object.marker.infoWindow.open(map, marker);
            setTimeout(() => marker.infoWindow.close(map, marker), 4000)
        });
    }
    setMarkerAndFeatures(originMarker);

    autocomplete.addListener("place_changed", addressChangeHandler);


    function addressChangeHandler() {
        recipientMarker.marker.setVisible(false);
        recipientMarker.place = autocomplete.getPlace();
        recipientMarker.address = recipientMarker.place.formatted_address;
        let placeId = getPlaceId();
        if (isInputValid(recipientMarker)) {
            directionRenderer.setMap(map);
        } else {
            clearInput();
            return window.alert("Location does not exist for " + recipientMarker.place.name);
        };
        setMarkerAndFeatures(recipientMarker);
        calculateDistanceAndDirections();
    };  

    function isInputValid (marker) {
        return !marker.place.geometry ? false
             : !marker.place.geometry.location ? false
             : true;
    };

    function getPlaceId() {
        return recipientMarker.place.place_id;
    }

    function calculateDistanceAndDirections () {
        let serviceOptions = {
            origins: [mapOptions.center],
            destinations: [recipientMarker.position()],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false,
        };
        distanceService.getDistanceMatrix(serviceOptions, distanceServiceCallback);
    }
    let distanceServiceCallback = (response, status) => {
        if (isStatusOk(status)) {
            let distance = response.rows[0].elements[0].distance.text;
            $("#in_mile").text(distance);
            if (isInDeliveryRange(distance)){
                setRoute();
            } else {
                clearInput()
                return alert("Sorry delivery is not available in your area. Please call us at 555-555-5555 to arrange a pick-up order");
            }
        } else {
            return alert("Error was: " + status)
        };
    }

    let isStatusOk = (status) => (status === "OK") ? true : alert("Error was: " + status);

    function isInDeliveryRange(distance) {
        let nonNumberChar = /(\d+\.\d+|\d+)/g;
        return distance.match(nonNumberChar)[0] <= 75 ? true : false
    }

    function setRoute() {
        let directionOptions = {
            origin: mapOptions.center,
            destination: { placeId: getPlaceId() },
            travelMode: "DRIVING",
            unitSystem: google.maps.UnitSystem.IMPERIAL,
        };
        directionService.route(directionOptions, (result, status) => {
            (isStatusOk(status)) ? directionRenderer.setDirections(result) : alert("Error was: " + status);
            map.fitBounds(recipientMarker.place.geometry.viewport);
        });
    }
    
 
    function clearInput() {
        document.getElementById("search_input").value = "";
        map.setCenter(mapOptions.center);
        directionRenderer.setMap(null)
    }


   
    submitButton.addEventListener("click", () => {
        passValue(recipientMarker.address);
    });

   function passValue(address) {
    localStorage.setItem("textvalue", address);
    return false; 
   }





   enableEnterKey(addressInput);
   function enableEnterKey(input) {
    /* Store original event listener */
    const _addEventListener = input.addEventListener

    const addEventListenerWrapper = (type, listener) => {
      if (type === 'keydown') {
        /* Store existing listener function */
        const _listener = listener
        listener = (event) => {
          /* Simulate a 'down arrow' keypress if no address has been selected */
          const suggestionSelected = document.getElementsByClassName('pac-item-selected').length
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

