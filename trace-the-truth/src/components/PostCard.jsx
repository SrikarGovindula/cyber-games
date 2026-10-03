import React from 'react';

const PostCard = ({ post, onReport }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <img src={post.pfp} alt={post.username} className="post-pfp" />
        <span className="post-username">{post.username}</span>
        <button className="post-options">⋮</button>
      </div>
      
      <div className="post-image-container">
        <img src={post.image} alt="post" className="post-image" />
      </div>
      
      <div className="post-actions">
        <div className="action-group">
          <span className="action-icon">❤️</span>
          <span className="action-icon">💬</span>
          <span className="action-icon">↗️</span>
        </div>
        <span className="action-icon">🔖</span>
      </div>
      
      <div className="post-caption-section">
        <span className="post-username bold">{post.username}</span> {post.caption}
      </div>
      
      <div className="post-report-section">
        <button className="btn-report" onClick={onReport}>REPORT POST</button>
      </div>
    </div>
  );
};

export default PostCard;
