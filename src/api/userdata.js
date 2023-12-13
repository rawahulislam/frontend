import axios from "axios";

let url = "http://127.0.0.1:3001/data";

export const AllUsers = async () => {
  try {
    let data = await axios.get(url);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

let postUrl = "http://127.0.0.1:3001/post";

export const AllUsersPost = async (PostData) => {
  try {
    await axios.post(postUrl, PostData, { responseType: 'text' });
  } catch (err) {
    console.log(err);
    alert("Invalid credentials");

  }
};
