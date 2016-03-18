/* game namespace */
var game = {
 
    /**
     * an object where to store game global data
     */
    data : {
        // score
        score : 0
    },
     
    // Run on page load.
    "onload" : function () {
 
        // Initialize the video.
        if (!me.video.init("screen", 640, 480, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
         
        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }
 
        // Initialize the audio.
        me.audio.init("mp3,ogg");
 
        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);
      
        // Load the resources.
        me.loader.preload(game.resources);
 
        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },
 
 
 
    // Run on game resources loaded.
	"loaded" : function ()
	{
		// set the "Menu" Screen Object
		me.state.set(me.state.MENU, new game.TitleScreen());
	 
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new game.PlayScreen());
	 
		// set the "Credits" Screen Object
		me.state.set(me.state.CREDITS, new game.CreditsScreen());
	 
		// set a global fading transition for the screen
		me.state.transition("fade", "#FFFFFF", 250);
		 
	   // add our entities to the entity pool
	   me.entityPool.add("mainPlayer1", game.LeftPlayerEntity);
	   me.entityPool.add("mainPlayer2", game.RightPlayerEntity);
	   me.entityPool.add("dead", game.deadEntity);
	   //me.entityPool.add("Chair", game.DoodadEntity);
	   me.entityPool.add("forP1", game.TalkP1);
	   me.entityPool.add("forP2", game.TalkP2);
	   me.entityPool.add("bedTalk", game.TalkEntity);
	   
	   me.entityPool.add("carGray",  game.TalkP2CarGray);
	   me.entityPool.add("carWhite", game.TalkP2CarWhite);
	   me.entityPool.add("carBlue",  game.TalkP2CarBlue);
	   
	   me.entityPool.add("keys", game.TalkP2Keys);
	   me.entityPool.add("keys2", game.TalkP2Keys2);
	   me.entityPool.add("drawer", game.TalkP1Drawer);
	   me.entityPool.add("drawerDown", game.TalkP2DrawerDown);
	   me.entityPool.add("ChestOpen", game.TalkP2ChestOpen);
	
	  me.entityPool.add("P1andP2", game.P1andP2 );
	   
	 //  me.entityPool.add("Enemy", game.EnemyEntity);
	   // enable the keyboard for the right side player
	   me.input.bindKey(me.input.KEY.LEFT,  "left");
	   me.input.bindKey(me.input.KEY.RIGHT, "right");
	   me.input.bindKey(me.input.KEY.UP,  "up");
	   me.input.bindKey(me.input.KEY.DOWN, "down");
	   
	   // enable the keyboard for the left side player
	   me.input.bindKey(me.input.KEY.W, "W");
	   me.input.bindKey(me.input.KEY.A, "A");
	   me.input.bindKey(me.input.KEY.S, "S");
	   me.input.bindKey(me.input.KEY.D, "D");
	   
	   me.debug.renderHitBox = true;
	   
	   // start the game
	   me.state.change(me.state.MENU);
	   //me.state.change(me.state.PLAY);
	   //me.state.change(me.state.CREDITS);
	}
};