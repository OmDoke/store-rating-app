const RatingStars = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`rounded px-2 py-1 text-lg ${value >= star ? 'bg-yellow-400' : 'bg-slate-100'}`}
          onClick={() => onChange?.(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default RatingStars;
