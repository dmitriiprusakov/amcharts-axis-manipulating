import { Layout, Result } from "antd";
import AreaChartOutlined from "@ant-design/icons/AreaChartOutlined";

import { CollapseType } from "antd/lib/layout/Sider";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

import cn from "classnames";

import { Chart, Legend } from "../components";

import { useRootData } from "../hooks";
import css from "./index.module.css";

const { Content, Sider } = Layout;

const Core: React.FC = observer(() => {
  const {
    isSiderCollapsed,
    isSiderCollapsingNow,
    generateData,
    setSiderCollapsed,
  } = useRootData((state) => ({
    isSiderCollapsed: state.core.isSiderCollapsed,
    isSiderCollapsingNow: state.core.isSiderCollapsingNow,
    generateData: state.core.generateData,

    setSiderCollapsed: state.core.setSiderCollapsed,
  }));

  useEffect(() => {
    generateData({ parametersCount: 5, pointsCount: 200 });
  }, [generateData]);

  const onCollapse = (collapsed: boolean) => setSiderCollapsed(collapsed);

  console.log("isSiderCollapsingNow", isSiderCollapsingNow);

  return (
    <Layout className={css.layout}>
      <Sider
        className={css.sider}
        collapsed={isSiderCollapsed}
        collapsedWidth={100}
        collapsible
        onCollapse={onCollapse}
        theme="light"
      >
        <Legend />
      </Sider>
      {isSiderCollapsingNow && (
        <Result
          className={css.recalculatingResult}
          icon={<AreaChartOutlined />}
          title="Recalculating..."
        />
      )}
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
