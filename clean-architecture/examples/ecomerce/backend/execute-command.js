import util from "util";
import { exec } from "child_process";
const execPromise = util.promisify(exec);

async function run(command) {
    console.log("Execute command: ", command);
    await execPromise(command);
}

export const command = {
    run
};