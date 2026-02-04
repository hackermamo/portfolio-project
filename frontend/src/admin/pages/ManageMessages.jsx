import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await api.get("/contact/messages");
      setMessages(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch messages");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <div className="p-6">Loading messages...</div>;
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-6xl w-full mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">Contact Messages</h2>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 px-3 sm:px-4 py-2 sm:py-3 rounded mb-4 text-sm sm:text-base">
          {error}
        </div>
      )}

      {messages.length === 0 ? (
        <div className="text-gray-400 text-sm sm:text-base">No messages yet</div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="glass border border-neon-green/30 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() =>
                setSelectedMessage(
                  selectedMessage?.id === message.id ? null : message
                )
              }
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-lg text-white truncate">{message.subject}</h3>
                  <p className="text-neon-green text-xs sm:text-sm truncate">From: {message.name}</p>
                  <p className="text-gray-400 text-xs sm:text-sm truncate">{message.email}</p>
                  <p className="text-gray-500 text-xs">
                    {formatDate(message.created_at)}
                  </p>
                </div>
              </div>

              {selectedMessage?.id === message.id && (
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-neon-green/20">
                  <div className="text-gray-300 text-xs sm:text-sm whitespace-pre-wrap break-words">
                    {message.message}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
