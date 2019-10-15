# Strawbees Package for MakeCode micro:bit
This package allows you to program the micro:bit to use it with the Strawbees XXXXXXX.

The extension allows you to control up to two servos (both standard and
continuous) and two built-in NeoPixels (a special type of LED that you can
choose the color).

If you want to learn more about how to use this extension in the classroom,
please visit our learning platform: [Strawbees Learning](https://learning.sb.com).

-------------------------------------------------------------------------------
# Coding Cards
The easiest way to learn how you can program the XXXXX is to try it! For that
we have prepared a few examples that you can use to learn the basics and build
upon. You can follow the examples below, or [download them as printable coding cards](https://XXXX),
to use directly in the class room. Just pick a number of a card and try it out!

## Coding card 1
Press a button to move the servo to a random position.
```blocks
input.onButtonPressed(Button.A, function () {
    sb.setServoPosition(sb.servo(SBServo.ServoA), Math.randomRange(0, 100))
})
```
## Coding card 2
Move the servo between two positions with buttons.
```blocks
input.onButtonPressed(Button.A, function () {
    sb.setServoPosition(sb.servo(SBServo.ServoA), 25)
})
input.onButtonPressed(Button.B, function () {
    sb.setServoPosition(sb.servo(SBServo.ServoA), 75)
})
```
## Coding card 3
Move the servo gradually by pressing a button.
```blocks
input.onButtonPressed(Button.A, function () {
    position += 5
})
let position = 0
basic.forever(function () {
    sb.setServoPosition(sb.servo(SBServo.ServoA), position)
})
```
## Coding card 4
Repeat a sequence of servo movements, 4 times, when a button is pressed.
```blocks
input.onButtonPressed(Button.A, function () {
    for (let index = 0; index < 4; index++) {
        sb.setServoPosition(sb.servo(SBServo.ServoA), 25)
        basic.pause(200)
        sb.setServoPosition(sb.servo(SBServo.ServoA), 75)
        basic.pause(500)
    }
})
```
## Coding card 5
A periodic servo movement.
```blocks
basic.forever(function () {
    sb.setServoPosition(sb.servo(SBServo.ServoA), 40)
    basic.pause(200)
    sb.setServoPosition(sb.servo(SBServo.ServoA), 60)
    basic.pause(200)
})
```
## Coding card 6
Movement transition.
```blocks
basic.forever(function () {
    sb.transitionServoPosition(sb.servo(SBServo.ServoA), 50, 1, sb.easing(SBEasing.QuadOut))
    sb.transitionServoPosition(sb.servo(SBServo.ServoA), 0, 1, sb.easing(SBEasing.QuadIn))
})
```
## Coding card 7
Shake to make the servo shake.
```blocks
input.onGesture(Gesture.Shake, function () {
    for (let index = 0; index < 10; index++) {
        sb.setServoPosition(sb.servo(SBServo.ServoA), 50)
        basic.pause(100)
        sb.setServoPosition(sb.servo(SBServo.ServoA), 60)
        basic.pause(100)
    }
})
```
## Coding card 8
Tilt back and forth to rotate the servo.
```blocks
basic.forever(function () {
    sb.setServoPosition(sb.servo(SBServo.ServoA), Math.map(input.acceleration(Dimension.Y), 0, 1023, 0, 100))
})
```
-------------------------------------------------------------------------------
# Documentation - Servo
## sb.setServoPosition
Sets the position of a servo by specifying a value ranging from `0%` to `100%`.
```sig
sb.setServoPosition(sb.servo(SBServo.ServoA), 100)
```
### Parameters
* `servo` - Which servo to set the position to.
* `position` - The position ranging from `0%` to `100%`.

### Example
Sets the position of a servo connected to the socket "A" (behind the A button)
all the way to the end-position (`100%`), wait one second, then return the servo
to the start position (`0%`).
```blocks
sb.setServoPosition(sb.servo(SBServo.ServoA), 100)
basic.pause(1000)
sb.setServoPosition(sb.servo(SBServo.ServoA), 0)
```

## sb.transitionServoPosition
Transitions the position of a servo over a duration of time (in seconds). The
"shape" of the transition is specified by choosing one of the easing functions
by name.
```sig
sb.transitionServoPosition(sb.servo(SBServo.ServoA), 100, 1, SBEasing.Linear)
```
### Parameters
* `servo` - Which servo to set the position to.
* `position` - The position ranging from `0%` to `100%`.
* `duration` - The duration of the transition.
* `easing` - The "shape" of the transition.

### Example
Transitions the position a servo connected to the socket "A" (behind the A
button) to the end-position (`100%`), over 2 seconds. Then transition the servo
back to the start-position (`0%`) also over 2 seconds. When the servo moves from
one position to the other, the movement will start slow and then speed up,
achieved by using the `quad out` easing function.
```blocks
sb.transitionServoPosition(sb.servo(SBServo.ServoA), 100, 2, SBEasing.OutQuad)
sb.transitionServoPosition(sb.servo(SBServo.ServoA), 0, 2, SBEasing.OutQuad)
```

## sb.setContinuousServoSpeed
Sets the speed of a **continuous servo** in a arbitrary range from `-100%` to
`100%`. If the connected servo is not continuous, this will not work as
expected.
```sig
sb.setContinuousServoSpeed(sb.servo(SBServo.ServoA), 100)
```
### Parameters
* `servo` - Which continuous servo to set the speed to.
* `speed` - The speed ranging from `-100%` to `100%`.

### Example
Sets a continuous servo connected to the socket "B" (behind the B button) to
full speed in the clockwise direction (`100%`), wait 3 seconds, then revert
the direction to counter-clockwise, on half speed (`-50%`)
```blocks
sb.setContinuousServoSpeed(sb.servo(SBServo.ServoB), 100)
basic.pause(3000)
sb.setContinuousServoSpeed(sb.servo(SBServo.ServoB), -50)
```

## sb.turnOffServo
Turns a servo off so that no force will be applied and it can be rotated
manually. This saves battery.
```sig
sb.turnOffServo(sb.servo(SBServo.ServoA))
```
### Parameters
* `servo` - Which servo to turn off.

### Example
Sets the position of a servo connected to the socket "A" (behind the A button)
all the way to the end-position (`100%`), wait one second, then turn off the
servo.
```blocks
sb.setServoPosition(sb.servo(SBServo.ServoA), 100)
basic.pause(100)
sb.turnOffServo(sb.servo(SBServo.ServoA))
```
-------------------------------------------------------------------------------
# Documentation - NeoPixel
## sb.setNeoPixelColorRGB
Sets the color of an individual NeoPixel by specifying the amount of red,
green and blue in the color. The amounts range from `0%` to `100%`.
```sig
sb.setNeopixelColorRGB(sb.NeoPixel(SBNeopixel.NeopixelA), 100, 100, 100)
```
### Parameters
* `neoPixel` - Which NeoPixel to set the color.
* `red` - Amount of red in color, ranging from `0%` to `100%`.
* `green` - Amount of green in color, ranging from `0%` to `100%`.
* `blue` - Amount of blue in color, ranging from `0%` to `100%`.

### Example
Sets the NeoPixel "A" (above the A button) to red, by specifing the color as
percentages of red (`100%`), green (`0%`) and blue (`0%`).
```blocks
sb.setNeopixelColorHSB(sb.NeoPixel(SBNeopixel.NeopixelA), 100, 100, 100)
```
## sb.setNeoPixelColorHSB
Sets the color of an individual NeoPixel by specifying the amount of hue,
saturation and brightness in the color. The amounts range from `0%` to `100%`.
```sig
sb.setNeopixelColorHSB(sb.NeoPixel(SBNeopixel.NeopixelA), 100, 100, 100)
```
### Parameters
* `neoPixel` - Which NeoPixel to set the color.
* `hue` - Hue of the color, ranging from `0%` to `100%`.
* `saturation` - Saturation of the color, ranging from `0%` to `100%`.
* `brightness` - Brightness of the color, ranging from `0%` to `100%`.

### Example
Sets the NeoPixel "B" (above the B button) to red, by specifing the color as
percentages of hue (`0%`), saturation (`100%`) and brightness (`100%`).
```blocks
sb.setNeopixelColorHSB(sb.NeoPixel(SBNeopixel.NeopixelB), 0, 100, 100)
```

## sb.setNeoPixelColor
Sets the color of an individual NeoPixel by specifying the color by name.
```sig
sb.setNeopixelColor(sb.neoPixel(SBNeopixel.NeopixelA), sb.color(SBColor.Red))
```
### Parameters
* `neoPixel` - Which NeoPixel to set the color.
* `color` - The name of the color from a list of color labels.

### Example
Sets NeoPixels "A" and "B", to yellow and green respectively, by selecting the
colors by name from a pre-defined list.
```blocks
sb.setNeopixelColor(sb.neoPixel(SBNeopixel.NeopixelA), sb.color(SBColor.Yellow))
sb.setNeopixelColor(sb.neoPixel(SBNeopixel.NeopixelB), sb.color(SBColor.Green))
})
```
-------------------------------------------------------------------------------

## Supported targets

* for PXT/microbit

## License

MIT
