//tout le code est  a l'intérieur de addEvenListener, le code ne fonctionnera que lorsque tout sera charger
//a l'intérieur du constructeur owlbear class qui est notre charactere controle nous ajoutons
//une référence vers cette .image quie est dans la Class owlbear ...comme spritesheet entant que propriété et je la défini entant que variable
//appelé owlbear cette variable n'a pas été déclaré par nous MAIs!!!!tout les navigateurs créer une référence 
//les variables globales génèrées automatiquement a tous les éléments ID!! cet élément est bien un ID!!
//donc je sais que le navigateur va créer une variables pour l'image sans que je la remonte avec getelementById('moi même')
//class owlbear = this.image = owlbear;  function draw() = context.drawImage(owlbear, this.x, this.y,) c'est bien lui qui dessine l'image il n'as même pas besoin de la référence de la class owlbear incroyable.
//mais pour ce cours je vais faire un getelementByid lol

window.addEventListener('load', function(e){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    class InputHandler {
        constructor(game){
            this.game = game;
            window.addEventListener('keydown', e => {
            this.game.lastKey = `P${e.key}`;  
            const abc = this.game.input;
            
            
       });
           window.addEventListener('keyup', e => {
            this.game.lastKey = `R${e.key}`;
           
           });
          
        }
    }

    class Owlbear {
        constructor(game){
            this.game = game;
            this.spriteWidth = 200;
            this.spriteHeight = 200;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 30;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = 200;
            this.y = 200;
            this.speedX = 0;
            this.speedY = 0; 
            this.maxSpeed = 2; 
            this.image = document.getElementById('owlbear');
            this.fps = 30;
            this.frameInterval = 1000/this.fps;
            this.frameTimer = 0;
        }
        draw(context){
            //context.fillRect(this.x, this.y, this.width,this.height);
            //drawImage prend 5 arguments pour une image et 9 pour pour couper une spritesheet
            //la source du sprite,source x,y,w,h de la zone que nous voulons recadrer de l'image source
            //et les 4 suivant sont : déstination de la coupe = x,y,w,h
            //récap spritesheet  = sources spritesheet coupe x,y,w,h , destination = x,y,w,h 
            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }
        setSpeed(speedX,speedY){
            this.speedX = speedX;
            this.speedY = speedY;
        }
        update(deltaTime){
            if(this.game.lastKey == 'PArrowLeft'){
                this.setSpeed(-this.maxSpeed, 0);
                this.frameY = 3;
            }else if(this.game.lastKey == 'RArrowLeft' && this.speedX < 0){
                this.setSpeed(0,0);
                this.frameY = 2;
            }else if(this.game.lastKey == 'PArrowRight'){
                this.setSpeed(this.maxSpeed,0);
                this.frameY = 5;
            }else if(this.game.lastKey == 'RArrowRight' && this.speedX > 0){
                this.setSpeed(0,0);
                this.frameY = 4;
            }else if(this.game.lastKey =='PArrowUp'){
                this.setSpeed(0, -this.maxSpeed);
                this.frameY = 7;
            }else if(this.game.lastKey == 'RArrowUp'&& this.speedY < 0){
                this.setSpeed(0,0);
                this.frameY = 6;
            }else if(this.game.lastKey == 'PArrowDown'){
                this.setSpeed(0, this.maxSpeed);
                this.frameY = 1;
            }else if(this.game.lastKey == 'RArrowDown' && this.speedY > 0){
                this.setSpeed(0,0);
                this.frameY = 0;
            }

            this.x += this.speedX;
            this.y += this.speedY;
            //horizontal bounderies
            if(this.x < 0){
                this.x = 0;
            }else if(this.x > this.game.width - this.width){
                    this.x = this.game.width - this.width;
            }
            //Verical bounderies
            if(this.y < this.game.topMargin){
                this.y = this.game.topMargin
            }else if(this.y > this.game.height - this.height){
                    this.y = this.game.height - this.height
            }
            //sprite animation
            if(this.frameTimer > this.frameInterval ){
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frametimer = 0;
                }else{
                    this.frameTimer += deltaTime;
                }
    }
    }
    /**
     * OBJECT SCENE-------------------------------------------------------
     */
    class Object {
        constructor(game){
            this.game = game;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        update(){

        }
    }

    class Bush extends Object {
        constructor(game){
            super(game);
            this.game = game;
            this.image = document.getElementById('bush');
            this.imageWidth = 216;
            this.imageHeight = 100;
            this.width = this.imageWidth;
            this.height = this.imageHeight;
            this.x = Math.random()* this.game.width - this.width;
            this.y = this.game.topMargin + Math.random()*(this.game.height - this.height - this.game.topMargin); 
        }
    }
    class Plant extends Object {
        constructor(game){
            super(game);
            this.game = game;
            this.image = document.getElementById('plant');
            this.imageWidth = 212;
            this.imageHeight = 118;
            this.width = this.imageWidth;
            this.height = this.imageHeight;
            this.x = Math.random()* this.game.width - this.width;
            this.y = this.game.topMargin + Math.random()*(this.game.height - this.height - this.game.topMargin); 
        }
    }
    class Grass extends Object {
        constructor(game){
            super(game);
            this.game = game;
            this.image = document.getElementById('grass');
            this.imageWidth = 103;
            this.imageHeight = 182;
            this.width = this.imageWidth;
            this.height = this.imageHeight;
            this.x = Math.random()* this.game.width - this.width;
            this.y = this.game.topMargin + Math.random()*(this.game.height - this.height - this.game.topMargin); 
        }
    }
/**
 * GAME---------------------------------------------------------------------------
 */
    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.topMargin = 200;
            this.lastKey = undefined;
            this.input = new InputHandler(this);
            this.owlbear = new Owlbear(this);
            this.numberOfPlants = 10;
            this.plants = [];
            this.gameObjects = [];
        }
        render(context,deltaTime){
            this.gameObjects = [...this.plants,this.owlbear];
            this.gameObjects.sort((a,b)=>{
                return (a.y + a.height)-(b.y + b.height);
            });
            this.gameObjects.forEach(object => {
                object.draw(context);
                object.update(deltaTime);

            });
         
             
        }
        init(){
            
            for(let i = 0; i< this.numberOfPlants; i++){
                const randomize = Math.random();
                if(randomize < 0.3)this.plants.push(new Bush(this));
                else if(randomize < 0.6)this.plants.push(new Bush(this));
                else this.plants.push(new Grass(this));
            }
        }
    }
    const game = new Game(canvas.width, canvas.height);
        game.init();
    let lastTime = 0;
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx,deltaTime);
        requestAnimationFrame(animate);
        
    }
    animate(0);
  
    
})
// random feuilles dans le canvas
// calcule lair du canvas pour random x = ? y= ?
// un random sur x et un random sur Y ?
// filter et random 
function getRandomInt(num) {
    return Math.random()  ;
  }
  
  console.log(getRandomInt(10));