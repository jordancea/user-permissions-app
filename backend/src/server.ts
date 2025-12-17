import app from "./app";
import { sequelize } from "./models";
import "./models";

const PORT = Number(process.env.PORT || 4000);

(async function start() {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("Failed to start", err);
    process.exit(1);
  }
})();
