
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src'); // your source code, with the assets and code
const distPath = path.resolve(__dirname, 'dist'); // the output folder


let config = [];

config.push({
   mode: 'production',
   context: srcPath,
   entry: './<YourMainPackageFile>.js',
   output: {
     path: distPath,
     filename: '<YourMainPackageFile>.js',
     libraryTarget: 'commonjs2',
   },
   module: {
     rules: [
       {
         test: /\.js?$/,
         exclude: /(node_modules)/,
         use: 'babel-loader',
       },
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       }
     ],
   },
   resolve: {
     alias: {
       'react': path.resolve(__dirname, './node_modules/react'),
       'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
     }
   },
   plugins: [
     new CopyPlugin({
       patterns: [
         { from: './assets', to: 'assets' },
       ],
     }),
   ],
   externals: {
     // Don't bundle react or react-dom      
     react: {
       commonjs: "react",
       commonjs2: "react",
       amd: "React",
       root: "React"
     },
     "react-dom": {
       commonjs: "react-dom",
       commonjs2: "react-dom",
       amd: "ReactDOM",
       root: "ReactDOM"
     }
   }
})

const otherFiles = ['<File1.js>', '<File2.js>'];

if(otherFiles.length > 0){
   otherFiles.map(fileName => {
      config.push({
         mode: 'production',
         context: srcPath,
         entry: `./${fileName}.js`,
         output: {
           path: distPath,
           filename: `${fileName}.js`,
           libraryTarget: 'commonjs2',
         },
         module: {
           rules: [
             {
               test: /\.js?$/,
               exclude: /(node_modules)/,
               use: 'babel-loader',
             },
           ],
         },
       })
   })
}

module.exports = config;
