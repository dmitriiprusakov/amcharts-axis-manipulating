import { CollapseType } from "antd/lib/layout/Sider";
import { Layout } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";

import cn from "classnames";

import { Chart } from "../components";

import { useRootData } from "../hooks";
import css from "./index.module.css";

const { Content, Sider } = Layout;

const Core: React.FC = observer(() => {
  const {
    isSiderCollapsed,
    isSiderCollapsingNow,
    setSiderCollapsed,
  } = useRootData((state) => ({
    isSiderCollapsed: state.core.isSiderCollapsed,
    isSiderCollapsingNow: state.core.isSiderCollapsingNow,

    setSiderCollapsed: state.core.setSiderCollapsed,
  }));
  const onCollapse = (collapsed: boolean, type: CollapseType) => {
    console.log(collapsed, type);
    setSiderCollapsed(collapsed);
  };
  console.log("isSiderCollapsingNow", isSiderCollapsingNow);

  return (
    <Layout className={css.layout}>
      <Sider
        className={css.sider}
        collapsed={isSiderCollapsed}
        collapsible
        onCollapse={onCollapse}
        theme="light"
      >
        kek
      </Sider>
      <Content
        className={cn(css.content, {
          [css.contentHidden]: isSiderCollapsingNow,
        })}
      >
        <Chart />
      </Content>
    </Layout>
  );
});

export default Core;
