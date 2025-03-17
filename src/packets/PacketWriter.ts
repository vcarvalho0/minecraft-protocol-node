import { writeVarInt } from "@/varint";

export default class PacketWriter {
  public length: number = 0

  public writeString(value: string): Buffer {
    const length = Buffer.byteLength(value)
    return Buffer.concat([writeVarInt(length), Buffer.from(value)])
  }

  public writeLong(value: number): Buffer {
    const buffer = Buffer.alloc(8);
    buffer.writeBigInt64BE(BigInt(value), 0);
    return buffer;
  }
}