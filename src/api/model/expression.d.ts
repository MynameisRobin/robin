/**
 * 表达式对象（exprItem直接使用了转化后的value string，暂不使用对象）
 */
interface expr {
    type: string; //表达式类型
    param?: Object; //表达式参数
    name?: string; //表达式显示名
    prop?: string; //表达式属性
}

/**
 * 表达式分类项
 */
interface exprItem {
    id?: string;
    title?: string;
    locale?: string;
    prefix?: string; //title的prefix
    preLocale?: string;
    items?: exprItem[];
    value?: string; //value为空的项不能添加，作为二级分类
    valueType?: "number"|"string"|"datetime"|"taskoutcome"|"metadata"|"user"|"variables"|"tasks"|"tasks"|string;
    attr?: Object; //额外附加属性
}
