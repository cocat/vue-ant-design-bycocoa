export function getCurrentAuthority() {
    return ["admin"];
}

export function check(authority) {
    const current = getCurrentAuthority();
    //验证权限是否一致
    return current.some(item => authority.includes(item))
}

export function isLogin() {
    const current = getCurrentAuthority();
    //获取到用户权限，且不是guest
    return current && current[0] !== "guest";
}