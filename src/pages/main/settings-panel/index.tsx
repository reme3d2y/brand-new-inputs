import React from "react";
import { SidePanelResponsive } from "@alfalab/core-components/side-panel";
import { RadioGroup } from "@alfalab/core-components/radio-group";
import { Radio } from "@alfalab/core-components/radio";
import { Space } from "@alfalab/core-components/space";

import styles from "./index.module.css";

type Props = {
    open?: boolean;
    onClose?: () => void;
    settings: Settings;
    onChange: (payload: { name?: any; value: any }) => void;
};

export function SettingsPanel({ open = false, settings, onChange, onClose }: Props) {
    return (
        <SidePanelResponsive open={open} onClose={onClose}>
            <SidePanelResponsive.Header title="Настройки инпутов" hasCloser={true} />

            <SidePanelResponsive.Content className={styles.content}>
                <Space size={32}>
                    <RadioGroup
                        label="Тема инпута"
                        direction="vertical"
                        name="theme"
                        onChange={(_, payload) => onChange(payload as any)}
                        value={settings.theme}
                    >
                        <Radio label="Core Default" value="default" />
                        <Radio label="Alfa-Online" value="click" />
                        <Radio label="Mobile" value="mobile" />
                        <Radio label="New" value="new" />
                    </RadioGroup>

                    {settings.theme === "new" && (
                        <RadioGroup
                            label="Положение лейбла"
                            direction="vertical"
                            name="labelPosition"
                            onChange={(_, payload) => onChange(payload as any)}
                            value={settings.labelPosition}
                        >
                            <Radio label="Внутри" value="inside" />
                            <Radio label="Снаружи" value="outside" />
                        </RadioGroup>
                    )}

                    {settings.theme === "new" && (
                        <RadioGroup
                            label="Палитра"
                            direction="vertical"
                            name="colors"
                            onChange={(_, payload) => onChange(payload as any)}
                            value={settings.colors}
                        >
                            <Radio label="Indigo" value="indigo" />
                            <Radio label="Bluetint" value="bluetint" />
                        </RadioGroup>
                    )}
                </Space>
            </SidePanelResponsive.Content>
        </SidePanelResponsive>
    );
}
