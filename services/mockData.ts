
import { User, Project, Task, TaskStatus, TaskPriority, UserRole } from '../types';

export const currentUser: User = {
  id: 'u1',
  name: 'Alex Rivera',
  email: 'alex@workflowpro.io',
  role: UserRole.ADMIN,
  avatar: 'https://picsum.photos/seed/alex/100/100'
};

export const mockUsers: User[] = [
  currentUser,
  { id: 'u2', name: 'Sarah Chen', email: 'sarah@workflowpro.io', role: UserRole.MANAGER, avatar: 'https://picsum.photos/seed/sarah/100/100' },
  { id: 'u3', name: 'James Wilson', email: 'james@workflowpro.io', role: UserRole.MEMBER, avatar: 'https://picsum.photos/seed/james/100/100' }
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'SaaS Platform Redesign',
    description: 'Modernizing the core UI/UX of our main product line.',
    status: 'Active',
    progress: 65,
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    managerId: 'u2'
  },
  {
    id: 'p2',
    name: 'Mobile App Launch',
    description: 'Preparing the iOS and Android versions for global rollout.',
    status: 'Active',
    progress: 30,
    startDate: '2024-03-15',
    endDate: '2024-09-01',
    managerId: 'u1'
  }
];

export const mockTasks: Task[] = [
  {
    id: 't1',
    projectId: 'p1',
    title: 'Audit current navigation flow',
    description: 'Identify bottlenecks in the user onboarding journey.',
    status: TaskStatus.DONE,
    priority: TaskPriority.HIGH,
    assignedTo: 'u2',
    dueDate: '2024-02-10'
  },
  {
    id: 't2',
    projectId: 'p1',
    title: 'Implement Dark Mode support',
    description: 'Ensure all components have correct tailwind dark classes.',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
    assignedTo: 'u3',
    dueDate: '2024-03-25'
  },
  {
    id: 't3',
    projectId: 'p1',
    title: 'Finalize Pricing Table Design',
    description: 'High fidelity mockups for the checkout page.',
    status: TaskStatus.TODO,
    priority: TaskPriority.CRITICAL,
    assignedTo: 'u1',
    dueDate: '2024-04-05'
  }
];
