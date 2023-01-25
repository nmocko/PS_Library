import * as fs from 'node:fs';

export default function fsw (name, response) {

        fs.lstat(name, function (err, stats)  {
            if (stats != undefined) {
                if (stats.isDirectory()) {
                    response.write(`${name} jest katalogiem`);
                    response.end();
                }
            
                if (stats.isFile()) {
                    fs.readFile(name, 'utf8', function (err, dane) {
                        response.write(`${name} jest plikiem, a jego zawartość to:\n ${dane}`);
                        response.end();
                    })
                }
                }

            else {
                response.write(`To nie jest plik, ani katalog`);
                response.end();
                }

        })
}
