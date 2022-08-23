import admin from "../api";

export function getRequest(url, query) {
    return admin.get(url, { params: {...query , } });
}

export function postRequest(url, params ,query) {
    return admin.post(url, params , {params: {...query}});
}

export function putRequest(url, params , query) {
    return admin.put(url , params , {params: {...query}} );
}

export function deleteRequest(url, query) {
    return admin.delete(url ,{ params: {...query }});
}

export function patchRequest(url, params ,query) {
    return admin.patch(url, params , {params:  {...query }});
}