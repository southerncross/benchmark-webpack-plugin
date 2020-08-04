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
exports.__esModule = true;
var os = require("os");
var path = require("path");
var superagent = require("superagent");
var API_ENTRY = 'https://benchmark.lishunyang.com/api.json';
var BenchmarkWebpackPlugin = (function () {
    function BenchmarkWebpackPlugin() {
        var _this = this;
        this.apply = function (compiler) {
            compiler.plugin('done', function (stats) { return __awaiter(_this, void 0, void 0, function () {
                var bundleSize, _i, _a, asset, body, uploadApi, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.isInitial) {
                                return [2];
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            bundleSize = 0;
                            for (_i = 0, _a = stats.toJson().assets; _i < _a.length; _i++) {
                                asset = _a[_i];
                                bundleSize += asset.size;
                            }
                            body = {
                                username: os.userInfo().username,
                                platform: os.platform(),
                                cpu: os.cpus()[0].model.trim(),
                                memory: (os.totalmem() / 1024 / 1024).toFixed(1),
                                projectName: this.getProjectName(compiler),
                                bundleSize: bundleSize,
                                compileTime: stats.endTime - stats.startTime
                            };
                            return [4, superagent.get(API_ENTRY)];
                        case 2:
                            uploadApi = (_b.sent()).body.upload;
                            return [4, superagent.post(uploadApi).set('accept', 'json').send(body)];
                        case 3:
                            _b.sent();
                            return [3, 5];
                        case 4:
                            e_1 = _b.sent();
                            console.log(e_1);
                            return [3, 5];
                        case 5:
                            this.isInitial = false;
                            return [2];
                    }
                });
            }); });
        };
        this.isInitial = true;
    }
    BenchmarkWebpackPlugin.prototype.getProjectName = function (compiler) {
        var DEFAULT_NAME = 'unknown';
        try {
            return compiler.inputFileSystem.readFileSync(path.join('./', 'package.json')).toString().match(/"name": "(.*)",\n/)[1] || DEFAULT_NAME;
        }
        catch (e) {
            return DEFAULT_NAME;
        }
    };
    return BenchmarkWebpackPlugin;
}());
module.exports = BenchmarkWebpackPlugin;
