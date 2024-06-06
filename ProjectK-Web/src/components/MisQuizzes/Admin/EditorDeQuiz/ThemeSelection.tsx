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
import { useForm, useFormContext } from "react-hook-form";

export type Topic = {
  topic_id: number;
  topic_name: string;
};

export type ThemeSelectionProps = {
  topics: Topic[];
};

export default function ThemeSelection({ topics }: ThemeSelectionProps) {
  const { register, setValue, getValues } = useFormContext();
  const topicIdForm = getValues("topic_id") ?? 1;
  console.log("topicid", topicIdForm);

  const [theme, setTheme] = React.useState(String(topicIdForm));

  // We register the default topic name
  register("topicId", { value: topicIdForm, required: true });

  const handleChange = (event: SelectChangeEvent) => {
    setTheme(event.target.value);
    setValue("topicId", theme);
  };

  // Rerender whenever topicIdForm changes
  React.useEffect(() => {
    setTheme(String(topicIdForm))
  }, [topicIdForm])

  return (
    <Grid item xs={3}>
      <Paper elevation={24} className="h-full w-full flex items-center p-6 gap-4">
        <Typography>Tema:</Typography>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel>tema</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={String(theme)}
            label="seleccione un tema"
            onChange={handleChange}
            sx={{ width: "100%" }}
            defaultValue={String(topicIdForm)}
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
