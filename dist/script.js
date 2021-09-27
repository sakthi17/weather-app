// 1. display the input box
// 2. after user enters input, and presses enter 
// 3. prepare URL with the input 
// 4. call the function to send ajax request

function getCoords(){
   $("#coord-box").css("display","inline-block");
   $(".input-group-btn").css("display","inline-block");
   $("#city-box").css("display","none");
}

function getCity(){
   $("#city-box").css("display","inline-block");
   $(".input-group-btn").css("display","inline-block");
   $("#coord-box").css("display","none"); 
}

function getWeatherReport(params){
 
    var weatherappurl = "https://api.openweathermap.org/data/2.5/weather?";
    var apikey = "appid=d66898a4a1e233c6027f4f319b7078c3";
                        
 //alert(weatherappurl + apikey + params);
  
    $.ajax({
        url             : weatherappurl + apikey + params , 
        type            : 'GET' ,
        dataType        : 'json',
        "Content-Type"  : "application/x-www-form-urlencoded",
        error           : function(xhr,err) 
                          { 
                           // alert("Error "+ xhr.status + " " + xhr.responseText); 
                          },
        success         : function(response) 
                          { 
                            //alert(response.weather[0].description);
                            //alert("TEMP = "+ response.main.temp);
                            displayFunction(response);
                          }
    });     
       
  
}

function currentLocationInfo()
{
    $.ajax(
      {
        //url             : "http://ipinfo.io/json" ,
        url             : "https://ip-api.com/json",
        type            : 'GET' ,
        dataType        : 'json',
        "Content-Type"  : "application/x-www-form-urlencoded",
        error           : function(err) 
                          { 
                            alert("ERROR"); 
                          },
        success         : function(response) 
                          { 
                            //alert(response.city + " " + response.region + " " + response.loc);
                            //getWeatherReport("&q="+response.city+","+response.country);
                            //alert(response.city + " " + response.regionName + " " + response.lat + " " + response.lon + " " + response.country);
                            getWeatherReport("&lat="+ response.lat + "&lon=" + response.lon);
                          }
      }
    );
}

function initInputBtns(){
  $("input#latbox,input#lonbox,input#citybox").val("");    //Clear input values
  
  //Hide
  $("#city-box").css("display","none");
  $("#coord-box").css("display","none");
  $(".input-group-btn").css("display","none");
}



function dynamic_bg_change(id){
  
  var imglink = "http://assets2.smoothradio.com/2013/30/weather-1375260252-article-1.jpg";
  switch(true)
  {
    case id >= 200 && id <= 299 :  //Thunderstorm
                    imglink = "http://cfs16.tistory.com/image/18/tistory/2011/02/13/18/17/4d57a1c16975f";
                    break;
    case id >= 300 && id <= 399 :  //Drizzle
                    imglink = "http://www.slate.com/content/dam/slate/blogs/future_tense/2014/05/01/new_york_experiences_10th_rainiest_day_ever_during_extreme_east_coast_weather/487602079-raindrops-are-seen-on-a-window-as-morning-fog-obscures.jpg.CROP.promo-mediumlarge.jpg";                                                                                                                  break;          
    case id >= 500 && id <= 599 :  //Rain
                    imglink ="http://turnaroundtour.com/wp-content/uploads/rainjpeg.jpg"; 
                    break;
    case id >= 600 && id <= 699 :  // snow
                    imglink ="http://ffden-2.phys.uaf.edu/211_fall2013.web.dir/Sean_Counihan/snowfall.jpg";
                    break;
    case id >= 700 && id <= 799 :  // Atmosphere - Smoke
                    imglink ="http://www.extremetech.com/wp-content/uploads/2013/12/smog-beijing-china.jpg";
                    break;
    case id === 800 :      // Clear Sky
                    imglink ="http://img08.deviantart.net/3e18/i/2010/182/6/0/clear_sky_by_omegatafaria.jpg";
                    break;  
    case id === 801 :      // Few Clouds
                    imglink ="http://img08.deviantart.net/ba22/i/2012/122/6/8/clear_sky_by_mixe27-d4y9kfo.jpg";
                    break;
    case id === 802 :      //Scattered Clouds
                    imglink ="http://img08.deviantart.net/ba22/i/2012/122/6/8/clear_sky_by_mixe27-d4y9kfo.jpg";
                    break;
    case id === 804 :      //overcast
                    imglink ="http://img08.deviantart.net/ba22/i/2012/122/6/8/clear_sky_by_mixe27-d4y9kfo.jpg";
                    break;
   }
      // alert(id + " " + imglink);

      $("body").css("background-image","url("+ imglink + ")" );
 }

function processUTCDate(sec){
  var d = new Date(sec*1000);
  return (d.toDateString() + " " + d.toLocaleTimeString());
}

function displayFunction(response){
  
  /* Place and time info */
  $("section #place").text(response.name + " , " + response.sys.country);
  //$("section #time").text("At "+ processUTCDate(response.dt));
  $("section #time span#datestring").text("At  "+ new Date(response.dt * 1000).toDateString() );
  $("section #time span#hms").text(new Date(response.dt * 1000).toLocaleTimeString() );
  
  
  /* Temp and weather Icon*/
    $("section #w-response #description").text(response.weather[0].description); 
    $("section #w-response #response-icon").css("background-image" ,'url("http://openweathermap.org/img/w/'+ response.weather[0].icon +'.png")');
  
    $("section #main-box #kelvintemp").text(response.main.temp);
    $("section #main-box #temp").text(toCelsius(response.main.temp));
    
  
  /*Additional Info*/
 $("section table tr:nth-child(1) td:nth-child(2)  span").text(response.main.humidity); 
  
 $("section table tr:nth-child(2) td:nth-child(2) span").text(response.main.pressure); 
    
 $("section table tr:nth-child(4) td:nth-child(2)  span").text(toCelsius(response.main.temp_min)); 
 $("section table tr:nth-child(5) td:nth-child(2)  span").text(toCelsius(response.main.temp_max)); 
  
 $("section table tr:nth-child(3) td:nth-child(2)  span#windspeed").text(response.wind.speed + " m/s"); 
 $("section table tr:nth-child(3) td:nth-child(2)  span#winddegree").text(response.wind.deg.toFixed(1) + " degree");
 
  /* Display the hiddden section area */
  $("section#display-area").css("display","block");
 
  /* TESTING 
  $("section #w-response #description").text("Mist"); 
    $("section #w-response #response-icon").css("background-image" ,'url("http://openweathermap.org/img/w/50n.png")');
  var id= 804; 
  dynamic_bg_change(id); 
  /* TESTING */
 
  
  /* Change background according to weather */
    dynamic_bg_change(response.weather[0].id); 
}

function toCelsius(kvalue){
  return (kvalue - 273.15).toFixed(1);
}


$(document).ready(function(){
 
  $(window).resize(function () {
    $("#dimension").text( $(window).width() + " x " + $(window).height() );   
  });
  
  
      initInputBtns();
  
      $("#select-input").change(function(){
        var curr_option = $("#select-input").val();
        if(curr_option === "current-location")
        {
            initInputBtns();
            currentLocationInfo();
        }
        else if(curr_option === "city-name")
        {
             initInputBtns();
             getCity();
        }
        else if(curr_option === "coordinates")
        {
           initInputBtns();
           getCoords();
        }
        else
        {
          //alert(" New ERROR"); 
        }
  });
   
      $("#enterbtn").click(function(){
        if( $("#select-input").val() === "coordinates")
        {
            var lat = $("#latbox").val();
            var lon = $("#lonbox").val();
            getWeatherReport("&lat="+lat+"&lon="+lon);
        }
        else if( $("#select-input").val() === "city-name")
        {
            var inputcity = $("input#citybox").val();
            getWeatherReport("&q="+inputcity);
        }
        else if($("#select-input").val() === "current-location"){
          
        }
        else{
          //alert("select input method");
        }
      }); 
  
      $("#btn-c").click(function(){
             var kvalue = $("#kelvintemp").text();
             if(kvalue !== undefined && kvalue>= 0 && kvalue <= 1000)
              {
                $("div#main-box #temp").text((kvalue - 273.15).toFixed(1));
                $("#metric #tunit").text("C");
              }
      });
      $("#btn-f").click(function(){
              var kvalue = $("#kelvintemp").text();
              if(kvalue !== undefined && kvalue>= 0 && kvalue <= 1000)
              {
                $("div#main-box #temp").text((kvalue*(9/5)-459.67).toFixed(1));
                $("#metric #tunit").text("F");
              }
      }); 

});