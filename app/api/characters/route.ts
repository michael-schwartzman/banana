import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { name, age, gender, favoriteThing, image } = await request.json();

    const stmt = db.prepare(
      'INSERT INTO characters (name, age, gender, favorite_thing, image) VALUES (?, ?, ?, ?, ?)'
    );

    const result = stmt.run(name, age, gender, favoriteThing, image);

    return NextResponse.json({
      id: result.lastInsertRowid,
      name,
      age,
      gender,
      favoriteThing
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Character ID required' }, { status: 400 });
    }

    const stmt = db.prepare('SELECT * FROM characters WHERE id = ?');
    const character = stmt.get(id) as any;

    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: character.id,
      name: character.name,
      age: character.age,
      gender: character.gender,
      favoriteThing: character.favorite_thing,
      image: character.image
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
