export interface GetCaptchaReponse {
    /**
     * 验证码图片base64
     */
    image: string;
    /**
     * 验证码KEY
     */
    key: string;
}
/**
 * 登录成功
 */
export interface LoginReponse {
    /**
     * Token
     */
    token: string;
    /**
     * 用户名
     */
    userName: string;
}

export interface LoginByAccountRequest {
    /**
     * 图片验证码值
     */
    code: string;
    /**
     * 图片验证码KEY
     */
    key: string;
    /**
     * 密码
     */
    password: string;
    /**
     * 用户名
     */
    username: string;
}
/**
 * 用户-权限
 */
export interface UserPermission {
    /**
     * 按钮权限
     */
    btn_auths: string[];
    /**
     * 头像地址
     */
    photo: string;
    /**
     * 角色标识
     */
    roles: string[];
    /**
     * 到期实际
     */
    time: number;
    /**
     * 用户名称
     */
    username: string;
}
/**
 * 用户-菜单
 */
export interface UserMenuTree {
    /**
     * 子级
     */
    children?: Array<UserMenuTree[]>;
    /**
     * 内嵌地址
     */
    iframe?: string;
    /**
     * 外链地址
     */
    link?: string;
    /**
     * 重定向地址
     */
    redirect?: string;
    /**
     * 路由组件地址
     */
    component?: string;
    /**
     * 路由名称
     */
    name?: string;
    /**
     * 路径
     */
    path?: string;
    meta: UserMenuMeta;
}
interface UserMenuMeta {
    /**
     * 菜单名称
     */
    title?: string;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 是否固定
     */
    isAffix?: boolean;
    /**
     * 是否隐藏
     */
    isHide?: boolean;
    /**
     * 是否keep-alive
     */
    isKeepAlive?: boolean;
}
/**
 * 菜单-新增
 */
export interface MenuCreateRequest {
    /**
     * 接口请求方法
     */
    api_method: string;
    /**
     * 接口地址
     */
    api_url: string;
    /**
     * 按钮权限
     */
    btn_auth: string;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 内联地址
     */
    iframe: string;
    /**
     * 是否固定
     */
    is_affix: boolean;
    /**
     * 是否隐藏
     */
    is_hide: boolean;
    /**
     * 是否启用keepAlive
     */
    is_keep_alive: boolean;
    /**
     * 链接地址
     */
    link: string;
    /**
     * 父级ID
     */
    parent_id: number;
    /**
     * 重定向地址
     */
    redirect: string;
    /**
     * 前端路由组件路径
     */
    router_component: string;
    /**
     * 前端路由名称
     */
    router_name: string;
    /**
     * 前端路由路径
     */
    router_path: string;
    /**
     * 排序
     */
    sort: number;
    /**
     * 菜单名称
     */
    title: string;
    /**
     * 菜单类型，1.菜单，2.重定向，3.外链，4.嵌套，5.按钮权限，6.接口权限
     */
    type: number;
}
/**
 * 菜单-树形
 */
export interface MenuTree {
    /**
     * 接口请求方法
     */
    api_method?: string;
    /**
     * 接口地址
     */
    api_url?: string;
    /**
     * 按钮权限
     */
    btn_auth?: string;
    children?: Array<MenuTree[]>;
    /**
     * 创建时间
     */
    created_at?: string;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 菜单ID
     */
    id?: number;
    /**
     * 内联地址
     */
    iframe?: string;
    /**
     * 是否固定
     */
    is_affix?: boolean;
    /**
     * 是否隐藏
     */
    is_hide?: boolean;
    /**
     * 是否启用keepAlive
     */
    is_keep_alive?: boolean;
    /**
     * 链接地址
     */
    link?: string;
    /**
     * 父级ID
     */
    parent_id?: number;
    /**
     * 重定向地址
     */
    redirect?: string;
    /**
     * 前端路由组件路径
     */
    router_component?: string;
    /**
     * 前端路由名称
     */
    router_name?: string;
    /**
     * 前端路由路径
     */
    router_path?: string;
    /**
     * 排序
     */
    sort?: number;
    /**
     * 菜单名称
     */
    title?: string;
    /**
     * 菜单类型，1.菜单，2.重定向，3.外链，4.嵌套，5.按钮权限，6.接口权限
     */
    type?: number;
    /**
     * 更新时间
     */
    updated_time?: string;
}