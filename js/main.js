
$(document).ready(function(){

     markers = [];
  var infowindow = null;

    var myLatlng = new google.maps.LatLng(59.32, 18.06);
    var mapOptions = {
      zoom: 12,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    

    function createMarker(attributes) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(attributes.lat, attributes.lng),
        map: map,
        title: 'Hello World!'
      });


      google.maps.event.addListener(marker, 'click', function() {
        map.setZoom(17);
        if (infowindow) {
        infowindow.close();
        }

        var contentString = "<p>" + attributes.text + "<br><img class='pic' src='" + attributes.media + "'><br>Created at " + attributes.created_at;"</p>"
        infowindow = new google.maps.InfoWindow({
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
        }
        });
    });



