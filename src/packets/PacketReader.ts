import { decodeVarInt } from "@/varint"

export default class PacketReader {
  offset: number = 0

  public buffer: Buffer

  public readonly id: number
  public readonly length: number

  constructor(buffer: Buffer) {
    this.buffer = buffer
    this.length = this.readVarInt()
    this.id = this.readVarInt()
  }

  private read(length: number) {
    const result = this.buffer.subarray(this.offset, this.offset += length)
    return result
  }

  public readVarInt() {
    const [result, offset] = decodeVarInt(this.buffer, this.offset)
    this.offset = offset
    return result
  }

  public readString() {
    return this.read(this.readVarInt()).toString()
  }

  public readUShort() {
    const value = this.buffer.readUInt16BE(this.offset)
    this.offset += 2;
    return value;
  }
}