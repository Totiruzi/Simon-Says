var SimonSays = window.SimonSays || {};
SimonSays.Game = (function ($) {
    function Game() {
        this.init = function () {
            $("#start_button").bind("click", startGame);


        };

        function startGame() {

            $("#start_button").unbind("click");
            SimonSays.ui.hideButton();
            SimonSays.ui.showScore();

            /*Scene Built Prior*/
            var canvas = document.getElementById("glCanvas");
            var engine = new BABYLON.Engine(canvas, true);

            var pad1, pad2, pad3, pad4, animateEmi, animateBox;
            var input = true;
            var createScene = {
                //loads our initial variables
                sequence: [],
                copy: [],
                turn: 0,
                active: false,

                //starts a fresh new game
                newGame: function () {
                    this.sequence = [];
                    this.copy = [];
                    this.turn = 0;
                    $("#score").html("Ready! Set! Go!");
                    this.active = true;
                    this.nextTurn();
                },

                //adds a new turn to the sequence and sets off an animation
                nextTurn: function () {
                    this.sequence.push(this.numberGenerator());
                    this.copy = this.sequence.slice(0);
                    console.log(this.copy);
                    this.animator(this.sequence);
                },

                //checks for correct input
                checkClick: function (val) {
                    var correctClick = this.copy.shift();
                    this.active = (correctClick == val);
                    this.checkLose();
                },

                //creates a random number
                numberGenerator: function () {
                    return Math.ceil(Math.random() * 4);
                },

                //this checks if you have lost
                checkLose: function () {
                    if (this.copy.length == 0 && this.active) {
                        if (input == true) {
                            this.nextTurn();
                            ++this.turn;
                            $("#score").html("Current Score is " + this.turn);
                            input = false;
                        }
                    }
                    else if (!this.active) {
                        this.gameOver();

                    }
                },

                //resets game state
                gameOver: function () {
                    console.log("game over");
                    this.newGame();
                },

                //converts pad to an integer
                convertClick: function (pickResult) {
                    if (pad1 == pickResult) {
                        return 1;
                    }
                    else if (pad2 == pickResult) {
                        return 2;
                    }
                    else if (pad3 == pickResult) {
                        return 3;
                    }
                    else if (pad4 == pickResult) {
                        return 4;
                    }
                },

                //animation for logic
                animator: function (val) {
                    var i = 0;

                    var time = setInterval(function () {

                        if (val[i] == 1) {
                            pad1.animations.push(animateEmi);
                            pad1.animations.push(animateBox);
                            scene.beginAnimation(pad1, 0, 10, true);
                            i++;
                        }
                        else if (val[i] == 2) {
                            pad2.animations.push(animateEmi);
                            pad2.animations.push(animateBox);
                            scene.beginAnimation(pad2, 0, 10, true);
                            i++;
                        }
                        else if (val[i] == 3) {
                            pad3.animations.push(animateEmi);
                            pad3.animations.push(animateBox);
                            scene.beginAnimation(pad3, 0, 10, true);
                            i++;
                        }
                        else if (val[i] == 4) {
                            pad4.animations.push(animateEmi);
                            pad4.animations.push(animateBox);
                            scene.beginAnimation(pad4, 0, 10, true);
                            i++;
                        }

                        else if (i >= val.length) {
                            clearInterval(time);
                        }
                    }, 600);

                },

                init: function () {
                    scene = new BABYLON.Scene(engine);
                    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -5), scene);

                    camera.setTarget(BABYLON.Vector3.Zero());

                    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
                    light.intensity = .7;

                    pad1 = BABYLON.Mesh.CreateBox("cube1", 1.5, scene);
                    pad1.position.x = -1;
                    pad1.position.z = -.5;
                    pad2 = BABYLON.Mesh.CreateBox("cube2", 1.5, scene);
                    pad2.position.x = 1;
                    pad2.position.z = -.5;
                    pad3 = BABYLON.Mesh.CreateBox("cube3", 1.5, scene);
                    pad3.position.z = 1.5;
                    pad3.position.x = -1;
                    pad4 = BABYLON.Mesh.CreateBox("cube4", 1.5, scene);
                    pad4.position.z = 1.5;
                    pad4.position.x = 1;


                    var material1 = new BABYLON.StandardMaterial("material1", scene);
                    material1.diffuseColor = new BABYLON.Color3(1, 0, 0);
                    var material2 = new BABYLON.StandardMaterial("material2", scene);
                    material2.diffuseColor = new BABYLON.Color3(0, 1, 0);
                    var material3 = new BABYLON.StandardMaterial("material3", scene);
                    material3.diffuseColor = new BABYLON.Color3(0, 0, 1);
                    var material4 = new BABYLON.StandardMaterial("material4", scene);
                    material4.diffuseColor = new BABYLON.Color3(1, 1, 1);

                    pad1.material = material1;
                    pad2.material = material2;
                    pad3.material = material3;
                    pad4.material = material4;


                    animateBox = new BABYLON.Animation("boxPressed", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                    animateEmi = new BABYLON.Animation("boxPressed", "material.emissiveColor", 30, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

                    // An array with all animation keys
                    var keys = [];

                    //At the animation key 0, the value of scaling is "1"
                    keys.push({
                        frame: 0,
                        value: 0
                    });

                    //At the animation key 20, the value of scaling is "0.2"
                    keys.push({
                        frame: 5,
                        value: -0.2
                    });

                    //At the animation key 100, the value of scaling is "1"
                    keys.push({
                        frame: 10,
                        value: 0
                    });

                    // An array with all animation keys
                    var keysC = [];

                    //At the animation key 0, the value of scaling is "1"
                    keysC.push({
                        frame: 0,
                        value: new BABYLON.Color3(0, 0, 0)
                    });

                    //At the animation key 20, the value of scaling is "0.2"
                    keysC.push({
                        frame: 5,
                        value: new BABYLON.Color3(.7, .7, 0)
                    });

                    //At the animation key 100, the value of scaling is "1"
                    keysC.push({
                        frame: 10,
                        value: new BABYLON.Color3(0, 0, 0)
                    });

                    animateBox.setKeys(keys);
                    animateEmi.setKeys(keysC);

                    scene.onPointerDown = function (evt, pickResult) {

                        // if the click hits square execute:
                        if (pickResult.hit) {


                            pickResult.pickedMesh.animations.push(animateBox);
                            pickResult.pickedMesh.animations.push(animateEmi);
                            scene.beginAnimation(pickResult.pickedMesh, 0, 10, true);
                            input = true;
                            createScene.checkClick(createScene.convertClick(pickResult.pickedMesh));

                        }
                    };

                    return scene;
                }
            };

            var scene = createScene.init();

            engine.runRenderLoop(function () {
                if (createScene.active == false){
                    createScene.newGame();
                }
                scene.render();

            });

            window.addEventListener("resize", function () {
                engine.resize();

            });
            /*End of Babylon*/
        }
    }
    return Game;
})
(jQuery);
