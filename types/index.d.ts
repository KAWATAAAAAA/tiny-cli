declare const Command: any;
declare const program: any;
declare const chalk: any;
declare const createCommand: any;
declare const installCommand: any;
declare const serveCommand: any;
declare const buildCommand: (mode?: string) => void;
declare interface MapAction {
    create: CommandInfo;
    [key: string]: CommandInfo;
}
declare interface CommandInfo {
    alias: string;
    description: string;
    examples: Array<string>;
}
declare const mapActions: MapAction;
declare const COMMAND_HELP: () => void;
declare const version: any;
