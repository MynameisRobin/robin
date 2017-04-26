interface MenuData {
    /**
     * 文本ID
     */
    Key?: string;
    /**
     * 文本默认值
     */
    Title?: string;
    /**
     * 路径
     */
    Path?: string;
    /** 是否展示在导航中 */
    NotShow?: boolean;
    /**
     * 图标
     */
    Icon?: string;
    /**
     * 角标数量
     */
    Badge?: number;
    /**
     * 子节点
     */
    Children?: MenuData[]
}
