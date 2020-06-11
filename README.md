# Strawbees Robotic Inventions for micro:bit
![Strawbees Robotic Inventions for micro:bit](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/cover.png?2)

This package allows you to program the micro:bit to use it with our kit
*[Robotic Inventions for micro:bit](https://strawbees.com/product/robotic-inventions-add-on_for-the-microbit-add-on-kit-single-pack/)*.

The kit allows you to control up to three servos (standard or continuous) and
two built-in RGB LEDs.

If you want to learn how to use this kit in the classroom, please visit our
[learning platform](https://learning.strawbees.com/product/microbit/).

-------------------------------------------------------------------------------
### Table of contents
- [Getting started](#getting-started)
- [First program](#first-program)
- [Coding Cards](#coding-cards)
    - [Blink](#blink)
    - [Back and forth](#back-and-forth)
    - [Change color 10 times](#change-color-10-times)
    - [Wave 10 times](#wave-10-times)
    - [Gradually change brightness](#gradually-change-brightness)
    - [Gradually change position](#gradually-change-position)
    - [Change color while pressing button](#change-color-while-pressing-button)
    - [Change position while pressing button](#change-position-while-pressing-button)
    - [Move in the dark](#move-in-the-dark)
    - [Color party](#color-party)
    - [Shake](#shake)
    - [Rainbow](#rainbow)
    - [Sweep motor](#sweep-motor)
    - [Loop over a list of colors](#loop-over-a-list-of-colors)
    - [Loop over a list of positions](#loop-over-a-list-of-positions)
    - [Light switch](#light-switch)
    - [Press button to toggle position](#press-button-to-toggle-position)
    - [Tilt to change color](#tilt-to-change-color)
    - [Tilt to move](#tilt-to-move)
    - [Light alarm](#light-alarm)
    - [Move when moved](#move-when-moved)
    - [Send/Receive color: Sender](#sendreceive-color-sender)
    - [Send/Receive color: Receiver](#sendreceive-color-receiver)
    - [Remote control motor: Sender](#remote-control-motor-sender)
    - [Remote control motor: Receiver](#remote-control-motor-receiver)
- [Documentation](#documentation)
    - [sb.setServoPosition](#sbsetservoposition)
    - [sb.transitionServoPosition](#sbtransitionservoposition)
    - [sb.setContinuousServoSpeed](#sbsetcontinuousservospeed)
    - [sb.turnOffServo](#sbturnoffservo)
    - [sb.setRgbLedColorRGB](#sbsetrgbledcolorrgb)
    - [sb.setRgbLedColorHSB](#sbsetrgbledcolorhsb)
    - [sb.setRgbLedColor](#sbsetrgbledcolor)


-------------------------------------------------------------------------------

# Getting started
We have prepared an onboarding guide that will help you get started with the
*Robotic Inventions for micro:bit*. Make sure to check it before using the kit
for the first time. The guide will cover:
- Assemble the Strawbees Robotics Board for the micro:bit.
- Use a battery to power the micro:bit.
- Use motors with the Robotics Board and the micro:bit.
- Connect the micro:bit to Strawbees structures.
- Installing and Getting Started with the Strawbees MakeCode extension.
- Use the micro:bit Coding cards.

[Download onboarding PDF](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/Strawbees_Robotic_Inventions_for_microbit-onboarding.pdf)

-------------------------------------------------------------------------------

# First program
If this is your first time using the kit (or if you are preparing it to use it
in the classroom for the first time), we recommend that you start by
programming the micro:bit with the example below. It allows you to control the
servo with the buttons and is a great way to start exploring the movement
possibilities before diving into coding.

```blocks
let position = 0
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        position += -1
        sb.setRgbLedColor(sb.rgbLed(SBRgbLed.RgbLedA), sb.color(SBColor.Red))
    } else {
        sb.setRgbLedColor(sb.rgbLed(SBRgbLed.RgbLedA), sb.color(SBColor.Blue))
    }
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.B)) {
        position += 1
        sb.setRgbLedColor(sb.rgbLed(SBRgbLed.RgbLedB), sb.color(SBColor.Red))
    } else {
        sb.setRgbLedColor(sb.rgbLed(SBRgbLed.RgbLedB), sb.color(SBColor.Blue))
    }
})
basic.forever(function () {
    position = Math.constrain(position, 0, 100)
    sb.setServoPosition(sb.servo(SBServo.ServoA), position)
})
```

-------------------------------------------------------------------------------
# Coding Cards
Coding cards are small snippets of code that can be used to explore different
concepts.

They are not meant to be used as they are but for you to tweak the numbers and
combine the cards to get the expected result.

The cards are grouped by the hardware in use:

![Hardware icons](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Hardware_Icons-Strawbees_Robotic_Inventions_for_microbit.jpg)


## Blink
![Blink](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Blink-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
basic.forever(function () {
    sb.setRgbLedColor(sb.rgbLed(SBRgbLed.RgbLedA), sb.color(SBColor.White))
    basic.pause(1000)
    sb.setRgbLedColor(sb.rgbLed(SBRgbLed.RgbLedA), sb.color(SBColor.Black))
    basic.pause(1000)
})
```

## Back and forth
![Back and forth](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Back_and_forth-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
basic.forever(function () {
    sb.transitionServoPosition(sb.servo(SBServo.ServoA), 0, 1, sb.easing(SBEasing.Linear))
    sb.transitionServoPosition(sb.servo(SBServo.ServoA), 100, 1, sb.easing(SBEasing.Linear))
})
```

## Change color 10 times
![Change color 10 times](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Change_color_10_times-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
for (let index = 0; index < 10; index++) {
    sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 100, 0, 0)
    basic.pause(500)
    sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 0, 0, 100)
    basic.pause(500)
}
sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 0, 0, 0)
```
## Wave 10 times
![Wave 10 times](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Wave_10_times-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
for (let index = 0; index < 10; index++) {
    sb.setServoPosition(sb.servo(SBServo.ServoA), 20)
    basic.pause(1000)
    sb.setServoPosition(sb.servo(SBServo.ServoA), 80)
    basic.pause(1000)
}
```
## Gradually change brightness
![Gradually change brightness](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Gradually_change_brightness-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
input.onButtonPressed(Button.A, function () {
    brightness = Math.constrain(brightness + 4, 0, 100)
})
let brightness = 0
brightness = 0
basic.forever(function () {
    sb.setRgbLedColorHSB(sb.rgbLed(SBRgbLed.RgbLedA), 0, 100, brightness)
})
```

## Gradually change position
![Gradually change position](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Gradually_change_position-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
input.onButtonPressed(Button.A, function () {
    position = Math.constrain(position + 4, 0, 100)
})
let position = 0
position = 0
basic.forever(function () {
    sb.setServoPosition(sb.servo(SBServo.ServoA), position)
})
```

## Change color while pressing button
![Change color while pressing button](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Change_color_while_pressing_button-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 100, 0, 0)
    } else {
        sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 0, 0, 100)
    }
})
```

## Change position while pressing button
![Change position while pressing button](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Change_position_while_pressing_button-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        sb.setServoPosition(sb.servo(SBServo.ServoA), 0)
    } else {
        sb.setServoPosition(sb.servo(SBServo.ServoA), 100)
    }
})
```

## Shine in the dark
![Shine in the dark](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Shine_in_the_dark-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
basic.forever(function () {
    if (input.lightLevel() < 50) {
        sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 100, 0, 0)
    } else {

    }
})
```

## Move in the dark
![Move in the dark](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Move_in_the_dark-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
basic.forever(function () {
    sb.setServoPosition(sb.servo(SBServo.ServoA), Math.constrain(input.lightLevel(), 0, 100))
})
```

## Color party
![Color party](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Color_party-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
basic.forever(function () {
    sb.setRgbLedColorHSB(sb.rgbLed(SBRgbLed.RgbLedA), Math.randomRange(0, 100), 100, 100)
    basic.pause(200)
})
```

## Shake
![Shake](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Shake-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
basic.forever(function () {
    sb.setServoPosition(sb.servo(SBServo.ServoA), Math.randomRange(0, 100))
})
```

## Rainbow
![Rainbow](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Rainbow-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
basic.forever(function () {
    for (let index = 0; index <= 100; index++) {
        sb.setRgbLedColorHSB(sb.rgbLed(SBRgbLed.RgbLedA), index, 100, 100)
        basic.pause(100)
    }
})
```

## Sweep motor
![Sweep motor](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Sweep_motor-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
basic.forever(function () {
    for (let index = 0; index <= 100; index++) {
        sb.setServoPosition(sb.servo(SBServo.ServoA), index)
        basic.pause(100)
    }
})
```

## Loop over a list of colors
![Loop over a list of colors](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Loop_over_a_list_of_colors-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
let list = [sb.colorLabel(SBColor.Red), sb.colorLabel(SBColor.Green), sb.colorLabel(SBColor.Blue)]
basic.forever(function () {
    for (let value of list) {
        sb.setRgbLedColor(sb.rgbLed(SBRgbLed.RgbLedA), value)
        basic.pause(1000)
    }
})
```

## Loop over a list of positions
![Loop over a list of positions](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Loop_over_a_list_of_positions-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
let list = [0, 50, 100]
basic.forever(function () {
    for (let value of list) {
        sb.setServoPosition(sb.servo(SBServo.ServoA), value)
        basic.pause(1000)
    }
})
```

## Light switch
![Light switch](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Light_switch-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
let toggle = 0
input.onButtonPressed(Button.A, function () {
    if (toggle == 0) {
        sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 100, 0, 0)
        toggle = 1
    } else {
        sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 0, 0, 0)
        toggle = 0
    }
})
```

## Press button to toggle position
![Press button to toggle position](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Press_button_to_toggle_position-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
let toggle = 0
input.onButtonPressed(Button.A, function () {
    if (toggle == 0) {
        sb.setServoPosition(sb.servo(SBServo.ServoA), 20)
        toggle = 1
    } else {
        sb.setServoPosition(sb.servo(SBServo.ServoA), 80)
        toggle = 0
    }
})
```

## Tilt to change color
![Tilt to change color](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Tilt_to_change_color-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
let movement = 0
let hue = 0
basic.forever(function () {
    movement = input.acceleration(Dimension.X)
    hue = Math.map(movement, -1023, 1023, 0, 100)
    sb.setRgbLedColorHSB(sb.rgbLed(SBRgbLed.RgbLedA), hue, 100, 100)
})
```

## Tilt to move
![Tilt to move](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Tilt_to_move-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
let movement = 0
let position = 0
basic.forever(function () {
    movement = input.acceleration(Dimension.X)
    position = Math.map(movement, -1023, 1023, 0, 100)
    sb.setServoPosition(sb.servo(SBServo.ServoA), position)
})
```

## Light alarm
![Light alarm](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Light_alarm-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
basic.forever(function () {
    sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 0, 0, 0)
    if (input.acceleration(Dimension.Strength) > 1100) {
        sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 100, 0, 0)
        basic.pause(4000)
    }
})
```

## Move when moved
![Move when moved](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Move_when_moved-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
basic.forever(function () {
    if (input.acceleration(Dimension.Strength) > 1200) {
        sb.transitionServoPosition(sb.servo(SBServo.ServoA), 100, 1, sb.easing(SBEasing.Linear))
        sb.transitionServoPosition(sb.servo(SBServo.ServoA), 0, 1, sb.easing(SBEasing.Linear))
    }
})
```

## Send/Receive color: Sender
![Send/Receive color: Sender](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Send-receive_color-sender-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
radio.setGroup(1)
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        radio.sendValue("light", 100)
    } else {
        radio.sendValue("light", 0)
    }
})
```

## Send/Receive color: Receiver
![Send/Receive color: Receiver](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Send-receive_color-receiver-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "light") {
        sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 0, value, 0)
    }
})
radio.setGroup(1)
```

## Remote control motor: Sender
![Remote control motor: Sender](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Remote_control_motor-sender-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
let movement = 0
radio.setGroup(1)
basic.forever(function () {
    movement = Math.map(input.acceleration(Dimension.X), -1023, 1023, 0, 100)
    radio.sendValue("movement", movement)
})
```

## Remote control motor: Receiver
![Remote control motor: Receiver](https://github.com/strawbees/pxt-strawbees-microbit/raw/master/docs/coding-cards/Coding_card-Remote_control_motor-receiver-Strawbees_Robotic_Inventions_for_microbit.jpg)

```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "movement") {
        sb.setServoPosition(sb.servo(SBServo.ServoA), value)
    }
})
radio.setGroup(1)
```

-------------------------------------------------------------------------------
# Documentation
## sb.setServoPosition
Sets the position of a servo by specifying a value ranging from `0%` to `100%`.
```sig
sb.setServoPosition(sb.servo(SBServo.ServoA), 100)
```

### Parameters
* `servo` - Which servo (`A`, `B` or `C`) to set the position to.
* `position` - The position ranging from `0%` to `100%`.

### Example
Sets the position of a servo connected to the socket `A` all the way to the
end-position (`100%`), wait one second, then return the servo to the start
position (`0%`).
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
sb.transitionServoPosition(sb.servo(SBServo.ServoA), 100, 1, sb.easing(SBEasing.Linear))
```

### Parameters
* `servo` - Which servo (`A`, `B` or `C`) to set the position to.
* `position` - The position ranging from `0%` to `100%`.
* `duration` - The duration of the transition, in seconds.
* `easing` - The "shape" of the transition.

### Example
Transitions the position a servo connected to the socket `A` to the
end-position (`100%`), over 2 seconds. Then transition the servo back to the
start-position (`0%`) also over 2 seconds. When the servo moves from one
position to the other, the movement will start slow and then speed up, achieved
by using the `quad out` easing function.
```blocks
sb.transitionServoPosition(sb.servo(SBServo.ServoA), 100, 2, sb.easing(SBEasing.QuadOut))
sb.transitionServoPosition(sb.servo(SBServo.ServoA), 0, 2, sb.easing(SBEasing.QuadOut))
```

## sb.setContinuousServoSpeed
Sets the speed of a **continuous servo** in a arbitrary range from `-100%` to
`100%`. If the connected servo is not continuous, this will not work as
expected.
```sig
sb.setContinuousServoSpeed(sb.servo(SBServo.ServoA), 100)
```

### Parameters
* `servo` - Which continuous servo (`A`, `B` or `C`) to set the speed to.
* `speed` - The speed ranging from `-100%` to `100%`.

### Example
Sets a continuous servo connected to the socket `B` to full speed in the
clockwise direction (`100%`), wait 3 seconds, then revert the direction to
counter-clockwise, on half speed (`-50%`).
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
* `servo` - Which servo (`A`, `B` or `C`) to turn off.

### Example
Sets the position of a servo connected to the socket `A` all the way to the
end-position (`100%`), wait one second, then turn off the servo.
```blocks
sb.setServoPosition(sb.servo(SBServo.ServoA), 100)
basic.pause(100)
sb.turnOffServo(sb.servo(SBServo.ServoA))
```

## sb.setRgbLedColorRGB
Sets the color of an individual RGB LED by specifying the amount of red,
green and blue in the color. The amounts range from `0%` to `100%`.
```sig
sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 100, 100, 100)
```

### Parameters
* `rgbLed` - Which RGB LED (`A` or `B`) to set the color.
* `red` - Amount of red in color, ranging from `0%` to `100%`.
* `green` - Amount of green in color, ranging from `0%` to `100%`.
* `blue` - Amount of blue in color, ranging from `0%` to `100%`.

### Example
Sets the RGB LED `A` to red, by specifing the color as percentages of red
(`100%`), green (`0%`) and blue (`0%`).
```blocks
sb.setRgbLedColorRGB(sb.rgbLed(SBRgbLed.RgbLedA), 100, 0, 0)
```

## sb.setRgbLedColorHSB
Sets the color of an individual RGB LED by specifying the amount of hue,
saturation and brightness in the color. The amounts range from `0%` to `100%`.
```sig
sb.setRgbLedColorHSB(sb.rgbLed(SBRgbLed.RgbLedA), 100, 100, 100)
```

### Parameters
* `rgbLed` - Which RGB LED (`A` or `B`) to set the color.
* `hue` - Hue of the color, ranging from `0%` to `100%`.
* `saturation` - Saturation of the color, ranging from `0%` to `100%`.
* `brightness` - Brightness of the color, ranging from `0%` to `100%`.

### Example
Sets the RGB LED `B` to red, by specifing the color as percentages of hue
(`0%`), saturation (`100%`) and brightness (`100%`).
```blocks
sb.setRgbLedColorHSB(sb.rgbLed(SBRgbLed.RgbLedB), 0, 100, 100)
```

## sb.setRgbLedColor
Sets the color of an individual RGB LED by specifying the color by name.
```sig
sb.setRgbLedColor(sb.rgbLed(SBRgbLed.RgbLedA), sb.color(SBColor.Red))
```

### Parameters
* `rgbLed` - Which RGB LED (`A` or `B`) to set the color.
* `color` - The name of the color from a list of color labels.

### Example
Sets RGB LEDs `A` and `B`, to yellow and green respectively, by selecting the
colors by name from a pre-defined list.
```blocks
sb.setRgbLedColor(sb.rgbLed(SBRgbLed.RgbLedA), sb.color(SBColor.Yellow))
sb.setRgbLedColor(sb.rgbLed(SBRgbLed.RgbLedB), sb.color(SBColor.Green))
```

-------------------------------------------------------------------------------

## Supported targets
* for PXT/microbit

## License
MIT

<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
