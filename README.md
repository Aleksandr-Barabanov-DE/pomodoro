# Pomodoro Task Timer

## Overview

Pomodoro Task Timer is an interactive web application designed to help users manage their time effectively using the Pomodoro technique. The application integrates a to-do list with a customizable timer, allowing users to focus on their tasks while keeping track of their work and break sessions.

## Features

- **Dynamic Task Tracking**: 
  - Real-time timer updates for each task.
  - Task-specific timers that allow users to focus on individual tasks while completing Pomodoro cycles.

- **Automatic Work/Break Cycle Switching**:
  - Customizable durations for work sessions and breaks, enhancing user flexibility.

- **Animations**: 
  - Visually engaging animations for task addition, completion, and button interactions, powered by GSAP.

- **Data Persistence**: 
  - Utilizes `localStorage` to store tasks and timer states, ensuring data remains intact across page reloads.

## Technologies Used

- **Frontend**:
  - [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) for structure.
  - [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) for styling.
  - [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) for dynamic functionality.

- **Animations**:
  - [GSAP](https://greensock.com/gsap/) for smooth transitions and animations, enhancing user interaction.

- **Local Storage**:
  - Leveraged for data persistence to maintain task lists and timer states after page refreshes.

## Getting Started

### Prerequisites

- A modern web browser.

### Installation

1. Clone the repository:
  
   git clone https://github.com/Aleksandr-Barabanov-DE/pomodoro.git

2. Navigate to the Project Directory:
  
   cd pomodoro-timer

3. Open the index.html file in your browser.
  
   
## Usage

- Add new tasks using the input field.
- Start the Pomodoro timer for individual tasks.
- Customize work and break durations in the settings.
- Visual indicators show time remaining for each session.
- All tasks and timer states are stored in `localStorage`, so they remain available even after refreshing the page.

## Improvements

- **Code Structure**: Consider modularizing the code for better readability and maintenance. Functions related to tasks (addition, deletion, loading) could be in a separate module.
  
- **Error Handling**: Implement error handling when interacting with `localStorage` to prevent issues if data becomes corrupted.

- **Timer Optimization**: Introduce the ability to pause and resume the timer, improving user experience.

- **Notification Sound Customization**: Allow users to select their notification sound from available options.

- **Interactive UI**: Add animations for transitions between states (e.g., task completion, moving to the next task).

- **User Experience Enhancements**: Consider adding visual time indicators (e.g., color-coded progress bars) to help users quickly assess remaining time.

- **State Saving**: Ensure timer state (work or break) is saved in `localStorage` to prevent loss of information upon page reload.

- **Timer Settings**: Allow users to customize the duration of work and break sessions.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## Author

**Barabanov Aleksandr**

## Contacts

<div>
  <a href="https://www.linkedin.com/in/aleksandr-barabanov/">
    <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a> 
  <a href="mailto:barabanov.codes@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>
  </a>
  <a href="https://profile.indeed.com/?hl=en_CA&co=CA&from=gnav-notifcenter">
    <img src="https://img.shields.io/badge/indeed-003A9B?style=for-the-badge&logo=indeed&logoColor=white" alt="Indeed"/>
  </a>
  <a href="https://www.codewars.com/users/Aleksandr-Barabanov">
    <img src="https://img.shields.io/badge/Codewars-B1361E?style=for-the-badge&logo=codewars&logoColor=grey" alt="Codewars"/>
  </a>
</div>
