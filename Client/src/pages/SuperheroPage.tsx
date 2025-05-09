import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import "../styles/SuperheroCurriculum.css"; // Import your CSS styles here
import layout from '../styles/Layout.module.css'; // Import your layout styles here
import audioStyles from '../styles/AudioPlayer.module.css'; // Import your audio player styles here
import dyslexiaStyles from '../styles/DyslexiaSettings.module.css'; // Import your dyslexia settings styles here
import "../styles/Accessibility.css"; // Import your accessibility styles here
import "../styles/WeekContent.css"; // Import your week content styles here
interface WeekContent {
  id: number;
  title: string;
  theme: string;
  description: string;
  activities: Activity[];
  takeHomeProject: string;
  imageUrl: string;
}

interface Activity {
  id: number;
  title: string;
  type: 'visual' | 'auditory' | 'tactile' | 'kinesthetic' | 'discussion';
  description: string;
  materials: string[];
  instructions: string;
  adaptations: string[];xx: any
}

const SuperheroCurriculumPage: React.FC = () => {
  const router = useRouter();
  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [fontSize, setFontSize] = useState<number>(18);
  const [lineSpacing, setLineSpacing] = useState<number>(1.6);
  const [letterSpacing, setLetterSpacing] = useState<number>(0.12);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  
  // Sample data - in a real app, this would come from your API or data store
  const curriculumWeeks: WeekContent[] = [
    {
      id: 1,
      title: "Introduction to Heroes",
      theme: "Different Kinds of Strength",
      description: "Discover what makes someone a hero and explore different types of strengths we all have.",
      activities: [
        {
            id: 101,
            title: "Hero Stories",
            type: "visual",
            description: "Listen to short, illustrated superhero stories with synchronized highlighting of text",
            materials: ["Story cards", "Audio recordings", "Visual props"],
            instructions: "Sit in a circle and follow along with the highlighted text as the story plays.",
            adaptations: [
                "Text highlighting follows audio narration",
                "Pause and replay buttons for each segment",
                "Visual vocabulary cards"
            ],
            xx: undefined
        },
        {
            id: 102,
            title: "Hero Sculpting",
            type: "tactile",
            description: "Create 3D hero figures using clay while discussing hero traits",
            materials: ["Modeling clay", "Character trait cards", "Example figures"],
            instructions: "Choose 3 hero traits and create a figure that shows these strengths.",
            adaptations: [
                "Trait cards with images and simple text",
                "Pre-shaped bases to start from",
                "Step-by-step visual guide"
            ],
            xx: undefined
        },
        {
            id: 103,
            title: "Real Heroes Circle",
            type: "discussion",
            description: "Share about real-life heroes using visual prompt cards",
            materials: ["Hero prompt cards", "Talking stick", "Visual timer"],
            instructions: "Pick a card and share about a real person who shows that hero quality.",
            adaptations: [
                "Picture support on all cards",
                "Sentence starters provided",
                "Option to draw instead of write"
            ],
            xx: undefined
        }
      ],
      takeHomeProject: "Audio-recorded interview with a family member about their personal hero (can be drawn or recorded rather than written)",
      imageUrl: "/images/week1-heroes.png"
    },
    // Additional weeks would be added here
  ];

  const handleWeekChange = (weekId: number) => {
    setCurrentWeek(weekId);
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
  };

  const handleLineSpacingChange = (spacing: number) => {
    setLineSpacing(spacing);
  };

  const handleLetterSpacingChange = (spacing: number) => {
    setLetterSpacing(spacing);
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const selectedWeek = curriculumWeeks.find(week => week.id === currentWeek) || curriculumWeeks[0];

  return (
    <div 
      className={`curriculum-container ${highContrast ? 'high-contrast' : ''}`}
      style={{
        fontFamily: "'Comic Sans MS', 'OpenDyslexic', Arial, sans-serif",
        fontSize: `${fontSize}px`,
        lineHeight: lineSpacing,
        letterSpacing: `${letterSpacing}em`,
        backgroundColor: highContrast ? '#f7f3e9' : '#ffffff',
        color: highContrast ? '#000000' : '#333333',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      <header className="curriculum-header">
        <div className="logo-container">
          <h1>Logi Learn</h1>
          <h2>Superhero Stories Curriculum</h2>
        </div>
        
        <div className="accessibility-controls">
          <div className="text-controls">
            <button 
              onClick={() => handleFontSizeChange(fontSize - 2)}
              aria-label="Decrease font size"
              disabled={fontSize <= 14}
              className="text-control-button"
            >
              A-
            </button>
            <button 
              onClick={() => handleFontSizeChange(fontSize + 2)}
              aria-label="Increase font size"
              className="text-control-button"
            >
              A+
            </button>
          </div>
          
          <div className="spacing-controls">
            <button 
              onClick={() => handleLineSpacingChange(lineSpacing - 0.2)}
              aria-label="Decrease line spacing"
              disabled={lineSpacing <= 1.2}
              className="spacing-control-button"
            >
              Line-
            </button>
            <button 
              onClick={() => handleLineSpacingChange(lineSpacing + 0.2)}
              aria-label="Increase line spacing"
              className="spacing-control-button"
            >
              Line+
            </button>
          </div>
          
          <div className="contrast-control">
            <button 
              onClick={toggleHighContrast}
              aria-label={highContrast ? "Use standard contrast" : "Use high contrast"}
              className="contrast-button"
            >
              {highContrast ? "Standard Contrast" : "High Contrast"}
            </button>
          </div>
          
          <div className="audio-control">
            <button 
              onClick={toggleAudio}
              aria-label={audioEnabled ? "Disable audio" : "Enable audio"}
              className="audio-button"
            >
              {audioEnabled ? "Audio On" : "Audio Off"}
            </button>
          </div>
        </div>
      </header>

      <div className="week-navigation">
        <h3>Curriculum Weeks</h3>
        <div className="week-buttons">
          {curriculumWeeks.map(week => (
            <button
              key={week.id}
              onClick={() => handleWeekChange(week.id)}
              className={`week-button ${week.id === currentWeek ? 'active' : ''}`}
              aria-pressed={week.id === currentWeek}
            >
              Week {week.id}
            </button>
          ))}
        </div>
      </div>

      <main className="week-content">
        <div className="week-header">
          <h2>Week {selectedWeek.id}: {selectedWeek.title}</h2>
          <h3>Theme: {selectedWeek.theme}</h3>
          {audioEnabled && (
            <button 
              className="play-description"
              aria-label="Listen to week description"
            >
              🔊 Listen
            </button>
          )}
        </div>

        <div className="week-description">
          <p>{selectedWeek.description}</p>
        </div>

        <div className="week-image">
          <Image 
            src={selectedWeek.imageUrl} 
            alt={`Visual representation of ${selectedWeek.title}`}
            width={400}
            height={300}
            layout="responsive"
          />
        </div>

        <section className="activities-section">
          <h3>Activities</h3>
          <div className="activities-grid">
            {selectedWeek.activities.map(activity => (
              <div 
                key={activity.id} 
                className={`activity-card activity-${activity.type}`}
              >
                <div className="activity-type-icon">
                  {activity.type === 'visual' && '👁️'}
                  {activity.type === 'auditory' && '👂'}
                  {activity.type === 'tactile' && '✋'}
                  {activity.type === 'kinesthetic' && '🏃'}
                  {activity.type === 'discussion' && '💬'}
                </div>
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
                
                <div className="activity-details">
                  <div className="materials">
                    <h5>Materials Needed:</h5>
                    <ul>
                      {activity.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="instructions">
                    <h5>Instructions:</h5>
                    <p>{activity.instructions}</p>
                    {audioEnabled && (
                      <button 
                        className="play-instructions"
                        aria-label={`Listen to instructions for ${activity.title}`}
                      >
                        🔊 Listen
                      </button>
                    )}
                  </div>
                  
                  <div className="adaptations">
                    <h5>Dyslexia-Friendly Adaptations:</h5>
                    <ul>
                      {activity.adaptations.map((adaptation, index) => (
                        <li key={index}>{adaptation}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <Link href={`/activity/${activity.id}`}>
                  <a className="view-activity-button">Start Activity</a>
                </Link>

                <Link href={`/activity/${activity.id}`}>
  <a className="view-activity-button">Start Activity</a>
</Link>
              </div>
            ))}
          </div>
        </section>

        <section className="take-home-project">
          <h3>Take Home Project</h3>
          <div className="project-card">
            <p>{selectedWeek.takeHomeProject}</p>
            <Link href={`/project/${selectedWeek.id}`}>
              <a className="view-project-button">View Project Details</a>
            </Link>
          </div>
        </section>

        <div className="navigation-buttons">
          <button 
            onClick={() => handleWeekChange(Math.max(1, currentWeek - 1))}
            disabled={currentWeek === 1}
            className="prev-week-button"
          >
            ← Previous Week
          </button>
          <button 
            onClick={() => handleWeekChange(Math.min(curriculumWeeks.length, currentWeek + 1))}
            disabled={currentWeek === curriculumWeeks.length}
            className="next-week-button"
          >
            Next Week →
          </button>
        </div>
      </main>
    </div>
  );
};

export default SuperheroCurriculumPage;