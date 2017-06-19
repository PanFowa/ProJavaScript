/**
 * Created by Administrator on 2017/6/17.
 */
/**
 * 阻止事件冒泡。事件冒泡和浏览器的默认行为不一样
 * @param e 上下文对象
 */
function stopBubble(e) {
    //如果传入了事件对象，那就是非IE浏览器
    if (e && e.stopPropagation()) {
        //因此它支持w3c的stopPropagation()方法
        e.stopPropagation();
    } else {
        //否则我们将使用ie的方式来取消事件冒泡
        window.event.cancelBubble = true;
    }
}

/**
 * 防止浏览器的默认行为。
 * 默认行为可以归结为没有明确指令而浏览器自动执行的行为。
 * @param e 上下为对象
 * @returns {boolean} 处理函数本身也需要返回false(false本身也从stopDefault中返回)
 */
function stopDefault(e) {
    //防止默认浏览器行为
    if (e && e.preventDefault) {
        e.preventDefault();
    } else {
        //ie中阻止浏览器行为的捷径
        window.event.returnValue = false;
    }
    return false;
}

/**
 * 将<a>标签的内容在iframe中显示，并取消<a>标签的默认行为
 * @param frameId frame的id
 */
function loadPageContentToIframe(frameId) {
    var frameTag = document.getElementById(frameId);
    //获取页面的所有<a>标签，并重载鼠标单击事件
    var aTags = document.getElementsByName("a");
    for (var i = 0; i < aTags.length; i++) {
        aTags[i].onclick = function (e) {
            //设置iframe的src为<a>的href
            frameTag.src = aTags.href;
            //停止<a>标签的默认行为（防止其访问href所指向的网站，这是一个默认行为）
            return stopDefault(e);
        }
    }
};

/**
 * 给元素绑定事件
 * @param element 元素
 * @param type 事件类型
 * @param handler 回调函数
 */
function addEvent(element, type, handler) {
    //为每一个事件处理函数赋予一个独立的id
    if (!handler.$$guid) {
        handler.$$guid = addEvent.guid++;
    }
    //为元素建立一个事件类型的散列表
    if (!element.events) {
        element.events = {};
    }

    //为每对元素/事件建立一个事件处理函数的散列表
    var handlers = element.events[type];
    if (!handlers) {
        handlers = element.events[type] = {};
        //存储已有的事件处理函数（如果已存在一个）
        if (element["on" + type]) {
            handlers[0] = element["on" + type];
        }
    }
    //在散列表中存储该事件处理函数
    handlers[handler.$$guid] = handler;
    //赋予一个全局事件处理函数来处理所有工作
    element["on" + type] = handlerEvent;
};
//创建独立的ID计算器
addEvent.guid = 1;

function removeEvent(element, type, handler) {
    //从散列表中删除事件处理函数
    if (element.events && element.events[type]) {
        delete element.events[type][handler.$$guid];
    }
};

function handlerEvent(event) {
    var returnValue=true;
    //获取事件对象（IE使全局的事件对象）
    event = event || fixEvent(window.event);
    //获取事件处理函数的引用
    var handlers = this.events[event.type];
    //依次执行每个事件处理函数
    for (var i in handlers) {
        this.$$handlerEvent = handlers[i];
        if (this.$$handlerEvent(event) === false) {
            returnValue = false;
        }
    }

    return returnValue;
};
//增加一些IE事件对象的缺乏的方法
function fixEvent(event) {
//增加W3C标准事件方法
    event.preventDefault = fixEvent.preventDefault;
    event.stopPropagation = fixEvent.stopPropagation;
    return event;
};

fixEvent.preventDefault = function () {
    this.returnValue = false;
};
fixEvent.stopPropagation = function () {
    this.cancelBubble = true;
};