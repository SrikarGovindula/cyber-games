import React, { useState } from 'react';
import PostCard from './PostCard';
import ReportSystem from './ReportSystem';
// Level 2 update

const POST_DATA = [
  { id: 1, type: 'normal', username: 'travel_diaries', pfp: 'https://i.pravatar.cc/150?u=1', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80', caption: 'Beach vibes 🌊 #vacation' },
  { id: 2, type: 'normal', username: 'foodie_life', pfp: 'https://i.pravatar.cc/150?u=2', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80', caption: 'Morning coffee ☕ #breakfast' },
  { id: 3, type: 'scam', username: 'free_iphone_now', pfp: 'https://i.pravatar.cc/150?u=3', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80', caption: 'Win a FREE iPhone now! Link in bio! 📱🎁' },
  { id: 4, type: 'normal', username: 'fitness_journey', pfp: 'https://i.pravatar.cc/150?u=4', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80', caption: 'Weekend ride 🚴 Never give up!' },
  { id: 5, type: 'scam', username: 'crypto_king', pfp: 'https://i.pravatar.cc/150?u=5', image: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=500&q=80', caption: 'Crypto investment guaranteed 500% return! DM me to start. 💸💸' },
  { id: 6, type: 'normal', username: 'pet_lover', pfp: 'https://i.pravatar.cc/150?u=6', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&q=80', caption: 'Lazy Sunday with this one 🐱' },
  { id: 7, type: 'scam', username: 'work_from_home_pro', pfp: 'https://i.pravatar.cc/150?u=7', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80', caption: 'Earn $5000 fast from home! No experience needed. Click the link!' },
  { id: 8, type: 'scam', username: 'giveaway_celeb', pfp: 'https://i.pravatar.cc/150?u=8', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80', caption: 'Celebrity giveaway — click the link to claim your prize! 🎉' }
];

const InstagramFeed = ({ onUnlockMiniGame }) => {
  const [posts] = useState(() => {
    return [...POST_DATA].sort(() => 0.5 - Math.random());
  });
  const [reportedScams, setReportedScams] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [reportResult, setReportResult] = useState(null);

  const handleReportClick = (post) => {
    setSelectedPost(post);
    setReportResult(null);
  };

  const handleConfirmReport = () => {
    if (selectedPost.type === 'scam') {
      const newScore = reportedScams + 1;
      setReportedScams(newScore);
      setReportResult({ success: true, message: 'Threat successfully reported.' });

      if (newScore >= 2) {
        setTimeout(() => {
          onUnlockMiniGame();
        }, 1500);
      }
    } else {
      setReportResult({ success: false, message: 'This post looks legitimate.' });
    }

    // Auto-close after a delay
    setTimeout(() => {
      setSelectedPost(null);
      setReportResult(null);
    }, 2000);
  };

  const handleCancelReport = () => {
    setSelectedPost(null);
  };

  return (
    <div className="app-container instagram-container">
      {/* Top Bar */}
      <div className="ig-topbar">
        <div className="ig-logo-container">
          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ed4956', letterSpacing: '0.5px', marginBottom: '2px' }}>
            Report Fake Posts/Scams
          </div>
          <h1 className="ig-logo" style={{ margin: 0, lineHeight: 1 }}>Instagram</h1>
        </div>
        <div className="ig-icons">
          <span className="icon">❤️</span>
          <span className="icon">✉️</span>
        </div>
      </div>

      {/* Stories */}
      <div className="ig-stories">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="story-circle">
            <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="story" />
          </div>
        ))}
      </div>

      {/* Feed */}
      <div className="ig-feed">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onReport={() => handleReportClick(post)}
          />
        ))}
      </div>

      {/* Report Popup */}
      {selectedPost && !reportResult && (
        <ReportSystem
          post={selectedPost}
          onConfirm={handleConfirmReport}
          onCancel={handleCancelReport}
        />
      )}

      {/* Report Feedback */}
      {reportResult && (
        <div className="report-alert glow-blue">
          <div className={`alert-content ${reportResult.success ? 'success' : 'warning'}`}>
            {reportResult.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramFeed;
