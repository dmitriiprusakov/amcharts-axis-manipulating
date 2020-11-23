/* eslint-disable react/jsx-props-no-spreading */
import { Form, InputNumber, Modal, Switch } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";

import { ModalEnum, SettingsState } from "features/core/types";
import { useRootData } from "features/core/hooks";

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

const Settings: React.FC = observer(() => {
  const {
    modalState,
    tagsCount,
    pointsCount,
    isRandomTagsNames,
    changeState,
    setSettings,
  } = useRootData((store) => ({
    modalState: store.core.modalStates?.[ModalEnum.settings],
    tagsCount: store.core.tagsCount,
    pointsCount: store.core.pointsCount,
    isRandomTagsNames: store.core.isRandomTagsNames,
    changeState: store.core.changeStateModal,
    setSettings: store.core.setSettings,
  }));

  const handleCloseModal = () => {
    changeState({ type: ModalEnum.settings, props: { visible: false } });
  };

  const [form] = Form.useForm();

  const onFinish = (values: SettingsState) => {
    console.log("Success:", values);
    setSettings(values);
  };

  const handleOk = () => {
    form.submit();
    handleCloseModal();
  };

  return (
    <Modal
      destroyOnClose
      okButtonProps={{ htmlType: "submit" }}
      onCancel={handleCloseModal}
      onOk={handleOk}
      title="Settings"
      visible={modalState?.props.visible}
      width={400}
    >
      <Form
        {...layout}
        form={form}
        initialValues={{
          pointsCount,
          tagsCount,
          isRandomTagsNames,
        }}
        onFinish={onFinish}
      >
        <Form.Item label="Points count" name="pointsCount">
          <InputNumber max={1000} min={50} step={50} />
        </Form.Item>
        <Form.Item label="Tags count" name="tagsCount">
          <InputNumber max={15} min={1} />
        </Form.Item>
        <Form.Item
          label="Random tags names"
          name="isRandomTagsNames"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default Settings;
