import { IChannel } from '@/models/Channel';
import { ChannelDto } from '@/shared/dtos';

export function mapChannelToDto(channel: IChannel) {
  return new ChannelDto(
    channel._id.toString(),
    channel.name,
    channel.createdAt,
    channel.updatedAt
  );
}
