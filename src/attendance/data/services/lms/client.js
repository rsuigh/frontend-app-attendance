import { getConfig } from "@edx/frontend-platform";

// const ATTENDANCE_TOKEN = 'Gfdn0E2RT4RNdzSYdW5mw6Lwqsey7f'
const ATTENDANCE_TOKEN = getConfig().ATTENDANCE_TOKEN
const client = (method, data=null, url) => {
    console.log(ATTENDANCE_TOKEN)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${ATTENDANCE_TOKEN}`)
    const requestOptions = {
        method: method,
        headers: myHeaders,
        redirect: "follow"
    };
    if (data) {
        requestOptions['body'] = JSON.stringify(data)
    }
    return fetch(url, requestOptions)
}
export default client