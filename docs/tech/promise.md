# Promise

学一下`JavaScript`的`Promise`

## Promise是什么

`Promise`代表异步操作的成功或失败及其结果值。

它一般作为一个函数的返回值，它存储了一次异步操作的成功值或失败值，方便后面链式调用获取这个值。

## 使用一个用promise写的函数

示例：以下的doSomething doSomethingElse doThirdThing 均为异步函数

```javascript
doSomething()
  .then(function (result) {
    return doSomethingElse(result);
  })
  .then(function (newResult) {
    return doThirdThing(newResult);
  })
  .then(function (finalResult) {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);
```

其中`catch(failureCallback)` 等同于 `then(null, failureCallback)`。以上的then函数没传入失败回调，失败时会沿链寻找，一直到最后的catch。

注意上面的每个then的回调函数都return了，除了最后一个。

用回调函数代替：

```javascript
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);
```

## 详解

Promise（承诺）”有以下三种状态：

pending（等待中）：初始状态，既未被兑现也未被拒绝。

fulfilled（已兑现）：表示操作成功完成。

rejected（已拒绝）：表示操作失败。

pending可以变成fulfilled或者rejected，变成其中一种后，就会调用Promise的then函数中的对应回调函数。

![promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)

## then()

[`Promise.prototype.then()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

接收两个可选参数，第一个参数是承诺被兑现时调用的回调函数，第二个参数是承诺失败时调用的回调函数。它返回一个Promise对象。

两个回调函数参数一般都要返回值，随便什么类型的值，用于给链式调用的下一级then的参数调用。没有下一级链式调用就不用了。

没有第二个参数得话，链可以省略每一个拒绝回调函数，直到最后一个catch函数。

## Constructor

Syntax

`new Promise(fn)`，返回Promise对象。

fn接收两个函数参数：`resolveFunc`和`rejectFunc`，它们都只接收一个参数。

```javascript
function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}
```

## Static methods

### Promise.all()

处理一堆Promise，等所有Promise全部fulfilled或者任意一个Promise报错，那么结束。返回Promise。fulfilled时返回数组，包含每个Promise的结果。rejected时返回第一个错误。

示例

```javascript
// Passing an array of promises that are already resolved,
// to trigger Promise.all as soon as possible
const resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

const p = Promise.all(resolvedPromisesArray);
// Immediately logging the value of p
console.log(p);

// Using setTimeout, we can execute code after the queue is empty
setTimeout(() => {
  console.log("the queue is now empty");
  console.log(p);
});

// Logs, in order:
// Promise { <state>: "pending" }
// the queue is now empty
// Promise { <state>: "fulfilled", <value>: Array[2] }
```

示例2

```javascript
const mixedPromisesArray = [Promise.resolve(33), Promise.reject(44)];
const p = Promise.all(mixedPromisesArray);
console.log(p);
setTimeout(() => {
  console.log("the queue is now empty");
  console.log(p);
});

// Logs:
// Promise { <state>: "pending" }
// the queue is now empty
// Promise { <state>: "rejected", <reason>: 44 }
```

示例3

```javascript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
```

### Promise.allSettled()

处理一堆Promise，不管每个Promise成功还是失败，都等它。返回Promise。

示例

```javascript
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

Promise.allSettled(promises).
  then((results) => results.forEach((result) => console.log(result.status)));

// Expected output:
// "fulfilled"
// "rejected"
```

示例2

```javascript
Promise.allSettled([
  Promise.resolve(33),
  new Promise((resolve) => setTimeout(() => resolve(66), 0)),
  99,
  Promise.reject(new Error("an error")),
]).then((values) => console.log(values));

// [
//   { status: 'fulfilled', value: 33 },
//   { status: 'fulfilled', value: 66 },
//   { status: 'fulfilled', value: 99 },
//   { status: 'rejected', reason: Error: an error }
// ]
```

### Promise.any()

处理一堆Promise，直到有一个Promise成功。返回Promise。

示例

```javascript
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

// Expected output: "quick"
```

示例2：没有一个fulfilled

```javascript
const failure = new Promise((resolve, reject) => {
  reject("Always fails");
});

Promise.any([failure]).catch((err) => {
  console.log(err);
});
// AggregateError: No Promise in Promise.any was resolved
```

### Promise.race()

处理一堆Promise，直到任何一个Promise返回值，不管是fulfilled还是rejected。返回Promise。

示例

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// Expected output: "two"
```

示例2

```javascript
function sleep(time, value, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfill") {
        return resolve(value);
      } else {
        return reject(new Error(value));
      }
    }, time);
  });
}

const p1 = sleep(500, "one", "fulfill");
const p2 = sleep(100, "two", "fulfill");

Promise.race([p1, p2]).then((value) => {
  console.log(value); // "two"
  // Both fulfill, but p2 is faster
});

const p3 = sleep(100, "three", "fulfill");
const p4 = sleep(500, "four", "reject");

Promise.race([p3, p4]).then(
  (value) => {
    console.log(value); // "three"
    // p3 is faster, so it fulfills
  },
  (error) => {
    // Not called
  },
);

const p5 = sleep(500, "five", "fulfill");
const p6 = sleep(100, "six", "reject");

Promise.race([p5, p6]).then(
  (value) => {
    // Not called
  },
  (error) => {
    console.error(error.message); // "six"
    // p6 is faster, so it rejects
  },
);
```

### Promise.reject()

返回一个失败的Promise。

示例

```javascript
Promise.reject(new Error("fail")).then(
  () => {
    // not called
  },
  (error) => {
    console.error(error); // Stacktrace
  },
);
```

### Promise.resolve()

返回一个成功的Promise。

示例1：传一个数值

```javascript
const promise1 = Promise.resolve(123);

promise1.then((value) => {
  console.log(value);
  // Expected output: 123
});
```

示例2：传一个数组

```javascript
const p = Promise.resolve([1, 2, 3]);
p.then((v) => {
  console.log(v[0]); // 1
});
```

示例3：传一个Promise，返回相同的Promise

```javascript
const original = Promise.resolve(33);
const cast = Promise.resolve(original);
cast.then((value) => {
  console.log(`value: ${value}`);
});
console.log(`original === cast ? ${original === cast}`);

// Logs, in order:
// original === cast ? true
// value: 33
```

## Instance methods

### Promise.prototype.catch()

Promise被拒绝时会调用这个方法，它传入一个参数函数。等同于`Promise.prototype.then(undefined, onRejected)`。

示例

```javascript
const promise1 = new Promise((resolve, reject) => {
  throw new Error('Uh-oh!');
});

promise1.catch((error) => {
  console.error(error);
});
// Expected output: Error: Uh-oh!
```

### Promise.prototype.then()

[参考上面的then](#then())

### Promise.prototype.finally()

无论Promise成功和失败，都会调用。返回Promise。

示例

```javascript
function checkMail() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve('Mail has arrived');
    } else {
      reject(new Error('Failed to arrive'));
    }
  });
}

checkMail()
  .then((mail) => {
    console.log(mail);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log('Experiment completed');
  });
// "Mail has arrived"
// "Experiment completed"
```

