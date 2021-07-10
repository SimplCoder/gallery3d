function launchGame(name) {
  var uid = location.href.split('?')[1];
  var gameurl="";
  if(name=='car-racing' ){
   return;
   
 }
  if(name=='car-racing' ){
     var gameurl="https://vitaracegame.web.app?"+uid;
    
  }
  if(name=='running-game'){
      var gameurl="https://vitasoygogreen.web.app?"+uid;
  }
  if(name=='photo-hunter'){
      var gameurl="https://vitaphotohunt.web.app?"+uid;
  }
  if(name=='game-ranking'){
      var gameurl="https://vitawater.vitavitasoy.com/leaderboard?"+uid;
  }
  if(name=='game-time'){
      var gameurl="https://vitawater.vitavitasoy.com/tc";
  }
  
   console.log("params", uid);
   try{
 if(name=='car-racing' ){
      gtag('event', 'car-racing', {
        'event_category': 'gamelaunch',     
         'event_label': 'Race Game',     
        'value':1       
       });    
  } 
  if(name=='running-game'){
    gtag('event', 'speedie', {
      'event_category': 'gamelaunch',     
       'event_label': 'Speedie Game',     
      'value':1       
     }); 
  }
  if(name=='photo-hunter'){
    gtag('event', 'photo', {
      'event_category': 'gamelaunch',     
       'event_label': 'Photo Game',     
      'value':1       
     }); 
  }
  if(name=='game-ranking'){
    gtag('event', 'ranking', {
      'event_category': '3dGallery',     
       'event_label': 'ranking Launch',     
      'value':1       
     }); 
  }
  if(name=='game-time'){
    gtag('event', 'raning', {
      'event_category': 'rankingLaunch',     
       'event_label': 'ranking Launch',     
      'value':1       
     }); 
  }
   
   }catch(err){

   }
   window.open(gameurl, "_blank", "width="+screen.availWidth+",height="+screen.availHeight);

}

function clickedCheckPoint(index) {
  var webUrl='https://vita3dgal.web.app';
  try{
  gtag('event',index, {
    'event_category': '3dGallery',     
     'event_label': index,     
    'value':1       
   }); 
}catch(err){}
    
   switch(index) {
  case "checkpoint:0": 
    window.open(webUrl+"/checkpoints/1/checkpoint1.html");
    break;
  case "checkpoint:1":
    window.open(webUrl+"/checkpoints/2/checkpoint2.html");
    break;
  case "checkpoint:2":
    window.open(webUrl+"/checkpoints/3/checkpoint3.html");
    break;
  case "checkpoint:3":
    window.open(webUrl+"/checkpoints/4/checkpoint4.html");
    break;   
}

}