
export declare interface MapAction{
    create:CommandInfo,
    [key: string]: CommandInfo;
}

export declare interface CommandInfo{
    alias: string,
    description: string,
    examples: Array<string>
}