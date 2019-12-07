/*
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiYWRkeXAiLCJhIjoiY2syY2thdnZrMDFuNDNucDhlMHZlMmZpNCJ9.FhPntD4WHxu-ldEBd4aICg'
}).addTo(mymap);
*/




var activeStop = document.getElementById("stop01");

var pgNum = -1;
var pastPgNum = 0;
var maxNum = 7;
var minNum = 0;

var stopPg = ["#la-salle", "#dr-comics", "#graffitis", "#max-and-son", "#akrams", "#zimmermans", "#cosmic"];
var stopIds = ["stop01","stop02","stop03","stop04","stop05","stop06", "stop07"];
var buttonIds = ["b01", "b02", "b03", "b04", "b05", "b06", "b07"];



$(document).ready(function() {

	$('#startButton').click(function(d){
		var hideLanding = document.getElementById("landing");
		hideLanding.style.display = "none";
		// $("#landing").fadeOut();

		var displayLa = document.getElementById("la-salle");
		var displayBottom = document.getElementById("bottom-bar");
		var displayMedia = document.getElementById("media-player");
		displayLa.style.display = "block";
		displayBottom.style.display = "block";
		displayMedia.style.display = "block"; 	

		increment();
		markerGroup();

		//var activeStop = document.getElementById(buttonIds[0]);
		//activeStop.setAttribute("style", "fill: #54bbde");
		//activeStop.style.fill="#4B88A2";
		//console.log(stopIds[curr]);;
		//$(stopPg[curr]).fadeIn();	
	});

   $('#stop-container svg').click(function(e){  
   		target = e.target.id;
   		//console.log(this.id);
   	//console.log(e.currentTarget.id);


   		if(String(this.id) == "nextButton"){
   			increment();
   			//console.log(this.id);
   		}
   		if(String(this.id) == "preButton"){
   			decrement();
   		}
   		for(var i = 0; i < maxNum; i++){
   			if(String(this.id) == stopIds[i]){
   				if(pgNum != i){
   					pastPgNum = pgNum;
   					pgNum = i;
   					changeStop(pgNum, pastPgNum);
   					audio(pgNum);
   				}
   			}
   		}
	});
});

function increment(){
	// if(pgNum != maxNum){
	// 	pgNum += 1;
	// 	pastPgNum = pgNum - 1;
	// 	changeStop(pgNum,pastPgNum);
	// 	audio(pgNum);
	// 	//console.log(pgNum, pastPgNum);
	// } else  {
	// 	pgNum = 6;
	// 	pastPgNum = 5;
	// 	changeStop(pgNum,pastPgNum);
	// 	audio(pgNum);
	// 	//console.log(pgNum, pastPgNum);
	// }
	
	//console.log("next");

	if(pgNum == maxNum-1){
		pgNum = maxNum-1;
		pastPgNum = maxNum-2;
		changeStop(pgNum,pastPgNum);
		audio(pgNum);
		//console.log(pgNum, pastPgNum);
	} else  {
		pgNum += 1;
		pastPgNum = pgNum - 1;
		changeStop(pgNum,pastPgNum);
		audio(pgNum);
		//console.log(pgNum, pastPgNum);
	}

}

function decrement(){
	if(pgNum == minNum){
		pgNum = 0;
		pastPgNum = 1;
		changeStop(pgNum,pastPgNum);
		audio(pgNum);
		//console.log(pgNum, pastPgNum);
	} else  {
		pgNum -= 1;
		pastPgNum = pgNum + 1;
		changeStop(pgNum,pastPgNum);
		audio(pgNum);
		//console.log(pgNum, pastPgNum);
	}
	//console.log("previous");
}

//console.log($(stopPg[0]).is(":visible"));

function changeStop(curr, past){
	// console.log(curr);

	var activeStop = document.getElementById(buttonIds[curr]);
	//activeStop.setAttribute("style", "fill: #54bbde");
	activeStop.style.fill="#4B88A2";
	// console.log(stopIds[curr]);;
	$(stopPg[curr]).fadeIn();

	if($(stopPg[past]).is(":visible")){
		$(stopPg[past]).fadeOut();
		var deactivatedStop = document.getElementById(buttonIds[past]);
		deactivatedStop.style.fill = "white";
	}



	//imgGallery(curr);
}

var audioFiles = ["media/laSalle.mp3","media/drcomics.mp3", "media/graffitis.mp3", "media/max.mp3", "media/akrams.mp3", "media/zimmermans.mp3", "media/cosmic.mp3" ];

function audio(t){
	var audioFile = document.getElementById("audio-player");
	audioFile.src = audioFiles[t];
}

var map = L.map('mapid', {
	crs: L.CRS.Simple,
	zoomControl: false,
	// setZoom:3,
	 // minZoom: -5
});



L.control.zoom({
     position:'bottomright'
}).addTo(map);

map.panTo([150, 300]);
// L.DomUtil.create('div', 'info');



// var bounds = [[0,0], [1000,1000]];
var bounds = [[0,0], [650,1080]];
var image = L.imageOverlay('kensington-map-v2.png', bounds).addTo(map);
map.fitBounds(bounds);
var mapCenter = map.getCenter();

//MARKERS
function markerGroup(){
var Markers = L.Icon.extend({
    options: {
        iconSize:     [40, 40],
        iconAnchor:   [20, 40],
        //popupAnchor:  [-3, -76]
    }
});

var m01 = new Markers({iconUrl: 'media/m01.png'}), m02 = new Markers({iconUrl: 'media/m02.png'}), m03 = new Markers({iconUrl: 'media/m03.png'}),
	m04 = new Markers({iconUrl: 'media/m04.png'}), m05 = new Markers({iconUrl: 'media/m05.png'}), m06 = new Markers({iconUrl: 'media/m06.png'}),
	m07 = new Markers({iconUrl: 'media/m07.png'});

var r01 = new Markers({iconUrl: 'media/mRed01.png'}), r02 = new Markers({iconUrl: 'media/mRed02.png'}), r03 = new Markers({iconUrl: 'media/mRed03.png'}),
	r04 = new Markers({iconUrl: 'media/mRed04.png'}), r05 = new Markers({iconUrl: 'media/mRed05.png'}), r06 = new Markers({iconUrl: 'media/mRed06.png'}),
	r07 = new Markers({iconUrl: 'media/mRed07.png'});

var activeMarker = [r01, r02,r03,r04,r05,r06,r07];
var inactiveMarker = [m01,m02,m03,m04,m05,m06,m07];

L.icon = function (options) {
    return new L.Icon(options);
};

// var p01 = L.marker([333, 777], {icon: m01}).addTo(map);
// var p02 = L.marker([402, 667], {icon: m02}).addTo(map);
// var p03 = L.marker([524.25, 659.1], {icon: m03}).addTo(map);
// var p04 = L.marker([516.5, 643.7], {icon: m04}).addTo(map);
// var p05 = L.marker([480.75, 606], {icon: m05}).addTo(map);
// var p06 = L.marker([495.9, 551.6], {icon: m06}).addTo(map);

var p01 = L.marker([134, 976], {icon: r01}).addTo(map);
var p02 = L.marker([201, 872], {icon: m02}).addTo(map);
var p03 = L.marker([325.5, 864], {icon: m03}).addTo(map);
var p04 = L.marker([316, 852], {icon: m04}).addTo(map);
var p05 = L.marker([281, 814], {icon: m05}).addTo(map);
var p06 = L.marker([296, 762], {icon: m06}).addTo(map);
var p07 = L.marker([389, 759], {icon: m07}).addTo(map);

var mapStops = L.featureGroup([p01, p02, p03, p04, p05, p06,p07]);

var markerStops = [p01,p02,p03,p04,p05,p06,p07];


var leafletIds = [];
for(var i = 0; i <mapStops.getLayers().length; i++){
	leafletIds[i] = mapStops.getLayers()[i]._leaflet_id;
};

mapStops.eachLayer(function(layer){
	layer.on('click', function(){
		for(var i = 0; i < leafletIds.length; i++){
			if(layer._leaflet_id == leafletIds[i]){
				if(pgNum != i){
   					pastPgNum = pgNum;
   					pgNum = i;
   					changeStop(pgNum, pastPgNum);
   					audio(pgNum);
   					markerStops[pastPgNum].setIcon(inactiveMarker[pastPgNum]);
   					markerStops[pgNum].setIcon(activeMarker[pgNum]);
   				}
			}
		}
		
	});
});
}

/*
var content ='<a href="https://www.google.ca">LINK</a>';

var sol = L.latLng([ 500, 500 ]);
L.marker(sol).addTo(map).bindPopup(content);
*/

//map.setView( [70, 120], 1);

/*
//La Salle
var p01 = L.polygon([ [344.6, 765], [348.6, 780.4], [324.4,789.3], [319.5, 773.4] ], 
						{color: 'red', fillColor: '#f03', fillOpacity: 0.5, weight: 1,}).addTo(map);
//Dr. Comics
var p02 = L.polygon([ [400.9, 659.8], [404.9, 674.8], [402.3, 675.7], [398.3, 660.7] ], 
						{color: 'red', fillColor: '#f03', fillOpacity: 0.5, weight: 1,}).addTo(map);
//Graffitis
var p03 = L.polygon([ [533.1, 655.4], [533.9, 657.9], [517.4, 661.8], [516.75, 659.7] ], 
						{color: 'red', fillColor: '#f03', fillOpacity: 0.5, weight: 1,}).addTo(map);
//Max and Son
var p04 = L.polygon([ [517, 638.8], [517.8, 642.3], [516.5, 642.6], [516.75, 643.3], [518.5, 644], [520, 649.1], [512.9, 652.2], [511.1, 646.7], [511.75, 644.4], [510.2, 643], [509.9, 641.1] ], 
						{color: 'red', fillColor: '#f03', fillOpacity: 0.5, weight: 1,}).addTo(map);
//Akrams
var p05 = L.polygon([ [487.1, 602.75], [488.2, 606.1], [473.4, 610.1], [474.1, 606.3] ], 
						{color: 'red', fillColor: '#f03', fillOpacity: 0.5, weight: 1,}).addTo(map);
//Zimmermans
var p06 = L.polygon([ [491.1, 517.4], [499, 546.5], [489.9, 548.9], [480.4, 518.5] ], 
						{color: 'red', fillColor: '#f03', fillOpacity: 0.5, weight: 1,}).addTo(map);


var mapStops = L.featureGroup([p01, p02, p03, p04, p05, p06]);

var leafletIds = [];
for(var i = 0; i <mapStops.getLayers().length; i++){
	leafletIds[i] = mapStops.getLayers()[i]._leaflet_id;
};

	
mapStops.eachLayer(function(layer){
	layer.on('click', function(){
		for(var i = 0; i < leafletIds.length; i++){
			if(layer._leaflet_id == leafletIds[i]){
				if(pgNum != i){
   					pastPgNum = pgNum;
   					pgNum = i;
   					changeStop(pgNum, pastPgNum);
   					audio(pgNum);
   				}
			}
		}
		
	});
	layer.on('mouseover', function(){
		layer.setStyle({color:'blue', fillColor:'blue'});
		//console.log(layer._leaflet_id);
	});
	layer.on('mouseout', function(){
		layer.setStyle({color:'red', fillColor:'red'});
	});

});

*/

//polygon.on('mouseover', onHover );


// x,y is the point to test
// cx, cy is circle center, and radius is circle radius
function pointInCircle(x, y, cx, cy, radius) {
  var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
  console.log(distancesquared <= radius * radius);
  //return distancesquared <= radius * radius;
}

//USE THIS TO FIND COORDS FOR STOPS!!
function onMapClick(e) {
	console.log(e.latlng);
	console.log(map.getPixelBounds());
}
map.on('click', onMapClick);

function onZoom(e){
	//console.log(map.getZoom());
	if(map.getZoom()==0){
		map.setView(mapCenter, 0);
		console.log("boom");
	}
}
map.on('zoomend', onZoom);

new GreenAudioPlayer('.gap-example');



/*
//IMAGE GALLERY
function imgGallery(c){
	var images = document.getElementsByClassName("images");
	var activeImg = images[c].getElementsByTagName("img");
	var imgButton = images[c].getElementsByTagName("svg");
	var button = images[c].getElementsByTagName("circle");


	var imgIds = [];
	var currImg = 0;
	activeImg[currImg].setAttribute("style", "display: block");
	button[currImg].setAttribute("style", "fill: #54bbde");

	console.log(currImg);

	for(var i = 0; i < imgButton.length;i++){
		imgIds[i] = imgButton[i].id;
		if(i != 0){
			activeImg[i].setAttribute("style", "display: none");
			button[i].setAttribute("style", "fill: white");
		}
		imgButton[i].addEventListener("click", function(e){
			var a = imgIds.indexOf(this.id);
			console.log(imgIds.indexOf(this.id));
			if(currImg != a){
				activeImg[currImg].setAttribute("style", "display: none");
				activeImg[a].setAttribute("style", "display: block");
				button[currImg].setAttribute("style", "fill: white");
				button[a].setAttribute("style", "fill: #54bbde");
				currImg = a;
			}

		});
	}
}
*/






