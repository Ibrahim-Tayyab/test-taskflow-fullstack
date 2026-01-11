from typing import List, Optional
from sqlmodel import Session
from models.task import Task, TaskCreate, TaskUpdate
from repositories.task_repository import TaskRepository


class TaskService:
    def __init__(self, repository: TaskRepository):
        self.repository = repository

    def create_task(self, session: Session, task: TaskCreate, user_id: str) -> Task:
        """Create a new task for the authenticated user."""
        return self.repository.create_task(session, task, user_id)

    def get_task(self, session: Session, task_id: int, user_id: str) -> Optional[Task]:
        """Get a task if it belongs to the user."""
        return self.repository.get_task(session, task_id, user_id)

    def get_all_tasks(self, session: Session, user_id: str) -> List[Task]:
        """Get all tasks for the authenticated user."""
        return self.repository.get_tasks(session, user_id)

    def update_task(self, session: Session, task_id: int, user_id: str, task_update: TaskUpdate) -> Optional[Task]:
        """Update a task if it belongs to the user."""
        task_data = task_update.model_dump(exclude_unset=True)
        return self.repository.update_task(session, task_id, user_id, task_data)

    def delete_task(self, session: Session, task_id: int, user_id: str) -> bool:
        """Delete a task if it belongs to the user."""
        return self.repository.delete_task(session, task_id, user_id)

    def complete_task(self, session: Session, task_id: int, user_id: str, completed: bool) -> Optional[Task]:
        """Toggle task completion if it belongs to the user."""
        return self.repository.update_task(session, task_id, user_id, {"completed": completed})