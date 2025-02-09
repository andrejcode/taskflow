import { IWorkspace } from '@/models/Workspace';

export default function isUserAdmin(workspace: IWorkspace, userId: string) {
  const member = workspace.members.find(
    (member) => member.user.toString() === userId
  );

  return member?.role === 'admin';
}
