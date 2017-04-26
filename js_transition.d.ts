declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void,chunkName?:string) => void;
};
interface NewWindow extends Window {
    openWithHash(url?: string, target?: string, features?: string, replace?: boolean,first?:boolean) : Window;
};
declare var window:NewWindow;
