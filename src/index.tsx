import React from "react";
import ReactDOM from "react-dom";

import { Core, StoreProvider } from "features/core";

ReactDOM.render(
  <StoreProvider>
    <Core />
  </StoreProvider>,
  document.getElementById("root")
);
