import API_URL from "../config";

export default async function apiRequest(endpoint, method, body = null) {
    const headers = { 'Content-Type': 'application/json'};
    const options = { method, headers, credentials: 'include' };

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${API_URL}${endpoint}`, options);
    return response.json();
}