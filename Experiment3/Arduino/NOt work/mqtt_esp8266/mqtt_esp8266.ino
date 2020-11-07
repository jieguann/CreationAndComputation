
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
//#include <WiFi.h>
// Update these with values suitable for your network.

const char* ssid = "guan-2.4";
const char* password = "jieguann";
const char* mqtt_server = "mqtt.eclipse.org";

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE	(50)
char msg[MSG_BUFFER_SIZE];

//sensor
//Distant
//int echoPin = 13; //D7
//int trigPin = 15;//D8
/*
int echoPin = A0; 
int trigPin = 4;//D2
long duration; // variable for the duration of sound wave travel
int distance;
*/
int sersorPin1 = A0;
int distance1;
//MQTTSEND



void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("outTopic", "hello world");
      // ... and resubscribe
      client.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  pinMode(BUILTIN_LED, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  //Sensor
  pinMode(sersorPin1,INPUT);
}


//doc["sensor"] = "gps";
//doc["time"] = 1351824120;

  
void loop() {
  //sensor
  distance1 = analogRead(sersorPin1);
  Serial.println(distance1);
  //adjust number
  char value[50];
  char *pointer_to_created_string;
  float testFloat = random(123.45);
  pointer_to_created_string = dtostrf(testFloat, 6, 2, value);

  //adjust number
  char SensorvalueV[50];
  char *SensorvalueS;
  //distantSensor();
  SensorvalueS = dtostrf(distance1, 6, 2, SensorvalueV);

  
  ///mqtt publich
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
    //Serial.print("Publish message: ");
    client.publish("ocad/creationandcomputation/experiment3/distance", SensorvalueS);
    //client.publish("ocad/creationandcomputation/experiment3/2", pointer_to_created_string);
  
}
/*
void distantSensor(){
digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  // Trigger the sensor by setting the trigPin high for 10 microseconds:
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Read the echoPin, pulseIn() returns the duration (length of the pulse) in microseconds:
  duration = pulseIn(echoPin, HIGH);
  // Calculate the distance:
  distance = duration * 0.034 / 2;
  // Print the distance on the Serial Monitor (Ctrl+Shift+M):
  Serial.print("Distance = ");
  Serial.print(distance);
  Serial.println(" cm");
  delay(50);
}
*/
