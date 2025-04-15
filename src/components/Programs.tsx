'use client';
import React, { useEffect, useState } from 'react';

const Programs = () => {
  const [result, setResult] = useState({
    profitOrLoss: '',
    triangle: '',
  });

  function calculateProfitOrLoss(costPrice: number, sellingPrice: number) {
    if (sellingPrice > costPrice) {
      let profit = sellingPrice - costPrice;
      console.log(`Profit: ${profit}`);
      return `Profit: ${profit}`;
    } else if (costPrice > sellingPrice) {
      let loss = costPrice - sellingPrice;
      console.log(`Loss: ${loss}`);
      return `Loss: ${loss}`;
    } else {
      console.log("No Profit No Loss");
      return "No Profit No Loss";
    }
  }

  function isValidTriangle(angle1: number, angle2: number, angle3: number) {
    const sum = angle1 + angle2 + angle3;
    if (sum === 180) {
      console.log("Valid Triangle");
      return "Valid Triangle";
    } else {
      console.log("Invalid Triangle");
      return "Invalid Triangle";
    }
  }

  useEffect(() => {
    const profitOrLossResult = calculateProfitOrLoss(100, 150);
    const triangleResult = isValidTriangle(60, 60, 60);
    setResult({
      profitOrLoss: profitOrLossResult,
      triangle: triangleResult,
    });
  }, []);

  return (
    <div className='text-center space-y-4 py-10'>
      <h2 className='text-xl font-bold'>Programs</h2>
      <p>{result.profitOrLoss}</p>
      <p>{result.triangle}</p>
    </div>
  );
};

export default Programs;
