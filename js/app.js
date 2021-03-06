/**
 * Simple Platformer/Shooter
 * WebGL with Three.js and Cannon.js
 * DEMOS: http://schteppe.github.io/cannon.js/
 **/

 /** TODO 
  - Delete projectiles 3s after being shot
  - Create fence and invisible wall
  - Create obstacle platforms
  - Create targets
  - Detect when targets are shot (hitscan?)
  - Detect when player enters a certain area
 **/

/**
 * INIT
 **/

var sphereShape,
  player, 
  world, 
  physicsMaterial, 
  walls=[], 
  balls=[], 
  ballMeshes=[], 
  boxes=[], 
  boxMeshes=[];

var camera, 
  scene, 
  renderer;

var geometry, 
  material, 
  mesh;

var controls,
  time = Date.now();

var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );

/** 
 * POINTER LOCK
 **/

var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if (havePointerLock) {
    var element = document.body;
    var pointerlockchange = function (event) {
        if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
            controls.enabled = true;
            blocker.style.display = 'none';
        } else {
            controls.enabled = false;
            blocker.style.display = '-webkit-box';
            blocker.style.display = '-moz-box';
            blocker.style.display = 'box';
            instructions.style.display = '';
        }
    }

    var pointerlockerror = function (event) {
        instructions.style.display = '';
    }

    // Hook pointer lock state change events
    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

    document.addEventListener('pointerlockerror', pointerlockerror, false);
    document.addEventListener('mozpointerlockerror', pointerlockerror, false);
    document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

    instructions.addEventListener('click', function (event) {
        instructions.style.display = 'none';

        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

        if (/Firefox/i.test(navigator.userAgent)) {
            var fullscreenchange = function (event) {
                if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {
                    document.removeEventListener('fullscreenchange', fullscreenchange);
                    document.removeEventListener('mozfullscreenchange', fullscreenchange);
                    element.requestPointerLock();
                }
            }
            document.addEventListener('fullscreenchange', fullscreenchange, false);
            document.addEventListener('mozfullscreenchange', fullscreenchange, false);
            element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
            element.requestFullscreen();
        } else {
            element.requestPointerLock();
        }
    }, false);
} else {
    instructions.innerHTML = 'Sorry, your browser doesn\'t seem to support Pointer Lock API';
}

initCannon();
init();
animate();

function initCannon(){
    // Setup our world
    world = new CANNON.World();
    world.quatNormalizeSkip = 0;
    world.quatNormalizeFast = false;

    var solver = new CANNON.GSSolver();

    world.defaultContactMaterial.contactEquationStiffness = 1e9;
    world.defaultContactMaterial.contactEquationRegularizationTime = 4;

    solver.iterations = 7;
    solver.tolerance = 0.1;
    var split = true;
    if(split) {
        world.solver = new CANNON.SplitSolver(solver);
    } else {
        world.solver = solver;
    }

    world.gravity.set(0,-20,0);
    world.broadphase = new CANNON.NaiveBroadphase();

    // Create a slippery material (friction coefficient = 0.0)
    physicsMaterial = new CANNON.Material("slipperyMaterial");
    var physicsContactMaterial = new CANNON.ContactMaterial(
        physicsMaterial,
        physicsMaterial,
        0.0, // friction coefficient
        0.3  // restitution
    );
    // We must add the contact materials to the world
    world.addContactMaterial(physicsContactMaterial);

    // Create a sphere
    /* This is the player controlled object */
    var mass = 4, radius = 1.3;
    sphereShape = new CANNON.Sphere(radius);
    player = new CANNON.RigidBody(mass,sphereShape,physicsMaterial);
    player.position.set(0,5,0);
    player.linearDamping = 0.9;
    world.add(player);

    // Create a plane
    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.RigidBody(0,groundShape,physicsMaterial);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    world.add(groundBody);
}

function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x4BB5C1, 0, 200 );

    var ambient = new THREE.AmbientLight( 0xBD8D46 );
    scene.add( ambient );

    light = new THREE.SpotLight( 0xFFFFA6 );
    light.position.set( 10, 30, 20 );
    light.target.position.set( 0, 0, 0 );
    if(true){
        light.castShadow = true;

        light.shadowCameraNear = 20;
        light.shadowCameraFar = 50;//camera.far;
        light.shadowCameraFov = 40;

        light.shadowMapBias = 0.1;
        light.shadowMapDarkness = 0.7;
        light.shadowMapWidth = 2*512;
        light.shadowMapHeight = 2*512;

        //light.shadowCameraVisible = true;
    }
    scene.add(light);


    controls = new PointerLockControls(camera , player);
    scene.add(controls.getObject());

    // floor
    geometry = new THREE.PlaneGeometry( 300, 300, 50, 50 );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

    material = new THREE.MeshLambertMaterial( { color: 0x0084ff } );
    THREE.ColorUtils.adjustHSV( material.color, 0, 0, 0.9 );

    // floor texture
    var floorTexture = THREE.ImageUtils.loadTexture('img/sand1.jpg');
    var floorMaterial = new THREE.MeshLambertMaterial({ map: floorTexture });

    mesh = new THREE.Mesh( geometry, floorMaterial );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( scene.fog.color, 1 );

    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

    // Add walls

    // wall materials
    var cubeTexture = THREE.ImageUtils.loadTexture('img/brick1.jpg');
    var cubeMaterial = new THREE.MeshLambertMaterial({ map: cubeTexture });

    for(var i=0; i<4; i++){
        if(i==0) {
            var halfExtents = new CANNON.Vec3(2,4,20);
            var x = 14;
            var y = 4;
            var z = 0;
        } else if(i==1) {
            var halfExtents = new CANNON.Vec3(20,4,2);
            var x = -8;
            var y = 4;
            var z = -22;
        } else if(i==2) {
            var halfExtents = new CANNON.Vec3(2,4,20);
            var x = -30;
            var y = 4;
            var z = 0;
        } else if(i==3) {
            var halfExtents = new CANNON.Vec3(20,4,2);
            var x = -8;
            var y = 4;
            var z = 22;
        }
        var boxShape = new CANNON.Box(halfExtents);
        var boxGeometry = new THREE.CubeGeometry(halfExtents.x*2,halfExtents.y*2,halfExtents.z*2);
        var boxBody = new CANNON.RigidBody(0,boxShape);
        var boxMesh = new THREE.Mesh( boxGeometry, cubeMaterial );
        world.add(boxBody);
        scene.add(boxMesh);
        boxBody.position.set(x,y,z);
        boxMesh.position.set(x,y,z);
        boxMesh.castShadow = true;
        boxMesh.receiveShadow = true;
        boxMesh.useQuaternion = true;
        boxes.push(boxBody);
        boxMeshes.push(boxMesh);
    }

    // Box materials
    var cubeTexture = THREE.ImageUtils.loadTexture('img/metal1.jpg');
    var cubeMaterial = new THREE.MeshLambertMaterial({ map: cubeTexture });
    // var cubeMaterial = new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0x28c0ec });

    // Add boxes
    var halfExtents = new CANNON.Vec3(1,1,1);
    var boxShape = new CANNON.Box(halfExtents);
    var boxGeometry = new THREE.CubeGeometry(halfExtents.x*2,halfExtents.y*2,halfExtents.z*2);
    for(var i=0; i<7; i++){
        var x = (Math.random()-0.5)*20;
        var y = 1 + (Math.random()-0.5)*1;
        var z = (Math.random()-0.5)*20;
        var boxBody = new CANNON.RigidBody(5,boxShape);
        var boxMesh = new THREE.Mesh( boxGeometry, cubeMaterial );
        world.add(boxBody);
        scene.add(boxMesh);
        boxBody.position.set(x,y,z);
        boxMesh.position.set(x,y,z);
        boxMesh.castShadow = true;
        boxMesh.receiveShadow = true;
        boxMesh.useQuaternion = true;
        boxes.push(boxBody);
        boxMeshes.push(boxMesh);
    }

    // Add linked boxes
    // var size = 0.5;
    // var he = new CANNON.Vec3(size,size,size*0.1);
    // var boxShape = new CANNON.Box(he);
    // var mass = 0;
    // var space = 0.1*size;
    // var N=5, last;
    // var boxGeometry = new THREE.CubeGeometry(he.x*2,he.y*2,he.z*2);
    // for(var i=0; i<N; i++){
    //     var boxbody = new CANNON.RigidBody(mass,boxShape);
    //     var boxMesh = new THREE.Mesh( boxGeometry, material );
    //     boxbody.position.set(5,(N-i)*(size*2+2*space) + size*2+space,0);
    //     boxbody.linearDamping=0.01;
    //     boxbody.angularDamping=0.01;
    //     boxMesh.useQuaternion = true;
    //     boxMesh.castShadow = true;
    //     boxMesh.receiveShadow = true;
    //     world.add(boxbody);
    //     scene.add(boxMesh);
    //     boxes.push(boxbody);
    //     boxMeshes.push(boxMesh);

    //     if(i!=0){
    //         // Connect this body to the last one
    //         var c1 = new CANNON.PointToPointConstraint(boxbody,new CANNON.Vec3(-size,size+space,0),last,new CANNON.Vec3(-size,-size-space,0));
    //         var c2 = new CANNON.PointToPointConstraint(boxbody,new CANNON.Vec3(size,size+space,0),last,new CANNON.Vec3(size,-size-space,0));
    //         world.addConstraint(c1);
    //         world.addConstraint(c2);
    //     } else {
    //         mass=0.3;
    //     }
    //     last = boxbody;
    // }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var dt = 1/60;
function animate() {
    requestAnimationFrame( animate );
    if(controls.enabled){
        world.step(dt);

        // Update ball positions
        for(var i=0; i<balls.length; i++){
            balls[i].obj.position.copy(ballMeshes[i].obj.position);
            balls[i].obj.quaternion.copy(ballMeshes[i].obj.quaternion);
        }

        // Update box positions
        for(var i=0; i<boxes.length; i++){
            boxes[i].position.copy(boxMeshes[i].position);
            boxes[i].quaternion.copy(boxMeshes[i].quaternion);
        }
        // Filter projectiles
        // balls = balls.filter(function(ball) {
        //     if(!ball.alive) {
        //         world.remove(ball);
        //     }
        //     return ball.alive;
        // });
        // ballMeshes = ballMeshes.filter(function(mesh) {
        //     if(!mesh.alive) {
        //         scene.remove(mesh);
        //     }
        //     return mesh.alive;
        // });
    }


    controls.update( Date.now() - time );
    renderer.render( scene, camera );
    time = Date.now();

}

// Projectile
// ball texture
var ballTexture = THREE.ImageUtils.loadTexture('img/metal2.jpg');
var ballMaterial = new THREE.MeshLambertMaterial({ map: ballTexture });

var ballShape = new CANNON.Sphere(0.05);
var ballGeometry = new THREE.SphereGeometry(ballShape.radius);
var shootDirection = new THREE.Vector3();
var shootVelo = 20;
var projector = new THREE.Projector();

function getShootDir(targetVec){
    var vector = targetVec;
    targetVec.set(0,0,1);
    projector.unprojectVector(vector, camera);
    var ray = new THREE.Ray(player.position, vector.subSelf(player.position).normalize() );
    targetVec.x = ray.direction.x;
    targetVec.y = ray.direction.y;
    targetVec.z = ray.direction.z;
}


window.addEventListener("click",function(e){ 
    if(controls.enabled==true){
        var x = player.position.x;
        var y = player.position.y;
        var z = player.position.z;
        var ballBody = new CANNON.RigidBody(1,ballShape);
        var ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
        world.add(ballBody);
        scene.add(ballMesh);
        ballMesh.castShadow = true;
        ballMesh.receiveShadow = true;

        ballObj = {
            alive: true,
            obj: ballBody
        };
        meshObj = {
            alive: true,
            obj: ballMesh
        };
        // window.setTimeout(function() {
        //     ballObj.alive = false;
        //     meshObj.alive = false;
        // }, 3000);
        balls.push(ballObj);
        ballMeshes.push(meshObj);

        getShootDir(shootDirection);
        ballBody.velocity.set(
            shootDirection.x * shootVelo,
            shootDirection.y * shootVelo,
            shootDirection.z * shootVelo);

        // Move the ball outside the player sphere
        x += shootDirection.x * (sphereShape.radius*1.02 + ballShape.radius);
        y += shootDirection.y * (sphereShape.radius*1.02 + ballShape.radius);
        z += shootDirection.z * (sphereShape.radius*1.02 + ballShape.radius);
        ballBody.position.set(x,y,z);
        ballMesh.position.set(x,y,z);
        ballMesh.useQuaternion = true;
    }
});