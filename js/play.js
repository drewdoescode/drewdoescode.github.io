

'use strict';

var DogeDodge = {};

DogeDodge.Play = function () {};

DogeDodge.Play.prototype = {

  init: function () {
    console.log("%c~~~Booting the DogeDodge ~~~\n Compliments of Skilstak",
                "color:#fdf6e3; background:#073642");
  },

  preload: function () {
    this.load.image('background','assets/background.png');
    this.load.spritesheet('dodger','assets/dodger.png',40,40,2);
    this.load.spritesheet('fallingobject','assets/fallingobject.png',35,35,1);

  },

  create: function () {
    this.background = this.add.tileSprite(0,0,320,568,"background");
    
    this.background.autoScroll(0,50);
    this.background.scale.set(1);

    this.dodger = this.add.sprite(160,510,'dodger');
    this.dodger.smoothed = false;
    this.dodger.scale.set(2);
    this.dodger.anchor.set(0.5,0.5);
    this.dodger.animations.add('blink');
    this.dodger.animations.play('blink',2,true);
    game.physics.arcade.enable(this.dodger);
    this.dodger.body.collideWorldBounds = true;
    this.dodger.body.bounce.setTo(0.1);
    this.dodger.body.drag.setTo(600);

    this.fallingobject = this.add.sprite(160,50,'fallingobject');
    this.fallingobject.smoothed = false;
    this.fallingobject.scale.set(2);
    this.fallingobject.anchor.set(0.5,0.5);
    this.fallingobject.animations.add('blink');
    this.fallingobject.animations.play('blink',2,true);
    game.physics.arcade.enable(this.fallingobject);
    this.fallingobject.body.velocity.y = 1200;
    
    this.cursors = game.input.keyboard.createCursorKeys();

  },
 // update: function() {
    //this.fallingobject.y += 20;

   // if (this.cursors.left.isDown) { 

     // this.dodger.body.velocity.x = -1200;
   // }
   // if (this.cursors.right.isDown) {
     // this.dodger.velocity.x = 1220;
   // }
   // if (this.fallingobject.y >= 568) {
      //this.fallingobject.y = -32
      
     // this.fallingobject.x = game.rnd.integerInRange(0,320);
   // }    
    
  

    
 // }
//};



  update: function() {
    if (this.cursors.left.isDown) {
      this.dodger.body.velocity.x = -600;
    }
    if (this.cursors.right.isDown) {
      this.dodger.body.velocity.x = 600;
    }
    if (this.fallingobject.y >= 568) {
      this.fallingobject.y = -32;
      this.fallingobject.x = game.rnd.integerInRange(0,320);
    }
  }

};
