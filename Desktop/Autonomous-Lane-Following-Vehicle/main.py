from machine import Pin, PWM
from time import sleep

# =====================================
# IR SENSOR CONNECTIONS
# =====================================

left_sensor = Pin(32, Pin.IN)
right_sensor = Pin(34, Pin.IN)

# =====================================
# LEFT MOTORS - CHANNEL A
# =====================================

AIN1 = Pin(18, Pin.OUT)
AIN2 = Pin(19, Pin.OUT)
PWMA = PWM(Pin(23), freq=1000)

# =====================================
# RIGHT MOTORS - CHANNEL B
# =====================================

BIN1 = Pin(25, Pin.OUT)
BIN2 = Pin(26, Pin.OUT)
PWMB = PWM(Pin(27), freq=1000)

# =====================================
# DRIVER STANDBY
# =====================================

STBY = Pin(33, Pin.OUT)

# =====================================
# SPEED SETTINGS
# =====================================

FORWARD_SPEED = 80
TURN_SPEED = 80

# =====================================
# MOTOR CONTROL
# Positive = Forward
# Negative = Reverse
# =====================================

def set_left(speed):

    speed = max(-100, min(100, speed))

    if speed > 0:
        AIN1.value(1)
        AIN2.value(0)

    elif speed < 0:
        AIN1.value(0)
        AIN2.value(1)

    else:
        AIN1.value(0)
        AIN2.value(0)

    PWMA.duty_u16(int(abs(speed) * 65535 / 100))


def set_right(speed):

    speed = max(-100, min(100, speed))

    if speed > 0:
        BIN1.value(1)
        BIN2.value(0)

    elif speed < 0:
        BIN1.value(0)
        BIN2.value(1)

    else:
        BIN1.value(0)
        BIN2.value(0)

    PWMB.duty_u16(int(abs(speed) * 65535 / 100))


# =====================================
# MOVEMENT FUNCTIONS
# =====================================

def stop():

    PWMA.duty_u16(0)
    PWMB.duty_u16(0)

    AIN1.value(0)
    AIN2.value(0)
    BIN1.value(0)
    BIN2.value(0)


def forward():

    set_left(FORWARD_SPEED)
    set_right(FORWARD_SPEED)


def turn_left():

    set_left(TURN_SPEED)
    set_right(FORWARD_SPEED)


def turn_right():

    set_left(FORWARD_SPEED)
    set_right(TURN_SPEED)


# =====================================
# MAIN PROGRAM
# =====================================

stop()
STBY.value(1)

print("================================")
print(" AUTONOMOUS LINE FOLLOWER STARTED")
print("================================")

try:

    while True:

        left = left_sensor.value()
        right = right_sensor.value()

        print("LEFT:", left, " RIGHT:", right)

        # Both sensors detect WHITE
        if left == 0 and right == 0:

            stop()
            print("WHITE DETECTED - STOP")

        # Left sensor detects BLACK
        elif left == 1 and right == 0:

            turn_left()
            print("TURN LEFT")

        # Right sensor detects BLACK
        elif left == 0 and right == 1:

            turn_right()
            print("TURN RIGHT")

        # Both sensors detect BLACK
        elif left == 1 and right == 1:

            forward()
            print("FORWARD")

        sleep(0.02)

except KeyboardInterrupt:

    print("MANUAL INTERRUPT")

finally:

    stop()
    STBY.value(0)

    PWMA.deinit()
    PWMB.deinit()

    print("VEHICLE STOPPED")