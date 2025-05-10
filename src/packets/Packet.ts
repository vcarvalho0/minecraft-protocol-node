import { writeVarInt } from '@/varint'

export default class Packet {
  private id: number
  private data: Buffer

  constructor(id: number, data: Buffer) {
    this.id = id
    this.data = data
  }

  /**
   * Serialize the data from an existing buffer
   * @returns Serialized buffer
   */
  public serialize(): Buffer {
    const id = writeVarInt(this.id)
    const packetLength = writeVarInt(id.length + this.data.length)
    return Buffer.concat([packetLength, id, this.data])
  }
}