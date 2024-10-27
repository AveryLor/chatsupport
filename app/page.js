"use client"
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi! I'm a support assistant. How can I help you?` },
  ]);
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (!message.trim()) return;  // Prevent sending empty messages

    setMessages((messages) => [...messages, { role: 'user', content: message }]);
    setMessage(''); // Clear input field

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    });

    const data = await response.json();
    setMessages((messages) => [...messages, { role: 'assistant', content: data.message }]);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack direction={'column'} width="500px" maxHeight="700px" border="1px solid black" p={2} spacing={3}>
        {/* Messages Display */}
        <Stack direction={'column'} spacing={2} flexGrow={1} overflow="auto" maxHeight="100%">
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              <Box
                bgcolor={message.role === 'assistant' ? 'primary.main' : 'secondary.main'}
                color="white"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        
        {/* Input and Send Button */}
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message" 
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()} // Optional: Send on Enter key
          />
          <Button variant="contained" onClick={sendMessage}>Send</Button>
        </Stack>
      </Stack>
    </Box>
  );
}
