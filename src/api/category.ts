import {Request} from '../util/request';
export class CategoryAPI {

    static async getCategory(data?: GetCategoryRequest) {
        let url : string = "/api/admin/categories";
        return await new Request < GetCategoryRequest,
        GetCategoryResponse > ().get(url, data);
    }
    static async putCategory(data : PutCategoryRequest) {
        let url : string = "/api/admin/categories";
        return await new Request < PutCategoryRequest,
        PutCategoryResponse > ().put(url, data);
    }
    static async postCategory(data : PostCategoryRequest) {
        let url : string = "/api/admin/categories";
        return await new Request < PostCategoryRequest,
        PostCategoryResponse > ().post(url, data);
    }
    static async delCategory(data : DeleteCategoryRequest) {
        let url : string = "/api/admin/categories";
        return await new Request < DeleteCategoryRequest,
        DeleteCategoryResponse > ().del(url, data);
    }
}
