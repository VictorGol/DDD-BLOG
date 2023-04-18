<script setup>
  import Card from '../components/card.vue'
  import Cover from '../components/cover.vue'
</script>

# react随记

react更新页面分两步：render和commit。
render期间：调用组件，确定屏幕显示什么。
commit期间：将更改应用到DOM。

## 保留与重置state

<Card day="<a href='https://react.dev/learn/preserving-and-resetting-state' target='_blank'>来自官网</a>" 
text="
<b>保留与重置state</b>
<br><br>对于JSX，react会对他建模成UI Tree，然后再渲染成DOM。其中每个react组件的state保存在这个组件所在UI Tree的位置（而不是这个组件里），相同组件（不是同一个）在UI Tree的同一位置的交换不会重置state，不同组件在UI Tree的同一位置交换会重置state。
<br><br>不过，也有需要在同一位置相同组件的交换重置state的情况，有两种解决办法：
<br>一是两个相同组件渲染在不同位置，所谓不同位置，一般用一对花括号表示一个位置，将两个组件放在两个花括号里就表示不同位置了。
<br>二是使用不同的key，这种更好。
<br><br>如果移除了组件但是想要保留它的state，有三种方法：
<br>一是用css隐藏元素，这种方法适合简单的UI。
<br>二是把state交给父组件，这个更通用。
<br>三是其他来源，比如localStorage，这个看情况用。"
/>

## reducer

<Card day="<a href='https://react.dev/learn/extracting-state-logic-into-a-reducer' target='_blank'>来自官网</a>" 
text="
<b>提取所有state为一个reducer函数</b>
<br><br><i>统合state更新逻辑</i>
<br><br>将useState迁移到useReducer分三步：
<br>1.将<font color='#DAA520'>setState</font>类型的函数改成dispatch函数，dispatch接收一个对象类型的参数，叫做action，action里的键值对是之前setState的参数，加上一个type字段，用来表示此次操作是什么操作。
<br>2.写一个reducer函数，放在组件外或者新建一个文件，它接收两个参数，当前state和action，它返回next state。
<br>3.引入useRreducer函数代替useState。
<br><br>注意：
<br>reducer必须是纯函数，它不能改变state，只能重新返回一个state，但是immerReducer可以。安装：<code>npm install immer use-immer</code> <code>https://github.com/immerjs/use-immer</code>
"/>

## context深层组件传值

<Card day="<a href='https://react.dev/learn/passing-data-deeply-with-context' target='_blank'>来自官网</a>" 
text="
<b>Context：父组件向子子...子组件传送数据</b>
<br><br><i>为了方便，替代props</i>
<br><br>使用Context的三个步骤：
<br>1.新建一个js文件，创建一个anyContext。
<br>2.在子组件里使用它，先引入useContext，再引入刚刚创建的context。
<br>用法<code>const val = useContext(anyContext)</code>
<br>注意：只能在组件上方立即调用。
<br>3.从父组件提供数据给context。引入你创建的anyContext，在父组件中，将children包裹进anyContext.Provider组件，提供的值作为props传给这个组件的value。如果想要覆盖父组件的context，那就在用anyContext.Provider包装以下，传一个新值。当然，不同的context不会彼此影响。
<br>注意：传参不复杂的话最好用props，因为props层级清晰。
"/>

## 组合reducer和context

<Card day="<a href='https://react.dev/learn/scaling-up-with-reducer-and-context' target='_blank'>来自官网</a>" 
text="
<b>组合reducer和context</b>
<br><br><i>适用于组件非常多的情况，比如上百个</i>
<br><br>三步
<br>1.在一个js文件里创建两个context，父组件里创建reducer。一个context存state，一个context存disptach。
<br>2.将state和dispatch放入context，像下面这个。
<br>3.使用context，删除所有props。
<br>4.在这个js文件里组合context和reducer，导出一个组件，叫xxxProvider。
<br><br>好处：可以在任意子组件里调用dispatch了。
<br><br>注意：xxxProvider只对子组件有效。
"/>

```javascript
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  // ...
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        ...
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
```

## ref

<Card day="<a href='https://react.dev/learn/referencing-values-with-refs' target='_blank'>来自官网</a>" 
text="
<b>ref：不会触发render的state，react不会track它</b>
<br><br><i>一个普通对象</i>
<br><br>ref可以读写，它的变化不会使组件re-renders，它的值被react保存。
<br>使用：通过useRef来创建ref
<br><br>什么情况需要用到
<br>1.存储计时器的timeoutId
<br>2.存储DOM元素
<br>3.存储不需要计算的JSX元素。
<br><br><b>ref与state的不同</b>
<br><br>1.useRef返回一个<code>{ current: initialValue }</code>，useState返回<code>[value, setValue]</code>
<br>2.ref的值改变不会触发re-render，state会。
<br>3.xxxRef.current可以直接修改，state只能通过useState修改。
<br>4.render时不能读写xxxRef.current，state可以在任何时候读。
<br>总的来说，就是想存一个值，但是不会影响渲染逻辑的时候，就选ref。
<br><br>怎么用好ref
<br>1.对接外部系统或浏览器API时很有用。
<br>1.渲染时不要读写ref.current，最好放在函数里。
"/>

## 使用ref操作DOM

<Card day="<a href='https://react.dev/learn/manipulating-the-dom-with-refs' target='_blank'>来自官网</a>" 
text="
<b>使用ref操作DOM</b>
<br><br><i>用于聚焦、滚动、测量大小位置等</i>
<br><br>使用
<br>1.用null作为初始值创建一个xxxRef。
<br>2.将xxxRef赋给DOM节点的ref attribute，此时react会将此节点的引用赋给xxxRef.current。
<br>3.然后就可以用了，比如xxxRef.current.focus()。
<br><br>当一个列表的所有元素都需要传入ref时，只创建一个ref，然后使用ref回调，也就是传一个回调函数给ref attribute。这个回调函数会在渲染时调用。要做的是在这个回调函数中将元素给这个ref，作为它的一部分。ref回调的参数是当前元素。
<br><br><b>访问另一个组件的DOM节点</b>
<br><br>注意：函数式组件不能传ref attribute，因为react默认不让一个组件访问另一个组件的DOM元素。解决办法是使用forwardRef。
<br>对ref.current的更改在commit期间，它会先将ref.current置为null，待更新完DOM后，再将ref.current设置为正确的值。
"/>

```jsx
// 错误典范：一开始ref.current是null，是不会有play方法的
function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  if (isPlaying) {
    ref.current.play();  // Calling these while rendering isn't allowed.
  } else {
    ref.current.pause(); // Also, this crashes.
  }

  return <video ref={ref} src={src} loop playsInline />;
}
```

## Effects

<Card day="<a href='https://react.dev/learn/synchronizing-with-effects' target='_blank'>来自官网</a>" 
text="
<b>使用Effects与外部系统保持同步</b>
<br><br><i>Effects一般指render引起的side effect，俗称逃生口，就是与react组件本体联系不大，与组件本体无关的就从这逃生口出入，它运行在commit阶段的末尾，DOM更新之后，这时可以将react组件与网络或第三方库进行同步</i>
<br><br>side effect：副作用（不含贬义），指调用函数时，产生的对函数外的变化。
<br>pure function：纯函数，指一个函数不涉及对外操作，并且返回值与参数一一对应（same input, same output）。它不会引起side effect。如果一个函数返回随机数，那它不是纯函数，但也不会产生side effect。
<br>react要求是组件纯函数，但组件里的事件函数没有这个要求，因为副作用基本都是从事件函数里产生的，而且，事件函数不会在渲染期间运行，不会对react组件的返回值产生影响。
<br><br>这里的同步，应该指的是正常的预期的情况，不要出现异常情况。
<br><br>一般effect运行时，你都可以拿到最新的部分，包括state和DOM。
<br><br>使用
<br>1.引入useEffect，useEffect第一个参数接收一个回调函数。它放在组件顶层。它在组件每次渲染后执行回调函数里的内容。
<br>2.给Effect指定依赖，防止每次渲染都调用effect。给useEffect的第二个参数一个数组，将Effect执行所依赖的state变量作为这个数组的元素。如果这些state没有变化，那么Effect就不执行。元素是ref、prop也行。如果为空数组且useEffect的回调里没有依赖state和prop，那么这个effect在组件页面出现后（mount：页面出现时）只会运行一次，如果有依赖而空数组，那么会报错。没有第二个参数的话那么每次渲染后都会运行。
<br>3.（可选）为了清除连接远程等操作，需要返回一个cleanup函数。cleanup函数会在每次Effect重新运行之前（重新运行，不是第一次运行）以及最终组件unmount的时候。这个操作一般在这些开发情况下使用：弹窗（需关闭弹窗，防止弹两次报错），绑定事件（移除事件监听，防止绑定两次），触发动画（清除动画，防止执行两次动画），fetching data（请求两次，但防止对获得的数据进行两次处理），
<br><br>不要在useEffect的回调函数里mutate state。
<br>如果没有外部系统，最好不要用useEffect。
<br>如果是个使用外部系统的事件，那还是放在事件函数里比较好。
"/>

```jsx
// 示例：这里的外部系统指的是浏览器的media api
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  });

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```

## 不需要使用Effect的情况

<Card day="<a href='https://react.dev/learn/you-might-not-need-an-effect' target='_blank'>来自官网</a>" 
text="
<b>你可能不需要effect</b>
<br><br>1.不要使用Effect来修改state。state发生变化时，react会调用组件函数去计算页面，也就是render，然后commit到DOM，更新页面，然后运行Effect。所以改变任何数据的操作放在组件顶层。
<br><br>2.不要使用Effect处理事件。
<br><br>3.对于复杂的占时间的计算可以使用useMemo来缓存它的值，在其不关联state或prop更新时不会运行，示例如下。（这种一般用于创建上千个对象或者循环千遍才用）
<br><br>4.state随prop变化时清空的情况不要使用Effect，因为会render两次。解决方法是创建一个组件，把这个prop当作key，对应的state也放这个组件里，key改变时，组件会重置。
<br><br>5.state随prop变化时不要使用Effect，可以创建一个新state，初始值为因变量prop，直接用if语句来实现，判断这个新state与prop是否相等，相等则不改变state。不过，任何state都要保持最简单的，比如用state保存数组，不如用state保存数组元素的id。组件里最理想的形式是一路<code>const xxx = yyy</code>下来，if也不用。
<br><br>6.重复的事件逻辑也不要用Effect。因为事件只能有一种触发方式，不需要Effect来间接触发。
<br><br>7.网络请求看触发方式，如果是初始化时(mount)触发，那么使用Effect，如果是事件，那么放在事件函数里。
<br><br>8.最好不要使用Effect链。
<br><br>9.只执行一次的数据建议放在组件外或者限制执行次数。
<br><br>10.将数据传到父组件也不要用。
<br><br>11.订阅外部数据时除了用Effect之外，还可以用useSyncExternalStore钩子。
<br><br>12.不由事件触发的fetch一般用Effect来写，添加好依赖项就行了，即使它可能会渲染两次。比如输入，不过这要写一个cleanup函数，以免输入过快时发生race condition。也可以将请求逻辑写到一个自定义钩子函数里。
"/>

```jsx
// useMemo 缓存visibleTodos，而不运行getFilteredTodos函数，除非todos或filter改变
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  const visibleTodos = useMemo(() => {
    // ✅ Does not re-run unless todos or filter change
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);
  // ...
}
```

