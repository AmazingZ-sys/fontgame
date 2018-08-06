class Game{
    constructor(screen,point,health,pause,sound,replay,over,control){
        //构造函数  自动运行
        this.screen = screen;
        this.point = point;
        this.health = health;
        this.pause = pause;
        this.sound = sound;
        this.pointnum = 0;
        this.healthnum = 10;
        this.sudu = 0.1;
        this.replay = replay;
        this.over = over;
        this.t = "";
        this.control = control;
        this.letterbox = [];
        
    }
    creatletter(num){
        for(let i=0;i<num;i++){
            let obj = {};
            let letter = "";
            let left = "";
            do{
                left = Math.random()*5.7 + 0.6;
            }while(this.repeat(left));


            do{
                let as = Math.floor(Math.random()*26) + 65;   //  创建A-Z的ASCII码
                letter = String.fromCharCode(as);   // 转换为字符
            }while(this.ishas(letter));

            obj.name = letter;
            
            let div = document.createElement("div");
            div.className = "letter";
            div.style.backgroundImage = `url("img/A_Z/${letter}.png")`;  
            
           
            div.style.left = left + "rem";
            obj.left = left;

            obj.top = 0.9;
            obj.node = div;
            this.screen.appendChild(div);
            this.letterbox.push(obj);   
        }
        console.log(this.letterbox)
    }
    ishas(letter){
        // 判断letterbox中是否有letter
        for(let item of this.letterbox){
            if(letter == item.name){
                return true;
            }
        }
        return false;
    }
    repeat(left){
        for(let item of this.letterbox){
            if(Math.abs(left-item.left)<0.5){
                return true;
            }
        }
        return false;
    }

    init(){
        // 初始化
        
        this.pointnum = 0;
        this.healthnum = 10;
        this.point.innerText = this.pointnum;
        this.health.innerText = this.healthnum;
        this.sudu = 0.1;
        this.screen.innerText = "";
        this.letterbox = [];
        this.t = "";
        this.control.style.opacity = 1;
        clearInterval(this.t);
        this.creatletter(5);
        this.gamepause();
        this.pause.classList.toggle("play");
    }

    run(){
        this.t = setInterval(()=>{
            this.letterbox.forEach((item,index)=>{
                item.top += this.sudu;
                if(item.top >= 7.94){
                    this.screen.removeChild(item.node);
                    this.letterbox.splice(index,1);
                    this.creatletter(1);
                    this.healthnum--;
                    this.subhealth();
                    if(this.healthnum <= 0){
                        this.over.style.display = "block";
                        this.over.childNodes[1].childNodes[1].innerText = this.pointnum;
                        this.gamepause();
                        this.speed()
                        // this.init();
                    }
                }
                item.node.style.top = item.top + "rem";
            })
        },200)
    }

    delkey(name){
        this.letterbox.forEach((item,index)=>{
            if(item.name == name){
                this.screen.removeChild(item.node);
                this.letterbox.splice(index,1);
                this.creatletter(1);
                this.pointnum++;
                this.addpoint();
                // this.speed();
            }
        })
    }
    // speed(){
    //     this.sudu = this.point/100<0.1?0.1:this.point/100 + 0.1;
    // }
    addpoint(){
        this.point.innerText = this.pointnum;
        this.sudu=this.pointnum/100<0.1?0.1:this.pointnum/100;
    }
    subhealth(){
        if(this.healthnum<=0){
            this.over.style.display = "block";
        }
        this.health.innerText = this.healthnum;
    }
    gamepause(){
        clearInterval(this.t);
    }
    gamereplay(){
        this.over.style.display = "none";
        this.init();
    }
};