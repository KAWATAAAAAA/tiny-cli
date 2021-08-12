export default function rollupBuildState(): {
    name: string;
    buildStart: (options: any) => Promise<void>;
    buildEnd: () => Promise<void>;
    renderStart: () => Promise<void>;
    writeBundle: () => Promise<void>;
};
