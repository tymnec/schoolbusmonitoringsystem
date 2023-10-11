import React from "react";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import * as mqtt from "mqtt";
import Card from "../../components/Card/Card";

const OnBus = () => {
  const [receivedMessage, setReceivedMessage] = useState(""); // State to store received messages

  useEffect(() => {
    const client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
    const studentsTopic = "chitkara-university/school-bus-monitoring-system/students";

    const handleNewMessage = (topic, message) => {
      if (topic === studentsTopic) {
        const receivedMsg = message.toString();
        console.log("Received message:", receivedMsg);
        // Update the state with the received message
        setReceivedMessage(receivedMsg);
      }
    };

    client.on("connect", () => {
      console.log("Connected!");
      // Connecting to the Live Image Topic
      client.subscribe(studentsTopic, (err) => {
        if (!err) {
          console.log("Subscribed to", studentsTopic);
        } else {
          console.error("Subscription error:", err);
        }
      });
    });

    client.on("message", handleNewMessage);

    // Clean up the MQTT client and remove the message handler when the component unmounts
    return () => {
      client.unsubscribe(studentsTopic);
      client.removeListener("message", handleNewMessage);
      client.end();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // The empty dependency array ensures this effect runs only once

  // Create an array of json objects of two students John and Cloe
  const students = [
    {
      id: 1,
      studentId: "147188123",
      className: 9,
      name: "John",
      photoUrl:
        "https://img.freepik.com/premium-photo/smiling-boy-teenager-studying-while-sitting-hub-indoors_171337-120373.jpg",
    },
    {
      id: 2,
      studentId: "19519822018",
      className: 10,
      name: "Cloe",
      photoUrl:
        "https://img.freepik.com/free-photo/portrait-teenager-happy-be-back-university_23-2148586575.jpg",
    },
  ];

  const [displayStudents, setDisplayStudents] = useState(["empty", "empty"]);

  useEffect(() => {
    const studentIds = receivedMessage.split(","); // Split the message into an array of student IDs
    setDisplayStudents(studentIds);
  }, [receivedMessage]);

  return (
    <Layout>
      <div className="shadow rounded-3xl flex flex-col p-4 m-2 w-full">
        <h1 className="font-mono text-3xl text-center">Students on Bus</h1>

        <div className="flex flex-col md:flex-row p-4 m-1 gap-2">
          {displayStudents.map((value) => {
            const student = students.find(
              (student) => student.studentId === value
            );
            console.log(student);

            if (student) {
              return (
                <Card
                  displayName={student.name}
                  className={student.className}
                  photoUrl={student.photoUrl}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </Layout>
  );
};

export default OnBus;
