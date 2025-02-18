import axios from "axios";
type deleteCacheType = {
  tag?: string;
  path?: string;
};
const deleteCache = async ({ tag, path }: deleteCacheType) => {
  if (!tag && !path) return;
  let url = "";
  if (tag) {
    url = "tag=" + tag;
  }
  if (path) {
    if (tag) {
      url = url + "&path=" + path;
    } else {
      url = "path=" + path;
    }
  }
  try {
    const data = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL_DELETE_CACHE}/api/revalidate?${url}`
    );    
    return data;
  } catch (err) {
    console.log(err);
  }
};
export default deleteCache;
