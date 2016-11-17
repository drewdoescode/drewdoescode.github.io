var C = {
   "game": {
    "width":320,
    "height": 568
  },
  "bg": {
    "width": 320,
    "height": 568,
    "xspeed": 0,
    "yspeed": 600,
    "file": "assets/background.png"
  },
  "p": {
    "file": "assets/player.png",
    "width": 40,
    "height": 40,
    "frames": 2,
    "startx": 0,
    "yspeed": 700,
    "file": "assets/background.png"
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
    }
    create() {
      console.log("Loaded");
      this.state.start("Play")
    
    }
  }

  class Play {
    create() {
      console.log("Entered Play State");
      this.background = this.add.tileSprite(0,0,C.bg.width,C.bg.height,"bg");
      this.background.autoScroll(C.bg.xspeed,C.bg.yspeed);
      this.player = this.add.sprite(C.p.startx,C.p.starty,"player");
      this.player.anchor.set(0.5,0.5);
      this.player.smoothed = true;
      this.player.scale.set(1);
    }
  }

//(∑_∑)(∑_∑)(∑_∑)(∑_∑)(∑_∑)(∑_∑)(∑_∑)(∑_∑)

function restart() {
  game.state.start("Boot");
}

var game = new Phaser.Game(C.game.width,C.game.height);
game.state.add("Boot",Boot);
game.state.add("Load",Load);
game.state.add("Play",Play);
game.state.start("Boot");
