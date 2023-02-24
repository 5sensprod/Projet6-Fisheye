import { getMedia } from "../data/photographersFetcher.js";

const mediaSorter = async (photographerId, sortBy = "popularité") => {
  const media = await getMedia();
  const filteredMedia = media.filter((mediaItem) => mediaItem.photographerId === photographerId);

  let sortedMedia;
  switch (sortBy) {
    case "date":
      sortedMedia = filteredMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "title":
      sortedMedia = filteredMedia.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      sortedMedia = filteredMedia.sort((a, b) => b.likes - a.likes);
      break;
  }

  return sortedMedia;
};

export default mediaSorter;