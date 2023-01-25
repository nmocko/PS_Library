import * as fs from 'node:fs';

export default function fsw (name) {

    try {
        if (fs.lstatSync(name).isDirectory()) {
            var dane = name + " jest katalogiem";
            return dane;
        }
    } catch (error) {
    }

    try {
        if (fs.lstatSync(name).isFile()) {
            var dane = name + " jest plikiem, a jego zawartością jest:\n";
            dane += fs.readFileSync(name, "utf8");
            return dane;
        }

    } catch (error) {
    }
}

console.log(fsw(process.argv[2]));