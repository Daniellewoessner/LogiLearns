import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SuperheroCurriculum.css';

interface ActivityProps {
  id: number;
  title: string;
  type: 'visual' | 'auditory' | 'tactile' | 'kinesthetic' | 'discussion';
  description: string;
  materials: string[];
  instructions: string;
  adaptations: string[];
  audioEnabled?: boolean;
}

const SuperheroActivityCard: React.FC<ActivityProps> = ({
  id,
  title,
  type,
  description,
  materials,
  instructions,
  adaptations,
  audioEnabled = true
}) => {
  // Get the appropriate icon based on type
  const getTypeIcon = () => {
    switch (type) {
      case 'visual':
        return '👁️';
      case 'auditory':
        return '👂';
      case 'tactile':
        return '✋';
      case 'kinesthetic':
        return '🏃';
      case 'discussion':
        return '💬';
      default:
        return '📝';
    }
  };

  return (
    <div className={`activity-card activity-${type}`}>
      <div className="activity-type-icon">
        {getTypeIcon()}
      </div>
      
      <h4>{title}</h4>
      
      <p>{description}</p>
      
      <div className="activity-details">
        <div className="materials">
          <h5>Materials Needed:</h5>
          <ul>
            {materials.map((material, index) => (
              <li key={index}>{material}</li>
            ))}
          </ul>
        </div>
        
        <div className="instructions">
          <h5>Instructions:</h5>
          <p>{instructions}</p>
          {audioEnabled && (
            <button 
              className="play-instructions"
              aria-label={`Listen to instructions for ${title}`}
            >
              🔊 Listen
            </button>
          )}
        </div>
        
        <div className="adaptations">
          <h5>Dyslexia-Friendly Adaptations:</h5>
          <ul>
            {adaptations.map((adaptation, index) => (
              <li key={index}>{adaptation}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <Link to={`/activity/${id}`} className="view-activity-button">
        Start Activity
      </Link>
    </div>
  );
};

export default SuperheroActivityCard;