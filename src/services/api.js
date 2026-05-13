const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function getToken() {
  return localStorage.getItem('accessToken')
}

export async function apiFetch(path, options = {}) {
  const token = getToken()

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  const data = response.status === 204 ? null : await response.json()

  if (!response.ok) {
    throw data
  }

  return data
}

export async function loginUser(email, password) {
  const result = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  localStorage.setItem('accessToken', result.data.accessToken)
  localStorage.setItem('refreshToken', result.data.refreshToken)

  return result.data
}

export async function registerUser(name, email, password) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
}

export async function getMenuItems() {
  return apiFetch('/menu-items')
}

export async function createOrder(order) {
  return apiFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(order),
  })
}