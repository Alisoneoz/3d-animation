import { Suspense, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import Loader from '../components/Loader';

import Island from '../models/Island'
import Sky from '../models/Sky';
import Bird from '../models/Bird';
import Plane from '../models/Plane';

{/*       <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        POPUP
      </div> */}

const Home = () => {

//State
const [isRotating, setIsRotating] = useState(false); //to implement the drag and drop feature --> based on state you'll affect Canvas style
const [currentStage, setCurrentStage] = useState(1);

  const adjustIslandForScreenSize = () => { //to scale the island size according to Screen size
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0] ;

    if (window.innerWidth < 768 ){
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation]
  }

  // Adjust Plane's rotation that was facing the user at first
  const adjustPlaneForScreenSize = () => { //to scale the plane size according to Screen size
    let screenScale, screenPosition;

    if (window.innerWidth < 768 ){
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0]
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, 0]
    }

    return [screenScale, screenPosition]
  }

  const [ islandScale, islandPosition, islandRotation ] = adjustIslandForScreenSize(); // pass them as props to the Island element
  
  //Invoke / call the plane function like a hook
  const [ planeScale, planePosition ]= adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`} //affect rotation style based on isRotating state
        camera={{ near: 0.1, far: 1000, }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position = {[10,1,1]}/*first value in the array moves the sun*/  intensity={2}/>
          <ambientLight intensity={0.5}/> {/* illuminates all the objects equally without casting shadows*/}
         {/* <pointLight /> */} {/* emits light in all directions --> we don't need it be cause we have the sun ☀*/}
          {/* <spotLight />  */}{/* is similar to the point light --> it emits light from one direction but in the shape on a cone*/}
          <hemisphereLight skyColor="#b1eff" groundColor="#000000" intensity ={1}/> {/* Illuminates the scene with a gradient --> adds detail*/}
          
          <Bird />
          <Sky />
          <Island 
            position = {islandPosition}
            scale = {islandScale}
            rotation = {islandRotation}
            //pass the rotating state to this element
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane 
            isRotating = {isRotating}
            planePosition = {planePosition}
            planeScale = {planeScale}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home