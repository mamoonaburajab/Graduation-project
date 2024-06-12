import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ComparisonChild = ({ measurements }) => {
  const normalValues = {
    weight: 7.5, // Example normal value for the current month
    height: 63,
    head_circumference: 42,
    vitamin_A_D: 1,
    vitamin_capsule_A: 1,
    Iron: 1,
  };

  const childData = {
    weight: measurements.weight || 0,
    height: measurements.height || 0,
    head_circumference: measurements.head_circumference || 0,
    vitamin_A_D: measurements.vitamin_A_D || 0,
    vitamin_capsule_A: measurements.vitamin_capsule_A || 0,
    Iron: measurements.Iron || 0,
  };

  const data = {
    labels: ['الوزن', 'الطول', 'محيط الراس', 'فيتامين A+D', 'كبسولة فيتامين A', 'الحديد'],
    datasets: [
      {
        label: 'قيم الطفل',
        data: [childData.weight, childData.height, childData.head_circumference, childData.vitamin_A_D, childData.vitamin_capsule_A, childData.Iron],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'القيم الطبيعية',
        data: [normalValues.weight, normalValues.height, normalValues.head_circumference, normalValues.vitamin_A_D, normalValues.vitamin_capsule_A, normalValues.Iron],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>مقارنة نمو الطفل</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ComparisonChild;
