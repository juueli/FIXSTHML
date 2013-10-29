
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
      scrollwheel: false,
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

    marker.metadata = {type: "point", id: "1"+ attributes.id_str};



      google.maps.event.addListener(marker, 'click', function()
      {
        map.setZoom(15);
        if (infowindow) 
      {
        infowindow.close();
      }
     
        var contentString = "<div class='infowindow'><p>" + "<br><img class='pic' src='" + attributes.media + "'><br>" + "<a href='#"+ attributes.id_str +"'> See in the list </a><br>" + attributes.text + "<br>Created at " + attributes.created_at; + "</p></div>"
        infowindow = new google.maps.InfoWindow
      ({
          content: contentString
      });
        map.setCenter(marker.getPosition());
        infowindow.open(map,marker);
      });

      marker.created_at = new Date(attributes.created_at).getTime();
      markers.push(marker);
}

    var url = "https://free-ec2.scraperwiki.com/b732xeq/738b546f51cf436/sql/?q=select%20%0A%09id_str%2C%0A%20%20%20%20created_at%2C%0A%20%20%20%20text%2C%0A%20%20%20%20lat%2C%0A%20%20%20%20lng%2C%0A%20%20%20%20media%0Afrom%20tweets%0Agroup%20by%20created_at";
    
    $.getJSON(url, function(data) {
       $("#list").empty();
        
      var strHTML= "";
      console.log("this many images: " + data.length);

      for (var i = 0; i < data.length; i++) {
        point = data[i];
        var img;

        if(point.media === null){
          img = "img/FixSthlm_image_ifnone.png";
        }
        else{
          img = point.media;
        }

        if(i%3===0){
          strHTML += "<div class='row'>";
          strHTML += "<div class='review col-xs-12 col-md-4'>";
          strHTML += "<div><a name='"+ point.id_str +"'></a>";
          strHTML += "<div class='image'><img class='img-responsive' src='" + img + "'><br>";
          strHTML += "<p><a  href='#1"+ point.id_str +"'> See in the map </a>" + point.text + "<br>" + point.created_at + "<br></p></div></div></div>" ;
          if(i === data.length){ //we have reached the final image, close the row
              strHTML += "</div>" //closing the ROW-div
              $("#list").append(strHTML);
              strHTML = "";
          }
 
        }
        else if(i%3===1){
          strHTML += "<div class='review col-xs-12 col-md-4'>";
           strHTML += "<div><a href='#' name='"+ point.id_str +"'></a>";
          strHTML += "<div class='image'><img class='img-responsive' src='" + img + "'><br>";
          strHTML += "<p><a  href='#1"+ point.id_str +"'> See in the map </a>"  + point.text + "<br>" + point.created_at + "<br></p></div></div></div>" ;
          if(i === data.length){ //we have reached the final image, close the row
              strHTML += "</div>" //closing the ROW-div
              $("#list").append(strHTML);
              strHTML = "";
          }
        }
        else if(i%3===2){
          strHTML += "<div class='review col-xs-12 col-md-4'>";
           strHTML += "<div><a href='#' name='"+ point.id_str +"'></a>";
          strHTML += "<div class='image'><img class='img-responsive' src='" + img + "'><br>";
          strHTML += "<p><a class='piclinks' href='1"+ point.id_str +"'> See in the MAP </a>"  + point.text + "<br>" + point.created_at + "<br></p></div></div></div>" ;
        
          strHTML += "</div>" //closing the ROW-div
          //console.log(strHTML);
          $("#list").append(strHTML);
          strHTML = "";
        }

        
        
        if (point.lat != undefined && point.lat != undefined) {
          
          createMarker(point);
        }
        //console.log(point.text);//

      //$("#list").append("<div class='span4'> <div class='image'><img src='" + point.media + "'><br><p>" +  point.text + "<br>" + point.created_at + "<br></p></div></div>");  
 

        //here you are appending an image to the #list
        }


     });

  //capture the link events to refer to map
  $(document).on('click','.piclinks', function(e){
    //console.log("this many markers: " + markers.length)
    event.preventDefault();
    var id = $(this).attr("href");
    console.log("position: " + markers[2].position);
    //console.log(markers);
    map.panTo(markers[2].position);
    google.maps.event.trigger(markers[2], "click");

/*
    for(var i = 0;i<markers.length;i++){
      console.log("Markerid: " + markers[i].metadata.id);
    }
*/

    

    
      //retrieve id through href-attribute'
      //
      //console.log("in click ");
      
      //id = id.substring(1,id.length);
//      console.log("link id: "+ id);
//      if($(id)===null){
//        console.log("it's null");
//      }
//      else{
//        //console.log($(id));
//        $(id).hide();
//      }

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




