import React, { useState } from "react";
import { Input, Button, Alert, Form, Typography, Card, Space } from "antd";
import './FactoryPipeCalculator.css';

const { Title } = Typography;

const FactoryPipeCalculator: React.FC = () => {
  const [diameter, setDiameter] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [pricePerMeter, setPricePerMeter] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const validateInputs = (): boolean => {
    if (!diameter || !length || !pricePerMeter) {
      setError("All fields are required.");
      return false;
    }
    if (+diameter <= 0 || +length <= 0 || +pricePerMeter <= 0) {
      setError("All values must be greater than zero.");
      return false;
    }
    setError("");
    return true;
  };

  const calculatePrice = (): void => {
    if (!validateInputs()) return;
    const total = parseFloat(diameter) * parseFloat(length) * parseFloat(pricePerMeter);
    setTotalPrice(total.toFixed(2));
  };

  return (
    <Card className="calculator-container">
      <Title level={2} className="calculator-title">Factory Pipe Price Calculator</Title>
      <Form layout="vertical">
        <Form.Item label="Diameter (in cm)" required>
          <Input
            type="number"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
            placeholder="Enter diameter"
          />
        </Form.Item>
        <Form.Item label="Length (in meters)" required>
          <Input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="Enter length"
          />
        </Form.Item>
        <Form.Item label="Price per Meter" required>
          <Input
            type="number"
            value={pricePerMeter}
            onChange={(e) => setPricePerMeter(e.target.value)}
            placeholder="Enter price per meter"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={calculatePrice} block>
            Calculate
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message={error} type="error" showIcon />}
      {totalPrice !== null && (
        <Space direction="vertical" className="mt-3">
          <Alert message={`Total Price: $${totalPrice}`} type="success" showIcon />
        </Space>
      )}
    </Card>
  );
};

export default FactoryPipeCalculator;