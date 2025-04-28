export type IVersion = {
    version: string;
    versionLabel: string;
    releaseNotes: string;
    docs: string;
    build: string;
    npm: string;
    prerelease?: boolean;
    dev?: boolean;
    latest?: boolean;
};

export const latestVersion = 'latest';
