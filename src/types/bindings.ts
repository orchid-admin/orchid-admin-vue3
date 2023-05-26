interface DataPower {
	/**
	 * 是否可删除
	 */
	_can_delete: boolean;
	/**
	 * 是否可编辑
	 */
	_can_edit: boolean;
}
/**
 * 分页请求
 */
interface PaginateRequest {
	/**
	 * 当前页数
	 */
	page: number;
	/**
	 * 每页显示数量
	 */
	limit: number;
}
/**
 * 分页响应
 */
export interface PaginateResponse<T> {
	data: T[];
	/**
	 * 数据总条数
	 */
	total: number;
}

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
	 * 用户信息
	 */
	info: UserInfo;
}
/**
 * 用户-菜单
 */
export interface UserMenuTree {
	/**
	 * 子级
	 */
	children: Array<UserMenuTree[]>;
	/**
	 * 内嵌地址
	 */
	iframe: string;
	/**
	 * 外链地址
	 */
	link: string;
	/**
	 * 重定向地址
	 */
	redirect: string;
	/**
	 * 路由组件地址
	 */
	component: string;
	/**
	 * 路由名称
	 */
	name: string;
	/**
	 * 路径
	 */
	path: string;
	meta: UserMenuMeta;
}
interface UserMenuMeta {
	/**
	 * 菜单名称
	 */
	title: string;
	/**
	 * 图标
	 */
	icon: string;
	/**
	 * 是否固定
	 */
	isAffix: boolean;
	/**
	 * 是否隐藏
	 */
	isHide: boolean;
	/**
	 * 是否keep-alive
	 */
	isKeepAlive: boolean;
}
/**
 * 菜单-搜索
 */
export interface MenuSearchRequest {
	/**
	 * 关键字
	 */
	keyword: string;
	/**
	 * 菜单类型
	 */
	menu_types: number[];
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
	icon: string;
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
	api_method: string;
	/**
	 * 接口地址
	 */
	api_url: string;
	/**
	 * 按钮权限
	 */
	btn_auth: string;
	children: Array<MenuTree[]>;
	/**
	 * 创建时间
	 */
	created_at: string;
	/**
	 * 图标
	 */
	icon: string;
	/**
	 * 菜单ID
	 */
	id: number;
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
	/**
	 * 更新时间
	 */
	updated_time: string;
}
/**
 * 菜单-详情
 */
export interface MenuInfo {
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
	 * 创建时间
	 */
	created_at: string;
	/**
	 * 图标
	 */
	icon: string;
	/**
	 * 菜单ID
	 */
	id: number;
	/**
	 * 内嵌地址
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
	 * 是否开启keep_alive
	 */
	is_keep_alive: boolean;
	/**
	 * 外链地址
	 */
	link: string;
	/**
	 * 父级ID
	 */
	parent_id: number;
	/**
	 * 重定向
	 */
	redirect: string;
	/**
	 * 组件地址
	 */
	router_component: string;
	/**
	 * 路由名称
	 */
	router_name: string;
	/**
	 * 路径
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
	 * 菜单类型：1.菜单，2.重定向/目录，3.外链，4.嵌套，5.按钮权限，6.接口权限
	 */
	type: number;
	/**
	 * 更新时间
	 */
	updated_time: string;
}

/**
 * 角色-搜索
 */
export interface RoleSearchRequest extends PaginateRequest {
	keyword: string;
	status: boolean | null;
}
/**
 * 角色-新增
 */
export interface RoleCreateRequest {
	/**
	 * 描述（备注）
	 */
	describe: string;
	/**
	 * 菜单ID 数组
	 */
	menu_ids: number[];
	/**
	 * 角色名称
	 */
	name: string;
	/**
	 * 角色标识
	 */
	sign: string;
	/**
	 * 排序
	 */
	sort: number;
	/**
	 * 状态
	 */
	status: boolean;
}

/**
 * 角色-列表
 */
export interface RoleList extends DataPower {
	/**
	 * 角色描述
	 */
	describe: string;
	/**
	 * 角色ID
	 */
	id: number;
	/**
	 * 角色名称
	 */
	name: string;
	/**
	 * 角色标识
	 */
	sign: string;
	/**
	 * 角色状态
	 */
	status: boolean;
}

/**
 * 角色-详情
 */
export interface RoleInfo {
	/**
	 * 角色描述
	 */
	describe: string;
	/**
	 * 角色ID
	 */
	id: number;
	/**
	 * 角色名称
	 */
	name: string;
	/**
	 * 角色标识
	 */
	sign: string;
	/**
	 * 状态
	 */
	status: boolean;
	/**
	 * 排序
	 */
	sort: number;
	/**
	 * 菜单ID
	 */
	menu_ids: number[];
}

/**
 * 部门-树形
 */
export interface DeptTree {
	/**
	 * 子级
	 */
	children: DeptTree[];
	/**
	 * 部门描述
	 */
	describe: string;
	/**
	 * 部门ID
	 */
	id: number;
	/**
	 * 部门名称
	 */
	name: string;
	/**
	 * 父级ID
	 */
	parent_id: number;
	/**
	 * 负责人邮箱
	 */
	person_email: string;
	/**
	 * 负责人姓名
	 */
	person_name: string;
	/**
	 * 负责人电话
	 */
	person_phone: string;
	/**
	 * 状态
	 */
	status: boolean;
}
/**
 * 部门-搜索
 */
export interface DeptSearchRequest {
	/**
	 * 关键字
	 */
	keyword: string;
	/**
	 * 状态
	 */
	status: boolean | null;
}
/**
 * 部门-新增
 */
export interface DeptCreateRequest {
	/**
	 * 部门描述
	 */
	describe: string;
	/**
	 * 部门名称
	 */
	name: string;
	/**
	 * 父级ID
	 */
	parent_id: number;
	/**
	 * 部门负责人邮箱
	 */
	person_email: string;
	/**
	 * 部门负责人姓名
	 */
	person_name: string;
	/**
	 * 部门负责人电话
	 */
	person_phone: string;
	/**
	 * 排序
	 */
	sort: number;
	/**
	 * 状态
	 */
	status: boolean;
}
/**
 * 部门-详情
 */
export interface DeptInfo {
	/**
	 * 部门描述
	 */
	describe: string;
	/**
	 * 部门ID
	 */
	id: number;
	/**
	 * 部门名称
	 */
	name: string;
	/**
	 * 父级ID
	 */
	parent_id: number;
	/**
	 * 负责人邮箱
	 */
	person_email: string;
	/**
	 * 负责人姓名
	 */
	person_name: string;
	/**
	 * 负责人电话
	 */
	person_phone: string;
	/**
	 * 状态
	 */
	status: boolean;
	/**
	 * 排序
	 */
	sort: number;
}

/**
 * 用户-搜索
 */
export interface UserSearchRequest extends PaginateRequest {
	/**
	 * 部门ID
	 */
	dept_id: number | null;
	/**
	 * 关键字
	 */
	keyword: string;
	/**
	 * 角色ID
	 */
	role_id: number | null;
	/**
	 * 状态
	 */
	status: boolean | null;
}
/**
 * 用户-新增
 */
export interface UserCreateRequest {
	/**
	 * 部门ID
	 */
	dept_id: number | null;
	/**
	 * 描述
	 */
	describe: string;
	/**
	 * 邮箱地址
	 */
	email: string;
	/**
	 * 到期时间
	 */
	expire_time: string;
	/**
	 * 昵称
	 */
	nickname: string;
	/**
	 * 密码
	 */
	password: string | null;
	/**
	 * 电话号码
	 */
	phone: string;
	/**
	 * 角色ID
	 */
	role_id: number | null;
	/**
	 * 性别
	 */
	sex: number | null;
	/**
	 * 状态
	 */
	status: boolean;
	/**
	 * 用户名
	 */
	username: string;
}
/**
 * 用户-列表
 */
export interface UserList {
	/**
	 * 创建时间
	 */
	created_at: string;
	/**
	 * 部门ID
	 */
	dept_id: number | null;
	dept: DeptInfo | null;
	/**
	 * 描述
	 */
	describe: string;
	/**
	 * 邮箱
	 */
	email: string;
	/**
	 * 到期事假
	 */
	expire_time: string | null;
	/**
	 * 用户ID
	 */
	id: number;
	/**
	 * 昵称
	 */
	nickname: string;
	/**
	 * 电话号码
	 */
	phone: string;
	/**
	 * 角色ID
	 */
	role_id: number | null;
	role: RoleInfo | null;
	/**
	 * 性别
	 */
	sex: number | null;
	/**
	 * 状态
	 */
	status: boolean;
	/**
	 * 用户名
	 */
	username: string;
}
/**
 * 用户-详情
 */
export interface UserInfo extends DataPower {
	/**
	 * 创建时间
	 */
	created_at: string;
	/**
	 * 部门ID
	 */
	dept_id: number | null;
	/**
	 * 描述
	 */
	describe: string;
	/**
	 * 邮箱
	 */
	email: string;
	/**
	 * 到期时间
	 */
	expire_time: string;
	/**
	 * 用户ID
	 */
	id: number;
	/**
	 * 昵称
	 */
	nickname: string;
	/**
	 * 电话号码
	 */
	phone: string;
	/**
	 * 角色ID
	 */
	role_id: number | null;
	/**
	 * 性别
	 */
	sex: number;
	/**
	 * 状态
	 */
	status: boolean;
	/**
	 * 用户名
	 */
	username: string;
	/**
	 * 密码
	 */
	password: string | null;
}
