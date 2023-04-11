<script setup>
  import Card from '../components/card.vue'
  import Cover from '../components/cover.vue'
</script>

# react

<Card day="0410" 
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

<Card day="0410" 
text="
<b>提取所有state为一个reducer函数</b>
<br><br><i>为了应对愈发复杂的代码情况</i>
<br><br>将useState迁移到useReducer分三步：
<br>1.将<font color='#DAA520'>setState</font>类型的函数改成dispatch函数，dispatch接收一个对象类型的参数，叫做action，action里的键值对是之前setState的参数，加上一个type字段，用来表示此次操作是什么操作。
<br>2.写一个reducer函数，放在组件外或者新建一个文件，它接收两个参数，当前state和action，它返回next state。
<br>3.引入useRreducer函数代替useState。
<br><br>注意：
<br>reducer必须是纯函数
"/>