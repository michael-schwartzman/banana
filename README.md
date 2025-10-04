# Storybook Generator

A personalized children's storybook generator using Google's Gemini 2.5 Flash Image model.

## Features

- **Character Setup**: Upload a child's photo and save their profile (name, age, gender, favorite activity)
- **Multi-Page Stories**: Generate 3-page stories with illustrations and text
- **Server-Side Storage**: All character data and stories saved to SQLite database
- **Story History**: View, reload, and delete previously generated stories
- **Image Generation**: Hyper-realistic illustrations based on source images

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Next.js 15 with App Router
- **Database**: SQLite (via better-sqlite3)
- **API**: Google Gemini 2.5 Flash Image

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open http://localhost:3000

## API Routes

- `POST /api/characters` - Save new character
- `GET /api/characters?id=:id` - Get character by ID
- `POST /api/stories` - Save new story
- `GET /api/stories?characterId=:id` - Get all stories for a character
- `GET /api/stories?id=:id` - Get single story with pages
- `DELETE /api/stories?id=:id` - Delete story

## Database Schema

### Characters
- id, name, age, gender, favorite_thing, image, created_at

### Stories
- id, character_id, prompt, created_at

### Pages
- id, story_id, page_number, image_data, image_mime_type, text_content
