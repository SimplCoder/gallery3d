function launchGame(name) {
    var uid = location.href.split('?')[1];
    var gameurl="";
    if(name=='car-racing' ){
        var gameurl="https://vitaracegame.web.app?"+uid;
    }
    if(name=='running-game'){
        var gameurl="https://vitasoygogreen.web.app?"+uid;
    }
    if(name=='photo-hunter'){
        var gameurl="https://vitaphotohunt.web.app?"+uid;
    }
     console.log("params", uid);
     window.open(gameurl, "_blank", "width="+screen.availWidth+",height="+screen.availHeight);
 
}

function clickedCheckPoint(index) {
    alert("checkpoint: " + index);
}
