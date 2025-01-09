"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function BigOVisualization() {
  interface DataPoint {
    n: number;
    constant: number;
    logarithmic: number;
    linear: number;
    linearithmic: number;
    quadratic: number;
    exponential: number;
  }

  const [data, setData] = useState<DataPoint[]>([])
  const [maxN, setMaxN] = useState(10)

  useEffect(() => {
    const generateData = () => {
      const newData = []
      for (let n = 1; n <= maxN; n++) {
        newData.push({
          n,
          constant: 1,
          logarithmic: Math.log2(n),
          linear: n,
          linearithmic: n * Math.log2(n),
          quadratic: n * n,
          exponential: Math.min(1000, Math.pow(2, n)) // Capped for visualization
        })
      }
      setData(newData)
    }

    generateData()
  }, [maxN])

  return (
    <Card className="w-full max-w-4xl bg-gray-900 text-white">
      <CardHeader>
        <CardTitle>Big O Complexity Growth Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Input size (n):</span>
            <Slider
              min={1}
              max={20}
              step={1}
              value={[maxN]}
              onValueChange={(value) => setMaxN(value[0])}
              className="w-[200px] [&_[role=slider]]:bg-blue-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_.bg-primary]:bg-green-500"
            />
            <span className="text-sm font-medium">{maxN}</span>
          </div>
          
          <div className="h-[400px] bg-gray-800 rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey="n" stroke="#e2e8f0" />
                <YAxis stroke="#e2e8f0" />
                <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: 'none' }} />
                <Legend />
                <Line type="monotone" dataKey="constant" stroke="#63b3ed" name="O(1)" />
                <Line type="monotone" dataKey="logarithmic" stroke="#4fd1c5" name="O(log n)" />
                <Line type="monotone" dataKey="linear" stroke="#f6ad55" name="O(n)" />
                <Line type="monotone" dataKey="linearithmic" stroke="#fc8181" name="O(n log n)" />
                <Line type="monotone" dataKey="quadratic" stroke="#b794f4" name="O(n²)" />
                <Line type="monotone" dataKey="exponential" stroke="#f687b3" name="O(2ⁿ)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

