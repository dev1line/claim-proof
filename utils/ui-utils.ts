import {
  Address,
  beginCell,
  Builder,
  Cell,
  Dictionary,
  DictionaryValue,
  Slice,
} from "@ton/core";

export const jettonWalletCodeFromLibrary = (jettonWalletCodeRaw: Cell) => {
  // https://docs.ton.org/tvm.pdf, page 30
  // Library reference cell — Always has level 0, and contains 8+256 data bits, including its 8-bit type integer 2
  // and the representation hash Hash(c) of the library cell being referred to. When loaded, a library
  // reference cell may be transparently replaced by the cell it refers to, if found in the current library context.

  const libraryReferenceCell = beginCell()
    .storeUint(2, 8)
    .storeBuffer(jettonWalletCodeRaw.hash())
    .endCell();

  return new Cell({
    exotic: true,
    bits: libraryReferenceCell.bits,
    refs: libraryReferenceCell.refs,
  });
};

export const buff2bigint = (buff: Buffer): bigint => {
  return BigInt("0x" + buff.toString("hex"));
};
