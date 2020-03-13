interface MenuTypes {
    name: string,
    icon?: JSX.Element,
    component?: any,
    path?: string,
    menuIgnore?: boolean;
    children?: MenuConfig;
    renderPath?: string;
}

export interface formatMenuTypes extends MenuTypes {
    renderPath: string;
    children?: formatMenuConfig;
}

export interface MenuConfig {
    [propsName: string]: MenuTypes;
}

export interface formatMenuConfig {
    [propsName: string]: formatMenuTypes;
}

export interface ConfigProps {
    config: formatMenuConfig;
}

