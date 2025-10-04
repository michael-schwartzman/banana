import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { characterId, prompt, pages } = await request.json();

    const storyStmt = db.prepare(
      'INSERT INTO stories (character_id, prompt) VALUES (?, ?)'
    );
    const storyResult = storyStmt.run(characterId, prompt);
    const storyId = storyResult.lastInsertRowid;

    const pageStmt = db.prepare(
      'INSERT INTO pages (story_id, page_number, image_data, image_mime_type, text_content) VALUES (?, ?, ?, ?, ?)'
    );

    const insertPages = db.transaction((pages: any[]) => {
      pages.forEach((page, index) => {
        pageStmt.run(
          storyId,
          index + 1,
          page.imageData?.data || null,
          page.imageData?.mimeType || null,
          page.text
        );
      });
    });

    insertPages(pages);

    return NextResponse.json({ id: storyId, characterId, prompt });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const characterId = searchParams.get('characterId');
    const storyId = searchParams.get('id');

    if (storyId) {
      // Get single story with pages
      const storyStmt = db.prepare('SELECT * FROM stories WHERE id = ?');
      const story = storyStmt.get(storyId) as any;

      if (!story) {
        return NextResponse.json({ error: 'Story not found' }, { status: 404 });
      }

      const pagesStmt = db.prepare('SELECT * FROM pages WHERE story_id = ? ORDER BY page_number');
      const pages = pagesStmt.all(storyId) as any[];

      return NextResponse.json({
        id: story.id,
        characterId: story.character_id,
        prompt: story.prompt,
        createdAt: story.created_at,
        pages: pages.map(p => ({
          pageNumber: p.page_number,
          imageData: p.image_data ? {
            data: p.image_data,
            mimeType: p.image_mime_type
          } : null,
          text: p.text_content
        }))
      });
    } else if (characterId) {
      // Get all stories for character
      const stmt = db.prepare(`
        SELECT s.*,
               (SELECT COUNT(*) FROM pages WHERE story_id = s.id) as page_count
        FROM stories s
        WHERE s.character_id = ?
        ORDER BY s.created_at DESC
      `);
      const stories = stmt.all(characterId);

      return NextResponse.json(stories);
    } else {
      return NextResponse.json({ error: 'Character ID or Story ID required' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Story ID required' }, { status: 400 });
    }

    db.prepare('DELETE FROM pages WHERE story_id = ?').run(id);
    db.prepare('DELETE FROM stories WHERE id = ?').run(id);

    return NextResponse.json({ message: 'Story deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
