class atcClient {
  constructor(client, map) {

    // retain raw data
    this.__client = client;

    this.id = client['_id'];
    this.callsign = client['callsign'];
    this.realname = client['realname'];

    // ATC types:
    //            0 : observer
    //            1 : flight service station
    //            2 : delivery
    //            3 : ground
    //            4 : tower/atis
    //            5 : approach
    //            6 : center
    this.facility_type = (client['facilitytype'] == 0) ? 'observer' :
                        (client['facilitytype'] == 1) ? 'fss' :
                        (client['facilitytype'] == 2) ? 'delivery' :
                        (client['facilitytype'] == 3) ? 'ground' :
                        (client['facilitytype'] == 4) ? 'tower' :
                        (client['facilitytype'] == 5) ? 'approach' :
                        (client['facilitytype'] == 6) ? 'center' :
                        'unknown';

    // convert to correct format for google maps
    // TODO: consider LatLng class
    this.location = {
                      lat: client['location'][1],
                      lng: client['location'][0]
                    };

    // initiate marker object
    if (this.facility_type == 'delivery' ||
        this.facility_type == 'ground' ||
        this.facility_type == 'tower') {

          this.map_marker = new google.maps.Marker({
            position: this.location,
            map: map,
            icon: '../images/airport-icon.png',
            title: this.callsign + ' ' + this.realname,
            zIndex: 10000 + this.__client['facilitytype']
          });
      } if(this.facility_type == 'approach'){

        this.map_marker = new google.maps.Circle({
          strokeColor: '#006eff',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#006eff',
          fillOpacity: 0.2,
          map: map,
          title: this.callsign + ' ' + this.realname,
          center: new google.maps.LatLng(this.location.lat,
            this.location.lng),
          radius: 100000
        });

    } else {
        this.map_marker = null;
      }

  };
}
