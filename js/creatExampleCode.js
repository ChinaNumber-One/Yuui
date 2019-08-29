let html = `&lt;!<span class="html-b">DOCTYPE</span> <span class="html-s">html</span>&gt;
              &lt;<span class="html-b">html</span> <span class="html-s">lang</span>=<span class="html-z">"en"</span>&gt;
              &lt;<span class="html-b">head</span>&gt;
                  &lt;<span class="html-b">meta</span> <span class="html-s">charset</span>=<span class="html-z">"UTF-8"</span>&gt;
                  &lt;<span class="html-b">title</span>&gt;代码示例&lt;/<span class="html-b">title</span>&gt;
                  &lt;<span class="html-b">link</span> <span class="html-s">rel</span>=<span class="html-z">"stylesheet"</span> <span class="html-s">href</span>=<span class="html-z">"yuui.css"</span>&gt;
                  <span class='html-zs'>/* btn 样式省略*/</span>
              &lt;/<span class="html-b">head</span>&gt;
              &lt;<span class="html-b">body</span>&gt;
                  &lt;<span class="html-b">div</span> <span class="html-s">class</span>=<span class="html-z">"btn"</span>&gt;显示&lt;/<span class="html-b">div</span>&gt;
                  &lt;<span class="html-b">div</span> <span class="html-s">id</span>=<span class="html-z"></span>"as"</span>&gt;&lt;/<span class="html-b">div</span>&gt;
              &lt;/<span class="html-b">body</span>&gt;
              &lt;/<span class="html-b">html</span>&gt;
              &lt;<span class="html-b">script</span> <span class="html-s">src</span>=<span class="html-z">"https://code.jquery.com/jquery-3.1.1.min.js"</span>&gt;&lt;/<span class="html-b">script</span>&gt;
              &lt;<span class="html-b">script</span> <span class="html-s">src</span>=<span class="html-z">'yuui.js'</span>&gt;&lt;/<span class="html-b">script</span>&gt;
              &lt;<span class="html-b">script</span>&gt;
                  <span class="html-s">$</span>(<span class="html-j">function</span> () {
                      <span class="html-j">let</span> op1 <span class="html-b">=</span> {
                          domId: <span class="html-z">'as'</span>,
                          buttons: [
                            {
                              name:<span class="html-z">"上"</span>,
                              value: <span class="html-z">"top"</span>
                            },
                            {
                              name:<span class="html-z">"中"</span>,
                              value:  <span class="html-z">"middle"</span>
                            },
                            {
                              name:<span class="html-z">"下"</span>,
                              value: <span class="html-z">"bottom"</span>
                            }
                          ]
                      }
                      Yuui.<span class="html-s">createActionSheet</span>(op1)
                          .<span class="html-s">actionSheetShow</span>(<span class="html-z">'as'</span>)
                          .<span class="html-s">getActionSheetData</span>( <span class="html-c ">value</span> <span class="html-s">=></span> {
                            <span class="html-j">let</span> opts <span class="html-b">=</span> {
                                text: <span class="html-z">"name:"</span><span class="html-b">+</span>value.name<span class="html-b">+</span><span class="html-z">";value:"</span><span class="html-b">+</span>value.value,
                                position: value.value
                              }
                              Yuui.<span class="html-s">createToast</span>(opts)
                      })
                      <span class="html-s">$</span>(<span class="html-z">'.btn'</span>).<span class="html-s">click</span>(<span class="html-j">function</span>(){
                          Yuui.<span class="html-s">actionSheetShow</span>(<span class="html-z">'as'</span>)
                      })
                  })
              &lt;/<span class="html-b">script</span>&gt;`
$('.doc1-2 pre').append(html)