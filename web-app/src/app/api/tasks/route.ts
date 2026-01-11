// Next.js API route that proxies task requests to the backend with authentication
// This solves the cross-origin cookie issue by keeping auth within Next.js
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/server-auth';
import { headers as getHeaders } from 'next/headers';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

// Helper to get current session
async function getServerSession(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers,
        });
        return session;
    } catch (error) {
        console.error('Error getting session:', error);
        return null;
    }
}

// GET /api/tasks - Get all tasks for the current user
export async function GET(req: NextRequest) {
    const session = await getServerSession(req);

    if (!session?.user?.id) {
        return NextResponse.json(
            { error: 'Authentication required' },
            { status: 401 }
        );
    }

    try {
        // Call the backend with the user_id as a header
        const response = await fetch(`${BACKEND_URL}/api/tasks/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': session.user.id,
            },
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tasks' },
            { status: 500 }
        );
    }
}

// POST /api/tasks - Create a new task
export async function POST(req: NextRequest) {
    const session = await getServerSession(req);

    if (!session?.user?.id) {
        return NextResponse.json(
            { error: 'Authentication required' },
            { status: 401 }
        );
    }

    try {
        const body = await req.json();

        const response = await fetch(`${BACKEND_URL}/api/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': session.user.id,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error creating task:', error);
        return NextResponse.json(
            { error: 'Failed to create task' },
            { status: 500 }
        );
    }
}
