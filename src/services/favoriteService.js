import apiClient from "./apiClient";

export const favoriteService = {
  getMyFavorites: async (email, token) => {
    const response = await apiClient.get(`/my-favorites?email=${email}`, {
      headers: { authorization: `bearer ${token}` },
    });
    return response.data;
  },

  checkFavorite: async (email, artworkId, token) => {
    const response = await apiClient.get(
      `/favorites/check?email=${email}&artwork_id=${artworkId}`,
      {
        headers: { authorization: `bearer ${token}` },
      }
    );
    return response.data;
  },

  addToFavorites: async (favoriteData, token) => {
    const response = await apiClient.post("/favorites", favoriteData, {
      headers: { authorization: `bearer ${token}` },
    });
    return response.data;
  },

  removeFromFavorites: async (email, artworkId, token) => {
    const response = await apiClient.delete(
      `/favorites?email=${email}&artwork_id=${artworkId}`,
      {
        headers: { authorization: `bearer ${token}` },
      }
    );
    return response.data;
  },
};
