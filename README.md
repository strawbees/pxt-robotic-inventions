# Strawbees Package for Makecode micro:bit

## Driving the robot    
The simplest way to drive robot is by using the `driveMilliseconds(...)` and `driveTurnMilliseconds(...)` blocks.   
Note with `driveMilliseconds(...)`, you can specify a negative speed to reverse.   
```blocks
// Drive forward for 2000 ms
bitbot.driveMilliseconds(1023, 2000)

// Drive backwards for 2000 ms
bitbot.driveMilliseconds(-1023, 2000)

// Turn left for 200 ms
bitbot.driveTurnMilliseconds(BBRobotDirection.Left, 1023, 200)

// Turn right for 200 ms
bitbot.driveTurnMilliseconds(BBRobotDirection.Right, 1023, 200)
```   

## Supported targets

* for PXT/microbit

## License

MIT
