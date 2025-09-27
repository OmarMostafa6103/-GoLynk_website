import React from "react";
import { Box, Typography, Paper } from "@mui/material";

// بيانات وهمية للإشعارات
const notifications = [
  { id: 1, text: "تم قبول طلبك بنجاح." },
  { id: 2, text: "تم توصيل الشحنة إلى المستلم." },
];

const Notifications = () => {
  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-2 md:px-8">
      <Typography
        variant="h4"
        className="mb-6 font-bold text-center"
        sx={{ fontSize: { xs: 24, md: 32 }, color: "primary.main" }}
      >
        الإشعارات
      </Typography>
      <Box className="w-full max-w-xl space-y-4">
        {notifications.map((n) => (
          <Paper
            key={n.id}
            className="p-4"
            elevation={1}
            sx={{ width: "100%", bgcolor: "background.paper", boxShadow: 1 }}
          >
            <Typography sx={{ fontSize: { xs: 14, md: 18 } }}>
              {n.text}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Notifications;
