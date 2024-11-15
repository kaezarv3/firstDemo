import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, OrbitControls, Outlines, Torus, Wireframe, Octahedron, TorusKnot, Box, Tetrahedron, Cylinder, Dodecahedron, Sphere, Icosahedron } from '@react-three/drei'
import { EffectComposer, Outline, Pixelation } from '@react-three/postprocessing';
import './App.css'


const ShapeGiven = React.forwardRef(({ shapeType, ...props }, ref) => {
  switch (shapeType) {
    case 0:
      return <Torus ref={ref} {...props} args={[1.5,.6,16,32]} />
    case 1:
      return <Cylinder ref={ref} {...props} args={[1.5, 1.5,3]}/>;
    case 2:
      return <Sphere ref={ref} {...props} Wireframe args={[1.9, 32, 32]} />;
    case 3:
      return <Box ref={ref} {...props} args={[2, 2, 2]} />;
    case 4:
      return <Icosahedron ref={ref} {...props} args={[2.4, 0]} />
    case 5:
      return <Octahedron ref={ref} {...props} args={[2,2]}/>;
    case 6:
      return <Dodecahedron ref={ref} {...props} args={[1.5,0]} />;
    case 7:
      return <Tetrahedron ref={ref} {...props} args={[2, 0]} />;
    case 8:
      return <TorusKnot ref={ref} {...props} args={[1,.5,30,15]}/>;
    default:
      return null;
  }
});

ShapeGiven.displayName = "ShapeGiven";

const AnyShape = ({shapeType}) => {
  const ref = useRef();
  const [elapsed, elapse] = useState(0)
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * (hovered ? 1.5 : 0.5);
      ref.current.rotation.y += delta * (hovered ? 3 : 0.5);
    }
    elapse(elapsed + delta);
  });

  return (
  <>
<ShapeGiven shapeType={shapeType} ref={ref} onPointerEnter={() => hover(true)} onPointerLeave={() => hover(false)} onClick={() => click(!clicked)} scale={clicked ? 1.5 : 1}>
  <meshPhysicalMaterial color={hovered ? "pink" : "#7046f0" }/>
  <Edges color={'#3e0dd4'} lineWidth={2} scale={1.005}/>
  <Outlines angle={10} thickness={5} color={'black'} />
</ShapeGiven>
    <EffectComposer>
      {/* <Pixelation granularity={(Math.cos(elapsed) + 1)*4} /> */}
    </EffectComposer>
    </>
  );
}


// Main App Component 

 const App = () => {
  const shapeRef = useRef()
  const [shape, setShape] = useState(8);  

  if (shape > 8){
    setShape(0)
  }
  if (shape < 0){
    setShape(8)
  }
  
  function getRandomNum(){
    return Math.floor(Math.random() * 9);  
  }

  // function handleShapeChange () {
  //   console.log(shape) 
  //   let num = getRandomNum()
  //   while (num === shape) {
  //     num = getRandomNum()
  //   }
  //   setShape(num)
  // }

  return (
    <div style={{ width: "90vw", height: "90vh", border: "2px solid grey", borderRadius: '20px', backgroundColor:'lightblue', justifyItems:'center'}}>
      <h1>Interactive Shape Visualizer</h1>
    <div style={{ width: "50vw", height: "50vh", border: "2px solid grey", borderRadius: '20px', backgroundColor:'white', paddingBottom:'1rem'}}>
    <Canvas>
      <ambientLight intensity={Math.PI} />
      <spotLight position={[5, 5, 5]} angle={Math.PI/2} penumbra={.99} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <AnyShape shapeType={shape}/>
      <OrbitControls enablePan={false} />
    </Canvas> 
  </div>
  <button onClick={() => setShape(shape - 1)}> Prev </button>
  <button onClick={() => setShape(shape + 1)}> Forward </button>
  </div>
  
  )
}

export default App






// -------------------------------------------------------------------------------------------------------------------------------------------------- // 


