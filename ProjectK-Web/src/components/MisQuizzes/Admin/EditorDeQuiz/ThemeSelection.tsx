import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from "@mui/material";
import {useForm, useFormContext } from "react-hook-form";

export type Topic = {
  topic_id: number;
  topic_name: string;
};

export type ThemeSelectionProps = {
  topics: Topic[];
};

export default function ThemeSelection({topics} : ThemeSelectionProps ) {
  const [theme, setTheme] = React.useState(String(topics[0].topic_id));
  const { register, setValue } = useFormContext();

  // We register the default topic name
  register("topicId", {value: topics[0].topic_id, required: true})

  const handleChange = (event: SelectChangeEvent) => {
    setTheme(event.target.value);
    setValue("topicId", theme);
  };

  return (
    <Grid item xs={2}>
      <Paper elevation={24} className="h-2/3 w-5/6 flex items-center p-6 gap-4">
        <Typography>Temas:</Typography>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel>tema</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={String(theme)}
            label="seleccione un tema"
            onChange={handleChange}
            sx={{ width: "100%" }}
            defaultValue={String(topics[0].topic_id)}
          >
            {topics.map((topic) => (
              <MenuItem key={topic.topic_id} value={topic.topic_id}>
                {topic.topic_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    </Grid>
  );
}
