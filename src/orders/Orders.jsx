import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";

// بيانات وهمية للأوردرات
const orders = [
  {
    id: 1,
    sender: "محمد",
    receiver: "أحمد",
    item: "شنطة ملابس",
    status: "قيد التوصيل",
  },
  {
    id: 2,
    sender: "منى",
    receiver: "سارة",
    item: "طرد صغير",
    status: "تم التوصيل",
  },
];

const Orders = () => {
  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-2 md:px-8">
      <Typography
        variant="h4"
        className="mb-6 font-bold text-center"
        sx={{ fontSize: { xs: 22, md: 32 } }}
      >
        الأوردرات
      </Typography>
      <Box className="w-full max-w-2xl space-y-4">
        {orders.map((order) => (
          <Paper
            key={order.id}
            className="p-4 flex flex-col gap-2"
            elevation={2}
            sx={{ width: "100%" }}
          >
            <Typography variant="h6" sx={{ fontSize: { xs: 16, md: 20 } }}>
              الشحنة: {order.item}
            </Typography>
            <Typography sx={{ fontSize: { xs: 14, md: 18 } }}>
              من: {order.sender} إلى: {order.receiver}
            </Typography>
            <Typography sx={{ fontSize: { xs: 14, md: 18 } }}>
              الحالة:{" "}
              <span
                className={
                  order.status === "تم التوصيل"
                    ? "text-green-600"
                    : "text-yellow-600"
                }
              >
                {order.status}
              </span>
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ fontSize: { xs: 14, md: 16 }, py: 1 }}
            >
              تفاصيل
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Orders;
