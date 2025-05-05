import "./CharacterCard.css";
import { Character } from "../../models/CharacterModel";
import { Link } from "react-router-dom";

interface CharacterCardProps {
  character: Character;
}

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link to={`/characters/${character._id}`} className="text-decoration-none">
      <div className="character-card card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{character.name}</h5>
          <p className="card-text">
            {character.race} {character.class} <br />
            Level {character.level}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CharacterCard;
