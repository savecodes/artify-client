import apiClient from "./apiClient";

export const artworkService = {
  getAllArtworks: async () => {
    const response = await apiClient.get("/all-artworks");
    return response.data;
  },

  getLatestArtworks: async () => {
    const response = await apiClient.get("/latest-artworks");
    return response.data;
  },

  getArtworkById: async (id, token) => {
    const response = await apiClient.get(`/artwork/${id}`, {
      headers: { authorization: `bearer ${token}` },
    });
    return response.data;
  },

  getMyGallery: async (email, token) => {
    const response = await apiClient.get(`/my-gallery?email=${email}`, {
      headers: { authorization: `bearer ${token}` },
    });
    return response.data;
  },

  addArtwork: async (artworkData, token) => {
    const response = await apiClient.post("/add-artworks", artworkData, {
      headers: { authorization: `bearer ${token}` },
    });
    return response.data;
  },

  updateArtwork: async (id, artworkData, token) => {
    const response = await apiClient.put(`/my-gallery/edit/${id}`, artworkData, {
      headers: { authorization: `bearer ${token}` },
    });
    return response.data;
  },

  deleteArtwork: async (id, token) => {
    const response = await apiClient.delete(`/my-gallery/${id}`, {
      headers: { authorization: `bearer ${token}` },
    });
    return response.data;
  },
};
