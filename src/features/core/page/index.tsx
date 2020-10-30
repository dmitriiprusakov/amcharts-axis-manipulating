import { Layout, Result } from "antd";
import { observer } from "mobx-react-lite";
import AreaChartOutlined from "@ant-design/icons/AreaChartOutlined";

import React, { Suspense, lazy, useEffect } from "react";

import cn from "classnames";

import { ChartLayout, LegendLayout } from "../components";

import { ModalEnum } from "../types";
import { useRootData } from "../hooks";
import HeaderLayout from "../components/header-layout";
import css from "./index.module.css";

const { Content, Sider, Header } = Layout;

const Settings = lazy(
  () =>
    import(
      /* webpackChunkName: "rule-manager-lazy"  */ "../components/settings"
    )
);

const Core: React.FC = observer(() => {
  const {
    modals,
    isSiderCollapsed,
    isSiderCollapsingNow,
    tagsCount,
    pointsCount,
    generateData,
  } = useRootData((state) => ({
    modals: state.core.modalStates,
    isSiderCollapsed: state.core.isSiderCollapsed,
    isSiderCollapsingNow: state.core.isSiderCollapsingNow,
    tagsCount: state.core.tagsCount,
    pointsCount: state.core.pointsCount,
    generateData: state.core.generateData,
  }));

  useEffect(() => {
    generateData({ tagsCount, pointsCount });
  }, [tagsCount, pointsCount, generateData]);

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

      {modals && modals[ModalEnum.settings] && (
        <Suspense fallback={null}>
          <Settings />
        </Suspense>
      )}
    </Layout>
  );
});

export default Core;
