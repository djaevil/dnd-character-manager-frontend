import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getAllCharacters } from "../api/character.api";
import { Character } from "../models/CharacterModel";
import CharacterCard from "../components/CharacterCard/CharacterCard";
import CharacterCreationModal from "../components/CharacterCreation/CharacterCreationModal";

function HomePage() {
  const { currentUser } = useAuth();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const { data } = await getAllCharacters();
        setCharacters(data);
      } catch (err) {
        console.error("Failed to fetch characters", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="bg-dark rounded shadow p-4 text-light mt-4 w-100">
      <h2>Welcome, {currentUser?.username}!</h2>
      <button
        className="btn btn-warning my-3 fw-bold"
        onClick={() => setShowModal(true)}
      >
        Create New Character
      </button>

      <div className="mt-3">
        <h4>Your Characters</h4>
        {loading ? (
          <p>Loading characters...</p>
        ) : characters.length === 0 ? (
          <p>You don't have any characters yet.</p>
        ) : (
          <div className="row">
            {characters.map((char) => (
              <div className="col-md-4 mb-3 mt-2" key={char._id}>
                <CharacterCard character={char} />
              </div>
            ))}
          </div>
        )}
      </div>
      {showModal && (
        <CharacterCreationModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default HomePage;
