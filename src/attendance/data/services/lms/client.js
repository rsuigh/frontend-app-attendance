const ATTENDANCE_TOKEN = 'oYPU8pdfTedI7Gq3rXAJfq9si37htQ'
const client = (method, data=null, url) => {
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