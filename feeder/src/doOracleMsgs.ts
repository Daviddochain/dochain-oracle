import * as crypto from 'crypto'
import { BinaryReader, BinaryWriter } from 'cosmjs-types/binary'
import { EncodeObject } from '@cosmjs/proto-signing'

export const MsgAggregateDoRatePrevoteTypeUrl =
  '/do.oracle.v1beta1.MsgAggregateDoRatePrevote'
export const MsgAggregateDoRateVoteTypeUrl =
  '/do.oracle.v1beta1.MsgAggregateDoRateVote'

export interface MsgAggregateDoRatePrevoteProto {
  hash: string
  feeder: string
  validator: string
}

export interface MsgAggregateDoRateVoteProto {
  salt: string
  exchangeRates: string
  feeder: string
  validator: string
}

function createBasePrevote(): MsgAggregateDoRatePrevoteProto {
  return { hash: '', feeder: '', validator: '' }
}

function createBaseVote(): MsgAggregateDoRateVoteProto {
  return { salt: '', exchangeRates: '', feeder: '', validator: '' }
}

export const MsgAggregateDoRatePrevoteProto = {
  typeUrl: MsgAggregateDoRatePrevoteTypeUrl,

  encode(
    message: MsgAggregateDoRatePrevoteProto,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.hash !== '') {
      writer.uint32(10).string(message.hash)
    }
    if (message.feeder !== '') {
      writer.uint32(18).string(message.feeder)
    }
    if (message.validator !== '') {
      writer.uint32(26).string(message.validator)
    }
    return writer
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgAggregateDoRatePrevoteProto {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input)
    const end = length === undefined ? reader.len : reader.pos + length
    const message = createBasePrevote()

    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string()
          break
        case 2:
          message.feeder = reader.string()
          break
        case 3:
          message.validator = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }

    return message
  },

  fromPartial(object: Partial<MsgAggregateDoRatePrevoteProto>): MsgAggregateDoRatePrevoteProto {
    const message = createBasePrevote()
    message.hash = object.hash ?? ''
    message.feeder = object.feeder ?? ''
    message.validator = object.validator ?? ''
    return message
  },
}

export const MsgAggregateDoRateVoteProto = {
  typeUrl: MsgAggregateDoRateVoteTypeUrl,

  encode(
    message: MsgAggregateDoRateVoteProto,
    writer: BinaryWriter = BinaryWriter.create(),
  ): BinaryWriter {
    if (message.salt !== '') {
      writer.uint32(10).string(message.salt)
    }
    if (message.exchangeRates !== '') {
      writer.uint32(18).string(message.exchangeRates)
    }
    if (message.feeder !== '') {
      writer.uint32(26).string(message.feeder)
    }
    if (message.validator !== '') {
      writer.uint32(34).string(message.validator)
    }
    return writer
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MsgAggregateDoRateVoteProto {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input)
    const end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseVote()

    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.salt = reader.string()
          break
        case 2:
          message.exchangeRates = reader.string()
          break
        case 3:
          message.feeder = reader.string()
          break
        case 4:
          message.validator = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }

    return message
  },

  fromPartial(object: Partial<MsgAggregateDoRateVoteProto>): MsgAggregateDoRateVoteProto {
    const message = createBaseVote()
    message.salt = object.salt ?? ''
    message.exchangeRates = object.exchangeRates ?? ''
    message.feeder = object.feeder ?? ''
    message.validator = object.validator ?? ''
    return message
  },
}

export function aggregateVoteHash(
  exchangeRates: string,
  salt: string,
  validator: string,
): string {
  const payload = `${salt}:${exchangeRates}:${validator}`
  return crypto.createHash('sha256').update(payload).digest('hex').substring(0, 40)
}

export class MsgAggregateDoRatePrevote {
  public hash: string
  public feeder: string
  public validator: string

  constructor(hash: string, feeder: string, validator: string) {
    this.hash = hash
    this.feeder = feeder
    this.validator = validator
  }

  public toProto(): MsgAggregateDoRatePrevoteProto {
    return {
      hash: this.hash,
      feeder: this.feeder,
      validator: this.validator,
    }
  }

  public toEncodeObject(): EncodeObject {
    return {
      typeUrl: MsgAggregateDoRatePrevoteTypeUrl,
      value: this.toProto(),
    }
  }

  public toJSON(): Record<string, string> {
    return {
      typeUrl: MsgAggregateDoRatePrevoteTypeUrl,
      hash: this.hash,
      feeder: this.feeder,
      validator: this.validator,
    }
  }
}

export class MsgAggregateDoRateVote {
  public salt: string
  public exchangeRates: string
  public feeder: string
  public validator: string

  constructor(salt: string, exchangeRates: string, feeder: string, validator: string) {
    this.salt = salt
    this.exchangeRates = exchangeRates
    this.feeder = feeder
    this.validator = validator
  }

  public toProto(): MsgAggregateDoRateVoteProto {
    return {
      salt: this.salt,
      exchangeRates: this.exchangeRates,
      feeder: this.feeder,
      validator: this.validator,
    }
  }

  public toEncodeObject(): EncodeObject {
    return {
      typeUrl: MsgAggregateDoRateVoteTypeUrl,
      value: this.toProto(),
    }
  }

  public toJSON(): Record<string, string> {
    return {
      typeUrl: MsgAggregateDoRateVoteTypeUrl,
      salt: this.salt,
      exchange_rates: this.exchangeRates,
      feeder: this.feeder,
      validator: this.validator,
    }
  }
}
