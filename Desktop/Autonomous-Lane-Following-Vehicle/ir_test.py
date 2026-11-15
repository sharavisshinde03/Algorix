from machine import Pin
from time import sleep

# IR sensor connections
left_sensor = Pin(32, Pin.IN)
right_sensor = Pin(34, Pin.IN)

print("IR SENSOR LIVE MONITOR STARTED")

while True:
    left_value = left_sensor.value()
    right_value = right_sensor.value()

    print("LEFT:", left_value, " | RIGHT:", right_value)

    sleep(0.2)