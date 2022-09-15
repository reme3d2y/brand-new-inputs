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

    const { label, error, disabled, leftAddons, rightAddons } = children.props;

    const renderLabel = () => {
        if (context.settings.theme !== "new") return label;

        return (
            <span className={styles.iconWithText}>
                {/* {disabled && <LockIcon />} */}
                {label}
            </span>
        );
    };

    const renderError = () => {
        if (!error) return null;

        if (context.settings.theme !== "new") return error;

        return (
            <span className={styles.iconWithText}>
                {/* {<ErrorIcon />} */}
                {error}
            </span>
        );
    };

    const renderRightAddons = () => {
        if (!rightAddons && !disabled) return null;

        return (
            <span className={styles.addons}>
                {/* {context.settings.colors === "indigo" && disabled && <LockIcon />} */}
                {disabled && <LockIcon />}
                {rightAddons}
            </span>
        );
    };

    const renderLeftAddons = () => {
        // if (context.settings.colors === "indigo" || !disabled) return null;
        return null;

        return (
            <span className={styles.addons}>
                {/* {context.settings.colors === "bluetint" && disabled && <LockIcon />} */}
                {leftAddons}
            </span>
        );
    };

    if (context.settings.labelPosition === "inside" && context.settings.theme !== "mobile")
        return React.cloneElement(children, {
            label: renderLabel(),
            error: renderError(),
            rightAddons: renderRightAddons(),
            leftAddons: renderLeftAddons()
        }
    );

    return (
        <label className={styles.wrapper}>
            <Typography.Text view="component" className={styles.label}>
                {renderLabel()}
            </Typography.Text>
            {React.cloneElement(children, {
                label: undefined,
                error: renderError(),
                rightAddons: renderRightAddons(),
                leftAddons: renderLeftAddons()
            })}
        </label>
    );
}
