# Strawbees Package for Makecode micro:bit

## Controlling servos

```blocks
/*
 * Set the angle of a servo connected to the socket "1" to 90°
 */
input.onButtonPressed(Button.A, () => {
	strawbees.setServoAngle(strawbees.servoLabels(SBServoLabels.Servo1), 90)
})

/*
 * Transitions the angle a servo connected to the socket "1" to 180°, over 2
 * seconds using a "bounce out" easing equation.
 */
input.onButtonPressed(Button.B, () => {
	strawbees.transitionServoAngle(strawbees.servoLabels(SBServoLabels.Servo1), 90, 2, SBEasingLabels.OutBounce)
})

/*
 * Sets a continuous servo connected to the socket "2" to full speed in the
 * clockwise direction (100%).
 */
input.onButtonPressed(Button.A, () => {
	strawbees.setContinuousServoSpeed(strawbees.servoLabels(SBServoLabels.Servo2), 100)
})

/*
 * Sets a continuous servo connected to the socket "2" to half speed in the
 * counter-clockwise direction (-100%).
 */
input.onButtonPressed(Button.B, () => { 	
	strawbees.setContinuousServoSpeed(strawbees.servoLabels(SBServoLabels.Servo2), -100)
})
/*
 * Turn off both servos, so that no force is applied to them. This saves battery.
 */
input.onButtonPressed(Button.AB, () => {
	strawbees.turnOffServo(strawbees.servoLabels(SBServoLabels.Servo1))
	strawbees.turnOffServo(strawbees.servoLabels(SBServoLabels.Servo2))
})
```  

## Controlling neopixels

```blocks
/*
 * Sets the neopixel A (above the A button) to red, by specifing the color as
 * percentages of red, green and blue.
 */
input.onButtonPressed(Button.A, () => {
	strawbees.setNeopixelColorRGB(strawbees.neopixelLabels(SBNeopixelLabels.NeopixelA), 100, 0, 0)
})

/*
 * Sets the neopixel B (above the B button) to red, by specifing the color as
 * percentages of hue, saturation and brightness.
 */
input.onButtonPressed(Button.B, () => {
	strawbees.setNeopixelColorHSB(strawbees.neopixelLabels(SBNeopixelLabels.NeopixelB), 0, 100, 100)
})

/*
 * Sets neopixels A and B, to yellow and green respectively, by selecting the
 * colors ny name from a pre-defined list.
 * percentages of red, green and blue.
 */
input.onButtonPressed(Button.AB, () => {
	strawbees.setNeopixelColorLabel(strawbees.neopixelLabels(SBNeopixelLabels.NeopixelA), strawbees.colorLabels(SBColorLabels.Yellow))
	strawbees.setNeopixelColorLabel(strawbees.neopixelLabels(SBNeopixelLabels.NeopixelB), strawbees.colorLabels(SBColorLabels.Green))
})

```   

## Supported targets

* for PXT/microbit

## License

MIT
