(function () {
  let yuApi = {
    actionSheetOptions: {},
    actionSheetContentDom: null,
    createActionSheet(opts) {
      let options = Object.assign({
        domId: null,
        title: '',
        desc: '',
        position: 'bottom',
        buttons: [{
          name: '1、createActionSheet(options)创建',
        }, {
          name: '2、actionSheetShow()显示',
        }, {
          name: '3、getActionSheetData(callback)获取值'
        }, {
          name: '4、actionSheetHide()关闭'
        }],
        iconPosition: 'left',
        closeOnclickMask: true,
        closeOnclickMenu: true,
        showCancel: false,
        concelText: '取消',
        concelTextStyle: {
          color: '#f32836',
          textAlign: 'center',
          fontSize: '14px'
        },
        buttonTextStyle: {
          color: "#333",
          textAlign: "left",
          fontSize: '14px'
        }
      }, opts)
      this.actionSheetOptions = options
      if (options.domId) {
        this.actionSheetContentDom = document.getElementById(options.domId)
      } else {
        console.error('Yuui错误:domId为必传项!')
        return
      }
      let actionSheetHtml = '',
        title = '',
        cancelBtn = '',
        buttons = ''
      if (options.title || options.desc) {
        title = `<div class="yu-actionSheetTitle yu-border-1px-b">
										${options.title ? `<div style="line-height:25px;">${options.title}</div>` : ''}
										${options.desc ? `<div style="font-size:12px;color:#999;line-height:18px;">${options.desc}</div>` : ''}
								 </div>`
      }
      if (options.showCancel) {
        cancelBtn = `<div class="yu-actionSheetCancelBtn yu-border-1px-b yu-mt-12px"
														style="color:${options.concelTextStyle.color};
																	text-align:${options.concelTextStyle.textAlign};
																	font-size:${options.concelTextStyle.fontSize};">
														${options.concelText}
													</div>`
      }
      if (options.buttons && options.buttons.length) {
        buttons = ''
        options.buttons.forEach((item, index) => {
          let actionAsheetBtnContext = ''
          if (options.iconPosition === 'left') {
            actionAsheetBtnContext = `${item.icon ? `<img data-value='${JSON.stringify(item)}' src="${item.icon}" class="yu-actionSheetBtnIcon">` : ''}<div class="yu-actionSheetBtnText" data-value='${JSON.stringify(item)}'>${item.name ? item.name : ''}</div>`
          } else {
            actionAsheetBtnContext = `<div class="yu-actionSheetBtnText" data-value='${JSON.stringify(item)}'>${item.name ? item.name : ''}</div>${item.icon ? `<img src="${item.icon}" class="yu-actionSheetBtnIcon" data-value='${JSON.stringify(item)}'>` : ''}`
          }
          buttons += `<div class='yu-actionSheetBtn ${index !== options.buttons.length - 1 ? "yu-border-1px-b" : ""}' 
											data-value='${JSON.stringify(item)}'
											style="color:${options.buttonTextStyle.color};
											font-size:${options.buttonTextStyle.fontSize};
											text-align:${options.buttonTextStyle.textAlign}">				

												${actionAsheetBtnContext}
											</div>`
        })
      }

      actionSheetHtml = `<div class="yu-actionSheetMask">
															<div class="yu-actionSheetList yu-actionSheetList-${options.position} ">
																${title}
																${buttons}
																${cancelBtn}
															</div>
                          </div>`;
      let actionAsheetNode = document.createElement('div')
      actionAsheetNode.innerHTML = actionSheetHtml
      this.actionSheetContentDom.appendChild(actionAsheetNode)
      if (options.closeOnclickMask) {
        this.actionSheetContentDom.getElementsByClassName('yu-actionSheetMask')[0].onclick = (e) => {
          e.stopPropagation()
          this.actionSheetHide()
        }

      }
      if (options.showCancel) {
        this.actionSheetContentDom.getElementsByClassName('yu-actionSheetCancelBtn')[0].onclick = (e) => {
          e.stopPropagation()
          this.actionSheetHide()
        }
      }
      return this
    },
    actionSheetShow(domId) {
      if (!this.actionSheetContentDom) {
        console.error('Yuui错误：请先调用createActionSheet() 方法创建节点！')
        return
      }
      if (domId) {
        this.actionSheetContentDom = document.getElementById(domId)
      }
      this.actionSheetContentDom.getElementsByClassName('yu-actionSheetMask')[0].style.display = 'block'
      this.actionSheetContentDom.getElementsByClassName('yu-actionSheetList')[0].style.display = 'block'
      if (this.actionSheetOptions.position == 'middle') {
        this.actionSheetContentDom.getElementsByClassName('yu-actionSheetMask')[0].style.opacity = 1
        this.actionSheetContentDom.getElementsByClassName('yu-actionSheetList-middle')[0].style.top =
          (this.actionSheetContentDom.getElementsByClassName('yu-actionSheetMask')[0].offsetHeight -
            this.actionSheetContentDom.getElementsByClassName('yu-actionSheetList-middle')[0].offsetHeight) / 2 + 'px'
      } else {
        let step = 0
        let animateTimer = setInterval(() => {
          step++
          if (step > 50) {
            clearInterval(animateTimer)
            step = 0
            return
          }
          this.actionSheetContentDom.getElementsByClassName('yu-actionSheetMask')[0].style.opacity = step * 0.02
          this.actionSheetContentDom.getElementsByClassName('yu-actionSheetList')[0].style.maxHeight = step + '%'
        }, 1)
      }

      return this
    },
    actionSheetHide(domId) {
      if (!this.actionSheetContentDom) {
        console.error('Yuui错误：请先调用createActionSheet 方法调用发生错误！')
        return
      }
      if (domId) {
        this.actionSheetContentDom = document.getElementById(domId)
      }
      if (this.actionSheetOptions.position == 'middle') {
        this.actionSheetContentDom.getElementsByClassName('yu-actionSheetList')[0].style.display = 'none'
        this.actionSheetContentDom.getElementsByClassName('yu-actionSheetMask')[0].style.display = 'none'
      } else {
        let step = 50
        let animateTimer = setInterval(() => {
          step--
          if (step < 0) {
            clearInterval(animateTimer)
            step = 50
            this.actionSheetContentDom.getElementsByClassName('yu-actionSheetList')[0].style.display = 'none'
            this.actionSheetContentDom.getElementsByClassName('yu-actionSheetMask')[0].style.display = 'none'
            return
          }
          this.actionSheetContentDom.getElementsByClassName('yu-actionSheetList')[0].style.maxHeight = step + '%'
          this.actionSheetContentDom.getElementsByClassName('yu-actionSheetMask')[0].style.opacity = step * 0.02
        }, 1)
      }

      this.isCreated = false
      return this
    },
    getActionSheetData(fn) {
      if (!this.actionSheetContentDom) {
        console.error('Yuui错误：请先调用createActionSheet 方法调用发生错误！')
        return
      }

      let buttons = this.actionSheetContentDom.getElementsByClassName('yu-actionSheetBtn')
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = (e) => {
          e.stopPropagation()
          if (!fn) {
            console.error('Yuui错误：getActionSheetData() 方法中回调函数为必填项！')
            return
          }
          if (this.actionSheetOptions.closeOnclickMenu) {
            this.actionSheetHide()
          }

          return fn(JSON.parse(e.target.dataset.value))
        }
      }
    },
    createToast(opts) {
      // create
      let toastShowTimer = null;
      let toastHideTimer = null;
      if (toastShowTimer) {
        clearInterval(toastShowTimer)
      }
      if (toastHideTimer) {
        clearInterval(toastHideTimer)
      }
      let options = {}
      if (typeof opts === 'string') {
        options = {
          text: opts,
          type: 'text',
          position: 'bottom',
          duration: 1000
        }
      } else {
        options = Object.assign({
          text: 'Hello Yuui !',
          type: 'text',
          position: 'bottom',
          duration: 1000
        }, opts)
      }
      if (options.type !== 'text') {
        options.position = 'middle'
      }
      if (options.type === 'loading') {
        options.duration = 0
      }
      let toastHtml = `
                        <div class="yu-toast yu-toast-${options.position}-${options.type}" style="min-width:8em;">
                            ${options.type !== 'text' ? `<div style="flex:1;display:flex;align-items: center;"><img src="./img/toast-${options.type}.png" class='yu-toastIcon'> </div>` : ''}
                          <div class="yu-toast-text" style="${options.type !== 'text' ? 'margin-bottom: 4px' : ''}">${options.text}</div>
                        </div>
                      
                      `
      let toastNode = document.createElement('div')
      toastNode.setAttribute('class', 'yu-toastMask')
      toastNode.innerHTML = toastHtml
      document.body.appendChild(toastNode)
      // show
      let totalHeight = 30;
      let opacity = 0;
      let step = 15;
      let cheight = 0;
      if (options.position === 'middle') {
        if (options.type === 'text') {
          document.getElementsByClassName('yu-toast')[0].style.height = (document.getElementsByClassName('yu-toast-text')[0].offsetHeight + 24) + "px"
        }
        document.getElementsByClassName('yu-toast')[0].style.position = 'statick'
      }
      toastShowTimer = setInterval(() => {
        cheight += step
        step = Math.ceil(step / 2)
        opacity += 1 / 5
        document.getElementsByClassName('yu-toast')[0].style.opacity = opacity
        if (options.position === 'bottom') {
          document.getElementsByClassName('yu-toast')[0].style.bottom = cheight + 'px'
          if (cheight >= totalHeight) {
            clearInterval(toastShowTimer)
          }
        } else if (options.position === 'top') {
          document.getElementsByClassName('yu-toast')[0].style.top = cheight + 'px'
          if (cheight >= totalHeight) {
            clearInterval(toastShowTimer)
          }
        } else if (options.position === 'middle') {
          if (opacity >= 1) {
            clearInterval(toastShowTimer)
          }
        }
      }, 20)
      // duration ！== 0 自动隐藏
      if (options.duration) {
        setTimeout(() => {
          clearInterval(toastShowTimer)
          toastHideTimer = setInterval(() => {
            cheight -= step
            step = Math.ceil(step * 2)
            opacity -= 1 / 5
            document.getElementsByClassName('yu-toast')[0].style.opacity = opacity
            if (options.position === 'bottom') {
              document.getElementsByClassName('yu-toast')[0].style.bottom = cheight + 'px'
              if (cheight <= 0) {
                clearInterval(toastHideTimer)
                document.getElementsByClassName('yu-toastMask')[0].style.display = 'none'
                document.body.removeChild(document.getElementsByClassName('yu-toastMask')[0])
              }
            } else if (options.position === 'top') {
              document.getElementsByClassName('yu-toast')[0].style.top = cheight + 'px'
              if (cheight <= 0) {
                clearInterval(toastHideTimer)
                document.getElementsByClassName('yu-toastMask')[0].style.display = 'none'
                document.body.removeChild(document.getElementsByClassName('yu-toastMask')[0])
              }
            } else if (options.position === 'middle') {
              if (opacity <= 0) {
                clearInterval(toastHideTimer)
                document.getElementsByClassName('yu-toastMask')[0].style.display = 'none'
                document.body.removeChild(document.getElementsByClassName('yu-toastMask')[0])
              }
            }
          }, 20)
        }, options.duration)
      }
      return this
    },
    toastHide() {
      if (document.getElementsByClassName('yu-toastMask')[0]) {
        document.getElementsByClassName('yu-toastMask')[0].style.display = 'none'
        document.body.removeChild(document.getElementsByClassName('yu-toastMask')[0])
      } else {
        console.error('Yuui:Toast未创建或已隐藏')
      }
      return this
    }
  }
  this.Yuui = yuApi
})()
