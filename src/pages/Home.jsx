import { Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import Loader from '../components/Loader';

import Island from '../models/Island'
import Sky from '../models/Sky';

{/*       <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        POPUP
      </div> */}

const Home = () => {
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

  const [ islandScale, islandPosition, islandRotation ] = adjustIslandForScreenSize(); // pass them as props to the Island element
  return (
    <section className="w-full h-screen relative">
      <Canvas
        className="w-full h-screen bg-transparent"
        camera={{ near: 0.1, far: 1000, }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position = {[10,1,1]}/*first value in the array moves the sun*/  intensity={2}/>
          <ambientLight intensity={0.5}/> {/* illuminates all the objects equally without casting shadows*/}
         {/* <pointLight /> */} {/* emits light in all directions --> we don't need it be cause we have the sun ☀*/}
          {/* <spotLight />  */}{/* is similar to the point light --> it emits light from one direction but in the shape on a cone*/}
          <hemisphereLight skyColor="#b1eff" groundColor="#000000" intensity ={1}/> {/* Illuminates the scene with a gradient --> adds detail*/}
          
          <Sky />
          <Island 
            position = {islandPosition}
            scale = {islandScale}
            rotation = {islandRotation}

          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home