const BASE_URL = "http://localhost:3000/";

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}api/products`);
  const json = await response.json();

  return json;
};

export const getProduct = async (productId) => {
  const response = await fetch(`${BASE_URL}api/products/${productId}`);
  const json = await response.json();

  if (json) return json;
  return {};
};

export const getUser = async (userId) => {
  const response = await fetch(`${BASE_URL}api/users/${userId}`);
  const json = await response.json();

  if (json) return json;
  return {};
}

export async function addProduct(formData) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}api/products`, Options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

export async function updateProduct(productId, formData) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(
    `${BASE_URL}api/products/${productId}`,
    Options
  );
  const json = await response.json();
  return json;
}

export async function updateUser(userId, formData) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(
    `${BASE_URL}api/users/${userId}`,
    Options
  );
  const json = await response.json();
  return json;
}

export async function deleteProduct(productId) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${BASE_URL}api/products/${productId}`,
    Options
  );
  const json = await response.json();
  return json;
}
