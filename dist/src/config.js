"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const better_fs_1 = require("./lib/better-fs");
const path_1 = require("path");
const yup = __importStar(require("yup"));
const validator = yup.object({
    browser: yup
        .string()
        .required()
        .oneOf(['firefox', 'chromium', 'webkit']),
});
async function getSettings(error) {
    const configPath = path_1.join(constants_1.ROOT, 'boj.config.json');
    if (await better_fs_1.notExists(configPath)) {
        error('Config file does not exists, have you created `boj.config.json`?');
        return null;
    }
    const content = await better_fs_1.readFile(configPath, { encoding: 'utf-8' });
    let jsonContent;
    try {
        jsonContent = JSON.parse(content);
    }
    catch (e) {
        error('Config file is not valid json format:' +
            e.toString().replace('SyntaxError: JSON.parse: ', ''));
        return null;
    }
    try {
        return await validator.validate(jsonContent);
    }
    catch (e) {
        error(e.message + ' in a config file.');
        return null;
    }
}
exports.getSettings = getSettings;
