const Message = ({ message }) => {
  return (
    <div
      className={`msg ${
        message.role === "user" ? "user" : "ai"
      }`}
    >
      {message.text}
    </div>
  );
};

export default Message;