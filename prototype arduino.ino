/*
 * PROGRAMME DE TEST MATERIEL - ARDUINO UNO WAREHOUSE
 * Objectif : Tester le câblage et la communication Série
 * Compatible Arduino UNO R3
 */

// --- DÉFINITION DES PINS ARDUINO UNO ---
const int PIN_TRIG   = 9;   // Pin 9 (remplace D5 ESP32)
const int PIN_ECHO   = 10;  // Pin 10 (remplace D18 ESP32)  
const int PIN_LED    = 13;  // Pin 13 (LED intégrée UNO + remplace D21)
const int PIN_BUZZER = 8;   // Pin 8 (remplace D4 ESP32)

void setup() {
  // 1. Démarrage de la console Série (USB)
  Serial.begin(9600);  // UNO utilise 9600 baud (plus stable)
  
  // Attendre un peu que le port série s'ouvre
  delay(1000); 
  Serial.println("\n--- DEMARRAGE DU TEST DE DIAGNOSTIC ARDUINO UNO ---");

  // 2. Configuration des Pins
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  pinMode(PIN_LED, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);

  // 3. Test des Actuateurs (LED + Buzzer) au démarrage
  Serial.println("TEST 1: Actuateurs...");
  
  Serial.println("-> LED ON");
  digitalWrite(PIN_LED, HIGH);
  delay(500);
  
  Serial.println("-> Buzzer ON");
  tone(PIN_BUZZER, HIGH);
  delay(200);
  
  Serial.println("-> Tout OFF");
  digitalWrite(PIN_LED, LOW);
  noTone(PIN_BUZZER);
  
  Serial.println("TEST 1 REUSSI. Debut de la lecture capteur...");
  Serial.println("---------------------------------------------");
}

void loop() {
  // --- TEST DU CAPTEUR ULTRASON ---
  
  // Envoi de l'impulsion
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);

  // Lecture du retour
  long duration = pulseIn(PIN_ECHO, HIGH);
  float distance = duration * 0.034 / 2;

  // Affichage dans le Moniteur Série
  Serial.print("Distance Mesurée : ");
  
  if (duration == 0) {
    // Si duration est 0, le capteur est mal branché ou la pin Echo est morte
    Serial.println("ERREUR CAPTEUR (0 cm) - Vérifiez le câblage !");
  } else {
    Serial.print(distance);
    Serial.println(" cm");
    
    // Test visuel interactif
    // Si vous mettez la main devant (< 10cm), la LED s'allume
    if (distance < 10) {
      digitalWrite(PIN_LED,HIGH);
      delay(250);
      digitalWrite(PIN_LED,LOW);
      tone(PIN_BUZZER, HIGH);  // Buzzer s'active aussi !
      Serial.println("  -> OBJET DETECTÉ (LED + BUZZER ACTIVÉS)");
    } else {
      digitalWrite(PIN_LED, LOW);
      noTone(PIN_BUZZER);
    }
  }

  delay(250); // Pause pour lire tranquillement
}

