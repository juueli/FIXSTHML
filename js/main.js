
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

var JSONData;

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
      markerId:attributes.id_str

    });

    marker.metadata = {type: "point", id: + attributes.id_str};



      google.maps.event.addListener(marker, 'click', function()
      {
        map.setZoom(15);
        if (infowindow) 
      {
        infowindow.close();
      }
        var newText1 = attributes.text.replace(/([\S]+\.(MUSEUM|TRAVEL|AERO|ARPA|ASIA|COOP|INFO|NAME|BIZ|CAT|COM|INT|JOBS|NET|ORG|PRO|TEL|AC|AD|AE|AF|AG|AI|AL|AM|AN|AO|AQ|AR|AS|AT|AU|au|AW|AX|AZ|BA|BB|BD|BE|BF|BG|BH|BI|BJ|BL|BM|BN|BO|BR|BS|BT|BV|BW|BY|BZ|CA|CC|CD|CF|CG|CH|CI|CK|CL|CM|CN|CO|CR|CU|CV|CX|CY|CZ|DE|DJ|DK|DM|DO|DZ|EC|EDU|EE|EG|EH|ER|ES|ET|EU|FI|FJ|FK|FM|FO|FR|GA|GB|GD|GE|GF|GG|GH|GI|GL|GM|GN|GOV|GP|GQ|GR|GS|GT|GU|GW|GY|HK|HM|HN|HR|HT|HU|ID|IE|IL|IM|IN|IO|IQ|IR|IS|IT|JE|JM|JO|JP|KE|KG|KH|KI|KM|KN|KP|KR|KW|KY|KZ|LA|LB|LC|LI|LK|LR|LS|LT|LU|LV|LY|MA|MC|MD|ME|MF|MG|MH|MIL|MK|ML|MM|MN|MO|MOBI|MP|MQ|MR|MS|MT|MU|MV|MW|MX|MY|MZ|NA|NC|NE|NF|NG|NI|NL|NO|NP|NR|NU|NZ|OM|PA|PE|PF|PG|PH|PK|PL|PM|PN|PR|PS|PT|PW|PY|QA|RE|RO|RS|RU|RW|SA|SB|SC|SD|SE|SG|SH|SI|SJ|SK|SL|SM|SN|SO|SR|ST|SU|SV|SY|SZ|TC|TD|TF|TG|TH|TJ|TK|TL|TM|TN|TO|R|H|TP|TR|TT|TV|TW|TZ|UA|UG|UK|UM|US|UY|UZ|VA|VC|VE|VG|VI|VN|VU|WF|WS|YE|YT|YU|ZA|ZM|ZW)([\S]*))/gi, "")
        var contentString = "<div class='infowindow'><p>" + "<br><img class='pic' src='" + attributes.media + "'><br>" + "<a href='#"+ attributes.id_str +"'> See in the list </a><br>" + newText1 + "<br>Created at " + attributes.created_at; + "</p></div>"
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
       JSONData=data
       $("#list").empty();
        
      var strHTML= "";
      console.log("this many images: " + data.length);

      for (var i = 0; i < data.length; i++) {
        point = data[i];
        var img;

        var newText = data[i].text.replace(/([\S]+\.(MUSEUM|TRAVEL|AERO|ARPA|ASIA|COOP|INFO|NAME|BIZ|CAT|COM|INT|JOBS|NET|ORG|PRO|TEL|AC|AD|AE|AF|AG|AI|AL|AM|AN|AO|AQ|AR|AS|AT|AU|au|AW|AX|AZ|BA|BB|BD|BE|BF|BG|BH|BI|BJ|BL|BM|BN|BO|BR|BS|BT|BV|BW|BY|BZ|CA|CC|CD|CF|CG|CH|CI|CK|CL|CM|CN|CO|CR|CU|CV|CX|CY|CZ|DE|DJ|DK|DM|DO|DZ|EC|EDU|EE|EG|EH|ER|ES|ET|EU|FI|FJ|FK|FM|FO|FR|GA|GB|GD|GE|GF|GG|GH|GI|GL|GM|GN|GOV|GP|GQ|GR|GS|GT|GU|GW|GY|HK|HM|HN|HR|HT|HU|ID|IE|IL|IM|IN|IO|IQ|IR|IS|IT|JE|JM|JO|JP|KE|KG|KH|KI|KM|KN|KP|KR|KW|KY|KZ|LA|LB|LC|LI|LK|LR|LS|LT|LU|LV|LY|MA|MC|MD|ME|MF|MG|MH|MIL|MK|ML|MM|MN|MO|MOBI|MP|MQ|MR|MS|MT|MU|MV|MW|MX|MY|MZ|NA|NC|NE|NF|NG|NI|NL|NO|NP|NR|NU|NZ|OM|PA|PE|PF|PG|PH|PK|PL|PM|PN|PR|PS|PT|PW|PY|QA|RE|RO|RS|RU|RW|SA|SB|SC|SD|SE|SG|SH|SI|SJ|SK|SL|SM|SN|SO|SR|ST|SU|SV|SY|SZ|TC|TD|TF|TG|TH|TJ|TK|TL|TM|TN|TO|R|H|TP|TR|TT|TV|TW|TZ|UA|UG|UK|UM|US|UY|UZ|VA|VC|VE|VG|VI|VN|VU|WF|WS|YE|YT|YU|ZA|ZM|ZW)([\S]*))/gi, "")

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
          strHTML += "<p><a class='piclinks' id='#"+ point.id_str +"' href='#SeeMap'> See in the map </a><br>" + newText + "<br>" + point.created_at + "<br></p></div></div></div>" ;
          if(i === data.length){ //we have reached the final image, close the row
              strHTML += "</div>" //closing the ROW-div
              $("#list").append(strHTML);
              strHTML = "";
          }

        }
        else if(i%3===1){
          strHTML += "<div class='review col-xs-12 col-md-4'>";
          strHTML += "<div><a name='"+ point.id_str +"'></a>";
          strHTML += "<div class='image'><img class='img-responsive' src='" + img + "'><br>";
          strHTML += "<p><a class='piclinks' id='#"+ point.id_str +"' href='#SeeMap'> See in the map </a><br>" + newText + "<br>" + point.created_at + "<br></p></div></div></div>" ;
          if(i === data.length){ //we have reached the final image, close the row
              strHTML += "</div>" //closing the ROW-div
              $("#list").append(strHTML);
              strHTML = "";

          }

        }
        else if(i%3===2){
          strHTML += "<div class='review col-xs-12 col-md-4'>";
          strHTML += "<div><a name='"+ point.id_str +"'></a>";
          strHTML += "<div class='image'><img class='img-responsive' src='" + img + "'><br>";
          strHTML += "<p><a class='piclinks' id='#"+ point.id_str +"' href='#SeeMap'> See in the map </a><br>" + newText + "<br>" + point.created_at + "<br></p></div></div></div>" ;
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
  $(document).on('click','.piclinks', function(){
    var thisMarkerId=$(this).attr("id")
    console.log(thisMarkerId)
    //event.preventDefault();

   for (var i=0;i<markers.length;i++) {
      if(thisMarkerId=="#"+markers[i].markerId){
    console.log(markers[i].markerId)

    map.panTo(markers[i].position);
    google.maps.event.trigger(markers[i], "click");
    map.setZoom(17);
    }
    //console.log("this many markers: " + markers.length)
    //if(markerId)
  //  console.log("position: " + markers[2].position);
    //console.log("id: " + markers[2].metadata.id);
    //console.log(markers);
}
/*
    for(var i = 0;i<markers.length;i++){
      console.log("Markerid: " + markers[i].metadata.id);
    }
//*/
//
//
//    
//      //retrieve id through href-attribute'
//      //
//      //console.log("in click ");
//      
//      id = id.substring(i++,id.length);
 //    console.log("link id: "+ id);
//      if($(id)===null){
//        console.log("it's null");
//      }
//      else{
//        //console.log($(id));
//        $(id).hide();
//      }
//
//  });
//    /*function data(response) {
//
//    for (var i = 0; i < response.data.length; i++) 
//    var time = response.data[i].created_at;
//    var text= response.data[i].text;
//    var lat= response.data[i].lat;
//    var lng = response.data[i].lng;
//    var media = response.data[i].media; 
//
//    $("#data").append("<media src='" + time + "'>", "<p>" + text + "</p>");
//
//    var getData = $ val(),
//getData = ""https:"https://free-ec2.scraperwiki.com/b732xeq/738b546f51cf436/sql/?q=select%20%0A%09created_at%2C%0A%20%20%20%20text%2C%0A%20%20%20%20lat%2C%0A%20%20%20%20lng%2C%0A%20%20%20%20media%0Afrom%20tweets%0Agroup%20by%20created_at%0A"
//
//
//
  });
    
});




