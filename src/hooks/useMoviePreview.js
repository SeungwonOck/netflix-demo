import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'

const fetchMoviePreview = (id) => {
  return api.get(`/movie/${id}/videos`);
}

export const useMoviePreviewQuery = ({ id }) => {
  return useQuery({
    queryKey: ["movie-preview", { id }],
    queryFn: () => fetchMoviePreview(id),
    select: (result) => result.data,
  })
}