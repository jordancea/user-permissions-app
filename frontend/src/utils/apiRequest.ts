interface ApiRequestOptions {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: unknown;
    customHeaders?: Record<string, string>;
}

export async function apiRequest<T>({
    url,
    method,
    body,
    customHeaders,
}: ApiRequestOptions): Promise<T> {
    const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...customHeaders,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({
            error_message: `HTTP error ${response.status}`,
            field: "",
            value: "",
        }));
        throw errorData;
    }

    const responseData = await response.json().catch(() => null);
    return responseData as T;
}
