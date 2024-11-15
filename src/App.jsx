import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, OrbitControls, Outlines, Torus, Octahedron, TorusKnot, Box, Tetrahedron, Cylinder, Dodecahedron, Sphere, Icosahedron, Plane, Grid, Reflector, MeshReflectorMaterial } from '@react-three/drei'
import { EffectComposer, Outline, Pixelation } from '@react-three/postprocessing';
import './App.css'


const ShapeGiven = React.forwardRef(({ shapeType, ...props }, ref) => {
  switch (shapeType) {
    case 0:
      return <Torus ref={ref} {...props} args={[1.25,.55,16,32]} />
    case 1:
      return <Cylinder ref={ref} {...props} args={[1.5, 1.5,3]}/>;
    case 2:
      return <Sphere ref={ref} {...props} args={[2, 32, 32]} />;
    case 3:
      return <Box ref={ref} {...props} args={[2, 2, 2]} />;
    case 4:
      return <Icosahedron ref={ref} {...props} args={[2, 0]} />
    case 5:
      return <Octahedron ref={ref} {...props} args={[2,2]}/>;
    case 6:
      return <Dodecahedron ref={ref} {...props} args={[2,0]} />;
    case 7:
      return <Tetrahedron ref={ref} {...props} args={[2, 0]} />;
    case 8:
      return <TorusKnot ref={ref} {...props} args={[1,.5,30,15]}/>;
    default:
      return null;
  }
});

ShapeGiven.displayName = "ShapeGiven";

const AnyShape = ({shapeType}) => { //Thinking of passing the button functions to anyshape but I think it may be abad idea. 
  const ref = useRef();
  const [elapsed, elapse] = useState(0)
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [position, setPosition] = useState([0,0,0])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * (hovered ? 1.5 : 0.5);
      ref.current.rotation.y += delta * (hovered ? 3 : 0.5);
      ref.current.position.y += Math.cos(elapsed)/(Math.PI*10)
      setPosition(ref.current.position)
    }
    elapse((prev) => prev + delta);
  });

  useEffect(() => {
    // Reset elapsed time when shapeType changes
    elapse(0);
  }, [shapeType]);

  function handleOnClick(){
    click(!clicked);
  }

  return (
  <>
<ShapeGiven 
  shapeType={shapeType} 
  ref={ref} 
  onPointerEnter={() => hover(true)} 
  onPointerLeave={() => hover(false)} 
  onClick={handleOnClick} 
  scale={clicked ? 1.5 : 1}
  position={[0,1,0]}
    >
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
  const ref = useRef()
  const [shape, setShape] = useState(0);
  
  function handleNext (){
    if (shape + 1 > 8){
    setShape(0)
    }
    else{
      setShape((prev) => prev + 1)
    }
  }
 
  function handlePrev (){
    if (shape - 1 < 0){
    setShape(8)
    }
    else {
      setShape((prev) => prev - 1)
    }
  }
  
  function getRandomNum(){
    return Math.floor(Math.random() * 9);  
  }

  return (
    // I also want to add a polygon creation feature.
    <div style={{ width: "90vw", height: "90vh", border: "2px solid grey", borderRadius: '20px', backgroundColor:'lightblue', justifyItems:'center'}}>
      <h1>Interactive Shape Visualizer</h1>
    <div style={{ width: "50vw", height: "50vh", border: "2px solid grey", borderRadius: '20px', backgroundColor:'white', marginBottom:'1rem', overflow:'hidden'}}>
    <Canvas camera={{position:[-10,3,-1]}}>
      
      <ambientLight intensity={Math.PI} />
      <spotLight position={[0, 5, 0]} angle={Math.PI/2} penumbra={.99} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Plane 
        args={[32, 32]} // Width and height of the plane
        rotation={[-Math.PI / 2, 0, 0]} // Rotate 90 degrees along the X-axis
        position={[0, -4, 0]} // Position the plane
      >
        <MeshReflectorMaterial color={'#a0a0a0'} resolution={1024} mirror={0.6} />
        <Outlines angle={10} thickness={5} color={'black'} />
      </Plane>
      <AnyShape ref={ref} shapeType={shape} />
      <OrbitControls enablePan={false} maxPolarAngle={Math.PI/2}/>
    </Canvas> 
  </div>

    <button onClick={handlePrev}> Prev </button>
    <button onClick={handleNext}> Next </button>
  
  </div>
  
  )
}

export default App


  // function handleShapeChange () {
  //   console.log(shape) 
  //   let num = getRandomNum()
  //   while (num === shape) {
  //     num = getRandomNum()
  //   }
  //   setShape(num)
  // }



// -------------------------------------------------------------------------------------------------------------------------------------------------- // 


