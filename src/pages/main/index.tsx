import React, { useContext, useState } from "react";
import { Typography } from "@alfalab/core-components/typography";
import { Link } from "@alfalab/core-components/link";

import styles from "./index.module.css";
import { SettingsPanel } from "./settings-panel";
import { InputsForm } from "./inputs-form";

import click from "!!css-loader!postcss-loader!@alfalab/core-components/themes/click.css";
import mobile from "!!css-loader!postcss-loader!@alfalab/core-components/themes/mobile.css";
import newTheme from "!!css-loader!postcss-loader!../../themes/new.css";

import bluetint from "@alfalab/core-components/vars/colors-bluetint";
import { AppContext } from "../../App";

const themes = {
    click,
    mobile,
    new: newTheme,
    default: "",
} as const;

export function MainPage() {
    const [open, setOpen] = useState(false);

    const context = useContext(AppContext);

    return (
        <>
            <style>{themes[context.settings.theme].toString()}</style>

            {context.settings.colors === "bluetint" && <style>{bluetint}</style>}

            <div className={styles.main}>
                <Typography.Title tag="h1" view="medium" font="system" className={styles.title}>
                    Тест инпутов
                </Typography.Title>

                <Typography.Text view="primary-medium" tag="p" className={styles.text}>
                    Мы хотим протестировать несколько стилистических решений для инпутов. Возпользуйтесь{" "}
                    <Link view="default" onClick={() => setOpen(true)}>
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
