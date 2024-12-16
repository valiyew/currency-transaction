import { Button, Form, Input, Select } from "antd";
import axios from "axios";
const { Option } = Select;

import { useEffect, useState } from "react";
import { IType } from "../../modules/convert/type";

function Convert() {
  const [currentDate, setDate] = useState("");

  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [isCurrency, setIsCurrency] = useState(false);

  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState<IType.Data | null>(null);
  const [result, setResult] = useState(0);

  const http1 =
    "https://v6.exchangerate-api.com/v6/232456a16289a75a228cd080/latest/USD";

  const http2 = `https://v6.exchangerate-api.com/v6/232456a16289a75a228cd080/pair/${fromCurrency}/${toCurrency}/${+amount}`;

  useEffect(() => {
    const today = new Date();
    const formatDate = today.toLocaleDateString();
    setDate(formatDate);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http1');
        setCurrency(response.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isCurrency && fromCurrency && toCurrency) {
      const fetchData = async () => {
        try {
          const response = await axios.get('http2');

          setResult(response.data.conversion_result);
        } catch (error: any) {
          console.error("Error fetching exchange rate:", error);
        } finally {
          setIsCurrency(false);
        }
      };

      fetchData();
    }
  }, [isCurrency, fromCurrency, toCurrency, amount]);

  const dataSource = currency?.conversion_rates
    ? Object.entries(currency.conversion_rates).map(([currencyCode]) => ({
        key: currencyCode,
        currency: currencyCode,
      }))
    : [];

  const handleFromChange = (value: any) => {
    setFromCurrency(value);
  };

  const handleToChange = (value: any) => {
    setToCurrency(value);
  };

  const onFinish = (e: any) => {
    const newAmount = e.amount;
    setAmount(newAmount);
    setIsCurrency(true);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <p>Today : </p>
        <p>{currentDate}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div>
          <Form
            name="amountForm"
            onFinish={onFinish}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please enter an amount!",
                },
              ]}
              style={{ width: "100%" }}
            >
              <Input
                style={{ width: "100%", padding: "5px 10px" }}
                placeholder="Enter amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </Form.Item>

            <Form.Item>
              <Button
                style={{ padding: "5px 20px", fontSize: "12px" }}
                type="primary"
                htmlType="submit"
              >
                Change
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Select defaultValue="USD" onChange={handleFromChange}>
          {dataSource.length > 0 &&
            dataSource.map((data) => (
              <Option key={data.key} value={data.currency}>
                {data.currency}
              </Option>
            ))}
        </Select>

        <Select defaultValue="USD" onChange={handleToChange}>
          {dataSource.length > 0 &&
            dataSource.map((data) => (
              <Option key={data.key} value={data.currency}>
                {data.currency}
              </Option>
            ))}
        </Select>
      </div>
      <p style={{ padding: "10px 0px" }}>
        {amount}-{fromCurrency} : from ({fromCurrency}) to ({toCurrency}){" "}
      </p>
      <p>
        Result: {result} {toCurrency}
      </p>
    </div>
  );
}

export default Convert;
