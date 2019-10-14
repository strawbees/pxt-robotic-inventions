# Strawbees Package for MakeCode micro:bit
This package allows you to program the micro:bit to use it with the Strawbees XXXXXXX.

The extension allows you to control up to two servos (both standard and
continuous) and two built-in NeoPixels (a special type of LED that you can
choose the color).

If you want to learn more about how to use this extension in the classroom,
please visit our learning platform: [Strawbees Learning](https://learning.strawbees.com).

----------------------------------------------------------------
# Coding Cards
The easiest way to learn how you can program the XXXXX is to try it! For that
we have prepared a few examples that you can use to learn the basics and build
upon. You can follow the examples below, or [download them as printable coding cards](https://XXXX),
to use directly in the class room. Just pick a number of a card and try it out!

## Coding card #1
Press a button to move the servo to a random position.
```blocks
input.onButtonPressed(Button.A, function () {
    strawbees.setServoPosition(strawbees.servoLabels(SBServoLabels.ServoA), Math.randomRange(0, 100))
})
```

## Coding card #2
Move the servo between two positions with buttons.
```blocks
input.onButtonPressed(Button.A, function () {
    strawbees.setServoPosition(strawbees.servoLabels(SBServoLabels.ServoA), 25)
})
input.onButtonPressed(Button.B, function () {
    strawbees.setServoPosition(strawbees.servoLabels(SBServoLabels.ServoA), 75)
})
```

## Coding card #3
Move the servo gradually by pressing a button.
```blocks
input.onButtonPressed(Button.A, function () {
    position += 5
})
let position = 0
basic.forever(function () {
    strawbees.setServoPosition(strawbees.servoLabels(SBServoLabels.ServoA), position)
})
```

## Coding card #4
Move the servo gradually, by pressing a button.
```blocks
```
----------------------------------------------------------------

# Other examples
The examples below are a bit more dry and are designed to show you how to
control servos and NeoPixels.

## Controlling servos
Sets the position of a servo connected to the socket "A" (behind the A button)
to the end (100%).
```blocks
strawbees.setServoPosition(strawbees.servoLabels(SBServoLabels.ServoA), 100)
```

Transitions the position a servo connected to the socket "A" (behind the A
button) to the start (0%), over 2 seconds, using a "bounce out" easing equation.
```blocks
strawbees.transitionServoPosition(strawbees.servoLabels(SBServoLabels.ServoA), 0, 2, SBEasingLabels.OutBounce)
```

Sets a continuous servo connected to the socket "B" (behind the B button) to
full speed in the clockwise direction (100%).
```blocks
strawbees.setContinuousServoSpeed(strawbees.servoLabels(SBServoLabels.ServoB), 100)
```

Sets a continuous servo connected to the socket "B" (behind the B button) to
half speed in the counter-clockwise direction (-50%).
```blocks
strawbees.setContinuousServoSpeed(strawbees.servoLabels(SBServoLabels.ServoB), -50)
```

Turn off both servos, so that no force is applied to them. This saves battery.
```blocks
strawbees.turnOffServo(strawbees.servoLabels(SBServoLabels.ServoA))
strawbees.turnOffServo(strawbees.servoLabels(SBServoLabels.ServoB))
```

## Controlling NeoPixels
Sets the NeoPixel "A" (above the A button) to red, by specifing the color as
percentages of red, green and blue.
```blocks
strawbees.setNeopixelColorRGB(strawbees.NeoPixelLabels(SBNeopixelLabels.NeopixelA), 100, 0, 0)
```

Sets the NeoPixel "B" (above the B button) to red, by specifing the color as
percentages of hue, saturation and brightness.
```blocks
strawbees.setNeopixelColorHSB(strawbees.NeoPixelLabels(SBNeopixelLabels.NeopixelB), 0, 100, 100)

```

Sets NeoPixels "A" and "B", to yellow and green respectively, by selecting the
colors by name from a pre-defined list.
```blocks
strawbees.setNeopixelColorLabel(strawbees.neoPixelLabels(SBNeopixelLabels.NeopixelA), strawbees.colorLabels(SBColorLabels.Yellow))
strawbees.setNeopixelColorLabel(strawbees.neoPixelLabels(SBNeopixelLabels.NeopixelB), strawbees.colorLabels(SBColorLabels.Green))
})
```

## Supported targets

* for PXT/microbit

## License

MIT
