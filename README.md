# Deno_lodash - [Deno](https://deno.land/)

Lodash for the Deno runtime enviroment via import statement.

## Table of Contents

- [Deno_lodash](#Deno_lodash)
  - [Table of Contents](#table-of-contents)
  - [Download and use](#Download-and-use)
  - [Example](#Download-and-use)
  - [Installation](#Download-and-use)
  - [API](#api)
  - [Links](#links)

## Download and use
```ts
import _ from "https://raw.githubusercontent.com/alirealasad/deno_lodash/master/mod.ts";
// or
import _ from "https://deno.land/x/deno_lodash/mod.ts";
```
```
# deno run main.ts
```

## Example

```ts
import _ from "https://deno.land/x/deno_lodash/mod.ts";

console.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }));
// → { 'a': 1, 'b': 2 }

console.log(_.partition([1, 2, 3, 4], (n:number) => n % 2));
// → [[1, 3], [2, 4]]

```

## API

Usage of Lodash is the same. API reference can be found [here](https://lodash.com/docs/).

## Links

- [Lodash API](https://lodash.com/docs/)
