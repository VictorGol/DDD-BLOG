<script setup>
  import Card from '../components/card.vue'
  import Cover from '../components/cover.vue'
</script>

# react

<Card day="0410" text="对于JSX，react会对他建模成UI Tree，然后再渲染成DOM。其中每个react组件的state固定在这个组件所在UI Tree的位置，相同组件（不是同一个）在UI Tree的同一位置的交换不会重置state，不同组件在UI Tree的同一位置交换会重置state。<br><br>不过，也有需要在同一位置相同组件的交换重置state的情况。" />