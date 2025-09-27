import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";

// بيانات وهمية للمستخدمين
const users = [
  { id: 1, name: "أحمد", role: "مسافر" },
  { id: 2, name: "سارة", role: "مرسل" },
];

const Users = () => {
  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-2 md:px-8">
      <Typography
        variant="h4"
        className="mb-6 font-bold text-center"
        sx={{ fontSize: { xs: 24, md: 32 }, color: "primary.main" }}
      >
        المستخدمين
      </Typography>
      <Box className="w-full max-w-2xl space-y-4">
        {users.map((user) => (
          <Paper
            key={user.id}
            className="p-4 flex flex-col gap-2"
            elevation={2}
            sx={{ width: "100%", bgcolor: "background.paper", boxShadow: 1 }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: 16, md: 20 }, color: "secondary.main" }}
            >
              {user.name}
            </Typography>
            <Typography sx={{ fontSize: { xs: 14, md: 18 } }}>
              الدور:{" "}
              <span
                className={
                  user.role === "مسافر" ? "text-green-600" : "text-blue-600"
                }
              >
                {user.role}
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

export default Users;
