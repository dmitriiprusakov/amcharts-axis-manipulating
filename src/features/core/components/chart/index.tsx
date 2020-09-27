import { useRootData } from "features/core/hooks";
import React, { useEffect } from "react";

import css from "./index.module.css";

const Chart: React.FC = () => {
  const { generateData } = useRootData((state) => ({
    generateData: state.core.generateData,
  }));

  useEffect(() => {
    generateData(10);
  }, [generateData]);

  return (
    <div className={css.chartLayout}>
      <div id="chart" />
    </div>
  );
};

export default Chart;
