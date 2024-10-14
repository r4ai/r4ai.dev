import {
  type Component,
  type ComponentProps,
  onMount,
  splitProps,
} from "solid-js"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/Addons.js"

import { cn } from "@/lib/utils"

export type CubeProps = Omit<ComponentProps<"div">, "ref"> & {
  class?: string
}

const animate =
  (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls,
    renderer: THREE.WebGLRenderer,
    cube: THREE.Mesh
  ) =>
  () => {
    cube.rotation.x += 0.005
    cube.rotation.y += 0.005
    controls.update()
    renderer.render(scene, camera)
  }

const rerender = (
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  ref: HTMLDivElement
) => {
  const rect = ref.getBoundingClientRect()
  const width = rect.width
  const height = rect.height
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}

const setupScene = () => {
  const scene = new THREE.Scene()

  // Spawn a cube
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    color: "gray",
    wireframe: true,
  })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  return { scene, cube }
}

const setupCamera = () => {
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
  camera.position.z = 3
  return camera
}

export const Cube: Component<CubeProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  let ref: HTMLDivElement | undefined

  // Set up scene
  const { scene, cube } = setupScene()

  // Set up camera
  const camera = setupCamera()

  // Set up renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true })

  onMount(() => {
    if (!ref) return

    // Set up controls
    const controls = new OrbitControls(camera, ref)
    controls.enableDamping = true
    controls.dampingFactor = 0.25

    // Initial render
    renderer.setAnimationLoop(animate(scene, camera, controls, renderer, cube))
    rerender(camera, renderer, ref)
    ref.appendChild(renderer.domElement)

    // Rerender on resize
    const resizeObserver = new ResizeObserver(() =>
      rerender(camera, renderer, ref)
    )
    resizeObserver.observe(ref)

    return () => {
      ref.removeChild(renderer.domElement)
      renderer.dispose()
      resizeObserver.disconnect()
    }
  })

  return (
    <div
      class={cn("aspect-square *:bg-background", local.class)}
      ref={ref}
      {...rest}
    />
  )
}
