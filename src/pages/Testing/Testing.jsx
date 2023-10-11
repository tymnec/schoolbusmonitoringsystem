import React from "react";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import * as mqtt from "mqtt";

const Testing = () => {
  const [receivedMessages, setReceivedMessages] = useState([]); // State to store received messages
  const [liveImage, setliveImage] = useState("");
  const [humidity, setHumidity] = useState("");
  const [temperature, setTemperature] = useState("");
  // eslint-disable-next-line
  const [mpu, setMpu] = useState("");

  const [accelerometerMessage, setAccelerometerMessage] = useState("");
  const [gyroscopeMessage, setGyroscopeMessage] = useState("");

  useEffect(() => {
    const client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
    const imagetopic = "chitkara-university/school-bus-monitoring-system/image";
    const humTopic = "chitkara-university/school-bus-monitoring-system/hum";
    const tempTopic = "chitkara-university/school-bus-monitoring-system/temp";
    const mpuTopic = "chitkara-university/school-bus-monitoring-system/mpu";
    const cardTopic =
      "chitkara-university/school-bus-monitoring-system/students";
    // const humAndTempTopic = "chitkara-university/school-bus-monitoring-system/HumidityAndTemperature";

    const handleNewMessage = (topic, message) => {
      if (topic === imagetopic) {
        const receivedMsg = message.toString();
        console.log("Received message:", receivedMsg);
        console.log(receivedMessages);
        setliveImage(receivedMsg);
        // Update the state with the received message
        setReceivedMessages((prevMessages) => [...prevMessages, receivedMsg]);
      }

      if (topic === humTopic) {
        const value = message.toString();
        const humidity = parseFloat(value); // Convert the string to a number
        const humidityValue = `${humidity.toFixed(1)} %`; // Concatenate the humidity value with the symbol
        console.log("Humidity: ", humidityValue);
        setHumidity(humidityValue);
      }

      if (topic === tempTopic) {
        const value = message.toString();
        const temperature = parseFloat(value); // Convert the string to a number
        const temperatureValue = `${temperature.toFixed(1)} °C`; // Round the temperature value to a single decimal and concatenate it with the symbol
        console.log("Temperature: ", temperatureValue);
        setTemperature(temperatureValue);
      }

      if (topic === cardTopic)
      {
        // const student = message.toString();
      }

      if (topic === mpuTopic) {
        const value = message.toString();
        const mpu = value;
        setMpu(mpu);

        // Split the string into an array of strings
        const mpuValues = mpu.split(",");

        // Extract the sensor values from the array
        const accelerometerX = parseFloat(mpuValues[0]);
        const accelerometerY = parseFloat(mpuValues[1]);
        const accelerometerZ = parseFloat(mpuValues[2]);

        // Gyroscope values
        const gyroscopeX = parseFloat(mpuValues[3]);
        const gyroscopeY = parseFloat(mpuValues[4]);
        const gyroscopeZ = parseFloat(mpuValues[5]);

        const accelerometerMessage =
          "Accelerometer: X: " +
          accelerometerX +
          " Y: " +
          accelerometerY +
          " Z: " +
          accelerometerZ;
        const gyroscopeMessage =
          "Gyroscope: X: " +
          gyroscopeX +
          " Y: " +
          gyroscopeY +
          " Z: " +
          gyroscopeZ;

        setAccelerometerMessage(accelerometerMessage);
        setGyroscopeMessage(gyroscopeMessage);
      }
      // const receivedMsg = message.toString();
      // setliveImage("");
      // console.log("Received message:", receivedMsg);
      // setliveImage(receivedMsg);
      // // Update the state with the received message
      // setReceivedMessages((prevMessages) => [...prevMessages, receivedMsg]);
    };

    client.on("connect", () => {
      console.log("Connected!");
      // Connecting to the Live Image Topic
      client.subscribe(imagetopic, (err) => {
        if (!err) {
          console.log("Subscribed to", imagetopic);
        } else {
          console.error("Subscription error:", err);
        }
      });

      // Connecting to the Humidity and Temperature Topic
      client.subscribe(humTopic, (err) => {
        if (!err) {
          console.log("Subscribed to", humTopic);
        } else {
          console.log("Subscription error:", err);
        }
      });

      client.subscribe(tempTopic, (err) => {
        if (!err) {
          console.log("Subscribed to", tempTopic);
        } else {
          console.log("Subscription error:", err);
        }
      });

      client.subscribe(mpuTopic, (err) => {
        if (!err) {
          console.log("Subscribed to", mpuTopic);
        } else {
          console.log("Subscription error:", err);
        }
      });

      client.subscribe(cardTopic, (err) => {
        if (!err) {
          console.log("Subscribed to", cardTopic);
        } else {
          console.log("Subscription error:", err);
        }
      });
    });

    client.on("message", handleNewMessage);

    // Clean up the MQTT client and remove the message handler when the component unmounts
    return () => {
      client.unsubscribe(imagetopic);
      client.unsubscribe(humTopic);
      client.unsubscribe(tempTopic);
      client.removeListener("message", handleNewMessage);
      client.end();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // The empty dependency array ensures this effect runs only once

  const imageUrl = "data:image/jpg;base64," + liveImage;

  return (
    <Layout>
      <div className="flex flex-col m-8 rounded-3xl shadow p-5">
        {/* Heading */}
        <div className="text-center text-3xl m-5 font-mono">
          <h1>Testing</h1>
        </div>

        {/* Recieved Messages */}
        <div className="stats shadow w-max p-5 m-4">
          <ul>Live Image</ul>
        </div>

        <div className="flex w-full h-1/4">
          <img
            className="rounded-3xl shadow-lg md:w-1/2"
            src={imageUrl}
            alt="red dot"
          />
        </div>

        {/* Display Live Temperature */}
        <div className="stats shadow w-max m-4">
          <div className="stat">
            <div className="stat-title">Temperature</div>
            <div className="stat-value">
              {temperature ? temperature : "Loading..."}
            </div>
          </div>
        </div>
        <div className="stats shadow w-max m-4">
          <div className="stat">
            <div className="stat-title">Humidity</div>
            <div className="stat-value">
              {humidity ? humidity : "Loading..."}
            </div>
          </div>
        </div>
        <div className="stats shadow w-max m-4">
          <div className="stat">
            <div className="stat-title">Accelerometer</div>
            <div className="stat-value">
              {accelerometerMessage ? accelerometerMessage : "Loading..."}
            </div>
          </div>
        </div>
        <div className="stats shadow w-max m-4">
          <div className="stat">
            <div className="stat-title">Gyroscope</div>
            <div className="stat-value">
              {gyroscopeMessage ? gyroscopeMessage : "Loading..."}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Testing;
