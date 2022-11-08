### 1 Symbol

`js`在`es6`引入的数据类型，表示独一无二的值

#### 用法

```js
let s = Symbol("test")
typeof(s) // "symbol"
Symbol("a") === Symbol("a")           // false
```

#### 使用场景

作为属性名，不能使用`.`运算，只能使用`[]`

```js
let obj = {}
obj[s] = 'kk'
obj[Symbol("test")] = 'ee'
console.log(obj)  // {Symbol(test): "kk", {Symbol(test): "ee"}
```

#### 读取一个对象的 Symbol 属性

通过 `Object.getOwnPropertySymbols()` 和` Reflect.ownKeys() `取到。

```js
Object.getOwnPropertySymbols(obj);    // [Symbol(test),Symbol(test)]
Reflect.ownKeys(obj);                 // [Symbol(test),Symbol(test)]
```

#### 定义常量

```js
const COLOR_RED = Symbol("red");
```

#### `Symbol.for(key)`

在全局Symbol注册表中搜索是否有该字符串参数作为名称的 Symbol 值，没有则创建一个并放入Symbol注册表，有则返回该Symbol值

```js
let yellow = Symbol("Yellow"); // 不在全局
let yellow1 = Symbol.for("Yellow");
yellow === yellow1;      // false
 
let yellow2 = Symbol.for("Yellow");
yellow1 === yellow2;     // true
```

#### `Symbol.keyFor(sym)`

在全局Symbol注册表中搜索，参数是Symbol值，返回key（字符串类型），找不到返回undefined。

```js
let yellow1 = Symbol.for("Yellow"); // 创建一个全局Symbol
Symbol.keyFor(yellow1);    // "Yellow"
```

