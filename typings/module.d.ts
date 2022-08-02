declare module "*.css" {
    const classes: { [key: string]: string };
    export default classes;
}

type Colors = "indigo" | "bluetint";

type Theme = "default" | "click" | "mobile" | "new";

type LabelPosition = "inside" | "outside";

type Settings = {
    theme: Theme;
    labelPosition: LabelPosition;
    colors: Colors;
};
