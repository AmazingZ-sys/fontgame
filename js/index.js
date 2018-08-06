window.onload = function(){
    let keycon = document.querySelector(".keycon");
    // let play = document.querySelector(".play");
    let pause = document.querySelector(".pause");
    let sound = document.querySelector(".sound");
    let health = document.querySelector(".health");
    let point = document.querySelector(".point");
    let screen = document.querySelector(".screen");
    let over = document.querySelector(".over");
    let replay = document.querySelector(".replay");
    let audio = document.querySelector("#audio");
    let control = document.querySelector(".control");
    let myflag = false;
    keycon.ontouchstart = function(e){
        let src = e.target;
        if(src.className == "btn" && myflag == true){
            src.style.transform = "scale(0.8)";
            gameobj.delkey(src.innerText)
        }
    }
    keycon.ontouchend = function(e){
        let src = e.target;
        if(src.className == "btn"){
            src.style.transform = "scale(1)";
        }
    }

    pause.ontouchstart = function(){
        if(this.className == "pause"){
            this.className = "play";
            gameobj.gamepause();
            myflag = false;
            control.style.opacity = 1;
        }
        else{
            this.className = "pause";
            gameobj.run();
            myflag = true;
            control.style.opacity = 0.2;
        }
    }

    replay.ontouchstart = function(){
        gameobj.gamereplay();
    }

    sound.ontouchstart = function(){
        if(this.className == "sound"){
            this.className = "sound1";
            audio.pause();
        }
        else{
            this.className = "sound";
            audio.play();
        }
    }



    let gameobj = new Game(screen,point,health,pause,sound,replay,over,control);
    // gameobj.screen = screen;
    // gameobj.sound = sound;
    // gameobj.health = health;
    // gameobj.point = point;
    // gameobj.pause = pause;
    // gameobj.replay = replay;
    // gameobj.over = over;

    
    gameobj.creatletter(5);
    gameobj.addpoint();
    gameobj.gamereplay();
    // gameobj.init();
    
        
    
    
};