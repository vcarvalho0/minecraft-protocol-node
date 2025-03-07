export function parseVarInt(buffer: Buffer) {
  let result = 0;
  let shift = 0;
  let index = 0;

  while (true) {
    const byte = buffer[index++]!;
    result |= (byte & 0x7F) << shift;
    shift += 7;

    if ((byte & 0x80) === 0) {
      break;
    }
  }

  return result;
}

export function writeVarInt(value: number) {
  const buffer = Buffer.alloc(5);
  let index = 0;

  while (true) {
    let byte = value & 0x7F;
    value >>>= 7;

    if (value !== 0) {
      byte |= 0x80;
    }

    buffer[index++] = byte;

    if (value === 0) {
      break;
    }
  }

  return buffer.subarray(0, index);
}

export function decodeVarInt(data: Buffer, offset: number = 0): [number, number] {
  let result = 0;
  let shift = 0;

  while (true) {
    const byte = data[offset]!;
    result |= (byte & 0x7F) << shift;
    offset++;

    if ((byte & 0x80) === 0) {
      break;
    }
    shift += 7;
  }

  return [result, offset];
}
