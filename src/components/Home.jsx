import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const { blogs, isLoading, error } = useFetch("http://localhost:3002/blogs");
  return (
    <div className="home">
      {error && <div> {error} </div>}
      {isLoading && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title={"All blogs"} />}
    </div>
  );
};

export default Home;
