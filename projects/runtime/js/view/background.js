(function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var buildings = [];
        var rocks = [];
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // TODO: 3 - YOUR DRAW CODE GOES HERE

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'green');
            background.addChild(backgroundFill);
            
            var moon = draw.bitmap('img/moon.png');
            moon.x = 300;
            moon.y = 25;
            moon.scaleX = 0.5;
            moon.scaleY = 0.5;
            background.addChild(moon);
            
            var buildingHeight = 500;
            var building;
            for(var i=0; i<(16); i++){
                building = draw.rect(40, buildingHeight, 'Brown', 'LightBrown',1);
                building.x = 100*i;
                building.y = groundY - buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            var rockHeight = 50;
            var rock;
            for(var i=0; i<14; i++){
                rockHeight = 50 + Math.random(-30, 20);
                rock = draw.rect(40, rockHeight, 'Grey', 'LightGrey',1);
                rock.x = 120*i;
                rock.y = groundY - rockHeight;
                background.addChild(rock);
                rocks.push(rock);
            }
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            for(var i = 0; i < buildings.length; i++){
                var building = buildings[i];
                building.x -= 1;
                if(building.x < -building.width){
                    building.x = canvasWidth;
                }
            }
            
            for(var i = 0; i < rocks.length; i++){
                var rock = rocks[i];
                rock.x -= 1.5;
                if(rock.x < -rock.width){
                    rock.x = canvasWidth
                }
            }
        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
}(window));