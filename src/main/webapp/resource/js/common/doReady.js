/**
 * Created by think on 2017/6/15.
 */
function domReady(f) {
    //假如DOM已加载，马上执行函数
    if(domReady.done){ return f();};
    //假如我们已经添加了一个函数
    if(domReady.timer){
        //把它加到待执行函数清单中
        domReady.ready.push(f);
    }else{
        //为页面加载完毕绑定一个事件
        //以防它最先完成。使用addEvent
        addEvent(window,"load",isDOMReady);
        //初始化待执行函数的数组
        domready.ready=[f];
        //尽可能快地检查
    }
}