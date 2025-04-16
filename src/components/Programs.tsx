'use client';
import React, { useState } from 'react';

const Programs = () => {
  const [cp, setCp] = useState<number | ''>('');
  const [sp, setSp] = useState<number | ''>('');
  const [profitOrLoss, setProfitOrLoss] = useState('');

  const [angle1, setAngle1] = useState<number | ''>('');
  const [angle2, setAngle2] = useState<number | ''>('');
  const [angle3, setAngle3] = useState<number | ''>('');
  const [triangleResult, setTriangleResult] = useState('');

  function calculateProfitOrLoss(cp: number, sp: number) {
    if (sp > cp) {
      setProfitOrLoss(`Profit of ₹${sp - cp}`);
    } else if (cp > sp) {
      setProfitOrLoss(`Loss of ₹${cp - sp}`);
    } else {
      setProfitOrLoss("No profit, no loss.");
    }
  }

  function isValidTriangle(angle1: number, angle2: number, angle3: number) {
    const sum = angle1 + angle2 + angle3;
    if (angle1 > 0 && angle2 > 0 && angle3 > 0 && sum === 180) {
      setTriangleResult("Valid triangle ");
    } else {
      setTriangleResult("Not a valid triangle ");
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-8">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Profit or Loss Calculator</h2>
        <input
          type="number"
          placeholder="Cost Price"
          value={cp}
          onChange={(e) => setCp(Number(e.target.value))}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Selling Price"
          value={sp}
          onChange={(e) => setSp(Number(e.target.value))}
          className="border p-2 w-full rounded"
        />
        <button
          onClick={() => {
            if (typeof cp === 'number' && typeof sp === 'number') {
              calculateProfitOrLoss(cp, sp);
            } else {
              setProfitOrLoss("Please enter valid numbers for Cost Price and Selling Price.");
            }
          }}
          className="bg-blue-600 hover:bg-blue-400 text-white px-4 py-2 rounded"
        >
          Calculate
        </button>
        <div className="font-medium text-gray-800">{profitOrLoss}</div>
      </div>


      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Triangle Validity Checker</h2>
        <input
          type="number"
          placeholder="Angle 1"
          value={angle1}
          onChange={(e) => setAngle1(Number(e.target.value))}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Angle 2"
          value={angle2}
          onChange={(e) => setAngle2(Number(e.target.value))}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Angle 3"
          value={angle3}
          onChange={(e) => setAngle3(Number(e.target.value))}
          className="border p-2 w-full rounded"
        />
        <button
          onClick={() => isValidTriangle(Number(angle1), Number(angle2), Number(angle3))}
          className="bg-blue-600 hover:bg-blue-400 text-white px-4 py-2 rounded"
        >
          Check Triangle
        </button>
        <div className="font-medium text-gray-800">{triangleResult}</div>
      </div>
    </div>
  );
};

export default Programs;