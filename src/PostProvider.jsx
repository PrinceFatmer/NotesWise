import { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}
const PostContext= createContext();

 function PostProvider({children}) {
  // const [posts, setPosts] = useState(() =>
  //   Array.from({ length: 30 }, () => createRandomPost())
  // );
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }
  // function handleDelete(id)
  // {
  //   const filteredposts= posts.filter((post)=>post.id!== id)
  //   setPosts(filteredposts);
  // }
  return (
      <PostContext.Provider value={{
      posts: searchedPosts,
      onClearPosts: handleClearPosts,
      onAddPost: handleAddPost,
      searchQuery,
      setSearchQuery
    }}>{children}</PostContext.Provider>
  );
}
function usePost(){
  const context= useContext(PostContext);
  if(context===undefined)
   throw new Error("PostContext is outside PostProvidor");
  return context;
}
// grow with alex
export {PostProvider, usePost };