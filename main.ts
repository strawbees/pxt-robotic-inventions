/**
 * Servo lables
 */
enum SBServoLabels {
    //% block="1"
    Servo1 = 0,
    //% block="2"
    Servo2 = 1
}

/**
* Neopixel labels
*/
enum SBNeopixelLabels {
    //% block="A"
    NeopixelA = 0,
    //% block="B"
    NeopixelB = 1
}

/**
 * Color labels
 */
enum SBColorLabels {
    //% block="red"
    Red = 0xff0000,
    //% block="orange"
    Orange = 0xffa500,
    //% block="yellow"
    Yellow = 0xffff00,
    //% block="green"
    Green = 0x00ff00,
    //% block="blue"
    Blue = 0x0000ff,
    //% block="indigo"
    Indigo = 0x4b0082,
    //% block="violet"
    Violet = 0x8a2be2,
    //% block="purple"
    Purple = 0xff00ff,
    //% block="white"
    White = 0xffffff,
    //% block=black
    Black = 0x000000
}

/**
 * Wave type labels
 */
enum SBWaveTypeLabels {
    //% block="sine"
    Sine = 0,
    //% block="cosine"
    Cosine = 1,
    //% block="triangular"
    Triangular = 2,
    //% block="ramp up"
    RampUp = 3,
    //% block="ramp down"
    RampDown = 4,
    //% block="square"
    Square = 5,
    //% block="pulse"
    Pulse = 6
}

/**
 * Easing labels
 */
enum SBEasingLabels {
    //% block="linear"
    Linear = 0,
    //% block="sine in"
    InSine = 1,
    //% block="sine out"
    OutSine = 2,
    //% block="sine in out"
    InOutSine = 3,
    //% block="quad in"
    InQuad = 4,
    //% block="quad out"
    OutQuad = 5,
    //% block="quad in out"
    InOutQuad = 6,
    //% block="cubic in"
    InCubic = 7,
    //% block="cubic out"
    OutCubic = 8,
    //% block="cubic in out"
    InOutCubic = 9,
    //% block="quart in"
    InQuart = 10,
    //% block="quart out"
    OutQuart = 11,
    //% block="quart in out"
    InOutQuart = 12,
    //% block="quint in"
    InQuint = 13,
    //% block="quint out"
    OutQuint = 14,
    //% block="quint int out"
    InOutQuint = 15,
    //% block="expo in"
    InExpo = 16,
    //% block="expo out"
    OutExpo = 17,
    //% block="expo in out"
    InOutExpo = 18,
    //% block="circ in"
    InCirc = 19,
    //% block="circ out"
    OutCirc = 20,
    //% block="circ in out"
    InOutCirc = 21,
    //% block="back in"
    InBack = 22,
    //% block="back out"
    OutBack = 23,
    //% block="back in out"
    InOutBack = 24,
    //% block="elastic in"
    InElastic = 25,
    //% block="elastic out"
    OutElastic = 26,
    //% block="elastic in out"
    InOutElastic = 27,
    //% block="bounce in"
    InBounce = 28,
    //% block="bounce out"
    OutBounce = 29,
    //% block="bounce in out"
    InOutBounce = 30
}

/**
 * Controls the Strawbees integration board.
 */
//% weight=100 color="#f443b0" icon="\u24C8" blockGap=8
namespace strawbees {
    ////////////////////////////////////////////////////////////////////////////
    // Servos
    ////////////////////////////////////////////////////////////////////////////
    class Servo extends servos.Servo {
        private _analogPin: AnalogPin;
        private _digitalPin: DigitalPin;
        private _targetAngle: number;
        constructor(analogPin: AnalogPin, digitalPin: DigitalPin) {
            super();
            this._analogPin = analogPin;
            this._digitalPin = digitalPin;
        }
        targetAngle(): number {
            return this._targetAngle;
        }
        protected internalSetAngle(angle: number): number {
            pins.servoWritePin(this._analogPin, angle);
            this._targetAngle = angle;
            return angle;
        }
        protected internalSetPulse(micros: number): void {
            pins.servoSetPulse(this._analogPin, micros);
        }
        protected internalStop() {
            pins.analogReadPin(this._analogPin);
            pins.setPull(this._digitalPin, PinPullMode.PullNone);
        }
    }
    let _servo1: Servo;
    let _servo2: Servo;
    /**
     * Access (and create if needed) a servo instace.
     * @param id the id of the servo. eg. SBServoLabels.Left
     */
    function servo(servoLabel: number): Servo {
        switch (servoLabel) {
            case 0:
                if (!_servo1) {
                    _servo1 = new Servo(AnalogPin.P13, DigitalPin.P13);
                    _servo1.setAngle(90);
                    pins.servoWritePin(AnalogPin.P13, 90);
                }
                return _servo1;
            case 1:
                if (!_servo2) {
                    _servo2 = new Servo(AnalogPin.P14, DigitalPin.P14);
                    _servo2.setAngle(90);
                    pins.servoWritePin(AnalogPin.P14, 90);
                }
                return _servo2;
        }
        return null;
    }
    /**
     * Sets the position of a servo by specifying the angle (in degrees).
     * @param servoLabel The servo to set the position to.
     * @param degrees The angle to be set from `0°` to `180°`.
     */
    //% blockId=sb_setServoAngle
    //% block="set servo %servoLabel angle to %degrees°"
    //% servoLabel.shadow=sb_servoLabels
    //% degrees.shadow=protractorPicker
    //% degrees.min=0 degrees.max=180 degrees.defl=90
    //% duration.defl=0
    //% inlineInputMode=inline
    export function setServoAngle(servoLabel: number, degrees: number): void {
        servo(servoLabel).setAngle(degrees);
    }

    /**
     * Transtions the position of a servo to the angle (in degrees) over a
     * duration of time (in seconds). The "shape" of the transtion is specified
     * by choosing one of the easing functions by name.
     * @param servoLabel The servo to set the position to.
     * @param degrees The angle to be set from `0°` to `180°`.
     * @param duration The duration of the transition.
     * @param easingLabel The "shape" of the transition.
     */
    //% blockId=sb_transitionServoAngle
    //% block="transition servo %servoLabel angle to %degrees° over %duration seconds %easingLabel"
    //% servoLabel.shadow=sb_servoLabels
    //% degrees.shadow=protractorPicker degrees.min=0 degrees.max=180 degrees.defl=90
    //% duration.min=0 duration.defl=1
    //% easingLabel.shadow=sb_easingLabels
    //% inlineInputMode=inline
    export function transitionServoAngle(servoLabel: number, degrees: number, duration: number, easingLabel: number): void {
        duration *= 1000; // convert to ms
        if (duration < 100) {
            servo(servoLabel).setAngle(degrees);
            return;
        }
        let dt = 50;
        let angle = servo(servoLabel).targetAngle();
        let change = degrees - angle;
        let start = input.runningTime();
        let elapsed = 0;
        while (elapsed < duration) {
            let target;
            switch (easingLabel) {
                case SBEasingLabels.InSine: target = easeInSine(elapsed, angle, change, duration); break;
                case SBEasingLabels.OutSine: target = easeOutSine(elapsed, angle, change, duration); break;
                case SBEasingLabels.InOutSine: target = easeInOutSine(elapsed, angle, change, duration); break;
                case SBEasingLabels.InQuad: target = easeInQuad(elapsed, angle, change, duration); break;
                case SBEasingLabels.OutQuad: target = easeOutQuad(elapsed, angle, change, duration); break;
                case SBEasingLabels.InOutQuad: target = easeInOutQuad(elapsed, angle, change, duration); break;
                case SBEasingLabels.InCubic: target = easeInCubic(elapsed, angle, change, duration); break;
                case SBEasingLabels.OutCubic: target = easeOutCubic(elapsed, angle, change, duration); break;
                case SBEasingLabels.InOutCubic: target = easeInOutCubic(elapsed, angle, change, duration); break;
                case SBEasingLabels.InQuart: target = easeInQuart(elapsed, angle, change, duration); break;
                case SBEasingLabels.OutQuart: target = easeOutQuart(elapsed, angle, change, duration); break;
                case SBEasingLabels.InOutQuart: target = easeInOutQuart(elapsed, angle, change, duration); break;
                case SBEasingLabels.InQuint: target = easeInQuint(elapsed, angle, change, duration); break;
                case SBEasingLabels.OutQuint: target = easeOutQuint(elapsed, angle, change, duration); break;
                case SBEasingLabels.InOutQuint: target = easeInOutQuint(elapsed, angle, change, duration); break;
                case SBEasingLabels.InExpo: target = easeInExpo(elapsed, angle, change, duration); break;
                case SBEasingLabels.OutExpo: target = easeOutExpo(elapsed, angle, change, duration); break;
                case SBEasingLabels.InOutExpo: target = easeInOutExpo(elapsed, angle, change, duration); break;
                case SBEasingLabels.InCirc: target = easeInCirc(elapsed, angle, change, duration); break;
                case SBEasingLabels.OutCirc: target = easeOutCirc(elapsed, angle, change, duration); break;
                case SBEasingLabels.InOutCirc: target = easeInOutCirc(elapsed, angle, change, duration); break;
                case SBEasingLabels.InBack: target = easeInBack(elapsed, angle, change, duration); break;
                case SBEasingLabels.OutBack: target = easeOutBack(elapsed, angle, change, duration); break;
                case SBEasingLabels.InOutBack: target = easeInOutBack(elapsed, angle, change, duration); break;
                case SBEasingLabels.InElastic: target = easeInElastic(elapsed, angle, change, duration); break;
                case SBEasingLabels.OutElastic: target = easeOutElastic(elapsed, angle, change, duration); break;
                case SBEasingLabels.InOutElastic: target = easeInOutElastic(elapsed, angle, change, duration); break;
                case SBEasingLabels.InBounce: target = easeInBounce(elapsed, angle, change, duration); break;
                case SBEasingLabels.OutBounce: target = easeOutBounce(elapsed, angle, change, duration); break;
                case SBEasingLabels.InOutBounce: target = easeInOutBounce(elapsed, angle, change, duration); break;
                case SBEasingLabels.Linear:
                default:
                    target = easeLinear(elapsed, angle, change, duration);
                    break;
            }
            servo(servoLabel).setAngle(target);
            basic.pause(dt);
            elapsed = input.runningTime() - start;
        }
        servo(servoLabel).setAngle(degrees);
    }

    /**
     * Sets the speed of a continuous servo in a arbitrary range from `-100%` to
     * `100%`.
     * @param servoLabel The continuous servo to set the speed to.
     * @param speed The speed from `-100%` to `100%`.
     */
    //% blockId=sb_setContinuousServoSpeed block="set continuous servo %servoLabel speed to %speed\\%"
    //% servoLabel.shadow=sb_servoLabels
    //% speed.shadow=speedPicker
    //% inlineInputMode=inline
    export function setContinuousServoSpeed(servoLabel: number, speed: number): void {
        servo(servoLabel).run(speed);
    }

    /**
     * Turns a servo off so that no force will be applied and the horn can be
     * rotated manually. This saves battery.
     * @param servoLabel The servo to turn off.
     */
    //% blockId=sb_turnOffServo
    //% block="turn off servo %servoLabel"
    //% servoLabel.shadow=sb_servoLabels
    //% inlineInputMode=inline
    export function turnOffServo(servoLabel: number) {
        servo(servoLabel).stop();
    }

    ////////////////////////////////////////////////////////////////////////////
    // Neopixels
    ////////////////////////////////////////////////////////////////////////////
    let _neo: neopixel.Strip;
    /**
     * Access (and create if needed) a neopixel strip.
     * Default to brightness 40.
     */
    function neo(): neopixel.Strip {
        if (!_neo) {
            _neo = neopixel.create(DigitalPin.P8, 2, NeoPixelMode.RGB);
            _neo.setBrightness(40);
        }
        return _neo;
    }

    /**
     * Sets the color of an individual neopixel by specifying the amount of
     * `red`, `green` and `blue` in the color. The amounts range from `0%` to
     * `100%`.
     * @param neopixelLabel Which neopixel to set the color.
     * @param red Amount of red in color ranging from `0%` to `100%`.
     * @param green Amount of green in color ranging from `0%` to `100%`.
     * @param blue Amount of blue in color ranging from `0%` to `100%`.
     */
    //% blockId="sb_setNeopixelColorRGB"
    //% block="set neopixel %neopixelLabel to red %red\\% green %green\\% blue %blue\\%"
    //% neopixelLabel.shadow=sb_neopixelLabels
    //% red.min=0 red.max=100 red.defl=100
    //% green.min=0 green.max=100 green.defl=0
    //% blue.min=0 blue.max=100 blue.defl=0
    //% inlineInputMode=inline
    export function setNeopixelColorRGB(neopixelLabel: number, red: number, green: number, blue: number): void {
        neo().setPixelColor(neopixelLabel, getHexColorFromRGB(red, green, blue));
        neo().show();
    }

    /**
     * Sets the color of an individual neopixel by specifying the amount of
     * `hue`, `saturation` and `brightness` in the color. The amounts range from
     * `0%` to `100%`.
     * @param neopixelLabel Which neopixel to set the color.
     * @param hue Hue of the color ranging from `0%` to `100%`.
     * @param saturation Saturation of the color ranging from `0%` to `100%`.
     * @param brightness Brightness of the color ranging from `0%` to `100%`.
     */
    //% blockId="sb_setNeopixelColorHSB"
    //% block="set neopixel %neopixelLabel to hue %hue\\% saturation %saturation\\% brightness %brightness\\%"
    //% neopixelLabel.shadow=sb_neopixelLabels
    //% hue.min=0 hue.max=100 hue.defl=0
    //% saturation.min=0 saturation.max=100 saturation.defl=100
    //% brightness.min=0 brightness.max=100 brightness.defl=100
    //% inlineInputMode=inline
    export function setNeopixelColorHSB(neopixelLabel: number, hue: number, saturation: number, brightness: number): void {
        neo().setPixelColor(neopixelLabel, getHexColorFromHSB(hue, saturation, brightness));
        neo().show();
    }

    /**
     * Sets the color of an individual neopixel by specifying the color by name.
     * @param neopixelLabel Which neopixel to set the color.
     * @param colorLabel The name of the color from a list of color labels.
     */
    //% blockId="sb_setNeopixelColorLabel"
    //% block="set neopixel %neopixelLabel to %colorLabel"
    //% neopixelLabel.shadow=sb_neopixelLabels
    //% colorLabel.shadow=sb_colorLabels
    //% inlineInputMode=inline
    export function setNeopixelColorLabel(neopixelLabel: number, colorLabel: number): void {
        neo().setPixelColor(neopixelLabel, colorLabel);
        neo().show();
    }

    /**
     * Sets the brightness of all the neopixels by specifying a value ranging
     * from `0%` to `100%`.
     * @param brightness Brightness of the neopixels from `0%` to `100%`.
     */
    //% blockId="sb_setNeopixelsBrightness"
    //% block="set neopixels brightness to %brightness\\%"
    //% brightness.min=0 brightness.max=100
    //% advanced=true
    export function setNeopixelsBrightness(brightness: number): void {
        neo().setBrightness((brightness / 100) * 255);
        neo().show();
    }

    ////////////////////////////////////////////////////////////////////////////
    // More
    ////////////////////////////////////////////////////////////////////////////
    /**
     * A label of a neopixel.
     * @param label Neopixel label.
     */
    //% blockId="sb_neopixelLabels" block=%label
    //% advanced=true
    export function neopixelLabels(label: SBNeopixelLabels): SBNeopixelLabels {
        return label;
    }

    /**
     * A label of a servo.
     * @param label Servo label.
     */
    //% blockId="sb_servoLabels" block=%label
    //% advanced=true
    export function servoLabels(label: SBServoLabels): SBServoLabels {
        return label;
    }

    /**
     * A label of a color.
     * @param label Color label.
     */
    //% blockId="sb_colorLabels" block=%label
    //% advanced=true
    export function colorLabels(label: SBColorLabels): SBColorLabels {
        return label;
    }

    /**
     * A label of a wave type.
     * @param label Wave type label.
     */
    //% blockId="sb_waveTypeLabels" block=%label
    //% advanced=true
    export function waveTypeLabels(label: SBWaveTypeLabels): SBWaveTypeLabels {
        return label;
    }

    /**
    * A label of a easing equation.
    * @param label Easing equation label.
    */
    //% blockId="sb_easingLabels" block=%label
    //% advanced=true
    export function easingLabels(label: SBEasingLabels): SBEasingLabels {
        return label;
    }

    /**
     * Calculates the hexadecimal representation of a color from the amounts of
     * `red`, `green` and `blue` in that the color.
     * @param red Amount of red in color ranging from `0%` to `100%`
     * @param green Amount of green in color ranging from `0%` to `100%`
     * @param blue Amount of blue in color ranging from `0%` to `100%`
     */
    //% blockId="sb_getHexColorFromRGB"
    //% block="red %red\\% green %green\\% blue %blue\\%"
    //% red.min=0 red.max=100 red.defl=0
    //% green.min=0 green.max=100 green.defl=0
    //% blue.min=0 blue.max=100 blue.defl=0
    //% inlineInputMode=inline
    //% advanced=true
    export function getHexColorFromRGB(red: number, green: number, blue: number): number {
        return ((((red / 100) * 255) & 0xFF) << 16) | ((((green / 100) * 255) & 0xFF) << 8) | (((blue / 100) * 255) & 0xFF);
    }

    /**
     * Calculates the hexadecimal representation of a color from the `hue`,
     * `saturation` and `brightness` of that the color.
     * @param hue Hue of the color ranging from `0` to `100`
     * @param saturation Saturation of the color ranging from `0` to `100`
     * @param brightness Brightness of the color ranging from `0` to `100`
     */
    //% blockId="sb_getHexColorFromHSB"
    //% block="hue %hue saturation %saturation brightness %brightness"
    //% hue.min=0 hue.max=100
    //% saturation.min=0 saturation.max=100
    //% brightness.min=0 brightness.max=100
    //% inlineInputMode=inline
    //% advanced=true
    export function getHexColorFromHSB(hue: number, saturation: number, brightness: number): number {
        let h, s, v, r, g, b, i, f, p, q, t;
        h = hue / 100;
        s = saturation / 100;
        v = brightness / 100;
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        return getHexColorFromRGB(r * 100, g * 100, b * 100);
    }
    /**
     * Samples the vale of a periodic wave function. The wave starts at the
     * beginning of the running time. It can be configured by specifying it's
     * length (in seconds), amplitude and offset.
     * @param waveTypeLabel The type of the wave.
     * @param length The length (or period) of the wave, in seconds.
     * @param amplitude The amplitude of the wave.
     * @param offset The offset of the wave.
     */
    //% blockId="sb_wave"
    //% block="wave type %waveTypeLabel length %length seconds amplitude %amplitude offset %offset"
    //% waveTypeLabel.shadow=sb_waveTypeLabels
    //% length.defl=1
    //% inlineInputMode=inline
    //% advanced=true
    export function wave(waveTypeLabel: number, length: number, amplitude: number, offset: number): number {
        let time = (input.runningTime() / 1000) % length;
        let progress = (time / length);
        let result
        switch (waveTypeLabel) {
            case SBWaveTypeLabels.Sine:
                result = Math.sin(progress * (Math.PI * 2));
                break;
            case SBWaveTypeLabels.Cosine:
                result = Math.cos(progress * (Math.PI * 2));
                break;
            case SBWaveTypeLabels.Triangular:
                result = 4 * (0.5 - Math.abs(progress % (2 * 0.5) - 0.5)) - 1;
                break;
            case SBWaveTypeLabels.RampUp:
                result = progress * 2 - 1;
                break;
            case SBWaveTypeLabels.RampDown:
                result = (progress * 2 - 1) * -1;
                break;
            case SBWaveTypeLabels.Square:
                result = progress < 0.5 ? 1 : -1;
                break;
            case SBWaveTypeLabels.Pulse:
                result = progress < 0.1 ? 1 : -1;
                break;
        }
        return result * (amplitude * 0.5) + offset;
    }
    /*
    *
    * TERMS OF USE - EASING EQUATIONS
    *
    * Open source under the BSD License.
    *
    * Copyright © 2001 Robert Penner
    * All rights reserved.
    *
    * Redistribution and use in source and binary forms, with or without modification,
    * are permitted provided that the following conditions are met:
    *
    * Redistributions of source code must retain the above copyright notice, this list of
    * conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice, this list
    * of conditions and the following disclaimer in the documentation and/or other materials
    * provided with the distribution.
    *
    * Neither the name of the author nor the names of contributors may be used to endorse
    * or promote products derived from this software without specific prior written permission.
    *
    * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
    * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
    * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
    *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
    *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
    *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
    * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
    *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
    * OF THE POSSIBILITY OF SUCH DAMAGE.
    *
    */
    // t: current time, b: begInnIng value, c: change In value, d: duration
    export function easeLinear(t: number, b: number, c: number, d: number): number {
        return c * (t / d) + b;
    }
    export function easeInQuad(t: number, b: number, c: number, d: number): number {
        return c * (t /= d) * t + b;
    }
    export function easeOutQuad(t: number, b: number, c: number, d: number): number {
        return -c * (t /= d) * (t - 2) + b;
    }
    export function easeInOutQuad(t: number, b: number, c: number, d: number): number {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
    export function easeInCubic(t: number, b: number, c: number, d: number): number {
        return c * (t /= d) * t * t + b;
    }
    export function easeOutCubic(t: number, b: number, c: number, d: number): number {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
    export function easeInOutCubic(t: number, b: number, c: number, d: number): number {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
    export function easeInQuart(t: number, b: number, c: number, d: number): number {
        return c * (t /= d) * t * t * t + b;
    }
    export function easeOutQuart(t: number, b: number, c: number, d: number): number {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    }
    export function easeInOutQuart(t: number, b: number, c: number, d: number): number {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }
    export function easeInQuint(t: number, b: number, c: number, d: number): number {
        return c * (t /= d) * t * t * t * t + b;
    }
    export function easeOutQuint(t: number, b: number, c: number, d: number): number {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    }
    export function easeInOutQuint(t: number, b: number, c: number, d: number): number {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
    export function easeInSine(t: number, b: number, c: number, d: number): number {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    }
    export function easeOutSine(t: number, b: number, c: number, d: number): number {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }
    export function easeInOutSine(t: number, b: number, c: number, d: number): number {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
    export function easeInExpo(t: number, b: number, c: number, d: number): number {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    }
    export function easeOutExpo(t: number, b: number, c: number, d: number): number {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    }
    export function easeInOutExpo(t: number, b: number, c: number, d: number): number {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
    export function easeInCirc(t: number, b: number, c: number, d: number): number {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    }
    export function easeOutCirc(t: number, b: number, c: number, d: number): number {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    }
    export function easeInOutCirc(t: number, b: number, c: number, d: number): number {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
    export function easeInElastic(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        let p = 0;
        let a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
        if (a < Math.abs(c)) { a = c; s = p / 4; }
        else s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    }
    export function easeOutElastic(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        let p = 0;
        let a = c;
        if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
        if (a < Math.abs(c)) { a = c; s = p / 4; }
        else s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    }
    export function easeInOutElastic(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        let p = 0;
        let a = c;
        if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) { a = c; s = p / 4; }
        else s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    }
    export function easeInBack(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    }
    export function easeOutBack(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }
    export function easeInOutBack(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    }
    export function easeInBounce(t: number, b: number, c: number, d: number): number {
        return c - easeOutBounce(d - t, 0, c, d) + b;
    }
    export function easeOutBounce(t: number, b: number, c: number, d: number): number {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    }
    export function easeInOutBounce(t: number, b: number, c: number, d: number): number {
        if (t < d / 2) return easeInBounce(t * 2, 0, c, d) * .5 + b;
        return easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
}
