import { DeptTree, DeptCreateRequest, DeptInfo } from '/@/types/bindings';
import request from '/@/utils/request';

export const getTreeDept = (params?: Object) => {
    return request<any, DeptTree[]>({
        url: "/dept",
        method: "get",
        params
    });
}
export const getDeptInfo = (id: number) => {
    return request<any, DeptInfo>({
        url: "/dept/" + id,
        method: "get",
    });
}

export const createDept = (data: DeptCreateRequest) => {
    return request<DeptCreateRequest, any>({
        url: "/dept",
        method: "post",
        data
    });
}

export const updateDept = (id: number, data: DeptCreateRequest) => {
    return request<DeptCreateRequest, any>({
        url: "/dept/" + id,
        method: "put",
        data
    });
}

export const deleteDept = (id: number) => {
    return request<any, any>({
        url: "/dept/" + id,
        method: "delete",
    });
}