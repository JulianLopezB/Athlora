# FitGraph - AI-Powered Workout Generator & Tracker

FitGraph is a modern web application that helps users plan and track their workouts while providing AI-powered workout recommendations. It offers detailed analytics, integration with fitness platforms like Strava and Garmin, and personalized workout routines.

## Features

- **AI Workout Generator**: Get personalized workout routines based on your fitness level, goals, and available equipment.
- **Workout Tracking**: Log and manage your exercises, sets, reps, and weights.
- **Analytics Dashboard**: View insights about your workout trends and progress.
- **Strava/Garmin Integration**: Import your activities from popular fitness platforms.
- **User Profiles**: Manage your fitness data and preferences.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI API
- **Charts**: Chart.js with react-chartjs-2
- **API Integrations**: Strava API, Garmin Connect API

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Supabase account
- OpenAI API key
- Strava API credentials (optional)
- Garmin API credentials (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fitgraph.git
   cd fitgraph
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the project root and add your environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   STRAVA_CLIENT_ID=your_strava_client_id
   STRAVA_CLIENT_SECRET=your_strava_client_secret
   ```

4. Initialize the Supabase database:
   - Log in to your Supabase dashboard
   - Go to the SQL Editor section
   - Copy the contents of `db/schema.sql` and run it to create all required tables and security policies

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following database structure:

- **users**: User authentication and metadata
- **user_profiles**: Additional user information like weight, height, fitness goals
- **workouts**: Workout sessions logged by users
- **exercises**: Individual exercises linked to workouts
- **user_connections**: API connections to services like Strava and Garmin

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the AI capabilities
- Strava and Garmin for their API services
- The Next.js and Supabase teams for their excellent documentation and examples