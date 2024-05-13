"use client";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@mui/material";

export default function Game() {
  const appRouter = useRouter();
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/ProjectK-Game.loader.js",
    dataUrl: "Build/ProjectK-Game.data.unityweb",
    frameworkUrl: "Build/ProjectK-Game.framework.js.unityweb",
    codeUrl: "Build/ProjectK-Game.wasm.unityweb",
  });

  const goBackToMenu = () => {
    appRouter.replace("/dashboard/Explorar");
  };
  return (
    <div className="flex align-center" >
  <div
    style={{
      width: "100%", // Adjust this value as needed
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      overflow: "hidden",
      alignItems: "center",
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

  <div className="h-50" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '-20vw'}}>
    <Button variant="contained" size="large" onClick={goBackToMenu}>
      Go back to menu
    </Button>
  </div>
</div>
  );
}
