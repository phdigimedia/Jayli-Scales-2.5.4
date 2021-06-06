# Baseline

A simple style library for Bigcommerce themes.

## Installation

```
npm i --save github:pixelunion/bc-baseline
```

## Usage

You can now import the baseline stylesheet:

```
@import "../../node_modules/bc-baseline/baseline";
``

It is recommended to import `normalize` before `baseline`.

## Development

Use [scss-lint](https://github.com/brigade/scss-lint) to check for errors before commiting.

Baseline comes with an example HTML file. To rebuild it after adding/changing styles, run `npm run build`. That will compile all SCSS files and inject them into `/scripts/template.html`, saving the result to `example.html`.
