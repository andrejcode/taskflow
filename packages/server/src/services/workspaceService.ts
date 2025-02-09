import { IWorkspace } from '@/models/Workspace';
import { WorkspaceDto, MemberDto } from '@/shared/dtos';

export function mapWorkspaceToDto(workspace: IWorkspace) {
  return new WorkspaceDto(
    workspace._id.toString(),
    workspace.name,
    workspace.members.map(
      (member) => new MemberDto(member.user.toString(), member.role)
    ),
    workspace.createdAt,
    workspace.updatedAt
  );
}
