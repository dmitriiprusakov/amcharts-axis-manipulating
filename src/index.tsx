import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";

import { Core, StoreProvider } from "features/core";

ReactDOM.render(
  <StoreProvider>
    <Core />
  </StoreProvider>,
  document.getElementById("root")
);
