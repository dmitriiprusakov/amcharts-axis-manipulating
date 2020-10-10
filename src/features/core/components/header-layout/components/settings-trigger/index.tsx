import { Button } from "antd";
import { observer } from "mobx-react-lite";
import SettingOutlined from "@ant-design/icons/SettingOutlined";

import React from "react";

import { useRootData } from "features/core/hooks";

const SettingsTrigger: React.FC = observer(() => {
  const {
    isSiderCollapsed,
    isSiderCollapsingNow,
    setSiderCollapsed,
  } = useRootData((state) => ({
    isSiderCollapsed: state.core.isSiderCollapsed,
    isSiderCollapsingNow: state.core.isSiderCollapsingNow,

    setSiderCollapsed: state.core.setSiderCollapsed,
  }));

  const onClick = () => setSiderCollapsed(!isSiderCollapsed);

  return (
    <Button
      disabled={isSiderCollapsingNow}
      icon={<SettingOutlined />}
      onClick={onClick}
      type="link"
    />
  );
});

export default SettingsTrigger;
