import React, { useEffect, useState } from "react";
import * as mqtt from "mqtt";

const HomePage = () => {
  const [receivedMessages, setReceivedMessages] = useState([]); // State to store received messages

  useEffect(() => {
    const client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
    const topic = "chitkara-university/school-bus-monitoring-system";

    const handleNewMessage = (topic, message) => {
      const receivedMsg = message.toString();
      console.log("Received message:", receivedMsg);
      // Update the state with the received message
      setReceivedMessages((prevMessages) => [...prevMessages, receivedMsg]);
    };

    client.on("connect", () => {
      console.log("Connected!");
      // Subscribe to the MQTT topic when connected
      client.subscribe(topic, (err) => {
        if (!err) {
          console.log("Subscribed to", topic);
        } else {
          console.error("Subscription error:", err);
        }
      });
    });

    client.on("message", handleNewMessage);

    // Clean up the MQTT client and remove the message handler when the component unmounts
    return () => {
      client.unsubscribe(topic);
      client.removeListener("message", handleNewMessage);
      client.end();
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello MQTT in React</h1>
        <p>Received messages:</p>
        <ul>
          {receivedMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default HomePage;
