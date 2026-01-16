'use client';

import { useState } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
} from 'wagmi';
import { injected } from 'wagmi/connectors';

// ==============================
// 🔹 CONFIG
// ==============================
const CONTRACT_ADDRESS = '0xa32e3b2252f21d9d42dae1e5337a7f8a4709ccc3';

const SIMPLE_STORAGE_ABI = [
  {
    inputs: [],
    name: 'getValue',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_value', type: 'uint256' }],
    name: 'setValue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

// ==============================
// 🔹 UTIL
// ==============================
const shortenAddress = (addr?: string) => {
  if (!addr) return '';
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
};

export default function Page() {
  // ==============================
  // 🔹 WALLET STATE
  // ==============================
  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  // ==============================
  // 🔹 LOCAL STATE
  // ==============================
  const [inputValue, setInputValue] = useState('');
  const [txPending, setTxPending] = useState(false);

  // ==============================
  // 🔹 READ CONTRACT
  // ==============================
  const { data: value, isLoading: isReading, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: SIMPLE_STORAGE_ABI,
    functionName: 'getValue',
  });

  // ==============================
  // 🔹 WRITE CONTRACT
  // ==============================
  const { writeContract } = useWriteContract();

  const handleSetValue = async () => {
    if (!inputValue) return;

    try {
      setTxPending(true);

      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: SIMPLE_STORAGE_ABI,
        functionName: 'setValue',
        args: [BigInt(inputValue)],
        onSuccess() {
          alert('Transaction successful!');
          setInputValue('');
          refetch(); // refresh value
        },
        onError(err: any) {
          if (err?.code === 4001) {
            alert('Transaction rejected by user');
          } else if (err?.code === -32000) {
            alert('Wrong network! Switch to Avalanche.');
          } else {
            alert(`Transaction failed: ${err.message}`);
          }
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setTxPending(false);
    }
  };

  // ==============================
  // 🔹 UI
  // ==============================
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Day 3 – Frontend dApp (Avalanche)
        </h1>

      <div className="text-center text-sm text-gray-400">
    <p className="font-semibold text-gray-300">Nama: Achmad S.W.A.N</p>
    <p>NIM: 231011402106</p>
  </div>
        
        {/* WALLET CONNECT */}
        {!isConnected ? (
          <button
            onClick={() => connect({ connector: injected() })}
            disabled={isConnecting}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        ) : (
          <div className="bg-gray-700 p-3 rounded-lg space-y-2">
            <p className="text-sm text-gray-300">Connected Address</p>
            <p className="font-mono text-sm">{shortenAddress(address)}</p>
            <button
              onClick={() => disconnect()}
              className="text-red-400 text-sm underline"
            >
              Disconnect
            </button>
          </div>
        )}

        {/* READ CONTRACT */}
        <div className="bg-gray-700 p-4 rounded-lg space-y-2">
          <p className="text-sm text-gray-300">Contract Value (read)</p>
          <p className="text-3xl font-bold">
            {isReading ? 'Loading...' : value?.toString()}
          </p>
          <button
            onClick={() => refetch()}
            className="text-sm text-blue-400 hover:underline"
          >
            Refresh value
          </button>
        </div>

        {/* WRITE CONTRACT */}
        <div className="bg-gray-700 p-4 rounded-lg space-y-3">
          <p className="text-sm text-gray-300">Update Contract Value</p>
          <input
            type="number"
            placeholder="New value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-900 border border-gray-600"
          />
          <button
            onClick={handleSetValue}
            disabled={txPending}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              txPending ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {txPending ? 'Updating...' : 'Set Value'}
          </button>
        </div>

        {/* FOOTNOTE */}
        <p className="text-xs text-gray-400 text-center">
          Smart contract = single source of truth
        </p>
      </div>
    </main>
  );
}
