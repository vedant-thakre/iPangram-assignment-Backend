import { app } from './app.js';
import colors from "colors";

const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.cyan.bold);
});