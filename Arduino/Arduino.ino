#include <Servo.h>
Servo servoMotor;
#include <SoftwareSerial.h>  
SoftwareSerial BT(11,10);
String tarea;

void setup() {
   BT.begin(9600);  
  Serial.begin(9600);
  // Servo
  servoMotor.attach(9);
  //Sensor ultrasonido

  
}
 
void loop() {
    if(BT.available())    // Si llega un dato por el puerto BT se envía al monitor serial
  {
    String temp = BT.readString();
    Serial.print(temp);
    tarea.concat(temp);
    if(temp.equals("fo"))
      Serial.println("puto jajaja" + temp);
  }

  // Desplazamos a la posición 0º
  //servoMotor.write(0);
  // Esperamos 1 segundo
  //delay(1000 );
  
  // Desplazamos a la posición 180º
  //servoMotor.write(180);
  // Esperamos 1 segundo
  //delay(1000);
}
