{
	/*
	 * Set the angle of a servo connected to the socket "1" to 90°
	 */
	strawbees.setServoAngle(strawbees.servoLabels(SBServoLabels.Servo1), 90)

	/*
	 * Transitions the angle a servo connected to the socket "1" to 180°, over 2
	 * seconds using a "bounce out" easing equation.
	 */
	strawbees.transitionServoAngle(strawbees.servoLabels(SBServoLabels.Servo1), 90, 2, SBEasingLabels.OutBounce)

	/*
	 * Sets a continuous servo connected to the socket "2" to full speed in the
	 * clockwise direction (100%).
	 */
	strawbees.setContinuousServoSpeed(strawbees.servoLabels(SBServoLabels.Servo2), 100)

	/*
	 * Sets a continuous servo connected to the socket "2" to half speed in the
	 * counter-clockwise direction (-100%).
	 */
	strawbees.setContinuousServoSpeed(strawbees.servoLabels(SBServoLabels.Servo2), -100)

	/*
	 * Turn off both servos, so that no force is applied to them. This saves battery.
	 */
	strawbees.turnOffServo(strawbees.servoLabels(SBServoLabels.Servo1))
	strawbees.turnOffServo(strawbees.servoLabels(SBServoLabels.Servo2))

	/*
	 * Sets the neoPixel A (above the A button) to red, by specifing the color as
	 * percentages of red, green and blue.
	 */
	strawbees.setNeoPixelColorRGB(strawbees.neoPixelLabels(SBNeoPixelLabels.NeoPixelA), 100, 0, 0)

	/*
	 * Sets the neoPixel B (above the B button) to red, by specifing the color as
	 * percentages of hue, saturation and brightness.
	 */
	strawbees.setNeoPixelColorHSB(strawbees.neoPixelLabels(SBNeoPixelLabels.NeoPixelB), 0, 100, 100)

	/*
	 * Sets neoPixels A and B, to yellow and green respectively, by selecting the
	 * colors ny name from a pre-defined list.
	 * percentages of red, green and blue.
	 */
	strawbees.setNeoPixelColorLabel(strawbees.neoPixelLabels(SBNeoPixelLabels.NeoPixelA), strawbees.colorLabels(SBColorLabels.Yellow))
	strawbees.setNeoPixelColorLabel(strawbees.neoPixelLabels(SBNeoPixelLabels.NeoPixelB), strawbees.colorLabels(SBColorLabels.Green))
}
