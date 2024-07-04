import * as THREE from 'three'
import './styles.css'
//  orbit controls
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Main, PerspectiveCameraAuto } from '@three.ez/main'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import * as TWEEN from '@tweenjs/tween.js'
import { store } from '../../utils/state/store'

window.mesh = null

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js'
import * as dat from 'dat.gui'

let scene,
    camera,
    renderer,
    effect,
    arm,
    main,
    bones = {},
    gui

export const threeCanvas = () => {
    const initScene = async (container) => {
        // if (scene) return
        if (gui) gui.destroy()

        gui = new dat.GUI()
        const armFolder = gui.addFolder('Arm')

        scene = null
        scene = new THREE.Scene()
        camera = new PerspectiveCameraAuto(70).translateZ(5)
        new RGBELoader()
            .setPath('/app/assets/models/')
            .load('skybox.hdr', (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping

                // scene.background = texture
                scene.environment = texture
                // model
            })

        // light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0)
        // const ambientLight = new THREE.AmbientLight(0xffffff, 2)
        // directionalLight.position.set(-1, 0, 1)
        directionalLight.castShadow = true
        scene.add(directionalLight)

        renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(container.clientWidth, container.clientHeight)
        // set the background color to transparent
        renderer.setClearColor(0x000000, 0)
        container.appendChild(renderer.domElement)

        // import the GLTF file
        const loader = new GLTFLoader()
        await loader.load('/app/assets/models/armature2.glb', async (gltf) => {
            const model = gltf.scene
            const bonesFolder = armFolder.addFolder('Bones')

            model.traverse((object) => {
                if (object.isBone) {
                    console.log('BONE', object.name)
                    bones[object.name] = object
                    const thisFolder = bonesFolder.addFolder(object.name)
                    console.log('BONE', object)
                    thisFolder.add(
                        object.rotation,
                        'x',
                        -(Math.PI * 2),
                        Math.PI * 2,
                    )
                    thisFolder.add(
                        object.rotation,
                        'y',
                        -(Math.PI * 2),
                        Math.PI * 2,
                    )
                    thisFolder.add(
                        object.rotation,
                        'z',
                        -(Math.PI * 2),
                        Math.PI * 2,
                    )
                }
            })
            console.log('GLTF', gltf)
            if (arm) scene.remove(arm)
            // create a mesh from the imported GLTF file
            const mesh = gltf.scene.children[0]
            // give the mesh a shiny silver material

            mesh.scale.set(5, 5, 5)
            // right bottom
            // mesh.position.set(3, -3, 0)

            // roatet the arm
            mesh.rotation.x = 4
            mesh.rotation.y = 4.8
            mesh.rotation.z = 4.5

            bones['upperArm'].rotation.x = Math.PI / 1.8
            bones['finger41'].rotation.x = 0.4
            bones['finger42'].rotation.z = 2
            bones['finger31'].rotation.z = 0.7
            bones['finger31'].rotation.z = 0.7
            bones['finger12'].rotation.z = 0.7

            mesh.position.set(1.5, -4, 0)

            console.log('MESH', mesh)
            arm = mesh

            armFolder.add(mesh.rotation, 'x', -(Math.PI * 2), Math.PI * 2)
            armFolder.add(mesh.rotation, 'y', -(Math.PI * 2), Math.PI * 2)
            armFolder.add(mesh.rotation, 'z', -(Math.PI * 2), Math.PI * 2)

            // position
            armFolder.add(mesh.position, 'x', -10, 10)
            armFolder.add(mesh.position, 'y', -10, 10)
            armFolder.add(mesh.position, 'z', -10, 10)

            scene.add(arm)
        })

        const controls = new OrbitControls(camera, renderer.domElement)

        camera.position.z = 5
        effect = new OutlineEffect(renderer)
    }

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()

        effect.setSize(window.innerWidth, window.innerHeight)
    }

    const moveFingersRandomly = () => {
        if (bones['finger12'] === undefined) return
        const fingers = [
            bones['finger12'],
            bones['finger22'],
            bones['finger32'],
            bones['finger42'],
        ]
        fingers.forEach((finger) => {
            // only move them a tiny bit and it should be tweened
            finger.rotation.z = Math.random() * 0.9
        })
    }

    /**
     * Maps a value from one range to another.
     *
     * @param {number} value - The value to be mapped.
     * @param {number} inMin - The minimum of the input range.
     * @param {number} inMax - The maximum of the input range.
     * @param {number} outMin - The minimum of the output range.
     * @param {number} outMax - The maximum of the output range.
     * @return {number} - The mapped value.
     */
    function mapRange(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
    }

    const onMouseMove = (event) => {
        if (!arm) return
        //slightly rotate upperArm (bone) to simulate the movement of the arm
        const upperArm = bones['upperArm']
        const x = event.clientX / window.innerWidth

        const xA = mapRange(x, 0, 1, -7, -4.5) * -1 + 0.4
        // xA should hav a range between -3 and -7
        upperArm.rotation.x = xA
        const lowerArm = bones['lowerArm']
        // rotate the lower arm by half of xA
        lowerArm.rotation.x = 0.5
    }

    const onMouseClick = (event) => {
        if (!arm) return
        const upperFinger = bones['finger22']
        const lowerFinger = bones['finger21']

        // Define the tween for upperFinger
        const upperTween = new TWEEN.Tween(upperFinger.rotation)
            .to({ z: 0.1 }, 100) // Rotate to 0.1 over 500ms
            .easing(TWEEN.Easing.Quadratic.Out)
            .yoyo(true) // Tween back to original state
            .repeat(1)

        // Define the tween for lowerFinger
        const lowerTween = new TWEEN.Tween(lowerFinger.rotation)
            .to({ z: 0.9 }, 100) // Rotate to 0.9 over 500ms
            .easing(TWEEN.Easing.Quadratic.Out)
            .yoyo(true) // Tween back to original state
            .repeat(1)

        // Start the tweens
        upperTween.start()
        lowerTween.start()
    }

    const _render = () => {
        // controls.update()
        TWEEN.update()

        renderer.render(scene, camera)
        window.arm = arm

        const wildernessLevel = store.getState().wildernessLevel

        if (wildernessLevel > 1) {
            moveFingersRandomly()
        }
        // moveFingersRandomly()
        // renderer.render(scene, camera)
        console.log('RENDER', scene.children.length)

        // call rquestAnimationFrame again with the args of _render
        requestAnimationFrame(_render)
    }

    return {
        /** @param {HTMLElement} container */
        init: async (container) => {
            await initScene(container)
            // make consts available outside of function

            // add event listener to window resize
            window.addEventListener('resize', onWindowResize)

            // add mouse move listener
            window.addEventListener('mousemove', onMouseMove)

            window.addEventListener('click', onMouseClick)

            _render()
        },
    }
}
