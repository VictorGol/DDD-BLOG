<script setup>
  import Card from '../components/card.vue'
  import Cover from '../components/cover.vue'
</script>

# react随记

react更新页面分两步：render和commit。
render期间：调用组件，确定屏幕显示什么。
commit期间：将更改应用到DOM。

## react基础

<Card text="
<b>基础</b>
<ul>
<li>组件名必须大写
<li><></>空标签成为fragment，它不会在浏览器中留下痕迹，而仅用来分组。
<li>JSX在底层会被转化成纯JavaScript对象，而函数不能返回两个对象，所以需要一个额外标签进行包装。
<li>JSX里的元素标签必须闭合
<li>html的连字符attribute要换成驼峰式。
<li>class作为react的保留字，在html里需要将其换成classname。
<li>在JSX里写js逻辑或者引用变量时，加上<code>{}</code>。一般用在标签内和标签的attribute赋值的右操作数。
<li>react是单向数据流：只能从父组件传props给子组件。
<li>组件可以使用<code>{...props}</code>的形式充当attibute，它会解构出来对应的attribute。这样比较简洁。
<li>条件渲染一般使用<code>if</code>、<code>&&</code>、<code>? :</code>。
<li>渲染列表时记得加key，key可以来自数据库或者本地，本地的话直接用<code>crypto.randomUUID()</code>，或者使用<a href='https://www.npmjs.com/package/uuid' target='_blank'>uuid库</a>。
<li>组件一般是纯函数，非纯函数可能会产生副作用。副作用一般放在事件函数里，因为组件渲染时不会运行事件函数，所以事件函数可以not need to be pure。
<li>命令式编程(imperative)：注重过程，写出每一步。比如操作DOM。
<li>声明式编程(declarative)：注重结果，过程被封装。react就是这种，只需要改state页面就会改变，根本不需要去操作DOM。
</ul>
"/>

## 事件

<Card text="
<b>事件</b>
<ul>
<li>事件会冒泡：沿着父组件传播。除了onScroll。冒泡：bubble，传播：progation。
<li>防止事件冒泡：<code>e.stopPropagation()</code>
<li>每个事件都会经历三个阶段，这里以onClick事件为例：
  <ol>
    <li>向下传播，调用所有 onClickCapture 处理程序。一般在事件名后加Capture是为了分析子组件的事件，这个不受stopProgation的影响，因为它先被调用。
    <li>它运行被点击元素的 onClick 处理程序。
    <li>向上传播，调用所有 onClick 处理程序。
  </ol>
<li>浏览器有一些事件的默认行为，比如form的submit事件，它会默认重载页面。
<li>防止事件的默认行为：<code>e.preventDefault()</code>
<li>事件适合用来放副作用，副作用比如：改变input的值，改变显示的列表。
<li>state：组件的内存，用来存值
<li>组件每次渲染相当于函数重新执行一遍，useState会返回它所记住的值给你，和值的setter，setter会触发组件重新渲染。
</ul>
"/>

## state

<Card text="
<b>组件的内存，用来存值</b>
<ul>
<li>useState会返回一个值给你，和值的setter，setter会触发组件重新渲染。
<li>组件每次渲染相当于函数重新执行一遍，下一次render时，useState会返回它所记住的值。
<li>钩子函数必须在顶层调用，类似于import。
<li>第一次执行useState时，会创建两个空数组，state和setters。第一次执行组件函数，每执行一次useState，将对应初始值push进state数组，将一个setter函数push进setters数组。后续渲染时，每个state的值都从state数组里顺次读取，每个setter从setters数组里读取。每一个setter都有对其在setters数组里的索引（cursor）的引用，因此当setter被调用时，会根据这个索引改变state数组里相应索引的值。
<li>state像一个快照，组件返回的也可以理解为一个可交互的快照。所有使用state值的程序不管是setTimeout还是连续调用同一个setter还是事件，它获取的都是当时快照的值，也就是用户与页面交互时的state。
<li>state更新是批处理的，它会将每个setter先加入一个待处理队列，等到render的时候再进行处理，处理完后再按照组件里的代码执行。
<li>setter可以接收一个updater function作为参数，updater function的参数是state数组里对应的state，返回值是要更新的值。因为这次setter的参数是一个函数，所以用于计算的state不是组件里的快照state，而是组件维护的state数组里的对应位置的state。updater function同样会被加入队列，等待处理。setState(value)是直接将value替换掉之前的值，将value放入state数组的对应位置，setState(updater)是使用state数组里对应的值来进行计算，返回值再填入state数组的对应位置。
<li>updater function的参数命名约定：使用相应state的首字母，或者全称，或者在全称前加前缀<code>prev</code>并使用驼峰写法。
<li>一个对象类型的state的修改也不能直接修改，也只能通过setter传一个新的对象。
<li>使用immer库就可以直接修改了。<code>npm install immer use-immer</code>
<li>如果一个state是数组，那修改方式也只能用setter，什么push()、pop()方法以及直接修改元素都不行，这些涉及到修改原数组，但可以用不修改原数组的方法，比如：concat()、[...arr]、filter()、slice()、map()等。sort()和reverse()会修改原数组。
<li>构建state的准则：合并关系密切的state，避免多余的state，避免深层嵌套的state，避免state的名称混淆。避免使用prop来当作state的初始值，因为prop改变后，state不会随之改变，state后续只跟setter改变。
<li>组件间共享state的值：状态提升，将state提升到同一个就近父组件，使用prop的方式传值。
</ul>
"/>

## render and commit

<Card text="
<b>组件显示过程的步骤</b>
<ul>
<li>分三步
  <ol>
    <li>trigger a render：初始化render、state更新。
    <li>rendering the component
    <li>committing to the DOM：将计算结果提交给DOM。
  </ol>
<li>初始化render就是main.js里的<code>createRoot(document.getElementById('root')).render(xxx)</code>
<li>所谓render，就是调用组件的过程。初始化的render是调用根组件，创建节点（appendChild()），后续的render是根据每个组件的state更新来的。父组件的render会带动子组件的render。不过一个子组件超多的父组件渲染时，性能可能不是很好。
</ul>
"/>

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

## 响应式Effects的生命周期

<Card day="<a href='https://react.dev/learn/lifecycle-of-reactive-effects' target='_blank'>来自官网</a>" 
text="
<b>Lifecycle of Reactive Effects</b>
<br><br>Effect只做两件事：开始同步和停止同步。cleanup函数就是停止同步。
<br><br>组件的生命周期
<br>mount：组件挂载时
<br>update：组件更新时
<br>unmount：组件卸载时
<br><code>mount --> update --> ... --> update --> unmount.</code>
<br><br>re-synchronize Effect
<br>当组件更新时，Effect会重新同步：停止同步，开始新的同步。<code>render --> commit --> effect start synchronizing --> render --> commit --> effect stop synchronizing --> effect start synchronizing.</code>
<br><br>Effect生命周期（每个Effect有独立的生命周期）
<br><code>start synchronizing --> stop synchronizing.</code>
<br>写Effect时，关注一次Effect的生命周期，怎么开始同步，怎么结束同步，就好。
<br><br>react在开发阶段的mount时会强制再次执行Effect来验证Effect是否可以re-synchronize，也就是验证你的cleanup函数是否可以很好地运行。就像是开门和关门来验证你的门是否正常。
<br><br>react怎么知道它什么时候要去re-sunchronize：每次组件re-render时，检查依赖项变化。
<br><br>每个Effect表示一个独立的同步进程，即使两个Effect依赖相同，如果不止一个，那就分开。
<br><br>一般state和prop是响应式的值，基于它们计算得到的值也是，也就是组件内的所有变量都是，响应式的值变化会更新组件。依赖为空时，也就是不接受响应式的值，这个Effect只会在挂载和卸载时执行同步和断开同步。当然开发阶段会执行再执行一次。
<br><br>Effect会检查使用到的变量是否都在依赖数组里声明了，没有就会报错。
<br><br>依赖项避免使用对象和函数。
"/>

## 从Effect里分离出事件

<Card day="<a href='https://react.dev/learn/separating-events-from-effects' target='_blank'>来自官网</a>" 
text="
<b>Separating Events from Effects</b>
<br><br>Effect和event的区别
<br>特定交互时使用event handler
<br>非交互的同步外部操作使用Effect。
<br>event更像是手动执行，Effect更像是自动执行。
<br><br>对于响应性--reactive value
<br>组件内声明的变量是reactive，包括state、prop、function等。
<br>因为event是被手动触发才执行的，所以它不具有reactive。
<br>而Effect会根据reactive value的改变而改变，所以Effect的逻辑是reactive。
<br>如果点击事件改变了某个值，针对这个新值去做一系列处理呢？是否既可以使用event，也可以使用Effect。
<br><br>对于非响应性逻辑，需要把它提取出Effect，使用useEffectEvent(an experimental API)，useEffectEvent接收一个回调函数，它会返回一个Effect Event函数，Effect Event在Effect内调用，行为像一个event。这样就把非关联的响应性内容提取出去了。<font color='#888'>这种情况一般在Effect内触发事件，且至少有两个reactive value，但是这两个reactive value的Effect行为并不统一，且其中一个reactive value与事件函数有关，所以必须分离，如果事件函数是普通函数，那么需要把函数名写入依赖项，而Effect Event函数不用写进依赖项。</font>
<br><br>Effect Event的限制
<br>只能在Effect里使用
<br>别把它当作参数传给其他组件或者钩子
"/>

## 移除Effect依赖

<Card day="<a href='https://react.dev/learn/removing-effect-dependencies' target='_blank'>来自官网</a>" 
text="
<b>removing Effect dependencies</b>
<br><br>除了剔除不需要的，可以将依赖值放到组件外。
<br>Effect尽量简洁，能不放如Effect的代码就尽量不要放入。
"/>

## 自定义Hooks

<Card day="<a href='https://react.dev/learn/reusing-logic-with-custom-hooks' target='_blank'>来自官网</a>" 
text="
<b>Reusing Logic with Custom Hooks</b>
<br><br>用处
<br>请求数据、连接、判断等等。主要是复用、重视意图而不是逻辑。
<br><br>hook:钩子函数，可以使用react特性的独立函数。组件会钩入这些不同功能的函数。
<br>可以将可重用代码放入自定义钩子
<br>函数名以<code>use</code>开头，之后接大写开头的名称，组件名开头大写。
<br>组件必须返回什么，钩子函数可以返回任意值，不返回也行。
<br>hook将state的逻辑写进来，一般是基于state返回计算后的结果。
<br>hook应该是pure function。将hook视为组件的一部分，这样可以考虑hook里的Effect。
<br>钩子可以传state、function作为参数，不过如果钩子里有Effect，不要把function作为依赖，用useEffectEvent包装一下。
<br><br>什么时候用？
<br>有重复代码时，重复的不多可以不用
<br>有Effect时，最好先写在组件里，再提取到钩子里，这样是为了发现错误。
<br><br>关于钩子的命名
<br>尽量精确描述意图，使用术语
<br>避免涉及lifecycle之类的术语，比如useMount
"/>

# react内置hooks

## useCallback()

<Card text="
<code>const cachedFn = useCallback(fn, dependencies)</code>
<br><br>作用：缓存函数，用来优化性能，一般用于复杂的情形。少用。
<br><br>参数1：任何函数
<br>参数2：参数1所需要的依赖项。如果不传，那和不用useCallback没区别，至少传个[]。
<br><br>原理：初次render时，`useCallback`会返回`fn`。后续渲染时，如果依赖项的值没变，那么还是返回和上一次一样的函数，如果变了，会返回这次渲染过程中你传入的函数。
<br><br>用途1：跳过组件的更新
<ul>
<li>跳过组件的更新：使用memo包裹组件，这样，如果这个组件的props没有一个变化，那它就不会更新。
<li>js每次声明同一个函数时，都创建了不同的函数，react组件内的函数就是这样。如果将函数作为prop传递给一个组件，那么函数每次render都会变化，memo就不起作用。
<li>如果将这个函数用useCallback来缓存的话，那这个函数就只有依赖项变化它才会变化，依赖项不变，函数就不变，组件也就因为memo的关系，不会更新，节省性能。而依赖项变化，那就返回一个新的函数。
</ul>
用途2：当有函数作为Effect的依赖项时
<ul>
<li>将这个函数用useCallback缓存，不然Effect会因为这个函数疯狂调用
<li>如果将这个函数直接在Effect里声明，这样更好，都不用useCallback了，也就不用函数作为Effect的依赖了
</ul>
用途3：如果你正在编写自定义 Hook，建议将其返回的任何函数包装到 useCallback 中
"/>

## useContext()

<Card text="
<code>const value = useContext(SomeContext)</code>
<br><br>作用：传值到深层组件
<br><br>参数：使用CreateContext创建的context。CreateContext接收一个初始值，返回一个context，context用来给子孙组件提供值。
<br><br>返回：一堆值。初始值是CreateContext的参数，后续的值由SomeContext.Provider组件的value attribute提供，SomeContext.Provider存在于子组件和父组件之间。如果返回值改变，那么组件就渲染。
<br><br>注意：一般useContext是用在子组件的，不能用在父组件。
"/>

## useDebugValue()

<Card text="
<code>useDebugValue(value, format?)</code>
<br><br>作用：用于自定义Hook，在React DevTools展示可读的调试值。
<br><br>参数1：你想展示的值。
<br>参数2：以参数1为参数的format函数，返回的值用于替代参数1来显示。
"/>

## useDeferredValue()

<Card text="
<code>const deferredValue = useDeferredValue(value)</code>
<br><br>作用：延迟更新一部分UI。要求你使用suspense。
<br><br>参数：你想延迟的值，比如state。
<br><br>返回：初始化渲染时，返回与参数相同的值。后续渲染时，先使用旧值渲染，再使用新值再来一遍渲染，只不过这次渲染可被打断，被打断后也就不能触发Effect，直到这次渲染commit完成。
<br><br>用途1：打字过快时
"/>

## useEffect()

<Card text="
<code>useEffect(setup, dependencies?)</code>
<br><br>作用：与外部系统同步。详情见上方的关于Effect的内容。
"/>

## useId()

<Card text="
<code>const id = useId()</code>
<br><br>作用：生成唯一id。
<br><br>参数：没有
<br><br>返回：一个字符串。
<br><br>用途1：赋值给元素的可访问性attributes。
<br><br>注意：useId不能用来当作列表的key。
"/>

## useImperativeHandle()

<Card text="
<code>useImperativeHandle(ref, createHandle, dependencies?)</code>
<br><br>作用：
<br><br>参数1：从forwardRef render function传回来的第二个参数ref。
<br>参数2：一个不带参数的函数，返回一个ref handle。
<br>参数3：依赖项。
<br><br>返回：undefined。
<br><br>描述：<a target='_blank' href='https://react.dev/reference/react/useImperativeHandle'>参考</a>。一般情况下，子组件不会通过ref暴露它的DOM节点，除非使用forwardRef包裹子组件，这样在子组件的第二个参数就能接收到ref，再把ref赋给html元素的ref。这样父组件就能获取到节点。但是用了useImperativeHandle后，它的第二个参数就会返回一个自定义的ref给父组件，比如只返回节点的某个方法，比如input的focus方法，返回值一般是对象形式。除此之外，也可以获取你自定义的方法。
"/>

## useLayoutEffect()

<Card text="
<code>useLayoutEffect(setup, dependencies?)</code>
<br><br>作用：在浏览器绘制屏幕之前调用，可能会影响性能。尽量用useEffec()。
<br><br>参数：同useEffect()。
<br><br>返回：undefined。
<br><br>用途1：测量布局的大小，比如元素的宽高。这样就能获取元素最新的大小。
"/>

## useMemo()

<Card text="
<code>const cachedValue = useMemo(calculateValue, dependencies)</code>
<br><br>作用：缓存值。
<br><br>参数1：用于计算的函数，返回计算后的值。
<br>参数2：依赖项。变化时，参数1重新执行。
<br><br>返回：缓存的值。
<br><br>用途1：计算量太大。
<br>用途2：结合memo，跳过组件重渲染。
<br>用途3：对于依赖prop的字面量赋值，也可以用。
<br>用途4：缓存函数，函数作为prop传给子组件时，结合子组件的memo，可以防止子组件重渲染，和useCallback类似，不过useMemo是返回参数1的返回值，而useCallback是直接返回参数1。
"/>

## useReducer()

<Card text="
<code>const [state, dispatch] = useReducer(reducer, initialArg, init?)</code>
<br><br>作用：组合state的逻辑。
<br><br>参数1：reducer函数，用来组合所有state被修改时的逻辑。
<br>参数2：state初始值。
<br>参数3：处理参数2后返回初始值。
<br><br>返回值1：当前state。
<br>返回值2：dispatch函数，用来调用reducer函数，处理对应的state。
<br><br>用途：详情见上面的reducer部分。
"/>

## useRef()

<Card text="
<code>const ref = useRef(initialValue)</code>
<br><br>作用：保存值，值得改变不会触发渲染。
<br><br>参数1：初始值。
<br><br>返回值1：一个有current属性得对象，初始值就存在current里。
<br><br>用途1：存DOM节点。
"/>

## useState()

<Card text="
<code>const [state, setState] = useState(initialState);</code>
<br><br>作用：就不多解释了。
"/>

## useSyncExternalStore()

<Card text="
<code>const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)</code>
<br><br>作用：订阅外部数据。当外部数据变化时，会重渲染组件。
<br><br>参数1：一个订阅函数，返回一个取消订阅函数。作用是返回快照前的前提步骤。每当store更改时调用参数1。
<br>参数2：一个返回快照的函数。
<br>参数3：返回服务器渲染期间使用的快照的函数。
<br><br>返回值：从参数2那里获得得快照。
<br><br>用途：获取第三方状态管理库的数据。
"/>

## useTransition()

<Card text="
<code>const [isPending, startTransition] = useTransition()</code>
<br><br>不甚明白，后续了解
<br><br>返回值1：告诉你是否有待过渡的地方。
<br>返回值2：让你标记一个state，使这个state的更新过渡。startTransition接收一个回调函数，这个回调函数里可以调用一些setter。
"/>

## react内置组件

**Fragment**

同`<></>`，不过如果要在它上加key，那就用`<Fragment></Fragment>`

**Profiler**

包裹住组件用于测试这些组件的渲染性能，`<Profiler>`有一个onRender的attribute，它接收一个回调函数。详情就不看了。

**StrictMode**

方便在开发阶段发现bug。

**Suspense**

```jsx
// SomeComponent没加载完时，使用<Loading />
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```

```jsx
<Suspense fallback={<BigSpinner />}>
  <Biography artistId={artist.id} />
  <Suspense fallback={<AlbumsGlimmer />}>
    <Panel>
      <Albums artistId={artist.id} />
    </Panel>
  </Suspense>
</Suspense>
```

## react内置api

createContext：创建context。

forwardRef：使组件能暴露DOM。

lazy：延迟加载组件

```jsx
import { lazy } from 'react';

const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

<Suspense fallback={<Loading />}>
  <h2>Preview</h2>
  <MarkdownPreview />
</Suspense>
```

memo：跳过组件的重渲染，除非prop变化。

startTransition：平滑更新state。

```jsx
import { startTransition } from 'react';

function TabContainer() {
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
```

## react-dom组件

所有的html元素可以包含react的属性。

react提供的属性有：children、dangerouslySetInnerHTML、ref、suppressContentEditableWarning、suppressHydrationWarning、style。

react修改的属性有：accessKey、aria-*、autoCapitalize、className、contentEditable、data-*、dir、draggable、enterKeyHint、htmlFor、hidden、id、is、inputMode、itemProp、