import { getConfig } from "@edx/frontend-platform";

// const ATTENDANCE_TOKEN = 'Gfdn0E2RT4RNdzSYdW5mw6Lwqsey7f'
const client = (method, data=null, url) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", `Bearer ${getConfig().ATTENDANCE_TOKEN}`)
    const requestOptions = {
        method: method,
        headers: myHeaders,
        redirect: "follow"
    };
    if (data) {
        requestOptions['body'] = JSON.stringify(data)
        return fetch(url, requestOptions)
    }
    return fetch(url)
}
export default client