import { Button } from "antd";
import { observer } from "mobx-react-lite";
import SettingOutlined from "@ant-design/icons/SettingOutlined";

import React, { useCallback } from "react";

import { ModalEnum } from "features/core/types";
import { useRootData } from "features/core/hooks";

const SettingsTrigger: React.FC = observer(() => {
  const { changeStateModal } = useRootData((state) => ({
    modalStates: state.core.modalStates,
    changeStateModal: state.core.changeStateModal,
  }));

  const handleOpenSettings = useCallback(() => {
    changeStateModal({ type: ModalEnum.settings, props: { visible: true } });
  }, [changeStateModal]);

  return (
    <Button
      icon={<SettingOutlined />}
      onClick={handleOpenSettings}
      type="link"
    />
  );
});

export default SettingsTrigger;
