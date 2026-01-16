import { BlockchainService } from './blockchain.service';
import { GetEventsDto } from './dto/get-events.dto';
export declare class BlockchainController {
    private readonly blockchainService;
    constructor(blockchainService: BlockchainService);
    getValue(): Promise<{
        value: string;
    }>;
    getEvents(body: GetEventsDto): Promise<{
        blockNumber: string;
        value: string | undefined;
        txHash: `0x${string}`;
    }[]>;
}
