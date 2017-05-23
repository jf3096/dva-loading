# dva-loading

[![NPM version](https://img.shields.io/npm/v/dva-loading.svg?style=flat)](https://npmjs.org/package/dva-loading)
[![Build Status](https://img.shields.io/travis/dvajs/dva-loading.svg?style=flat)](https://travis-ci.org/dvajs/dva-loading)
[![Coverage Status](https://img.shields.io/coveralls/dvajs/dva-loading.svg?style=flat)](https://coveralls.io/r/dvajs/dva-loading)
[![NPM downloads](http://img.shields.io/npm/dm/dva-loading.svg?style=flat)](https://npmjs.org/package/dva-loading)

Auto loading plugin for dva. :clap: You don't need to write `showLoading` and `hideLoading` any more.

---
## Fork

This is a fork version of dva-loading. The default dva-loading has some pitfalls such as:
1. Loader for each redux state should be design as counter not simple boolean. (inspired by NProgress)
2. The loading state is link to redux state itself instead of each component data which are store in redux state. (working in progress)

The above problems are going to address in the repo.

## Install

```bash
$ npm install dva-loading --save
```

## Usage

```javascript
import createLoading from 'dva-loading';

const app = dva();
app.use(createLoading(opts));
```

Then we can access loading state from store.

### opts

- `opts.namespace`: property key on global state, type String, Default `loading`

[See real project usage on dva-hackernews](https://github.com/dvajs/dva-hackernews/blob/2c3330b1c8ae728c94ebe1399b72486ad5a1a7a0/src/index.js#L4-L7).

- `opts.effects`: enable effects level loading state

## State Structure

```
loading: {
  global: false,
  models: {
    users: false,
    todos: false,
    ...
  },
}
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
