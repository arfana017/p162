AFRAME.registerComponent("bowling-balls", {
    init: function() {
        this.throwBall()
    },

    throwBall: function() {
        window.addEventListener("keydown", (e)=>{
            if (e.key == "z") {
                var ball = document.createElement("a-entity")
                ball.setAttribute("geometry", {
                    primitive: "sphere",
                    radius: 0.5
                })
                ball.setAttribute("material", "color", "black")

                var cam = document.querySelector("#camera")
                pos = cam.getAttribute("position")

                ball.setAttribute("position", {
                    x: pos.x, y: pos.y, z: pos.z
                })

                var camera = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3() 
                camera.getWorldDirection(direction)

                ball.setAttribute("velocity", direction.multiplyScalar(-10));
                ball.setAttribute("dynamic-body", {
                  shape: "sphere",
                  mass: "0"
                })
        
                var scene = document.querySelector("#scene");
                ball.addEventListener("collide", this.removeBall)
                scene.appendChild(ball);
            }
        })
    },

    removeBall: function (e) {
        var element = e.detail.target.el
        var elementHit = e.detail.body.el
    
        if (elementHit.id.includes("pins")) //?
          {
            elementHit.setAttribute("material", {
              opacity: 0.6,
              transparent: true
            })
    
            var impulse = new CANNON.Vec3(-2, 2, 1)
            var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute("position"))
            elementHit.body.applyImpulse(impulse, worldPoint)
    
            element.removeEventListener("collide", this.throw)
            
            var scene = document.querySelector("#scene")
            scene.removeChild(element)
        }
      }
})