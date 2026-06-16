const Message = ({ message }) => {
  const isAI = message.sender === "ai";

  return (
    <div
      className={`message-row ${
        isAI ? "ai-row" : "user-row"
      }`}
    >
      <div
        className={`message-bubble ${
          isAI ? "ai-bubble" : "user-bubble"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default Message;