import { Layout, Result } from "antd";
import { observer } from "mobx-react-lite";
import AreaChartOutlined from "@ant-design/icons/AreaChartOutlined";

import React, { useEffect } from "react";

import cn from "classnames";

import { ChartLayout, LegendLayout } from "../components";

import { useRootData } from "../hooks";
import HeaderLayout from "../components/header-layout";
import css from "./index.module.css";

const { Content, Sider, Header } = Layout;

const Core: React.FC = observer(() => {
  const { isSiderCollapsed, isSiderCollapsingNow, generateData } = useRootData(
    (state) => ({
      isSiderCollapsed: state.core.isSiderCollapsed,
      isSiderCollapsingNow: state.core.isSiderCollapsingNow,
      generateData: state.core.generateData,
    })
  );

  useEffect(() => {
    generateData({ parametersCount: 5, pointsCount: 200 });
  }, [generateData]);

  return (
    <Layout className={css.layout}>
      <Sider
        className={css.sider}
        collapsed={isSiderCollapsed}
        collapsedWidth={150}
        collapsible
        theme="light"
        trigger={null}
        width="20%"
      >
        <LegendLayout />
      </Sider>

      <Layout className="site-layout">
        <Header className={css.header}>
          <HeaderLayout />
        </Header>
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
          <ChartLayout />
        </Content>
      </Layout>
    </Layout>
  );
});

export default Core;
