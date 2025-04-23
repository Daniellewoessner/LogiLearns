import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Next.js Link component for navigation
import styles from '../styles/ActivityComponent.module.css'; // Fixed path

interface ActivityProps {
  id: number;
  title: string;
  type: 'visual' | 'auditory' | 'tactile' | 'kinesthetic' | 'discussion';
  weekId: number;
  weekTitle: string;
  description: string;
  learningGoals: string[];
  materials: string[];
  instructions: string[];
  adaptations: string[];
  visualSupports: string[];
  completionSteps: string[];
}

// Sample data (your existing activityData)
const activityData: ActivityProps = {
  id: 101,
  title: "Hero Stories",
  type: "visual",
  weekId: 1,
  weekTitle: "Introduction to Heroes",
  description: "Listen to short, illustrated superhero stories with synchronized highlighting of text",
  learningGoals: [
    "Improve reading comprehension",
    "Build vocabulary related to hero qualities",
    "Practice active listening skills"
  ],
  materials: [
    "Story cards with dyslexia-friendly text",
    "Audio recordings of stories",
    "Visual vocabulary cards",
    "Character trait icons"
  ],
  instructions: [
    "Find a comfortable spot where you can see the screen clearly",
    "Click the 'Start Story' button to begin",
    "Follow along with the highlighted text as the story plays",
    "Use the pause button if you need more time",
    "After each story, click on the hero qualities shown in the story",
    "Complete the reflection activity"
  ],
  adaptations: [
    "Text highlighting follows audio narration",
    "Pause and replay buttons for each segment",
    "Visual vocabulary support with images",
    "Option to adjust reading speed",
    "Alternative keyboard navigation"
  ],
  visualSupports: [
    "/images/activities/story-card-example.png",
    "/images/activities/hero-traits-visual.png"
  ],
  completionSteps: [
    "Listen to at least one story",
    "Identify 3 hero qualities from the story",
    "Complete the matching activity",
    "Record your favorite part (draw, write, or record)"
  ]
};

// Define related activities for navigation
const relatedActivities = [
  { id: 102, title: "Hero Sculpting", type: "tactile" },
  { id: 103, title: "Real Heroes Circle", type: "discussion" }
];

const ActivityComponent: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [activity, setActivity] = useState<ActivityProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [fontSize, setFontSize] = useState(18);
  const [isStoryPlaying, setIsStoryPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Simulate fetching activity data
  useEffect(() => {
    // In a real application, you would fetch the activity based on the ID
    // For now, we'll just use our sample data
    setTimeout(() => {
      setActivity(activityData);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const handleNextStep = () => {
    if (activity && currentStep < activity.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
  };

  const handlePlayStory = () => {
    setIsStoryPlaying(true);
    // In a real app, this would trigger your audio/visual story player
  };

  const handlePauseStory = () => {
    setIsStoryPlaying(false);
  };

  // Get activity type icon
  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'visual': return '👁️';
      case 'auditory': return '👂';
      case 'tactile': return '✋';
      case 'kinesthetic': return '🏃';
      case 'discussion': return '💬';
      default: return '📝';
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading activity...</p>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className={styles.errorContainer}>
        <h2>Activity Not Found</h2>
        <p>Sorry, we couldn't find the activity you're looking for.</p>
        <button onClick={() => router.push('/curriculum')} className={styles.backButton}>
          Back to Curriculum
        </button>
      </div>
    );
  }

  return (
    <div 
      className={styles.activityContainer}
      style={{ fontSize: `${fontSize}px` }}
    >
      <div className={styles.activityHeader}>
        <button onClick={() => router.back()} className={styles.backButton}>
          ← Back
        </button>
        
        <div className={styles.activityTitleSection}>
          <div className={styles.breadcrumbs}>
            Week {activity.weekId}: {activity.weekTitle} / Activity
          </div>
          <h1>
            <span className={styles.activityTypeIcon}>
              {getActivityTypeIcon(activity.type)}
            </span>
            {activity.title}
          </h1>
          <div className={styles.activityType}>
            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} Activity
          </div>
        </div>
        
        <div className={styles.accessibilityControls}>
          <button 
            onClick={() => handleFontSizeChange(fontSize - 2)}
            aria-label="Decrease font size"
            disabled={fontSize <= 14}
            className={styles.textControlButton}
          >
            A-
          </button>
          <button 
            onClick={() => handleFontSizeChange(fontSize + 2)}
            aria-label="Increase font size"
            className={styles.textControlButton}
          >
            A+
          </button>
          <button 
            onClick={toggleAudio}
            aria-label={audioEnabled ? "Disable audio" : "Enable audio"}
            className={styles.audioButton}
          >
            {audioEnabled ? "Audio On" : "Audio Off"}
          </button>
        </div>
      </div>

      <div className={styles.activityContent}>
        {/* Your existing activity content sections */}
        <div className={styles.activityInfo}>
          <div className={styles.activityDescription}>
            <h2>What We'll Do</h2>
            <p>{activity.description}</p>
            {audioEnabled && (
              <button 
                className={styles.audioButton}
                aria-label="Listen to description"
              >
                🔊 Listen
              </button>
            )}
          </div>

          <div className={styles.learningGoals}>
            <h2>Learning Goals</h2>
            <ul>
              {activity.learningGoals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>

          <div className={styles.materialsNeeded}>
            <h2>Materials Needed</h2>
            <ul className={styles.materialsList}>
              {activity.materials.map((material, index) => (
                <li key={index}>
                  <span className={styles.materialCheck}>✓</span>
                  {material}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.activityInstructions}>
          <h2>Activity Steps</h2>
          <div className={styles.stepsProgress}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${(completedSteps.length / activity.instructions.length) * 100}%` }}
            ></div>
          </div>
          
          <div className={styles.stepNavigation}>
            <button 
              onClick={handlePrevStep} 
              disabled={currentStep === 0}
              className={styles.stepButton}
            >
              ← Previous
            </button>
            <span className={styles.stepCounter}>
              Step {currentStep + 1} of {activity.instructions.length}
            </span>
            <button 
              onClick={handleNextStep}
              disabled={currentStep === activity.instructions.length - 1}
              className={styles.stepButton}
            >
              Next →
            </button>
          </div>
          
          <div className={styles.currentStep}>
            <h3>Step {currentStep + 1}:</h3>
            <p>{activity.instructions[currentStep]}</p>
            
            {audioEnabled && (
              <button className={styles.listenButton}>
                🔊 Listen to this step
              </button>
            )}
            
            <button 
              onClick={() => handleStepComplete(currentStep)}
              className={`${styles.completeStepButton} ${completedSteps.includes(currentStep) ? styles.completed : ''}`}
            >
              {completedSteps.includes(currentStep) ? "✓ Completed" : "Mark as Complete"}
            </button>
          </div>
          
          {activity.type === 'visual' && (
            <div className={styles.storyPlayer}>
              <h3>Story Player</h3>
              <div className={styles.storyContainer}>
                {!isStoryPlaying ? (
                  <div className={styles.storyStartScreen}>
                    <Image 
                      src="/images/placeholder/400/300"
                      alt="Story thumbnail"
                      width={400}
                      height={300}
                    />
                    <button 
                      onClick={handlePlayStory}
                      className={styles.startStoryButton}
                    >
                      Start Story
                    </button>
                  </div>
                ) : (
                  <div className={styles.storyPlayingScreen}>
                    <div className={styles.storyVisual}>
                      <Image 
                        src="/images/placeholder/400/300"
                        alt="Story scene"
                        width={400}
                        height={300}
                      />
                    </div>
                    <div className={styles.storyText}>
                      <p className={styles.highlightedText}>
                        <span className={styles.highlighted}>Once upon a time</span>, there was a hero named Bright Star who could shine light in the darkest places.
                      </p>
                    </div>
                    <div className={styles.storyControls}>
                      <button className={styles.storyControlButton}>⏮️ Rewind</button>
                      <button 
                        onClick={handlePauseStory}
                        className={styles.storyControlButton}
                      >
                        ⏸️ Pause
                      </button>
                      <button className={styles.storyControlButton}>⏭️ Forward</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.adaptationsSection}>
          <h2>Dyslexia-Friendly Adaptations</h2>
          <div className={styles.adaptationsList}>
            {activity.adaptations.map((adaptation, index) => (
              <div key={index} className={styles.adaptationItem}>
                <span className={styles.adaptationIcon}>🔍</span>
                <span>{adaptation}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.completionTracker}>
          <h2>Activity Completion</h2>
          <div className={styles.completionSteps}>
            {activity.completionSteps.map((step, index) => (
              <div 
                key={index} 
                className={`${styles.completionStep} ${completedSteps.includes(index) ? styles.completed : ''}`}
              >
                <div className={styles.completionCheckbox}>
                  {completedSteps.includes(index) ? "✓" : (index + 1)}
                </div>
                <div className={styles.completionText}>{step}</div>
              </div>
            ))}
          </div>
          
          <button 
            disabled={completedSteps.length < activity.completionSteps.length}
            className={styles.finishActivityButton}
          >
            {completedSteps.length < activity.completionSteps.length 
              ? `Complete ${activity.completionSteps.length - completedSteps.length} more steps` 
              : "Finish Activity!"}
          </button>
        </div>
        
        {/* NEW SECTION: Navigation Links using Next.js Link component */}
        <div className={styles.navigationLinks}>
          <h2>Continue Learning</h2>
          <div className={styles.linksGrid}>
            <Link href={`/curriculum/${activity.weekId}`}>
              <a className={styles.navLink}>
                <span className={styles.linkIcon}>📚</span>
                <span>Back to Week {activity.weekId}</span>
              </a>
            </Link>
            
            <Link href="/resources/visual-supports">
              <a className={styles.navLink}>
                <span className={styles.linkIcon}>🖼️</span>
                <span>Visual Support Materials</span>
              </a>
            </Link>
            
            <Link href={`/projects/${activity.weekId}`}>
              <a className={styles.navLink}>
                <span className={styles.linkIcon}>🏠</span>
                <span>Week {activity.weekId} Take-Home Project</span>
              </a>
            </Link>
            
            <Link href="/accessibility-settings">
              <a className={styles.navLink}>
                <span className={styles.linkIcon}>⚙️</span>
                <span>Adjust Accessibility Settings</span>
              </a>
            </Link>
          </div>
          
          <h3>Related Activities</h3>
          <div className={styles.relatedActivities}>
            {relatedActivities.map(relatedActivity => (
              <Link href={`/activities/${relatedActivity.id}`} key={relatedActivity.id}>
                <a className={`${styles.relatedActivity} ${styles[relatedActivity.type]}`}>
                  <span className={styles.activityTypeIcon}>{getActivityTypeIcon(relatedActivity.type)}</span>
                  <span>{relatedActivity.title}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Page progress bar at bottom */}
        <div className={styles.pageProgress}>
          <div className={styles.progressWrapper}>
            <div className={styles.progressLabel}>Page Progress:</div>
            <div className={styles.progressBarContainer}>
              <div 
                className={styles.progressBarFill} 
                style={{ width: '65%' }}
              ></div>
            </div>
          </div>
          <Link href="/curriculum">
            <a className={styles.backToCurriculumButton}>
              Back to Main Curriculum
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivityComponent;