"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import PlayerCard from "@/components/Quiz/PlayerCard";
import BarGraph from "@/components/Quiz/BarGraph";
import UserButtons from "@/components/Authentication/UserButtons";
import QuizSlider from "@/components/Authentication/QuizSlider";
import { useRouter, usePathname } from "next/navigation";


export default function Quiz() {
  const appRouter = useRouter();
  // We will keep the current answers for the quiz
  const [currAns, setCurrAns] = React.useState("");
  const [currConf, serCurrConf] = React.useState("");

  // Helper methods for the slider
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const goToGame = () => {
    appRouter.replace("/game");
  }

  return (
    <div className="flex flex-col h-screen">
      <Box
        id="titlebox"
        className="flex row mx-auto mt-10 mb-4 w-8/12 rounded-lg justify-center items-center gap-6"
      >
        <img src="/Rectangle 13.png" className="h-20" />
        <Typography variant="h3" className="font-thin text-black">
          Tigres o Rayados?
        </Typography>
      </Box>
      <Box
        id="middle box"
        className="flex flex-column px-10 flex-start w-full h-4/12 flex-wrap"
      >
        <Box
          id="ai player stats"
          className="flex flex-row w-full h-2/12 justify-around gap-3"
        >
          {/* Each PlayerCard represents either a bot or the user. Bots should generate random answers while the user
          should show historic stats */}
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
        </Box>
        <Box id="bar graph boxy" className="flex w-full my-6">
          {/* This graph should render the stats */}
          <BarGraph />
        </Box>
        <Box id="user options" className="flex w-full flex-col">
          {/* We should pass the answers and receive feedback from here */}
          <UserButtons />
          <Box id="final box" className="flex flex-row w-full justify-between">
            <QuizSlider value={value} handleSliderChange={handleSliderChange} />
            <Box
              id="submission box"
              className="flex items-end w-2/12 justify-end mt-6"
            >
              <Button variant="contained" size="large" onClick={goToGame}>
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box id="User Options"></Box>
    </div>
  );
}
