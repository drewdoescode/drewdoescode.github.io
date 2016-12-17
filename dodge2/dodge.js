var C = {
   "game": {
    "width":320,
    "height": 568
  },
  "bg": {
    "width": 320,
    "height": 568,
    "xspeed": 600,
    "yspeed": 0,
    "file": "assets/background.png"
  },
  "p": {
    "file": "assets/player.png",
    "width": 61,
    "height": 61,
    "frames": 4,
    "startx": 160,
    "starty": 500,
    "fps": 15,
    "speed": 5
  },
  "d": {
    "file": "assets/dodge.png",
    "width": 60,
    "height": 60,
    "frames": 2,
    "fps": 6,
    "startx": 160,
    "starty": 32,
    "speed": 20
  }
}
//( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)
class Boot {
  preload() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }
  create() {
    this.state.start("Load")
  }
}

  class Load {
    preload() {
      console.log("Loading...");
       this.load.image("bg",C.bg.file)
       this.load.spritesheet("player",C.p.file,C.p.width,C.p.height,C.p.frames);
       this.load.spritesheet("dodge",C.d.file,C.d.width,C.d.height,C.d.frames);
     }    
    create() {
      console.log("Loaded");
      this.state.start("Play")
    
    }
  }

  class Play {
    create() {
      console.log("Entered Play State");
      this.bg = this.add.tileSprite(0,0,C.bg.width,C.bg.height,"bg");
      this.bg.autoScroll(C.bg.xspeed,C.bg.yspeed);

      this.player = this.add.sprite(C.p.startx,C.p.starty,"player");
      this.player.anchor.set(0.5,0.5);
      this.player.smoothed = true;
      this.player.scale.set(1);
      this.player.animations.add("anim");
      this.player.animations.play("anim",C.p.fps,true);

      this.dodge = this.add.sprite(C.d.startx,C.d.starty,"dodge");
      this.dodge.anchor.set(0.5,0.5);
      this.dodge.smoothed = false;
      this.dodge.scale.set(1);
      this.dodge.animations.add("anim");
      this.dodge.animations.play("anim",C.d.fps,true);

      this.cursors = this.input.keyboard.createCursorKeys();
      this.points = 0
      this.text = game.add.text(0,100, "0 points!", {
        font: "65px Arial",
        fill:"#ff0044",
        align: "center"
      });
    }

    update() {
      if (this.player.x > C.game.width - this.player.width/2) {
        this.player.x = C.game.width - this.player.width/2;
      } else if (this.player.x < 0 + this.player.width/2) {
        this.player.x = 0 + this.player.width/2;
      }
      if (this.player.y > C.game.height -this.player.height/2) {
        this.player.y = C.game.height - this.player.height/2;
      }  else if (this.player.y < 0 + this.player.height/2) {
        this.player.y = 0 + this.player.height/2;
      }
      
      if (this.cursors.left.isDown) {
        this.player.x -= C.p.speed;
      }
      if (this.cursors.up.isDown) {
        this.player.y -= C.p.speed;
      }
      if (this.cursors.down.isDown) {
        this.player.y += C.p.speed;
      }
      if (this.cursors.right.isDown) {
        this.player.x += C.p.speed;
      }
      if (this.dodge.y > this.game.height) {
        this.points += 1;
        if (this.points > 1) {
          this.text.setText(this.points + " points!");
        } else {
          this.text.setText(this.points + " point!");
        }
        this.dodge.y = C.d.starty;
        let px = (C.d.width * this.dodge.scale.x) / 2;
        let max = C.game.width - px
        this.dodge.x = randInt(px,max);
      }
      if (checkOverlap(this.dodge, this.player)) {
        restart()
      }
      this.dodge.y += C.d.speed;
      this.dodge.x += C.d.speed / 10;
    }
    render() {
      game.debug.text("x: " + this.dodge.x + ", y: " + this.dodge.y, 4, 16);
    }
  }

//(∑_∑)(∑_∑)(∑_∑)(∑_∑)(∑_∑)(∑_∑)(∑_∑)(∑_∑)

function restart() {
  game.state.start("Boot");
}

function randInt(min,max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function checkOverlap(dodge,player) {

    var boundsA = dodge.getBounds();
    var boundsB = player.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}
var game = new Phaser.Game(C.game.width,C.game.height);
game.state.add("Boot",Boot);
game.state.add("Load",Load);
game.state.add("Play",Play);
game.state.start("Boot");
