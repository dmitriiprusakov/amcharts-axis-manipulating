import { Button } from "antd";
import { observer } from "mobx-react-lite";
import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";

import React from "react";

import { useRootData } from "features/core/hooks";

const SidebarTrigger: React.FC = observer(() => {
  const {
    isSiderCollapsed,
    isSiderCollapsingNow,
    setSiderCollapsed,
  } = useRootData((state) => ({
    isSiderCollapsed: state.core.isSiderCollapsed,
    isSiderCollapsingNow: state.core.isSiderCollapsingNow,

    setSiderCollapsed: state.core.setSiderCollapsed,
  }));

  const onCollapse = () => setSiderCollapsed(!isSiderCollapsed);

  return (
    <Button
      disabled={isSiderCollapsingNow}
      icon={isSiderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={onCollapse}
      type="link"
    />
  );
});

export default SidebarTrigger;
