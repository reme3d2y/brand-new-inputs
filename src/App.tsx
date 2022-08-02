import React, { useMemo, useState } from "react";
import { hot } from "react-hot-loader/root";
import { MainPage } from "./pages/main";

export const defaultSettings: Settings = {
    theme: "default",
    labelPosition: "inside",
    colors: "indigo",
};

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
            <MainPage />
        </AppContext.Provider>
    );
}

export default hot(App);
