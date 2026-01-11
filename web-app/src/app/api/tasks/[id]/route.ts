// Dynamic route for individual task operations
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/server-auth';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

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

// GET /api/tasks/[id] - Get a specific task
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(req);

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    try {
        const response = await fetch(`${BACKEND_URL}/api/tasks/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': session.user.id,
            },
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error fetching task:', error);
        return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
    }
}

// PUT /api/tasks/[id] - Update a task
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(req);

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    try {
        const body = await req.json();

        const response = await fetch(`${BACKEND_URL}/api/tasks/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': session.user.id,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error updating task:', error);
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(req);

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    try {
        const response = await fetch(`${BACKEND_URL}/api/tasks/${params.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-User-ID': session.user.id,
            },
        });

        if (response.status === 204 || response.ok) {
            return NextResponse.json({ message: 'Task deleted' }, { status: 200 });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error deleting task:', error);
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}
