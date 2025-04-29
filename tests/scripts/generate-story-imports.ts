import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';

interface FileLocations {
    testFile: string;
    storiesDir: string;
}

const PATHS: FileLocations = {
    testFile: path.resolve(process.cwd(), 'tests/__tests__/index.test.tsx'),
    storiesDir: path.resolve(process.cwd(), 'tests/stories'),
};

const MARKERS = {
    imports: {
        start: '/** START AUTO GENERATED IMPORTS */',
        end: '/** END AUTO GENERATED IMPORTS */',
    },
    stories: {
        start: '/** START AUTO GENERATED STORIES */',
        end: '/** END AUTO GENERATED STORIES */',
    },
};

function findStoryFiles(): string[] {
    return glob.sync('**/*.stories.*', {
        cwd: PATHS.storiesDir,
    });
}

function generateImportStatement(file: string): string {
    const importPath = path.relative(path.dirname(PATHS.testFile), path.join(PATHS.storiesDir, file));
    const baseName = path.basename(file, path.extname(file));
    const varName = baseName
        .replace(/\.-?([a-z])/g, (_, letter) => letter.toUpperCase())
        .replace(/-([a-z])/g, (_: string, g: string) => g.toUpperCase());

    return `import * as ${varName} from '${importPath.replace(/\\/g, '/').replace('.tsx', '')}';`;
}

function generateStoryAssignment(file: string): string {
    const baseName = path.basename(file, path.extname(file));
    const varName = baseName
        .replace(/\.-?([a-z])/g, (_, letter) => letter.toUpperCase())
        .replace(/-([a-z])/g, (_: string, g: string) => g.toUpperCase());

    return `allStories.${varName} = composeStories(${varName});`;
}

function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateFileContent(content: string, newContent: string, markers: { start: string; end: string }): string {
    const escapedStart = escapeRegExp(markers.start);
    const escapedEnd = escapeRegExp(markers.end);
    const regex = new RegExp(`${escapedStart}([\\s\\S]*?)${escapedEnd}`, 'g');

    return content.replace(regex, `${markers.start}\n${newContent}\n${markers.end}`);
}

function generateStoryImports(): void {
    try {
        const storyFiles = findStoryFiles();

        // Generate content
        const imports = storyFiles.map(generateImportStatement).join('\n');
        const stories = storyFiles.map(generateStoryAssignment).join('\n');

        // Read and update file
        let content = fs.readFileSync(PATHS.testFile, 'utf8');

        content = updateFileContent(content, imports, MARKERS.imports);
        content = updateFileContent(content, stories, MARKERS.stories);

        // Write back to file
        fs.writeFileSync(PATHS.testFile, content);

        // eslint-disable-next-line no-console
        console.log('Successfully updated story imports');
    } catch (error) {
        console.error('Error generating story imports:', error);
        process.exit(1);
    }
}

// Execute
generateStoryImports();
