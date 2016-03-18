game.resources = [
	/**
     * Graphics.
     */
    // our level tileset
    //{name: "area01_level_tiles",  type:"image", src: "data/img/map/area01_level_tiles.png"},
    {name: "floor2",  type:"image", src: "data/img/map/floor2.jpg"},
	// the main player spritesheet
    //{name: "gripe_run_right", type:"image", src: "data/img/sprite/gripe_run_right.png"},
    {name: "yellow_smiley", type:"image", src: "data/img/sprite/father.png"},
    {name: "blue_smiley", type:"image", src: "data/img/sprite/boy.png"},
    {name: "talk_box", type:"image", src: "data/img/sprite/talk_box.png"},
    {name: "bad_guy", type:"image", src: "data/img/sprite/bad_guy.png"},
    {name: "dead", type:"image", src: "data/img/sprite/dead.png"},
	{name: "carGray", type:"image", src: "data/img/sprite/test.png"},
	{name: "Note1-A", type:"image", src: "data/img/sprite/Note1-A.png"},
	{name: "Note2", type:"image", src: "data/img/sprite/Note2.png"},
	{name: "Note3", type:"image", src: "data/img/sprite/Note3.png"},
	{name: "Note4", type:"image", src: "data/img/sprite/Note4.png"},
	{name: "Note5", type:"image", src: "data/img/sprite/Note5.png"},
	{name: "Note6", type:"image", src: "data/img/sprite/Note6.png"},
	{name: "Note7", type:"image", src: "data/img/sprite/Note7.png"},
	{name: "Note8", type:"image", src: "data/img/sprite/Note8.png"},
	{name: "Note9", type:"image", src: "data/img/sprite/Note9.png"},
	{name: "Note10", type:"image", src: "data/img/sprite/Note10.png"},
	{name: "Note11", type:"image", src: "data/img/sprite/Note11.png"},
	// game font
	{name: "32x32_font",          type:"image",	src: "data/img/font/32x32_font.png"},
	// title screen
	{name: "title",        type:"image",	src: "data/img/gui/title.png"},
	// credits
	{name: "credits",        type:"image",	src: "data/img/gui/credits.png"},
	
   //  {name: "bedTalk2", type:"image", src: "data/img/sprite/yellow_smiley_collided.png"},
    /*
     * Maps.
     */
    //{name: "area01", type: "tmx", src: "data/area01.tmx"}
    {name: "area01", type: "tmx", src: "data/environmentv2.tmx"},
	
	/* 
     * Background music. 
     */
    {name: "theme_song", type: "audio", src: "data/bgm/", channel : 1},
	
	/* 
     * Ending music. 
     */
    {name: "Credits_Song", type: "audio", src: "data/bgm/", channel : 1},
     
    /* 
     * Sound effects. 
     */
    {name: "P2Success", type: "audio", src: "data/sfx/", channel : 2},
	{name: "P1Success", type: "audio", src: "data/sfx/", channel : 2},
	{name: "keys", type: "audio", src: "data/sfx/", channel : 2},
	{name: "drawer", type: "audio", src: "data/sfx/", channel : 2},
	{name: "ChestOpen", type: "audio", src: "data/sfx/", channel : 2},
	{name: "P2warning", type: "audio", src: "data/sfx/", channel : 2},
    {name: "car", type: "audio", src: "data/sfx/", channel : 1},
    {name: "Car_Screech", type: "audio", src: "data/sfx/", channel : 1},
    {name: "jump",  type: "audio", src: "data/sfx/", channel : 1},
 
];
