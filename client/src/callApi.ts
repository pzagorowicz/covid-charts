const callApi = async <T>(url: string) => {
    const response = await fetch(url);
    const body = await response.json() as Promise<T>;
    if (response.status !== 200) throw Error(response.statusText);
    return body;
};

export { callApi };