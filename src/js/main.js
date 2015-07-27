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

            var createScene = function () {

                var scene = new BABYLON.Scene(engine);
                var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -5), scene);

                camera.setTarget(BABYLON.Vector3.Zero());

                var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
                light.intensity = .7;

                var pad1 = BABYLON.Mesh.CreateBox("cube1", 1.5, scene);
                pad1.position.x = -1;
                pad1.position.z = -.5;
                var pad2 = BABYLON.Mesh.CreateBox("cube2", 1.5, scene);
                pad2.position.x = 1;
                pad2.position.z = -.5;
                var pad3 = BABYLON.Mesh.CreateBox("cube3", 1.5, scene);
                pad3.position.z = 1.5;
                pad3.position.x = -1;
                var pad4 = BABYLON.Mesh.CreateBox("cube4", 1.5, scene);
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


                var animateBox = new BABYLON.Animation("boxPressed", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                var animateEmi = new BABYLON.Animation("boxPressed", "material.emissiveColor", 30, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

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
                        console.log(pickResult.pickedMesh.material);

                        pickResult.pickedMesh.animations.push(animateBox);
                        pickResult.pickedMesh.animations.push(animateEmi);
                        scene.beginAnimation(pickResult.pickedMesh, 0, 10, true);
                    }
                };

                return scene;
            }

            var scene = createScene();

            engine.runRenderLoop(function () {
                scene.render();
            });

            window.addEventListener("resize", function () {
                engine.resize();

            });
            /*End of Babylon*/
        };
    };
    return Game;
})(jQuery);
