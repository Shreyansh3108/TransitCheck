# TransitCheck: Logistics Route Visualizer

🚀 **Live Deployment:** [View the Live Dashboard Here](https://transit-check-beryl.vercel.app/)

A high-fidelity logistics dashboard built to simulate and track delivery vehicles in real-time. This application provides live geographic telemetry, ETA calculations, and animated coordinate interpolation wrapped in a production-ready SaaS interface.

## Problem Statement
Modern logistics operations require real-time visibility into transit routes. The challenge was to build an interactive frontend dashboard that handles continuous geographic coordinate math and smooth marker animation without dropping frames or blocking the main UI thread, while strictly adhering to a professional enterprise design language.

## Project Requirements
* **Map Integration:** Render a continuous route containing an Origin and 3 Delivery Waypoints.
* **Live Telemetry:** Animate a truck marker moving sequentially along the geographic path.
* **Status Tracking:** Display live metrics including distance covered, current location, next stop, and a fraction of completed stops (e.g., 0/3).
* **Advanced Controls (Bonus):** Implement Pause/Resume functionality and variable playback speeds (1x, 2x, 4x).
* **ETA Calculation (Bonus):** Derive real-time estimated arrival minutes based on remaining distance and a constant vehicle speed.
* **Theme Support (Bonus):** Build a manual Light/Dark mode toggle architecture.

