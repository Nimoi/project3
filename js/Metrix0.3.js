var Utils={DeltaTime:0,DeltaSecond:0,DeltaTimeScale:1,MaxDeltaTime:0,UpdateDeltaTime:function(){var a=Date.now();this.DeltaSecond=a-this.LastTime;this.DeltaTime=this.DeltaSecond/1E3*this.DeltaTimeScale;this.LastTime=a;this.DeltaTime>this.MaxDeltaTime&&(this.DeltaTime=this.MaxDeltaTime)},PutInArray:function(a,b){for(var c=0;c<b.length;c++)if(!b[c])return b[c]=a,c;c=b.length;b.push(a);return c},Positive:function(a){return 0<a?1:0==a?0:-1},DegreeToRadian:function(a){return 0.017453292519943295*a},RadianToDegree:function(a){return 57.29577951308232*
a},QuickestRouteBetweenAngles:function(a,b){var c,d;if(b<a)return c=a-b,d=Math.PI-a+b,c>d?-Utils.Positive(d):-Utils.Positive(c);c=b-a;d=Math.PI-b+a;return c>d?Utils.Positive(d):Utils.Positive(c)},InRange:function(a,b,c){return a>b-c&&a<b+c?b:a},Randomi:function(a,b){return Math.round(Math.random()*(b-a))+a},Randomf:function(a,b){return Math.random()*(b-a)+a},GenerateHeightMap:function(a,b,c,d,e,k,l){for(var f=[],g=0;g<e;g++){f[g]=[];for(var h=0;h<d;h++)if(0===g)if(0===h)f[0][0]=2*Math.random()*a-
a;else{var m=f[g][h-1];f[g][h]=m+(2*Math.random()*a-a);f[g][h]>=b&&(f[g][h]=m+Math.random()*-a);f[g][h]<=c&&(f[g][h]=m+Math.random()*a)}else if(0===h)m=f[g-1][h],f[g][h]=m+(2*Math.random()*a-a),f[g][h]>=b&&(f[g][h]=m+Math.random()*-a),f[g][h]<=c&&(f[g][h]=m+Math.random()*a);else{var m=f[g-1][h],n=f[g][h-1];f[g][h]=(m+n)/2+(2*Math.random()*a-a);f[g][h]>=b&&(f[g][h]=(n+m)/2+Math.random()*-a);f[g][h]<=c&&(f[g][h]=(n+m)/2+Math.random()*a)}}if(k){a=[];for(g=0;g<f.length;g++)for(a[g]=[],h=0;h<f[0].length;h++)b=
1,c=f[g][h],0!==g&&0!==h&&(c+=f[g-1][h-1],b++),0!==g&&(c+=f[g-1][h],b++),0!==g&&h!==f[0].length-1&&(c+=f[g-1][h+1],b++),0!==h&&(c+=f[g][h-1],b++),h!==f[0].length-1&&(c+=f[g][h+1],b++),g!==f.length-1&&0!==h&&(c+=f[g+1][h-1],b++),g!==f.length-1&&(c+=f[g+1][h],b++),g!==f.length-1&&h!==f[0].length-1&&(c+=f[g+1][h+1],b++),c/=b,a[g][h]=c;l=l?l:2;for(g=0;g<f.length;g++)for(h=0;h<f[0].length;h++)f[g][h]=(f[g][h]+a[g][h])/l}return f},CalculateHeightMapFromGeometry:function(a,b){for(var c=Utils.CalculateAABBFromGeometry(a),
d=Math.ceil(2*c.size.x/b),c=Math.ceil(2*c.size.z/b),e=[],k=-c/2;k<c/2;k++){e[k+c/2]=[];for(var l=-d/2;l<d/2;l++){for(var f=null,g=null,h=l*b,m=k*b,n=0;n<a.vertices.length;n++)if(null===f)f=a.vertices[n],g=Math.abs(h-a.vertices[n].x)+Math.abs(m-a.vertices[n].z);else{var p=Math.abs(h-a.vertices[n].x)+Math.abs(m-a.vertices[n].z);p<g&&(g=p,f=a.vertices[n])}e[k+c/2][l+d/2]=f.y}}return new Metrix.HeightMap(new THREE.Vector3(0,0,0),b,e)},Tween:function(a,b,c){var d=a,d=(a=a>=b?!0:!1)?d-c*this.DeltaTime:
d+c*this.DeltaTime;return a!=(d>=b?!0:!1)?null:d},CalculateAABBFromGeometry:function(a){var b,c,d,e,k,l,f;e=b=a.vertices[0].x;l=d=a.vertices[0].z;k=c=a.vertices[0].y;for(var g=0;g<a.vertices.length;g++)f=a.vertices[g],b=Math.min(b,f.x),c=Math.min(c,f.y),d=Math.min(d,f.z),e=Math.max(e,f.x),k=Math.max(k,f.y),l=Math.max(l,f.z);a=(e+b)/2;f=(k+c)/2;g=(l+d)/2;return new Metrix.AABB(new THREE.Vector3(0,0,0),new THREE.Vector3(e-b,k-c,l-d),a,f,g)},LoadTextures:function(a,b,c){var d=0,e=[],k="";c&&(k=c);for(c=
0;c<a.length;c++)e[c]=THREE.ImageUtils.loadTexture(k+a[c],{},function(){d++;d===a.length&&b(e)})},LoadModels:function(a,b,c,d,e){var k=new THREE.JSONLoader(!0),l=0,f=[],g="";c&&(g=c);c=function(c){return function(g,k){var h=new THREE.MeshFaceMaterial(k);f[c]=new THREE.Mesh(g,h);THREE.GeometryUtils.triangulateQuads(f[c].geometry);f[c].geometry.computeFaceNormals();f[c].geometry.computeVertexNormals();d&&f[c].geometry.computeMorphNormals();e&&f[c].geometry.computeTangents();l++;l===a.length&&b(f)}};
for(var h=[],m=0;m<a.length;m++)h[m]=c(m);for(m=0;m<a.length;m++)k.load(g+a[m],h[m])}},MUI={ResizingFont:function(a,b){this.percent=a;this.target=b;this.target.fontSize=window.innerHeight*(this.percent/100)+"px"}};MUI.ResizingFont.prototype.Resize=function(){this.target.fontSize=window.innerHeight*(this.percent/100)+"px"};MUI.ResizingFont.prototype.SetVerticalPercent=function(a){this.percent=a;this.target.fontSize=window.innerWidth*(this.poercent/100)+"px"};
MUI.Element=function(a,b,c){this.element=document.createElement(a);this.element.style.position="absolute";this.element.style.left="0%";this.element.style.top="0%";this.element.style.zIndex=1;c&&(this.element.style.cssText=c);b.appendChild(this.element)};MUI.Element.prototype.Hide=function(){this.element.style.display="none"};MUI.Element.prototype.Show=function(){this.element.style.display="inline-block"};MUI.Element.prototype.AddClass=function(a){this.element.className+=a};
MUI.Element.prototype.SetStyle=function(a){this.element.style.cssText=a};MUI.Element.prototype.SetPosition=function(a,b){this.element.style.position="absolute";this.element.style.left=a;this.element.style.top=b};MUI.Element.prototype.SetSize=function(a,b){this.element.style.width=a;this.element.style.height=b};MUI.Element.prototype.SetType=function(a){this.element.type=a};MUI.Element.prototype.SetOpacity=function(a){this.element.style.opacity=a};MUI.Element.prototype.GetOpacity=function(){return parseFloat(this.element.style.opacity)};
MUI.Element.prototype.SetHTML=function(a){this.element.innerHTML=a};MUI.Element.prototype.AddHTML=function(a){this.element.innerHTML+=a};MUI.Element.prototype.OnClick=function(a){this.clickEvent=function(){a()};this.element.addEventListener("mousedown",this.clickEvent,!1)};MUI.Element.prototype.OnHover=function(a){this.hoverEvent=function(){a()};this.element.addEventListener("onmouseover",this.hoverEvent,!1)};
MUI.OptionSelect=function(a,b){this.element=document.createElement("select");for(var c=this.element.selectedIndex=0;c<a.length;c++){var d=document.createElement("option");d.appendChild(document.createTextNode(a[c]));this.element.appendChild(d)}b.appendChild(this.element)};MUI.OptionSelect.prototype.GetSelectedIndex=function(){return this.element.selectedIndex};MUI.OptionSelect.prototype.SetSelectedIndex=function(a){this.element.selectedIndex=a};
MUI.OptionSelect.prototype.Show=function(){this.element.style.display="inline-block"};MUI.OptionSelect.prototype.Hide=function(){this.element.style.display="none"};var Metrix={OnLoad:void 0,ScreenWidth:0,ScreenHeight:0,renderer:null,scene:null,camera:null,Key:[]};Metrix.GraphicsOptions={ViewDistance:500,ViewNear:0.1,FieldOfView:60,ClearColor:0,PhysicalShading:!0,Shadows:!1,ShadowType:THREE.PCFShadowMap,RenderQuality:1};Metrix.WorldOptions={Gravity:1,MaxDeltaTime:0.4};
Metrix.InitializeGraphics=function(){this.renderer&&document.body.removeChild(this.renderer.domElement);this.renderer=new THREE.WebGLRenderer({});this.GraphicsOptions.ClearColor&&this.renderer.setClearColor(this.GraphicsOptions.ClearColor);this.renderer.setSize(Math.round(window.innerWidth*this.GraphicsOptions.RenderQuality),Math.round(window.innerHeight*this.GraphicsOptions.RenderQuality));this.renderer.physicallyBasedShading=this.GraphicsOptions.PhysicalShading;this.GraphicsOptions.Shadows&&(this.renderer.shadowMapEnabled=
!0,this.renderer.shadowMapType=this.GraphicsOptions.ShadowType);this.renderer.autoClear=!1;this.renderer.domElement.style.position="absolute";this.renderer.domElement.style.left="0%";this.renderer.domElement.style.top="0%";this.renderer.domElement.style.width="100%";this.renderer.domElement.style.height="100%";this.renderer.domElement.tabIndex="0";this.renderer.domElement.focus();document.body.appendChild(this.renderer.domElement)};
Metrix.Initialize=function(){this.resizeCallbacks=[];Utils.LastTime=Date.now();Utils.MaxDeltaTime=Metrix.WorldOptions.MaxDeltaTime;this.InitializeWorld();this.InitializeGraphics();this.InitializeMouseLock();this.scene=new THREE.Scene;this.camera=new THREE.PerspectiveCamera(this.GraphicsOptions.FieldOfView,window.innerWidth/window.innerHeight,this.GraphicsOptions.ViewNear,this.GraphicsOptions.ViewDistance);this.passes=[];this.renderTarget=new THREE.WebGLRenderTarget(Math.round(window.innerWidth*this.GraphicsOptions.RenderQuality),
Math.round(window.innerHeight*this.GraphicsOptions.RenderQuality),{format:THREE.RGBAFormat,minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter});this.composer=new THREE.EffectComposer(this.renderer,this.renderTarget);this.scenePass=new THREE.RenderPass(this.scene,this.camera);this.displayPass=new THREE.ShaderPass(THREE.CopyShader);this.displayPass.renderToScreen=!0;this.composer.addPass(this.scenePass);this.composer.addPass(this.displayPass);document.body.addEventListener("keydown",this.KeyDownProc,
!1);document.body.addEventListener("keyup",this.KeyUpProc,!1);window.addEventListener("resize",this.ResizeProc,!1);Metrix.OnLoad&&Metrix.OnLoad()};Metrix.Go=function(){this.RenderTick()};Metrix.KeyDownProc=function(a){Metrix.Key[a.keyCode]=!0;a.preventDefault();return!1};Metrix.KeyUpProc=function(a){Metrix.Key[a.keyCode]=!1;a.preventDefault();return!1};
Metrix.ResizeProc=function(){Metrix.renderTarget=new THREE.WebGLRenderTarget(Math.round(window.innerWidth*Metrix.GraphicsOptions.RenderQuality),Math.round(window.innerHeight*Metrix.GraphicsOptions.RenderQuality),{format:THREE.RGBAFormat,minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter});Metrix.composer=new THREE.EffectComposer(Metrix.renderer,Metrix.renderTarget);Metrix.composer.addPass(Metrix.scenePass);for(var a=0;a<Metrix.passes.length;a++)Metrix.composer.addPass(Metrix.passes[a]);Metrix.composer.addPass(Metrix.displayPass);
Metrix.renderer.setSize(Math.round(window.innerWidth*Metrix.GraphicsOptions.RenderQuality),Math.round(window.innerHeight*Metrix.GraphicsOptions.RenderQuality));Metrix.camera.aspect=window.innerWidth/window.innerHeight;Metrix.camera.updateProjectionMatrix();for(a=0;a<Metrix.resizeCallbacks.length;a++)Metrix.resizeCallbacks[a]()};Metrix.AddObject=function(a){a.metrixObjectIndex=Utils.PutInArray(a,Metrix.world.objects)};Metrix.RemoveObject=function(a){Metrix.world.objects[a.metrixObjectIndex]=null};
Metrix.RenderTick=function(){Utils.UpdateDeltaTime();for(var a=Metrix.world.objects.length;a;){var b=Metrix.world.objects[a-1];if(b)for(var c=b.updateCallbacks.length;c;)b.updateCallbacks[c-1](b),c--;a--}Metrix.renderer.clear();Metrix.composer.render();requestAnimationFrame(Metrix.RenderTick)};
Metrix.AddRenderPass=function(a){this.passes.push(a);this.composer=new THREE.EffectComposer(this.renderer,this.renderTarget);this.composer.addPass(this.scenePass);for(a=0;a<this.passes.length;a++)this.composer.addPass(this.passes[a]);this.composer.addPass(this.displayPass);this.displayPass.renderToScreen=!0};
Metrix.RemoveRenderPass=function(a){a=this.passes.indexOf(a);if(-1!==a){this.passes.splice(a,1);this.composer=new THREE.EffectComposer(this.renderer,this.renderTarget);this.composer.addPass(this.scenePass);for(a=0;a<this.passes.length;a++)this.composer.addPass(this.passes[a]);this.composer.addPass(this.displayPass);this.displayPass.renderToScreen=!0}};Metrix.AddHeightMap=function(a){a.metrixTerrainIndex=Utils.PutInArray(a,Metrix.world.heightMaps)};
Metrix.RemoveHeightMap=function(a){this.world.heightMaps[a.metrixTerrainIndex]=null};Metrix.AddCollisionZone=function(a){a.metrixZoneIndex=Utils.PutInArray(a,Metrix.world.boundZones)};Metrix.RemoveCollisionZone=function(a){this.world.boundZones[a.metrixZoneIndex]=null};Metrix.AddResizeCallback=function(a){this.resizeCallbacks.push(a)};Metrix.RemoveResizeCallback=function(a){a=this.resizeCallbacks.indexOf(a,0);-1!==a&&this.resizeCallbacks.splice(a,1)};
Metrix.InitializeWorld=function(){this.world={};this.world.objects=[];this.world.boundZones=[];this.world.heightMaps=[]};Metrix.InitializeMouseLock=function(){var a=Metrix.renderer.domElement;a.requestMouseLock=a.requestPointerLock||a.mozRequestPointerLock||a.webkitRequestPointerLock;document.exitMouseLock=document.exitPointerLock||document.mozExitPointerLock||document.webkitExitPointerLock};Metrix.IsMouseLockSupported=function(){return Metrix.renderer.domElement.requestMouseLock?!0:!1};
Metrix.LockMouse=function(a,b){this.mouseLockOnMove=a;this.mouseLockOnExit=b;this.renderer.domElement.requestMouseLock();document.addEventListener("pointerlockchange",Metrix.MouseLockChangeProc,!1);document.addEventListener("mozpointerlockchange",Metrix.MouseLockChangeProc,!1);document.addEventListener("webkitpointerlockchange",Metrix.MouseLockChangeProc,!1)};Metrix.ReleaseMouse=function(){document.exitMouseLock()};
Metrix.MouseLockChangeProc=function(a){a=Metrix.renderer.domElement;a===document.pointerLockElement||a===document.mozPointerLockElement||a===document.webkitPointerLockElement?a.addEventListener("mousemove",Metrix.MouseLockMoveProc,!1):(Metrix.mouseLockOnExit&&Metrix.mouseLockOnExit(),document.removeEventListener("pointerlockchange",Metrix.MouseLockChangeProc,!1),document.removeEventListener("mozpointerlockchange",Metrix.MouseLockChangeProc,!1),document.removeEventListener("webkitpointerlockchange",
Metrix.MouseLockChangeProc,!1),a.removeEventListener("mousemove",Metrix.MouseLockMoveProc,!1))};Metrix.MouseLockMoveProc=function(a){Metrix.mouseLockOnMove((a.movementX||a.mozMovementX||a.webkitMovementX||0)/window.innerWidth,(a.movementY||a.mozMovementY||a.webkitMovementY||0)/window.innerHeight)};
Metrix.VelocityUpdateCallback=function(a){var b=a.mass*Utils.DeltaTime;0!==a.velocity.x&&(a.object.position.x+=a.velocity.x*Utils.DeltaTime,a.velocity.x-=b*(a.velocity.x/10)*a.drag,a.velocity.x=Utils.InRange(a.velocity.x,0,a.deadRange));0!==a.velocity.y&&(a.object.position.y+=a.velocity.y*Utils.DeltaTime,a.velocity.y-=b*(a.velocity.y/10)*a.drag,a.velocity.y=Utils.InRange(a.velocity.y,0,a.deadRange));0!==a.velocity.z&&(a.object.position.z+=a.velocity.z*Utils.DeltaTime,a.velocity.z-=b*(a.velocity.z/
10)*a.drag,a.velocity.z=Utils.InRange(a.velocity.z,0,a.deadRange));a.gravity&&(a.velocity.y-=b*Metrix.WorldOptions.Gravity)};
Metrix.AttemptObjectMoveX=function(a,b){var c=null;a.object.position.x+=b;a.heightMap&&(c=a.heightMap.GetHeight(a.object.position.x,a.object.position.z));if(null===c){if(a.IsTouchingObjectsInCollisionZone()){if(a.step)return a.object.position.y+=a.stepDelta,a.IsTouchingObjectsInCollisionZone()?(a.object.position.y-=a.stepDelta,a.object.position.x-=b,!1):!0;a.object.position.x-=b;return!1}return!0}if(a.onHeightMap){if(c<a.object.position.y-a.aabb.size.y+a.aabb.offsetY){if(a.IsTouchingObjectsInCollisionZone()){if(a.step)return a.object.position.y+=
a.stepDelta,a.IsTouchingObjectsInCollisionZone()?(a.object.position.y-=a.stepDelta,a.object.position.x-=b,!1):!0;a.object.position.x-=b;return!1}a.onHeightMap=!1;return!0}var d=a.object.position.y;a.object.position.y=c+a.aabb.size.y-a.aabb.offsetY;if(a.IsTouchingObjectsInCollisionZone()){if(a.step)return a.object.position.y+=a.stepDelta,a.IsTouchingObjectsInCollisionZone()?(a.object.position.y=d,a.object.position.x-=b,!1):!0;a.object.position.y=d;a.object.position.x-=b;return!1}return!0}d=a.heightMap.GetHeight(a.object.position.x-
b,a.object.position.z);if(a.object.position.y-a.aabb.size.y+a.aabb.offsetY>d&&a.object.position.y-a.aabb.size.y+a.aabb.offsetY<=c){a.onHeightMap=!0;if(a.onHMCollision)a.onHMCollision(a);if(a.IsTouchingObjectsInCollisionZone()){if(a.step)return a.object.position.y+=a.stepDelta,a.IsTouchingObjectsInCollisionZone()?(a.object.position.y-=a.stepDelta,a.object.position.x-=b,!1):!0;a.object.position.x-=b;return!1}a.object.position.y=c+a.aabb.size.y-a.aabb.offsetY;return!0}if(a.IsTouchingObjectsInCollisionZone()){if(a.step)return a.object.position.y+=
a.stepDelta,a.IsTouchingObjectsInCollisionZone()?(a.object.position.y-=a.stepDelta,a.object.position.x-=b,!1):!0;a.object.position.x-=b;return!1}return!0};
Metrix.AttemptObjectMoveZ=function(a,b){var c=null;a.object.position.z+=b;a.heightMap&&(c=a.heightMap.GetHeight(a.object.position.x,a.object.position.z));if(null===c){if(a.IsTouchingObjectsInCollisionZone()){if(a.step)return a.object.position.y+=a.stepDelta,a.IsTouchingObjectsInCollisionZone()?(a.object.position.y-=a.stepDelta,a.object.position.z-=b,!1):!0;a.object.position.z-=b;return!1}return!0}if(a.onHeightMap){if(c<a.object.position.y-a.aabb.size.y+a.aabb.offsetY){if(a.IsTouchingObjectsInCollisionZone()){if(a.step)return a.object.position.y+=
a.stepDelta,a.IsTouchingObjectsInCollisionZone()?(a.object.position.y-=a.stepDelta,a.object.position.z-=b,!1):!0;a.object.position.z-=b;return!1}a.onHeightMap=!1;return!0}var d=a.object.position.y;a.object.position.y=c+a.aabb.size.y-a.aabb.offsetY;if(a.IsTouchingObjectsInCollisionZone()){if(a.step)return a.object.position.y+=a.stepDelta,a.IsTouchingObjectsInCollisionZone()?(a.object.position.y=d,a.object.position.z-=b,!1):!0;a.object.position.y=d;a.object.position.z-=b;return!1}return!0}d=a.heightMap.GetHeight(a.object.position.x,
a.object.position.z-b);if(a.object.position.y-a.aabb.size.y+a.aabb.offsetY>d&&a.object.position.y+a.aabb.offsetY-a.aabb.size.y<=c){a.onHeightMap=!0;if(a.onHMCollision)a.onHMCollision(a);if(a.IsTouchingObjectsInCollisionZone()){if(a.step)return a.object.position.y+=a.stepDelta,a.IsTouchingObjectsInCollisionZone()?(a.object.position.y-=a.stepDelta,a.object.position.z-=b,!1):!0;a.object.position.z-=b;return!1}a.object.position.y=c+a.aabb.size.y-a.aabb.offsetY;return!0}if(a.IsTouchingObjectsInCollisionZone()){if(a.step)return a.object.position.y+=
a.stepDelta,a.IsTouchingObjectsInCollisionZone()?(a.object.position.y-=a.stepDelta,a.object.position.z-=b,!1):!0;a.object.position.z-=b;return!1}return!0};
Metrix.AttemptObjectMoveY=function(a,b){if(a.heightMap){if(a.onHeightMap){if(0<b){a.object.position.y+=b;if(a.IsTouchingObjectsInCollisionZone())return a.object.position.y-=b,!1;a.onHeightMap=!1;return!0}return!1}var c=a.heightMap.GetHeight(a.object.position.x,a.object.position.z);if(null===c)return a.object.position.y+=b,a.IsTouchingObjectsInCollisionZone()?(a.object.position.y-=b,0>b&&(a.isSupported=!0),!1):!0;if(a.object.position.y+a.aabb.offsetY-a.aabb.size.y>=c&&a.object.position.y+a.aabb.offsetY-
a.aabb.size.y+b<=c){var d=a.object.position.y;a.object.position.y=c+a.aabb.size.y-a.aabb.offsetY;if(a.IsTouchingObjectsInCollisionZone())return a.object.position.y=d,!1;if(a.onHMCollision)a.onHMCollision(a);a.onHeightMap=!0;return!1}a.object.position.y+=b;return a.IsTouchingObjectsInCollisionZone()?(0>b&&(a.isSupported=!0),a.object.position.y-=b,!1):!0}a.object.position.y+=b;return a.IsTouchingObjectsInCollisionZone()?(0>b&&(a.isSupported=!0),a.object.position.y-=b,!1):!0};
Metrix.CollisionUpdateCallback=function(a){if(!a.collisionZone||!a.heightMap){var b=Math.abs(a.velocity.x*Utils.DeltaTime),c=Math.abs(a.velocity.y*Utils.DeltaTime),d=Math.abs(a.velocity.z*Utils.DeltaTime);a.aabb.size.x+=b;a.aabb.size.y+=c;a.aabb.size.z+=d;for(var e=Metrix.world.boundZones.length;e;){if(Metrix.world.boundZones[e-1]&&Metrix.world.boundZones[e-1].aabb.Intersects(a.aabb)){a.collisionZone=Metrix.world.boundZones[e-1];break}e--}for(e=Metrix.world.heightMaps.length;e;){if(Metrix.world.heightMaps[e-
1]&&Metrix.world.heightMaps[e-1].aabb.Intersects(a.aabb)){a.heightMap=Metrix.world.heightMaps[e-1];break}e--}a.aabb.size.x-=b;a.aabb.size.y-=c;a.aabb.size.z-=d}a.collisionZone||a.heightMap?(a.isSupported=!1,b=a.mass*Utils.DeltaTime,a.step&&(a.stepDelta=a.step*Utils.DeltaTime),0!==a.velocity.x&&(Metrix.AttemptObjectMoveX(a,a.velocity.x*Utils.DeltaTime)?(a.velocity.x-=b*(a.velocity.x/10)*a.drag,a.velocity.x=Utils.InRange(a.velocity.x,0,a.deadRange)):a.velocity.x=0),0!==a.velocity.z&&(Metrix.AttemptObjectMoveZ(a,
a.velocity.z*Utils.DeltaTime)?(a.velocity.z-=b*(a.velocity.z/10)*a.drag,a.velocity.z=Utils.InRange(a.velocity.z,0,a.deadRange)):a.velocity.z=0),0!==a.velocity.y&&(Metrix.AttemptObjectMoveY(a,a.velocity.y*Utils.DeltaTime)?(a.velocity.y-=b*(a.velocity.y/10)*a.drag,a.velocity.y=Utils.InRange(a.velocity.y,0,a.deadRange)):a.velocity.y=0),a.onHeightMap&&a.slope&&(a.slopeNormal=a.heightMap.GetNormal(a.object.position.x,a.object.position.z),Math.abs(a.slopeNormal.x)>a.slopeStart&&(a.velocity.x-=a.slopeNormal.x*
a.slopeWeight),Math.abs(a.slopeNormal.z)>a.slopeStart&&(a.velocity.z-=a.slopeNormal.z*a.slopeWeight)),a.gravity&&(a.velocity.y-=b*Metrix.WorldOptions.Gravity),a.collisionZone&&!a.collisionZone.aabb.Intersects(a.aabb)&&(a.collisionZone=null),a.heightMap&&!a.heightMap.aabb.Intersects(a.aabb)&&(a.heightMap=null)):Metrix.VelocityUpdateCallback(a)};
Metrix.InterpolatedCollisionUpdateCallback=function(a){if(!a.collisionZone||!a.heightMap){var b=Math.abs(a.velocity.x*Utils.DeltaTime),c=Math.abs(a.velocity.y*Utils.DeltaTime),d=Math.abs(a.velocity.z*Utils.DeltaTime);a.aabb.size.x+=b;a.aabb.size.y+=c;a.aabb.size.z+=d;for(var e=Metrix.world.boundZones.length;e;){if(Metrix.world.boundZones[e-1]&&Metrix.world.boundZones[e-1].aabb.Intersects(a.aabb)){a.collisionZone=Metrix.world.boundZones[e-1];break}e--}for(e=Metrix.world.heightMaps.length;e;){if(Metrix.world.heightMaps[e-
1]&&Metrix.world.heightMaps[e-1].aabb.Intersects(a.aabb)){a.heightMap=Metrix.world.heightMaps[e-1];break}e--}a.aabb.size.x-=b;a.aabb.size.y-=c;a.aabb.size.z-=d}if(a.collisionZone||a.heightMap){a.isSupported=!1;b=a.mass*Utils.DeltaTime;a.step&&(a.stepDelta=a.step*Utils.DeltaTime);if(0!==a.velocity.x)if(d=a.velocity.x*Utils.DeltaTime,Math.abs(d)>a.aabb.size.x){for(var c=Math.floor(Math.abs(d/a.aabb.size.x)),d=d/c,e=!1,k=0;k<c;k++)if(!Metrix.AttemptObjectMoveX(a,d)){e=!0;a.velocity.x=0;break}e||(a.velocity.x-=
b*(a.velocity.x/10)*a.drag,a.velocity.x=Utils.InRange(a.velocity.x,0,a.deadRange))}else Metrix.AttemptObjectMoveX(a,d)?(a.velocity.x-=b*(a.velocity.x/10)*a.drag,a.velocity.x=Utils.InRange(a.velocity.x,0,a.deadRange)):a.velocity.x=0;if(0!==a.velocity.z)if(d=a.velocity.z*Utils.DeltaTime,Math.abs(d)>a.aabb.size.z){c=Math.ceil(Math.abs(d/a.aabb.size.z));d/=c;e=!1;for(k=0;k<c;k++)if(!Metrix.AttemptObjectMoveZ(a,d)){e=!0;a.velocity.z=0;break}e||(a.velocity.z-=b*(a.velocity.z/10)*a.drag,a.velocity.z=Utils.InRange(a.velocity.z,
0,a.deadRange))}else Metrix.AttemptObjectMoveZ(a,d)?(a.velocity.z-=b*(a.velocity.z/10)*a.drag,a.velocity.z=Utils.InRange(a.velocity.z,0,a.deadRange)):a.velocity.z=0;if(0!==a.velocity.y)if(d=a.velocity.y*Utils.DeltaTime,Math.abs(d)>a.aabb.size.y){c=Math.floor(Math.abs(d/a.aabb.size.y));d/=c;e=!1;for(k=0;k<c;k++)if(!Metrix.AttemptObjectMoveY(a,d)){e=!0;a.velocity.y=0;break}e||(a.velocity.y-=b*(a.velocity.y/10)*a.drag,a.velocity.y=Utils.InRange(a.velocity.y,0,a.deadRange))}else Metrix.AttemptObjectMoveY(a,
d)?(a.velocity.y-=b*(a.velocity.y/10)*a.drag,a.velocity.y=Utils.InRange(a.velocity.y,0,a.deadRange)):a.velocity.y=0;a.onHeightMap&&a.slope&&(a.slopeNormal=a.heightMap.GetNormal(a.object.position.x,a.object.position.z),Math.abs(a.slopeNormal.x)>a.slopeStart&&(a.velocity.x-=a.slopeNormal.x*a.slopeWeight),Math.abs(a.slopeNormal.z)>a.slopeStart&&(a.velocity.z-=a.slopeNormal.z*a.slopeWeight));a.gravity&&(a.velocity.y-=b*Metrix.WorldOptions.Gravity);a.collisionZone&&!a.collisionZone.aabb.Intersects(a.aabb)&&
(a.collisionZone=null);a.heightMap&&!a.heightMap.aabb.Intersects(a.aabb)&&(a.heightMap=null)}else Metrix.VelocityUpdateCallback(a)};Metrix.EmptyFunction=function(){};
Metrix.Object=function(a,b){this.object=a;this.object.metrixEntityObject=this;this.updateCallbacks=[];this.mass=1;this.heightMap=this.collisionZone=this.deadRange=this.velocity=this.gravity=this.aabbs=this.aabb=null;this.onHeightMap=!1;this.drag=1;this.stepDelta=0;if(b){b.drag&&(this.drag=b.drag);if(b.bounds&&(this.aabb=b.bounds.aabb,this.aabb.position=this.object.position,b.bounds.treeBounds)){this.aabbs=b.bounds.treeBounds;for(var c=0;c<b.bounds.treeBounds.length;c++)this.aabbs[c].position=this.object.position}b.step&&
(this.step=b.step);b.gravity&&(this.gravity=!0);b.velocity&&(this.velocity=new THREE.Vector3(0,0,0),this.AddUpdateCallback(Metrix.VelocityUpdateCallback),this.deadRange=0.001);b.collisions&&(this.RemoveUpdateCallback(Metrix.VelocityUpdateCallback),this.AddUpdateCallback(Metrix.CollisionUpdateCallback),this.slope=this.onHeightMap=this.isSupported=!1);b.interpolatedCollisions&&(this.RemoveUpdateCallback(Metrix.VelocityUpdateCallback),this.AddUpdateCallback(Metrix.InterpolatedCollisionUpdateCallback),
this.slope=this.onHeightMap=this.isSupported=!1);b.slope&&(this.slope=!0,this.slopeNormal=new THREE.Vector3(0,0,0),this.slopeStart=0,this.slopeWeight=1,b.slope.start&&(this.slopeStart=b.slope.start),b.slope.weight&&(this.slopeWeight=b.slope.weight));b.deadVelocity&&(this.deadRange=b.deadVelocity);b.mass&&(this.mass=b.mass);b.onObjectCollision&&(this.onObjectCollision=b.onObjectCollision);b.onHeightMapCollision&&(this.onHMCollision=b.onHeightMapCollision)}};
Metrix.Object.prototype.Grounded=function(){return this.isSupported||this.onHeightMap?!0:!1};Metrix.Object.prototype.AddUpdateCallback=function(a){this.updateCallbacks.push(a)};Metrix.Object.prototype.RemoveUpdateCallback=function(a){a=this.updateCallbacks.indexOf(a,0);-1!==a&&this.updateCallbacks.splice(a,1)};Metrix.Object.prototype.MoveForward=function(a){this.velocity.x-=Math.sin(this.object.rotation.y)*a;this.velocity.z-=Math.cos(this.object.rotation.y)*a};
Metrix.Object.prototype.MoveRight=function(a){this.velocity.x+=Math.cos(this.object.rotation.y)*a;this.velocity.z-=Math.sin(this.object.rotation.y)*a};
Metrix.Object.prototype.IsTouchingObjectsInCollisionZone=function(){if(this.collisionZone)for(var a=this.collisionZone.objects.length;a;){var b=this.collisionZone.objects[a-1];if(b!==this&&b.aabb.Intersects(this.aabb))if(b.aabbs)for(var c=b.aabbs.length;c;){if(b.aabbs[c-1].Intersects(this.aabb)){if(this.onObjectCollision)this.onObjectCollision(this,b,c-1);return!0}c--}else{if(this.onObjectCollision)this.onObjectCollision(this,b);return!0}a--}return!1};
Metrix.AABB=function(a,b,c,d,e){this.position=a;this.offsetZ=this.offsetY=this.offsetX=0;c&&(this.offsetX=c);d&&(this.offsetY=d);e&&(this.offsetZ=e);this.size=b.clone();this.size.divideScalar(2)};Metrix.AABB.prototype.GenerateMesh=function(a){a=new THREE.Mesh(new THREE.CubeGeometry(2*this.size.x,2*this.size.y,2*this.size.z),a);a.position=this.position;return a};Metrix.AABB.prototype.SetSize=function(a){this.size=a.clone();this.size.divideScalar(2)};
Metrix.AABB.prototype.Intersects=function(a){return Math.abs(a.position.x+a.offsetX-this.position.x-this.offsetX)<=a.size.x+this.size.x&&Math.abs(a.position.y+a.offsetY-this.position.y-this.offsetY)<=a.size.y+this.size.y&&Math.abs(a.position.z+a.offsetZ-this.position.z-this.offsetZ)<=a.size.z+this.size.z};Metrix.AABB.prototype.Clone=function(){return new Metrix.AABB(this.position.clone(),this.size.clone().multiplyScalar(2),this.offsetX,this.offsetY,this.offsetZ)};
Metrix.HeightMap=function(a,b,c,d){this.heights=c;this.width=this.heights[0].length;this.length=this.heights.length;this.boxSize=b;this.position=a;this.gridWidth=(this.width-1)*b;this.gridLength=(this.length-1)*b;for(a=this.maxHeight=0;a<this.heights[0].length;a++)for(b=0;b<this.heights.length;b++)this.maxHeight=Math.max(this.maxHeight,Math.abs(this.heights[b][a]));this.aabb=d?new Metrix.AABB(this.position,d):new Metrix.AABB(this.position,new THREE.Vector3(this.gridWidth,2*this.maxHeight,this.gridLength));
this.slopeMap=[];d=this.position.x+this.boxSize/2-this.gridWidth/2;b=this.position.z+this.boxSize/2-this.gridLength/2;for(c=0;c<this.length;c++)for(this.slopeMap[c]=[],a=0;a<this.width;a++){var e=d+a*this.boxSize,k=b+c*this.boxSize;this.slopeMap[c][a]={};var l=this.GetHeight(e-this.boxSize/4+0.01,k-this.boxSize/4),f=this.GetHeight(e-this.boxSize/4,k-this.boxSize/4+0.01),g=this.GetHeight(e-this.boxSize/4-0.01,k-this.boxSize/4),h=this.GetHeight(e-this.boxSize/4,k-this.boxSize/4-0.01);this.slopeMap[c][a].negTri=
{};this.slopeMap[c][a].negTri.x=32*(l-g);this.slopeMap[c][a].negTri.z=32*(f-h);l=this.GetHeight(e+this.boxSize/4+0.01,k+this.boxSize/4);f=this.GetHeight(e+this.boxSize/4,k+this.boxSize/4+0.01);g=this.GetHeight(e+this.boxSize/4-0.01,k+this.boxSize/4);h=this.GetHeight(e+this.boxSize/4,k+this.boxSize/4-0.01);this.slopeMap[c][a].posTri={};this.slopeMap[c][a].posTri.x=32*(l-g);this.slopeMap[c][a].posTri.z=32*(f-h)}};
Metrix.HeightMap.prototype.GetNormal=function(a,b){var c=(a-this.position.x+this.gridWidth/2)/this.boxSize,d=(b-this.position.z+this.gridLength/2)/this.boxSize;0>c&&(c=0);c>this.width&&(c=this.width);0>d&&(d=0);d>this.length&&(d=this.length);return 1<c-Math.floor(c)+(d-Math.floor(d))?this.slopeMap[Math.floor(d)][Math.floor(c)].posTri:this.slopeMap[Math.floor(d)][Math.floor(c)].negTri};
Metrix.HeightMap.prototype.SetHeight=function(a,b,c){a>this.position.x+this.aabb.size.x||a<this.position.x-this.aabb.size.x||b>this.position.z+this.aabb.size.z||b<this.position.z-this.aabb.size.z||(this.heights[b/this.boxSize][a/this.boxSize]=c)};
Metrix.HeightMap.prototype.GetHeight=function(a,b){var c=a-this.position.x+this.gridWidth/2,d=b-this.position.z+this.gridLength/2,e=Math.floor(c/this.boxSize),k=Math.floor(d/this.boxSize);if(e+1>=this.width||0>e||k+1>=this.length||0>k)return null;c=c/this.boxSize-e;d=d/this.boxSize-k;return(this.heights[k][e]*(1-d)+this.heights[k+1][e]*d)*(1-c)+(this.heights[k][e+1]*(1-d)+this.heights[k+1][e+1]*d)*c+this.position.y};
Metrix.HeightMap.prototype.GenerateMesh=function(a){var b=new THREE.PlaneGeometry(this.gridWidth,this.gridLength,this.width-1,this.length-1),c=new THREE.Matrix4;c.makeTranslation(-this.gridWidth/2,0,-this.gridLength/2);c.makeRotationX(-Math.PI/2);b.applyMatrix(c);for(var d=c=0;d<this.length;d++)for(var e=0;e<this.width;e++)b.vertices[c].y=this.heights[d][e],c++;THREE.GeometryUtils.triangulateQuads(b);b.computeVertexNormals();b.computeFaceNormals();b.computeBoundingSphere();a=new THREE.Mesh(b,a);a.position=
this.position;return a};Metrix.CollisionZone=function(a,b){this.position=a;this.aabb=new Metrix.AABB(a,b);this.objects=[]};Metrix.CollisionZone.prototype.AddObject=function(a){this.objects.push(a)};Metrix.CollisionZone.prototype.RemoveObject=function(a){a=this.objects.indexOf(a,0);-1!==a&&this.objects.splice(a,1)};Metrix.CollisionZone.prototype.GetHeight=function(){return null};
Metrix.CreateSkyBox=function(a,b,c,d,e,k){a=[a+"posx"+b,a+"negx"+b,a+"posy"+b,a+"negy"+b,a+"posz"+b,a+"negz"+b];b=THREE.ShaderLib.cube;b=new THREE.ShaderMaterial({fragmentShader:b.fragmentShader,vertexShader:b.vertexShader,uniforms:THREE.UniformsUtils.clone(b.uniforms),side:THREE.BackSide,depthWrite:!1});k=THREE.ImageUtils.loadTextureCube(a,{},k);b.uniforms.tCube.value=k;return new THREE.Mesh(new THREE.CubeGeometry(c,d,e),b)};
Metrix.SizeOverLook_LensFlareCallback=function(a,b,c,d){this.x=a-2*a*this.distance;this.y=b-2*b*this.distance;this.scale=c};Metrix.SizeOverLookAndDistance_LensFlareCallback=function(a,b,c,d){this.x=a-2*a*this.distance;this.y=b-2*b*this.distance;this.scale=1/d*c};Metrix.SizeOverLookAndDistanceWithRotation_LensFlareCallback=function(a,b,c,d){this.x=a-2*a*this.distance;this.y=b-2*b*this.distance;this.wantedRotation=this.x*Math.PI/2;this.rotation=(this.wantedRotation-this.rotation)/2;this.scale=1/d*c};
Metrix.Standard_LensFlareCallback=function(a,b,c,d){this.x=a-2*a*this.distance;this.y=b-2*b*this.distance;this.scale=1};Metrix.StandardWithRotation_LensFlareCallback=function(a,b,c,d){this.x=a-2*a*this.distance;this.y=b-2*b*this.distance;this.wantedRotation=this.x*Math.PI/2;this.rotation=(this.wantedRotation-this.rotation)/2;this.scale=1};
Metrix.LensFlare=function(a,b,c,d,e,k,l,f){this.targScreenRes=a;this.lFlareObj=new THREE.LensFlare(d,e,k,THREE.AdditiveBlending,l);this.lFlareObj.lensFlares[0].UpdateCallbackRun=Metrix.Standard_LensFlare;null!=f&&(this.lFlareObj.lensFlares[0].UpdateCallbackRun=f);this.lFlareObj.customUpdateCallback=Metrix.LensFlareCustomUpdateCallback;this.lFlareObj.screenScaleFactor=window.innerHeight/this.targScreenRes;this.lFlareObj.dOSCamPos=b;this.lFlareObj.dOSCustomDist=c;this.lFlareObj.dOSSizeScale=4};
Metrix.LensFlare.prototype.Add=function(a,b,c,d,e){var k=this.lFlareObj.lensFlares.length;this.lFlareObj.add(a,b,c,THREE.AdditiveBlending,d);this.lFlareObj.lensFlares[k].UpdateCallbackRun=Metrix.Standard_LensFlare;null!=e&&(this.lFlareObj.lensFlares[k].UpdateCallbackRun=e)};Metrix.LensFlare.prototype.SetCameraPosition=function(a){this.lFlareObj.dOSCamPos=a};Metrix.LensFlare.prototype.SetFlarePosition=function(a){this.lFlareObj.dOSCustomDist=a};
Metrix.LensFlare.prototype.SetFlareSizeScale=function(a){this.lFlareObj.dOSSizeScale=a};Metrix.LensFlare.prototype.Resize=function(){this.lFlareObj.screenScaleFactor=window.innerHeight/this.targScreenRes};Metrix.LensFlare.prototype.GetMesh=function(){return this.lFlareObj};
Metrix.LensFlareCustomUpdateCallback=function(a){a=2*this.positionScreen.x+2*this.positionScreen.y;0>a&&(a=-a);a=1-a/this.dOSSizeScale;for(var b=this.dOSCamPos.distanceTo(this.dOSCustomDist),c=0;c<this.lensFlares.length;c++)this.lensFlares[c].UpdateCallbackRun(this.positionScreen.x,this.positionScreen.y,a,b),this.lensFlares[c].scale*=this.screenScaleFactor};
Metrix.Vector3Tween=function(a,b,c){this.position=a;this.target=b;this.velocity=new THREE.Vector3((a.x-b.x)/c,(a.y-b.y)/c,(a.z-b.z)/c);this.targetTime=c;this.timeCount=0};Metrix.Vector3Tween.prototype.Update=function(){this.target&&(this.position.add(this.velocity),this.timeCount+=Utils.DeltaTime,this.timeCount>=this.targetTime&&(this.position.set(this.target.x,this.target.y,this.target.z),this.target=null))};
Metrix.Vector3Tween.prototype.SetTarget=function(a,b){this.velocity.set((this.position.x-a.x)/b,(this.position.y-a.y)/b,(this.position.z-a.z)/b);this.targetTime=b;this.timeCount=0;this.target=a};Metrix.Vector3Tween.prototype.Here=function(){return this.target?!1:!0};
Metrix.AnimatedTexture=function(a,b,c,d){this.drawWait=c;this.image=document.createElement("canvas");this.image.width=a;this.image.height=b;this.canvas=this.image.getContext("2d");this.drawCall=d;this.drawCall(this.canvas);this.texture=new THREE.Texture(this.image,new THREE.UVMapping);this.texture.needsUpdate=!0;this.drawCount=0};Metrix.AnimatedTexture.prototype.SetDrawRate=function(a){this.drawWait=a};Metrix.AnimatedTexture.prototype.SetDrawCall=function(a){this.drawCall=a};
Metrix.AnimatedTexture.prototype.GetTexture=function(){return this.texture};Metrix.AnimatedTexture.prototype.Update=function(){this.drawCount--;0>=this.drawCount&&(this.canvas.clearRect(0,0,this.image.width,this.image.height),this.drawCall(this.canvas),this.texture.needsUpdate=!0,this.drawCount=this.drawWait)};
Metrix.ShimmeringWaterTexture=function(a,b,c){this.waterTextures=[a];this.lastTexture=0;this.nextTexture=1;this.shimmerSpeed=b;this.textureFade=0;for(b=1;4>b;b++){var d=document.createElement("canvas");d.width=a.width;d.height=a.height;var e=d.getContext("2d");e.save();e.translate(a.width/2,a.height/2);e.rotate(Utils.DegreeToRadian(90*b));e.drawImage(a,-a.width/2,-a.height/2);e.restore();this.waterTextures.push(d)}this.OnDraw=function(a){a.globalAlpha=this.textureFade;a.drawImage(this.waterTextures[this.nextTexture],
0,0);a.globalAlpha=1-this.textureFade;a.drawImage(this.waterTextures[this.lastTexture],0,0)}.bind(this);this.Update=function(){this.textureFade+=Utils.DeltaTime*this.shimmerSpeed;1<this.textureFade&&(this.lastTexture=this.nextTexture,this.CalculateNextTexture(),this.textureFade=0);this.texture.Update()}.bind(this);this.texture=new Metrix.AnimatedTexture(a.width,a.height,c,this.OnDraw)};Metrix.ShimmeringWaterTexture.prototype.GetTexture=function(){return this.texture.texture};
Metrix.ShimmeringWaterTexture.prototype.CalculateNextTexture=function(){this.nextTexture=Utils.Randomi(0,3);this.nextTexture===this.lastTexture&&this.CalculateNextTexture()};Metrix.ParticleVertexShader="attribute vec3 pColor; attribute float pOpacity; attribute float pSize; attribute float pRot; varying vec4 vColor; varying float vRot; void main() { vColor = vec4(pColor,pOpacity); vRot = pRot; vec4 worldPos = modelViewMatrix*vec4(position,1.0); gl_PointSize = pSize*(1000.0/length(worldPos.xyz)); gl_Position = projectionMatrix*worldPos;}";
Metrix.ParticleFragmentShader="uniform sampler2D pTexture; varying vec4 vColor; varying float vRot; void main() { float mX = gl_PointCoord.x-0.5; float mY = gl_PointCoord.y-0.5; float u = cos(vRot); float v = sin(vRot); vec2 rotUv = vec2(u*mX+v*mY+0.5,u*mY-v*mX+0.5); gl_FragColor = vColor; gl_FragColor = gl_FragColor * texture2D(pTexture,rotUv);}";
Metrix.ParticleSystem=function(a,b,c,d){this.material=new THREE.ShaderMaterial({transparent:!0,depthTest:!0,blending:THREE.NormalBlending,vertexShader:Metrix.ParticleVertexShader,fragmentShader:Metrix.ParticleFragmentShader,uniforms:{pTexture:{value:b,type:"t"}},attributes:{pColor:{type:"c",value:[]},pOpacity:{type:"f",value:[]},pSize:{type:"f",value:[]},pRot:{type:"f",value:[]}}});this.maxParticles=a;this.geometry=new THREE.Geometry;this.particles=this.geometry.vertices;for(b=0;b<a;b++)this.particles[b]=
new THREE.Vector3,this.particles[b].life=-1,this.particles[b].startLife=-1,this.particles[b].opacity=0,this.particles[b].color=new THREE.Color,this.particles[b].size=0,this.particles[b].rotation=0,this.particles[b].rotationVelocity=0,this.particles[b].velocity=new THREE.Vector3,this.material.attributes.pColor.value[b]=this.particles[b].color,this.material.attributes.pOpacity.value[b]=0,this.material.attributes.pSize.value[b]=1,this.material.attributes.pRot.value[b]=0;this.lifeOpacityFadeStart=d;this.gravity=
c;this.gravity||(this.gravity=new THREE.Vector3(0,0,0));this.autoEmit=!1;this.emitWait=0.1;this.currentEmitWait=0;this.emitFunctions=[];this.particleSystem=new THREE.ParticleSystem(this.geometry,this.material);this.particleSystem.dynamic=!0;this.particleSystem.sortParticles=!0;this.velocityDeltaBuffer=new THREE.Vector3;this.gravityDeltaBuffer=new THREE.Vector3};Metrix.ParticleSystem.prototype.AddEmitFunction=function(a){this.emitFunctions.push(a)};
Metrix.ParticleSystem.prototype.RemoveEmitFunction=function(a){a=this.emitFunctions.indexOf(a,0);-1!==a&&this.emitFunctions.splice(a,1)};Metrix.ParticleSystem.prototype.GetMesh=function(){return this.particleSystem};
Metrix.ParticleSystem.prototype.Update=function(){if(this.autoEmit&&(this.currentEmitWait-=Utils.DeltaTime,0>=this.currentEmitWait)){for(var a=0;a<this.emitFunctions.length;a++)this.emitFunctions[a](this);this.currentEmitWait=this.emitWait}this.gravityDeltaBuffer.copy(this.gravity);this.gravityDeltaBuffer.multiplyScalar(Utils.DeltaTime);for(a=this.maxParticles;a;){var b=this.particles[a-1];0<b.life&&(b.life-=Utils.DeltaTime,b.opacity=this.lifeOpacityFadeStart?b.life<this.lifeOpacityFadeStart?b.life/
this.lifeOpacityFadeStart:1:b.life/b.startLife,b.rotation+=b.rotationVelocity*Utils.DeltaTime,b.rotation>Math.PI&&(b.rotation=-Math.PI),b.rotation<-Math.PI&&(b.rotation=Math.PI),b.velocity.add(this.gravityDeltaBuffer),this.velocityDeltaBuffer.copy(b.velocity),this.velocityDeltaBuffer.multiplyScalar(Utils.DeltaTime),b.add(this.velocityDeltaBuffer),0>=b.life&&(b.opacity=0),this.material.attributes.pOpacity.value[a-1]=b.opacity,this.material.attributes.pRot.value[a-1]=b.rotation);a--}this.geometry.verticesNeedUpdate=
!0};Metrix.ParticleSystem.prototype.SpawnParticle=function(a,b,c,d,e,k,l,f,g,h,m){for(var n=this.maxParticles;n;){if(0>=this.particles[n-1].life){var p=this.particles[n-1];p.set(a,b,c);p.startLife=l;p.life=l;p.opacity=1;p.velocity.set(d,e,k);p.size=f;p.color=m;p.rotation=g;p.rotationVelocity=h;this.material.attributes.pColor.value[n-1]=m;this.material.attributes.pOpacity.value[n-1]=1;this.material.attributes.pSize.value[n-1]=f;this.material.attributes.pRot.value[n-1]=g;return p}n--}return null};
Metrix.MorphAnimationStructure=function(a,b,c){this.restingAnimation=b;this.animations=a;this.base=new THREE.Object3D;this.parts=[];this.framesPerSecond=c?c:30;this.playingAnimation=!1};
Metrix.MorphAnimationStructure.prototype.Update=function(){if(this.playingAnimation&&(this.animationDuration-=Utils.DeltaSecond,this.animationEventPoint&&this.animationEventPoint<=(this.animationDurationStart-this.animationDuration)/this.animationDurationStart&&(this.animationEventFunction(),this.animationEventPoint=null),0>=this.animationDuration)){this.onAnimationFinish&&(this.onAnimationFinish(),this.onAnimationFinish=null);for(var a=0;a<this.parts.length;a++)this.parts[a].playAnimation(this.restingAnimation,
this.framesPerSecond);this.playingAnimation=!1}for(a=0;a<this.parts.length;a++)this.parts[a].updateAnimation(Utils.DeltaSecond)};Metrix.MorphAnimationStructure.prototype.Add=function(a,b){if(!a.createdAnimations){for(var c=0;c<this.animations.length;c++)a.setAnimationLabel(this.animations[c].name,this.animations[c].start,this.animations[c].end);a.createdAnimations=!0}a.playAnimation(this.restingAnimation,this.framesPerSecond);this.base.add(a);this.parts.push(a)};
Metrix.MorphAnimationStructure.prototype.Remove=function(a){this.base.remove(a);a=this.parts.indexOf(a,0);this.parts.splice(a,1)};Metrix.MorphAnimationStructure.prototype.ClearFinishEvent=function(){this.animationEventPoint=this.onAnimationFinish=null};
Metrix.MorphAnimationStructure.prototype.PlayAnimation=function(a,b,c,d){this.onAnimationFinish&&(this.onAnimationFinish(),this.animationEventPoint=this.onAnimationFinish=null);for(var e=0;e<this.parts.length;e++)this.parts[e].playAnimation(a,this.framesPerSecond);this.playingAnimation=!0;this.animationDuration=this.parts[0].duration;this.animationDurationStart=this.parts[0].duration;this.onAnimationFinish=b;this.animationEventPoint=c;this.animationEventFunction=d};
Metrix.MorphAnimationStructure.prototype.GetMesh=function(){return this.base};Metrix.Audio=function(a,b){this.buffer=new Audio;this.buffer.src=a;this.buffer.autoplay=!1;this.buffer.addEventListener("canplay",function(){b()});this.buffer.load()};Metrix.Audio.prototype.SetVolume=function(a){this.buffer.volume=a};Metrix.Audio.prototype.GetVolume=function(a){return this.buffer.volume};Metrix.Audio.prototype.SetSpeed=function(a){this.buffer.playbackRate=a};Metrix.Audio.prototype.Pause=function(){this.buffer.pause()};
Metrix.Audio.prototype.Stop=function(){this.buffer.pause();currentTime=this.buffer.currentTime=0};Metrix.Audio.prototype.Play=function(a){this.buffer.loop=a;this.buffer.play()};Metrix.FirstPersonController=function(a,b,c){this.object=a;this.object.rotation.order="YXZ";this.maxPitch=b;this.sensitivity=c};Metrix.FirstPersonController.prototype.SetLook=function(a,b){this.object.rotation.y=a;this.object.rotation.x=b};Metrix.FirstPersonController.prototype.GetYaw=function(){return this.object.rotation.y};
Metrix.FirstPersonController.prototype.GetPitch=function(){return this.object.rotation.x};Metrix.FirstPersonController.prototype.Look=function(a,b){this.object.rotation.y+=a*this.sensitivity;this.object.rotation.x+=b*this.sensitivity;this.object.rotation.x=Math.min(this.object.rotation.x,this.maxPitch);this.object.rotation.x=Math.max(this.object.rotation.x,-this.maxPitch)};
var KEY_SPACE=32,KEY_UP=38,KEY_RIGHT=39,KEY_DOWN=40,KEY_LEFT=37,KEY_ENTER=13,KEY_BACKSPACE=8,KEY_SHIFT=16,KEY_ALT=18,KEY_CTRL=17,KEY_DELETE=46,KEY_0=48,KEY_1=49,KEY_2=50,KEY_3=51,KEY_4=52,KEY_5=53,KEY_6=54,KEY_7=55,KEY_8=56,KEY_9=57,KEY_A=65,KEY_B=66,KEY_C=67,KEY_D=68,KEY_E=69,KEY_F=70,KEY_G=71,KEY_H=72,KEY_I=73,KEY_J=74,KEY_K=75,KEY_L=76,KEY_M=77,KEY_N=78,KEY_O=79,KEY_P=80,KEY_Q=81,KEY_O=82,KEY_S=83,KEY_T=84,KEY_U=85,KEY_V=86,KEY_W=87,KEY_X=88,KEY_Y=89,KEY_Z=90;
Function.prototype.bind||(Function.prototype.bind=function(){var a=this,b=Array.prototype.slice.call(arguments),c=b.shift();return function(){return a.apply(c,b.concat(Array.prototype.slice.call(arguments)))}});
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.RenderPass = function ( scene, camera, overrideMaterial, clearColor, clearAlpha ) {

	this.scene = scene;
	this.camera = camera;

	this.overrideMaterial = overrideMaterial;

	this.clearColor = clearColor;
	this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 1;

	this.oldClearColor = new THREE.Color();
	this.oldClearAlpha = 1;

	this.enabled = true;
	this.clear = true;
	this.needsSwap = false;

};

THREE.RenderPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		this.scene.overrideMaterial = this.overrideMaterial;

		if ( this.clearColor ) {

			this.oldClearColor.copy( renderer.getClearColor() );
			this.oldClearAlpha = renderer.getClearAlpha();

			renderer.setClearColor( this.clearColor, this.clearAlpha );

		}

		renderer.render( this.scene, this.camera, readBuffer, this.clear );

		if ( this.clearColor ) {

			renderer.setClearColor( this.oldClearColor, this.oldClearAlpha );

		}

		this.scene.overrideMaterial = null;

	}

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ShaderPass = function ( shader, textureID ) {

	this.textureID = ( textureID !== undefined ) ? textureID : "tDiffuse";

	this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	this.material = new THREE.ShaderMaterial( {

		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader

	} );

	this.renderToScreen = false;

	this.enabled = true;
	this.needsSwap = true;
	this.clear = false;

};

THREE.ShaderPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		if ( this.uniforms[ this.textureID ] ) {

			this.uniforms[ this.textureID ].value = readBuffer;

		}

		THREE.EffectComposer.quad.material = this.material;

		if ( this.renderToScreen ) {

			renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera );

		} else {

			renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, writeBuffer, this.clear );

		}

	}

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.BloomPass = function ( strength, kernelSize, sigma, resolution ) {

	strength = ( strength !== undefined ) ? strength : 1;
	kernelSize = ( kernelSize !== undefined ) ? kernelSize : 25;
	sigma = ( sigma !== undefined ) ? sigma : 4.0;
	resolution = ( resolution !== undefined ) ? resolution : 256;

	// render targets

	var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };

	this.renderTargetX = new THREE.WebGLRenderTarget( resolution, resolution, pars );
	this.renderTargetY = new THREE.WebGLRenderTarget( resolution, resolution, pars );

	// copy material

	if ( THREE.CopyShader === undefined )
		console.error( "THREE.BloomPass relies on THREE.CopyShader" );

	var copyShader = THREE.CopyShader;

	this.copyUniforms = THREE.UniformsUtils.clone( copyShader.uniforms );

	this.copyUniforms[ "opacity" ].value = strength;

	this.materialCopy = new THREE.ShaderMaterial( {

		uniforms: this.copyUniforms,
		vertexShader: copyShader.vertexShader,
		fragmentShader: copyShader.fragmentShader,
		blending: THREE.AdditiveBlending,
		transparent: true

	} );

	// convolution material

	if ( THREE.ConvolutionShader === undefined )
		console.error( "THREE.BloomPass relies on THREE.ConvolutionShader" );

	var convolutionShader = THREE.ConvolutionShader;

	this.convolutionUniforms = THREE.UniformsUtils.clone( convolutionShader.uniforms );

	this.convolutionUniforms[ "uImageIncrement" ].value = THREE.BloomPass.blurx;
	this.convolutionUniforms[ "cKernel" ].value = THREE.ConvolutionShader.buildKernel( sigma );

	this.materialConvolution = new THREE.ShaderMaterial( {

		uniforms: this.convolutionUniforms,
		vertexShader:  convolutionShader.vertexShader,
		fragmentShader: convolutionShader.fragmentShader,
		defines: {
			"KERNEL_SIZE_FLOAT": kernelSize.toFixed( 1 ),
			"KERNEL_SIZE_INT": kernelSize.toFixed( 0 )
		}

	} );

	this.enabled = true;
	this.needsSwap = false;
	this.clear = false;

};

THREE.BloomPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

		if ( maskActive ) renderer.context.disable( renderer.context.STENCIL_TEST );

		// Render quad with blured scene into texture (convolution pass 1)

		THREE.EffectComposer.quad.material = this.materialConvolution;

		this.convolutionUniforms[ "tDiffuse" ].value = readBuffer;
		this.convolutionUniforms[ "uImageIncrement" ].value = THREE.BloomPass.blurX;

		renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, this.renderTargetX, true );


		// Render quad with blured scene into texture (convolution pass 2)

		this.convolutionUniforms[ "tDiffuse" ].value = this.renderTargetX;
		this.convolutionUniforms[ "uImageIncrement" ].value = THREE.BloomPass.blurY;

		renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, this.renderTargetY, true );

		// Render original scene with superimposed blur to texture

		THREE.EffectComposer.quad.material = this.materialCopy;

		this.copyUniforms[ "tDiffuse" ].value = this.renderTargetY;

		if ( maskActive ) renderer.context.enable( renderer.context.STENCIL_TEST );

		renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, readBuffer, this.clear );

	}

};

THREE.BloomPass.blurX = new THREE.Vector2( 0.001953125, 0.0 );
THREE.BloomPass.blurY = new THREE.Vector2( 0.0, 0.001953125 );
/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Convolution shader
 * ported from o3d sample to WebGL / GLSL
 * http://o3d.googlecode.com/svn/trunk/samples/convolution.html
 */

THREE.ConvolutionShader = {

	defines: {

		"KERNEL_SIZE_FLOAT": "25.0",
		"KERNEL_SIZE_INT": "25",

	},

	uniforms: {

		"tDiffuse":        { type: "t", value: null },
		"uImageIncrement": { type: "v2", value: new THREE.Vector2( 0.001953125, 0.0 ) },
		"cKernel":         { type: "fv1", value: [] }

	},

	vertexShader: [

		"uniform vec2 uImageIncrement;",

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv - ( ( KERNEL_SIZE_FLOAT - 1.0 ) / 2.0 ) * uImageIncrement;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float cKernel[ KERNEL_SIZE_INT ];",

		"uniform sampler2D tDiffuse;",
		"uniform vec2 uImageIncrement;",

		"varying vec2 vUv;",

		"void main() {",

			"vec2 imageCoord = vUv;",
			"vec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );",

			"for( int i = 0; i < KERNEL_SIZE_INT; i ++ ) {",

				"sum += texture2D( tDiffuse, imageCoord ) * cKernel[ i ];",
				"imageCoord += uImageIncrement;",

			"}",

			"gl_FragColor = sum;",

		"}"


	].join("\n"),

	buildKernel: function ( sigma ) {

		// We lop off the sqrt(2 * pi) * sigma term, since we're going to normalize anyway.

		function gauss( x, sigma ) {

			return Math.exp( - ( x * x ) / ( 2.0 * sigma * sigma ) );

		}

		var i, values, sum, halfWidth, kMaxKernelSize = 25, kernelSize = 2 * Math.ceil( sigma * 3.0 ) + 1;

		if ( kernelSize > kMaxKernelSize ) kernelSize = kMaxKernelSize;
		halfWidth = ( kernelSize - 1 ) * 0.5;

		values = new Array( kernelSize );
		sum = 0.0;
		for ( i = 0; i < kernelSize; ++i ) {

			values[ i ] = gauss( i - halfWidth, sigma );
			sum += values[ i ];

		}

		// normalize the kernel

		for ( i = 0; i < kernelSize; ++i ) values[ i ] /= sum;

		return values;

	}

};
/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Full-screen textured quad shader
 */

THREE.CopyShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"opacity":  { type: "f", value: 1.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float opacity;",

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",

		"void main() {",

			"vec4 texel = texture2D( tDiffuse, vUv );",
			"gl_FragColor = opacity * texel;",

		"}"

	].join("\n")

};
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.EffectComposer = function ( renderer, renderTarget ) {

	this.renderer = renderer;

	if ( renderTarget === undefined ) {

		var width = window.innerWidth || 1;
		var height = window.innerHeight || 1;
		var parameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: false };

		renderTarget = new THREE.WebGLRenderTarget( width, height, parameters );

	}

	this.renderTarget1 = renderTarget;
	this.renderTarget2 = renderTarget.clone();

	this.writeBuffer = this.renderTarget1;
	this.readBuffer = this.renderTarget2;

	this.passes = [];

	if ( THREE.CopyShader === undefined )
		console.error( "THREE.EffectComposer relies on THREE.CopyShader" );

	this.copyPass = new THREE.ShaderPass( THREE.CopyShader );

};

THREE.EffectComposer.prototype = {

	swapBuffers: function() {

		var tmp = this.readBuffer;
		this.readBuffer = this.writeBuffer;
		this.writeBuffer = tmp;

	},

	addPass: function ( pass ) {

		this.passes.push( pass );

	},

	insertPass: function ( pass, index ) {

		this.passes.splice( index, 0, pass );

	},

	render: function ( delta ) {

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;

		var maskActive = false;

		var pass, i, il = this.passes.length;

		for ( i = 0; i < il; i ++ ) {

			pass = this.passes[ i ];

			if ( !pass.enabled ) continue;

			pass.render( this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive );

			if ( pass.needsSwap ) {

				if ( maskActive ) {

					var context = this.renderer.context;

					context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );

					this.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, delta );

					context.stencilFunc( context.EQUAL, 1, 0xffffffff );

				}

				this.swapBuffers();

			}

			if ( pass instanceof THREE.MaskPass ) {

				maskActive = true;

			} else if ( pass instanceof THREE.ClearMaskPass ) {

				maskActive = false;

			}

		}

	},

	reset: function ( renderTarget ) {

		if ( renderTarget === undefined ) {

			renderTarget = this.renderTarget1.clone();

			renderTarget.width = window.innerWidth;
			renderTarget.height = window.innerHeight;

		}

		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;

	},

	setSize: function ( width, height ) {

		var renderTarget = this.renderTarget1.clone();

		renderTarget.width = width;
		renderTarget.height = height;

		this.reset( renderTarget );

	}

};

// shared ortho camera

THREE.EffectComposer.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );

THREE.EffectComposer.quad = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), null );

THREE.EffectComposer.scene = new THREE.Scene();
THREE.EffectComposer.scene.add( THREE.EffectComposer.quad );
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.MaskPass = function ( scene, camera ) {

	this.scene = scene;
	this.camera = camera;

	this.enabled = true;
	this.clear = true;
	this.needsSwap = false;

	this.inverse = false;

};

THREE.MaskPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		var context = renderer.context;

		// don't update color or depth

		context.colorMask( false, false, false, false );
		context.depthMask( false );

		// set up stencil

		var writeValue, clearValue;

		if ( this.inverse ) {

			writeValue = 0;
			clearValue = 1;

		} else {

			writeValue = 1;
			clearValue = 0;

		}

		context.enable( context.STENCIL_TEST );
		context.stencilOp( context.REPLACE, context.REPLACE, context.REPLACE );
		context.stencilFunc( context.ALWAYS, writeValue, 0xffffffff );
		context.clearStencil( clearValue );

		// draw into the stencil buffer

		renderer.render( this.scene, this.camera, readBuffer, this.clear );
		renderer.render( this.scene, this.camera, writeBuffer, this.clear );

		// re-enable update of color and depth

		context.colorMask( true, true, true, true );
		context.depthMask( true );

		// only render where stencil is set to 1

		context.stencilFunc( context.EQUAL, 1, 0xffffffff );  // draw if == 1
		context.stencilOp( context.KEEP, context.KEEP, context.KEEP );

	}

};


THREE.ClearMaskPass = function () {

	this.enabled = true;

};

THREE.ClearMaskPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		var context = renderer.context;

		context.disable( context.STENCIL_TEST );

	}

};
