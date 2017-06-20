/**
 * Created by think on 2017/6/19.
 */
/**
 * Created by Administrator on 2017/6/18.
 */
/**
 * 获取指定元素的样式
 * @param elem
 * @param name
 */
function getStyle(elem, name) {
    //如果属性存在于style[]中，那么它已被设置了（并且是当前的）
    if (elem.style[name]) {
        return elem.style[name];
        //否则，尝试使用IE的方法
    } else if (elem.currentStyle) {
        return elem.currentStyle[name];
    } else if (document.defaultView && document.defaultView.getComputedStyle) {
        //它使用的是通用的‘text-align’的样式规则，而非'textAlign'
        name = name.replace(/[A-Z]/g, "-$1");
        name = name.toLocaleLowerCase();
        //获取样式对象并获取属性（存在的话）的值
        var s = document.defaultView.getComputedStyle(elem, "");
        return s && s.getPropertyValue(name);
    } else {//否则使用的是其他浏览器
        return null;
    }
};
/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>获取位置 开始<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 */
/**
 * ---------------------------------------------------->
 * 两个确定元素相对于整个文档的x和y位置的辅助函数
 * <----------------------------------------------------
 */
/**
 * 获取元素的x（水平，左端）位置
 * @param elem
 */
function pageX(elem) {
    //查看我们是否位于根元素
    return elem.offsetParent ?
        //如果我们能够得到上一个元素，增加当前偏移量并继续向上递归
    elem.offsetLeft + pageX(elem.offsetParent) :
        //否则获取当前的偏移量
        elem.offsetLeft;
};
/**
 * 获取元素的y（垂直，顶端）位置
 * @param elem
 */
function pageY(elem) {
    //查看我们是否位于根元素
    return elem.offsetParent ?
        //如果我们能够得到上一个元素，增加当前偏移量并继续向上递归
    elem.offsetTop + pageY(elem.offsetParent) :
        //否则获取当前的偏移量
        elem.offsetParent;
};


/**
 * ---------------------------------------------------->
 * 确定元素相对于父亲的位置的两个函数
 * <----------------------------------------------------
 */
/**
 * 获取元素相对于父亲的水平位置
 * @param elem
 * @returns {*}
 */
function parentX(elem) {
    //如果offsetParent是父元素，提前退出
    return elem.parentNode == elem.offsetParent ? elem.offsetLeft :
        //否则我们需要找出元素和元素的父亲相对于整个页面的位置，并计算他们之间的差
    pageX(elem) - pageX(elem.parentNode);
};

/**
 * 获取元素相对于父亲的垂直位置
 * @param elem
 * @returns {*}
 */
function parentY(elem) {
    //如果offsetParent是父元素，提前退出
    return elem.parentNode == elem.offsetParent ? elem.offsetTop :
        //否则我们需要找出元素和元素的父亲相对于整个页面的位置，并计算他们之间的差
    pageY(elem) - pageY(elem.parentNode);
};

/**
 * ---------------------------------------------------->
 * 获取元素相对于它的CSS容器的辅助函数。
 * 即使元素包含在一个元素内，但可以相对于其他的父亲元素而定位（相对和绝对定位）
 * <----------------------------------------------------
 */

/**
 * 查找元素的左端位置
 * @param elem
 * @returns {Number}
 */
function posX(elem) {
    //获取最终样式并得到数据
    return parseInt(getStyle(elem, "left"));
};

/**
 * 查找元素的顶端位置
 * @param elem
 * @returns {Number}
 */
function posY(elem) {
    //获取最终样式并得到数据
    return parseInt(getStyle(elem, "top"));
};

/**
 * ---------------------------------------------------->
 * 与获取元素的位置相比，设置位置更缺乏弹性。但是结合不同的布局手段（绝对，相对，定位）
 * 就可以得到有可比性也可用的结果
 * 设置元素x和y位置（与当前位置无关）的一对函数
 * <----------------------------------------------------
 */

/**
 *设置元素水平位置的函数
 */
function setX(elem, pos) {
    //使用像素单位设置css的'left'属性
    elem.style.left = pos + "px";
};

/**
 *设置垂直位置的函数
 */
function setY(elem, pos) {
    //使用像素单位设置css的'top'属性
    elem.style.top = pos + "px";
};


/**
 * ---------------------------------------------------->
 * 设置元素相对于它之前最后一次变更位置之间的差距。
 * 调整元相对于当前位置的距离的一对函数
 * <----------------------------------------------------
 */
/**
 * 在元素的水平位置上添加像素距离的函数
 * @param elem
 * @param pos
 */
function addX(elem, pos) {
//获取当前水平位置，然后添加偏移量
    setX(posX(elem) + pos);
};

/**
 * 在元素的垂直位置上添加像素距离的函数
 * @param elem
 * @param pos
 */
function addY(elem, pos) {
//获取当前垂直位置，然后添加偏移量
    setY(posY(elem) + pos);
};

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>获取位置 结束<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 */

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>元素尺寸 开始<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 * 找出元素的高度和宽度很容易，也很困难，取决于它所处的不同场合。在大多数情况下，仅需使用getStyle函数的
 * 修改版本就可得到元素的当前高度和宽度
 */
/**
 * 获取元素的真实高度(使用css最终样式值)
 * @param elem
 * @returns {Number}
 */
function getHeight(elem) {
    return parseInt(getStyle(elem, "height"));
}

/**
 * 获取元素的真实宽度(使用css最终样式值)
 * @param elem
 * @returns {Number}
 */
function getWidth(elem) {
    return parseInt(getStyle(elem, "width"));
}
/**
 * getHeight和getWidth函数对于元素有指定高度、宽度或者display:none时不能正常获取值，需要使用fullHeight,fullWidth
 *
 */
/**
 * 查找元素完整的、可能的高度
 * @param elem
 */
function fullHeight(elem) {
    //如果元素是显示的，使用offsetHeight就能得到高度，如果没有offsetHeight,则使用getHeight
    if (getStyle(elem, "display") != "none") {
        return elem.offsetHeight || getHeight(elem);
    }
    //否则，我们必须处理display为none的元素，所以重置它的css属性以获取更精确的读数
    var old = resetCSS(elem, {display: "", visibility: "hidden", position: "absolute"});
    //使用clientHeight找出元素的完整高度，如果还不生效，则使用getHeight函数
    var h = elem.clientHeight || getHeight(elem);
    //最后，不要忘记恢复CSS的原有属性
    restoreCSS(elem, old);
    //并返回元素的完整高度
    return h;
};

/**
 * 查找元素完整的、可能的宽度
 * @param elem
 */
function fullWidth(elem) {
    //如果元素是显示的，使用offsetHeight就能得到高度，如果没有offsetHeight,则使用getHeight
    if (getStyle(elem, "display") != "none") {
        return elem.offsetWidth || getWidth(elem);
    }
    //否则，我们必须处理display为none的元素，所以重置它的css属性以获取更精确的读数
    var old = resetCSS(elem, {display: "", visibility: "hidden", position: "absolute"});
    //使用clientWidth找出元素的完整高度，如果还不生效，则使用getWidth函数
    var w = elem.clientWidth || getWidth(elem);
    //最后，不要忘记恢复CSS的原有属性
    restoreCSS(elem, old);
    //并返回元素的完整宽度
    return w;
};

/**
 * 设置CSS一组属性的函数，它可以恢复到原有设置
 * @param elem
 * @param prop
 * @returns {{}}
 */
function resetCSS(elem, prop) {
    var old = {};
    //遍历每一个属性
    for (var i in prop) {
        //记录旧的属性值
        old[i] = elem.style[i];
        //并设置新的值
        elem.style[i] = prop[i];
    }

    //返回已经变化的值的集合，预留给restoreCSS函数使用
    return old;
};

/**
 * 恢复CSS原有属性值，防止resetCSS函数的副作用的函数
 * @param elem
 * @param prop
 */
function restoreCSS(elem, prop) {
    //重置所有属性值，恢复它们的原有值
    for (var i in prop) {
        elem.style[i] = prop[i];
    }
}


/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>元素尺寸 结束<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 */


/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>元素的可见性 开始<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 * 控制元素的可见性可通过visibility（值有visiable,hidden）;
 * display(值有inline--未打破普通文档流,block--打破普通文档流,none--打破普通文档流);
 * opacity（0-100；0--完全透明）
 */
/**
 * 使用display隐藏元素的函数
 * @param elem
 */
function hide(elem) {
    //找出元素display的当前状态
    var curDisplay = getStyle(elem, 'display');
    //记录它的display状态
    if (curDisplay != 'none') {
        elem.$oldDisplay = curDisplay;
    }
    //设置display为none(即隐藏了元素)
    elem.style.display = 'none';
};
/**
 * 使用display显示元素的函数
 * @param elem
 */
function show(elem) {
    //设置display属性未它的原始值，如没有记录有原始值，则使用block
    elem.style.display = elem.$oldDisplay || '';
};
/**
 * 调节元素的透明度的函数
 * @param elem
 * @param level
 */
function setOpacity(elem, level) {
    //如果存在属性filters，则它是IE，所以设置元素的Alpha滤镜
    if (elem.filters) {
        elem.style.filters = 'alpha(opacity=' + level + ')';
    } else {
        elem.style.opacity = level / 100;
    }
};

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>元素的可见性 结束<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 *
 */

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>动画 开始<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 *
 */

/**
 * 通过短时间内增加高度逐步显示隐藏元素的函数
 * @param elem
 */
function slideDown(elem) {
    //从0高度开始滑动
    elem.style.height = 0 + "px";
    //先显示元素，但是看不到它（因为高度为0）
    show(elem);
    //找到元素的完整的潜在高度
    var h = fullHeight(elem);
    //我们在1秒钟内执行20帧的动画
    for (var i = 0; i <= 100; i += 5) {
        //保证我们能够保持正确的‘i’的闭包函数
        (function () {
            var pos = i;
            //设置timeout以让它能在指定的时间点运行
            setTimeout(function () {
                //设置元素的新高度
                elem.style.height = ((pos / 100) * h) + "px";
            }, (pos + 1) * 10);
        })();
    }
};

/**
 * 渐显。通过透明度逐渐显示元素比通过高度逐渐显示元素的方式更为平滑，用户体验更好
 * 通过短时间内增加透明度逐步显示隐藏元素的函数
 * @param elem
 */
function fadeIn(elem) {
    //从0透明度开始
    setOpacity(elem, 0);
    //先显示元素，但是看不到它（因为透明度为0）
    show(elem);
    for (var i = 0; i <= 100; i += 5) {
        //保证我们能够保持正确的‘i’的闭包函数
        (function () {
            var pos = i;
            //设置timeout以让它能在指定的时间点运行
            setTimeout(function () {
                //设置元素的新高度
                setOpacity(elem, pos);
            }, (pos + 1) * 10);
        })();
    }
};

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>动画 结束<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 *获取鼠标的位置是编写拖放操作和上下文菜单的基础，这两种效果都只能通过Javascript和CSS的相互作用产生
 * 首先需要确定的两个变量是，光标相对于整个页面的x和y位置。因为只能从鼠标事件中才能得到鼠标坐标的信息，所以需要通过一般的鼠标事件来捕获
 * 比如mousemove或者mousedown
 */
/**
 *获取光标的水平位置
 * @param e
 * @returns {Number|number}
 */
function getX(e) {
    //标准化事件对象
    e = e || window.event;
    //先检查非IE浏览器的位置，再检查IE浏览器的位置
    return e.pageX || e.clientX + document.body.scrollLeft;
};

/**
 *获取光标的垂直位置
 * @param e
 * @returns {Number|number}
 */
function getY(e) {
    //标准化事件对象
    e = e || window.event;
    //先检查非IE浏览器的位置，再检查IE浏览器的位置
    return e.pageY || e.clientY + document.body.scrollTop;
};

/**
 * 最后，与鼠标相关的变量还有，光标相对于它当前正在交互的元素的x和y位置
 */
/**
 * 获取鼠标相对于当前元素（事件对象‘e’的属性target）的x位置
 * @param e
 * @returns {*|Number}
 */
function getElementX(e) {
    //获取正确的元素偏移量
    return (e && e.layerX) || window.event.offsetX;
};

/**
 * 获取鼠标相对于当前元素（事件对象‘e’的属性target）的y位置
 * @param e
 * @returns {*|Number}
 */
function getElementY(e) {
    //获取正确的元素偏移量
    return (e && e.layerY) || window.event.offsetY;
};
/**
 * 返回页面的高度（增加内容的时候可能会改变）
 */
function pageHeight() {
    return document.body.scrollHeight;
};

/**
 * 返回页面的宽度（增加内容的时候可能会改变）
 */
function pageWidth() {
    return document.body.scrollWidth;
};
/**
 * 确定浏览器水平滚动条的函数
 */
function scrollX() {
    //一个快捷放肆，用在IE6/7严格模式中
    var de = document.documentElement;
    //如果浏览器存在pageXoffset属性，则使用它
    return self.pageXOffset ||
        //否则，尝试获取根节点的左端滚动的偏移量
        (de && de.scrollLeft) ||
        //最后，尝试获取body元素的左端滚动的偏移量
        document.body.scrollLeft;
};

/**
 * 确定浏览器垂直滚动条的函数
 */
function scrollY() {
    //一个快捷放肆，用在IE6/7严格模式中
    var de = document.documentElement;
    //如果浏览器存在pageYoffset属性，则使用它
    return self.pageYOffset ||
        //否则，尝试获取根节点的顶端滚动的偏移量
        (de && de.scrollTop) ||
        //最后，尝试获取body元素的顶端滚动的偏移量
        document.body.scrollTop;
};

/**
 * 获取视口的高度
 */
function windowHeight() {
    //一个快捷放肆，用在IE6/7严格模式中
    var de = document.documentElement;
    //如果浏览器存在innerHeight属性，则使用它
    return self.innerHeight ||
        //否则，尝试获取根节点的高度偏移量
        (de && de.clientHeight) ||
        //最后，尝试获取body元素的高度偏移量
        document.body.clientHeight;
};

/**
 * 获取视口的宽度
 */
function windowWidth() {
    //一个快捷放肆，用在IE6/7严格模式中
    var de = document.documentElement;
    //如果浏览器存在innerWidth属性，则使用它
    return self.innerWidth ||
        //否则，尝试获取根节点的宽度偏移量
        (de && de.clientWidth) ||
        //最后，尝试获取body元素的宽度偏移量
        document.body.clientWidth;
};
