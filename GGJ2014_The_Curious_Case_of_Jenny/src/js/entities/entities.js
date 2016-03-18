/*------------------- 
left side player entity
-------------------------------- */


var flag1 = false;
var flag2 = false;
var flagG = false;
var giveKeyG = false;
// for gray car puzzle

var flagB = false;
var flagW = false;

var giveKeyB = false;
var giveKeyW = false;
// for white and blue cars puzzles



game.LeftPlayerEntity = me.ObjectEntity.extend({
 
    /* -----
 
    constructor
 
    ------ */
	useWASD: true,
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
 
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 3);
		this.gravity = 0;
 
		// adjust the bounding box
		this.updateColRect(30,40,10,50);
		// 2,28,2,28
		//Working measurements: 10,62,10,62
		//Ashkans testing measurements: 10,28,10,28
		//Kaveh Tested Works the best so far: 10, 50, 10, 50
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 
        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ACTION_OBJECT;
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function()
	{
		var pushX;
		var pushY;
	
		if (me.input.isKeyPressed('A'))
		{
			// flip the sprite on horizontal axis
			this.flipX(true);
			// update the entity velocity
			pushX = -this.accel.x * me.timer.tick;
			this.vel.x += pushX;
		}
		else if (me.input.isKeyPressed('D'))
		{
			// unflip the sprite
			this.flipX(false);
			// update the entity velocity
			pushX = this.accel.x * me.timer.tick;
			this.vel.x += pushX;
		}
		else 
		{
			this.vel.x = pushX = 0;
		}
		
		if (me.input.isKeyPressed('W'))
		{
			// update the entity velocity
			pushY = -this.accel.y * me.timer.tick;
			this.vel.y += pushY;
		}
		else if (me.input.isKeyPressed('S'))
		{
			// update the entity velocity
			pushY = this.accel.y * me.timer.tick;
			this.vel.y += pushY;
		}
		else 
		{
			this.vel.y = pushY = 0;
		}
 
		// check for collision
		var res = me.game.world.collide(this);
	 
		if (res && res.obj.type == me.game.ACTION_OBJECT)
		{
			
			var direction = false;
			if  (   ( res.y < 0 ) && me.input.isKeyPressed('W')  ||
					( res.y > 0) && me.input.isKeyPressed('S') || 
					( res.x > 0) && me.input.isKeyPressed('D') || 
					( res.x < 0) && me.input.isKeyPressed('A') 
				)
				{
					direction = true;
     			}
     		if (direction )
     		{
				this.vel.y -= 2 * pushY;
	     		this.vel.x -= 2 * pushX;
	     		
	     		if ( flagB === true && giveKeyB === false)
	     		{
	     				me.audio.play("keys");
						giveKeyB = true;   
				}
				if ( flagW === true && giveKeyW === false)
				{
						giveKeyW = true;   
						me.audio.play("keys");
				}
					
				if ( flagG === true && giveKeyG === false)
				{
						giveKeyG = true;   
						me.audio.play("keys");
				}
			}
			
		}
 
        // check & update player movement
        this.updateMovement();
 
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
         
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }
});

/*------------------- 
right side player entity
-------------------------------- */
game.RightPlayerEntity = me.ObjectEntity.extend({
 
    /* ----- 
    constructor
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
 
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 3);
		this.gravity = 0;
 
 
		// adjust the bounding box
		// x, w, y, h
		this.updateColRect(18,25,20,25);
		// 2,28,2,28 
		// working measurements: 5,30,5,30
		//Ashkans testing measurements: 30,25,30,20
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 
        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ACTION_OBJECT;
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function()
	{
		var pushX;
		var pushY;
 
        if (me.input.isKeyPressed('left'))
		{
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
			pushX = -this.accel.x * me.timer.tick;
            this.vel.x += pushX;
        }
		else if (me.input.isKeyPressed('right'))
		{
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
			pushX = this.accel.x * me.timer.tick;
            this.vel.x += pushX;
        }
		else 
		{
            this.vel.x = pushX = 0;
        }
		
		if (me.input.isKeyPressed('up'))
		{
            // update the entity velocity
			pushY = -this.accel.y * me.timer.tick;
            this.vel.y += pushY;
        }
		else if (me.input.isKeyPressed('down'))
		{
            // update the entity velocity
			pushY = this.accel.y * me.timer.tick;
            this.vel.y += pushY;
        }
		else 
		{
            this.vel.y = pushY = 0;
        }
 
		// check for collision
		var res = me.game.world.collide(this);
		
	 
		if (res && res.obj.type == me.game.ACTION_OBJECT)
		{

			var direction = false;
			if  (   ( res.y < 0 ) && me.input.isKeyPressed('up')  ||
					( res.y > 0) && me.input.isKeyPressed('down') || 
					( res.x > 0) && me.input.isKeyPressed('right') || 
					( res.x < 0) && me.input.isKeyPressed('left') )
				{
					direction = true;
     			}
     		if (direction )
     		{
				this.vel.y -= 2 * pushY;
	     		this.vel.x -= 2 * pushX;
	     		
	     		if ( flagB === true && giveKeyB === false)
	     		{
	     				me.audio.play("keys");
						giveKeyB = true;   
				}
				if ( flagW === true && giveKeyW === false)
				{
						giveKeyW = true;   
						me.audio.play("keys");
				}
					
				if ( flagG === true && giveKeyG === false)
				{
						giveKeyG = true;   
						me.audio.play("keys");
				}
			}
		}
        // check & update player movement
        this.updateMovement();
	
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        return false;
    }

});

game.P1andP2 = me.ObjectEntity.extend({	
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
		
		this.updateColRect(-80, 96, 0, 96);
        // make it collidable
        this.collidable = true;
		//alert("test");
		// make it invisible
		this.myAlpha = 0;
    },
	
    update: function()
	{
		var res = me.game.collide(this);
		//console.log("this.getOpacity() = " + this.getOpacity());
		
		if(res)
		{
			this.myAlpha = 1.0;
			//me.audio.play("keys");
		}
			
		
		//confirm("test3");
		else
			this.myAlpha = 0.0;
	},

	draw : function(context)
	{
	   // save the previous value
	   var local_alpha = context.globalAlpha;
	   // semi transparency
	   context.globalAlpha = this.myAlpha;
	   // parent draw function
	   this.parent(context);
	   // restore previous value
	   context.globalAlpha = local_alpha;
	}
});

/*----------------
 a talk box entity
------------------------ */
game.TalkP1 = me.ObjectEntity.extend({	
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
		
		this.updateColRect(0, 96, 0, 96);
        // make it collidable
        this.collidable = true;
		//alert("test");
		// make it invisible
		this.myAlpha = 0;
    },
	
    update: function()
	{
		var res = me.game.collide(this);
		//console.log("this.getOpacity() = " + this.getOpacity());
		
		if(res)
		{
			if (   me.input.isKeyPressed('right')     ||  me.input.isKeyPressed('left')|| 
			 me.input.isKeyPressed('up')||  me.input.isKeyPressed('down') )
			{	 
				if ( flagG === false && flag2 === true)
				{
						this.myAlpha = 1.0;
						me.audio.play("keys");
						flagG = true;
				}
			}
			
		}
		//confirm("test3");
		else
			this.myAlpha = 0.0;
	},

	draw : function(context)
	{
	   // save the previous value
	   var local_alpha = context.globalAlpha;
	   // semi transparency
	   context.globalAlpha = this.myAlpha;
	   // parent draw function
	   this.parent(context);
	   // restore previous value
	   context.globalAlpha = local_alpha;
	}
});


game.TalkEntity = me.ObjectEntity.extend({	
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
		
		this.updateColRect(0, 96, 0, 96);
 
        // make it collidable
        this.collidable = true;
		//alert("test");
		// make it invisible
		this.myAlpha = 0;
    },
	
    update: function()
	{
		var res = me.game.collide(this);
		//console.log("this.getOpacity() = " + this.getOpacity());
		//alert("res");
		if(res )
		{
		 	if ( me.input.isKeyPressed('left') || me.input.isKeyPressed('right')
		 		|| me.input.isKeyPressed('up')|| me.input.isKeyPressed('down') )
			{
				this.myAlpha = 1.0;
				me.audio.play("P1Success");
			}
		}

		
		//confirm("test3");

		else

			this.myAlpha = 0.0;

	},

	draw : function(context)
	{
	   // save the previous value
	   var local_alpha = context.globalAlpha;
	   // semi transparency
	   context.globalAlpha = this.myAlpha;
	   // parent draw function
	   this.parent(context);
	   // restore previous value
	   context.globalAlpha = local_alpha;
	}
});



/*----------------------
P2 driving White car
-----------------------*/
game.TalkP2CarWhite = me.ObjectEntity.extend({	
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
		this.updateColRect(0, 96, 0, 96);
        // make it collidable
        this.collidable = true;
		// make it invisible
		this.myAlpha = 0.0;
    },
	
    update: function()
	{
		var res = me.game.collide(this);
		//console.log("this.getOpacity() = " + this.getOpacity());
		if(res )
		{
			if ( me.input.isKeyPressed('A') || me.input.isKeyPressed('D')
		      || me.input.isKeyPressed('W')|| me.input.isKeyPressed('S') )
			{
				if (giveKeyW === true)
				{
					this.myAlpha = 1.0;
					me.audio.play("P2warning");
				}
			}
		}
		else
			this.myAlpha = 0.0;
	},

	draw : function(context)
	{
	   var local_alpha = context.globalAlpha;
	   context.globalAlpha = this.myAlpha;
	   this.parent(context);
	   context.globalAlpha = local_alpha;
	}
});
/*----------------------
P2 driving Gray car
-----------------------*/
game.TalkP2CarGray = me.ObjectEntity.extend({	
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
		this.updateColRect(0, 96, 0, 96);
        this.collidable = true;
		this.myAlpha = 0.0;
    },
	
    update: function()
	{
		var res = me.game.collide(this);
		//console.log("this.getOpacity() = " + this.getOpacity());
		if(res )
		{
			if ( me.input.isKeyPressed('A') || me.input.isKeyPressed('D')
		      || me.input.isKeyPressed('W')|| me.input.isKeyPressed('S') )
			{
				if (giveKeyG === true)
				{
					this.myAlpha = 1.0;
					me.state.change(me.state.CREDITS);
					me.audio.play("Car_Screech");
				}
			}
		}
		else
			this.myAlpha = 0.0;
	},


	draw : function(context)
	{
	   // save the previous value
	   var local_alpha = context.globalAlpha;
	   // semi transparency
	   context.globalAlpha = this.myAlpha;
	   // parent draw function
	   this.parent(context);
	   // restore previous value
	   context.globalAlpha = local_alpha;
	}
});
/*----------------------
P2 driving Blue car
-----------------------*/
game.TalkP2CarBlue = me.ObjectEntity.extend({	
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
		this.updateColRect(0, 96, 0, 96);
        // make it collidable
        this.collidable = true;
		// make it invisible
		this.myAlpha = 0.0;
    },
	
    update: function()
	{
		var res = me.game.collide(this);
		//console.log("this.getOpacity() = " + this.getOpacity());
		if(res )
		{
			if ( me.input.isKeyPressed('A') || me.input.isKeyPressed('D')
		      || me.input.isKeyPressed('W')|| me.input.isKeyPressed('S') )
			{
				if (giveKeyB=== true)
				{
					this.myAlpha = 1.0;
					me.audio.play("P2warning");
				}
			}
		}
		else
			this.myAlpha = 0.0;
	},

	draw : function(context)
	{
	   // save the previous value
	   var local_alpha = context.globalAlpha;
	   // semi transparency
	   context.globalAlpha = this.myAlpha;
	   // parent draw function
	   this.parent(context);
	   // restore previous value
	   context.globalAlpha = local_alpha;
	}
});

/*-----------------------------
P2 finding keys for white car
------------------------------*/
game.TalkP2Keys = me.ObjectEntity.extend({	
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
		
		this.updateColRect(-100, 30, 30, 30);
 
        // make it collidable
        this.collidable = true;
		
		// make it invisible
		this.myAlpha = 0.0;
    },
	
    update: function()
	{
		var res = me.game.collide(this);
		//console.log("this.getOpacity() = " + this.getOpacity());
		
		//alert("res");
		if(res )
		{
			if ( me.input.isKeyPressed('left') || me.input.isKeyPressed('up')
		 		|| me.input.isKeyPressed('right')|| me.input.isKeyPressed('down') )
			{
				if ( flagW === false)
				{
					this.myAlpha = 1.0;
					me.audio.play("keys");
					flagW = true;
				}
			}
		}
		else
			this.myAlpha = 0.0;
	},

	draw : function(context)
	{
	   // save the previous value
	   var local_alpha = context.globalAlpha;
	   // semi transparency
	   context.globalAlpha = this.myAlpha;
	   // parent draw function
	   this.parent(context);
	   // restore previous value
	   context.globalAlpha = local_alpha;
	}
	
});

/*-----------------------------
P2 finding keys for blue car
------------------------------*/
game.TalkP2Keys2 = me.ObjectEntity.extend({	
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
		
		this.updateColRect(-100, 40, 0, 40);
 
        // make it collidable
        this.collidable = true;
		
		// make it invisible
		this.myAlpha = 0.0;
    },
	
    update: function()
	{
		var res = me.game.collide(this);
		//console.log("this.getOpacity() = " + this.getOpacity());
		
		//alert("res");
		if(res )
		 {if ( me.input.isKeyPressed('left') || me.input.isKeyPressed('right')|| 
		 		me.input.isKeyPressed('up')|| me.input.isKeyPressed('down') )
			{
				if ( flagB === false)
				{ 	
					this.myAlpha = 1.0;
					me.audio.play("keys");
					flagB = true;
				}
			}
		}
		else
			this.myAlpha = 0.0;
	},

	draw : function(context)
	{
	   // save the previous value
	   var local_alpha = context.globalAlpha;
	   // semi transparency
	   context.globalAlpha = this.myAlpha;
	   // parent draw function
	   this.parent(context);
	   // restore previous value
	   context.globalAlpha = local_alpha;
	}
});

/*-----------------------------
P2 opening drawer
------------------------------*/
game.TalkP1Drawer = me.ObjectEntity.extend({	
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
		
		this.updateColRect(-55, 30, 0, 96);
 
        // make it collidable
        this.collidable = true;
		
		// make it invisible
		this.myAlpha = 0.0;
    },
	
    update: function()
	{
		var res = me.game.collide(this);
		//console.log("this.getOpacity() = " + this.getOpacity());
		
		//alert("res");
		if(res )
		{
			if ( me.input.isKeyPressed('A') || me.input.isKeyPressed('S')
		    || me.input.isKeyPressed('W')|| me.input.isKeyPressed('D') )
			{
				if (flag1 === false)
				{
					this.myAlpha = 1.0;
					me.audio.play("drawer");
					flag1 = true;
				}
						
						
			}
		}
		else
		
			this.myAlpha = 0.0;
	},

	draw : function(context)
	{
	   // save the previous value
	   var local_alpha = context.globalAlpha;
	   // semi transparency
	   context.globalAlpha = this.myAlpha;
	   // parent draw function
	   this.parent(context);
	   // restore previous value
	   context.globalAlpha = local_alpha;
	}
});

/* ----------------------
 P2 another drawer
 ----------------------*/

game.TalkP2DrawerDown = me.ObjectEntity.extend({	
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
		
		this.updateColRect(-40, 50, 0, 40);
 
        // make it collidable
        this.collidable = true;
		
		// make it invisible
		this.myAlpha = 0.0;
    },
	
    update: function()
	{
		var res = me.game.collide(this);
		//console.log("this.getOpacity() = " + this.getOpacity());
		
		//alert("res");
		if(res )
		{
			if ( me.input.isKeyPressed('A') || me.input.isKeyPressed('S')
		    || me.input.isKeyPressed('D')|| me.input.isKeyPressed('W') )
			{
				if (flag1 === true && flag2 === false)
				{
					this.myAlpha = 1.0;
					me.audio.play("drawer");
					flag2 = true;
				}			
			}
		}
		else
		
			this.myAlpha = 0.0;
	},

	draw : function(context)
	{
	   // save the previous value
	   var local_alpha = context.globalAlpha;
	   // semi transparency
	   context.globalAlpha = this.myAlpha;
	   // parent draw function
	   this.parent(context);
	   // restore previous value
	   context.globalAlpha = local_alpha;
	}
});

/*----------------------
P2 driving car
-----------------------*/
game.TalkP2ChestOpen = me.ObjectEntity.extend({	
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
		
		this.updateColRect(-80, 100, 0, 50);
        this.collidable = true;
		this.myAlpha = 0.0;
    },
	
    update: function()
	{
		var res = me.game.collide(this);
		//console.log("this.getOpacity() = " + this.getOpacity());
		
		if(res )
		{
		 if ( me.input.isKeyPressed('A') || me.input.isKeyPressed('W')|| 
		 	  me.input.isKeyPressed('S')|| me.input.isKeyPressed('D') )
			{
				if ( giveKeyG === true)
				{
					this.myAlpha = 1.0;
					me.audio.play("ChestOpen");
					
				}
			}
		}
		else
			this.myAlpha = 0.0;
	},

	draw : function(context)
	{
	  
	   var local_alpha = context.globalAlpha;
	   context.globalAlpha = this.myAlpha;
	   this.parent(context);
	   context.globalAlpha = local_alpha;
	}
});
/*----------------
 a talk box entity
------------------------ */
game.TalkP2 = me.ObjectEntity.extend({	// all the notes
	
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
		
		this.updateColRect(0, 96, 0, 96);
 
        // make it collidable
        this.collidable = true;
		
		// make it invisible
		this.myAlpha = 0.0;
    },
	
    update: function()
	{
		var res = me.game.collide(this);
		//console.log("this.getOpacity() = " + this.getOpacity());
		
		//alert("res");
		if(res )
		{
			if ( me.input.isKeyPressed('A') || me.input.isKeyPressed('D')||
		       me.input.isKeyPressed('W')|| me.input.isKeyPressed('S') )
			{
				this.myAlpha = 1.0;
				// play the audio track
				me.audio.play("P2Success");
			
			}
		}
		else
			this.myAlpha = 0.0;
	},

	draw : function(context)
	{
	   // save the previous value
	   var local_alpha = context.globalAlpha;
	   // semi transparency
	   context.globalAlpha = this.myAlpha;
	   // parent draw function
	   this.parent(context);
	   // restore previous value
	   context.globalAlpha = local_alpha;
	}

});

