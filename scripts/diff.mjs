import glob from "glob";
import { difference } from "lodash-es";
import { extname, dirname, join } from "path";
import { writeFileSync, readFileSync } from "fs";

const ENV = readFileSync(join(process.cwd(), ".env.diff"), "utf-8")
  .split(/\r?\n/)
  .reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    acc[key] = value;
    return acc;
  }, {});
const enCwd = join(ENV["EN"], "files/en-us");
const zhCwd = join(ENV["ZH"], "files/zh-cn");

const enPath = glob.sync("**/*.{html,md}", {
  cwd: enCwd,
});

const zhPath = glob.sync("**/*.{html,md}", {
  cwd: zhCwd,
});

writeFileSync(
  "./diff.json",
  JSON.stringify(difference(enPath.map(dirname), zhPath.map(dirname)))
);
