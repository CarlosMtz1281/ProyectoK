'use client';
import {Unity, useUnityContext  } from "react-unity-webgl";

export default function Game(){
  const {unityProvider} = useUnityContext({
    loaderUrl: "Build/ProjectK-Game.loader.js",
    dataUrl: "Build/ProjectK-Game.data.unityweb",
    frameworkUrl: "Build/ProjectK-Game.framework.js.unityweb",
    codeUrl: "Build/ProjectK-Game.wasm.unityweb",
  });
  return (
    <>
    <div style={{width:"100%", height:"100vh", display:"flex", justifyContent:"center", overflow:"hidden", alignItems:"center"}}>
      <Unity
        style={
          {
            aspectRatio: 9/16,
            height: "95%",
            borderRadius: "10px",        
          }
        }
        unityProvider={unityProvider}
      />
    </div>
    
    </>
  )
  
}