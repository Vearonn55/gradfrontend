import React from 'react';


export interface TutorialItem {
    id: number;
    title: string;
    description: string;
    videoUrl?: string; // Adım adım walkthrough videosu varsa
}

interface TutorialListProps {
    tutorials: TutorialItem[];
}

const TutorialList: React.FC<TutorialListProps> = ({ tutorials }) => {
    if (tutorials.length === 0) {
        return <p className="no-tutorials">No tutorials found.</p>;
    }

    return (
        <div className="tutorial-list-container">
            <ul>
                {tutorials.map((item) => (
                    <li key={item.id} className="tutorial-item">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        {item.videoUrl && (
                            <a
                                href={item.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="video-link"
                            >
                                Watch Video
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TutorialList;
