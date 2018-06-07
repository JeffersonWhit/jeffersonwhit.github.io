(function (window) {
    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY},
                {type: 'sawblade',x:650,y:groundY-110},
                {type: 'sawblade',x:900,y:groundY},
                {type: 'bigsaw',x:1300,y:groundY-50},
                {type: 'sawblade',x:1700,y:groundY-110},
                {type: 'sawblade',x:1900,y:groundY},
                {type: 'bigsaw',x:2200,y:groundY-130},
                {type: 'loop',x:2500,y:groundY-100}
            ]
        };

        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        /*
        Rules for Enemies and Obstacles:
        Halle has 5 "Hit Points" in this game.
        A minor mistake should deal 20 damage.
        A major mistake should deal 40 damage.
        Rewards should heal 60 damage.
        */
        function createSawBlade(x, y){
            var hitZoneSize = 25;
            var damageFromObstacle = 20;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle,levelData.speed);
            
            myObstacle.x = x;
            myObstacle.y = y;
            
            myObstacle.rotationalVelocity = -10;
            
            game.addGameItem(myObstacle);
            
            var obstacleImage = draw.bitmap('img/thedkcrew.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            
            myObstacle.onPlayerCollision = function() {
                game.changeIntegrity(-40);
                myObstacle.fadeOut();
            }
            
            return myObstacle;
        }
        
        function createBigSawblade(x, y){
            var enemy =  game.createGameItem('enemy',50);
            var redSquare = draw.bitmap('img/thedkcrewlarge.png')
            redSquare.x = -50;
            redSquare.y = -50;
            enemy.addChild(redSquare);
            
            enemy.x = x;
            enemy.y = y;
            
            enemy.velocityX = levelData.speed;
            enemy.rotationalVelocity = -10;
            
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-40);
                enemy.fadeOut();
            }
            
            enemy.onProjectileCollision = function() {
                createSawBlade(enemy.x - 200, enemy.y+50);
                createSawBlade(enemy.x, enemy.y+50);
                createSawBlade(enemy.x + 200, enemy.y+50);
                game.increaseScore(100);
                enemy.velocityX *= -2;
                setTimeout(enemy.shrink(), 1000);
            }
            
            game.addGameItem(enemy);
        }
        
        function createRecursive(x, y){
            var enemy =  game.createGameItem('reward',50);
            var redSquare = draw.bitmap('img/speedup.png')
            redSquare.x = -50;
            redSquare.y = -50;
            enemy.addChild(redSquare);
            
            enemy.x = x;
            enemy.y = y;
            
            enemy.velocityX = levelData.speed;
            enemy.rotationalVelocity = 10;
            
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(60);
                game.increaseScore(1000);
                levelData.speed -= 0.5;
                deleteLevel();
                initializeLevel(enemy.x);
                enemy.fadeOut();
            }
            
            game.addGameItem(enemy);
        }

        function deleteLevel() {
           for(var i = 0; i < levelData.gameItems.length; i++){
                var obstacle = levelData.gameItems[i];
                if (obstacle.type != 'loop') {
                    game.removeGameItem(obstacle.gameItem);
                }
            } 
        }
        
        function initializeLevel(offset){
            for(var i = 0; i < levelData.gameItems.length; i++){
                var obstacle = levelData.gameItems[i];
                if (obstacle.type == 'sawblade') {
                    obstacle.gameItem = createSawBlade(obstacle.x + offset, obstacle.y);
                }
                if (obstacle.type == 'bigsaw') {
                    obstacle.gameItem = createBigSawblade(obstacle.x + offset, obstacle.y);
                }
                if (obstacle.type == 'loop') {
                    obstacle.gameItem = createRecursive(obstacle.x + offset, obstacle.y);
                }
            }
        }
        
        initializeLevel(0);
    }
})(window);
