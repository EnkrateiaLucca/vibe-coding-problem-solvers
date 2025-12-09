# Product Requirements Document: Manufacturing Component Planner

## Overview

An interactive single-page application that calculates component (widget) requirements for manufacturing machines over a configurable time horizon. Users upload Bill of Materials (BOM) and production forecast data, then explore different planning scenarios through an intuitive UI.

## Problem Statement

Manufacturing planners need to quickly determine component requirements across different time horizons and product mixes. Current methods involve manual spreadsheet calculations that are error-prone and time-consuming. This tool provides instant "what-if" scenario planning.

## Target Users

- Manufacturing planners
- Supply chain managers
- Procurement teams
- Production schedulers

## Core Features

### 1. CSV Data Upload
- Drag-and-drop or click-to-upload interface
- Client-side parsing (no server required)
- Expected CSV structure:
  - `machine_type`: The end product being manufactured
  - `component`: Widget/part name
  - `qty_per_machine`: Units of component needed per machine
  - `yr1_forecast` through `yr10_forecast`: Planned machine production per year
- Display upload confirmation with data summary

### 2. Scenario Configuration Panel
- **Component Selector**: Dropdown populated from unique `component` values in CSV
- **Machine Selector**: Dropdown populated from unique `machine_type` values (or "All Machines")
- **Time Horizon Slider**: Range input from 1 to 10 years
- Real-time updates on parameter change

### 3. Results Display

#### Primary Output Card
Large, prominent display showing:
```
"You need [X] units of [Component] to manufacture [N] [Machine(s)] over the next [Y] years"
```

#### Breakdown Chart
- Bar chart showing year-by-year component requirements
- X-axis: Years (Year 1, Year 2... up to selected horizon)
- Y-axis: Component quantity needed
- Stacked bars if multiple machines selected

#### Summary Statistics Panel
- Total components required
- Average per year
- Peak year requirement
- Total machines to be produced

### 4. Data Preview Table
- Scrollable table showing uploaded BOM data
- Highlights rows relevant to current selection
- Shows component-to-machine relationships

## Calculation Logic

```
For each selected machine:
  component_qty = qty_per_machine × Σ(annual_forecast for selected years)

If "All Machines" selected:
  total = Σ(component_qty for all machines using that component)
```

## Technical Specifications

### Stack
- **HTML5**: Semantic structure
- **CSS3**: Flexbox/Grid layout, CSS variables for theming
- **Vanilla JavaScript**: No framework dependencies
- **Chart.js** (CDN): For chart rendering

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)

### Performance Requirements
- Instant recalculation on parameter change
- Handle BOM data up to 1,000 rows

## User Flow

```
1. User loads page → sees upload prompt with sample format hint
2. User uploads CSV → file parsed, selectors populated
3. User selects Component from dropdown
4. User selects Machine (or "All Machines")
5. User adjusts year slider (default: 5 years)
6. Results update automatically on any parameter change
7. User can adjust any parameter to explore scenarios
```

## UI Layout (Wireframe Description)

```
┌─────────────────────────────────────────────────────────┐
│  HEADER: Manufacturing Component Planner                │
├─────────────────────────────────────────────────────────┤
│  UPLOAD ZONE: Drag & drop BOM/Forecast CSV              │
├─────────────────────────────────────────────────────────┤
│  CONTROLS ROW                                           │
│  [Component ▼]  [Machine ▼]  [Years: ====●====  5 yrs] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │           PRIMARY RESULT CARD                    │   │
│  │                                                  │   │
│  │   "You need 12,500 units of Widget A            │   │
│  │    to manufacture 2,500 Machine X               │   │
│  │    over the next 5 years"                       │   │
│  │                                                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
├────────────────────────────────┬────────────────────────┤
│                                │   SUMMARY STATS        │
│   YEAR-BY-YEAR CHART           │   ┌────────────────┐  │
│                                │   │ Total: 12,500  │  │
│   ▓▓▓                          │   │ Avg/Yr: 2,500  │  │
│   ▓▓▓  ▓▓▓                     │   │ Peak: 3,200    │  │
│   ▓▓▓  ▓▓▓  ▓▓▓  ▓▓▓  ▓▓▓     │   │ Machines: 2,500│  │
│   Y1   Y2   Y3   Y4   Y5       │   └────────────────┘  │
│                                │                        │
├────────────────────────────────┴────────────────────────┤
│  BOM DATA PREVIEW                                       │
│  ┌──────────┬───────────┬─────────┬──────┬──────┐      │
│  │ Machine  │ Component │ Qty/Mch │ Yr1  │ Yr2  │ ...  │
│  ├──────────┼───────────┼─────────┼──────┼──────┤      │
│  │          │           │         │      │      │      │
│  └──────────┴───────────┴─────────┴──────┴──────┘      │
└─────────────────────────────────────────────────────────┘
```

## Example Scenarios

### Scenario 1: Single Component, Single Machine
- **Input**: Widget A, Machine X, 5 years
- **Output**: "You need 12,500 units of Widget A to manufacture 2,500 Machine X over the next 5 years"

### Scenario 2: Single Component, All Machines
- **Input**: Widget A, All Machines, 10 years
- **Output**: "You need 45,000 units of Widget A to manufacture 9,000 machines (across all types) over the next 10 years"

### Scenario 3: Changing Time Horizon
- User adjusts slider from 5 → 3 years
- Results instantly update to show reduced quantities

## Success Criteria

- [ ] CSV upload correctly parses BOM + forecast data
- [ ] Dropdowns populate with unique components and machines
- [ ] Year slider works from 1-10 with live value display
- [ ] Primary result statement is grammatically correct and dynamic
- [ ] Chart displays year-by-year breakdown accurately
- [ ] Calculations match manual verification
- [ ] "All Machines" aggregation works correctly
- [ ] No console errors during normal operation

## CSV Format Specification

```csv
machine_type,component,qty_per_machine,yr1_forecast,yr2_forecast,...,yr10_forecast
Machine X,Widget A,5,400,450,500,550,600,650,700,750,800,850
Machine X,Widget B,12,400,450,500,550,600,650,700,750,800,850
Machine Y,Widget A,3,200,220,240,260,280,300,320,340,360,380
...
```

**Notes:**
- Each row represents a component requirement for a specific machine type
- `qty_per_machine`: How many units of this component are needed to build ONE machine
- `yr1_forecast` through `yr10_forecast`: Planned production quantity of that machine type per year

## Out of Scope (v1)

- Server-side processing or database
- User authentication
- Saving/loading scenarios
- Export to PDF/Excel
- Cost calculations
- Lead time considerations
- Inventory/stock level integration

## Future Considerations (v2+)

- Add cost per component for total cost projections
- Include safety stock calculations
- Multi-file upload (separate BOM and forecast files)
- Scenario comparison (side-by-side)
- Export results to CSV/PDF
- Integration with ERP systems

---

## File Structure

```
/project
├── index.html          # Main HTML structure
├── styles.css          # Stylesheet
├── app.js              # Application logic
├── sample-bom-data.csv # Test data file
└── PRD.md              # This document
```

## Revision History

| Version | Date | Notes |
|---------|------|-------|
| 0.1 | Draft | Initial generic dashboard |
| 0.2 | Draft | Revised for manufacturing planning use case |
