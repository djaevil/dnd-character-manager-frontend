import "./CharacterCard.css";
import { Character } from "../../models/CharacterModel";

interface CharacterCardProps {
  character: Character;
  //   onView?: () => void;
  //   onDelete?: () => void;
  //   onEdit?: () => void;
}

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="character-card card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
        <p className="card-text">
          {character.race} {character.class} <br />
          Level {character.level}
        </p>
      </div>
    </div>
  );
}

export default CharacterCard;
