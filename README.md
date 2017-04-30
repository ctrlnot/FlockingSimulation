# Flocking Simulation
My attempt to demonstrate an algorithm that simulates (I hope) a "realistic" group of birbs or an entity grouping together, called "flocking". This simulation is only 2D and implemented using p5.js. The algorithm was created by Craig Reynolds in 1986. See my work [here](https://ctrlnot.github.io/FlockingSimulation/).

## Keyboard Controls
| Key                      | Key Description           | Implementation                                                                                                                   |
|--------------------------|---------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| D                        | Toggle Debugging Mode     | Shows the range of the birb in different rules and the range of mouse detection.                                                 |
| S                        | Toggle Separating Mode    | If true, the birbs will try to keep the space between them which makes them not colliding. If false, every one flies freely.     |
| F                        | Toggle Flocking Mode      | If true, the try to group themselves together. Else, they just fly freely.                                                       |
| N                        | Toggle Mouse Scare        | The birbs will try to move away from mouse as if it is a predator. If **flocking** is true, they'll still try to remain a flock. |
| M                        | Toggle Mouse Attract      | Opposite of the above of course lol.                                                                                             |
| Mouse Pressed            | Summon a birb :>          | Create an instance of birb where the mouse is.                                                                                   |
| INSERT                   | Summon 5 birbs :o         | Just like from the above but 5 lol.                                                                                              |
| BACKSPACE                | Kill a birb :<            | Delete an instance of birb.                                                                                                      |
| DELETE                   | Kill 5 birbs :(           | Bruh common sense..                                                                                                              |
| Mouse Pressed + Ctrl Key | Create an attractor box   | Shown as blue square, just like attractive mouse but at a fixed point.                                                           |
| Mouse Pressed + Alt Key  | Create a repellant box    | Shown as red square, uhh .. You know it -_-.                                                                                     |
| C                        | Remove boxes              | Delete all the boxes.                                                                                                            |
| I                        | Hide information          | Hides the simulation information in the window.                                                                                  |
| SPACE                    | Pause                     | Srsly bruh...                                                                                                                    |
| ESCAPE                   | Reset                     | Reset all states back to default and clears the canvas.                                                                          | 

### Credits
- What inspired me to do this is this cool [Swarm Intelligence Demonstration](https://www.youtube.com/watch?v=M028vafB0l8)
- Thanks for Daniel and this series for in-depth [guide](https://www.youtube.com/watch?v=JIz2L4tn5kM&index=56&list=PLRqwX-V7Uu6aFlwukCmDf0-1-uSR7mklK) in autonomous agents
- Craig Reynolds' Steering Behaviors for Autonomous Characters [paper](http://www.red3d.com/cwr/steer/)
- Made with [p5.js](https://p5js.org/)

### Dev's notes
- Try to mix different blocks for interesting effects on the flocking behavoir.
- The more birbs, more satisfying! (for me at least lol)
- No birbs were harmed in the making of this simulation.
- Thanks!