/**
 * Servo labels
 */
enum SBServoLabels {
    //% block="A"
    ServoA = 0,
    //% block="B"
    ServoB = 1
}

/**
* NeoPixel labels
*/
enum SBNeoPixelLabels {
    //% block="A"
    NeoPixelA = 0,
    //% block="B"
    NeoPixelB = 1
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
    SineIn = 1,
    //% block="sine out"
    SineOut = 2,
    //% block="sine in out"
    SineInOut = 3,
    //% block="quad in"
    QuadIn = 4,
    //% block="quad out"
    QuadOut = 5,
    //% block="quad in out"
    QuadInOut = 6,
    //% block="cubic in"
    CubicIn = 7,
    //% block="cubic out"
    CubicOut = 8,
    //% block="cubic in out"
    CubicInOut = 9,
    //% block="quart in"
    QuartIn = 10,
    //% block="quart out"
    QuartOut = 11,
    //% block="quart in out"
    QuartInOut = 12,
    //% block="quint in"
    QuintIn = 13,
    //% block="quint out"
    QuintOut = 14,
    //% block="quint int out"
    QuintInOut = 15,
    //% block="expo in"
    ExpoIn = 16,
    //% block="expo out"
    ExpoOut = 17,
    //% block="expo in out"
    ExpoInOut = 18,
    //% block="circ in"
    CircIn = 19,
    //% block="circ out"
    CircOut = 20,
    //% block="circ in out"
    CircInOut = 21,
    //% block="back in"
    BackIn = 22,
    //% block="back out"
    BackOut = 23,
    //% block="back in out"
    BackInOut = 24,
    //% block="elastic in"
    ElasticIn = 25,
    //% block="elastic out"
    ElasticOut = 26,
    //% block="elastic in out"
    ElasticInOut = 27,
    //% block="bounce in"
    BounceIn = 28,
    //% block="bounce out"
    BounceOut = 29,
    //% block="bounce in out"
    BounceInOut = 30
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
        private _pulse: number;
        constructor(analogPin: AnalogPin, digitalPin: DigitalPin) {
            super();
            this._analogPin = analogPin;
            this._digitalPin = digitalPin;
        }
        pulse(): number {
            return this._pulse;
        }
        static positionToPulse(position: number): number {
            return 600 + position * 1400;
        }
        static speedToPulse(speed: number): number {
            if (speed < 0) {
                return 1300 - 125 + speed * 375;
            }
            return 1300 + 125 + speed * 375;
        }
        protected internalSetPulse(micros: number): void {
            pins.servoSetPulse(this._analogPin, micros);
            this._pulse = micros;
        }
        protected internalStop() {
            pins.analogReadPin(this._analogPin);
            pins.setPull(this._digitalPin, PinPullMode.PullNone);
        }
    }
    let _servoA: Servo;
    let _servoB: Servo;
    /**
     * Access (and create if needed) a servo instace.
     * @param id the id of the servo. eg. SBServoLabels.Left
     */
    function servo(servoLabel: number): Servo {
        switch (servoLabel) {
            case 0:
                if (!_servoA) {
                    _servoA = new Servo(AnalogPin.P13, DigitalPin.P13);
                    _servoA.setPulse(1300);
                    pins.servoSetPulse(AnalogPin.P13, 1300);
                }
                return _servoA;
            case 1:
                if (!_servoB) {
                    _servoB = new Servo(AnalogPin.P14, DigitalPin.P14);
                    _servoB.setPulse(1300);
                    pins.servoSetPulse(AnalogPin.P14, 1300);
                }
                return _servoB;
        }
        return null;
    }
    /**
     * Sets the position of a servo by specifying a value ranging from `0%` to
     * `100%`.
     * @param servoLabel The servo to set the position to.
     * @param position The position ranging from `0%` to `100%`.
     */
    //% blockId=sb_setServoPosition
    //% block="set servo %servoLabel position to %position\\%"
    //% servoLabel.shadow=sb_servoLabels
    //% position.min=0 position.max=100 position.defl=50
    //% duration.defl=0
    //% inlineInputMode=inline
    export function setServoPosition(servoLabel: number, position: number): void {
        servo(servoLabel).setPulse(Servo.positionToPulse(position));
    }

    /**
     * Transtions the position of a servo over a duration of time (in seconds).
     * The "shape" of the transtion is specified by choosing one of the easing
     * functions by name.
     * @param servoLabel The servo to set the position to.
     * @param position The position ranging from `0%` to `100%`.
     * @param duration The duration of the transition.
     * @param easingLabel The "shape" of the transition.
     */
    //% blockId=sb_transitionServoPosition
    //% block="transition servo %servoLabel position to %position\\% over %duration seconds %easingLabel"
    //% servoLabel.shadow=sb_servoLabels
    //% position.min=0 position.max=100 position.defl=100
    //% duration.min=0 duration.defl=1
    //% easingLabel.shadow=sb_easingLabels
    //% inlineInputMode=inline
    export function transitionServoPosition(servoLabel: number, position: number, duration: number, easingLabel: number): void {
        duration *= 1000; // convert to ms
        if (duration < 100) {
            servo(servoLabel).setPulse(Servo.positionToPulse(position));
            return;
        }
        let dt = 50;
        let pulse = Servo.positionToPulse(position)
        let currentPulse = servo(servoLabel).pulse();
        let change = pulse - currentPulse;
        let start = input.runningTime();
        let elapsed = 0;
        while (elapsed < duration) {
            let target;
            switch (easingLabel) {
                case SBEasingLabels.SineIn: target = easeSineIn(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.SineOut: target = easeSineOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.SineInOut: target = easeSineInOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.QuadIn: target = easeQuadIn(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.QuadOut: target = easeQuadOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.QuadInOut: target = easeQuadInOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.CubicIn: target = easeCubicIn(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.CubicOut: target = easeCubicOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.CubicInOut: target = easeCubicInOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.QuartIn: target = easeQuartIn(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.QuartOut: target = easeQuartOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.QuartInOut: target = easeQuartInOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.QuintIn: target = easeQuintIn(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.QuintOut: target = easeQuintOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.QuintInOut: target = easeQuintInOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.ExpoIn: target = easeExpoIn(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.ExpoOut: target = easeExpoOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.ExpoInOut: target = easeExpoInOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.CircIn: target = easeCircIn(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.CircOut: target = easeCircOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.CircInOut: target = easeCircInOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.BackIn: target = easeBackIn(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.BackOut: target = easeBackOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.BackInOut: target = easeBackInOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.ElasticIn: target = easeElasticIn(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.ElasticOut: target = easeElasticOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.ElasticInOut: target = easeElasticInOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.BounceIn: target = easeBounceIn(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.BounceOut: target = easeBounceOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.BounceInOut: target = easeBounceInOut(elapsed, currentPulse, change, duration); break;
                case SBEasingLabels.Linear:
                default:
                    target = easeLinear(elapsed, currentPulse, change, duration);
                    break;
            }
            servo(servoLabel).setPulse(target);
            basic.pause(dt);
            elapsed = input.runningTime() - start;
        }
        servo(servoLabel).setPulse(pulse);
    }

    /**
     * Sets the speed of a continuous servo in a arbitrary range from `-100%` to
     * `100%`.
     * @param servoLabel The continuous servo to set the speed to.
     * @param speed The speed ranging from `-100%` to `100%`.
     */
    //% blockId=sb_setContinuousServoSpeed block="set continuous servo %servoLabel speed to %speed\\%"
    //% servoLabel.shadow=sb_servoLabels
    //% speed.shadow=speedPicker
    //% inlineInputMode=inline
    export function setContinuousServoSpeed(servoLabel: number, speed: number): void {
        servo(servoLabel).setPulse(Servo.speedToPulse(speed));
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
    // NeoPixels
    ////////////////////////////////////////////////////////////////////////////
    let _neo: neopixel.Strip;
    /**
     * Access (and create if needed) a NeoPixel strip.
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
     * Sets the color of an individual NeoPixel by specifying the amount of
     * `red`, `green` and `blue` in the color. The amounts range from `0%` to
     * `100%`.
     * @param neoPixelLabel Which NeoPixel to set the color.
     * @param red Amount of red in color ranging from `0%` to `100%`.
     * @param green Amount of green in color ranging from `0%` to `100%`.
     * @param blue Amount of blue in color ranging from `0%` to `100%`.
     */
    //% blockId="sb_setNeoPixelColorRGB"
    //% block="set NeoPixel %neoPixelLabel to red %red\\% green %green\\% blue %blue\\%"
    //% neoPixelLabel.shadow=sb_neoPixelLabels
    //% red.min=0 red.max=100 red.defl=100
    //% green.min=0 green.max=100 green.defl=0
    //% blue.min=0 blue.max=100 blue.defl=0
    //% inlineInputMode=inline
    export function setNeoPixelColorRGB(neoPixelLabel: number, red: number, green: number, blue: number): void {
        neo().setPixelColor(neoPixelLabel, getHexColorFromRGB(red, green, blue));
        neo().show();
    }

    /**
     * Sets the color of an individual NeoPixel by specifying the amount of
     * `hue`, `saturation` and `brightness` in the color. The amounts range from
     * `0%` to `100%`.
     * @param neoPixelLabel Which NeoPixel to set the color.
     * @param hue Hue of the color ranging from `0%` to `100%`.
     * @param saturation Saturation of the color ranging from `0%` to `100%`.
     * @param brightness Brightness of the color ranging from `0%` to `100%`.
     */
    //% blockId="sb_setNeoPixelColorHSB"
    //% block="set NeoPixel %neoPixelLabel to hue %hue\\% saturation %saturation\\% brightness %brightness\\%"
    //% neoPixelLabel.shadow=sb_neoPixelLabels
    //% hue.min=0 hue.max=100 hue.defl=0
    //% saturation.min=0 saturation.max=100 saturation.defl=100
    //% brightness.min=0 brightness.max=100 brightness.defl=100
    //% inlineInputMode=inline
    export function setNeoPixelColorHSB(neoPixelLabel: number, hue: number, saturation: number, brightness: number): void {
        neo().setPixelColor(neoPixelLabel, getHexColorFromHSB(hue, saturation, brightness));
        neo().show();
    }

    /**
     * Sets the color of an individual NeoPixel by specifying the color by name.
     * @param neoPixelLabel Which neoPixel to set the color.
     * @param colorLabel The name of the color from a list of color labels.
     */
    //% blockId="sb_setNeoPixelColorLabel"
    //% block="set NeoPixel %neoPixelLabel to %colorLabel"
    //% neoPixelLabel.shadow=sb_neoPixelLabels
    //% colorLabel.shadow=sb_colorLabels
    //% inlineInputMode=inline
    export function setNeoPixelColorLabel(neoPixelLabel: number, colorLabel: number): void {
        neo().setPixelColor(neoPixelLabel, colorLabel);
        neo().show();
    }

    /**
     * Sets the brightness of all the NeoPixels by specifying a value ranging
     * from `0%` to `100%`.
     * @param brightness Brightness of the NeoPixels from `0%` to `100%`.
     */
    //% blockId="sb_setNeoPixelsBrightness"
    //% block="set NeoPixels brightness to %brightness\\%"
    //% brightness.min=0 brightness.max=100
    //% advanced=true
    export function setNeoPixelsBrightness(brightness: number): void {
        neo().setBrightness((brightness / 100) * 255);
        neo().show();
    }

    ////////////////////////////////////////////////////////////////////////////
    // More
    ////////////////////////////////////////////////////////////////////////////
    /**
     * A label of a NeoPixel.
     * @param label NeoPixel label.
     */
    //% blockId="sb_neoPixelLabels" block="%label"
    //% advanced=true
    export function neoPixelLabels(label: SBNeoPixelLabels): number {
        return label;
    }

    /**
     * A label of a servo.
     * @param label Servo label.
     */
    //% blockId="sb_servoLabels" block="%label"
    //% advanced=true
    export function servoLabels(label: SBServoLabels): number {
        return label;
    }

    /**
     * A label of a color.
     * @param label Color label.
     */
    //% blockId="sb_colorLabels" block="%label"
    //% advanced=true
    export function colorLabels(label: SBColorLabels): number {
        return label;
    }

    /**
     * A label of a wave type.
     * @param label Wave type label.
     */
    //% blockId="sb_waveTypeLabels" block="%label"
    //% advanced=true
    export function waveTypeLabels(label: SBWaveTypeLabels): number {
        return label;
    }

    /**
    * A label of a easing equation.
    * @param label Easing equation label.
    */
    //% blockId="sb_easingLabels" block="%label"
    //% advanced=true
    export function easingLabels(label: SBEasingLabels): number {
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
    export function wave(waveTypeLabel: SBWaveTypeLabels, length: number, amplitude: number, offset: number): number {
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
    export function easeQuadIn(t: number, b: number, c: number, d: number): number {
        return c * (t /= d) * t + b;
    }
    export function easeQuadOut(t: number, b: number, c: number, d: number): number {
        return -c * (t /= d) * (t - 2) + b;
    }
    export function easeQuadInOut(t: number, b: number, c: number, d: number): number {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
    export function easeCubicIn(t: number, b: number, c: number, d: number): number {
        return c * (t /= d) * t * t + b;
    }
    export function easeCubicOut(t: number, b: number, c: number, d: number): number {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
    export function easeCubicInOut(t: number, b: number, c: number, d: number): number {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
    export function easeQuartIn(t: number, b: number, c: number, d: number): number {
        return c * (t /= d) * t * t * t + b;
    }
    export function easeQuartOut(t: number, b: number, c: number, d: number): number {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    }
    export function easeQuartInOut(t: number, b: number, c: number, d: number): number {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }
    export function easeQuintIn(t: number, b: number, c: number, d: number): number {
        return c * (t /= d) * t * t * t * t + b;
    }
    export function easeQuintOut(t: number, b: number, c: number, d: number): number {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    }
    export function easeQuintInOut(t: number, b: number, c: number, d: number): number {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
    export function easeSineIn(t: number, b: number, c: number, d: number): number {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    }
    export function easeSineOut(t: number, b: number, c: number, d: number): number {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }
    export function easeSineInOut(t: number, b: number, c: number, d: number): number {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
    export function easeExpoIn(t: number, b: number, c: number, d: number): number {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    }
    export function easeExpoOut(t: number, b: number, c: number, d: number): number {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    }
    export function easeExpoInOut(t: number, b: number, c: number, d: number): number {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
    export function easeCircIn(t: number, b: number, c: number, d: number): number {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    }
    export function easeCircOut(t: number, b: number, c: number, d: number): number {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    }
    export function easeCircInOut(t: number, b: number, c: number, d: number): number {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
    export function easeElasticIn(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        let p = 0;
        let a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
        if (a < Math.abs(c)) { a = c; s = p / 4; }
        else s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    }
    export function easeElasticOut(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        let p = 0;
        let a = c;
        if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
        if (a < Math.abs(c)) { a = c; s = p / 4; }
        else s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    }
    export function easeElasticInOut(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        let p = 0;
        let a = c;
        if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) { a = c; s = p / 4; }
        else s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    }
    export function easeBackIn(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    }
    export function easeBackOut(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }
    export function easeBackInOut(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    }
    export function easeBounceIn(t: number, b: number, c: number, d: number): number {
        return c - easeBounceOut(d - t, 0, c, d) + b;
    }
    export function easeBounceOut(t: number, b: number, c: number, d: number): number {
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
    export function easeBounceInOut(t: number, b: number, c: number, d: number): number {
        if (t < d / 2) return easeBounceIn(t * 2, 0, c, d) * .5 + b;
        return easeBounceOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
}
