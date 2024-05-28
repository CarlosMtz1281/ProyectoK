"use client";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Game() {
  const appRouter = useRouter();
  const { unityProvider, unload } = useUnityContext({
    loaderUrl: "/Build/ProjectKGame.loader.js",
    dataUrl: "/Build/ProjectKGame.data.unityweb",
    frameworkUrl: "/Build/ProjectKGame.framework.js.unityweb",
    codeUrl: "/Build/ProjectKGame.wasm.unityweb",
  });

  useEffect(() => {
    // Cleanup function to unload Unity context when the component unmounts
    return () => {
      unload();
    };
  }, [unload]);

  return (
    <div className="flex align-center">
      <div
        style={{
          width: "100%", // Adjust this value as needed
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          alignItems: "start",
        }}
      >
        <Unity
          style={{
            aspectRatio: 9 / 16,
            height: "95%",
            borderRadius: "10px",
          }}
          unityProvider={unityProvider}
        />
      </div>

      <div
        className="h-50"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "-20vw",
        }}
      >
      </div>
    </div>
  );
}
