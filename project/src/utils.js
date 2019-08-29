export const isLocalhost = () => {
    return ["localhost", "127.0.0.1", ""].includes(window.location.hostname) ? 'https://cors-anywhere.herokuapp.com/' : ''
}