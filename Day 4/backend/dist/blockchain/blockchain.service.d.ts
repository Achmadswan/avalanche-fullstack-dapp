export declare class BlockchainService {
    private client;
    private contractAddress;
    constructor();
    getLatestValue(): Promise<{
        value: string;
    }>;
    getValueUpdatedEvents(fromBlock: number, toBlock: number): Promise<{
        blockNumber: string;
        value: string | undefined;
        txHash: `0x${string}`;
    }[]>;
    private handleRpcError;
}
