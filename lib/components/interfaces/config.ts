export interface Config {
  /**
   * Custom render template, if is empty use the `<ng-content>` content, and `$!s-ext!` it's `0.1s` accuracy, Default: `$!h!时$!m!分$!s!秒`
   */
  template?: string;

  /**
   * start the counter on demand, must call `begin()` to starting, Default: `false`
   */
  demand?: boolean;

  /**
   * Calculate the remaining time based on the server, e.g: `10`,`5.5`, (Unit: seconds)
   */
  leftTime?: number;

  /**
   * 结束时间，单位：UNIX时间戳 ms
   * 指的是根据本地时间至结束时间进行倒计时
   */
  stopTime?: number;

  /**
   * 模板解析正则表达式，默认：`/\$\{([\-\w]+)\}/g`
   * 有时候由于模板结构比较特殊，无法根据默认的表达式进行解析，那就需要修改它
   */
  varRegular?: RegExp;

  /**
   * 时钟控制数组，特殊需求时可以修改，里面是三元组：指针名、进制、位数，可参考大于99小时demo，默认：`['d', 100, 2, 'h', 24, 2, 'm', 60, 2, 's', 60, 2, 'u', 10, 1]`
   */
  clock?: any[];

  /**
   * 第x秒时调用 notify 函数，值必须是正整数
   */
  notify?: number[];

  /**
   * 重绘
   */
  repaint?: Function;
}
