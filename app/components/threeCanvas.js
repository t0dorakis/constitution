import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { store } from './state/store'

let currentScene = store.getState().visibleScene
const unsub1 = store.subscribe((state) => (currentScene = state.visibleScene), {
    defer: true,
})

export function setupThreeCanvas(element) {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
    )
    const loader = new GLTFLoader()
    let face = null

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    element.appendChild(renderer.domElement)

    // add natural light
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.3)
    scene.add(ambientLight)
    //  add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    const faceMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.0,
        roughness: 0.9,
        opacity: 0,
        transparent: true,
    })

    // face should follow the mouse movement
    const mouse = new THREE.Vector2()
    const onMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)

    const onMouseLeave = () => {
        window.removeEventListener('mousemove', onMouseMove)
    }
    window.addEventListener('mouseleave', onMouseLeave)

    loader.load('models/face.glb', (gltf) => {
        face = gltf.scene.children[0]
        // give the face a shiny silver material

        face.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                // pig skin color
                child.material = faceMaterial
                // scale the face
                child.scale.set(2, 2, 2)
            }
        })
        //  face start with zero opacity
        scene.add(face)
    })

    camera.position.z = 5

    function animate() {
        requestAnimationFrame(animate)
        const visibleScene = store.getState().visibleScene

        if (face) {
            // face.rotation.x += 0.01;
            // face.rotation.y += 0.01;

            // face rotation based on mouse position
            const x = mouse.x * Math.PI * 2
            const y = mouse.y * Math.PI * 2
            face.rotation.x = x / 4
            face.rotation.y = y / 4
        }

        if (visibleScene === 'human') {
            faceMaterial.opacity = 1
        } else {
            faceMaterial.opacity = 0
        }
        renderer.render(scene, camera)
    }

    animate()

    // element.appendChild(renderer.domElement);
}
