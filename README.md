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

## System Architecture

The application relies on a decoupled React architecture, isolating the highly active animation loop from the presentation components to ensure optimal rendering performance.

```mermaid
flowchart TB
    subgraph Data["📦 Data Layer"]
        API[(Mock Route Data)]
    end

    subgraph Logic["⚙️ State & Animation Engine"]
        RouteHook([useRouteData])
        SimHook[[useTruckSimulation]]
        Math{{Geo-Math Interpolation}}
    end

    subgraph UI["🖥️ Presentation Layer"]
        Dashboard[App Dashboard Layout]
        Panel[Status Panel UI]
        Controls[Controls Bar UI]
        Map[React-Leaflet Map]
    end

    %% Connections
    API -->|Loads coordinates| RouteHook
    RouteHook -->|Passes segments| SimHook
    SimHook <-->|requestAnimationFrame| Math
    SimHook == "Live distance, heading, progress" ===> Dashboard
    
    Dashboard --> Panel
    Dashboard --> Controls
    Dashboard --> Map

    %% Styling
    classDef dataNode fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#e2e8f0
    classDef logicNode fill:#0f172a,stroke:#8b5cf6,stroke-width:2px,color:#e2e8f0
    classDef uiNode fill:#0f172a,stroke:#10b981,stroke-width:2px,color:#e2e8f0
    style Data fill:none,stroke:#475569,stroke-width:1px,stroke-dasharray: 5 5
    style Logic fill:none,stroke:#475569,stroke-width:1px,stroke-dasharray: 5 5
    style UI fill:none,stroke:#475569,stroke-width:1px,stroke-dasharray: 5 5

    class API dataNode
    class RouteHook,SimHook,Math logicNode
    class Dashboard,Panel,Controls,Map uiNode
