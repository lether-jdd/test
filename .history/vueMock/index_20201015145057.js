//响应式模仿
const callbacks = []
function nextTick(cb) {
  callbacks.push(cb)
  //使用micro或者macro 执行callbacks 中的内容
  Promise.resolve().then(() => {
    callbacks && callbacks.forEach(cb => {
      cb()
    })
  })
}

const queue = []
function queueWatcher(watcher) {
  queue.push(watcher)
  nextTick(flushSchedulerQueue)
}

function flushSchedulerQueue() {
  queue.forEach(watcher => {
    watcher.run()
  })
}

class vm {
  constructor(opt) {
    this.opt = opt // 这里还有个问题
    this.initData()
  }
  initData() {
    let data = this.opt.data
    this.reactive(data)
  }
  reactive(data) {
    //这里需要将实例的key代理到opt.data中
    Object.keys(data).forEach(key => {  
      let val = data[key]
      this.reactive(val) //监听子属性
      let deps = new Deps()
      // let watch = new watcher(() => { 
      //   console.log('页面更新了。。。。')
      // })
      Object.defineProperty(data, key, {
        get() {
          if (Deps.target) {
            //往obsrver里面添加watcher 
            deps.depend() //为什么不直接deps.addSub(Deps.target)
            //对于children的处理  数组及循环依赖的处理
          }
          // if (watcher.target) { 
          //   watcher.target.addDep(watcher.target)
          // }
          return val
        },
        set(newVal) {
          deps.notify()
          // watch.update()
          val = newVal //注意：这里是通过闭包来实现的
        }
      })
    })
  }
}

class Deps { // 收集依赖
  constructor() { 
    this.subs = []  //存的是watcher实例
  }
  addSub(sub) { 
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(watcher => { 
      watcher.update()
    })
  }
  depend() { //往dep里面添加watcher  为什么不直接添加？
    if (Deps.target) {
      Deps.target.addDep(this)  //将watcher添加到subs
      console.log(this.subs)
    }
  }
}

class watcher {  //通知更新
  constructor(cb) { 
    this.cb = cb 
  }
  addDep(dep) { 
    dep.addSub(this)  //将watcher添加到deps的subs
  }
  update() { 
    queueWatcher(this)
  }
  run() { 
    this.cb()
  }
}


let instance = new vm({ data: { a: 1, b: 2 } })
Deps.target = new watcher(() => { console.log('更新') })
instance.opt.data.a 
instance.opt.data.a = '222'


//关于编译的部分
//因为遍历解析的过程有多次操作dom节点，为提高性能和效率，会先将vue实例根节点的el转换成文档碎片fragment进行解析编译操作，解析完成，再将fragment添加回原来的真实dom节点中
function Compile(el) {
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el);
    this.init();
    this.$el.appendChild(this.$fragment);
  }
}
Compile.prototype = {
  init: function () { this.compileElement(this.$fragment); },
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(), child;
    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }
    return fragment;
  }
};
//编译模板
Compile.prototype = {
  compileElement: function (el) {
    var childNodes = el.childNodes, me = this;
    [].slice.call(childNodes).forEach(function (node) {
      var text = node.textContent;
      var reg = /\{\{(.*)\}\}/;	// 表达式文本
      // 按元素节点方式编译
      if (me.isElementNode(node)) {
        me.compile(node);
      } else if (me.isTextNode(node) && reg.test(text)) {
        me.compileText(node, RegExp.$1);
      }
      // 遍历编译子节点
      if (node.childNodes && node.childNodes.length) {
        me.compileElement(node);
      }
    });
  },

  compile: function (node) {
    var nodeAttrs = node.attributes, me = this;
    [].slice.call(nodeAttrs).forEach(function (attr) {
      // 规定：指令以 v-xxx 命名
      // 如 <span v-text="content"></span> 中指令为 v-text
      var attrName = attr.name;	// v-text
      if (me.isDirective(attrName)) {
        var exp = attr.value; // content
        var dir = attrName.substring(2);	// text
        if (me.isEventDirective(dir)) {
          // 事件指令, 如 v-on:click
          compileUtil.eventHandler(node, me.$vm, exp, dir);
        } else {
          // 普通指令
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }
      }
    });
  }
};
// 指令处理集合
var compileUtil = {
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text');
  },
  // ...省略
  bind: function (node, vm, exp, dir) {
    var updaterFn = updater[dir + 'Updater'];
    // 第一次初始化视图
    updaterFn && updaterFn(node, vm[exp]);
    // 实例化订阅者，此操作会在对应的属性消息订阅器中添加了该订阅者watcher
    new Watcher(vm, exp, function (value, oldValue) {
      // 一旦属性值有变化，会收到通知执行此更新函数，更新视图
      updaterFn && updaterFn(node, value, oldValue);
    });
  }
};

// 更新函数
var updater = {
  textUpdater: function (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  }
  // ...省略
};


//关于将data代理到vm实例上
proxy(vm, `_data`, key)
function proxy(target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}


//关于数组
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
/**
 * Intercept mutating methods and emit events
 */
// 遍历 methodsToPatch 数组，对其中的方法进行重写
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  // def 方法定义在 lang.js 文件中，是通过 object.defineProperty 对属性进行重新定义。
  // 即在 arrayMethods 中找到我们要重写的方法，对其进行重新定义
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      // 上面已经分析过，对于 push，unshift 会新增索引，所以需要手动 observe
      case 'push':
      case 'unshift':
        inserted = args
        break
      // splice 方法，如果传入了第三个参数，也会有新增索引，所以也需要手动 observe
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // push，unshift，splice 三个方法触发后，在这里手动 observe，其他方法的变更会在当前的索引上进行更新，所以不需要再执行 ob.observeArray
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})

