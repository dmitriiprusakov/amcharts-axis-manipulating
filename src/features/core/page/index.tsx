import { Layout } from "antd";
import React from "react";

import { Chart } from "../components";

import css from "./index.module.css";

const { Content, Sider } = Layout;

const Core: React.FC = () => {
  const onCollapse = () => {};
  return (
    <Layout className={css.layout}>
      <Sider className={css.sider} collapsible theme="light">
        kek
      </Sider>
      <Content className={css.content}>
        <Chart />
      </Content>
    </Layout>
  );
};

export default Core;
