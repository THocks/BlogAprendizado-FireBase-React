import styles from "./Home.module.css";

//hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocument";
import PostDetail from "../../Components/PostDetalhes/PostDetail";

//Componets

function Home() {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };
  return (
    <div className={styles.home}>
      <h1>Confira todos as suas atividades</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          className={styles.inputTags}
          type="text"
          placeholder="Busque por tags"
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="glow-on-hover">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foi encontrado o item pesquisado</p>
            <Link to="/post/postuser" className="glow-on-hover">
              Publique oque você aprendeu hoje{" "}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
