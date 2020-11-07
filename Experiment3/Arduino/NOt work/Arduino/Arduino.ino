

//single
int sersorPin1 = 15;
int distance1;
int sersorPin2 = 16;
int distance2;
//Double
const int trigPin = 2;//out
const int echoPin = 17;//in
long duration;
int distance3;





void setup() {
  
  Serial.begin(9600);


  //Sensor
  pinMode(sersorPin1,INPUT);
  pinMode(sersorPin2,INPUT);

  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
}

  
void loop() {
  
  distance1 = analogRead(sersorPin1);
  distance2 = analogRead(sersorPin2);
  
  delay(500);
  Serial.print("Sensor1  ");
  Serial.println(distance1);
  Serial.print("Sensor2  ");
  Serial.print("Sensor2  ");
  Serial.println("Sensor3");
  Serial.println(distance3);
  //adjust number

  
  DoubleSensor();
 
  
}


void DoubleSensor() {
// Clears the trigPin
digitalWrite(trigPin, LOW);
delayMicroseconds(2);
// Sets the trigPin on HIGH state for 10 micro seconds
digitalWrite(trigPin, HIGH);
delayMicroseconds(10);
digitalWrite(trigPin, LOW);
// Reads the echoPin, returns the sound wave travel time in microseconds
duration = pulseIn(echoPin, HIGH);
// Calculating the distance
distance3= duration*0.034/2;
// Prints the distance on the Serial Monitor
//Serial.print("Distance: ");
Serial.println(distance3);
}
