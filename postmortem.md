Approach and Process
What in my process and approach to this project would I do differently next time?
When coding my project, I did not really plan well with regards to the creation of components and how I foresaw the information flowing from the parent component to the child component. As a result, I had to do some major refactoring of code to ensure that it functioned as intended.

What in my process and approach to this project went well that I would repeat next time?
Following the previous corrections in my project and having to refactor them, I realized that in order to move forward, I had to take a few steps back. Although it was daunting, I'm glad that I did it as I saw this as good training for me when the time comes that code had to be destroyed or shifted in order to achieve the desired effect.

--
Code and Code Design
What in my code and program design in the project would I do differently next time?
As ReactJS was a new library, I was unsure of the various methods to manipulate the data within. As a result, I had several areas of code where it repeated itself. I do not have examples of the duplicate code as I have already refactored it.

What in my code and program design in the project went well? Is there anything I would do the same next time?
During the project, I researched on methods that were feasible to my project such as passing a function from a parent component into the child component and into its child component. As I progressed in my project, I was also exposed to certain best practices and utilized methods such as shouldComponentUpdate().
https://github.com/MadnessAntipathy/project-4/blob/master/src/client/components/score/score.jsx#L56

Passing a function starting at App
https://github.com/MadnessAntipathy/project-4/blob/master/src/client/App.jsx#L86

Pushing the function into the Game component
https://github.com/MadnessAntipathy/project-4/blob/master/src/client/components/game/game.jsx#L246

Finally using function in Score to return the value back to the App component
https://github.com/MadnessAntipathy/project-4/blob/master/src/client/components/score/score.jsx#L32

For each, please include code examples.
Code snippet up to 20 lines.
Code design documents or architecture drawings / diagrams.

WDI Unit 4 Post Mortem
What habits did I use during this unit that helped me?
I think focusing on each task at hand as opposed to the overall picture helped me in identifying areas that needed to be improved. When looking at my code, if I tried to see it as the big picture, I would lose track of what I wanted my code to do. Compartmentalizing and keeping focus to smaller tasks helped me in this regard.

What habits did I have during this unit that I can improve on?
Sometimes, I would take a certain approach in my code. This resulted in me digging deeper into the code and sometimes, I came up against a wall where I could not proceed further. This resulted in lost time as I had to back track and refactor my code to progress.

How is the overall level of the course during this unit? (instruction, course materials, etc.)
It covers the basics of creating an app in ReactJS. However, I think there could be more coverage on the various methods of React Components as I found myself utilizing them in my project.
