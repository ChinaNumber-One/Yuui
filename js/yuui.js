(function () {
  let yuApi = {
    options: {},
    contentDom: null,
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
      this.options = options
      if (options.domId) {
        this.contentDom = document.getElementById(options.domId)
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
      this.contentDom.appendChild(actionAsheetNode)
      if (options.closeOnclickMask) {
        this.contentDom.getElementsByClassName('yu-actionSheetMask')[0].onclick = (e) => {
          e.stopPropagation()
          this.actionSheetHide()
        }

      }
      if (options.showCancel) {
        this.contentDom.getElementsByClassName('yu-actionSheetCancelBtn')[0].onclick = (e) => {
          e.stopPropagation()
          this.actionSheetHide()
        }
      }
      return this
    },
    actionSheetShow(domId) {
      console.log(this.options)
      if (!this.contentDom) {
        console.error('Yuui错误：请先调用createActionSheet() 方法创建节点！')
        return
      }
      if (domId) {
        this.contentDom = document.getElementById(domId)
      }
      this.contentDom.getElementsByClassName('yu-actionSheetMask')[0].style.display = 'block'
      this.contentDom.getElementsByClassName('yu-actionSheetList')[0].style.display = 'block'
      if (this.options.position == 'middle') {
        this.contentDom.getElementsByClassName('yu-actionSheetMask')[0].style.opacity = 1
        this.contentDom.getElementsByClassName('yu-actionSheetList-middle')[0].style.top =
          (this.contentDom.getElementsByClassName('yu-actionSheetMask')[0].offsetHeight -
            this.contentDom.getElementsByClassName('yu-actionSheetList-middle')[0].offsetHeight) / 2 + 'px'
      } else {
        let step = 0
        let animateTimer = setInterval(() => {
          step++
          if (step > 50) {
            clearInterval(animateTimer)
            step = 0
            return
          }
          this.contentDom.getElementsByClassName('yu-actionSheetMask')[0].style.opacity = step * 0.02
          this.contentDom.getElementsByClassName('yu-actionSheetList')[0].style.maxHeight = step + '%'
        }, 1)
      }

      return this
    },
    actionSheetHide(domId) {
      if (!this.contentDom) {
        console.error('Yuui错误：请先调用createActionSheet 方法调用发生错误！')
        return
      }
      if (domId) {
        this.contentDom = document.getElementById(domId)
      }
      if (this.options.position == 'middle') {
        this.contentDom.getElementsByClassName('yu-actionSheetList')[0].style.display = 'none'
        this.contentDom.getElementsByClassName('yu-actionSheetMask')[0].style.display = 'none'
      } else {
        let step = 50
        let animateTimer = setInterval(() => {
          step--
          if (step < 0) {
            clearInterval(animateTimer)
            step = 50
            this.contentDom.getElementsByClassName('yu-actionSheetList')[0].style.display = 'none'
            this.contentDom.getElementsByClassName('yu-actionSheetMask')[0].style.display = 'none'
            return
          }
          this.contentDom.getElementsByClassName('yu-actionSheetList')[0].style.maxHeight = step + '%'
          this.contentDom.getElementsByClassName('yu-actionSheetMask')[0].style.opacity = step * 0.02
        }, 1)
      }

      this.isCreated = false
      return this
    },
    getActionSheetData(fn) {
      if (!this.contentDom) {
        console.error('Yuui错误：请先调用createActionSheet 方法调用发生错误！')
        return
      }

      let buttons = this.contentDom.getElementsByClassName('yu-actionSheetBtn')
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = (e) => {
          e.stopPropagation()
          if (!fn) {
            console.error('Yuui错误：getActionSheetData() 方法中回调函数为必填项！')
            return
          }
          if (this.options.closeOnclickMenu) {
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
      let options = Object.assign({
        text: 'Hello Yuui !',
        type: 'text',
        position: 'bottom',
        duration: 1000
      }, opts)
      if (options.type !== 'text') {
        options.position = 'middle'
      }
      this.options = options
      let toastHtml = `
                        <div class="yu-toast yu-toast-${options.position}">
                          ${options.type !== 'text' ? `<img src="../img/toast-${options.type}" class='yu-toastIcon'>` : ''}
                          <span>${options.text}</span>
                        </div>
                      `
      let toastNode = document.createElement('div')
      toastNode.setAttribute('class', 'yu-toastMask')
      toastNode.innerHTML = toastHtml
      document.body.appendChild(toastNode)
      // show
      let totalHeight =  30;
      console.log(totalHeight)
      let opacity = 0;
      let step = 15;
      let cheight = -document.getElementsByClassName('yu-toast')[0].offsetHeight;
      toastShowTimer = setInterval(() => {
        cheight += step
        step = step/2 > 1?step/2:1
        opacity += 1 / 8
        
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
        }
        console.log(cheight)
      }, 20)
      // duration ！== 0 自动隐藏
      // if (options.duration) {
      //   setTimeout(() => {
      //     clearInterval(toastShowTimer)
      //     toastHideTimer = setInterval(() => {
      //       step -= .2
      //       console.log(step)
      //       cheight -= 20 / step
      //       opacity -= 1 / 6
      //       document.getElementsByClassName('yu-toast')[0].style.opacity = opacity
      //       if (options.position === 'bottom') {
      //         document.getElementsByClassName('yu-toast')[0].style.bottom = cheight + 'px'
      //         if (cheight <= -document.getElementsByClassName('yu-toast')[0].offsetHeight) {
      //           clearInterval(toastHideTimer)
      //           document.getElementsByClassName('yu-toastMask')[0].style.display = 'none'
      //           document.body.removeChild(document.getElementsByClassName('yu-toastMask')[0])
      //         }
      //       } else if (options.position === 'top') {
      //         document.getElementsByClassName('yu-toast')[0].style.top = cheight + 'px'
      //         if (cheight <= -document.getElementsByClassName('yu-toast')[0].offsetHeight) {
      //           clearInterval(toastHideTimer)
      //           document.getElementsByClassName('yu-toastMask')[0].style.display = 'none'
      //           document.body.removeChild(document.getElementsByClassName('yu-toastMask')[0])
      //         }
      //       }
            

      //     }, 10)
      //   }, options.duration)
      // }
    }
  }
  this.Yuui = yuApi
})()
