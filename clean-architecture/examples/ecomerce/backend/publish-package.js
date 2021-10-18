
import { command } from './execute-command.js';
import {
    readdirSync,
    existsSync,
    readFileSync,
    writeFileSync
} from 'fs';

// const app = {
//     name: 'core',
//     packageName: 'company-core',
//     version: '0.0.1',
//     directory: './libs/core',
//     rootDirectory: '.',
//     destinationApps: [
//     ],
//     exclusionApps: [
//     ],
//     isLocal: true,
// }

// const app = {
//     name: 'plugin-mongo',
//     packageName: 'plugin-mongo',
//     version: '0.0.1',
//     directory: './libs/plugin-mongo',
//     rootDirectory: '.',
//     destinationApps: [
//         // 'plugin-mongo',
//     ],
//     exclusionApps: [
//         'core'
//     ],
//     isLocal: true,
// }

// const app = {
//     name: 'plugin-mysql',
//     packageName: 'plugin-mysql',
//     version: '0.0.1',
//     directory: './libs/plugin-mysql',
//     rootDirectory: '.',
//     destinationApps: [
//         // 'plugin-mongo',
//     ],
//     exclusionApps: [
//         'core', 'plugin-mongo'
//     ],
//     isLocal: true,
// }

const app = {
    name: 'plugin-dynamo',
    packageName: 'plugin-dynamo',
    version: '0.0.1',
    directory: './libs/plugin-dynamo',
    rootDirectory: '.',
    destinationApps: [
        // 'plugin-mongo',
    ],
    exclusionApps: [
        'core', 'plugin-mongo', 'plugin-mysql'
    ],
    isLocal: true,
}



const buildPackage = async (directory, version) => {
    const commandLine = `cd ${directory}; npm run build ; npm pack`;
    await command.run(commandLine);

    // Move file release to root npm-registry
    const packageJson = JSON.parse(readFileSync(`${directory}/package.json`, 'utf8'));
    const fileRelease = `${packageJson.name}-${version}.tgz`;

    if (existsSync(`__npm-registry__/${fileRelease}`)) {
        await command.run(`rm -rf __npm-registry__/${fileRelease}`);
    }
    
    await command.run(`cp ${app.directory}/${fileRelease} __npm-registry__`);
    await command.run(`rm -rf ${directory}/${fileRelease}`);
    return fileRelease;
}

const addOrEditDependencyToPackageJson = async (directory, packageName, version) => {
    const packageJson = JSON.parse(readFileSync(`${directory}/package.json`, 'utf8'));
    const fileRelease = `${packageName}-${version}.tgz`;
    packageJson.dependencies[packageName] = `file:./__npm-registry__/${fileRelease}`;
    await writeFileSync(`${directory}/package.json`, JSON.stringify(packageJson, null, 2));
}

const getAllDirectories = (source) => {
    const excludeDirectories = [
        '__npm-registry__',
        'templates',
        'node_modules'
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
    if (!dependencies)
        return false;

    return dependencies[dependency] !== undefined;
}

const handler = async () => {

    try {
        const directories = getAllDirectories('./');
        console.log('Directories ne: ', directories);
        for (const directory of directories) {
            const subDirectories = getAllDirectories(directory)
                .filter(d => d !== app.name);
            for (const subDirectory of subDirectories) {
                const path = `${app.rootDirectory}/${directory}/${subDirectory}`;
                if (!hasPackageJson(`${path}`)) {
                    continue;
                }
                if (hasDependency(path, app.packageName)) {
                    if (app.isLocal) {
                        if (!app.exclusionApps.includes(subDirectory)) {
                            await command.run(`rm -rf ${path}/node_modules/${app.packageName}`);
                            await command.run(`rm -rf ${path}/package-lock.json`);

                            const fileRelease = await buildPackage(app.directory, app.version);
                            await command.run(`cp __npm-registry__/${fileRelease} ${path}/__npm-registry__`);
                            await addOrEditDependencyToPackageJson(path, app.packageName, app.version);
                            await command.run(`cd ${path}; npm i`);
                        }
                    } else {
                        if (!app.exclusionApps.includes(subDirectory)) {
                            await command.run(`cd ${path}; npm i --save ${app.packageName}@${app.version}`);
                        }
                    }
                } else {
                    if (app.isLocal) {
                        const packageJson = JSON.parse(readFileSync(`${path}/package.json`, 'utf8'));
                        if (packageJson.name !== app.packageName && !app.exclusionApps.includes(subDirectory)) {
                            if (!existsSync(`${path}/__npm-registry__`)) {
                                await command.run(`mkdir ${path}/__npm-registry__`);
                            }
                            const fileRelease = await buildPackage(app.directory, app.version);
                            await command.run(`cp __npm-registry__/${fileRelease} ${path}/__npm-registry__`);
                            await addOrEditDependencyToPackageJson(path, app.packageName, app.version);
                            await command.run(`cd ${path}; npm i`);
                        }

                    } else {
                        await command.run(`cd ${path}; npm i --save ${app.packageName}@${app.version}`);
                    }
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

handler();