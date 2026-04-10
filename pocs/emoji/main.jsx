import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import EmojiMosaic from "./emoji-mosaic.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EmojiMosaic />
  </StrictMode>
);
