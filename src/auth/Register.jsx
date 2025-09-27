import React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

const Register = () => {
  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-2 md:px-8">
      <Typography
        variant="h4"
        className="mb-6 font-bold text-center"
        sx={{ fontSize: { xs: 24, md: 32 }, color: "primary.main" }}
      >
        إنشاء حساب جديد
      </Typography>
      <Box className="w-full max-w-xs bg-white rounded-lg shadow-md p-4">
        <TextField
          label="الاسم"
          variant="outlined"
          fullWidth
          className="mb-4"
          sx={{ fontSize: { xs: 14, md: 18 } }}
        />
        <TextField
          label="البريد الإلكتروني"
          variant="outlined"
          fullWidth
          className="mb-4"
          sx={{ fontSize: { xs: 14, md: 18 } }}
        />
        <TextField
          label="كلمة المرور"
          type="password"
          variant="outlined"
          fullWidth
          className="mb-4"
          sx={{ fontSize: { xs: 14, md: 18 } }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mb-2"
          sx={{ py: 1.2, fontSize: { xs: 14, md: 18 } }}
        >
          تسجيل
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
