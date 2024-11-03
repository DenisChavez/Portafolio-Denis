//Importar dependencias
import { defineConfig } from "vite";
import path, { resolve } from 'node:path';
import * as glob from 'glob';
import htmlPurge from 'vite-plugin-purgecss';
import handlebars from 'vite-plugin-handlebars';

//Importar configuración de visualización de páginas

const getHtmlEntries = () => {
    return Object.fromEntries(
        [
            ...glob.sync('./**/*.html', { ignore: ['./dist/**', './node_modules/**'] }).map(file => [
                file.slice(0, file.length - path.extname(file).length),
                resolve(__dirname, file)
            ])
        ]
    );
};

export default defineConfig(
    {
        appType: 'spa',
        base: '/Portafolio-Denis/',
        build: {
            rollupOptions: {
                input: getHtmlEntries()
            }
        },
        plugins: [
            handlebars({
                partialDirectory: resolve(__dirname, 'components')
            }),
            htmlPurge({}),
        ]
    }
);