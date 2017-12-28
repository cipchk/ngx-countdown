export interface Config {
    /**
     * 自定义模板，如果为空以组件 innerHTML 为准，再不然使用默认值。
     *
     * @type {string}
     * @default $!h!时$!m!分$!s!秒
     */
    template?: string;

    /**
     * 按需启动，需调用 `begin()` 开始启动，默认：`false`
     */
    demand?: boolean;

    /**
     * 尺寸
     *
     * @type {('lite' | 'medium' | 'large')}
     * @default lite
     */
    size?: 'lite' | 'medium' | 'large';

    /**
     * 剩余时间，单位：秒
     * 指的是根据服务端计算剩余时间值进行倒计时。
     *
     * @type {number}
     */
    leftTime?: number;

    /**
     * 结束时间，单位：UNIX时间戳 ms
     * 指的是根据本地时间至结束时间进行倒计时
     *
     * @type {number}
     * @memberOf Config
     */
    stopTime?: number;

    /**
     * 模板解析正则表达式
     * 有时候由于模板结构比较特殊，无法根据默认的表达式进行解析，那就需要修改它。
     *
     * @type {RegExp}
     * @default /\$\{([\-\w]+)\}/g
     */
    varRegular?: RegExp;

    /**
     * 时钟控制数组，特殊需求时可以修改，里面是三元组：指针名、进制、位数，可参考大于99小时demo
     *
     * @type {any[]}
     * @default ['d', 100, 2, 'h', 24, 2, 'm', 60, 2, 's', 60, 2, 'u', 10, 1]
     */
    clock?: any[];

    /**
     * 第xx秒时调用 notify 函数，值必须是正整数
     *
     * @type {number[]}
     */
    notify?: number[];

    /**
     * 自定义类名
     *
     * @type {string}
     */
    className?: string;

    /**
     * 重绘
     */
    repaint?: Function;
}
