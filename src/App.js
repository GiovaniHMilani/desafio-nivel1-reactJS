import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repostiories, setRepositories] = useState([]);
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Curso numero ${Date.now()}`,
      techs: ["Node.js", `${Date.now()}`],
      url: `https://teste.teste.com/${Date.now()}`,
    });
    const repo = [...repostiories, response.data];
    setRepositories(repo);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repo = repostiories.filter((repository) => repository.id !== id);
    setRepositories(repo);
  }

  useEffect(() => {
    api.get("repositories").then((response) => setRepositories(response.data));
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repostiories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
