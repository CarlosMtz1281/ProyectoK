import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export type Topic = {
  topic_id: number;
  topic_name: string;
};

export type ThemeSelectionProps = {
  topics: Topic[];
};

export default function ThemeSelection({ topics }: ThemeSelectionProps) {
  const { control, getValues } = useFormContext();
  const topicIdForm = getValues("topic_id") ?? 1;

  return (
    <Grid item xs={3}>
      <Paper elevation={24} className="h-full w-full flex items-center p-6 gap-4">
        <Typography>Tema:</Typography>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel>tema</InputLabel>
          <Controller
            name="topicId"
            control={control}
            defaultValue={String(topicIdForm)}
            render={({ field }) => (
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={field.value}
                label="seleccione un tema"
                onChange={(event) => {
                  field.onChange(event.target.value);
                }}
                sx={{ width: "100%" }}
              >
                {topics.map((topic) => (
                  <MenuItem key={topic.topic_id} value={String(topic.topic_id)}>
                    {topic.topic_name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </Paper>
    </Grid>
  );
}
