export async function fetchData(endpoint) {
    const FASTAPI_BASE_URL = "http://127.0.0.1:8000";
    try {
        const response = await fetch(`${FASTAPI_BASE_URL}${endpoint}`, { mode: 'cors' });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) { 
        console.error(`Failed to fetch data from ${endpoint}:`, error);
        return null;
    }
}