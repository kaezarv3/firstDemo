import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, OrbitControls, Outlines, Wireframe } from '@react-three/drei'
import { EffectComposer, Outline, Pixelation } from '@react-three/postprocessing';
import { EdgesGeometry, LineBasicMaterial, LineSegments, BoxGeometry } from "three";
import * as THREE from 'three';


// import { useControls } from 'leva'


import './App.css'

// function Box(props) {
//     // This reference gives us direct access to the THREE.Mesh object
//     const ref = useRef()
//     const [hovered, hover] = useState(false)
//     const [clicked, click] = useState(false)
//     // Subscribe this component to the render-loop, rotate the mesh every frame
//     useFrame((state, delta) => { // This is supposed to be the same as the section in tetrahedron
//       ref.current.rotation.x += delta 
//        }) 
//     // Return the view, these are regular Threejs elements expressed in JSX
//     return (
//       <mesh
//         {...props}
//         ref={ref}
//         scale={clicked ? 1.5 : 1}
//         onClick={() => click(!clicked)}
//         onPointerOver={(event) => (event.stopPropagation(), hover(true))}
//         onPointerOut={() => hover(false)}>
//         <boxGeometry args={[1, 1, 1]} />
//         <meshStandardMaterial  color={hovered ? 'hotpink' : 'orange'} />
//         <Edges color={'black'}/>
//       </mesh>
          
//     )
// };

// function Tetrahedron(props) {
//   const ref = useRef()
//   const [hovered, hover] = useState(false)
//   const [clicked, click] = useState(false)

//   function onHover(event){
//     hover(true)
//     event.stopPropagation()
//   }
//   // useframe is Used to animate the shape in question
//   useFrame((state, delta) => { 
//     if (hovered) {
//       ref.current.rotation.x += delta * 2
//       ref.current.rotation.y += delta * 4
//     } 
//     ref.current.rotation.x += delta * .5
//     ref.current.rotation.y += delta * .5
//      }) 

//   return(
//     <mesh {...props}
//     ref={ref}
//     scale={clicked ? 1.5 : 1}
//     onClick={() => click(!clicked)}
//     onPointerOver={e => onHover(e)}
//     onPointerOut={() => hover(false)}>
//     <tetrahedronGeometry args={[2,0]} />
//     <meshStandardMaterial  color={hovered ? 'hotpink' : 'orange'} />
//     <Edges color={'black'}/>
//     </mesh>
//   )
// }

const AnyShape = ({shape, ...props}) => {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // const { outlines } = useControls({ outlines: true })

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * (hovered ? 1.5 : 0.5);
    ref.current.rotation.y += delta * (hovered ? 3 : 0.5);
  });

    // Geometry Selection
    let geometry;
    switch (shape) {
      case 0:
        geometry = <><boxGeometry args={[2.5, 2.5, 2.5]} /></>;
        break;
      case 1:
        geometry = <><tetrahedronGeometry args={[2, 0]} />  </>;
        break;
      case 2:
        geometry = <><cylinderGeometry args={[1.5, 1.5,3]}/>   </>;
        break; 
      case 3:
        geometry = <><dodecahedronGeometry args={[1.5,0]}/> </>;
        break;
      case 4:
        geometry = <><torusGeometry args={[1.5,.6,16,32]}/> </>;
        break;
      case 5:
        geometry = <><octahedronGeometry args={[2,2]}/> </>;
        break;
      case 6:
        geometry = <><sphereGeometry args={[1.9,25,25]}/>  </>;
        break;
      case 7:
        geometry = <><torusKnotGeometry args={[1,0.5,64,7]}/> </>;
        break;
      case 8:
        geometry = <><icosahedronGeometry args={[2.4,0]}/> </>;
        break; 
      default:
        shape = 0
        geometry = <><boxGeometry args={[3, 3, 3]} /></>;
    }

  return (
    <mesh
    {...props}
    ref={ref}
    scale={clicked ? 1.5 : 1}
    onClick={() => click(!clicked)}
    onPointerOver={(e) => (hover(true), e.stopPropagation())}
    onPointerOut={() => hover(false)}
  >
    {geometry}
    
    <meshStandardMaterial color={hovered ? "red" : "lightblue" }  />
    <Outlines angle={5} thickness={2} color={'black'} />
    {/* This is the line causing the issue. */}
    </mesh>
  );
}

// Main App Component 
 const App = () => {
  const shapeRef = useRef()
  const [shape, setShape] = useState(1);
  
  function getRandomNum(){
    return Math.floor(Math.random() * 9);  
  }

  function handleShapeChange () {
    console.log(shape) 
    let num = getRandomNum()
    while (num === shape) {
      num = getRandomNum()
    }
    setShape(num)
  }

  return (
    <div className='Maindiv'>
    <h1>Interactive Shape Changer</h1>
    <div className='canvBox1'>
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <AnyShape shape={shape}/>
      <EffectComposer>
        {/* <Pixelation granularity={2} /> */}
      </EffectComposer>
      <OrbitControls enablePan={false} />
    </Canvas> 
    </div>
    <button onClick={handleShapeChange}> Change Shape! </button>
    <p>{`Here is some stuff in a "<p>" tag`}</p>

    </div>
  )
}

export default App






// -------------------------------------------------------------------------------------------------------------------------------------------------- // 


