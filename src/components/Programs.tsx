import React from 'react';

const Programs = () => {
  function calculateProfitOrLoss(costPrice: number, sellingPrice: number) {
    if (sellingPrice > costPrice) {
      let profit = sellingPrice - costPrice;
      console.log(`Profit: ${profit}`);
    } else if (costPrice > sellingPrice) {
      let loss = costPrice - sellingPrice;
      console.log(`Loss: ${loss}`);
    } else {
      console.log("No Profit No Loss");
    }
  }

  function isValidTriangle(angle1: number, angle2: number, angle3: number) {
    const sum = angle1 + angle2 + angle3;
    if (sum === 180) {
      console.log("Valid Triangle");
    } else {
      console.log("Invalid Triangle");
    }
  }
  calculateProfitOrLoss(100, 150);
  isValidTriangle(60, 60, 60);

  return <div className='text-center'>Programs</div>;
};

export default Programs;