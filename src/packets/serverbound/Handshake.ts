import { ProtocolState } from "@/state"
import PacketReader from "../PacketReader"

export default class HandshakePacket {
  protocol: number = 0
  address: string = 'localhost'
  port: number = 25565
  nextState: ProtocolState = ProtocolState.STATUS

  public deserialize(reader: PacketReader) {
    this.protocol = reader.readVarInt()
    this.address = reader.readString()
    this.port = reader.readUShort()
    this.nextState = reader.readVarInt()
  }
}