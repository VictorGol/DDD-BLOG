## 1 安装go

去官网或中文网下载即可

## 2 配置环境变量

我在系统变量里配置

增加变量`GOPATH(D:\Environment\GoWorks)`和`GOROOT(D:\Environment\Go)`，如果用户变量里自带的也有`GOPATH`和`GOROOT`，将值改成和自己设置的一样的。

建一个`GoWorks`文件夹，作为工作区，里面建三个文件夹，`bin、pkg、src`，所有项目放在`src`文件夹下。

## 3 `vscode`配置`go`

首先安装插件`Go Nightly`，然后打开命令行运行这两句

```shell
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

然后`Ctrl+Shift+P`，输入go，选择选中`Go:Install/Update Tools`后，就会弹出一个列表如下图，然后全部勾选，再点击确定就可以开始安装go开发工具包了。

## 4 创建项目

在`src`下创建`hello`项目，hello目录下执行

```go
go mod init // 初始化项目，创建go.mod，跟踪代码的依赖项
go install hello // 将项目安装到bin目录
go mod tidy // 将引入的外部模块添加到go.sum，并下载外部模块（包）到pkg文件夹
```

创建一个文件，里面写上基础的

```go
package main

import "fmt"

func main() {
	fmt.Println("hello world")
}
```

即可

## 5 类型

常见的有：`bool`、`string`、数字类型

```js
数字类型
int uint float32 float64 complex64 complex128 byte(unit8) rune(int32)
complex64：实部和虚部都是float32类型的的复数。
complex128：实部和虚部都是float64类型的的复数
```

创建复数，如下：

```go
c := complex(r, i type)    // r实部，i虚部
或
c := 6 + 7i
```

### 注意

```go
不允许不同类型的值运算和赋值，除非转换类型

把 v 转换为 T 类型的语法是 T(v)
```

## 6 变量、常量

```go
var name type = xxx
const name type = xxx
```

```go
常量的值会在编译的时候确定。因为函数调用发生在运行时，所以不能将函数的返回值赋值给常量。

字符串字面量的类型是untyped string
数字字面量的类型是untyped int或者untyped float64等等
布尔字面量的类型是untyped bool
不同类型不能进行运算，但是所有数字字面量之间可以进行运算。

不允许混合类型，type myString string和string是不同类型
```



## 7 函数

声明

```go
func functionname(parametername type) returntype {}
func functionname() {}
```
示例1：单个返回值
```go
func test(a int, b int) int { return a * b }
func test1(a, b int) int { return a * b }
```

示例2：多返回值及函数调用

```go
func test(a, b float64) (float64, float64) {  
    var c = a * b
    var d = (a + b) * 2
    return c, d
}

func main() {  
    c, d := test(10.8, 5.6)
}
```

示例3：命名返回值

```go
func test(a, b float64) (c, d float64) {  
    c = a * b
    d = (a + b) * 2
    return // 不需要明确指定返回值，默认返回 area, perimeter 的值
}
```

示例4：空白符（匿名变量）

```go
func test(a, b float64) (float64, float64) {  
    var c = a * b
    var d = (a + b) * 2
    return a, b
}

func main() {  
    c, _ := test(10.8, 5.6) // 第二个返回值被丢弃
}
```

## 8 包

```go
main包
main函数是项目的入口，main函数只能放在main包
```

```go
package xxx这一行指定该文件属于xxx包。

在 Go 中，任何以大写字母开头的变量或者函数都是被导出的名字。其它包只能访问被导出的函数和变量。
```

```go
所有包都可以包含一个 `init` 函数。

包的初始化顺序如下：

1. 首先初始化被导入的包
2. 然后初始化包级别的变量，就是一个go文件的全局变量
3. 紧接着调用 init 函数。包可以有多个 init 函数（在一个文件或分布于多个文件中），它们按照编译器解析它们的顺序进行调用。
4. 如果是main包，则最后调用main函数

如果一个包导入了另一个包，会先初始化被导入的包。
尽管一个包可能会被导入多次，但是它只会被初始化一次。
```

在程序开发的活跃阶段，又常常会先导入包，而暂不使用它。遇到这种情况就可以使用空白标识符 `_`。

```go
package main

import (  
    "geometry/rectangle" 
)

var _ = rectangle.Area // 错误屏蔽器

func main() {}
```

有时候我们导入一个包，只是为了确保它进行了初始化，而无需使用包中的任何函数或变量。这种情况也可以使用空白标识符：

```go
package main 

import (
    _ "geometry/rectangle" 
)
func main() {}
```

创建包

```go
包名与文件夹名相同
文件夹内的所有go文件都属于这个包，它们的开头都是package samePackageName
在其他地方调用时先引入，import "package/xxx"，xxx是具体的go文件名，再使用xxx.funcName调用
```

## 9 if

示例1

```go
func main() {  
    num := 10
    if num % 2 == 0 {
        fmt.Println("even") 
    }  else {
        fmt.Println("odd")
    }
}

func main() {  
    if num := 10; num % 2 == 0 { // num的作用域局限在if else语句内
        fmt.Println(num,"is even") 
    }  else {
        fmt.Println(num,"is odd")
    }
}
```

`else` 语句应该在 `if` 语句的大括号 `}` 之后的同一行中。如果不是，编译器会不通过。

在 Go 语言规则中，它指定在 `}` 之后插入一个分号，如果这是该行的最终标记。

## 10 for

语法

```go
for initialisation; condition; post {}
执行顺序：仅执行一次的初始化语句，判断条件是否true，循环迭代一次后执行一次post，再判断条件...
```

示例1：正常循环

```go
for i := 1; i <= 10; i++ { // i只局限在循环体内
    fmt.Printf(" %d",i)
}
```

```go
break：终止for循环
continue：跳过当前迭代，直接开始下一次循环
```

示例2：省略初始化语句和post语句

```go
func main() {  
    i := 0
    for ;i <= 10; {
        fmt.Printf("%d ", i)
        i += 2
    }
}

func main() {  
    i := 0
    for i <= 10 {
        fmt.Printf("%d ", i)
        i += 2
    }
}
```

示例3：声明多个变量

```go
func main() {  
    for no, i := 10, 1; i <= 10 && no <= 19; i, no = i+1, no+1 {
        fmt.Printf("%d * %d = %d\n", no, i, no*i)
    }
}
```

示例4：无限循环

```go
func main() {  
    for {
        fmt.Println("Hello World")
    }
}
```

## 11 switch

示例1

```go
func main() {
    finger := 4
    switch finger {
    case 1:
        fmt.Println("Thumb")
    case 2:
        fmt.Println("Index")
    case 3:
        fmt.Println("Middle")
    case 4:
        fmt.Println("Ring")
    case 5:
        fmt.Println("Pinky")
    }
}

func main() {
    switch finger := 8; finger { // finger局限在switch语句内
    case 1:
        fmt.Println("Thumb")
    case 2:
        fmt.Println("Index")
    case 3:
        fmt.Println("Middle")
    case 4:
        fmt.Println("Ring")
    case 5:
        fmt.Println("Pinky")
    default: // 默认情况
        fmt.Println("incorrect finger number")
    }
}
```

示例2：多表达式判断

```go
func main() {
    letter := "i"
    switch letter {
    case "a", "e", "i", "o", "u": // 一个选项多个表达式
        fmt.Println("vowel")
    default:
        fmt.Println("not a vowel")
    }
}
```

示例3：无表达式

```go
func main() {
    num := 75
    switch { // 表达式被省略了
    case num >= 0 && num <= 50:
        fmt.Println("num is greater than 0 and less than 50")
    case num >= 51 && num <= 100:
        fmt.Println("num is greater than 51 and less than 100")
    case num >= 101:
        fmt.Println("num is greater than 100")
    }
}
```

示例4：`Fallthrough`语句

```go
// 使用 fallthrough 语句可以在已经执行完成的 case 之后，把控制权转移到下一个 case 的执行代码中。强制执行下一句
func main() {
    switch num := function(); { // num is not a constant
    case num < 50:
        fmt.Printf("%d is lesser than 50\n", num)
        fallthrough
    case num < 100:
        fmt.Printf("%d is lesser than 100\n", num)
        fallthrough
    case num < 200:
        fmt.Printf("%d is lesser than 200", num)
    }
}
```

## 12 数组和切片

基础

```go
声明1：var a [3]int // [0 0 0]
赋值：a[0] = 12 // [12 0 0]
声明2：a := [3]int{12, 78, 50} // [12 78 50]
声明3：a := [3]int{12} // [12 0 0]
声明4：a := [...]int{12, 78, 50} // 自动计算长度
```

```go
数组的大小是类型的一部分。因此 [5]int 和 [25]int 是不同类型。数组不能调整大小。

数组是值类型，这意味着当数组赋值给一个新的变量或者作为参数时，原始数组会生成一个副本。
```

```go
数组长度: len(arr)
```

遍历数组

```go
a := [...]float64{67.7, 89.8, 21, 78}
for i, v := range a {} // i是索引，v是对应值

// 这样也行
for _, v := range a {}
```

多维数组

```go
// 声明
a := [3][2]string{
    {"lion", "tiger"},
    {"cat", "dog"},
    {"pigeon", "peacock"},
}

// 遍历
func printarray(a [3][2]string) {
    for _, v1 := range a {
        for _, v2 := range v1 {}
    }
}

// 赋值
var b [3][2]string
b[0][0] = "apple"
b[0][1] = "samsung"
b[1][0] = "microsoft"
b[1][1] = "google"
b[2][0] = "AT&T"
b[2][1] = "T-Mobile"
```

### 切片

引用类型，表示：`[]T`，意为，T类型的切片

```go
声明1：a := [5]int{76, 77, 78, 79, 80}
	  var b []int = a[1:4] // a[1] to a[3]，此处的b为[77 78 79]
var c []int = a[:] // 同a[0:5]，同a
// a[:2] a[2:] 这两种写法都行
声明2：c := []int{6, 7, 8}
声明3：i := make([]int, 5, 5) // [0 0 0 0 0]，参数1：切片类型；参数2：切片长度；参数3：切片容量（可选，不选时等于参数2）
组成1：指向数组的指针
组成2：长度：len(slice)
组成3：容量：cap(slice)，切片的最大长度，超出后会扩大
零值：nil，它的len和cap为0
```

```
切片是对数组引用。
从切片生成切片时，新切片会指向旧切片指向的数组，所以改变新切片，旧切片也会变化。例子如下：
d := []byte{'r', 'o', 'a', 'd'}
e := d[2:]
// e == []byte{'a', 'd'}
e[1] = 'm'
// e == []byte{'a', 'm'}
// d == []byte{'r', 'o', 'a', 'm'}
```

**追加切片元素**

```go
func AppendByte(slice []byte, data ...byte) []byte {
    m := len(slice)
    n := m + len(data)
    if n > cap(slice) { // 扩容
        // 为未来的增长分配两倍的需求。
        newSlice := make([]byte, (n+1)*2)
        copy(newSlice, slice) // 默认复制到newSlice从索引0开始
        slice = newSlice
    }
    slice = slice[0:n]
    copy(slice[m:n], data)
    return slice
}
```

```go
cars := []string{"Ferrari", "Honda", "Ford"} // cars切片的长度是3，容量是3
cars = append(cars, "Toyota") // cars不再引用旧数组，而是旧数组的副本和新增元素组成的新数组，新数组的长度超过旧切片容量时，新切片的容量会扩大。这里cars切片的长度是4，容量是6
```

```go
var names []string // == nil
if names == nil {
    names = append(names, "John", "Sebastian", "Vinay")
    fmt.Println(names) // [John Sebastian Vinay] len 3 cap 3
}
```

**追加切片元素**：`...`运算符

```go
veggies := []string{"potatoes", "tomatoes", "brinjal"}
fruits := []string{"oranges", "apples"}
food := append(veggies, fruits...) // [potatoes tomatoes brinjal oranges apples]
```

切片的函数传递：切片传递后在函数内的改变会影响函数外的切片。

多维切片

```go
func main() {  
     pls := [][]string {
            {"C", "C++"},
            {"JavaScript"},
            {"Go", "Rust"},
            }
    for _, v1 := range pls {
        for _, v2 := range v1 {
            fmt.Printf("%s ", v2)
        }
        fmt.Printf("\n")
    }
}
```

内存优化

```go
// 使用 copy 函数 func copy(dst，src[]T)int 来生成一个切片的副本。这样我们可以使用新的切片，原始数组可以被垃圾回收。
func countries() []string {
    countries := []string{"USA", "Singapore", "Germany", "India", "Australia"}
    neededCountries := countries[:len(countries)-2]
    countriesCpy := make([]string, len(neededCountries))
    copy(countriesCpy, neededCountries)
    return countriesCpy
}
```



## 13 可变参数函数

如果函数最后一个参数被记作 `...T` ，这时函数可以接受任意个 `T` 类型参数作为最后一个参数。

```go
func find(num int, nums ...int) {
}
func main() {
    find(89, 89, 90, 95) // 新建int类型切片int []int{89, 90, 95}，再传入find函数
    find(45, 56, 67, 45, 90, 109)
    find(78, 38, 56, 98)
    find(87)
}
```

给可变参数函数传入切片，那不行，因为编译器试图在切片基础上再创建一个切片`[]int{nums}`

```go
nums := []int{89, 90, 95}
find(89, nums) // 不行
find(89, nums...) // 可行，将nums切片直接传入，再find函数里的修改会影响到nums切片本身
```



## 14 Maps

键值对集合，是引用类型

语法：`make(map[type of key]type of value)`

示例：`personSalary := make(map[string]int)`

map 的零值是 `nil`。

```go
var personSalary map[string]int
if personSalary == nil {
    personSalary = make(map[string]int)
}
```

初始化map

```go
personSalary := map[string]int {
    "steve": 12000,
    "jamie": 15000,
}
```

添加元素

```go
personSalary := make(map[string]int)
personSalary["steve"] = 12000
personSalary["jamie"] = 15000
personSalary["mike"] = 9000
// map[jamie:15000 mike:9000 steve:12000]
```

获取元素

```go
personSalary["mike"]
// 如果获取的元素不存在，则返回0值，就是值类型的默认值
```

判断键是否存在

```go
value, ok := map[key]
// 存在时，ok为true，value为对应值；不存在时，ok为false，value为0值
```

遍历：`for range`

```go
for key, value := range personSalary {
    // 当使用 for range 遍历 map 时，不保证每次执行程序获取的元素顺序相同。
}
```

删除元素：`delete(map, key)` //无返回值，如果key不存在，那么啥也不做

获取长度：`len(map)`

```go
map 之间不能使用 == 操作符判断，== 只能用来检查 map 是否为 nil。
判断两个 map 是否相等的方法是遍历比较两个 map 中的每个元素。
```

## 15 test

测试文件以`_test.go`结尾，它告诉`go test`命令这里面有测试函数。

测试函数以`Test`开头

## 16 字符串

字符串是**字节切片**

获取长度，一般不用`len(string)`

```go
utf8.RuneCountInString(string) // 比如Señor长度是5
```

遍历字符串，有时一个字符可能会占用两个字节，用`rune`可以解决，而`for range`本身就是使用`rune`

```go
func printCharsAndBytes(s string) {
    for index, rune := range s {
        fmt.Printf("%c starts at byte %d\n", rune, index)
    }
} // 这里的index是字节位置，不一定连续
```

用字节切片构造字符串

```go
byteSlice := []byte{0x43, 0x61, 0x66, 0xC3, 0xA9} // 16进制
str := string(byteSlice) // Café
byteSlice := []byte{67, 97, 102, 195, 169}// 10进制
str := string(byteSlice) // Café
```

用 rune 切片构造字符串

```go
runeSlice := []rune{0x0053, 0x0065, 0x00f1, 0x006f, 0x0072}
str := string(runeSlice) // Señor
```

字符串创建后字符串内部不可变，可以转成rune切片再改变

```go
func mutate(s []rune) string {  
    s[0] = 'a' 
    return string(s)
}
func main() {  
    h := "hello"
    fmt.Println(mutate([]rune(h))) // aello
}
```

## 17 指针

指针是一种存储变量内存地址（Memory Address）的变量。

```go
如果变量 b 的值为 156，而 b 的内存地址为 0x1040a124。变量 a 存储了 b 的地址。我们就称 a 指向了 b。
```

声明：指针变量的类型为 `*T`，该指针指向一个 **T** 类型的变量。

```go
b := 255
var a *int = &b
```

指针的零值是 `nil`。

指针的解引用：获取指针所指向的变量的值

```go
b := 255
a := &b
fmt.Println(*a) // 255
```

传递指针参数

```go
func change(val *int) {  
    *val = 55
}
```

示例：修改数组内的元素
```go
func modify(arr *[3]int) {  
    (*arr)[0] = 90
}

func main() {  
    a := [3]int{89, 90, 91}
    modify(&a)
    fmt.Println(a)
}
```

**`a[x]` 是 `(\*a)[x]` 的简写形式，因此上面代码中的 `(\*arr)[0]` 可以替换为 `arr[0]`**。

```go
func modify(arr *[3]int) {  
    arr[0] = 90
}

func main() {  
    a := [3]int{89, 90, 91}
    modify(&a)
    fmt.Println(a)
}
```

用切片来重写之前的代码，用这个好点

```go
func modify(sls []int) {  
    sls[0] = 90
}

func main() {  
    a := [3]int{89, 90, 91}
    modify(a[:])
    fmt.Println(a)
}
```

不能直接将数组作为参数，因为数组是值类型

`go`不支持指针运算，比如`&a++`

## 18 结构体

自定义类型。值类型。

创建命名结构体：创建新类型Employee

```go
type Employee struct {
    firstName string
    lastName  string
    age       int
}
// 相同类型的字段写在同一行
type Employee struct {
    firstName, lastName string
    age, salary         int
}
```

创建匿名结构体：一个新的结构体变量employee

```go
var employee struct {
    firstName, lastName string
    age int
}
```

示例1：命名结构体

```go
type Employee struct {  
    firstName, lastName string
    age, salary         int
}

func main() {
    emp1 := Employee{
        firstName: "Sam",
        age:       25,
        salary:    500,
        lastName:  "Anderson",
    }
    emp2 := Employee{"Thomas", "Paul", 29, 800} // 这种情况，需保证字段名的顺序与声明结构体时的顺序相同。

    fmt.Println(emp1) // {Sam Anderson 25 500}
    fmt.Println(emp2) // {Thomas Paul 29 800}
}
```

示例2：匿名结构体

```go
func main() {
    emp3 := struct {
        firstName, lastName string
        age, salary         int
    }{
        firstName: "Andreah",
        lastName:  "Nikola",
        age:       31,
        salary:    5000,
    }

    fmt.Println(emp3) // {Andreah Nikola 31 5000}
}
```

结构体的零值是一个map，里面是对应类型的零值。

示例3：只初始化一部分

```go
type Employee struct {  
    firstName, lastName string
    age, salary         int
}

func main() {  
    emp5 := Employee{
        firstName: "John",
        lastName:  "Paul",
    }
    fmt.Println(emp5) // {John,Paul,0,0}
}
```

访问结构体的字段

```go
type Employee struct {
    firstName, lastName string
    age, salary         int
}

func main() {
    emp6 := Employee{"Sam", "Anderson", 55, 6000}
    fmt.Println("First Name:", emp6.firstName)
    fmt.Println("Last Name:", emp6.lastName)
    fmt.Println("Age:", emp6.age)
    fmt.Printf("Salary: $%d", emp6.salary)
}
```

赋值

```go
type Employee struct {  
    firstName, lastName string
    age, salary         int
}

func main() {  
    var emp7 Employee
    emp7.firstName = "Jack"
    emp7.lastName = "Adams"
    fmt.Println("Employee 7:", emp7) // {Jack Adams 0 0}
}
```

结构体的指针

```go
type Employee struct {  
    firstName, lastName string
    age, salary         int
}

func main() {  
    emp8 := &Employee{"Sam", "Anderson", 55, 6000}
    fmt.Println((*emp8).firstName) // Sam
    fmt.Println((*emp8).age) // 55
}
// Go 语言允许我们在访问 firstName 字段时，可以使用 emp8.firstName 来代替显式的解引用 (*emp8).firstName。
```

匿名字段：结构体没有字段名，只有类型

```go
type Person struct {  
    string
    int
}

func main() {  
    p := Person{"Naveen", 50}
    fmt.Println(p) // {Naveen 50}
}
```

虽然匿名字段没有名称，但其实匿名字段的名称就默认为它的类型。

```go
type Person struct {  
    string
    int
}

func main() {  
    var p1 Person
    p1.string = "naveen"
    p1.int = 50
    fmt.Println(p1) // {naveen 50}
}
```

嵌套结构体：结构体的字段类型有可能也是一个结构体。

```go
type Address struct {  
    city, state string
}
type Person struct {  
    name string
    age int
    address Address
}

func main() {  
    var p Person
    p.name = "Naveen"
    p.age = 50
    p.address = Address {
        city: "Chicago",
        state: "Illinois",
    }
}
```

提升字段(n)：一个结构体的匿名字段中的字段称为提升字段。

```go
type Address struct {
    city, state string
}
type Person struct {
    name string
    age  int
    Address
}

func main() {  
    var p Person
    p.name = "Naveen"
    p.age = 50
    p.Address = Address{
        city:  "Chicago",
        state: "Illinois",
    }
    fmt.Println("Name:", p.name)
    fmt.Println("Age:", p.age)
    fmt.Println("City:", p.city) //city is promoted field
    fmt.Println("State:", p.state) //state is promoted field
}
```

导出结构体和字段：如果结构体名称以大写字母开头，则它是其他包可以访问的导出类型（Exported Type）。同样，如果结构体里的字段首字母大写，它也能被其他包访问到。

```go
package computer

type Spec struct { //exported struct  
    Maker string //exported field
    model string //unexported field
    Price int //exported field
}
```

```go
package main

import "structs/computer"  
import "fmt"

func main() {  
    var spec computer.Spec
    spec.Maker = "apple"
    spec.Price = 50000
    fmt.Println("Spec:", spec)
}
```

结构体相等性

如果两个结构体变量的对应字段相等，则这两个变量也是相等的。如果字段类型是集合等不可比较的类型，那就不能比较了。

```go
type name struct {  
    firstName string
    lastName string
}


func main() {  
    name1 := name{"Steve", "Jobs"}
    name2 := name{"Steve", "Jobs"}
    if name1 == name2 { // 因为结构体是值类型，所以可以用==来比较
        fmt.Println("name1 and name2 are equal") // √
    } else {
        fmt.Println("name1 and name2 are not equal")
    }

    name3 := name{firstName:"Steve", lastName:"Jobs"}
    name4 := name{}
    name4.firstName = "Steve"
    if name3 == name4 {
        fmt.Println("name3 and name4 are equal")
    } else {
        fmt.Println("name3 and name4 are not equal") // √
    }
}
```

## 19 方法

和函数差不多：多出的部分叫做接收器，接收器可以在方法内部访问。方法定义在类型上

```go
func (t Type) methodName(parameter list) {
}
```

```go
type Employee struct {
    name     string
    salary   int
    currency string
}

/*
  在 Employee 结构体类型上创建了一个 displaySalary 方法
*/
func (e Employee) displaySalary() {
    fmt.Printf("Salary of %s is %s%d", e.name, e.currency, e.salary)
}

func main() {
    emp1 := Employee {
        name:     "Sam Adolf",
        salary:   5000,
        currency: "$",
    }
    emp1.displaySalary() // 调用 Employee 类型的 displaySalary() 方法
}
```

为什么我们已经有函数了还需要方法呢？

- go不是纯粹的面向对象变成语言，且go不支持类，因此，基于类型的方法是一种实现和类相似行为的途径。
- 相同的名字的方法可以定义在不同的类型上，而相同名字的函数是不被允许的。假设我们有一个 `Square` 和 `Circle` 结构体。可以在 `Square` 和 `Circle` 上分别定义一个 `Area` 方法。

```go
type Rectangle struct {
    length int
    width  int
}

type Circle struct {
    radius float64
}

func (r Rectangle) Area() int {
    return r.length * r.width
}

func (c Circle) Area() float64 {
    return math.Pi * c.radius * c.radius
}

func main() {
    r := Rectangle{
        length: 10,
        width:  5,
    }
    fmt.Printf("Area of rectangle %d\n", r.Area())
    c := Circle{
        radius: 12,
    }
    fmt.Printf("Area of circle %f", c.Area())
}
```

**指针接收器和值接收器**

值接收器和指针接收器之间的区别在于，在指针接收器的方法内部的改变对于调用者是可见的，然而值接收器的情况不是这样的。

```go
type Employee struct {
    name string
    age  int
}

/*
使用值接收器的方法。
*/
func (e Employee) changeName(newName string) {
    e.name = newName
}

/*
使用指针接收器的方法。
*/
func (e *Employee) changeAge(newAge int) {
    e.age = newAge
}

func main() {
    e := Employee{
        name: "Mark Andrew",
        age:  50,
    }
    fmt.Printf(e.name) // Mark Andrew
    e.changeName("Michael Andrew")
    fmt.Printf(e.name) // Mark Andrew
    fmt.Printf(e.age) // 50
    (&e).changeAge(51)
    fmt.Printf(e.age) // 51
}
// 可以使用 e.changeAge(51) 来代替 (&e).changeAge(51)
```

```go
一般来说，指针接收器可以使用在：对方法内部的接收器所做的改变应该对调用者可见时。

指针接收器也可以被使用在如下场景：当拷贝一个结构体的代价过于昂贵时。考虑下一个结构体有很多的字段。在方法内使用这个结构体做为值接收器需要拷贝整个结构体，这是很昂贵的。在这种情况下使用指针接收器，结构体不会被拷贝，只会传递一个指针到方法内部使用。

在其他的所有情况，值接收器都可以被使用。
```

匿名字段的方法

属于结构体的匿名字段的方法可以被直接调用

```go
type address struct {
    city  string
    state string
}

func (a address) fullAddress() {
    fmt.Printf("Full address: %s, %s", a.city, a.state)
}

type person struct {
    firstName string
    lastName  string
    address
}

func main() {
    p := person{
        firstName: "Elon",
        lastName:  "Musk",
        address: address {
            city:  "Los Angeles",
            state: "California",
        },
    }

    p.fullAddress() //访问 address 结构体的 fullAddress 方法
}
```

当一个方法有一个值接收器，它可以接收值接收器和指针接收器。

```go
type rectangle struct {
    length int
    width  int
}

func area(r rectangle) {
    fmt.Printf("Area Function result: %d\n", (r.length * r.width))
}

func (r rectangle) area() {
    fmt.Printf("Area Method result: %d\n", (r.length * r.width))
}

func main() {
    r := rectangle{
        length: 10,
        width:  5,
    }
    area(r)
    r.area()

    p := &r
    /*
       compilation error, cannot use p (type *rectangle) as type rectangle
       in argument to area
    */
    //area(p)

    p.area()//通过指针调用值接收器，同(*p).area()
}
```

当一个方法有一个指针接收器，它可以接受值接收器和指针接收器。

```go
type rectangle struct {
    length int
    width  int
}

func perimeter(r *rectangle) {
    fmt.Println("perimeter function output:", 2*(r.length+r.width))

}

func (r *rectangle) perimeter() {
    fmt.Println("perimeter method output:", 2*(r.length+r.width))
}

func main() {
    r := rectangle{
        length: 10,
        width:  5,
    }
    p := &r //pointer to r
    perimeter(p)
    p.perimeter()

    /*
        cannot use r (type rectangle) as type *rectangle in argument to perimeter
    */
    //perimeter(r)

    r.perimeter()//使用值来调用指针接收器，同(&r).perimeter()
}
```

在非结构体上的方法

如果要定义的方法和类型不在一个包，那么建议创建一个类型别名，为这个类型别名定义方法

```go
type myInt int

func (a myInt) add(b myInt) myInt {
    return a + b
}

func main() {
    num1 := myInt(5)
    num2 := myInt(10)
    sum := num1.add(num2)
    fmt.Println(sum) // 15
}
```

总结：方法定义在类型上，这个类型的变量可以直接调用这个方法，然后将自身作为接收器传给方法。接收器有值接收器和指针接收器，统一使用值接收器的语法即可。

## 20 接口

接口是啥

```go
在面向对象的领域里，接口一般这样定义：接口定义一个对象的行为。接口只指定了对象应该做什么，至于如何实现这个行为（即实现细节），则由对象本身去确定。
```

```go
在 Go 语言中，接口就是方法签名（Method Signature）的集合。当一个类型定义了接口中的所有方法，我们称它实现了该接口。这与面向对象编程（OOP）的说法很类似。接口指定了一个类型应该具有的方法，并由该类型决定如何实现这些方法。
```

```go
例如，WashingMachine 是一个含有 Cleaning() 和 Drying() 两个方法的接口。任何定义了 Cleaning() 和 Drying() 的类型，都称它实现了 WashingMachine 接口。
```

接口的声明与实现

```go
//interface definition
type VowelsFinder interface {  
    FindVowels() []rune
}

type MyString string

//MyString implements VowelsFinder
func (ms MyString) FindVowels() []rune {  
    var vowels []rune
    for _, rune := range ms {
        if rune == 'a' || rune == 'e' || rune == 'i' || rune == 'o' || rune == 'u' {
            vowels = append(vowels, rune)
        }
    }
    return vowels
}

func main() {  
    name := MyString("Sam Anderson")
    var v VowelsFinder
    v = name // v的类型变成了MyString
    fmt.Printf("Vowels are %c", v.FindVowels())
}
```

在上面的程序里，如果我们使用 `name.FindVowels()`，而不是 `v.FindVowels()`，程序依然能够照常运行

接口的实际应用场景。

```go
type SalaryCalculator interface {  
    CalculateSalary() int
}

type Permanent struct {  
    empId    int
    basicpay int
    pf       int
}

type Contract struct {  
    empId  int
    basicpay int
}

//salary of permanent employee is sum of basic pay and pf
func (p Permanent) CalculateSalary() int {  
    return p.basicpay + p.pf
}

//salary of contract employee is the basic pay alone
func (c Contract) CalculateSalary() int {  
    return c.basicpay
}

/*
total expense is calculated by iterating though the SalaryCalculator slice and summing  
the salaries of the individual employees  
*/
func totalExpense(s []SalaryCalculator) {  
    expense := 0
    for _, v := range s {
        expense = expense + v.CalculateSalary()
    }
    fmt.Printf("Total Expense Per Month $%d", expense)
}

func main() {  
    pemp1 := Permanent{1, 5000, 20}
    pemp2 := Permanent{2, 6000, 30}
    cemp1 := Contract{3, 3000}
    employees := []SalaryCalculator{pemp1, pemp2, cemp1}
    totalExpense(employees)

}
```

 `totalExpense` 方法体现出了接口的妙用。该方法接收一个 `SalaryCalculator` 接口的切片（`[]SalaryCalculator`）作为参数。在main函数，我们向 `totalExpense` 方法传递了一个包含 `Permanent` 和 `Contact` 类型的切片。在方法中，通过调用不同类型对应的 `CalculateSalary` 方法，`totalExpense` 可以计算得到支出。

这样做最大的优点是：`totalExpense` 可以扩展新的员工类型，而不需要修改任何代码。假如公司增加了一种新的员工类型 `Freelancer`，它有着不同的薪资结构。`Freelancer`只需传递到 `totalExpense` 的切片参数中，无需 `totalExpense` 方法本身进行修改。只要 `Freelancer` 也实现了 `SalaryCalculator` 接口，`totalExpense` 就能够实现其功能。

```go
接口的好处在于多种类型实现同一个方法时会很方便
```

空接口

不包含方法，所有类型都实现了空接口

```go
func describe(i interface{}) {  
    fmt.Printf("Type = %T, value = %v\n", i, i)
}

func main() {  
    s := "Hello World"
    describe(s) // Type = string, value = Hello World
    i := 55
    describe(i) // Type = int, value = 55
    strt := struct {
        name string
    }{
        name: "Naveen R",
    }
    describe(strt) // Type = struct { name string }, value = {Naveen R}
}
```

使用指针接收器实现接口

```go
func (a *Address) Describe() { // 使用指针接受者实现
    fmt.Printf("State %s Country %s", a.state, a.country)
}

func main() {
    var d2 Describer
    a := Address{"Washington", "USA"}

    /* 如果下面一行取消注释会导致编译错误：
       cannot use a (type Address) as type Describer
       in assignment: Address does not implement
       Describer (Describe method has pointer
       receiver)
    */
    //d2 = a

    d2 = &a // 这是合法的
    // 因为 Address 类型的指针实现了 Describer 接口
    d2.Describe()
}
```

上面的`d2 = a`为啥不能，因为要用接口变量来调用方法，但是因为接口变量(这里的`d2`)并不能取到地址(也就是`d2.Describe()`不能自动转成`(&d2).Describe()`)，只能传指针了。

实现多个接口

```go
type SalaryCalculator interface {  
    DisplaySalary()
}

type LeaveCalculator interface {  
    CalculateLeavesLeft() int
}

type Employee struct {  
    firstName string
    lastName string
    basicPay int
    pf int
    totalLeaves int
    leavesTaken int
}

func (e Employee) DisplaySalary() {  
    fmt.Printf("%s %s has salary $%d", e.firstName, e.lastName, (e.basicPay + e.pf))
}

func (e Employee) CalculateLeavesLeft() int {  
    return e.totalLeaves - e.leavesTaken
}

func main() {  
    e := Employee {
        firstName: "Naveen",
        lastName: "Ramanathan",
        basicPay: 5000,
        pf: 200,
        totalLeaves: 30,
        leavesTaken: 5,
    }
    var s SalaryCalculator = e
    s.DisplaySalary()
    var l LeaveCalculator = e
    fmt.Println("\nLeaves left =", l.CalculateLeavesLeft())
}
```

接口的嵌套：通过其他接口的方法创建新接口

```go
type SalaryCalculator interface {  
    DisplaySalary()
}

type LeaveCalculator interface {  
    CalculateLeavesLeft() int
}

type EmployeeOperations interface {  
    SalaryCalculator
    LeaveCalculator
}

type Employee struct {  
    firstName string
    lastName string
    basicPay int
    pf int
    totalLeaves int
    leavesTaken int
}

func (e Employee) DisplaySalary() {  
    fmt.Printf("%s %s has salary $%d", e.firstName, e.lastName, (e.basicPay + e.pf))
}

func (e Employee) CalculateLeavesLeft() int {  
    return e.totalLeaves - e.leavesTaken
}

func main() {  
    e := Employee {
        firstName: "Naveen",
        lastName: "Ramanathan",
        basicPay: 5000,
        pf: 200,
        totalLeaves: 30,
        leavesTaken: 5,
    }
    var empOp EmployeeOperations = e
    empOp.DisplaySalary()
    fmt.Println("\nLeaves left =", empOp.CalculateLeavesLeft())
}
```

接口的零值：nil

对于值为 `nil` 的接口，其底层值（Underlying Value）和具体类型（Concrete Type）都为 `nil`。

比如

```go
var d1 Describer
```

对于值为 `nil` 的接口，由于没有底层值和具体类型，当我们试图调用它的方法时，程序会产生 `panic` 异常。

所以才要将其他类型的值赋给它，顺便把类型也赋过去。

## 21 并发

并发是指合理分配任务，不造成资源浪费。（时间管理大师）（go是并发式语言）

```go
举例：比如我在跑步时鞋带掉了，停下来系鞋带后再继续跑，我合理分配了时间，既跑步了又系鞋带了。
```

并行是指同时处理多个任务。

```go
举例：我一边穿衣服一边吃饭。
```

并行不一定会加快运行速度，因为并行运行的组件之间可能需要相互通信。在并发系统上，这种通信开销很小。但在多核的并行系统上，组件间的通信开销就很高了。所以，并行不一定会加快运行速度！

Go 编程语言原生支持并发。Go 使用 Go 协程（`Goroutine`） 和信道（`Channel`）来处理并发。在接下来的教程里，我们还会详细介绍它们。

## 22 go协程

Go 协程是与其他函数或方法一起并发运行的函数或方法。所有go协程都是匿名的。

创建go协程

```go
func hello() {
    fmt.Println("Hello world goroutine")
}
func main() {
    go hello() // 让一个新的 Go 协程并发地运行。
    fmt.Println("main function")
}
```

现在 `hello()` 函数与 `main()` 函数会并发地执行。主函数会运行在一个特有的 Go 协程上，它称为 Go 主协程（`Main Goroutine`）。

- 启动一个新的协程时，协程的调用会立即返回。与函数不同，程序控制不会去等待 Go 协程执行完毕。在调用 Go 协程之后，程序控制会立即返回到代码的下一行，忽略该协程的任何返回值。
- 如果希望运行其他 Go 协程，Go 主协程必须继续运行着。如果 Go 主协程终止，则程序终止，于是其他 Go 协程也不会继续运行

```go
func hello() {  
    fmt.Println("Hello world goroutine")
}
// 使主协程休眠一秒，让hello()有足够时间来执行
func main() {  
    go hello()
    time.Sleep(1 * time.Second)
    fmt.Println("main function")
}
```

启动多个 Go 协程

```go
func numbers() {  
    for i := 1; i <= 5; i++ {
        time.Sleep(250 * time.Millisecond)
        fmt.Printf("%d ", i)
    }
}
func alphabets() {  
    for i := 'a'; i <= 'e'; i++ {
        time.Sleep(400 * time.Millisecond)
        fmt.Printf("%c ", i)
    }
}
func main() {  
    go numbers()
    go alphabets()
    time.Sleep(3000 * time.Millisecond)
    fmt.Println("main terminated")
}
// 1 a 2 3 b 4 c 5 d e main terminated
// 首先启动两个协程，接着main协程休眠3秒，执行numbers协程和alphabets协程，执行完，main结束。
```

## 23 信道

实现`go`协程之间的通信

声明信道

```go
func main() {  
    var a chan int
    if a == nil {
        a = make(chan int)
    }
}
```

```go
int表示信道a只能运输这种类型的数据
信道零值是nil
使用make函数定义信道
```

传输数据

```go
data := <- a // 读取信道 a，存到data
a <- data // 将data写入信道 a
```

发送与接收默认是阻塞的

```go
当把数据发送到信道时，程序控制会在发送数据的语句处发生阻塞，直到有其它 Go 协程从信道读取到数据，才会解除阻塞。与此类似，当读取信道的数据时，如果没有其它的协程把数据写入到这个信道，那么读取过程就会一直阻塞着。
```

示例1

```go
package main

import (  
    "fmt"
)

func hello(done chan bool) {  
    fmt.Println("Hello world goroutine")
    done <- true // 将数据存到信道done
}
func main() {  
    done := make(chan bool)
    go hello(done)
    <-done   // 从done获取数据，产生阻塞
    fmt.Println("main function")
}
```

示例2：计算平方和与立方和的和

```go
func calcSquares(number int, squareop chan int) {  
    sum := 0
    for number != 0 {
        digit := number % 10 // 取得个位数
        sum += digit * digit // 计算个位数的平方
        number /= 10
    }
    squareop <- sum // 将平方和存入信道
}

func calcCubes(number int, cubeop chan int) {  
    sum := 0 
    for number != 0 {
        digit := number % 10
        sum += digit * digit * digit
        number /= 10
    }
    cubeop <- sum
} 

func main() {  
    number := 589
    sqrch := make(chan int)
    cubech := make(chan int)
    go calcSquares(number, sqrch)
    go calcCubes(number, cubech)
    squares, cubes := <-sqrch, <-cubech
    fmt.Println("Final output", squares + cubes)
}
```

死锁：信道要保存数据但没有没有发出，或者信道要发出数据但是没有保存，会产生死锁

```go
func main() {  
    ch := make(chan int)
    ch <- 5
} // ch只接收了数据，但是没有发出
```

单向信道：只能接收数据或者只能发送数据

```go
func sendData(sendch chan<- int) {  
    sendch <- 10 // 存数据
}

func main() {  
    sendch := make(chan<- int) // 信道，只能存数据
    go sendData(sendch)
    fmt.Println(<-sendch) // 取数据，会报错
}
```

信道转换：将双向信道转换成唯送信道或者唯收信道，但反过来不行

```go
func sendData(sendch chan<- int) {  
    sendch <- 10
}

func main() {  
    cha1 := make(chan int)
    go sendData(cha1)
    fmt.Println(<-cha1)
}
// cha1在sendData协程里是单向信道，在main协程里是双向信道
```

关闭信道：数据发送方可以关闭信道

当从信道接收数据时，接收方可以多用一个变量来检查信道是否已经关闭。

```go
v, ok := <- ch
```

如果信道是关闭的，且信道没有值了，会读到零值，否则得把值读完了才读到零值

```go
func producer(chnl chan int) {  
    for i := 0; i < 10; i++ { // 遍历10次，将0到9存入信道
        chnl <- i
    }
    close(chnl) // 遍历结束，关闭信道
}
func main() {  
    ch := make(chan int) // 创建一个信道
    go producer(ch) // 启动一个协程
    for { // 遍历信道
        v, ok := <-ch // 读取信道里的数据
        if ok == false { // 如果信道是关闭的，那么跳出循环
            break
        }
        fmt.Println(v, ok) // 0 true 1 true ... 9 true
    }
}
```

用`for range`遍历信道，信道关闭后且信道里无值遍历结束

```go
func producer(chnl chan int) {  
    for i := 0; i < 10; i++ {
        chnl <- i
    }
    close(chnl)
}
func main() {  
    ch := make(chan int) // 创建一个信道
    go producer(ch) // 启动一个协程
    for v := range ch {
        fmt.Println(v) // 0 1 2 ... 8 9
    }
}
```

```go
// 获取个位数
func digits(number int, dchnl chan int) {  
    for number != 0 {
        digit := number % 10 // 取得个位数
        dchnl <- digit // 个位数存入信道
        number /= 10 // 获取除个位数的数
    }
    close(dchnl) // 关闭信道
}
// 计算平方和
func calcSquares(number int, squareop chan int) {  
    sum := 0 // 声明并初始化
    dch := make(chan int) // 创建信道
    go digits(number, dch) // 启动协程
    for digit := range dch { // 遍历信道，读取个位数
        sum += digit * digit // 计算平方和
    } // 遍历完，信道哦关闭
    squareop <- sum // 将平方和存入信道
}
func calcCubes(number int, cubeop chan int) {  
    sum := 0
    dch := make(chan int)
    go digits(number, dch)
    for digit := range dch {
        sum += digit * digit * digit
    }
    cubeop <- sum
}

func main() {  
    number := 589
    sqrch := make(chan int) // 创建信道，存储平方和
    cubech := make(chan int) // 创建信道，存储立方和
    go calcSquares(number, sqrch) // 启动协程，存储平方和
    go calcCubes(number, cubech) // 启动协程，存储立方和
    squares, cubes := <-sqrch, <-cubech // 读取信道里的平方和和立方和
    fmt.Println("Final output", squares+cubes)
}
```

思考

```go
<-cha1：如果cha1是一个信道，那么<-cha1相当于一个表达式，返回信道里存储的值
```

以上都是无缓冲信道，无缓冲信道的发送和接收过程是阻塞的。

缓冲信道：缓冲满时，信道再接收数据会产生阻塞，缓冲空时，信道再发送数据会产生阻塞

创建缓冲信道

```go
ch := make(chan type, capacity)
```

示例1
```go
func main() {  
    ch := make(chan string, 2) // 容量为2，表示可以存放两个字符串而并不产生阻塞
    ch <- "naveen" // 只有当存放第三个时才产生阻塞
    ch <- "paul"
    fmt.Println(<- ch) // 取出第一个字符串，信道里此时只有一个字符串了
    fmt.Println(<- ch)
}
```

示例2

```go
func write(ch chan int) {  
    for i := 0; i < 5; i++ {
        ch <- i // 存放第三个时发生阻塞，在这停止了
        fmt.Println("successfully wrote", i, "to ch")
    }
    close(ch) // 信道关闭，表示不再接收值，但如果里面还有值，则可继续读取，读完后再读会得到零值
}
func main() {  
    ch := make(chan int, 2) // 创建容量为2的缓冲信道
    go write(ch) // 启动协程
    time.Sleep(2 * time.Second) // main协程休眠2秒
    for v := range ch { // 信道ch里只由两个数据，读取第一个值0后，write协程会向ch里放2
        // 读取第二个值1后，ch里会放3，读取第三个2值后，ch里会放4，信道关闭
        // 读取第四个3值后，过两秒读取第五个值4，读完后发现信道关闭，遍历结束
        fmt.Println("read value", v,"from ch") // 休眠，相当于立即阻塞
        time.Sleep(2 * time.Second)
    }
}
```

如果遍历里没有休眠这段，那么结果会是，先写0，1，2，产生阻塞，读3次，读第四次时产生阻塞，再写两次，关闭信道，再读两次。容量为2的信道可以写三次，第三次会产生阻塞。无缓冲信道会存一个值，但会立即产生阻塞。存疑。

缓冲信道的死锁

```go
func main() {  
    ch := make(chan string, 2)
    ch <- "naveen"
    ch <- "paul"
    ch <- "steve" // 多写了一个值，但没有其他协程来接收，会产生死锁
    fmt.Println(<-ch)
    fmt.Println(<-ch)
}
```

容量：可以存储值数量的最大值；长度：信道中当前排队的元素个数。

```go
func main() {  
    ch := make(chan string, 3)
    ch <- "naveen"
    ch <- "paul"
    fmt.Println("capacity is", cap(ch))
    fmt.Println("length is", len(ch))
    fmt.Println("read value", <-ch)
    fmt.Println("new length is", len(ch))
}
```

信道用于解决协程间通信，写成用于解决高并发，高并发是为了处理效率更快。

## 24 `WaitGroup`

`WaitGroup`用于实现工作池，用于等待一批 Go 协程执行结束。

```go
func process(i int, wg *sync.WaitGroup) {  
    fmt.Println("started Goroutine ", i)
    time.Sleep(2 * time.Second)
    fmt.Printf("Goroutine %d ended\n", i)
    wg.Done()
}

func main() {  
    no := 3
    var wg sync.WaitGroup
    for i := 0; i < no; i++ {
        wg.Add(1)
        go process(i, &wg) // 注意此处要传wg的地址，因为结构体类型是值类型
    }
    wg.Wait()
    fmt.Println("All go routines finished executing")
}
```

`WaitGroup`是结构体类型，使用计数器工作。

```
增加计数器：Add(),计数器会加上Add的传参
减少计数器：Done(),
wait():阻塞调用WaitGroup的go协程，直到计数器变成0
```

## 25 工作池

一组等待任务分配的线程

```go
package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

type Job struct { // 工作
	id       int
	randomno int
}
type Result struct { // 结果
	job         Job
	sumofdigits int
}

var jobs = make(chan Job, 10) // 存放10件工作
var results = make(chan Result, 10) // 存放每件工作的结果

func digits(number int) int { // 计算一个整数各数字的和
	sum := 0 // 代表和
	no := number // 当前数字
	for no != 0 {
		digit := no % 10
		sum += digit
		no /= 10
	} // 计算
	time.Sleep(2 * time.Second) // 睡两秒，模拟工作时间
	return sum // 返回计算结果
}
func worker(wg *sync.WaitGroup) { // 工作者
	for job := range jobs { // 遍历工作
		output := Result{job, digits(job.randomno)} // 计算每个工作的结果
		results <- output // 将结果存入results
	}
	wg.Done() // 一个工作者完成了祂的n件工作
}
func createWorkerPool(noOfWorkers int) { // 根据工作者数量创建工作池
	var wg sync.WaitGroup
	for i := 0; i < noOfWorkers; i++ { // 遍历每个工作者
		wg.Add(1) // 每有一个工作者计数器加1
		go worker(&wg) // 给每个工作者启动一个工作者协程，工作者会去自动完成属于祂的工作
	}
	wg.Wait() // 等待所有工作者协程执行完毕
	close(results) // 关闭results的写入通道
}
func allocate(noOfJobs int) { // 分配工作
	for i := 0; i < noOfJobs; i++ { // 遍历每件工作
		randomno := rand.Intn(999) // 获取0~998之间的随机整数
		job := Job{i, randomno} // 创建一件工作，总共会创建100件
		jobs <- job // 将每件工作存放到缓冲信道jobs
	}
	close(jobs) // 遍历完所有工作后，关闭jobs的写入信道
}
func result(done chan bool) { // 获取工作结果
	for result := range results { // 遍历所有结果
		fmt.Printf("Job id %d, input random no %d , sum of digits %d\n", result.job.id, result.job.randomno, result.sumofdigits)
	}
	done <- true
}
func main() {
	startTime := time.Now() // 工作开始时间
	noOfJobs := 100 // 工作数量
	go allocate(noOfJobs) // 分配工作
	done := make(chan bool) // 判断工作是否完成的信道
	go result(done) // 获取工作结果
	noOfWorkers := 10 // 工作者数量
	createWorkerPool(noOfWorkers) // 根据工作者数量创建工作池
	<-done // 读取done
	endTime := time.Now() // 工作结束时间
	diff := endTime.Sub(startTime) // 工作持续时间
	fmt.Println("total time taken ", diff.Seconds(), "seconds")
}
```

## 26 `Select`

用于在多个发送/接收信道操作中进行选择。应用：在多个服务器的返回中取出最快的那一条。

示例

```go
func server1(ch chan string) {  
    time.Sleep(6 * time.Second)
    ch <- "from server1"
}
func server2(ch chan string) {  
    time.Sleep(3 * time.Second)
    ch <- "from server2"

}
func main() {  
    output1 := make(chan string)
    output2 := make(chan string)
    go server1(output1)
    go server2(output2)
    select {
    case s1 := <-output1:
        fmt.Println(s1)
    case s2 := <-output2:
        fmt.Println(s2)
    }
}
// from server2
```

以上解释：遇到`select`会立即阻塞，直到有信道接收/发送准备完毕。这个例子中，`server2`先准备完毕，`select`选择第二个`case`，输出`from server2`，然后主协程结束。

默认情况：防止 `select` 语句一直阻塞。

```go
func process(ch chan string) {  
    time.Sleep(10500 * time.Millisecond)
    ch <- "process successful"
}

func main() {  
    ch := make(chan string)
    go process(ch)
    for {
        time.Sleep(1000 * time.Millisecond)
        select {
        case v := <-ch:
            fmt.Println("received value: ", v)
            return
        default:
            fmt.Println("no value received")
        }
    }
}
```

`default`一般用于`for`循环，如果不是，则会直接执行`default`。

死锁：用默认情况解决，如果 `select` 只含有值为 `nil` 的信道，也同样会执行默认情况。

```go
func main() {  
    ch := make(chan string)
    select {
    case <-ch:
    }
} // 程序是怎么知道没有向ch里写入数据的，是因为没有其他go协程在运行
```

随机抽取：当 `select` 由多个 case 准备就绪时，将会随机地选取其中之一去执行。

```go
func server1(ch chan string) {  
    ch <- "from server1"
}
func server2(ch chan string) {  
    ch <- "from server2"

}
func main() {  
    output1 := make(chan string)
    output2 := make(chan string)
    go server1(output1)
    go server2(output2)
    time.Sleep(1 * time.Second)
    select {
    case s1 := <-output1:
        fmt.Println(s1)
    case s2 := <-output2:
        fmt.Println(s2)
    }
}
```

空 select

```go
func main() {  
    select {}
} // 产生死锁
```

## 27 `Mutex`

结构体类型

临界区：当程序并发地运行时，多个 Go 协程不应该同时访问那些修改共享资源的代码。这些修改共享资源的代码称为临界区。

竞态条件：计算结果取决于多个go协程按不同顺序执行时，会产生竞态条件。

`Mutex`：提供一种加锁机制，确保在某时刻只有一个协程，在临界区运行，防止出现竞态条件。

`Mutex` 定义了两个方法：`Lock` 和 `Unlock`。所有在 `Lock` 和 `Unlock` 之间的代码，都只能由一个 `Go` 协程执行，于是就可以避免竞态条件。

例如

```go
mutex.Lock()  
x = x + 1  
mutex.Unlock()
```

如果有一个 Go 协程已经持有了锁（Lock），当其他协程试图获得该锁时，这些协程会被阻塞，直到 Mutex 解除锁定为止。

示例：含有竞态条件的程序

```go
package main  
import (  
    "fmt"
    "sync"
    )
var x  = 0  
func increment(wg *sync.WaitGroup) {  
    x = x + 1
    wg.Done()
}
func main() {  
    var w sync.WaitGroup
    for i := 0; i < 1000; i++ {
        w.Add(1)        
        go increment(&w)
    }
    w.Wait()
    fmt.Println("final value of x", x)
}
```

解决以上的示例：使用`mutex`

```go
package main  
import (  
    "fmt"
    "sync"
    )
var x  = 0  
func increment(wg *sync.WaitGroup, m *sync.Mutex) {  
    m.Lock()
    x = x + 1
    m.Unlock()
    wg.Done()   
}
func main() {  
    var w sync.WaitGroup
    var m sync.Mutex
    for i := 0; i < 1000; i++ {
        w.Add(1)        
        go increment(&w, &m)
    }
    w.Wait()
    fmt.Println("final value of x", x)
}
```

以上解释：`m`是一把互斥锁，它作用在1000个协程里的函数中，当执行这1000个协程中的第一个时，`m`调用`Lock`方法，上锁，其他协程趁机运行时，会碰到这把锁，导致产生阻塞。这第一把锁解锁时（调用了`Unlock`），其他协程可以正常运行，这些协程依旧会上锁和解锁。这样只会在同一时间内执行一次`x=x+1`。当然，必须是同一把锁，如果不是同一把锁，第二次执行的协程如果插队时并不会碰到上一把锁，不会阻塞，它只会顺畅地执行自己程序，上锁解锁等。

也就是说，`mutex`这一把锁可能会同时作用在多个协程。

使用信道处理竞态条件

```go
package main  
import (  
    "fmt"
    "sync"
    )
var x  = 0  
func increment(wg *sync.WaitGroup, ch chan bool) {  
    ch <- true // 第一次时不会阻塞，后面插队的进来会产生阻塞
    x = x + 1 //只要有一个协程在运行这句，其他协程插不进来，因为被上一句阻塞了
    <- ch
    wg.Done()
}
func main() {
    var w sync.WaitGroup
    ch := make(chan bool, 1) // 之所以是1，是希望能存1个值不会产生阻塞
    for i := 0; i < 1000; i++ {
        w.Add(1)
        go increment(&w, ch)
    }
    w.Wait()
    fmt.Println("final value of x", x)
}
```

`Mutex` vs 信道

选哪个呢？

当竞态条件发生在需要进行协程间的通信时，可以使用信道。

当只允许一个协程访问临界区时，使用`Mutex`

## 28 结构体取代类

Go 不支持类，而是提供了结构体。结构体中可以添加方法。这样可以将数据和操作数据的方法绑定在一起，实现与类相似的效果。

比如

```go
package employee

import (  
    "fmt"
)

type Employee struct {  
    FirstName   string
    LastName    string
    TotalLeaves int
    LeavesTaken int
}

func (e Employee) LeavesRemaining() {  
    fmt.Printf("%s %s has %d leaves remaining", e.FirstName, e.LastName, (e.TotalLeaves - e.LeavesTaken))
}
```

调用时这么调用

```go
func main() {  
    e := employee.Employee {
        FirstName: "Sam",
        LastName: "Adolf",
        TotalLeaves: 30,
        LeavesTaken: 20,
    }
    e.LeavesRemaining()
}
```

如果不传参数

```go
var e employee.Employee
e.LeavesRemaining()
```

这不太好，创建的是零值的变量。为了不让创建零值的变量

使用另一种方式：创建New函数替代导出的结构体类型

```go
package employee

import (  
    "fmt"
)

type employee struct {  
    firstName   string
    lastName    string
    totalLeaves int
    leavesTaken int
}

func New(firstName string, lastName string, totalLeave int, leavesTaken int) employee {
    e := employee {firstName, lastName, totalLeave, leavesTaken}
    return e
} // 如果一个包里有多个类型，那么使用NewT()这种命名

func (e employee) LeavesRemaining() {  
    fmt.Printf("%s %s has %d leaves remaining", e.firstName, e.lastName, (e.totalLeaves - e.leavesTaken))
}
```

调用时这么调

```go
package main  

import "oop/employee"

func main() {  
    e := employee.New("Sam", "Adolf", 30, 20)
    e.LeavesRemaining()
}
```

这样就得必须传入参数了，而且和类、构造器很类似

## 29 组合取代继承

Go 不支持继承，但它支持组合

实现组合：在结构体内嵌套结构体，可以实现组合。

示例

```go
type author struct {  
    firstName string
    lastName  string
    bio       string
}

func (a author) fullName() string {  
    return fmt.Sprintf("%s %s", a.firstName, a.lastName)
}

type post struct {  
    title   string
    content string
    author
}

func (p post) details() {  
    fmt.Println("Title: ", p.title)
    fmt.Println("Content: ", p.content)
    fmt.Println("Author: ", p.fullName())
    fmt.Println("Bio: ", p.bio)
}

func main() {  
    author1 := author{
        "Naveen",
        "Ramanathan",
        "Golang Enthusiast",
    }
    post1 := post{
        "Inheritance in Go",
        "Go supports composition instead of inheritance",
        author1,
    }
    post1.details()
}
```

结构体切片的嵌套

```go
type author struct {  
    firstName string
    lastName  string
    bio       string
}

func (a author) fullName() string {  
    return fmt.Sprintf("%s %s", a.firstName, a.lastName)
}

type post struct {  
    title   string
    content string
    author
}

func (p post) details() {  
    fmt.Println("Title: ", p.title)
    fmt.Println("Content: ", p.content)
    fmt.Println("Author: ", p.fullName())
    fmt.Println("Bio: ", p.bio)
}

type website struct {  
 posts []post
}
func (w website) contents() {  
    fmt.Println("Contents of Website\n")
    for _, v := range w.posts {
        v.details()
        fmt.Println()
    }
}

func main() {  
    author1 := author{
        "Naveen",
        "Ramanathan",
        "Golang Enthusiast",
    }
    post1 := post{
        "Inheritance in Go",
        "Go supports composition instead of inheritance",
        author1,
    }
    post2 := post{
        "Struct instead of Classes in Go",
        "Go does not support classes but methods can be added to structs",
        author1,
    }
    post3 := post{
        "Concurrency",
        "Go is a concurrent language and not a parallel one",
        author1,
    }
    w := website{
        posts: []post{post1, post2, post3},
    }
    w.contents()
}
```

用一个类型去嵌套类型来实现类似继承的效果，可以用匿名字段，也可以不用匿名字段，不过切片类型的不能作为匿名字段，也就是不能嵌套匿名切片。

## 30 多态

Go 通过接口来实现多态。在 Go 语言中，我们是隐式地实现接口。一个类型如果定义了接口所声明的全部方法，那它就实现了该接口。

多态：多个类型实现一个接口。

使用多态的目的一般是计算什么什么的总和。

示例：计算收入总和

```go
type Income interface {  
    calculate() int
    source() string
}

type FixedBilling struct {  
    projectName string
    biddedAmount int
}

type TimeAndMaterial struct {  
    projectName string
    noOfHours  int
    hourlyRate int
}

func (fb FixedBilling) calculate() int {  
    return fb.biddedAmount
}

func (fb FixedBilling) source() string {  
    return fb.projectName
}

func (tm TimeAndMaterial) calculate() int {  
    return tm.noOfHours * tm.hourlyRate
}

func (tm TimeAndMaterial) source() string {  
    return tm.projectName
}

func calculateNetIncome(ic []Income) {  
    var netincome int = 0
    for _, income := range ic {
        fmt.Printf("Income From %s = $%d\n", income.source(), income.calculate())
        netincome += income.calculate()
    }
    fmt.Printf("Net income of organisation = $%d", netincome)
}

func main() {  
    project1 := FixedBilling{projectName: "Project 1", biddedAmount: 5000}
    project2 := FixedBilling{projectName: "Project 2", biddedAmount: 10000}
    project3 := TimeAndMaterial{projectName: "Project 3", noOfHours: 160, hourlyRate: 25}
    incomeStreams := []Income{project1, project2, project3}
    calculateNetIncome(incomeStreams)
}
```

新增收益流，在以上示例中增加新的收入类型

只需这样改：添加广告类型的收益，去实现之前的接口

```go
type Advertisement struct {  
    adName     string
    CPC        int
    noOfClicks int
}

func (a Advertisement) calculate() int {  
    return a.CPC * a.noOfClicks
}

func (a Advertisement) source() string {  
    return a.adName
}
```

```go
func main() {  
    project1 := FixedBilling{projectName: "Project 1", biddedAmount: 5000}
    project2 := FixedBilling{projectName: "Project 2", biddedAmount: 10000}
    project3 := TimeAndMaterial{projectName: "Project 3", noOfHours: 160, hourlyRate: 25}
    bannerAd := Advertisement{adName: "Banner Ad", CPC: 2, noOfClicks: 500}
    popupAd := Advertisement{adName: "Popup Ad", CPC: 5, noOfClicks: 750}
    incomeStreams := []Income{project1, project2, project3, bannerAd, popupAd}
    calculateNetIncome(incomeStreams)
}
```

唯一不同的，只是方法里面具体的实现步骤不同，但，接口又不管这个

## 31 `Defer`

延迟关键字

`defer` 语句的用途是：含有 `defer` 语句的函数，会在该函数将要返回之前，调用另一个函数。

示例：延迟函数

```go
func finished() {  
    fmt.Println("Finished finding largest")
}

func largest(nums []int) {  
    defer finished()
    fmt.Println("Started finding largest")
    max := nums[0]
    for _, v := range nums {
        if v > max {
            max = v
        }
    }
    fmt.Println("Largest number in", nums, "is", max)
}

func main() {  
    nums := []int{78, 109, 2, 563, 300}
    largest(nums)
}
// Started finding largest 
// Largest number in [78 109 2 563 300] is 563 
// Finished finding largest
```

在 `largest` 将要返回的时候，调用了我们的延迟函数，打印出 `Finished finding largest` 的文本。

示例：延迟方法

```go
type person struct {  
    firstName string
    lastName string
}

func (p person) fullName() {  
    fmt.Printf("%s %s",p.firstName,p.lastName)
}

func main() {  
    p := person {
        firstName: "John",
        lastName: "Smith",
    }
    defer p.fullName()
    fmt.Printf("Welcome ")  
}
```

实参取值

在 Go 语言中，并非在调用延迟函数的时候才确定实参，而是当执行 `defer` 语句的时候，就会对延迟函数的实参进行求值。

```go
func printA(a int) {  
    fmt.Println("value of a in deferred function", a)
}
func main() {  
    a := 5
    defer printA(a)
    a = 10
    fmt.Println("value of a before deferred function call", a)
}
// value of a before deferred function call 10  
// value of a in deferred function 5
```

`defer`栈

当一个函数内多次调用 `defer` 时，Go 会把 `defer` 调用放入到一个栈中，随后按照后进先出的顺序执行。

```go
func main() {
	name := "Naveen"
	fmt.Printf("Orignal String: %s\n", string(name))
	fmt.Printf("Reversed String: ")
	for _, v := range name {
		defer fmt.Printf("%c", v)
	}
}
```

`defer`的实际应用

当一个函数应该在与当前代码流（Code Flow）无关的环境下调用时，可以使用 `defer`。

示例：一个计算面积的示例

```go
type rect struct {  
    length int
    width  int
}

func (r rect) area(wg *sync.WaitGroup) {  
    if r.length < 0 {
        fmt.Printf("rect %v's length should be greater than zero\n", r)
        wg.Done()
        return
    }
    if r.width < 0 {
        fmt.Printf("rect %v's width should be greater than zero\n", r)
        wg.Done()
        return
    }
    area := r.length * r.width
    fmt.Printf("rect %v's area %d\n", r, area)
    wg.Done()
}

func main() {  
    var wg sync.WaitGroup
    r1 := rect{-67, 89}
    r2 := rect{5, -67}
    r3 := rect{8, 9}
    rects := []rect{r1, r2, r3}
    for _, v := range rects {
        wg.Add(1)
        go v.area(&wg)
    }
    wg.Wait()
    fmt.Println("All go routines finished executing")
}
```

会发现 `wg.Done()` 只在 `area` 函数返回的时候才会调用。我们来用 `defer` 来重写上面的代码。

```go
type rect struct {  
    length int
    width  int
}

func (r rect) area(wg *sync.WaitGroup) {  
    defer wg.Done()
    if r.length < 0 {
        fmt.Printf("rect %v's length should be greater than zero\n", r)
        return
    }
    if r.width < 0 {
        fmt.Printf("rect %v's width should be greater than zero\n", r)
        return
    }
    area := r.length * r.width
    fmt.Printf("rect %v's area %d\n", r, area)
}

func main() {  
    var wg sync.WaitGroup
    r1 := rect{-67, 89}
    r2 := rect{5, -67}
    r3 := rect{8, 9}
    rects := []rect{r1, r2, r3}
    for _, v := range rects {
        wg.Add(1)
        go v.area(&wg)
    }
    wg.Wait()
    fmt.Println("All go routines finished executing")
}
```

## 32 错误处理

`error`类型

示例：打开一个不存在的文件

```go
import (  
    "fmt"
    "os"
)

func main() {  
    f, err := os.Open("/test.txt")
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(f.Name(), "opened successfully")
}
// open /test.txt: No such file or directory
```

`error`是一个接口类型

```go
type error interface {  
    Error() string
}
```

断言底层结构体类型，使用结构体字段获取更多信息

示例

```go
func main() {
	f, err := os.Open("/test.txt")
	if err, ok := err.(*os.PathError); ok { // 断言open返回的错误类型是os.PathError，确实是，这样就能够拿到PathError类型里的字段Op/Path/Err，进行更细致的描述错误
		fmt.Println("文件在这个路径：", err.Path, "打开失败")
		return
	}
	fmt.Println(f.Name(), "成功打开")
}
```

断言底层结构体类型，调用方法获取更多信息

示例

```go
func main() {  
    addr, err := net.LookupHost("golangbot123.com") // 获取此域名的ip
    if err, ok := err.(*net.DNSError); ok { // 断言错误类型是net.DNSError
        if err.Timeout() { // 调用DNSError的方法，判断错误是否是超时导致
            fmt.Println("operation timed out")
        } else if err.Temporary() { // 判断错误是否是临时性错误
            fmt.Println("temporary error")
        } else {
            fmt.Println("generic error: ", err)
        }
        return
    }
    fmt.Println(addr)
}
```

直接比较错误获取错误的更多信息

```go
func main() {  
    files, error := filepath.Glob("[") // 查询模式为 [ 的文件
    if error != nil && error == filepath.ErrBadPattern { // 模式不正确
        fmt.Println(error)
        return
    }
    fmt.Println("matched files", files)
}
```

## 33 自定义错误

`errors.New`

示例1：计算圆的半径

```go
package main

import (  
    "errors"
    "fmt"
    "math"
)

func circleArea(radius float64) (float64, error) {
	if radius < 0 {
		return 0, errors.New("area calculation failed, radius is less than zero")
	}
	return math.Pi * radius * radius, nil
}

func main() {
	radius := -20.0
	area, err := circleArea(radius)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("Area of circle %0.2f", area)
}
```

`Errorf`：规定错误的格式，用法`fmt.Errorf`同`fmt.Printf`

示例

```go
func circleArea(radius float64) (float64, error) {  
    if radius < 0 {
        return 0, fmt.Errorf("Area calculation failed, radius %0.2f is less than zero", radius)
    }
    return math.Pi * radius * radius, nil
}

func main() {  
    radius := -20.0
    area, err := circleArea(radius)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Printf("Area of circle %0.2f", area)
}
```

使用自定义结构体类型和字段提供错误的更多信息

```go
type areaError struct {
	err    string
	radius float64
}

func (e *areaError) Error() string {
	return fmt.Sprintf("radius %0.2f: %s", e.radius, e.err)
}

func circleArea(raduis float64) (float64, error) {
	if raduis < 0 {
		return 0, &areaError{"radius is negaative", raduis}
	}
	return math.Pi * raduis * raduis, nil
}

func main() {
	var radius float64 = 20
	area, err := circleArea(radius)
	if err != nil {
		if err, ok := err.(*areaError); ok {
			fmt.Println("ppp", err.radius) // 断言正确
			return
		}
		fmt.Println(err) // 断言错误
		return
	}
	fmt.Println("lll", area)
}
```

`err.(*areaError)`意思是`err`是否是`*areaError`类型，是的话`ok`为`true`。这个表达式叫做断言。

使用结构体类型的方法来提供错误的更多信息

```go
type areaError struct {
	err    string
	length float64
	width  float64
}

// 实现error接口
func (e *areaError) Error() string {
	return e.err
}

// 从这个方法获取精确的错误信息
func (e *areaError) lengthNegative() bool {
	return e.length < 0
}

// 从这个方法获取精确的错误信息
func (e *areaError) widthNegative() bool {
	return e.width < 0
}

func rectArea(length, width float64) (float64, error) {
	err := ""
	if length < 0 {
		err += "长度小于0"
	}
	if width < 0 {
		if err == "" {
			err = "宽度小于0"
		} else {
			err += "，宽度小于0"
		}
	}
	if err != "" {
		return 0, &areaError{err, length, width}
	}
	return length * width, nil
}

func main() {
	length, width := -5.0, 6.0
	area, err := rectArea(length, width)
	if err != nil {
		if err, ok := err.(*areaError); ok { // 断言错误类型为areaError
			if err.lengthNegative() { // 借用err的方法来更细致地判断出错的细节
				fmt.Println("错误：长度小于0")
			}
			if err.widthNegative() {
				fmt.Println("错误：宽度小于0")
			}
			return
		}
		fmt.Println("错误：", err)
		return
	}
	fmt.Printf("面积是：%0.2f", area)
}
```

## 34 `panic`和`recover`

程序中一般是使用**错误**来处理异常情况。对于程序中出现的大部分异常情况，错误就已经够用了。但在有些情况，当程序发生异常时，无法继续运行。在这种情况下，我们会使用 `panic` 来终止程序。

```
panic-recover与try-catch-finally类似
```

平时尽可能使用`error`而不是`panic`

```go
func panic(interface{}) // panic的签名
```

示例：打印人的全名，不能缺失姓和名

```go
func fullName(firstName *string, lastName *string) {  
    if firstName == nil {
        panic("runtime error: first name cannot be nil")
    }
    if lastName == nil {
        panic("runtime error: last name cannot be nil")
    }
    fmt.Printf("%s %s\n", *firstName, *lastName)
    fmt.Println("returned normally from fullName")
}

func main() {  
    firstName := "Elon"
    fullName(&firstName, nil)
    fmt.Println("returned normally from main")
}
```

当函数发生 panic 时，它会终止运行，在执行完所有的延迟函数后，程序控制返回到该函数的调用方，执行调用方的延迟函数。这样的过程会一直持续下去，直到当前协程的所有函数都返回退出，然后程序会打印出 panic 信息，接着打印出堆栈跟踪，最后程序终止。

```go
func fullName(firstName *string, lastName *string) {
	defer fmt.Println("3")
	if firstName == nil {
		panic("runtime error: first name cannot be nil")
	}
	if lastName == nil {
		panic("runtime error: last name cannot be nil")
	}
	fmt.Printf("%s %s\n", *firstName, *lastName)
	fmt.Println("4")
}

func main() {
	defer fmt.Println("1")
	firstName := "Elon"
	fullName(&firstName, nil)
	fmt.Println("2")
}
/*
3
1
panic: runtime error: last name cannot be nil

goroutine 1 [running]:
main.fullName(0xc00011bf10, 0x0)
	D:/Environment/GoWorks/src/test/main.go:13 +0x2b0
main.main()
	D:/Environment/GoWorks/src/test/main.go:22 +0xd3
*/
```

`recover`：用于重新获得`panic`协程的控制

```go
func recover() interface{}
```

它使用在延迟函数的内部，获取到`panic`的错误信息，并且停止`panic`的续发事件，然后程序恢复正常。

示例

```go
func recoverName() { // 延迟函数内部
    if r := recover(); r!= nil { // 调用recover后停止了panic，然后返回调用方继续执行
        fmt.Println("recovered from ", r) // recovered from  runtime error: last name cannot be nil
    }
}

func fullName(firstName *string, lastName *string) {  
    defer recoverName()
    if firstName == nil {
        panic("runtime error: first name cannot be nil")
    }
    if lastName == nil {
        panic("runtime error: last name cannot be nil") // 这里
    }
    fmt.Printf("%s %s\n", *firstName, *lastName)
    fmt.Println("returned normally from fullName")
}

func main() {  
    defer fmt.Println("deferred call in main")
    firstName := "Elon"
    fullName(&firstName, nil)
    fmt.Println("returned normally from main")
}
```

只有在相同的 [Go 协程](https://studygolang.com/articles/12342)中调用 recover 才管用。`recover` 不能恢复一个不同协程的 panic。

```go
func recovery() {  
    if r := recover(); r != nil {
        fmt.Println("recovered:", r)
    }
}

func a() {  
    defer recovery()
    fmt.Println("Inside A")
    go b() // 将这句改成b()就可以正常恢复，因为这么改后就知道了b()的调用方，会继续执行调用方的defer
    time.Sleep(1 * time.Second)
}

func b() {  
    fmt.Println("Inside B")
    panic("oh! B panicked")
}

func main() {  
    a()
    fmt.Println("normally returned from main")
}
// 可能是因为b()是一个单独的协程，不知道它的调用方是谁，所以不能正常恢复
// 这里相同的协程指的是a还是main呢
```

运行时`panic`

运行时错误（如数组越界）也会导致 panic。这等价于调用了内置函数 `panic`，其参数由接口类型 [runtime.Error](https://golang.org/src/runtime/error.go?s=267:503#L1) 给出。`runtime.Error` 接口的定义如下：

```go
type Error interface {  
    error
    // RuntimeError is a no-op function but
    // serves to distinguish types that are run time
    // errors from ordinary errors: a type is a
    // run time error if it has a RuntimeError method.
    RuntimeError()
}
```

示例：创建一个运行时`panic`

```go
func a() {  
    n := []int{5, 7, 4}
    fmt.Println(n[3]) // 触发panic
    fmt.Println("normally returned from a")
}
func main() {  
    a()
    fmt.Println("normally returned from main")
}
```

恢复运行时`panic`

```go
func r() {  
    if r := recover(); r != nil {
        fmt.Println("Recovered", r)
    }
}

func a() {  
    defer r()
    n := []int{5, 7, 4}
    fmt.Println(n[3]) // 触发panic，调用defer，defer恢复
    fmt.Println("normally returned from a")
}

func main() {  
    a()
    fmt.Println("normally returned from main")
}
```

恢复后获得堆栈跟踪

因为恢复后是不会打印出堆栈跟踪的

```go
import (  
    "fmt"
    "runtime/debug"
)

func r() {  
    if r := recover(); r != nil {
        fmt.Println("Recovered", r)
        debug.PrintStack() // 在recover后打印堆栈跟踪
    }
}

func a() {  
    defer r()
    n := []int{5, 7, 4}
    fmt.Println(n[3])
    fmt.Println("normally returned from a")
}

func main() {  
    a()
    fmt.Println("normally returned from main")
}
```

## 35 头等函数——函数是一等公民

头等函数，`First Class Function`，可以把头等函数赋值给变量，也可以把函数作为其它函数的参数或者返回值。Go 语言支持头等函数的机制。

示例：将匿名函数赋给变量

```go
func main() {  
    a := func() {
        fmt.Println("hello world first class function")
    }
    a()
    fmt.Printf("%T", a)
}
// hello world first class function
// func()
```

另一种调用匿名函数的方法：使用`()`立即调用函数

```go
func main() {  
    func() {
        fmt.Println("hello world first class function")
    }()
}

func main1() {  
    func(n string) {
        fmt.Println("Welcome", n)
    }("Gophers")
} // 传递参数
```

自定义函数类型

示例

```go
type add func(a int, b int) int // 创建函数类型——add

func main() {  
    var a add = func(a int, b int) int { // 定义add类型的变量
        return a + b
    }
    s := a(5, 6)
    fmt.Println("Sum", s) // Sum 11
}
```

高阶函数

`Hiher-order Function`，满足一下条件之一：

- 接收一个或多个函数作为参数
- 返回值是一个函数

示例1：函数作为参数

```go
func simple(a func(a, b int) int) { // func(a, b int) int作为类型 
    fmt.Println(a(60, 7))
}

func main() {  
    f := func(a, b int) int {
        return a + b
    }
    simple(f)
}
```

示例2：返回一个函数

```go
func simple() func(a, b int) int { // 匿名函数，返回值类型是func(a, b int) int
    f := func(a, b int) int { // 定义一个这种类型的函数，返回它
        return a + b
    }
    return f
}

func main() {  
    s := simple()
    fmt.Println(s(60, 7))
}
```

闭包

当一个匿名函数所访问的变量定义在函数体的外部时，就称这样的匿名函数为闭包。

示例

```go
func main() {  
    a := 5
    func() {
        fmt.Println("a =", a)
    }()
}
// 每一个闭包都会绑定一个它自己的外围变量（Surrounding Variable）
```

示例2

```go
func appendStr() func(string) string {  
    t := "Hello"
    c := func(b string) string {
        t = t + " " + b
        return t
    }
    return c // c是一个闭包，返回了它，它绑定了t
}

func main() {  
    a := appendStr() // a是闭包，绑定了a的t
    b := appendStr() // b是闭包，绑定了b的t
    fmt.Println(a("World")) // Hello World，此时a的t变成了Hello World
    fmt.Println(b("Everyone")) // Hello Everyone，此时a的t变成了Hello Everyone

    fmt.Println(a("Gopher")) // Hello World Gopher
    fmt.Println(b("!")) // Hello Everyone !
}
```

头等函数的实际用途

示例

```go
type student struct { // 自定义学生类型
	firstName string
	lastName  string
	grade     string
	coutry    string
}

// 过滤符合要求的学生，参数2是用来判断每个学生是否符合筛选要求的函数
func filter(s []student, f func(student) bool) []student {
	var r []student
	for _, v := range s {
		if f(v) {
			r = append(r, v)
		}
	}
	return r // 返回符合要求的所有学生
}

func main() {
	s1 := student{"Nav", "Ram", "A", "India"} // 定义一个学生
	s2 := student{"Sam", "Johnson", "B", "USA"} // 再定义一个学生
	s := []student{s1, s2} // 学生们
	f := filter(s, func(s student) bool { // 筛选条件是grade为B的学生
		return s.grade == "B"
	})
	fmt.Println(f)
}
// 假设我们想要查找所有来自印度的学生，return s.country == "India"
```

示例：对集合中的每个元素进行操作的函数称为 `map` 函数。

```go
func iMap(s []int, f func(int) int) []int {
	var r []int
	for _, v := range s {
		r = append(r, f(v))
	}
	return r
}

func main() {
	a := []int{5, 6, 7, 8, 9}
	r := iMap(a, func(i int) int {
		return i * 5
	})
	fmt.Println(r)
}
// 对每个元素*5，当然可以直接r = append(r, v*5)
// 只不过上面这样写的，具体对元素怎样操作来自与我们，而不是一开始定义好的操作
```

## 36 反射

反射就是程序能够在运行时检查变量和值，求出它们的类型

如果程序中每个变量都是我们自己定义的，那么在编译时就可以知道变量类型了，为什么我们还需要在运行时检查变量，求出它的类型呢？

如果一个函数的形参是空接口，就需要在运行时检查类型了，因为空接口`interface{}`可以接收任意类型

`reflect` 包会帮助识别 [`interface{}`](https://studygolang.com/articles/12266) 变量的底层具体类型和具体值。

`reflect.Type` 表示 `interface{}` 的具体类型，而 `reflect.Value` 表示它的具体值。`reflect.TypeOf()` 和 `reflect.ValueOf()` 两个函数可以分别返回 `reflect.Type` 和 `reflect.Value`。这两种类型是我们创建查询生成器的基础。我们现在用一个简单的例子来理解这两种类型。

```go
import (
    "fmt"
    "reflect"
)

type order struct {
    ordId      int
    customerId int
}

func createQuery(q interface{}) { // 参数是空接口
    t := reflect.TypeOf(q) // 查询类型
    v := reflect.ValueOf(q) // 查询值
    fmt.Println("Type ", t) // Type  main.order，意为，mian包里的order类型
    fmt.Println("Value ", v) // Value  {456 56}


}
func main() {
    o := order{
        ordId:      456,
        customerId: 56,
    }
    createQuery(o)
}
```

`reflect` 包中还有一个重要的类型：[`Kind`](https://golang.org/pkg/reflect/#Kind)。在反射包中，`Kind` 和 `Type` 的类型可能看起来很相似，但在下面程序中，可以很清楚地看出它们的不同之处。

```go
type order struct {
    ordId      int
    customerId int
}

func createQuery(q interface{}) {
    t := reflect.TypeOf(q)
    k := t.Kind()
    fmt.Println("Type ", t) // Type  main.order
    fmt.Println("Kind ", k) // Kind  struct
}
func main() {
    o := order{
        ordId:      456,
        customerId: 56,
    }
    createQuery(o)
}
// Type 表示 interface{} 的实际类型（在这里是 main.Order)，而 Kind 表示该类型的特定类别（在这里是 struct）。
```

[`NumField()`](https://golang.org/pkg/reflect/#Value.NumField) 方法返回结构体中字段的数量，而 [`Field(i int)`](https://golang.org/pkg/reflect/#Value.Field) 方法返回字段 `i` 的 `reflect.Value`。

```go
type order struct {
    ordId      int
    customerId int
}

func createQuery(q interface{}) {
    if reflect.ValueOf(q).Kind() == reflect.Struct { // 检查q的类别是不是结构体，因为NumField()只能用于结构体
        v := reflect.ValueOf(q)
        fmt.Println("Number of fields", v.NumField())
        for i := 0; i < v.NumField(); i++ {
            fmt.Printf("Field:%d type:%T value:%v\n", i, v.Field(i), v.Field(i))
        }
    }

}
func main() {
    o := order{
        ordId:      456,
        customerId: 56,
    }
    createQuery(o)
}
```

[`Int`](https://golang.org/pkg/reflect/#Value.Int) 和 [`String`](https://golang.org/pkg/reflect/#Value.String) 可以帮助我们分别取出 `reflect.Value` 作为 `int64` 和 `string`。

```go
func main() {
    a := 56
    x := reflect.ValueOf(a).Int()
    fmt.Printf("type:%T value:%v\n", x, x) // type:int64 value:56 取出值转换为int64
    b := "Naveen"
    y := reflect.ValueOf(b).String() // type:string value:Naveen 取出值转换为string
    fmt.Printf("type:%T value:%v\n", y, y)
}
```

示例：好示例

```go
type order struct {
	ordId      int
	customerId int
}

type employee struct {
	name    string
	id      int
	address string
	salary  int
	country string
}

func createQuery(q interface{}) {
	if reflect.ValueOf(q).Kind() == reflect.Struct { // 判断类型是否是结构体
		t := reflect.TypeOf(q).Name() // 类型q的名称,例如reflect.TypeOf(q)是main.order,那么t是order，就是不包括包名的类型名称
		query := fmt.Sprintf("insert into %s values(", t)
		v := reflect.ValueOf(q)             // 取得值
		for i := 0; i < v.NumField(); i++ { // 遍历结构体
			switch v.Field(i).Kind() { // 判断每个字段的值的类别
			case reflect.Int:
				if i == 0 {
					query = fmt.Sprintf("%s%d", query, v.Field(i).Int()) // 组合查询语句
				} else {
					query = fmt.Sprintf("%s, %d", query, v.Field(i).Int())
				}
			case reflect.String:
				if i == 0 {
					query = fmt.Sprintf("%s\"%s\"", query, v.Field(i).String())
				} else {
					query = fmt.Sprintf("%s, \"%s\"", query, v.Field(i).String())
				}
			default:
				fmt.Println("Unsupported type")
				return
			}
		}
		query = fmt.Sprintf("%s)", query) // 最终组合
		fmt.Println(query)
		return
	}
	fmt.Println("unsupported type")
}

func main() {
	o := order{
		ordId:      456,
		customerId: 56,
	}
	createQuery(o)
	e := employee{
		name:    "Naveen",
		id:      565,
		address: "Coimbatore",
		salary:  90000,
		country: "India",
	}
	createQuery(e)
	i := 90
	createQuery(i)
}
```

什么时候用反射？迫不得已的时候。

## 37 读取文件

将整个文件读取到内存

需要使用 [`ioutil`](https://golang.org/pkg/io/ioutil/) 包中的 [`ReadFile`](https://golang.org/pkg/io/ioutil/#ReadFile) 函数。

示例：读取相同目录下的一个文件

```go
func main() {
	data, err := os.ReadFile("test.txt")
	if err != nil {
		fmt.Println("error ", err)
		return
	}
	fmt.Println("data: ", string(data))
}
```

可以进入项目目录下`go install`,安装到`bin`目录下，不过`os.ReadFile("test.txt")`的相对路径就不能用了，会报错。

使用绝对路径

```go
func main() {
	data, err := os.ReadFile("D:/Environment/GoWorks/src/test/test.txt")
	if err != nil {
		fmt.Println("error ", err)
		return
	}
	fmt.Println("data: ", string(data))
}
```

分块读取文件：使用`bufio`包

`flag`包：实现了命令行参数的解析，使用`flag.String()`, `Bool()`, `Int()`等函数注册`flag`，返回指针类型的解析结果。

`flag.String(name string, value string, usage string) *string`：参数1，命令行参数名称；参数2，默认值；参数3，提示信息。

```go
num := flag.Int("world",1234,"this is num")
name := flag.String("user","xiaoyu","我是小雨")
flag.Parse()  //在所有flag都注册之后，调用这个函数  默认值就是该变量的初始值。
fmt.Println(*num) // 1234
fmt.Println(*name) // xiaoyu
// 在命令行运行时类似 go run xxx -world=yyyy，这样num就是yyyy了
```

示例

```go
func main() {
    fptr := flag.String("fpath", "test.txt", "file path to read from")
    flag.Parse()
    data, err := os.ReadFile(*fptr)
    if err != nil {
        fmt.Println("File reading error", err)
        return
    }
    fmt.Println("Contents of file:", string(data))
}
// 运行二进制文件 GOPATH/bin/test -fpath=真实路径/test.txt
```

示例：分块读取

```go
func main() {
	fptr := flag.String("fpath", "test.txt", "file path to read from")
	flag.Parse()

	f, err := os.Open(*fptr) // 打开test.txt文本文件
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err = f.Close(); err != nil {
			log.Fatal(err)
		}
	}()
	r := bufio.NewReader(f) // 缓冲读取器
	b := make([]byte, 3)
	for {
		_, err := r.Read(b) // 将文件的字节读取到切片中，一次保存3个元素，也就是3个字节,当到达文件最后时，它会返回一个 EOF 错误。
		if err != nil {
			fmt.Println("Error reading file:", err)
			break
		}
		fmt.Println(string(b))
	}
}
/*
wel
com
e d
dd!
Error reading file: EOF
*/
```

逐行读取文件

逐行读取文件涉及到以下步骤。

1. 打开文件；
2. 在文件上新建一个 scanner；
3. 扫描文件并且逐行读取。

```go
func main() {
	fptr := flag.String("fpath", "test.txt", "file path to read from")
	flag.Parse()

	f, err := os.Open(*fptr)
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err = f.Close(); err != nil {
			log.Fatal(err)
		}
	}()
	s := bufio.NewScanner(f) // 用文件f创建一个scanner
	for s.Scan() {           // Scan方法读取文本的下一行，返回是否可以读取
		fmt.Println(s.Text()) // Text方法获取下一行的文本
	}
	err = s.Err()
	if err != nil {
		log.Fatal(err)
	}
}
```

## 38 写入文件

将字符串写入文件

1. 创建文件
2. 将字符串写入文件

```go
func main() {
	f, err := os.Create("test.txt") // 创建文件，如果有就获取此文件，然后清空文本
	if err != nil {
		fmt.Println(err)
		return
	}
	l, err := f.WriteString("Hello World") // 写入字符串，返回写入的字节数
	if err != nil {
		fmt.Println(err)
		f.Close() // 关闭文件
		return
	}
	fmt.Println(l, "bytes written successfully")
	err = f.Close() // 正常关闭文件
	if err != nil {
		fmt.Println(err)
		return
	}
}
```

将字节写入文件

```go
func main() {
	f, err := os.Create("test.txt") // 替换掉所有内容
	if err != nil {
		fmt.Println(err)
		return
	}
	d2 := []byte{104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100} // 字节切片
	n2, err := f.Write(d2) // 写入
	if err != nil {
		fmt.Println(err)
		f.Close()
		return
	}
	fmt.Println(n2, "bytes written successfully")
	err = f.Close()
	if err != nil {
		fmt.Println(err)
		return
	}
}
```

将字符串一行一行的写入文件

```go
func main() {
	f, err := os.Create("lines") // 会清空已有文件的内容
	if err != nil {
		fmt.Println(err)
		f.Close()
		return
	}
	d := []string{"Welcome to the world of Go1.", "Go is a compiled language.",
		"It is easy to learn Go."}
	for _, v := range d {
		fmt.Fprintln(f, v) // 将v写入f，按照，最后添加换行符
		if err != nil {
			fmt.Println(err)
			return
		}
	}
	// fmt.Fprintln(f, d[0], d[1], d[2]) // 3个元素间自动添加空格，最后一个元素写入后添加换行符
	err = f.Close()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("file written successfully")
}
```

追加到文件

```go
func main() {
	f, err := os.OpenFile("lines", os.O_APPEND|os.O_WRONLY, 0644) // 以写的方式打开文件，添加一行
	if err != nil {
		fmt.Println(err)
		return
	}
	newLine := "File handling is easy."
	_, err = fmt.Fprintln(f, newLine) // 往f里写入newLine
	if err != nil {
		fmt.Println(err)
		f.Close()
		return
	}
	err = f.Close()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("file appended successfully")
}
```

并发写文件

示例1

我们将写一个程序，该程序创建 100 个 goroutinues。每个 goroutinue 将并发产生一个随机数，届时将有 100 个随机数产生。这些随机数将被写入到文件里面。我们将用下面的方法解决这个问题 .

1. 创建一个 channel 用来读和写这个随机数。
2. 创建 100 个生产者 goroutine。每个 goroutine 将产生随机数并将随机数写入到 channel 里。
3. 创建一个消费者 goroutine 用来从 channel 读取随机数并将它写入文件。这样的话我们就只有一个 goroutinue 向文件中写数据，从而避免竞争条件。
4. 一旦完成则关闭文件。

```go
// 生产随机数，存到信道
func produce(data chan int, wg *sync.WaitGroup) {
	n := rand.Intn(999)
	data <- n
	wg.Done()
}

// 将随机数写入文件
func consume(data chan int, done chan bool) {
	f, err := os.Create("concurrent")
	if err != nil {
		fmt.Println(err)
		return
	}
	for d := range data {
		_, err := fmt.Fprintln(f, d)
		if err != nil {
			fmt.Println(err)
			f.Close()
			done <- false
			return
		}
	}
	err = f.Close()
	if err != nil {
		fmt.Println(err)
		done <- false
		return
	}
	done <- true
}

func main() {
	data := make(chan int)
	done := make(chan bool)
	wg := sync.WaitGroup{}
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go produce(data, &wg)
	}
	go consume(data, done)
	go func() {
		wg.Wait()
		close(data) // 关闭data信道，因为后面还有遍历信道，这个信道必须得关闭
	}()
	d := <-done
	if d {
		fmt.Println("cool")
	} else {
		fmt.Println("no")
	}
}
```

























## n 命令、函数

```javascript
go mod init // 初始化项目
go install projectName // 编译项目，会在文件夹内搜索拥有mian函数的文件，比如找到了hello.go，然后会产生一个名为hello.exe的文件，存放在工作区的bin文件夹。
go test // 运行当前目录下测试go文件(以_test.go结尾)的测试函数(以Test开头)
go test -v // 打印出测试具体信息
go build // 编译包及其依赖项，如果在hello包下编译，则在hello文件夹下生成hello.exe，运行.\hello.exe则会执行相应代码
go install // 编译并安装main包，生成二进制可执行文件，到GOPATH里的bin目录
go mod tidy // 引用项目需要的依赖增加到go.mod文件。
```

```go
make()
创建切片：make([]int, 5, 5) // 参数1：切片类型；参数2：切片长度；参数3：切片容量，可选
创建集合：make(map[T1]T2) // T1:键类型；T2:值类型
创建信道：make(chan int) // 信道 信道类型
创建缓冲信道：make(chan int, capacity) // 信道 信道类型 缓冲大小（默认为0，无缓冲）

copy()
复制切片: copy(s, t) // 将t复制一份给s，t和s指向不同，如果指定分配区间比如s[1:3]，那么则复制到这个区间

append()
追加切片: append(a, 1, 2, 3) // 往a切片里追加元素1,2,3, 如有需要，可扩容
append(a, b...) // 往a切片里追加b切片的内容
```

## n+1 包

```go
strconv包
strconv.Atoi(string) // 将字符串转int
strconv.Itoa(int) // int转string
strconv.ParseUint(string,16,32) // 将16进制字符串转换成10进制数字，string不能包含0x，参数2是要转换的进制，参数3是
```

```go
fmt包
fmt.Scan() // 扫描标准输入，将值按空白符分隔保存到参数中，参数是指针类型，换行符也是空白符，这种相比于bufio.Scanner()是需要确定数量的
fmt.Scanf() // 按指定格式输入，fmt.Scanf("0x%x", &num)
fmt.Sprintf() // 按格式拼接字符串，再返回
```

```go
sort包
sort.Stirngs([]string) // 按照字典进行排序
sort.Ints([]int) // 按照大小进行排序
```

```go
regexp包
regexp.MatchString(`\d+`, text) // 参数1，匹配模式字符串，参数2：要匹配的字符串，返回布尔值
```



## 其他

```go
str[i] // 返回字符对应的数字，a对应97，0对应48，再用string()转成字符就行了
```

