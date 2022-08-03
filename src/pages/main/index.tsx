import React, { useContext, useState } from "react";
import { Typography } from "@alfalab/core-components/typography";
import { Link } from "@alfalab/core-components/link";

import styles from "./index.module.css";
import { SettingsPanel } from "./settings-panel";
import { InputsForm } from "./inputs-form";

import { AppContext } from "../../App";

export function MainPage() {
    const [open, setOpen] = useState(false);

    const context = useContext(AppContext);

    return (
        <>
            <div className={styles.main}>
                <Typography.Title tag="h1" view="medium" font="system" className={styles.title}>
                    Тест инпутов
                </Typography.Title>

                <Typography.Text view="primary-medium" tag="p" className={styles.text}>
                    Мы хотим протестировать несколько стилистических решений для инпутов. Возпользуйтесь{" "}
                    <Link Component="button" view="default" onClick={() => setOpen(true)}>
                        панелью настроек
                    </Link>
                    , чтоб посмотреть как различные графические элементы влияют на восприятие формы. После
                    того как все комбинации будут препробованы, пожалуйста пройдите{" "}
                    <Link view="default" href="https://forms.gle/d3xGcrugLejsr7tN6" target="_blank">
                        небольшой опрос
                    </Link>{" "}
                    на гуглоформах.
                </Typography.Text>

                <InputsForm />
            </div>

            <SettingsPanel
                open={open}
                onClose={() => setOpen(false)}
                settings={context.settings}
                onChange={context.setSettings}
            />
        </>
    );
}
