/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace Types {
  export type TradeStruct = {
    isExist: boolean;
    tradeId: BigNumberish;
    trader: AddressLike;
    amount: BigNumberish;
    direction: BigNumberish;
    startPrice: BigNumberish;
    markPrice: BigNumberish;
    status: BigNumberish;
    expireTime: BigNumberish;
    market: string;
  };

  export type TradeStructOutput = [
    isExist: boolean,
    tradeId: bigint,
    trader: string,
    amount: bigint,
    direction: bigint,
    startPrice: bigint,
    markPrice: bigint,
    status: bigint,
    expireTime: bigint,
    market: string
  ] & {
    isExist: boolean;
    tradeId: bigint;
    trader: string;
    amount: bigint;
    direction: bigint;
    startPrice: bigint;
    markPrice: bigint;
    status: bigint;
    expireTime: bigint;
    market: string;
  };
}

export interface BiopsHubInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addMarket"
      | "claim"
      | "getTradeLimit"
      | "getUserFullInfo"
      | "markets"
      | "owner"
      | "removeMarket"
      | "resolveTrade"
      | "trade"
      | "tradeTracker"
      | "userTradeTracker"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "Claimed" | "TradeCreated" | "UpdateStatusTrade"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addMarket",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "claim", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "getTradeLimit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getUserFullInfo",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "markets", values: [string]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeMarket",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "resolveTrade",
    values: [BigNumberish, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "trade",
    values: [
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BytesLike[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "tradeTracker",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "userTradeTracker",
    values: [AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "addMarket", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTradeLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserFullInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "markets", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeMarket",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resolveTrade",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "trade", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tradeTracker",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "userTradeTracker",
    data: BytesLike
  ): Result;
}

export namespace ClaimedEvent {
  export type InputTuple = [
    tradeId: BigNumberish,
    user: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [tradeId: bigint, user: string, amount: bigint];
  export interface OutputObject {
    tradeId: bigint;
    user: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TradeCreatedEvent {
  export type InputTuple = [
    tradeId: BigNumberish,
    user: AddressLike,
    amount: BigNumberish,
    direction: BigNumberish
  ];
  export type OutputTuple = [
    tradeId: bigint,
    user: string,
    amount: bigint,
    direction: bigint
  ];
  export interface OutputObject {
    tradeId: bigint;
    user: string;
    amount: bigint;
    direction: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UpdateStatusTradeEvent {
  export type InputTuple = [tradeId: BigNumberish, status: BigNumberish];
  export type OutputTuple = [tradeId: bigint, status: bigint];
  export interface OutputObject {
    tradeId: bigint;
    status: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface BiopsHub extends BaseContract {
  connect(runner?: ContractRunner | null): BiopsHub;
  waitForDeployment(): Promise<this>;

  interface: BiopsHubInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addMarket: TypedContractMethod<
    [_market: string, _priceId: BytesLike],
    [void],
    "nonpayable"
  >;

  claim: TypedContractMethod<[_tradeId: BigNumberish], [void], "nonpayable">;

  getTradeLimit: TypedContractMethod<[], [bigint], "view">;

  getUserFullInfo: TypedContractMethod<
    [_trader: AddressLike],
    [Types.TradeStructOutput[]],
    "view"
  >;

  markets: TypedContractMethod<[arg0: string], [string], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  removeMarket: TypedContractMethod<[_market: string], [void], "nonpayable">;

  resolveTrade: TypedContractMethod<
    [_tradeId: BigNumberish, _priceUpdateData: BytesLike[]],
    [void],
    "payable"
  >;

  trade: TypedContractMethod<
    [
      _user: AddressLike,
      _amount: BigNumberish,
      _direction: BigNumberish,
      _time: BigNumberish,
      _market: string,
      _priceUpdateData: BytesLike[]
    ],
    [bigint],
    "payable"
  >;

  tradeTracker: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        boolean,
        bigint,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        string
      ] & {
        isExist: boolean;
        tradeId: bigint;
        trader: string;
        amount: bigint;
        direction: bigint;
        startPrice: bigint;
        markPrice: bigint;
        status: bigint;
        expireTime: bigint;
        market: string;
      }
    ],
    "view"
  >;

  userTradeTracker: TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [bigint],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addMarket"
  ): TypedContractMethod<
    [_market: string, _priceId: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "claim"
  ): TypedContractMethod<[_tradeId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getTradeLimit"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getUserFullInfo"
  ): TypedContractMethod<
    [_trader: AddressLike],
    [Types.TradeStructOutput[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "markets"
  ): TypedContractMethod<[arg0: string], [string], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "removeMarket"
  ): TypedContractMethod<[_market: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "resolveTrade"
  ): TypedContractMethod<
    [_tradeId: BigNumberish, _priceUpdateData: BytesLike[]],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "trade"
  ): TypedContractMethod<
    [
      _user: AddressLike,
      _amount: BigNumberish,
      _direction: BigNumberish,
      _time: BigNumberish,
      _market: string,
      _priceUpdateData: BytesLike[]
    ],
    [bigint],
    "payable"
  >;
  getFunction(
    nameOrSignature: "tradeTracker"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        boolean,
        bigint,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        string
      ] & {
        isExist: boolean;
        tradeId: bigint;
        trader: string;
        amount: bigint;
        direction: bigint;
        startPrice: bigint;
        markPrice: bigint;
        status: bigint;
        expireTime: bigint;
        market: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "userTradeTracker"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish],
    [bigint],
    "view"
  >;

  getEvent(
    key: "Claimed"
  ): TypedContractEvent<
    ClaimedEvent.InputTuple,
    ClaimedEvent.OutputTuple,
    ClaimedEvent.OutputObject
  >;
  getEvent(
    key: "TradeCreated"
  ): TypedContractEvent<
    TradeCreatedEvent.InputTuple,
    TradeCreatedEvent.OutputTuple,
    TradeCreatedEvent.OutputObject
  >;
  getEvent(
    key: "UpdateStatusTrade"
  ): TypedContractEvent<
    UpdateStatusTradeEvent.InputTuple,
    UpdateStatusTradeEvent.OutputTuple,
    UpdateStatusTradeEvent.OutputObject
  >;

  filters: {
    "Claimed(uint256,address,uint256)": TypedContractEvent<
      ClaimedEvent.InputTuple,
      ClaimedEvent.OutputTuple,
      ClaimedEvent.OutputObject
    >;
    Claimed: TypedContractEvent<
      ClaimedEvent.InputTuple,
      ClaimedEvent.OutputTuple,
      ClaimedEvent.OutputObject
    >;

    "TradeCreated(uint256,address,uint256,uint8)": TypedContractEvent<
      TradeCreatedEvent.InputTuple,
      TradeCreatedEvent.OutputTuple,
      TradeCreatedEvent.OutputObject
    >;
    TradeCreated: TypedContractEvent<
      TradeCreatedEvent.InputTuple,
      TradeCreatedEvent.OutputTuple,
      TradeCreatedEvent.OutputObject
    >;

    "UpdateStatusTrade(uint256,uint8)": TypedContractEvent<
      UpdateStatusTradeEvent.InputTuple,
      UpdateStatusTradeEvent.OutputTuple,
      UpdateStatusTradeEvent.OutputObject
    >;
    UpdateStatusTrade: TypedContractEvent<
      UpdateStatusTradeEvent.InputTuple,
      UpdateStatusTradeEvent.OutputTuple,
      UpdateStatusTradeEvent.OutputObject
    >;
  };
}