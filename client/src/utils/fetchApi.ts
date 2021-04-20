export const fetchApi = (path: string) => {
    const { protocol, hostname } = window.location;
    const relativePath = path.indexOf('/') === 0 ? path.slice(1) : path;
    return fetch((process.env.REACT_APP_API_PORT ? `${protocol}//${hostname}:${process.env.REACT_APP_API_PORT}` : '') + `/api/${relativePath}`);
}