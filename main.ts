/**
 * Servo labels
 */
enum SBServo {
    //% block="A"
    ServoA = 0,
    //% block="B"
    ServoB = 1
}

/**
* NeoPixel labels
*/
enum SBNeoPixel {
    //% block="A"
    NeoPixelA = 0,
    //% block="B"
    NeoPixelB = 1
}

/**
 * Color labels
 */
enum SBColor {
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
enum SBWaveType {
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
enum SBEasing {
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
 //% block="Strawbees"
//% weight=100 color="#f443b0" icon="\u24C8" blockGap=8
namespace sb {
    ////////////////////////////////////////////////////////////////////////////
    // Servos
    ////////////////////////////////////////////////////////////////////////////
    class ServoSB extends servos.Servo {
        private _analogPin: AnalogPin;
        private _digitalPin: DigitalPin;
        private _pulse: number;
        private _position: number;
        private _speed: number;
        constructor(analogPin: AnalogPin, digitalPin: DigitalPin) {
            super();
            this._analogPin = analogPin;
            this._digitalPin = digitalPin;
        }
        pulse(): number {
            return this._pulse;
        }
        position(): number {
            return this._position;
        }
        speed(): number {
            return this._speed;
        }
        setPosition(position: number): void {
            this._position = position
            // just for simulator
            this.setAngle((this._position / 100) * 180);
            // specific for our hardware
            this.setPulse(600 + (this._position / 100) * 1400);
        }
        setSpeed(speed: number): void {
            this._speed = speed
            // just for simulator
            this.setAngle(((this._speed + 100) / 200) * 180);
            // specific for our hardware
            let pulse
            if (this._speed < 0) {
                pulse = 1300 - 125 + (this._speed / 100) * 375;
            } else {
                pulse = 1300 + 125 + (this._speed / 100) * 375;
            }
            this.setPulse(pulse);
        }
        protected internalSetAngle(angle: number): number {
            pins.servoWritePin(this._analogPin, angle);
            return angle;
        }
        protected internalSetPulse(micros: number): void {
            this._pulse = micros;
            pins.servoSetPulse(this._analogPin, micros);
        }
        protected internalStop() {
            pins.digitalReadPin(this._digitalPin);
            pins.setPull(this._digitalPin, PinPullMode.PullNone);
        }
    }

    let _servoA = new ServoSB(AnalogPin.P13, DigitalPin.P13);
    pins.servoWritePin(AnalogPin.P13, 90); // just to trigger the simulator
    _servoA.setPosition(50);
    _servoA.setSpeed(0);
    _servoA.setPulse(1300);
    let _servoB = new ServoSB(AnalogPin.P14, DigitalPin.P14);
    pins.servoWritePin(AnalogPin.P14, 90); // just to trigger the simulator
    _servoB.setPosition(50);
    _servoB.setSpeed(0);
    _servoB.setPulse(1300);

    /**
     * Access a servo instace.
     * @param id the id of the servo. eg. SBServo.Left
     */
    function servoInstance(servo: number): ServoSB {
        switch (servo) {
            case SBServo.ServoA:
                return _servoA;
            case SBServo.ServoB:
                return _servoB;
        }
        return null;
    }
    /**
     * Sets the position of a servo by specifying a value ranging from `0%` to
     * `100%`.
     * @param servo Which servo to set the position to.
     * @param position The position ranging from `0%` to `100%`.
     */
    //% blockId=sb_setServoPosition
    //% block="set servo %servo position to %position\\%"
    //% servo.shadow=sb_servo
    //% position.min=0 position.max=100 position.defl=50
    //% duration.defl=0
    //% inlineInputMode=inline
    //% parts=microservo trackArgs=0
    export function setServoPosition(servo: number, position: number): void {
        position = Math.constrain(position, 0, 100);
        servoInstance(servo).setPosition(position);
    }

    /**
     * Transtions the position of a servo over a duration of time (in seconds).
     * The "shape" of the transition is specified by choosing one of the easing
     * functions by name.
     * @param servo Which servo to set the position to.
     * @param position The position ranging from `0%` to `100%`.
     * @param duration The duration of the transition.
     * @param easing The "shape" of the transition.
     */
    //% blockId=sb_transitionServoPosition
    //% block="transition servo %servo position to %position\\% over %duration seconds %easing"
    //% servo.shadow=sb_servo
    //% position.min=0 position.max=100 position.defl=100
    //% duration.min=0 duration.defl=1
    //% easing.shadow=sb_easing
    //% inlineInputMode=inline
    //% parts=microservo trackArgs=0
    export function transitionServoPosition(servo: number, position: number, duration: number, easing: number): void {
        position = Math.constrain(position, 0, 100);
        duration *= 1000; // convert to ms
        if (duration < 15) {
            servoInstance(servo).setPosition(position);
            return;
        }
        let dt = 15;
        let currentPostition = servoInstance(servo).position();
        let change = position - currentPostition;
        let start = input.runningTime();
        let elapsed = 0;
        while (elapsed < duration) {
            let targetPosition;
            switch (easing) {
                case SBEasing.SineIn: targetPosition = easeSineIn(elapsed, currentPostition, change, duration); break;
                case SBEasing.SineOut: targetPosition = easeSineOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.SineInOut: targetPosition = easeSineInOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.QuadIn: targetPosition = easeQuadIn(elapsed, currentPostition, change, duration); break;
                case SBEasing.QuadOut: targetPosition = easeQuadOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.QuadInOut: targetPosition = easeQuadInOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.CubicIn: targetPosition = easeCubicIn(elapsed, currentPostition, change, duration); break;
                case SBEasing.CubicOut: targetPosition = easeCubicOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.CubicInOut: targetPosition = easeCubicInOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.QuartIn: targetPosition = easeQuartIn(elapsed, currentPostition, change, duration); break;
                case SBEasing.QuartOut: targetPosition = easeQuartOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.QuartInOut: targetPosition = easeQuartInOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.QuintIn: targetPosition = easeQuintIn(elapsed, currentPostition, change, duration); break;
                case SBEasing.QuintOut: targetPosition = easeQuintOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.QuintInOut: targetPosition = easeQuintInOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.ExpoIn: targetPosition = easeExpoIn(elapsed, currentPostition, change, duration); break;
                case SBEasing.ExpoOut: targetPosition = easeExpoOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.ExpoInOut: targetPosition = easeExpoInOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.CircIn: targetPosition = easeCircIn(elapsed, currentPostition, change, duration); break;
                case SBEasing.CircOut: targetPosition = easeCircOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.CircInOut: targetPosition = easeCircInOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.BackIn: targetPosition = easeBackIn(elapsed, currentPostition, change, duration); break;
                case SBEasing.BackOut: targetPosition = easeBackOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.BackInOut: targetPosition = easeBackInOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.ElasticIn: targetPosition = easeElasticIn(elapsed, currentPostition, change, duration); break;
                case SBEasing.ElasticOut: targetPosition = easeElasticOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.ElasticInOut: targetPosition = easeElasticInOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.BounceIn: targetPosition = easeBounceIn(elapsed, currentPostition, change, duration); break;
                case SBEasing.BounceOut: targetPosition = easeBounceOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.BounceInOut: targetPosition = easeBounceInOut(elapsed, currentPostition, change, duration); break;
                case SBEasing.Linear:
                default:
                    targetPosition = easeLinear(elapsed, currentPostition, change, duration);
                    break;
            }
            servoInstance(servo).setPosition(targetPosition);
            basic.pause(dt);
            elapsed = input.runningTime() - start;
        }
        servoInstance(servo).setPosition(position);
    }

    /**
     * Sets the speed of a continuous servo in a arbitrary range from `-100%` to
     * `100%`. If the connected servo is not continuous, this will not work as
     * expected.
     * @param servo Which continuous servo to set the speed to.
     * @param speed The speed ranging from `-100%` to `100%`.
     */
    //% blockId=sb_setContinuousServoSpeed block="set continuous servo %servo speed to %speed\\%"
    //% servo.shadow=sb_servo
    //% speed.shadow=speedPicker
    //% inlineInputMode=inline
    //% parts=microservo trackArgs=0
    export function setContinuousServoSpeed(servo: number, speed: number): void {
        speed = Math.constrain(speed, -100, 100);
        servoInstance(servo).setSpeed(speed);
    }

    /**
     * Turns a servo off so that no force will be applied and it can be rotated
     * manually. This saves battery.
     * @param servo Which servo to turn off.
     */
    //% blockId=sb_turnOffServo
    //% block="turn off servo %servo"
    //% servo.shadow=sb_servo
    //% inlineInputMode=inline
    //% parts=microservo trackArgs=0
    //% blockGap=32
    export function turnOffServo(servo: number) {
        servoInstance(servo).stop();
    }

    ////////////////////////////////////////////////////////////////////////////
    // NeoPixels
    ////////////////////////////////////////////////////////////////////////////
    let _neo: neopixel.Strip;
    _neo = neopixel.create(DigitalPin.P8, 2, NeoPixelMode.RGB);
    _neo.setBrightness(20);
    _neo.clear();
    basic.pause(10); // BUG: without this delay, Neopixel A gets green sometimes
    _neo.show();

    /**
     * Access the NeoPixel instace.
     */
    function neoInstance(): neopixel.Strip {
        return _neo;
    }

    /**
     * Sets the color of an individual NeoPixel by specifying the amount of
     * red, green and blue in the color. The amounts range from `0%` to
     * `100%`.
     * @param neoPixel Which NeoPixel to set the color.
     * @param red Amount of red in color ranging, from `0%` to `100%`.
     * @param green Amount of green in color ranging, from `0%` to `100%`.
     * @param blue Amount of blue in color ranging, from `0%` to `100%`.
     */
    //% blockId="sb_setNeoPixelColorRGB"
    //% block="set NeoPixel %neoPixel to red %red\\% green %green\\% blue %blue\\%"
    //% neoPixel.shadow=sb_neoPixel
    //% red.min=0 red.max=100 red.defl=100
    //% green.min=0 green.max=100 green.defl=0
    //% blue.min=0 blue.max=100 blue.defl=0
    //% inlineInputMode=inline
    export function setNeoPixelColorRGB(neoPixel: number, red: number, green: number, blue: number): void {
        red = Math.constrain(red, 0, 100);
        green = Math.constrain(green, 0, 100);
        blue = Math.constrain(blue, 0, 100);
        neoInstance().setPixelColor(neoPixel, getHexColorFromRGB(red, green, blue));
        neoInstance().show();
    }

    /**
     * Sets the color of an individual NeoPixel by specifying the amount of
     * hue, saturation and brightness in the color. The amounts range from
     * `0%` to `100%`.
     * @param neoPixel Which NeoPixel to set the color.
     * @param hue Hue of the color, ranging from `0%` to `100%`.
     * @param saturation Saturation of the color, ranging from `0%` to `100%`.
     * @param brightness Brightness of the color, ranging from `0%` to `100%`.
     */
    //% blockId="sb_setNeoPixelColorHSB"
    //% block="set NeoPixel %neoPixel to hue %hue\\% saturation %saturation\\% brightness %brightness\\%"
    //% neoPixel.shadow=sb_neoPixel
    //% hue.min=0 hue.max=100 hue.defl=0
    //% saturation.min=0 saturation.max=100 saturation.defl=100
    //% brightness.min=0 brightness.max=100 brightness.defl=100
    //% inlineInputMode=inline
    export function setNeoPixelColorHSB(neoPixel: number, hue: number, saturation: number, brightness: number): void {
        hue = Math.constrain(hue, 0, 100);
        saturation = Math.constrain(saturation, 0, 100);
        brightness = Math.constrain(brightness, 0, 100);
        neoInstance().setPixelColor(neoPixel, getHexColorFromHSB(hue, saturation, brightness));
        neoInstance().show();
    }

    /**
     * Sets the color of an individual NeoPixel by specifying the color by name.
     * @param neoPixel Which neoPixel to set the color.
     * @param color The name of the color from a list of color labels.
     */
    //% blockId="sb_setNeoPixelColor"
    //% block="set NeoPixel %neoPixel to %color"
    //% neoPixel.shadow=sb_neoPixel
    //% color.shadow=sb_color
    //% inlineInputMode=inline
    export function setNeoPixelColor(neoPixel: number, color: number): void {
        neoInstance().setPixelColor(neoPixel, color);
        neoInstance().show();
    }

    ////////////////////////////////////////////////////////////////////////////
    // More
    ////////////////////////////////////////////////////////////////////////////
    /**
     * A label of a NeoPixel.
     * @param label NeoPixel label.
     */
     //% blockId="sb_neoPixelLabel" block="NeoPixel %label"
     //% advanced=true
     export function neoPixelLabel(label: SBNeoPixel): number {
         return label;
     }
    //% blockId="sb_neoPixel" block="%label"
    //% blockHidden=true
    export function neoPixel(label: SBNeoPixel): number {
        return label;
    }


    /**
     * A label of a servo.
     * @param label Servo label.
     */
     //% blockId="sb_servoLabel" block="servo %label"
     //% advanced=true
     export function servoLabel(label: SBServo): number {
         return label;
     }
    //% blockId="sb_servo" block="%label"
    //% blockHidden=true
    export function servo(label: SBServo): number {
        return label;
    }

    /**
     * A label of a color.
     * @param label Color label.
     */
     //% blockId="sb_colorLabel" block="color %label"
     //% advanced=true
     export function colorLabel(label: SBColor): number {
         return label;
     }
    //% blockId="sb_color" block="%label"
    //% blockHidden=true
    export function color(label: SBColor): number {
        return label;
    }

    /**
     * A label of a wave type.
     * @param label Wave type label.
     */
     //% blockId="sb_waveTypeLabel" block="wave type %label"
     //% advanced=true
     export function waveTypeLabel(label: SBWaveType): number {
         return label;
     }
    //% blockId="sb_waveType" block="%label"
    //% blockHidden=true
    export function waveType(label: SBWaveType): number {
        return label;
    }

    /**
    * A label of an easing function.
    * @param label Easing function label.
    */
    //% blockId="sb_easingLabel" block="easing function %label"
    //% advanced=true
    //% blockGap=32
    export function easingLabel(label: SBEasing): number {
        return label;
    }
    //% blockId="sb_easing" block="%label"
    //% blockHidden=true
    export function easing(label: SBEasing): number {
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
    //% block="hue %hue\\% saturation %saturation\\% brightness %brightness\\%"
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
     * @param waveType The type of the wave.
     * @param length The length (or period) of the wave, in seconds.
     * @param amplitude The amplitude of the wave.
     * @param offset The offset of the wave.
     */
    //% blockId="sb_wave"
    //% block="wave type %waveType length %length seconds amplitude %amplitude offset %offset"
    //% waveType.shadow=sb_waveType
    //% length.defl=1
    //% inlineInputMode=inline
    //% advanced=true
    export function wave(waveType: number, length: number, amplitude: number, offset: number): number {
        let time = (input.runningTime() / 1000) % length;
        let progress = (time / length);
        let result
        switch (waveType) {
            case SBWaveType.Sine:
                result = Math.sin(progress * (Math.PI * 2));
                break;
            case SBWaveType.Cosine:
                result = Math.cos(progress * (Math.PI * 2));
                break;
            case SBWaveType.Triangular:
                result = 4 * (0.5 - Math.abs(progress % (2 * 0.5) - 0.5)) - 1;
                break;
            case SBWaveType.RampUp:
                result = progress * 2 - 1;
                break;
            case SBWaveType.RampDown:
                result = (progress * 2 - 1) * -1;
                break;
            case SBWaveType.Square:
                result = progress < 0.5 ? 1 : -1;
                break;
            case SBWaveType.Pulse:
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
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        let p = d * .3;
        let a = c;
        let s = p / 4;
        let postFix = a * Math.pow(2, 10 * (t -= 1));
        return -(postFix * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    }
    export function easeElasticOut(t: number, b: number, c: number, d: number): number {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        let p = d * .3;
        let a = c;
        let s = p / 4;
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    }
    export function easeElasticInOut(t: number, b: number, c: number, d: number): number {
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        let p = d * (.3 * 1.5);
        let a = c;
        let s = p / 4;
        if (t < 1) {
            let postFix = a * Math.pow(2, 10 * (t -= 1)); // postIncrement is evil
            return -.5 * (postFix * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        let postFix = a * Math.pow(2, -10 * (t -= 1)); // postIncrement is evil
        return postFix * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
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
