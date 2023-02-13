import styles from "./Post.module.css";

//hooks
import { useParams } from "react-router-dom";
import { useFetchDoc } from "../../hooks/useFetchDoc";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDoc("posts", id);
  return (
    <div className={styles.postContainer}>
      {loading && <p>Carregando publicação</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.Image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Essa publicação fala de:</h3>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
