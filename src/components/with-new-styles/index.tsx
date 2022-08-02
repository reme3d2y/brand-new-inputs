import React, { useContext } from "react";
import { Typography } from "@alfalab/core-components/typography";
import LockIcon from "./lock";
import ErrorIcon from "./error";
import { AppContext } from "../../App";

import styles from "./index.module.css";

type Props = {
    children: any;
};

export function WithNewStyles({ children }: Props) {
    const context = useContext(AppContext);

    const { label, error, disabled } = children.props;

    const renderLabel = () => {
        if (context.settings.theme !== "new") return label;

        return (
            <span className={styles.iconWithText}>
                {disabled && <LockIcon />}
                {label}
            </span>
        );
    };

    const renderError = () => {
        if (!error) return null;

        if (context.settings.theme !== "new") return error;

        return (
            <span className={styles.iconWithText}>
                {<ErrorIcon />}
                {error}
            </span>
        );
    };

    if (context.settings.labelPosition === "inside")
        return React.cloneElement(children, { label: renderLabel(), error: renderError() });

    return (
        <label className={styles.wrapper}>
            <Typography.Text view="component" className={styles.label}>
                {renderLabel()}
            </Typography.Text>
            {React.cloneElement(children, { label: undefined, error: renderError() })}
        </label>
    );
}
