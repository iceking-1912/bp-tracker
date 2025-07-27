# Blood Pressure Tracker

A clean, responsive React application for tracking and visualizing blood pressure readings.

## Features

- **Add/Edit/Delete Readings**: Full CRUD operations for BP readings
- **Trend Visualization**: Interactive chart showing systolic & diastolic trends
- **Color-coded Readings**: Visual indicators based on configurable BP limits
- **Date Filtering**: Filter readings by date range
- **Responsive Design**: Mobile-friendly interface
- **Form Validation**: Input validation with user feedback

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## API Endpoints

The app connects to the following API endpoints:

- `GET /api/bp` - Get all readings
- `POST /api/bp` - Add new reading
- `PUT /api/bp/:id` - Update reading
- `DELETE /api/bp/:id` - Delete reading
- `GET /api/bp/limits` - Get BP limits
- `POST /api/bp/limits` - Update BP limits

## Project Structure

```
src/
├── api/           # API service functions
├── components/    # React components
├── styles/        # CSS styles
├── utils/         # Utility functions
├── App.jsx        # Main app component
└── index.js       # App entry point
```

## Components

- **App**: Main application container
- **BPForm**: Add new BP readings
- **BPTable**: Display and edit readings in table format
- **BPChart**: Visualize trends with Recharts
- **DateFilter**: Filter readings by date range
- **LimitsForm**: Configure BP limit thresholds

## Technologies Used

- React 19
- Recharts for data visualization
- Axios for API calls
- CSS Grid/Flexbox for responsive layout

## Deployment

Deploy to platforms like:
- Netlify
- Vercel
- GitHub Pages

## License

MIT