
$(document).ready(function()
{

var styles = [
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      { hue: '#596B8A' },
      { saturation: -75 },
      { lightness: -20 },
      { visibility: 'simplified' }
    ]
  },{
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      { hue: '#D9D9D9' },
      { saturation: -100 },
      { lightness: -4 },
      { visibility: 'on' }
    ]
  },{
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      { hue: '#B8B8B8' },
      { saturation: -100 },
      { lightness: 23 },
      { visibility: 'simplified' }
    ]
  },{
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      { hue: '#D9D9D9' },
      { saturation: -100 },
      { lightness: 32 },
      { visibility: 'off' }
    ]
  },{
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      { hue: '#D9D9D9' },
      { saturation: 0 },
      { lightness: 40 },
      { visibility: 'off' }
    ]
  }
];

var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

markers = [];


var iconBase = 'img/';
  
var infowindow = null;

var myLatlng = new google.maps.LatLng(59.32, 18.06);

var mapOptions = 
    {
      zoom: 12,
      center: myLatlng,
      mapTypeControlOptions: 
    {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map']
    }
    }

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);  
  map.mapTypes.set('map', styledMap);
  map.setMapTypeId('map');    

function resize (){                        
  google.maps.event.addDomListener(window, 'resize', initialize);
  google.maps.event.addDomListener(window, 'load', initialize);
  }

function createMarker(attributes) 
{
    var marker = new google.maps.Marker
    ({
      position: new google.maps.LatLng(attributes.lat, attributes.lng),
      map: map,
      icon: iconBase + 'pin_yellow_outline3.png',
    });


      google.maps.event.addListener(marker, 'click', function()
      {
        map.setZoom(15);
        if (infowindow) 
      {
        infowindow.close();
      }

        var contentString = "<div class='infowindow'><p>" + "<br><img class='pic' src='" + attributes.media + "'><br>" + attributes.text + "<br>Created at " + attributes.created_at;"</p></div>"
        infowindow = new google.maps.InfoWindow
      ({
          content: contentString
      });
        infowindow.open(map,marker);
      });

      marker.created_at = new Date(attributes.created_at).getTime();
      markers.push(marker);
}

    var url = "https://free-ec2.scraperwiki.com/b732xeq/738b546f51cf436/sql/?q=select%20%0A%09created_at%2C%0A%20%20%20%20text%2C%0A%20%20%20%20lat%2C%0A%20%20%20%20lng%2C%0A%20%20%20%20media%0Afrom%20tweets%0Agroup%20by%20created_at%0A";
    
    $.getJSON(url, function(data) {
      for (var i = 0; i < data.length; i++) {
        point = data[i];
        
        if (point.lat != null && point.lat != undefined) {
          createMarker(point);
        }
        //console.log(point.text);//

      $("#list").append( "<div class='image'> '<img src='" + point.media + "'><br><p>" +  point.text + "<br>" + point.created_at + "<br></p>");  
 

        //here you are appending an image to the #list
        }


     });

    /*function data(response) {

    for (var i = 0; i < response.data.length; i++) 
    var time = response.data[i].created_at;
    var text= response.data[i].text;
    var lat= response.data[i].lat;
    var lng = response.data[i].lng;
    var media = response.data[i].media; 

    $("#data").append("<media src='" + time + "'>", "<p>" + text + "</p>");

    var getData = $ val(),
getData = ""https:"https://free-ec2.scraperwiki.com/b732xeq/738b546f51cf436/sql/?q=select%20%0A%09created_at%2C%0A%20%20%20%20text%2C%0A%20%20%20%20lat%2C%0A%20%20%20%20lng%2C%0A%20%20%20%20media%0Afrom%20tweets%0Agroup%20by%20created_at%0A"



    }
    */
});




