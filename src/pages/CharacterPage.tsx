import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCharacterById,
  updateCharacter,
  deleteCharacterById,
} from "../api/character.api";
import CharacterCreationModal from "../components/CharacterCreation/CharacterCreationModal";
import { Character } from "../models/CharacterModel";
import { Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";

function CharacterPage() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const { data } = await getCharacterById(id!);
        setCharacter(data);
      } catch (err) {
        console.error("Error fetching character:", err);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) return <p>Loading character...</p>;

  const {
    name,
    race,
    class: charClass,
    level,
    healthPoints,
    background,
    stats,
    skills,
    equipment,
    spells,
    features,
    notes,
  } = character;

  const handleUpdateCharacter = async (updatedValues: Character) => {
    const characterData: Character = {
      ...updatedValues,
      _id: undefined,
      owner: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      __v: undefined,
    };
    const { data } = await updateCharacter(id!, characterData);
    if (data) {
      if (data) {
        Swal.fire({
          icon: "success",
          theme: "dark",
          title: "Character updated successfully",
          text: "Your character has been updated.",
          confirmButtonColor: "#ffc107",
        }).then(() => {
          setCharacter(data);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Character update failed",
          text: "Please try again.",
          confirmButtonColor: "#dc3545",
        });
      }
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteCharacter = await deleteCharacterById(id!);
        if (deleteCharacter) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Your character has been deleted.",
            confirmButtonColor: "#ffc107",
          }).then(() => {
            navigate("/home");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to delete character.",
          });
        }
      }
    });
  };

  function CharacterHeader({ name }: { name: string | undefined }) {
    return (
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">{name || ""}</h2>

        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="character-options">
            Options
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setShowEditModal(true)}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleDelete()}
              className="text-danger"
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }

  return (
    <div className="bg-dark text-light p-4 mt-4 rounded">
      <CharacterHeader name={name} />

      <div className="row">
        <div className="col-md-6">
          <section className="mb-4">
            <h4>Basic Info</h4>
            <p>
              <strong>Race:</strong> {race}
            </p>
            <p>
              <strong>Class:</strong> {charClass}
            </p>
            <p>
              <strong>Level:</strong> {level}
            </p>
            <p>
              <strong>Health Points:</strong> {healthPoints}
            </p>
            <p>
              <strong>Background:</strong> {background}
            </p>
          </section>

          <section className="mb-4">
            <h4>Stats</h4>
            <ul className="list-unstyled">
              {stats &&
                Object.entries(stats).map(([key, val]) => (
                  <li key={key}>
                    <strong className="text-capitalize">{key}:</strong> {val}
                  </li>
                ))}
            </ul>
          </section>
        </div>

        <div className="col-md-6">
          <section className="mb-4">
            <h4>Skills</h4>
            <ul className="list-unstyled">
              {skills &&
                Object.entries(skills).map(([key, val]) => (
                  <li key={key}>
                    <strong className="text-capitalize">{key}:</strong> {val}
                  </li>
                ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <section className="mb-4">
            <h4>Equipment & Abilities</h4>
            <p>
              <strong>Equipment:</strong> {equipment?.join(", ") || "None"}
            </p>
            <p>
              <strong>Spells:</strong> {spells?.join(", ") || "None"}
            </p>
            <p>
              <strong>Features:</strong> {features?.join(", ") || "None"}
            </p>
          </section>
        </div>

        <div className="col-md-6">
          <section>
            <h4>Notes</h4>
            <p>{notes || "No additional notes."}</p>
          </section>
        </div>
      </div>
      {showEditModal && character && (
        <CharacterCreationModal
          onClose={() => setShowEditModal(false)}
          initialValues={character}
          onSubmit={handleUpdateCharacter}
          isEditing
        />
      )}
    </div>
  );
}

export default CharacterPage;
