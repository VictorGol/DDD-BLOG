import{d as C,r,o as d,a as t,c,b as o,n as m,_ as b,e as s,f as u,g as _}from"./app.4a0bbb66.js";const v=["innerHTML"],x=C({__name:"card",props:{text:null},setup(l){const a=r(["rgba(245, 245, 245, .5)","rgba(255, 250, 240, .5)","rgba(250, 240, 230, .5)"][Math.floor(Math.random()*3)]),F=e=>{e?a.value=a.value.replace(".5","1"):a.value=a.value.replace("1",".5")},D=r();r(!1);const A=e=>{};return d(()=>{D.value&&clearTimeout(D.value)}),(e,p)=>(t(),c("div",{class:"wrap",style:m({backgroundColor:a.value}),onMouseover:p[1]||(p[1]=i=>F(!0)),onMouseleave:p[2]||(p[2]=i=>F(!1))},[o("div",{class:"text",innerHTML:l.text,onClick:p[0]||(p[0]=i=>A(l.text))},null,8,v)],36))}});const n=b(x,[["__scopeId","data-v-8ee2e7c3"]]),h=["src","alt"],f=C({__name:"cover",props:{url:null,alt:null},setup(l){return(y,a)=>(t(),c("img",{src:l.url,alt:l.alt},null,8,h))}});const g=b(f,[["__scopeId","data-v-97a7f8c9"]]),w=o("h1",{id:"_2023-\u5E74-2-\u6708",tabindex:"-1"},[u("2023 \u5E74 2 \u6708 "),o("a",{class:"header-anchor",href:"#_2023-\u5E74-2-\u6708","aria-hidden":"true"},"#")],-1),M=o("h2",{id:"\u968F\u8BB0",tabindex:"-1"},[u("\u968F\u8BB0 "),o("a",{class:"header-anchor",href:"#\u968F\u8BB0","aria-hidden":"true"},"#")],-1),E=_(`<h2 id="\u5B66\u4E60" tabindex="-1">\u5B66\u4E60 <a class="header-anchor" href="#\u5B66\u4E60" aria-hidden="true">#</a></h2><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// \u83B7\u53D6\u5F53\u524D\u65F6\u95F4\u5B57\u7B26\u4E32\uFF0C\u6BD4\u5982\uFF1A&#39;2/17/2023, 3:56:19\u202FPM&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Date</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toLocaleString</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// el-table\u5408\u5E76\u5355\u5143\u683C\uFF0C\u5728el-table\u5143\u7D20\u91CC\u5199\u4E0A:span-method=&quot;spanMethod&quot;</span></span>
<span class="line"><span style="color:#82AAFF;">spanMethod</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> row</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> column</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> rowIndex</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> columnIndex </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u53C2\u6570\u5206\u522B\u4EE3\u8868\uFF1A\u5F00\u59CB\u884C\u7D22\u5F15\u3001\u5F00\u59CB\u5217\u7D22\u5F15\u3001\u5408\u5E76\u51E0\u884C\u3001\u5408\u5E76\u51E0\u5217</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">temp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> [</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">rowIndex</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">temp</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">columnIndex</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">temp</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">]) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            rowspan</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">temp</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">2</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">            colspan</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">temp</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">3</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u8FD9\u4E2A\u6761\u4EF6\u662F\u6E05\u9664\u5408\u5E76\u5355\u5143\u683C\u540E\u6570\u636E\u51FA\u73B0\u504F\u79FB\u7684\u60C5\u51B5</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// \u8FD9\u4E48\u5199\u7684\u539F\u56E0\u8BF7\u53C2\u8003https://blog.csdn.net/qq_42887496/article/details/124047061</span></span>
<span class="line"><span style="color:#89DDFF;">	</span><span style="color:#676E95;">// \u5B83\u672C\u8D28\u662F\u5C06\u4E00\u4E2A\u5355\u5143\u683C\u53D8\u6210\u51E0\u884C\u51E0\u5217\u7684\u683C\u5B50\uFF0C\u539F\u6765\u5728\u5B83\u65C1\u8FB9\u7684\u683C\u5B50\u4F1A\u88AB\u6324\u5F00\uFF0C\u6240\u4EE5\u8981\u5C06\u88AB\u6324\u5F00\u7684\u683C\u5B50\u5220\u6389</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">rowIndex</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">temp</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">rowIndex</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">temp</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">temp</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">2</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">             </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">columnIndex</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">temp</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">columnIndex</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">temp</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">temp</span><span style="color:#F07178;">[</span><span style="color:#F78C6C;">3</span><span style="color:#F07178;">]) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            rowspan</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">            colspan</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// \u751F\u6210\u8FDE\u7EED\u6570\u7EC4</span></span>
<span class="line"><span style="color:#A6ACCD;">Array</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">from</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">length</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">12</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">_</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\u6708</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,4),k=JSON.parse('{"title":"2023 \u5E74 2 \u6708","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u968F\u8BB0","slug":"\u968F\u8BB0","link":"#\u968F\u8BB0","children":[]},{"level":2,"title":"\u5B66\u4E60","slug":"\u5B66\u4E60","link":"#\u5B66\u4E60","children":[]}],"relativePath":"2023/february.md","lastUpdated":1676624085000}'),I={name:"2023/february.md"},j=Object.assign(I,{setup(l){return(y,a)=>(t(),c("div",null,[w,s(g,{url:"https://images.unsplash.com/photo-1675937695032-e0ef7f5c1644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",alt:"\u4E16\u754C\u4E3A\u4F60\u95EA\u70C1"}),M,s(n,{text:"\u4E00\u4E2A\u4EBA\u8981\u662F\u9886\u609F\u5230\u4ED6\u7684\u6BCF\u4E00\u4E2A\u767D\u663C\uFF0C\u4E0D\u8FC7\u662F\u53E6\u4E00\u4E2A\u591C\u665A\uFF0C\u9886\u609F\u5230\u4ED6\u7684\u4E24\u53EA\u773C\u775B\u7B49\u4E8E\u522B\u4EBA\u7684\u4E00\u53EA\u773C\u775B\uFF0C\u90A3\u4E48\u4ED6\u5C31\u4F1A\u594B\u529B\u53BB\u6C42\u7D22\u771F\u6B63\u7684\u767D\u663C\u3002"}),s(n,{text:`\u9E1F\u4E3A\u4EC0\u4E48\u4F1A\u98DE\uFF1F<br>
\u672C\u80FD\u5417\uFF1F<br>
\u8FD8\u662F\u60F3\u8981\u98DE\uFF1F<br>
\u9E1F\u4E3A\u4EC0\u4E48\u60F3\u8981\u98DE\uFF1F<br>
\u65E0\u6CD5\u56E0\u4E3A\u60F3\u8981\uFF0C\u5C31\u80FD\u591F\u505A\u5230\u3002\u4ED6\u4EEC\u5FC5\u987B\u98DE\u4E0A\u5929\u9645\u3002`}),s(n,{text:"\u5018\u82E5\u5C06\u65F6\u95F4\u7684\u523B\u5EA6\u5411\u540E\u62E8\u52A8\u5343\u5E74\uFF0C\u4ED6\u4EEC\u5F53\u4E2D\u7684\u6BCF\u4E00\u4E2A\u4EBA\uFF0C\u90FD\u5C06\u4F5C\u4E3A\u6587\u660E\u7684\u5148\u9A71\uFF0C\u4EE5\u4E0D\u540C\u7684\u65B9\u5F0F\u88AB\u5386\u53F2\u957F\u4E45\u5730\u94ED\u8BB0\u3002"}),s(n,{text:`\u667A\u5EA6\u8D2F\u7A7F\u53E4\u4ECA\u7684\u5148\u8D24\uFF0C\u4ED6\u4EEC\u88AB\u5982\u6B64\u79F0\u547C\u7740\u3002<br>
\u5728\u90A3\u65F6\u5B83\u6240\u62E5\u6709\u7684\uFF0C\u5E76\u975E\u662F\u5411\u795E\u660E\u7948\u6C42\u540E\u5F97\u5230\u7684\u53CC\u7FFC\u3002`}),s(n,{text:`\u4E00\u4E2A\u4EBA\u7684\u547D\u8FD0\uFF0C\u5C31\u662F\u4ED6\u7684\u6027\u683C\uFF1F<br><br>
\u4ED6\u9009\u62E9\u4E86\u4E00\u9897\u5353\u8D8A\u7684\u5934\u8111\uFF0C\u4E00\u9897\u503C\u5F97\u8DDF\u968F\u7684\u5FC3\u7075\uFF0C\u542C\u4ECE\u5BF9\u65B9\u7684\u5B89\u6392\uFF0C\u628A\u5BF9\u65B9\u7684\u547D\u8FD0\u5F53\u4F5C\u81EA\u5DF1\u7684\u547D\u8FD0\u3002`}),s(n,{text:`\u4E16\u754C\u4E0A\u53EA\u5B58\u5728\u4E00\u79CD\u7406\u60F3\uFF0C\u8DF5\u8E0F\u4ED6\u4EBA\u7684\u7406\u60F3<br>
\u4EFB\u4F55\u4E00\u79CD\u7406\u60F3\uFF0C\u90FD\u975E\u5F97\u8DF5\u8E0F\u8FC7\u4ED6\u4EBA\u7684\u7406\u60F3\u4E4B\u540E\u624D\u6709\u53EF\u80FD\u5B9E\u73B0<br>
\u800C\u4ED6\u4EEC\u7684\u7406\u60F3\uFF0C\u662F\u5E0C\u671B\u81EA\u5DF1\u7684\u7406\u60F3\u5F97\u5230\u8DF5\u8E0F<br>
\u4E16\u754C\u8FD0\u8F6C\u7684\u89C4\u5219\uFF0C\u4E8B\u5B9E\u4E0A\u662F\u7531\u4ED6\u4EEC\u6765\u7EF4\u7CFB\u7684`}),s(n,{text:`\u4F5C\u4E3A\u8FD9\u767E\u5E74\u95F4\u4EBA\u667A\u7684\u9876\u70B9\uFF0C\u5728\u601D\u8003\u4E86\u4E00\u751F\u4E4B\u540E\uFF0C\u4F60\u80FD\u7ED9\u51FA\u7684\u7B54\u6848\u53C8\u662F\u4EC0\u4E48\uFF1F<br><br>
\u6709\u4E9B\u4EBA\u7684\u98DE\u7FD4\uFF0C\u6B63\u662F\u4E3A\u4E86\u5760\u843D\u3002<br>
\u5728\u4ED6\u5F88\u5C0F\u7684\u65F6\u5019\uFF0C\u5C31\u4EB2\u53E3\u8FD9\u6837\u8BF4\u8FC7\u2014\u2014\u6211\u5C06\u98DE\u4E0A\u5929\u9645\uFF0C\u5E76\u4E14\u4EE5\u5760\u843D\u8FCE\u63A5\u81EA\u5DF1\u7684\u80DC\u5229\u3002<br>
\u6211\u98DE\u5230\u4E86\u592A\u9633\u7684\u9762\u524D\u2014\u2014\u6CA1\u6709\u4EFB\u4F55\u4EBA\u5230\u8FBE\u8FC7\u7684\u5730\u65B9\u3002<br><br>
\u6240\u4EE5\u4F0A\u5361\u6D1B\u65AF\u7684\u7406\u60F3\u6839\u672C\u4E0D\u662F\u9003\u79BB\u90A3\u5EA7\u5C9B\uFF0C\u4ED6\u7684\u7406\u60F3\u662F\u63A5\u8FD1\u592A\u9633\uFF0C\u5E76\u4E14\u7518\u613F\u4EE5\u5760\u843D\u6765\u7ED3\u675F\u81EA\u5DF1\u7684\u751F\u547D\u3002<br><br>
\u6240\u4EE5\uFF0C\u6216\u8BB8\u4E5F\u6709\u4EBA\u80FD\u591F\u5C06\u6211\u8DE8\u8D8A\u3002\u8FD9\u5C31\u662F\u6240\u8C13\u7684\u8BA9\u4ED6\u4EBA\u8DF5\u8E0F\u81EA\u5DF1\u7684\u7406\u60F3\uFF0C\u8BA9\u540E\u4EBA\u8D85\u8D8A\u81EA\u5DF1\u3002\u8FD9\u662F\u53E6\u4E00\u79CD\u82F1\u96C4\uFF0C\u4ED6\u4EEC\u671F\u5F85\u7740\u81EA\u5DF1\u88AB\u8DE8\u8D8A\uFF08\u8DF5\u8E0F\uFF09\uFF0C\u800C\u4ED6\u4EEC\u63A8\u52A8\u7740\u4EBA\u7C7B\u6587\u660E\u7684\u8FDB\u6B65\u3002`}),s(n,{text:`\u9E1F\u4E3A\u4EC0\u4E48\u4F1A\u98DE\uFF1F<br><br>
\u56E0\u4E3A\u5B83\u4EEC\u66FE\u7ECF\u89C1\u5230\u8FC7\uFF0C\u6700\u521D\u7684\u9E1F\u4EE5\u4E00\u9897\u9AD8\u8D35\u5982\u6708\u7684\u5FC3\u810F\uFF0C\u8BD5\u56FE\u89E6\u6478\u5929\u9876\uFF0C\u5374\u5760\u4EA1\u5728\u4E86\u5730\u9762\u4E0A\u3002\u662F\u56E0\u4E3A\u88AB\u82F1\u96C4\u6FC0\u52B1\u3002<br><br>
\u56E0\u4E3A\u5B83\u4EEC\u66FE\u7ECF\u89C1\u5230\u8FC7\uFF0C\u540E\u6765\u7684\u9E1F\u540C\u6837\u505A\u51FA\u7C7B\u4F3C\u7684\u5C1D\u8BD5\uFF0C\u5E76\u4E14\u8D8A\u98DE\u8D8A\u9AD8\u3002<br>
\u6240\u4EE5\u6B64\u523B\uFF0C\u9E1F\u624D\u4ECD\u7136\u76D8\u65CB\u4E8E\u5929\u9645\u3002`}),s(n,{text:`\u7B2C\u4E00\u7C7B\u82F1\u96C4\u662F\u5927\u5BB6\u719F\u77E5\u7684\u90A3\u4E00\u7C7B\uFF0C\u7B2C\u4E8C\u7C7B\u82F1\u96C4\u5C31\u662F\u6700\u521D\u7684\u9E1F\u3002<br>
\u7B2C\u4E8C\u7C7B\u82F1\u96C4\u4E4B\u540E\u4F1A\u4E0D\u65AD\u6D8C\u73B0\u51FA\u7B2C\u4E00\u7C7B\u82F1\u96C4\uFF0C\u6240\u4EE5\uFF0C\u4ED6\u624D\u4F1F\u5927\u3002<br><br>
\u4F0A\u5361\u6D1B\u65AF\u4E5F\u662F\u7B2C\u4E8C\u7C7B\u82F1\u96C4\uFF0C\u4ED6\u7684\u5760\u843D\u662F\u98DE\u884C\u7684\u6210\u679C\uFF0C\u662F\u53E6\u4E00\u79CD\u80DC\u5229\uFF0C\u56E0\u4E3A\u5728\u4ED6\u4E4B\u540E\uFF0C\u4F1A\u6709\u65E0\u6570\u7684\u4F0A\u5361\u6D1B\u65AF\u4F1A\u98DE\u8D77\u6765\u3002<br>
\u8BF4\u8D77\u6765\uFF0C\u4F0A\u5361\u6D1B\u65AF\u5C31\u662F\u6700\u521D\u7684\u90A3\u53EA\u9E1F\u554A\u3002<br><br>
\u51EF\u6587\u7684\u770B\u6CD5\uFF1A\u4F0A\u5361\u6D1B\u65AF\u662F\u4E3A\u4E86\u593A\u8D70\u6240\u6709\u4EBA\u7684\u5149\u8292\uFF0C\u5982\u679C\u6709\u4EBA\u60F3\u593A\u56DE\u5149\u8292\uFF0C\u90A3\u4E48\u4ED6\u5C31\u5FC5\u987B\u98DE\u7684\u6BD4\u4F0A\u5361\u6D1B\u65AF\u9AD8\u3002`}),s(n,{text:`\u4ED6\u662F\u4ED6\u4EEC\u8FD9\u7FA4\u4EBA\u5F53\u4E2D\u6700\u9AD8\u8D35\u7684\u4E00\u4E2A\u7F57\u9A6C\u4EBA\uFF1A<br>
\u6240\u6709\u7684\u8FD9\u4E9B\u9634\u8C0B\u5BB6\u4E2D\uFF0C<br>
\u53EA\u6709\u4ED6\u2014\u2014<br>
\u53EA\u6709\u4ED6\u4E0D\u662F\u56E0\u4E3A\u5AC9\u5992\u90A3\u4F1F\u5927\u7684\u51EF\u6492<br>
\u53EA\u6709\u4ED6\u662F\u51FA\u4E8E\u4E00\u79CD\u6734\u7D20\u7684\u516C\u4E49<br>
\u4ED6\u4E3A\u4E86\u5927\u4F17\u7684\u5229\u76CA\uFF0C\u6700\u7EC8\u53C2\u52A0\u4E86\u4ED6\u4EEC\u7684\u9635\u7EBF\u3002<br>
\u4ED6\u4E00\u751F\u7EAF\u826F\uFF0C\u4EA4\u7EC7\u5728\u4ED6\u8EAB\u4E0A\u7684\u4E00\u5207\uFF0C\u53EF\u4EE5\u4F7F\u4E0A\u5929\u4E5F\u8083\u7136\u8D77\u656C\u3002\u5E76\u5411\u5168\u4E16\u754C\u8BF4\u2014\u2014\u8FD9\u662F\u4E00\u4E2A\u5927\u5199\u7684\u4EBA\uFF01`}),s(n,{text:"\u5373\u4F7F\u672A\u6765\u4E0D\u80FD\u6539\u53D8\uFF0C\u6211\u4E5F\u8981\u81EA\u5DF1\u51B3\u5B9A\u5230\u8FBE\u90A3\u4E2A\u7ED3\u679C\u7684\u8FC7\u7A0B"}),E]))}});export{k as __pageData,j as default};
