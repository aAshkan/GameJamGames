game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() { 
     
	    // play the audio track
		me.audio.playTrack("theme_song");
		
        // load a level
        me.levelDirector.loadLevel("area01");
         
        // reset the score
        game.data.score = 0;
         
        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },
     
     
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
	
		// stop the current audio track
		me.audio.stopTrack();
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    },
	
	onCollision : function ()
	{
		// do something when collected
	 
		// play a "coin collected" sound
		me.audio.play("P2Success");
	 
		// give some score
		game.data.score += 250;
	 
		// make sure it cannot be collected "again"
		this.collidable = false;
		// remove it
		me.game.remove(this);
	},
});