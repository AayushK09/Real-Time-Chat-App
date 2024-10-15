// src/components/Chat.js
import { useState, useEffect } from "react";
import socket from "../utils/socket";
import { Box, TextField, Button, List, ListItem, Typography } from "@mui/material";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for messages from server
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      // Send message to the server
      socket.emit("chat message", message);
      setMessage(""); // Clear input field
    }
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Chat
      </Typography>

      {/* Display Chat Messages */}
      <List sx={{ height: 300, overflowY: 'auto', marginBottom: 2 }}>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <Typography>{msg}</Typography>
          </ListItem>
        ))}
      </List>

      {/* Message Input and Send Button */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
