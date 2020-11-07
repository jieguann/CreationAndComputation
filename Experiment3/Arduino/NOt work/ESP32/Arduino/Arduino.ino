

//single
int sersorPin1 = 35;
int distance1;
int sersorPin2 = 33;
int distance2;
//Double
//const int trigPin = 27;//out
const int lightPin = 14;//in
int light;





void setup() {
  
  Serial.begin(115200);


  //Sensor
  //pinMode(sersorPin1,INPUT);
  //pinMode(sersorPin2,INPUT);

  //pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(lightPin, INPUT); // Sets the echoPin as an Input
}

  
void loop() {
  //DoubleSensor();
  distance1 = analogRead(sersorPin1);
  distance2 = analogRead(sersorPin2);
  light = analogRead(lightPin);
  light = 4095 -light;
  
  delay(500);
  Serial.print("Sensor1  ");
  Serial.println(distance1);
  Serial.print("Sensor2  ");
  Serial.println(distance2);
  Serial.print("Light  ");
  Serial.println(light);
  //adjust number

  
  
 
  
}
