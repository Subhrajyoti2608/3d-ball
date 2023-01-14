AFRAME.registerComponent("ball",{
    init: function(){
        this.shootBall()
    },
    shootBall: function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key=="z"){
                var ball = document.createElement("a-entity")
                ball.setAttribute("geometry",{primitive:"sphere",radius:0.1})
                ball.setAttribute("material",{color:"black"})

                var cam = document.querySelector("#camera")

                pos = cam.getAttribute("position")

                ball.setAttribute("position",{x:pos.x, y:pos.y, z:pos.z})

                var camera = document.querySelector("#camera").object3D

                var dir = new THREE.Vector3()

                camera.getWorldDirection(dir)

                ball.setAttribute("velocity",dir.multiplyScalar(-10))

                ball.setAttribute("dynamic-body",{shape:"sphere",mass:0})

                var scene = document.querySelector("#scene")

                ball.addEventListener("collide",this.removeBall)

                scene.appendChild(ball)
            }
        })
    },
    removeBall: function(e){

        console.log(e.detail.target.el)

        console.log(e.detail.body.el)

        var element = e.detail.target.el

        var elementHit = e.detail.body.el

        if(element.id.includes("pin")){
            elementHit.setAttribute("material",{opacity:0.6, transparent: true})

            var impulse = new CANNON.vec3(-2,2,1)

            var worldPoint = new CANNON.vec3().copy(elementHit.getAttribute("position"))

            elementHit.body.applyImpulse(impulse,worldPoint)

            element.removeEventListener("collide",this.shoot)

            var scene = document.querySelector("#scene")

            scene.removeChild(element)

        }

    }
})