
import { command } from './execute-command.js';
import { fstat, readdirSync, existsSync, readFileSync } from 'fs';

const app = {
    name: 'core',
    version: '7.6.15',
    directory: './libs/core',
    destinationApps: [
        'core'
    ],
    exclusionApps: [
    ],
    isLocal: false,
}

const buildPackage = async (directory, version) => {
    const commandLine = `cd ${directory}; npm run build ; npm pack`;
    await command.run(commandLine);
    const packageJson = readFileSync(`${directory}/package.json`, 'utf8');

    // Move file release to npm-registry
    const fileRelease = `${packageJson.name}-${version}.tgz`;
    await command.run(`cp ${app.directory}/${fileRelease} __npm-registry__`);
    return fileRelease;
}

const getAllDirectories = (source) => {
    const excludeDirectories = [
        '__npm-registry__',
        'templates',
    ]
    return readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .filter(name => !excludeDirectories.includes(name));
}

const hasPackageJson = (source) => {
    const packageJson = 'package.json';
    try {
        const result = existsSync(`./${source}/${packageJson}`);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const hasDependency = (directory, dependency) => {
    const packageJson = readFileSync(`${directory}/package.json`, 'utf8');
    const { dependencies } = JSON.parse(packageJson);
    return dependencies[dependency] !== undefined;
}


const handler = async () => {

    const directories = getAllDirectories(app.directory);
    for (const directory of directories) {
        const subDirectories = getAllDirectories(directory);
        for (const subDirectory of subDirectories) {
            const path = `${app.directory}/${directory}/${subDirectory}`;
            if (!hasPackageJson(`${path}`)) {
                continue;
            }
            if (hasDependency(path, app.name)) {
                console.log('Sub Directory 123: ', subDirectory);
                console.log('Test ne may ma');
                if (app.isLocal) {
                    if (!app.exclusionApps.includes(subDirectory)) {
                        // Do something
                    }
                } else {
                    if (!app.exclusionApps.includes(subDirectory)) {
                        await command.run(`cd ${path}; npm i --save ${app.name}@${app.version}`);
                    }
                }
            } else {
                if (app.isLocal) {
                    // Do some thing here
                    await buildPackage(app.directory, app.version);
                    await command.run(`cp`);
                    const 
                } else {
                    await command.run(`cd ${path}; npm i --save ${app.name}@${app.version}`);
                }
            }
        }
    }
}

handler();