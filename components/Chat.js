import { useState, useEffect } from "react";
import socket from "../utils/socket";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  Typography,
  Avatar,
  Divider,
  Paper,
} from "@mui/material";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("Anonymous");

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("userRegistrationData")
    );
    if (loggedInUser) {
      setUsername(loggedInUser[0].name);
    }

    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat message", {
        username,
        content: message,
        timestamp: new Date(),
      });
      setMessage("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        marginTop: 2,
        backgroundColor: "background.paper",
        border: "1px solid #1976d2",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom align="center">
          Chat Application
        </Typography>

        <Divider />

        <List sx={{ height: 300, overflowY: "auto" }}>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ padding: 0 }}>
              <Paper
                sx={{
                  padding: 1,
                  borderRadius: 2,
                  margin: 1,
                  display: "flex",
                  alignItems: "center",
                  backgroundColor:
                    msg.username === username ? "primary.light" : "grey.300",
                  color:
                    msg.username === username ? "common.white" : "text.primary",
                  justifyContent: "flex-start",
                }}
              >
                <Avatar sx={{ marginRight: 1 }}>
                  {msg.username.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="body1">{msg.content}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </Typography>
                </Box>
              </Paper>
            </ListItem>
          ))}
        </List>

        <Divider />

        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <TextField
            label="Type your message"
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Chat;
