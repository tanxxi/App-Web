const AUTH_API_URL = 'http://localhost:8080/auth/login';

export async function loginApi(email, password) {
  const response = await fetch(AUTH_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    let errorMessage = `Error de autenticación: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData && errorData.error) {
        errorMessage = errorData.error;
      }
    } catch (e) {
      // Fallback a texto simple si la respuesta no es JSON
      try {
        const errorText = await response.text();
        if (errorText) errorMessage = errorText;
      } catch (textErr) {
        // Ignorar y usar el mensaje por defecto
      }
    }
    throw new Error(errorMessage);
  }

  return await response.json();
}
