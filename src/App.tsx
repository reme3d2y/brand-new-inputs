import React, { useMemo, useState } from "react";
import { hot } from "react-hot-loader/root";
import { Routes, Route, Link } from "react-router-dom";
import { MainPage } from "./pages/main";

import click from "!!css-loader!postcss-loader!@alfalab/core-components/themes/click.css";
import corp from "!!css-loader!postcss-loader!@alfalab/core-components/themes/corp.css";
import mobile from "!!css-loader!postcss-loader!@alfalab/core-components/themes/mobile.css";
import newTheme from "!!css-loader!postcss-loader!./themes/new.css";
import newBluetintTheme from "!!css-loader!postcss-loader!./themes/new-bluetint.css";

import bluetint from "@alfalab/core-components/vars/colors-bluetint";

export const defaultSettings: Settings = {
    theme: "new",
    labelPosition: "inside",
    colors: "indigo",
};

const themes = {
    click,
    corp,
    mobile,
    new: newTheme,
    newBluetint: newBluetintTheme,
    default: "",
} as const;

type AppContext = {
    settings: Settings;
    setSettings: (payload: any) => void;
};

export const AppContext = React.createContext<AppContext>({
    settings: defaultSettings,
    setSettings: () => null,
});

function App() {
    const [settings, setSettings] = useState<Settings>(defaultSettings);

    const handleSettingsChange = (payload: any) => {
        const newSettings: Settings = {
            ...settings,
            [payload.name]: payload.value,
        };

        if (settings.theme !== "new" && newSettings.theme === "new") {
            newSettings.colors = "bluetint";
        }

        if (newSettings.theme !== "new") {
            newSettings.colors = defaultSettings.colors;
            newSettings.labelPosition = defaultSettings.labelPosition;
        }

        setSettings(newSettings);
    };

    const contextValue = useMemo<AppContext>(
        () => ({
            settings,
            setSettings: handleSettingsChange,
        }),
        [settings]
    );

    return (
        <AppContext.Provider value={contextValue}>
            <style>{themes[settings.theme].toString()}</style>

            {settings.theme === "new" && settings.colors === "bluetint" && (
                <style>{themes.newBluetint.toString()}</style>
            )}

            {settings.colors === "bluetint" && <style>{bluetint}</style>}

            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/brand-new-inputs" element={<MainPage />} />
            </Routes>
        </AppContext.Provider>
    );
}

export default hot(App);
