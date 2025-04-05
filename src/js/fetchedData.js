export const fetchData = async (category, name) => {
  try {
    let url = 'http://localhost:5000/api/menu';

    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (name) params.append('name', name);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
}
