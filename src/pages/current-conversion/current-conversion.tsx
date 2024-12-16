import { Button, Form, Input, Spin, Table, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { IType } from "../../modules/convert/type";

function CurrentConversion() {
  const [conversions, setConversion] = useState<IType.Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [isChange, setChange] = useState(false);

  const http1 =
    "https://v6.exchangerate-api.com/v6/232456a16289a75a228cd080/latest/USD";

  const http2 =
    "https://api.exchangeratesapi.io/v1/latest?access_key=168308bf666216fb597808a185144dab&symbols=UZS";

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get<IType.Data>(http1);
        setConversion(response.data);
      } catch (error: any) {
        notification.error({
          message: "Error",
          description: error.message,
          duration: 2,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onFinish = (e: any) => {
    setAmount(e.amount);
    setChange(true);
  };

  useEffect(() => {
    if (isChange) {
      const fetchData = async () => {
        setLoading(true);

        try {
          const response = await axios.get("API");
        } catch (error: any) {
          notification.error({
            message: "Error",
            description: error.message,
            duration: 2,
          });
        } finally {
          setLoading(false);
          setChange(false);
        }
      };
      fetchData();
    }
  }, [isChange]);

  const columns: ColumnsType<{ currency: string; conversion_rates: number }> = [
    {
      title: "Base",
      dataIndex: "base_code",
      key: "1",
    },
    {
      title: "Time last update",
      dataIndex: "time_last_update_utc",
      key: "2",
    },
    {
      title: "Time next update",
      dataIndex: "time_next_update_utc",
      key: "3",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "4",
    },
    {
      title: "Rate",
      dataIndex: "conversion_rates",
      key: "5",
    },
  ];

  const dataSource = conversions?.conversion_rates
    ? Object.entries(conversions.conversion_rates).map(
        ([currency, conversion_rates]) => ({
          key: currency,
          base_code: conversions.base_code,
          time_last_update_utc: conversions.time_last_update_utc,
          time_next_update_utc: conversions.time_next_update_utc,
          currency,
          conversion_rates:
            amount === 0 ? conversion_rates : conversion_rates * +amount,
        })
      )
    : [];

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {loading ? (
        <div
          style={{
            zIndex: "1",
            position: "absolute",
            top: "50%",
            left: "50%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Spin />
        </div>
      ) : (
        <div
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h1 style={{ fontSize: "22px" }}>Currency Conversion</h1>
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
          <Table
            style={{ width: "100%" }}
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 8, showSizeChanger: false }}
          />
        </div>
      )}
    </div>
  );
}

export default CurrentConversion;
