import React from "react";
import PostDetail from "../../Components/PostDetalhes/PostDetail";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";

//hooks

import { useFetchDocuments } from "../../hooks/useFetchDocument";
import { useQuery } from "../../hooks/useQuery";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);
  return (
    <div className={styles.search_container}>
      <h2>Search</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.nopost}>
            <p>Não foi encontrado essa publicação...</p>
            <Link className="btn" to="/">
              Voltar
            </Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
