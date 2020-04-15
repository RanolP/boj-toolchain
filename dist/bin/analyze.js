"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var better_fs_1 = require("../src/better-fs");
var console_1 = require("../src/util/console");
var problem_1 = require("../src/problem");
var baekjoon_1 = require("../src/api/baekjoon");
var align_1 = require("../src/util/align");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var base, problemList, tagged, title, _a, problemLoggers, _b, _c, _d, index, _e, problem, message, log;
    var e_1, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                base = new console_1.Logger('analyze');
                return [4 /*yield*/, problem_1.getProblemList({ sorted: true })];
            case 1:
                problemList = _g.sent();
                return [4 /*yield*/, Promise.all(problemList.map(function (it) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!it.isSolved) {
                                        return [2 /*return*/, [[it, 'Not solved']]];
                                    }
                                    return [4 /*yield*/, better_fs_1.notExists(it.noteFile)];
                                case 1:
                                    if (_a.sent()) {
                                        return [2 /*return*/, [[it, 'Note not found']]];
                                    }
                                    return [2 /*return*/, []];
                            }
                        });
                    }); }))];
            case 2:
                tagged = (_g.sent()).flat();
                _a = align_1.aligned;
                return [4 /*yield*/, Promise.all(tagged.map(function (_a) {
                        var _b = __read(_a, 1), it = _b[0];
                        return baekjoon_1.fetchProblemTitle(it.id);
                    }))];
            case 3:
                title = _a.apply(void 0, [_g.sent(),
                    align_1.stringify]);
                problemLoggers = base.labeled(tagged.map(function (_a) {
                    var _b = __read(_a, 1), it = _b[0];
                    return it.id;
                }), console_1.chalk.yellow);
                try {
                    for (_b = __values(Object.entries(tagged)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        _d = __read(_c.value, 2), index = _d[0], _e = __read(_d[1], 2), problem = _e[0], message = _e[1];
                        log = problemLoggers[problem.id];
                        log(title[Number(index)] + "  " + message);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_f = _b.return)) _f.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return [2 /*return*/];
        }
    });
}); })();