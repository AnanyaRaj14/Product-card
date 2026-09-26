import './TagList.css';

function TagList({ keywords }) {
  if (!keywords || keywords.length === 0) {
    return null;
  }

  return (
    <div className="tag-list">
      {keywords.map((keyword, index) => (
        <span key={index} className="tag">
          {keyword}
        </span>
      ))}
    </div>
  );
}

export default TagList;
