import API_URL from "../config";

export default async function apiRequest(endpoint, method, body = null, isFile = null) {
    const headers = {};
    const token = localStorage.getItem('token');

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const options = { method, headers, credentials: 'include' };

    if (body) {
        if (isFile) {
            options.body = body;
        } else {
            headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка при запросе к серверу');
        }
    
        const data = await response.json();
        return { status: response.status, ...data };
    } catch (error) {
        console.error(`Ошибка API: ${error}`);
        return { status: 500, message: error.message };
    }   
}