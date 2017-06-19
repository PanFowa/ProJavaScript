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
 * 获取元素的x（垂直，顶端）位置
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
function resetCSS(elem,prop) {
    var old={};
    //遍历每一个属性
    for(var i in prop){
        //记录旧的属性值
        old[i]=elem.style[i];
        //并设置新的值
        elem.style[i]=prop[i];
    }

    //返回已经变化的值的集合，预留给restoreCSS函数使用
    return old;
};

/**
 * 恢复CSS原有属性值，防止resetCSS函数的副作用的函数
 * @param elem
 * @param prop
 */
function restoreCSS(elem,prop) {
    //重置所有属性值，恢复它们的原有值
    for(var i in prop){
        elem.style[i]=prop[i];
    }
}


/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>元素尺寸 结束<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 */

