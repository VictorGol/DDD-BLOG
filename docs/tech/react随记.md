<script setup>
  import Card from '../components/card.vue'
  import Cover from '../components/cover.vue'
</script>

# react

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