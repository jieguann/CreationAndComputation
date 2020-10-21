#include <Servo.h> 

//Servo
int servoPin = 6;
Servo servo;  
int angle = 0; 

//photo
int photocellPin = 15;
int photocellReading; 
//LED
int ledYellow = 3;
int ledBlue = 2;

int ledRed1 = 4;
int ledRed2 = 5;

void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  Serial.begin(9600);   
  
  pinMode(ledYellow, OUTPUT);
  pinMode(ledBlue, OUTPUT);
  pinMode(ledRed1, OUTPUT);
  pinMode(ledRed2, OUTPUT);
  
  servo.attach(servoPin); 
}

// the loop function runs over and over again forever
void loop() {

  
  
  photon();
  

  
  if(photocellReading < 300){
  led();
  }
  
  if(photocellReading > 900){
  servoR();
  }

  if(photocellReading > 300 &&photocellReading < 900 ){
  led();
  servoR();
  }
  
}

//LED
void led(){
  yellow();
  //blue();
  red1();
  red2();
  }
  
void yellow(){
  digitalWrite(ledYellow, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(500);                       // wait for a second
  digitalWrite(ledYellow, LOW);    // turn the LED off by making the voltage LOW
  delay(10);                       // wait for a second
  }

void blue(){
  digitalWrite(ledBlue, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(500);                       // wait for a second
  digitalWrite(ledBlue, LOW);    // turn the LED off by making the voltage LOW
  delay(10);                       // wait for a second
  }

void red1(){
  digitalWrite(ledRed1, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(500);                       // wait for a second
  digitalWrite(ledRed1, LOW);    // turn the LED off by making the voltage LOW
  delay(10);                       // wait for a second
  }

void red2(){
  digitalWrite(ledRed2, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(500);                       // wait for a second
  digitalWrite(ledRed2, LOW);    // turn the LED off by making the voltage LOW
  delay(10);                       // wait for a second
  }

//photon sensor
void photon(){
  photocellReading = analogRead(photocellPin);  
 photocellReading = 1023 - photocellReading;
  Serial.print("Analog reading = ");
  Serial.println(photocellReading);     // the raw analog reading
 
  // LED gets brighter the darker it is at the sensor
  // that means we have to -invert- the reading from 0-1023 back to 1023-0
  
  //now we have to map 0-1023 to 0-255 since thats the range analogWrite uses
  //LEDbrightness = map(photocellReading, 0, 1023, 0, 255);
  //analogWrite(LEDpin, LEDbrightness);
 
  delay(50);
  }



void servoR(){
  
  for(angle = 0; angle < 180; angle=angle+5)  
  {                                  
    servo.write(angle);               
    delay(15);                   
  } 
  // now scan back from 180 to 0 degrees
  for(angle = 180; angle > 0; angle=angle -5)    
  {                                
    servo.write(angle);           
    delay(15);       
  } 
  /*
  servo.write(0);               
  delay(15); 
  servo.write(90);               
  delay(15); 
  servo.write(180);               
  delay(15); 
  servo.write(90);               
  delay(15); */

  }
