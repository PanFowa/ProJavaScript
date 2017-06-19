/**
 * Created by think on 2017/6/14.
 */
/**
 *提供了一个简单的方法，把函数与构造函数的原型关联起来。之所以有效，是因为所以的构造函数本身都是函数，
 * 所以能获得"method"这个新方法
 * @param name
 * @param fun
 * @returns {Function}
 */
Function.prototype.method = function (name, fun) {
    this.prototype[name] = fun;
    return this;
}

/**
 * 提供简单的单对象继承，它的代码主要围绕在任意对象方法中调用this.uber('methodName')为中心，
 * 并让这个uber方法去执行它要覆盖的父对象的方法。这是javascript继承模型中并未内建的部分。
 */
Function.method("inherits", function (parent) {
    //记录我们目前所在父层次的级数
    var depth = 0;
    //继承父对象的方法
    var proto = this.prototype = new parent();
    //创建一个新的名为"uber"的特权函数
    this.method("uber", function (name) {
        var func;//要执行的函数
        var ret;//函数的返回值
        var v = parent.prototype;//父对象的prototype
        //如果我们已经在某个uber函数里面
        if (depth) {
            //上溯必要的depth,以找到原始的prototype
            for (var i = d; i > 0; i += 1) {
                v = v.constructor.prototype;
            }
            //从该prototype中获得函数
            func = v[name];

        } else {//否则这就是uber函数的第一次调用
            func = proto[name];
            //如果此函数属于当前的prototype
            if (func == this[name]) {
                //则改为调用父对象的prototype
                func = v[name];
            }
        }

        //记录我们在继承堆栈中所在位置的级数
        //使用除第一个以外所有的arguments调用此函数
        //(因为第一个参数是执行的函数名)
        ret = func.apply(this, Array.prototype.slice(arguments, [1]));
        //恢复继承堆栈
        depth -= 1;
        //返回执行过的函数的返回值
        return ret;
    })
});

/**
 * 只继承父对象特定函数的函数。而非使用new parent()继承所有的函数
 * 这是.method函数的增强版，可以用于从单一父对象获取多个函数。
 * 如果用在多个父对象上就能获得可用的多对象继承
 */
Function.method("swiss", function (parent) {
    //遍历所有要继承的方法
    for (var i = 1; i < arguments.length; i += 1) {
        //需要导入的方法名
        var name = arguments[i];
        //将此方法导入this对象的prototype中
        this.prototype[name] = parent.prototype[name];
    }
    return this;
})