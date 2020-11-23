import { observer } from "mobx-react-lite";
import React from "react";

import { SettingsTrigger, SidebarTrigger } from "./components";

import css from "./index.module.css";

const HeaderLayout: React.FC = observer(() => {
  return (
    <div className={css.headerLayout}>
      <SidebarTrigger />
      <SettingsTrigger />
    </div>
  );
});

export default HeaderLayout;
